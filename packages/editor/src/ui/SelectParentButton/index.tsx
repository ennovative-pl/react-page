import IconButton from '@mui/material/IconButton';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';

import React from 'react';
import {
  useFocusCell,
  useParentCellId,
  useUiTranslator,
} from '../../core/components/hooks';
import { Tooltip } from '@mui/material';

export const SelectParentButton: React.FC<{
  nodeId: string;
}> = React.memo(({ nodeId }) => {
  const parentCellId = useParentCellId(nodeId);
  const { t } = useUiTranslator();
  const focusParent = useFocusCell(parentCellId);

  return parentCellId ? (
    <Tooltip title={t('Select parent') ?? ''}>
      <button
        type="button"
        className="btn btn-sm btn-secondary"
        onClick={() => focusParent()}
      >
        <i className="fas fa-fw fa-arrows-up-to-line" />
      </button>
    </Tooltip>
  ) : // <IconButton
  //   className="bottomToolbar__selectParentButton"
  //   onClick={() => focusParent()}
  //   color="default"
  //   title={t('Select parent') ?? ''}
  // >
  //   <VerticalAlignTopIcon />
  // </IconButton>
  null;
});
