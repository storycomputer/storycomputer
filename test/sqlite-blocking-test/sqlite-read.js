const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('tmp/bigtestdb.sqlite');

console.log('hello');

setInterval(() => console.log('.'), 200);

db.get('SELECT avg(number) AS avg FROM data;', function(err, row) {
  console.log('average number is:', row.avg);
  process.exit(0);
});

db.close();
