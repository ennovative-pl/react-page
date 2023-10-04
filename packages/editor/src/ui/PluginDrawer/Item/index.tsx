import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';

import React from 'react';
import type { PluginDrawerLabels } from '..';
import {
  useDisplayModeReferenceNodeId,
  useInsertNew,
  useUiTranslator,
} from '../../../core/components/hooks';
import type { CellPlugin, InsertNewCell } from '../../../core/types';
import Draggable from '../Draggable/index';
import { FieldLabel } from '../../_Custom/FieldLabel';
import { CustomAvatar } from '../../_Custom/CustomAvatar';

type ItemProps = {
  plugin: CellPlugin;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  insert: InsertNewCell;
  translations: PluginDrawerLabels;
};

const Item: React.FC<ItemProps> = ({ plugin, insert }) => {
  const title = plugin.title ?? plugin.text;
  const { t } = useUiTranslator();
  if (!plugin.icon && !title) {
    return null;
  }

  const referenceNodeId = useDisplayModeReferenceNodeId();
  const insertNew = useInsertNew(referenceNodeId);
  const insertIt = React.useCallback(
    () => insertNew(insert),
    [insertNew, referenceNodeId, insert]
  );

  return (
    <Draggable insert={insert}>
      <ListItem
        title={
          t('Click to add or drag and drop it somewhere on your page!') ?? ''
        }
        className="react-page-plugin-drawer-item"
        onClick={insertIt}
      >
        <CustomAvatar
          children={plugin.icon || title?.[0]}
          style={{
            marginRight: 16,
          }}
        />
        {/* <ListItemText primary={t(title)} secondary={t(plugin.description)} /> */}
        <FieldLabel
          name={plugin.id}
          label={t(title)}
          subscript={t(plugin.description) ?? ''}
        />
      </ListItem>
    </Draggable>
  );
};

export default Item;
