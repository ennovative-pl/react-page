import type { ListProps } from '@mui/material/List';
import ListMaterial from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import type { ReactNode } from 'react';
import React, { Children, cloneElement, isValidElement } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import type { FieldProps } from 'uniforms';
import { connectField, filterDOMProps } from 'uniforms';

import ListAddField from './ListAddField';
import ListItemField, { DragItemType } from './ListItemField';

export type ListFieldProps = FieldProps<
  unknown[],
  ListProps,
  {
    addIcon?: ReactNode;
    initialCount?: number;
    itemProps?: Record<string, unknown>;
  }
>;

function List({
  addIcon,
  children = <ListItemField name="$" />,
  initialCount,
  itemProps,
  label,
  value,
  ...props
}: ListFieldProps) {
  // Generate a unique droppable ID for this list
  const droppableId = `list-${label || 'unnamed'}-${Math.random()
    .toString(36)
    .substring(2)}`;

  return (
    <>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <ListMaterial
            ref={provided.innerRef}
            dense
            subheader={
              label ? (
                <ListSubheader disableSticky>{label}</ListSubheader>
              ) : undefined
            }
            {...provided.droppableProps}
            {...filterDOMProps(props)}
          >
            {value?.map((item, itemIndex) =>
              Children.map(children, (child, childIndex) =>
                isValidElement(child)
                  ? cloneElement(child, {
                      key: `${itemIndex}-${childIndex}`,
                      name: child.props.name?.replace('$', '' + itemIndex),
                      index: itemIndex, // Add index for react-beautiful-dnd
                      ...itemProps,
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    } as any)
                  : child
              )
            )}
            {provided.placeholder}
          </ListMaterial>
        )}
      </Droppable>
      <ListAddField icon={addIcon} initialCount={initialCount} name="$" />
    </>
  );
}

export default connectField<ListFieldProps>(List);
