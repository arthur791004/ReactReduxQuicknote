import React from 'react';
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
