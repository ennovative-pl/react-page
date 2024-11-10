//import { IconButton, Tooltip } from '@mui/material';
//import Delete from '@mui/icons-material/Delete';
import React from 'react';
import { useRemoveCell, useUiTranslator } from '../../core/components/hooks';
//import DraftSwitch from '../DraftSwitch';
import { DuplicateButton } from '../DuplicateButton';
import { I18nTools } from '../I18nTools';
import { SelectParentButton } from '../SelectParentButton';
import { BottomToolbarToolsProps } from './types';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export { BottomToolbarToolsProps };
export const BottomToolbarTools: React.FC<BottomToolbarToolsProps> = React.memo(
  ({ nodeId }) => {
    const { t } = useUiTranslator();
    const removeCell = useRemoveCell(nodeId);

    return (
      <div
        style={{ display: 'flex', alignItems: 'center' }}
        className="btn-group"
        role="group"
      >
        <I18nTools nodeId={nodeId} />
        {/* <DraftSwitch nodeId={nodeId} /> */}
        <SelectParentButton nodeId={nodeId} />
        <DuplicateButton nodeId={nodeId} />

        {/* <Tooltip title={t('Remove Plugin') ?? ''}> */}
        <OverlayTrigger
          overlay={<Tooltip title={t('Remove Plugin') ?? ''}></Tooltip>}
        >
          <button
            type="button"
            className="btn btn-sm btn-danger"
            onClick={() => removeCell()}
          >
            <i className="fas fa-fw fa-trash" />
          </button>
        </OverlayTrigger>

        {/* <IconButton
            onClick={() => removeCell()}
            aria-label="delete"
            color="secondary"
          >
            <Delete />
          </IconButton> */}
        {/* </Tooltip> */}
      </div>
    );
  }
);
