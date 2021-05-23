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

import sqlite from 'sqlite3';
import fs from 'fs';

const isTest = process.env.NODE_TEST_ENV === 'true';

if (isTest) {
  fs.mkdir('tmp', { recursive: true }, (err: any) => {
    if (err) throw err;
  });
  
  const db = new sqlite.Database('tmp/test.sqlite');

  db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS testTable (testField TEXT);");
    db.run("DELETE FROM testTable;");
    db.run("INSERT INTO testTable VALUES('sqlite works');");
    db.get("SELECT testField FROM testTable;", (err: any, row: any) => {
      const output = document.createElement('div');
      output.id = 'sqliteTestResult';
      document.body.appendChild(output);
      output.innerHTML = row.testField;
    });
  });
  db.close();
}
