// Modules to control application life and create native browser window
const {electron,BrowserWindow,app,ipcMain,Menu} = require('electron');
const path = require('path')

function createWindow () {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: __dirname + '/preload.js'
    }
  })

  // and load the index.html of the app.
  mainWindow.loadFile('src/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const sqlite = require('./src/assets/js/sqlite.js')
const sq = new sqlite()
let qr = []
let detail = []
ipcMain.handle("createtable", async (event, arg) => {
  const temp1 = await sq.initTable()
  const temp2 = await sq.insertKnowledge({
    name:'田所',
    client:'依頼者',
    title:'タイトル',
    summary:'概要',
    result:'結果',
    category:'カテゴリ',
    soft:'ソフトウェア',
    keyword:'キーワード',
    datefrom:'開始時期',
    dateto:'終了時期',
    directory:'ディレクトリ',
    image:'画像',
    remark:'備考'
  })
  console.log(arg);
  return 'from electron1'
});
ipcMain.handle("search_keyword", async (event, arg) => {
  const query = await sq.query_keyword(arg)
//  console.log(arg,query);
  qr = query
  return query
});
ipcMain.handle("get_query", async (event, arg) => {
  return qr
});
ipcMain.handle("search_detail", async (event, arg) => {
  detail = qr.find(item => item.id === arg)
  console.log(detail)
  return detail
});
ipcMain.handle("get_detail", async (event, arg) => {
  return detail
});
ipcMain.handle("edit_set", async (event, arg) => {
  return qr
});
ipcMain.handle("delete_set", async (event, arg) => {
  return qr
});
