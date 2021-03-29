import * as SQLite from 'expo-sqlite';

const databaseName = 'audio_player'
const tableName = 'settings_3'
const db = SQLite.openDatabase(`db.${databaseName}`);

const initDatabase = () => {
  return db.transaction(tx => {
    const createTableQuery = `create table if not exists ${tableName} (id integer primary key autoincrement, title_id string not null unique, time integer);`
    const createTableOptions = []
    tx.executeSql(
      createTableQuery,
      createTableOptions,
      (tx, results) => { console.log('init database ok') },
      (tx, err) => { console.log('init database error', err) },
    )
  },
    (error) => console.log('error global', error),
    () => console.log('transaction success'))
}


const getDataById = async (title_id, setPositionMillis) => {
  return db.transaction(tx => {
    const selectQuery = `select * from ${tableName} where title_id = '${title_id}'`
    const selectOptions = []

    tx.executeSql(
      selectQuery,
      selectOptions,
      (tx, results) => {
        const rowsCount = results.rows.length
        if (!rowsCount) {
          setPositionMillis(0)
          return
        }

        const data = results.rows.item(0)

        const time = data ? (data.time || 0) : 0
        setPositionMillis(time)
      },
      (tx, error) => {
        console.log('select error', error)
      }
    )
  },
    (error) => console.log('error global', error),
    () => console.log('transaction success'))
}

const update = (title_id, time = 0) => {
  if (!title_id) return

  return db.transaction(tx => {
    const insertValues = [title_id, time]

    const insertQuery = `insert or replace into ${tableName} (title_id, time) values (? , ?);`

    tx.executeSql(
      insertQuery,
      insertValues,
      (tx, results) => { console.log('insert into ok') },
      (tx, err) => { console.log('insert into error', err) },
    )
  },
    (error) => console.log('transaction error', error),
    () => { console.log('transaction success') })
}

export {
  initDatabase,
  getDataById,
  update,
}
