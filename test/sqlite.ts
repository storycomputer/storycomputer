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

import assert from 'assert';
import sqlite3 from 'sqlite3';

if (process.env.NODE_TEST_ENV === 'true')
  sqlite3.verbose();

describe('Test sqlite module', function () {
  it('check JSON1 Extension', (done) => {
      // TODO: Run this test inside electron app
      const db = new sqlite3.Database(':memory:');
      db.serialize(function() {
        db.run('CREATE TABLE test_table (test_field TEXT);');
      
        const insert = db.prepare('INSERT INTO test_table VALUES(json(?));');
        insert.run(JSON.stringify({string_key: 'string value'}));
        insert.finalize();
      
        db.get('SELECT json_extract(test_field, \'$.string_key\') AS string_key FROM test_table;', function(err, row) {
          assert.strictEqual(row.string_key, 'string value');
          done();
        });
      });
      db.close();
  });
});
