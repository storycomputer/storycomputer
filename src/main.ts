// Copyright 2021 Stanislav Senotrusov <stan@senotrusov.com>
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import {app, BrowserWindow} from "electron";

function createWindow () {
  const window = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      enableRemoteModule: (process.env.NODE_ENV === 'test') // this is here just for the spectron test https://github.com/electron-userland/spectron/issues/720
    }
  });

  window.loadFile('index.html');
  // window.webContents.openDevTools();
}

app.whenReady().then(createWindow);

// Quick if all app windows are closed, but not on macOS
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin')
    app.quit();
})

// On macOS, create a new window if dock icon is clicked and no other app windows are open.
app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0)
    createWindow();
})
