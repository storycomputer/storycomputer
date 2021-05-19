require "sqlite3"

db = SQLite3::Database.new 'tmp/bigtestdb.sqlite'
db.busy_timeout = 5000

db.execute "PRAGMA encoding = 'UTF-8'"
db.execute "PRAGMA locking_mode = 'EXCLUSIVE'"
db.execute "PRAGMA journal_mode = 'WAL'"
db.execute "PRAGMA synchronous = 'NORMAL'"
db.execute "PRAGMA cache_size = '5000'"

db.execute "CREATE TABLE data (number TEXT);"

insert = db.prepare("INSERT INTO data (number) VALUES (random());")

# make 1GB file
10000.times do
  db.execute "BEGIN;"
  4000.times do
    insert.execute!
  end
  db.execute "COMMIT;"
end

insert.close

db.execute "PRAGMA optimize"
db.execute "VACUUM"
db.execute "PRAGMA wal_checkpoint(TRUNCATE)"

db.close
