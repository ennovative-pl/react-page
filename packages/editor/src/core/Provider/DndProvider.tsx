import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import { useOption } from '../components/hooks';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const DndProvider = ({ children }: any) => {
  const dndBackend = useOption('dndBackend');

  const onDragEnd = (result: any) => {
    // This function will be replaced with actual logic once we migrate the other components
    if (!result.destination) {
      return;
    }
  };

  return dndBackend ? (
    <DragDropContext onDragEnd={onDragEnd}>{children}</DragDropContext>
  ) : (
    <>{children}</>
  );
};

export default DndProvider;
