import Promise from 'bluebird';
import superAgent from 'superagent';
import { getOrigin } from '../utils';

export default class User {
  constructor() {

  }

  getCrumb(origin, cookie) {
    return new Promise((resolve, reject) => {
      superAgent
        .get(`${origin}/cgi-bin/notepad?HTTP_COOKIE=${cookie}`)
        .end((err, res) => {
          if (err || !res.ok) {
            return reject(err);
          }

          try {
            var crumb = res.text.match(/<input type=hidden name="crumb" value="(\d+)">/)[1];

            return resolve({
              cookie,
              crumb,
            });
          } catch(e) {
            return reject(new Error('cannot get crumb'));
          }
        });
    });
  }

  getCookie(origin, name) {
    return new Promise((resolve, reject) => {
      if (!chrome) {
        return reject(new Error('cannot get cookie'));
      }

      var payload = {
        url: origin,
        name
      };

      chrome.cookies.get(payload, function(cookie) {
        if (cookie && cookie.value) {
          return resolve(cookie.value);
        } else {
          return reject(new Error('cannot get cookie'));
        }
      });
    });
  }

  checkAuth(config) {
    const origin = getOrigin(config);

    return this.getCookie(origin, 'key')
      .then(cookie => {
        return this.getCrumb(origin, cookie);
      });
  }
}
