//import Fab from '@mui/material/Fab';
//import Delete from '@mui/icons-material/Delete';
import classNames from 'classnames';
import React, { useState } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { useIsLayoutMode, useTrashDrop } from '../../core/components/hooks';

export const Trash: React.FC = React.memo(() => {
  const isLayoutMode = useIsLayoutMode();
  const { ref, handleDragEnd } = useTrashDrop();
  const [isHovering, setIsHovering] = useState(false);

  // Add this as a listener to the DragDropContext onDragEnd prop
  React.useEffect(() => {
    // This is just a stub - the actual implementation would connect
    // this handler to the DragDropContext in a parent component
    const globalDndContext = document.querySelector('body');
    if (globalDndContext) {
      // In a real implementation, we would register this handler with the DragDropContext
    }
  }, [handleDragEnd]);

  return (
    <Droppable droppableId="trash-drop-area">
      {(provided, snapshot) => {
        // Update hovering state based on the snapshot
        const isDraggingOver = snapshot.isDraggingOver;
        if (isHovering !== isDraggingOver) {
          setIsHovering(isDraggingOver);
        }

        return (
          <div
            ref={provided.innerRef}
            className={classNames('react-page-controls-trash', {
              'react-page-controls-trash-active': isLayoutMode,
              'react-page-controls-trash-hover': isDraggingOver,
            })}
            {...provided.droppableProps}
          >
            {/* <Fab color="secondary" disabled={!isHovering}> */}
            {/* <Delete /> */}
            <button
              type="button"
              className="btn btn-secondary"
              disabled={!isHovering}
            >
              <i className="fas fa-fw fa-trash text-secondary m-2" />
            </button>
            {/* </Fab> */}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
});
