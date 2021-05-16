import RNFetchBlob from 'rn-fetch-blob';
import {PermissionsAndroid} from 'react-native';

import {readCsvFromFile, DATABASE_FILENAME, DATABASE_PATH} from './fileManager';

import csvToJson from './csvToJson';

const boundaryString = 'personal-expense-manager';
const url = 'https://www.googleapis.com/drive/v3';
const uploadUrl = 'https://www.googleapis.com/upload/drive/v3';

const GOOGLE_API_SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const GOOGLE_API_IOS_CLIENT_ID =
  '1022821915779-c8o92t2hu4m28djiiq2rb3cdm967vj0r.apps.googleusercontent.com';

let apiToken = null;

const upload = async (existingFileId) => {
  await createBody(!!existingFileId)
    .then((body) => {
      const options = configurePostOptions(body.length, !!existingFileId);
      return fetch(
        `${uploadUrl}/files${
          existingFileId ? `/${existingFileId}` : ''
        }?uploadType=multipart`,
        {
          ...options,
          body,
        },
      ).then(parseAndHandleErrors);
    })
    .catch((err) => {
      console.warn(err);
    });
};

const createBody = (isUpdate = false) => {
  return new Promise((resolve, reject) => {
    readCsvFromFile()
      .then((fileContent) => {
        const metaData = {
          name: 'personal_expense_manager.csv',
          description: 'Backup',
          mimeType: 'text/csv',
        };

        const multipartBody =
          `\r\n--${boundaryString}\r\nContent-Type: application/json; charset=UTF-8\r\n\r\n` +
          `${JSON.stringify(metaData)}\r\n` +
          `--${boundaryString}\r\nContent-Type: application/json\r\n\r\n` +
          `${fileContent}\r\n` +
          `--${boundaryString}--`;
        resolve(multipartBody);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

const configurePostOptions = (bodyLength, isUpdate = false) => {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${apiToken}`);
  headers.append(
    'Content-Type',
    `multipart/related; boundary=${boundaryString}`,
  );
  headers.append('Content-Length', bodyLength);

  return {
    method: isUpdate ? 'PATCH' : 'POST',
    headers,
  };
};

const parseAndHandleErrors = (response) => {
  if (response.ok) {
    return response.json();
  }
  return response.json().then((error) => {
    throw new Error(JSON.stringify(error));
  });
};

const setApiToken = (token) => {
  apiToken = token;
};

const configureGetOptions = () => {
  const headers = new Headers();
  headers.append('Authorization', `Bearer ${apiToken}`);
  return {
    method: 'GET',
    headers,
  };
};

const requestReadStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: 'Read your android storage Permission',
        message: 'Read your android storage to save your data',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can Read storage');
    } else {
      console.log('Read Storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const requestWriteStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Write your android storage Permission',
        message: 'Write your android storage to save your data',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('You can write storage');
    } else {
      console.log('Write Storage permission denied');
    }
  } catch (err) {
    console.warn(err);
  }
};

const getFile = () => {
  if (apiToken) {
    const qParams = encodeURIComponent(`name = '${DATABASE_FILENAME}'`);
    const options = configureGetOptions();
    return fetch(`${url}/files?q=${qParams}`, options)
      .then(parseAndHandleErrors)
      .then((body) => {
        return body && body.files && body.files.length > 0
          ? body.files[0]
          : null;
      });
  }
  return null;
};

const download = (fileId) => {
  return new Promise((resolve, reject) => {
    if (!fileId) {
      throw new Error("Didn't provide a valid file id.");
    }
    let downloadFileOptions = {
      authorization: `Bearer ${apiToken}`,
      fromUrl: `${url}/files/${fileId}?alt=media`,
      toFile: DATABASE_PATH,
    };

    RNFetchBlob.fetch('GET', downloadFileOptions.fromUrl, {
      Authorization: downloadFileOptions.authorization,
    })
      .then((res) => {
        let status = res.info().status;

        if (status === 200) {
          const dataInJSONFormat = csvToJson(res.data);
          let accountSqlQuery = getAccountSqlQuery(dataInJSONFormat);
          let categorySqlQuery = getCategorySqlQuery(dataInJSONFormat);
          let recordSqlQuery = getRecordSqlQuery(dataInJSONFormat);

          resolve({accountSqlQuery, categorySqlQuery, recordSqlQuery});
        } else {
          reject('Error');
        }
      })
      .catch((errorMessage, statusCode) => {
        reject(errorMessage);
      });
  });
};

const getAccountSqlQuery = (result) => {
  const accountsFromCsv = result.map((res) => {
    return {
      id: res.PayFromId ? res.PayFromId : res.PayToId,
      title: res.PayFromId ? res.PayFromTitle : res.PayToTitle,
      type: res.PayFromId ? res.PayFromType : res.PayToType,
      openingBalance: res.PayFromId
        ? res.PayFromOpeningBalance
        : res.PayToOpeningBalance,
      icon: res.PayFromId ? res.PayFromIcon : res.PayToIcon,
    };
  });

  let accounts = [];
  let accountSqlQuery = '';

  accountsFromCsv.forEach((account) => {
    let isAccountIdAlreadyPresent = accounts.find((a) => a.id === account.id);
    if (!isAccountIdAlreadyPresent && account.id) {
      accountSqlQuery += `(${account.id},'${account.title}','${account.type}',${account.openingBalance},'${account.icon}'),`;
      accounts.push(account);
    }
  });
  return accountSqlQuery.slice(0, accountSqlQuery.length - 1);
};

const getCategorySqlQuery = (result) => {
  const categoriesFromCsv = result.map((res) => {
    return {
      id: res.CategoryId,
      title: res.CategoryTitle,
      type: res.CategoryType,
      icon: res.CategoryIcon,
    };
  });

  let categories = [];
  let categoriesSqlQuery = '';

  categoriesFromCsv.forEach((category) => {
    let isCatagodyIdAlreadyPresent = categories.find(
      (a) => a.id === category.id,
    );
    if (!isCatagodyIdAlreadyPresent && category.id) {
      categoriesSqlQuery += `(${category.id},'${category.title}','${category.type}','${category.icon}'),`;
      categories.push(category);
    }
  });
  return categoriesSqlQuery.slice(0, categoriesSqlQuery.length - 1);
};

const getRecordSqlQuery = (result) => {
  const recordsFromCsv = result.map((res) => {
    return {
      id: res.RecordId,
      amount: res.Amount,
      date: res.Date,
      categoryId: res.CategoryId,
      payFrom: res.PayFromId,
      payTo: res.PayToId,
      description: res.Description,
      place: res.Place,
      camera: res.Camera,
    };
  });

  let records = [];
  let recordsSqlQuery = '';

  recordsFromCsv.forEach((record) => {
    let isCatagodyIdAlreadyPresent = records.find((a) => a.id === record.id);
    if (!isCatagodyIdAlreadyPresent && record.id) {
      recordsSqlQuery += `(${record.id},'${record.amount}','${record.date}',${record.categoryId},${record.payFrom},${record.payTo}, '${record.description}','${record.place}', '${record.camera}'),`;
      records.push(record);
    }
  });
  return recordsSqlQuery.slice(0, recordsSqlQuery.length - 1);
};

export {
  upload,
  getFile,
  download,
  setApiToken,
  requestReadStoragePermission,
  requestWriteStoragePermission,
  GOOGLE_API_SCOPES,
  GOOGLE_API_IOS_CLIENT_ID,
};
