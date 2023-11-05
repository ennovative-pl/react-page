import React from 'react';
import { Form } from 'react-bootstrap';

interface IFieldFeedback {
  error: any;
  novalidationspace?: boolean;
}

export function FieldFeedback(props: IFieldFeedback) {
  //   if (props.novalidationspace) {
  //     return <></>;
  //   }

  return (
    <>
      {props.error ? (
        <Form.Control.Feedback type="invalid" style={{ display: 'block' }}>
          <i className="fas fa-exclamation-circle" /> {props.error?.message}
        </Form.Control.Feedback>
      ) : (
        <Form.Text
          className="text-primary"
          style={{ display: props.novalidationspace ? 'none' : 'block' }}
        >
          &nbsp;{props.novalidationspace}
        </Form.Text>
      )}
    </>
  );
}
