import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';
import React from 'react';
import { Draggable as DnDDraggable } from 'react-beautiful-dnd';
import type { InsertNewCell } from '../../../core/types';
import { useSetLayoutMode } from '../../../core/components/hooks/displayMode';

interface DraggableProps {
  insert: InsertNewCell;
  draggableId: string;
  index: number;
}

const Draggable: FC<PropsWithChildren<DraggableProps>> = ({
  insert,
  children,
  draggableId,
  index,
}) => {
  const setLayoutMode = useSetLayoutMode();

  // Call setLayoutMode when the component mounts
  React.useEffect(() => {
    setLayoutMode();
  }, [setLayoutMode]);

  // Provide a key to force re-rendering if the draggable properties change
  const uniqueKey = `${draggableId}-${index}`;

  return (
    <DnDDraggable draggableId={draggableId} index={index} key={uniqueKey}>
      {(provided, snapshot) => (
        <div
          className={classNames(
            { 'react-page-toolbar-draggable-is-dragged': snapshot.isDragging },
            'react-page-toolbar-draggable'
          )}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {children}
        </div>
      )}
    </DnDDraggable>
  );
};

export default Draggable;
