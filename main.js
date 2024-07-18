const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  mainWindow.loadFile('index.html');
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

ipcMain.handle("get-data", () => {
  const data = fs.readFileSync("info.json", "utf-8");
  return JSON.parse(data);
});

ipcMain.handle("save-response", (event, { NIN, TEL, responseText }) => {
  const fileName = `${NIN}_${TEL}.txt`;
  fs.writeFileSync(fileName, responseText, 'utf-8');

  const data = JSON.parse(fs.readFileSync("info.json", "utf-8"));
  const updatedData = data.map(item => {
    if (item.NIN === NIN) {
      return { ...item, processed: true };
    }
    return item;
  });
  fs.writeFileSync("info.json", JSON.stringify(updatedData, null, 2));
});

ipcMain.handle("add-data", (event, newData) => {
  const data = JSON.parse(fs.readFileSync("info.json", "utf-8"));
  data.push({ ...newData, processed: false });
  fs.writeFileSync("info.json", JSON.stringify(data, null, 2));
});

ipcMain.handle("update-data", (event, updatedData) => {
  const data = JSON.parse(fs.readFileSync("info.json", "utf-8"));
  const updatedDataList = data.map(item => {
    if (item.NIN === updatedData.NIN) {
      return { ...item, ...updatedData, processed: false };
    }
    return item;
  });
  fs.writeFileSync("info.json", JSON.stringify(updatedDataList, null, 2));
});

ipcMain.handle("delete-data", (event, NIN) => {
  const data = JSON.parse(fs.readFileSync("info.json", "utf-8"));
  const updatedDataList = data.filter(item => item.NIN !== NIN);
  fs.writeFileSync("info.json", JSON.stringify(updatedDataList, null, 2));
});
