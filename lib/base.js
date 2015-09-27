/*jslint node: true */
/*jshint esnext: true */
'use strict';

var LivePaper = require('./live_paper');
var https = require('https');
const AUTH_HOST = 'www.livepaperapi.com';
const AUTH_PATH = '/auth/v1/token';

class AuthObject {

  save() {}
  update() {}
  delete() {}
  get(id) {}

  request(method, url, options) {
    let tries = 0;

  }

  static _createAuthBody() {
    return {
      host: AUTH_HOST,
      path: AUTH_PATH,
      method: 'POST',
      headers: {
        'authorization': `Basic ${LivePaper.basicAuth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'accept': 'application/json'
      }
    };
  }

  static requestToken() {
    return new Promise((resolve, reject) => {
      let req = https.request(Auth._createAuthBody(), (res) => {
        res.on('data', (data) => {
          let action = (res.statusCode === 200) ? resolve : reject;
          //try-catch this
          action(JSON.parse(data));
        });
      });
      req.on('error', reject);
      req.write('grant_type=client_credentials&scope=default');
      req.end();
    });
  }
}
module.exports = Auth;
