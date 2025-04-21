import type { ReactNode } from 'react';
import React from 'react';

import { IconButton } from '@mui/material';
import type { ListItemProps } from '@mui/material/ListItem';
import ListItemMaterial from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';

import { Draggable } from 'react-beautiful-dnd';
import { connectField, joinName, useField } from 'uniforms';

import AutoField from './AutoField';
import ListDelField from './ListDelField';
import ListSortField from './ListSortField';

export enum DragItemType {
  ListItemField = 'ListItemField',
}

export type ListItemFieldProps = {
  children?: ReactNode;
  dense?: ListItemProps['dense'];
  disableGutters?: ListItemProps['disableGutters'];
  divider?: ListItemProps['divider'];
  removeIcon?: ReactNode;
  dragIcon?: ReactNode;
  moveItemUpIcon?: ReactNode;
  moveItemDownIcon?: ReactNode;
  disableSortable?: boolean;
  value?: unknown;
  name?: string;
  index?: number;
};

function ListItem({
  children = <AutoField label={null} name="" />,
  dense = true,
  disableGutters,
  divider,
  removeIcon,
  moveItemUpIcon,
  moveItemDownIcon,
  dragIcon = <DragIndicatorIcon />,
  disableSortable,
  value,
  name,
  index = 0,
}: ListItemFieldProps) {
  const nameParts = joinName(null, name);
  const nameIndex = +nameParts[nameParts.length - 1];
  const parentName = joinName(nameParts.slice(0, -1));

  const parent = useField<Record<string, unknown>, unknown[]>(
    parentName,
    {},
    { absoluteName: true }
  )[0];

  const moveItem = (fromIndex: number, toIndex: number) => {
    const value = (parent.value ?? []).slice();
    value.splice(fromIndex, 1);
    value.splice(toIndex, 0, (parent.value ?? [])[fromIndex]);
    parent.onChange(value);
  };

  const disableSort = disableSortable ?? (parent.value ?? []).length < 2;

  const draggableId = `list-item-${name || 'unnamed'}-${nameIndex}`;

  return (
    <Draggable
      draggableId={draggableId}
      index={index}
      isDragDisabled={disableSort}
    >
      {(provided, snapshot) => (
        <ListItemMaterial
          dense={dense}
          disableGutters={disableGutters}
          divider={divider}
          ref={provided.innerRef}
          {...provided.draggableProps}
          sx={{
            gap: '0.5rem',
            backgroundColor: snapshot.isDragging ? 'rgba(0, 0, 0, 0.05)' : undefined,
          }}
        >
          <div {...provided.dragHandleProps}>
            <ListSortField
              name=""
              iconUp={moveItemUpIcon}
              iconDown={moveItemDownIcon}
              handleMove={moveItem}
              dragIcon={dragIcon}
              disabled={disableSort}
            />
          </div>

          {children}
          <ListDelField name="" icon={removeIcon} />
        </ListItemMaterial>
      )}
    </Draggable>
  );
}

export default connectField<ListItemFieldProps>(ListItem, {
  initialValue: false,
});
