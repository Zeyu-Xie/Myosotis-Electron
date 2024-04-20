const { ipcRenderer } = require('electron');

window.addEventListener("DOMContentLoaded", () => {
  const _newWindow = document.getElementById("new-window");
  _newWindow.addEventListener("click", () => {
    // 调用主进程中暴露的创建新窗口的函数
    ipcRenderer.invoke('createNewWindow');
  }); 
});
