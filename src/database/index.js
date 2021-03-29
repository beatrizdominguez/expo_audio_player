import * as SQLite from 'expo-sqlite';


const databaseName = 'tattoos_migration'
const tableName = 'settings_2'
const db = SQLite.openDatabase(`db.${databaseName}`);

const initDatabase = () => {
  return db.transaction(tx => {
    const createTableQuery = `create table if not exists ${tableName} (id integer primary key autoincrement, title_id string, time integer);`
    const createTableOptions =[]
    tx.executeSql(
      createTableQuery,
      createTableOptions,
      (tx, results) => { console.log('init database ok') },
      (tx, err) => { console.log('init database error', err) },
    )
  },
  (error)=> console.log('error global', error),
  ()=> console.log('transaction success') )
}


const getData = (title_id) => {
  console.log('GetData from database')
  return db.transaction(tx => {
    const selectQuery = `select * from ${tableName} where title_id = '${title_id}'`
    const selectOptions = []

    tx.executeSql(
      selectQuery,
      selectOptions,
      (tx, results) => {
        const rowsCount = results.rows.length
        // if (!rowsCount) setOptions(initialConfig)
        
        const data = results.rows.item(0)
        console.log('----------------------------')
        console.log('----------------------------')
        console.log({ data })
        console.log('----------------------------')
        console.log('----------------------------')
        // setOptions(parseObject(data))
      },
      (tx, error) => {
        // setOptions(initialConfig)
        console.log('select error', error)
      }
    )
  },
  (error)=> console.log('error global', error),
  ()=> console.log('transaction success') )
}

const update = ( title_id, time) => {
  console.log('update database')
  if (!selectedValues) selectedValues ={...initialConfig}

  return db.transaction(tx => {
    const len = Object.keys(selectedValues).length

    let columns = ''
    for (let i = 0; i < len; i++) {
      const lastOption = i === len-1
      const val = Object.keys(selectedValues)[i]
      columns += !lastOption ? `${val} text, ` : `${val} text`
    }
    // init table
    const createTableQuery = `create table if not exists ${tableName} (id integer primary key autoincrement, ${columns});`
    const createTableOptions =[]
    tx.executeSql(
      createTableQuery,
      createTableOptions,
      (tx, results) => { console.log('create table ok') },
      (tx, err) => { console.log('create table error', err) },
    )

    // truncate database
    const dropTableQuery = `delete from ${tableName};`
    const dropTableOptions =[]
    tx.executeSql(
      dropTableQuery,
      dropTableOptions,
      (tx, results) => { console.log('truncate table ok') },
      (tx, err) => { console.log('truncate table error', err) },
    )

    // populate table
    // initial values
    let columnNamesString = ''
    let valuesString = ''
    const insertValues = []

    for (let i = 0; i < len; i++) {
      const lastOption = i === len-1
      const key = Object.keys(selectedValues)[i]
      const val = selectedValues[Object.keys(selectedValues)[i]].toString()

      columnNamesString += !lastOption ? `${key}, ` : `${key}`
      valuesString += !lastOption ? '?, ' : '?'
      insertValues.push(val)
    }

    const insertQuery = `insert into ${tableName} (${columnNamesString}) values (${valuesString});`

    tx.executeSql(
      insertQuery,
      insertValues,
      (tx, results) => { console.log('insert into ok') },
      (tx, err) => { console.log('insert into error', err) },
    )

    const selectQuery = `select * from ${tableName}`
    const selectOptions = []
    tx.executeSql(
      selectQuery,
      selectOptions,
      (tx, results) => {
        const data = results.rows.item(0)
        setOptions(parseObject(data))
      },
      (tx, error) => { console.log('select error', error) }
    )
  },
  (error)=> console.log('transaction error', error),
  ()=> { console.log('transaction success') })
}

function parseObject (object){
  const parsedObject = {}
  for (const key in object) {
    if (key == 'id') continue
    parsedObject[key] = object[key].split(',')
  }
  return parsedObject
}

export {
  initDatabase,
  getData,
  update,
}
