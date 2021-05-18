const sqlite = require('sqlite3');

const aboutVersions = document.getElementById('about-versions');

if (aboutVersions)
  aboutVersions.innerHTML = `
    Node.js ${process.versions.node},
    SQLite ${sqlite.VERSION},
    Chrome ${process.versions.chrome},
    and Electron ${process.versions.electron}`;
