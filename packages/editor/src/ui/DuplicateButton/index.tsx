import { IconButton, Tooltip } from '@mui/material';
import Icon from '@mui/icons-material/FileCopy';
import React from 'react';
import { useDuplicateCell, useUiTranslator } from '../../core/components/hooks';

export const DuplicateButton: React.FC<{ nodeId: string }> = React.memo(
  ({ nodeId }) => {
    const duplicateCell = useDuplicateCell(nodeId);
    const { t } = useUiTranslator();
    return (
      <Tooltip title={t('Duplicate Plugin') ?? ''}>
        <button
          type="button"
          className="btn btn-sm btn-secondary"
          onClick={duplicateCell}
        >
          <i className="fa-regular fa-fw fa-copy" />
        </button>
        {/* <IconButton onClick={duplicateCell} aria-label="delete" color="default">
          <Icon />
        </IconButton> */}
      </Tooltip>
    );
  }
);
