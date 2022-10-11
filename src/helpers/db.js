const SQLite = require('react-native-sqlite-storage');

const db = SQLite.openDatabase('my-account.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS accounts (id INTEGER PRIMARY KEY NOT NULL, title TEXT NOT NULL, type TEXT NOT NULL, openingBalance TEXT, icon TEXT NOT NULL)',
        [],
        () => {
          tx.executeSql(
            "INSERT INTO accounts (id, title, type, openingBalance, icon) VALUES (1,'Bank','BANK',0,'bank'),(4,'NAB Credit Card','OTHERS',0,'credit-card'),(3,'Cash','CASH',0,'money')",
          );
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
          tx.executeSql(
            "INSERT INTO categories (id, title, type, icon) VALUES (17,'Transportation','EXPENSE','car'),(6,'Phone','EXPENSE','phone'),(9,'Rent','EXPENSE','bed'),(14,'Grocery','EXPENSE','shopping-cart'),(2,'Interest','INCOME','dollar'),(8,'Electricity','EXPENSE','bolt'),(16,'Eat Out','EXPENSE','home'),(10,'Medical','EXPENSE','ambulance'),(1,'Salary','INCOME','dollar'),(4,'Dividends','INCOME','money'),(5,'Misc','INCOME','gear'),(3,'Commission','INCOME','money'),(15,'Gift','EXPENSE','gift'),(12,'House','EXPENSE','home'),(11,'Shopping','EXPENSE','amazon'),(18,'Saving Account','TRANSFER','credit-card'),(7,'Shares','TRANSFER','btc'),(13,'Education','EXPENSE','home')",
          );
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
          resolve();
        },
        (err) => {
          reject(err);
        },
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS settings (id INTEGER PRIMARY KEY NOT NULL, lockscreen TEXT, notification TEXT, currency TEXT)',
        [],
        () => {
          tx.executeSql(
            "INSERT INTO settings (id, lockscreen, notification, currency) VALUES (1, 'false', 'false','AUD')",
          );
          resolve();
        },
        (err) => {
          reject(err);
        },
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        'ALTER TABLE categories ADD COLUMN isFavorite INTEGER',
        [],
        () => {
          resolve();
        },
        (err) => {
          reject(err);
        },
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        'ALTER TABLE accounts ADD COLUMN isFavorite INTEGER',
        [],
        () => {
          resolve();
        },
        (err) => {
          reject(err);
        },
      );
    });

    db.transaction((tx) => {
      tx.executeSql(
        'ALTER TABLE accounts ADD COLUMN isDeleted INTEGER',
        [],
        () => {
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

export const insertSetting = (id, lockscreen, notification, currency) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          `UPDATE settings SET lockscreen="${lockscreen}", notification="${notification}", currency="${currency}" WHERE id=${id}`,
        );
      },
      (error) => {
        reject(error.message);
      },
      (res) => {
        resolve(res);
      },
    );
  });
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
        'INSERT INTO accounts (title, type, openingBalance, icon, isFavorite) VALUES (?,?,?,?,?)',
        [title, type, openingBalance, icon, 0],
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
        'UPDATE accounts SET isDeleted=1 WHERE id=?',
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

export const updateAccount = (
  id,
  title,
  type,
  openingBalance,
  icon,
  isFavorite,
) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE accounts SET title=?, type=?, openingBalance=?, icon=?, isFavorite=? WHERE id=?',
        [title, type, openingBalance, icon, isFavorite, id],
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
        'INSERT INTO categories (title, type, icon, isFavorite) VALUES (?,?,?,?)',
        [title, type, icon, 0],
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

export const updateCategory = (id, title, type, icon, isFavorite = false) => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'UPDATE categories SET title=?, type=?, icon=?, isFavorite=? WHERE id=?',
        [title, type, icon, isFavorite, id],
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
  return new Promise((resolve, reject) => {
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
};

export const wipeData = () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql('DELETE FROM accounts');
        tx.executeSql('DELETE FROM categories');
        tx.executeSql('DELETE FROM records');
        tx.executeSql('DELETE FROM settings');
      },
      (error) => {
        reject(error.message);
      },
      () => {
        resolve();
      },
    );
  });
};

export const resetData = (accounts, categories, records) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql('DELETE FROM accounts');
        tx.executeSql('DELETE FROM categories');
        tx.executeSql('DELETE FROM records');

        tx.executeSql(
          `INSERT INTO accounts (id, title, type, openingBalance, icon) VALUES ${accounts}`,
          (tx1, resultSet) => {
            console.log('resultSet.insertId: ' + resultSet.insertId);
            console.log('resultSet.rowsAffected: ' + resultSet.rowsAffected);
          },
          (tx1, error) => {
            console.log('ACCOUNTS INSERT error: ' + JSON.stringify(error));
          },
        );

        tx.executeSql(
          `INSERT INTO categories (id, title, type, icon) VALUES ${categories}`,
          (tx1, resultSet) => {
            console.log('resultSet.insertId: ' + resultSet.insertId);
            console.log('resultSet.rowsAffected: ' + resultSet.rowsAffected);
          },
          (tx1, error) => {
            console.log('CATEGORIES INSERT error: ' + JSON.stringify(error));
          },
        );

        tx.executeSql(
          `INSERT INTO records (id, amount,date,categoryId,payFrom,payTo,description,place,camera) VALUES ${records}`,
          (tx1, resultSet) => {
            console.log('resultSet.insertId: ' + resultSet.insertId);
            console.log('resultSet.rowsAffected: ' + resultSet.rowsAffected);
          },
          (tx1, error) => {
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
};

export const fetchSetting = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM settings',
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
