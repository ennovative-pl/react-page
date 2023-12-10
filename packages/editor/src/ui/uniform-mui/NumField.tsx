import type { TextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import React from 'react';
import { Form, FormGroup } from 'react-bootstrap';
import type { FieldProps } from 'uniforms';
import { connectField, filterDOMProps } from 'uniforms';
import { FieldFeedback } from '../_Custom/FieldFeedback';
import { FieldLabel } from '../_Custom/FieldLabel';
import omit from 'lodash/omit';

export type NumFieldProps = FieldProps<
  number,
  TextFieldProps,
  { decimal?: boolean; max?: number; min?: number; step?: number }
>;

function Num({
  decimal,
  disabled,
  error,
  errorMessage,
  helperText,
  inputProps,
  inputRef,
  label,
  max,
  min,
  name,
  onChange,
  readOnly,
  placeholder,
  showInlineError,
  step = decimal ? 0.01 : 1,
  value,
  ...props
}: NumFieldProps) {
  return (
    <div>
      <FormGroup className="m-1">
        {label && (
          <FieldLabel label={label} name={name} disabled={disabled} />
        )}
        <Form.Control
          test-id={name}
          disabled={disabled}
          type="number"
          placeholder={placeholder}
          {...({
            ...omit(filterDOMProps(props), [
              'helperText',
              'fullWidth',
              'fieldType',
              'showIf',
            ]),
          } as any)}
          onChange={(event) => {
            const parse = decimal ? parseFloat : parseInt;
            const value = parse(event.target.value);
            onChange(isNaN(value) ? undefined : value);
          }}
          min={min}
          max={max}
          step={step}
          value={value}
          ref={inputRef}
          size="sm"
          isInvalid={error && showInlineError && errorMessage}
          isValid={!error && value !== undefined}
          changed={props.changed ? 'true' : 'false'}
          // {...filterDOMProps(props)}
        />
        <FieldFeedback error={error} novalidationspace={true} />
      </FormGroup>
    </div>

    // <TextField
    //   disabled={disabled}
    //   error={!!error}
    //   fullWidth
    //   helperText={(error && showInlineError && errorMessage) || helperText}
    //   inputProps={{
    //     min,
    //     max,
    //     readOnly,
    //     step,
    //     ...inputProps,
    //   }}
    //   label={label}
    //   margin="dense"
    //   name={name}
    //   onChange={(event) => {
    //     const parse = decimal ? parseFloat : parseInt;
    //     const value = parse(event.target.value);
    //     onChange(isNaN(value) ? undefined : value);
    //   }}
    //   placeholder={placeholder}
    //   ref={inputRef}
    //   type="number"
    //   value={value ?? ''}
    //   {...filterDOMProps(props)}
    // />
  );
}

export default connectField<NumFieldProps>(Num, { kind: 'leaf' });
