const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const path = require('path');
const fs = require('fs');

function createWindow(){
    const win = new BrowserWindow({
        width: 1400,
        height: 900,
        webPreferences:{
            preload: path.join(__dirname, 'preload.js')
        }
    });

    win.loadURL(
        'http://localhost:5173'
    );
    win.webContents.openDevTools();
}

app.whenReady().then(createWindow);

ipcMain.handle('select-folder', async () => {
    const result = await dialog.showOpenDialog({
        properties: ['openDirectory']
    });
    if(result.canceled){
        return null;
    }
    return result.filePaths[0];
});

function findSTLFiles(folder){
    let results = [];
    const items =
        fs.readdirSync(folder,
        { withFileTypes:true });
    for(const item of items){
        const fullPath =
            path.join(folder, item.name);
        if(item.isDirectory()){
            results =
                results.concat(
                    findSTLFiles(fullPath)
                );
        }
        else if(
            item.name
            .toLowerCase()
            .endsWith(".stl")
        ){
            results.push(fullPath);
        }
    }
    return results;
}

ipcMain.handle(
    'scan-library',
    async (event, folder) => {
        return findSTLFiles(folder);
    }
);

ipcMain.handle(
    'read-stl-file',
    async (event, filePath) => {

        return fs.readFileSync(filePath);

    }
);