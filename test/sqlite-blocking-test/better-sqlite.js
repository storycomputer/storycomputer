const db = require('better-sqlite3')('tmp/bigtestdb.sqlite');

console.log('hello');

const someText = document.getElementById('about-versions');

if (someText)
  setInterval(() => {
    someText.innerHTML = Math.random();
  }, 500);

setInterval(() => console.log('.'), 500);

const select = db.prepare('SELECT avg(number) AS avg FROM data;');

console.log('average number is:', select.get().avg);

process.on('exit', () => db.close());
