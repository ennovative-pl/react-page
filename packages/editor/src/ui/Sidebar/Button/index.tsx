import React, { useState, useEffect, useRef } from 'react';

import type { PropTypes } from '@mui/material';
import { useIsSmallScreen } from '../../../core/components/hooks';

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
        <button
          type="button"
          className={'btn ' + (active ? 'btn-primary' : 'btn-secondary')}
          onClick={onClick}
          disabled={disabled}
          data-toggle="tooltip"
          data-placement="left"
          title={description}
          ref={buttonRef}
          {...rest}
        >
          {icon}
        </button>
      </div>
      <div className="react-page-controls-mode-toggle-button-description">
        {description}
      </div>
    </div>
  );
};

export default DisplayModeToggle;
