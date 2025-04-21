import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useOption } from '../components/hooks';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DndProvider = ({ children }: any) => {
  const dndBackend = useOption('dndBackend');

  // Add classes to document body when dragging occurs
  const onDragStart = () => {
    document.body.classList.add('react-page-dragging');
  };

  const onDragEnd = (result: any) => {
    // Remove the dragging class
    document.body.classList.remove('react-page-dragging');

    // If there's no destination, the drop was cancelled
    if (!result.destination) {
      return;
    }

    // Additional drag end processing can be added here
  };

  return dndBackend ? (
    <DragDropContext
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      {children}
    </DragDropContext>
  ) : (
    <>{children}</>
  );
};

export default DndProvider;
