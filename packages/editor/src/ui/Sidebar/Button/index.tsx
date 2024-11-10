import React, { useState, useEffect, useRef } from 'react';

import type { PropTypes } from '@mui/material';
import { useIsSmallScreen } from '../../../core/components/hooks';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const DisplayModeToggle = ({
  description,
  icon,
  onClick,
  active,
  disabled,
  activeColor = 'secondary',
  style,
  ...rest
}: {
  description: string;
  icon: JSX.Element;
  active?: boolean;
  disabled?: boolean;
  activeColor?: PropTypes.Color;
  onClick: React.MouseEventHandler<HTMLElement>;
  style?: React.CSSProperties;
} & unknown) => {
  const isSmall = useIsSmallScreen();
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="react-page-controls-mode-toggle-button" style={style}>
      <div className="react-page-controls-mode-toggle-button-inner">
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>{description}</Tooltip>}
        >
          <button
            type="button"
            className={'btn ' + (active ? 'btn-primary' : 'btn-secondary')}
            onClick={onClick}
            disabled={disabled}
            title={description}
            ref={buttonRef}
            {...rest}
          >
            {icon}
          </button>
        </OverlayTrigger>
      </div>
      {/* <div className="react-page-controls-mode-toggle-button-description">
        {description}
      </div> */}
    </div>
  );
};

export default DisplayModeToggle;
