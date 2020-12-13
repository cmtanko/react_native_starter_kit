const SQLite = require('react-native-sqlite-storage');

const db = SQLite.openDatabase('my-account.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS accounts (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, type TEXT NOT NULL, openingBalance TEXT, icon TEXT NOT NULL)',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject();
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
        (_, err) => {
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
        (_, err) => {
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
        (_, err) => {
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
        (_, err) => {
          reject(err);
        },
      );
    });
  });

  return promise;
};
