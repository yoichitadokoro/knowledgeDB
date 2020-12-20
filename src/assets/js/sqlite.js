const sqlite3 = require('sqlite3').verbose()
let db
class sqlite{
  conn () {
    if (!db || !db.open) {
      db = new sqlite3.Database('base.db')
    }
    return db
  }
  initTable(){
    return new Promise((resolve, reject) => {
      let db = this.conn()
      db.serialize(() => {
        db.run('CREATE TABLE if not exists TreeTable (id int primary key, name varchar(64), fatherId int)')
        db.run('CREATE TABLE IF NOT EXISTS ProductTable (id int primary key, name varchar(64))')
        resolve()
      })
    })
  }
  queryAllTree(){
    return new Promise((resolve, reject) => {
      let db = this.conn()
      db.all('select id, name, fatherId from TreeTable order by fatherId', (err, rows) => {
        if (err) reject(err)
        resolve(rows || [])
      })
    })
  }
  queryAllProduct(){
    return new Promise((resolve, reject) => {
      let db = this.conn()
      db.all('select id, name from ProductTable', (err, rows) => {
        if (err) reject(err)
        resolve(rows || [])
      })
    })
  }
  insertProduct(product){
    return new Promise((resolve, reject) => {
      let db = this.conn()
      let prepare = db.prepare('replace into ProductTable (id, name) values (?, ?)')
      prepare.run(product.id, product.name)
      prepare.finalize(err => {
        if (!err) resolve()
      })
    })
  }
}

module.exports = sqlite
