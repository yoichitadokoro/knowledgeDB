const sqlite3 = require('sqlite3').verbose()
let db
class sqlite{
  conn () {
    if (!db || !db.open) {
      db = new sqlite3.Database('knowledge.db')
    }
    return db
  }
  initTable(){
    return new Promise((resolve, reject) => {
      let db = this.conn()
      db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS Knowledge (\
          id integer primary key autoincrement,\
          name text,\
          client text,\
          title text,\
          summary text,\
          result text,\
          category text,\
          soft text,\
          keyword text,\
          datefrom text,\
          dateto text,\
          directory text,\
          image text,\
          remark text\
        )')
        resolve()
      })
    })
  }
  query_keyword(keyword){
    return new Promise((resolve, reject) => {
      let db = this.conn()
      if(keyword != ''){
        db.get('select * from Knowledge where keyword like ?',keyword, (err, rows) => {
          if (err) reject(err)
          resolve(rows || [])
        })
      }else{
        db.all('select * from Knowledge',(err,rows)=>{
          if (err) reject(err)
          resolve(rows || [])
        })
      }
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
  insertKnowledge(p){
    return new Promise((resolve, reject) => {
      let db = this.conn()
      let prepare = db.prepare('insert into Knowledge (id,name,client,title,summary,result,category,soft,keyword,datefrom,dateto,directory,image,remark) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?)')
      prepare.run(null,p.name,p.client,p.title,p.summary,p.result,p.category,p.soft,p.keyword,p.datefrom,p.dateto,p.directory,p.image,p.remark)
      prepare.finalize(err => {
        if (!err) resolve()
      })
    })
  }
}

module.exports = sqlite
