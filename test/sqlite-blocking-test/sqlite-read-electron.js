const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('tmp/bigtestdb.sqlite');

console.log('hello');

const someText = document.getElementById('about-versions');

if (someText)
  setInterval(() => {
    someText.innerHTML = Math.random();
  }, 500);

setInterval(() => console.log('.'), 500);

db.get('SELECT avg(number) AS avg FROM data;', function(err, row) {
  console.log('average number is:', row.avg);
});

db.close();
