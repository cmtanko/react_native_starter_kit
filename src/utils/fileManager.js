import RNFetchBlob from 'rn-fetch-blob';
import csvToJson from '../utils/csvToJson';

const writetoFile = (allRecordDataForExport) => {
  // construct csvString
  const headerString =
    'RecordId, Date, Description, Amount, Place, Camera, CategoryId, CategoryTitle, CategoryIcon, CategoryType, PayFromId, PayFromTitle, PayFromIcon, PayFromType, PayFromOpeningBalance,  PayToId, PayToTitle, PayToIcon, PayToType, PayToOpeningBalance,  \n';
  const rowString = allRecordDataForExport
    .map(
      (r) =>
        `${r.id},${r.date},${r.description},${r.amount},${r.place},${r.camera},${r.categoryId},${r.categoryTitle},${r.categoryIcon},${r.categoryType},${r.payFromId},${r.payFromTitle},${r.payFromIcon},${r.payFromType},${r.payFromOpeningBalance},${r.payToId},${r.payToTitle},${r.payToIcon},${r.payToType},${r.payToOpeningBalance},\n`,
    )
    .join('');
  const csvString = `${headerString}${rowString}`;

  // write the current list of answers to a local csv file
  const pathToWrite = `${RNFetchBlob.fs.dirs.DownloadDir}/personal_expense_manager.csv`;

  return new Promise((resolve, reject) => {
    RNFetchBlob.fs
      .writeFile(pathToWrite, csvString, 'utf8')
      .then(() => {
        console.log(`wrote file ${pathToWrite}`);
        resolve();
      })
      .catch((error) => reject(error));
  });
};

const readFromFile = () => {
  const pathToRead = `${RNFetchBlob.fs.dirs.DownloadDir}/personal_expense_manager.csv`;

  return new Promise((resolve, reject) => {
    RNFetchBlob.fs
      .readFile(pathToRead, 'utf8')
      .then((file) => {
        resolve(csvToJson(file));
      })
      .catch((error) => reject(error));
  });
};

export {writetoFile, readFromFile};
