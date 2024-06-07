const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('seo', {
    start: (url, keyboard, count, option) => ipcRenderer.invoke('start', url, keyboard, count, option),
    stop: () => ipcRenderer.invoke('stop'),
    proxylist: () => ipcRenderer.invoke('proxylist')
})