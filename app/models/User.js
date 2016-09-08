import Promise from 'bluebird';
import superAgent from 'superagent';

const HOSTNAME = 'https://mail.office.openfind.com.tw';

export default class User {
  constructor() {

  }

  getCrumb(cookie) {
    return new Promise((resolve, reject) => {
      superAgent
        .get(`${HOSTNAME}/cgi-bin/notepad?HTTP_COOKIE=${cookie}`)
        .end((err, res) => {
          if (err || !res.ok) {
            return reject(err);
          }

          try {
            var crumb = res.text.match(/<input type=hidden name="crumb" value="(\d+)">/)[1];

            this.cookie = cookie;
            this.crumb = crumb;
            return resolve(this);
          } catch(e) {
            return reject(new Error('cannot get cookie or crumb'));
          }
        });
    });
  }

  getCookie(url, name) {
    return new Promise((resolve, reject) => {
      if (!chrome) {
        return reject(new Error('cannot get cookie or crumb'));
      }

      var payload = {
        url,
        name
      };

      chrome.cookies.get(payload, function(cookie) {
        return resolve(cookie.value);
      });
    });
  }

  checkAuth() {
    return this.getCookie(HOSTNAME, 'key')
      .then(cookie => {
        return this.getCrumb(cookie);
      });
  }
}
