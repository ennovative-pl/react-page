import React from 'react';
import { useCell, useHoverActions } from '../../hooks';
import type { CellDrag } from '../../../types';

// We don't need the drag icon with react-beautiful-dnd as it provides its own drag preview
// Implementation updated to support react-beautiful-dnd which provides draggable component elsewhere
export const useDragHandle = (nodeId: string, enabled = true) => {
  const actions = useHoverActions();
  const cell = useCell(nodeId);

  // Simulate the same return interface as before but with different implementation
  const isDragging = false; // This will be handled by react-beautiful-dnd's Draggable component
  const dragRef = (node: HTMLElement | null) => {
    // This is just a placeholder, as react-beautiful-dnd handles refs differently
    return node;
  };

  // Return an empty preview element as react-beautiful-dnd handles this differently
  const previewElement = <></>;

  return [isDragging, dragRef, previewElement] as const;
};
