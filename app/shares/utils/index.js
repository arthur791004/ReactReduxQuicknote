import Promise from 'bluebird';
import React from 'react';
import superAgent from 'superagent';
import { Checkbox, TextField } from 'material-ui';

export function renderCheckbox({ input, label }) {
  return (
    <Checkbox
      label={ label }
      checked={ input.value ? true : false }
      onCheck={ input.onChange }
    />
  );
}

export function renderTextField({ input, label, meta: { touched, error }, ...custom }) {
  return (
    <TextField
      hintText={ label }
      { ...input }
      { ...custom }
    />
  );
}

export function getOrigin({ hostname, port, enableSSL }) {
  const protocols = enableSSL ? 'https://' : 'http://';

  return `${protocols}${hostname}:${port}`;
}

export function getOpengraph(url) {
  return new Promise((resolve, reject) => {
    const urlEncoded = encodeURIComponent(url);
    const requestUrl = 'https://opengraph.io/api/1.0/site/' + urlEncoded;

    superAgent
      .get(requestUrl)
      .end((err, res) => {
        if (err || res.error) {
          reject(err || res.error);
        } else {
          resolve(res.body);
        }
      });
  });
}
