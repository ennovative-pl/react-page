import React from 'react';
import { useDuplicateCell, useUiTranslator } from '../../core/components/hooks';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export const DuplicateButton: React.FC<{ nodeId: string }> = React.memo(
  ({ nodeId }) => {
    const duplicateCell = useDuplicateCell(nodeId);
    const { t } = useUiTranslator();
    return (
      // <Tooltip title={t('Duplicate Plugin') ?? ''}>
      <OverlayTrigger
        overlay={<Tooltip>{t('Duplicate Plugin') ?? ''}</Tooltip>}
      >
        <button
          type="button"
          className="btn btn-sm btn-secondary"
          onClick={duplicateCell}
        >
          <i className="fa-regular fa-fw fa-copy" />
        </button>
      </OverlayTrigger>
    );
    {
      /* <IconButton onClick={duplicateCell} aria-label="delete" color="default">
          <Icon />
        </IconButton> */
    }
    // </Tooltip>
    //);
  }
);
