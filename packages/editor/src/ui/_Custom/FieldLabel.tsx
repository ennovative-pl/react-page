import type { ReactNode } from 'react';
import Form from 'react-bootstrap/Form';
import React, { Fragment } from 'react';

interface IFieldLabelProps {
  label?: ReactNode;
  subscript?: string | JSX.Element;
  id?: string;
  name: string;
  disabled?: boolean;
  small?: boolean;
}

export const FieldLabel = (props: IFieldLabelProps) => {
  return (
    <Form.Label
      htmlFor={props.id || props.name}
      disabled={props.disabled}
      className="my-0 ms-1"
    >
      <div className={`d-flex ${props.small ? 'small' : undefined}`}>
        {props.label}
      </div>
      {props.subscript && (
        <small className="d-block text-muted">{props.subscript}</small>
      )}
    </Form.Label>
  );
};
