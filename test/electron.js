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

const {Application} = require('spectron');
const assert = require('assert');
const electronPath = require('electron');
const path = require('path');

describe('Launch Electron application', function () {
  this.timeout(10000);

  beforeEach(() => {
    this.app = new Application({
      path: electronPath,
      args: [path.join(__dirname, '..')]
    });
    return this.app.start();
  });

  afterEach(() => {
    if (this.app && this.app.isRunning()) {
      return this.app.stop();
    }
  });

  it('show application window', async () => {
    assert.strictEqual(await this.app.client.getWindowCount(), 1);
  });

  it('verify sqlite works in renderer', async () => {
    await this.app.client.waitUntilTextExists('#sqliteTestResult', 'sqlite works');
  });
});
