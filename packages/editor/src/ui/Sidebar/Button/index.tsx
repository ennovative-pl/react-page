import React from 'react';
import type { PropTypes } from '@mui/material';
import { useIsSmallScreen } from '../../../core/components/hooks';
import { Tooltip } from '@mui/material';

interface DisplayModeToggleProps {
  description: string;
  icon: JSX.Element;
  active?: boolean;
  disabled?: boolean;
  activeColor?: PropTypes.Color;
  onClick: React.MouseEventHandler<HTMLElement>;
  style?: React.CSSProperties;
}

const DisplayModeToggle = React.memo<DisplayModeToggleProps>(
  ({ description, icon, onClick, active, disabled, style, ...rest }) => {
    const isSmall = useIsSmallScreen();

    return (
      <div className="react-page-controls-mode-toggle-button" style={style}>
        <div className="react-page-controls-mode-toggle-button-inner">
          <Tooltip title={description} placement="left">
            <button
              type="button"
              className={
                'btn ' +
                (active ? 'btn-primary' : 'btn-secondary') +
                (isSmall ? ' btn-sm' : '')
              }
              onClick={onClick}
              disabled={disabled}
              {...rest}
            >
              {icon}
            </button>
          </Tooltip>
        </div>
        {/* <div className="react-page-controls-mode-toggle-button-description">
          {description}
        </div> */}
      </div>
    );
  }
);

// Add a display name to the component
DisplayModeToggle.displayName = 'DisplayModeToggle';

export default DisplayModeToggle;
