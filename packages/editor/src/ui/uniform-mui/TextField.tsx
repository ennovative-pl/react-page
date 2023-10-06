import type { TextFieldProps as MUITextFieldProps } from '@mui/material/TextField';
import TextField from '@mui/material/TextField';
import React, { ChangeEvent } from 'react';
import { FormGroup, Form } from 'react-bootstrap';
import type { FieldProps } from 'uniforms';
import { connectField, filterDOMProps } from 'uniforms';
import { FieldLabel } from '../_Custom/FieldLabel';
import { FieldFeedback } from '../_Custom/FieldFeedback';

export type TextFieldProps = FieldProps<string, MUITextFieldProps>;

function Text({
  disabled,
  error,
  errorMessage,
  helperText,
  inputRef,
  label,
  name,
  onChange,
  placeholder,
  readOnly,
  showInlineError,
  type = 'text',
  value = '',
  ...props
}: TextFieldProps) {
  return (
    <FormGroup className="m-1">
      {label && (
        <FieldLabel label={label} name={name} disabled={disabled} small />
      )}
      <Form.Control
        test-id={name}
        disabled={disabled}
        type={props.multiline ? undefined : type}
        as={props.multiline ? 'textarea' : undefined}
        rows={props.multiline ? '5' : undefined}
        placeholder={placeholder}
        {...(props as any)}
        onChange={(event) => disabled || onChange(event.target.value)}
        value={value}
        ref={inputRef}
        isInvalid={error && showInlineError && errorMessage}
        isValid={!error && value?.length > 0}
        size="sm"
        // size={props.size == 'small' ? 'sm' : undefined}
        // {...filterDOMProps(props)}
      />
      <FieldFeedback error={error} novalidationspace={true} />
    </FormGroup>

    // <TextField
    //   disabled={disabled}
    //   error={!!error}
    //   fullWidth
    //   helperText={(error && showInlineError && errorMessage) || helperText}
    //   inputProps={{ readOnly }}
    //   label={label}
    //   margin="dense"
    //   name={name}
    //   onChange={(event) => disabled || onChange(event.target.value)}
    //   placeholder={placeholder}
    //   ref={inputRef}
    //   type={type}
    //   value={value}
    //   {...filterDOMProps(props)}
    // />
  );
}

export default connectField<TextFieldProps>(Text, { kind: 'leaf' });
