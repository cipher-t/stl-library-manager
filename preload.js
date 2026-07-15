const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    selectFolder: () =>
        ipcRenderer.invoke('select-folder'),
    scanLibrary: (folder) =>
        ipcRenderer.invoke(
            'scan-library',
            folder
        )
});