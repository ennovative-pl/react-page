import { IconButton, Tooltip } from '@mui/material';
import ScaleIcon from '@mui/icons-material/AspectRatio';
import React from 'react';
import { useUiTranslator } from '../../core/components/hooks';

export const MinimizeButton: React.FC<{
  minimized: boolean;
  setMinimized: (s: boolean) => void;
}> = ({ minimized, setMinimized }) => {
  const { t } = useUiTranslator();
  const toggleMinimize = React.useCallback(() => {
    setMinimized(!minimized);
  }, [minimized, setMinimized]);
  return (
    <Tooltip title={t('Minimize this window') ?? ''}>
      <button
        type="button"
        className="btn btn-sm btn-primary"
        aria-label="Pokaż / ukryj własności obiektu"
        onClick={toggleMinimize}
      >
        <i
          className={`fas fa-fw ${
            minimized ? 'fa-window-maximize' : 'fa-window-minimize'
          }`}
        />
      </button>

      {/* <IconButton
        onClick={toggleScale}
        aria-label="Change size of this window"
        color="primary"
      >
        <ScaleIcon />
      </IconButton> */}
    </Tooltip>
  );
};
