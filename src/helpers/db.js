const SQLite = require('react-native-sqlite-storage');

const db = SQLite.openDatabase('my-account.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS accounts (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, type TEXT NOT NULL, openingBalance TEXT, icon TEXT NOT NULL)',
        [],
        () => {
          console.warn('Table accounts created');
          resolve();
        },
        (err) => {
          reject(err);
        },
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS categories (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, type TEXT NOT NULL, icon TEXT NOT NULL)',
        [],
        () => {
          console.warn('Table categories created');
          resolve();
        },
        (err) => {
          reject(err);
        },
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS records (id INTEGER PRIMARY KEY NOT NULL, amount INTEGER NOT NULL, date TEXT NOT NULL, categoryId INTEGER NOT NULL, payFrom INTEGER, payTo INTEGER, description TEXT, place TEXT, camera TEXT)',
        [],
        () => {
          console.warn('Table records created');
          resolve();
        },
        (err) => {
          reject(err);
        },
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS backups (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL,date TEXT NOT NULL)',
        [],
        () => {
          console.warn('Table backup created');
          resolve();
        },
        (err) => {
          reject(err);
        },
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY NOT NULL, fullname TEXT, email TEXT, displaypicture TEXT, token TEXT)',
        [],
        () => {
          console.warn('Table backup created');
          resolve();
        },
        (err) => {
          reject(err);
        },
      );
    });
  });

  return promise;
};

export const insertUser = (fullName, email, displayPicture, token) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO user (fullname, email, displaypicture, token) VALUES (?,?,?,?)',
        [fullName, email, displayPicture, token],
        (_, result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        },
      );
    });
  });

  return promise;
};

export const fetchUser = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM user',
        [],
        (_, result) => {
          resolve(result.rows.item(0));
        },
        (err) => {
          reject(err);
        },
      );
    });
  });

  return promise;
};

export const insertAccount = (title, type, openingBalance, icon) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO accounts (title, type, openingBalance, icon) VALUES (?,?,?,?)',
        [title, type, openingBalance, icon],
        (_, result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        },
      );
    });
  });

  return promise;
};

export const insertAccounts = (accounts) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        `INSERT INTO accounts (id, title, type, openingBalance, icon) VALUES ${accounts}`,
        (_, result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        },
      );
    });
  });

  return promise;
};

export const fetchAccount = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM accounts',
        [],
        (_, result) => {
          let accounts = [];
          for (let i = 0; i < result.rows.length; i++) {
            const row = result.rows.item(i);
            accounts.push(row);
          }
          resolve(accounts);
        },
        (err) => {
          reject(err);
        },
      );
    });
  });

  return promise;
};

export const removeAccount = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM accounts where id = (?)',
        [id],
        (_, result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        },
      );
    });
  });

  return promise;
};

export const updateAccount = (id, title, type, openingBalance, icon) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE accounts SET title=?, type=?, openingBalance=?, icon=? WHERE id=?',
        [title, type, openingBalance, icon, id],
        (_, result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        },
      );
    });
  });

  return promise;
};

export const insertCategory = (title, type, icon) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO categories (title, type, icon) VALUES (?,?,?)',
        [title, type, icon],
        (_, result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        },
      );
    });
  });

  return promise;
};

export const fetchCategory = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM categories',
        [],
        (_, result) => {
          let category = [];
          for (let i = 0; i < result.rows.length; i++) {
            const row = result.rows.item(i);
            category.push(row);
          }
          resolve(category);
        },
        (err) => {
          reject(err);
        },
      );
    });
  });

  return promise;
};

export const removeCategory = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM accounts where id = (?)',
        [id],
        (_, result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        },
      );
    });
  });

  return promise;
};

export const updateCategory = (id, title, type, icon) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE categories SET title=?, type=?, icon=? WHERE id=?',
        [title, type, icon, id],
        (_, result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        },
      );
    });
  });

  return promise;
};

export const insertRecord = (
  amount,
  date,
  categoryId,
  payFrom,
  payTo,
  description,
  place,
  camera,
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO records (amount,date,categoryId,payFrom,payTo,description,place,camera) VALUES (?,?,?,?,?,?,?,?)',
        [amount, date, categoryId, payFrom, payTo, description, place, camera],
        (_, result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        },
      );
    });
  });

  return promise;
};

export const fetchRecord = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM records',
        [],
        (_, result) => {
          let records = [];
          for (let i = 0; i < result.rows.length; i++) {
            const row = result.rows.item(i);
            records.push(row);
          }
          resolve(records);
        },
        (err) => {
          reject(err);
        },
      );
    });
  });

  return promise;
};

export const removeRecord = (id) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM records where id = (?)',
        [id],
        (_, result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        },
      );
    });
  });

  return promise;
};

export const updateRecord = (
  amount,
  date,
  categoryId,
  payFrom,
  payTo,
  description,
  place,
  camera,
  id,
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE records SET date=?, amount=?, description=?, payTo=?, payFrom=?, categoryId=?, camera=? WHERE id=?',
        [date, amount, description, payTo, payFrom, categoryId, camera, id],
        (_, result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        },
      );
    });
  });

  return promise;
};

export const insertBackup = (text, date) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'INSERT INTO backups (text, date) VALUES (?,?)',
        [text, date],
        (_, result) => {
          resolve(result);
        },
        (err) => {
          reject(err);
        },
      );
    });
  });

  return promise;
};

export const fetchBackup = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM backups',
        [],
        (_, result) => {
          let backup = [];
          for (let i = 0; i < result.rows.length; i++) {
            const row = result.rows.item(i);
            backup.push(row);
          }
          resolve(backup);
        },
        (err) => {
          reject(err);
        },
      );
    });
  });

  return promise;
};

export const resetData = (accounts, categories, records) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql('DELETE FROM accounts');
        tx.executeSql('DELETE FROM categories');
        tx.executeSql('DELETE FROM records');

        tx.executeSql(
          `INSERT INTO accounts (id, title, type, openingBalance, icon) VALUES ${accounts}`,
          (tx, resultSet) => {
            console.log('resultSet.insertId: ' + resultSet.insertId);
            console.log('resultSet.rowsAffected: ' + resultSet.rowsAffected);
          },
          (tx, error) => {
            console.log('ACCOUNTS INSERT error: ' + JSON.stringify(error));
          },
        );

        tx.executeSql(
          `INSERT INTO categories (id, title, type, icon) VALUES ${categories}`,
          (tx, resultSet) => {
            console.log('resultSet.insertId: ' + resultSet.insertId);
            console.log('resultSet.rowsAffected: ' + resultSet.rowsAffected);
          },
          (tx, error) => {
            console.log('CATEGORIES INSERT error: ' + JSON.stringify(error));
          },
        );

        tx.executeSql(
          `INSERT INTO records (id, amount,date,categoryId,payFrom,payTo,description,place,camera) VALUES ${records}`,
          (tx, resultSet) => {
            console.log('resultSet.insertId: ' + resultSet.insertId);
            console.log('resultSet.rowsAffected: ' + resultSet.rowsAffected);
          },
          (tx, error) => {
            console.log('RECORDS INSERT error: ' + JSON.stringify(error));
          },
        );
      },
      (error) => {
        reject(error.message);
      },
      () => {
        resolve();
      },
    );
  });

  return promise;
};
