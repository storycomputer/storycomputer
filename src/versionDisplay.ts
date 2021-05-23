const output = document.createElement('div');

output.id = 'versionDisplay';

output.innerHTML = `
Node.js ${process.versions.node},
SQLite <span class=sqlite></span>,
Chrome ${process.versions.chrome},
and Electron ${process.versions.electron}`;

document.body.appendChild(output);

// sqlite
import sqlite from 'sqlite3';

const memoryDb = new sqlite.Database(':memory:');

memoryDb.serialize(function() {
  memoryDb.get("SELECT sqlite_version() as version;", (err: any, row: any) => {
    const sqliteVersion=document.querySelector('#versionDisplay .sqlite');
    if (sqliteVersion)
      sqliteVersion.innerHTML = row.version;
  });
});

memoryDb.close();
