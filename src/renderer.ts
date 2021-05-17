
const aboutVersions = document.getElementById('about-versions');

if (aboutVersions)
  aboutVersions.innerHTML = `
    Node.js ${process.versions.node},
    SQLite ${require('sqlite3').VERSION},
    Chrome ${process.versions.chrome},
    and Electron ${process.versions.electron}`;
