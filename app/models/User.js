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

            this.cookie = cookie;
            this.crumb = crumb;
            return resolve(this);
          } catch(e) {
            return reject(new Error('cannot get cookie or crumb'));
          }
        });
    });
  }

  getCookie(origin, name) {
    return new Promise((resolve, reject) => {
      if (!chrome) {
        return reject(new Error('cannot get cookie or crumb'));
      }

      var payload = {
        url: origin,
        name
      };

      chrome.cookies.get(payload, function(cookie) {
        return resolve(cookie.value);
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
