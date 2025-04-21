import React from 'react';
import type { BaseSyntheticEvent, FC, PropsWithChildren } from 'react';
import { useCallback } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import type { CellDrag } from '../../types/node';

import {
  useCellIsAllowedHere,
  useInsertNew,
  useSetDisplayReferenceNodeId,
} from '../hooks';

const FallbackDropArea: FC<PropsWithChildren> = ({ children }) => {
  const insertNew = useInsertNew();
  const isAllowed = useCellIsAllowedHere();
  
  const setReference = useSetDisplayReferenceNodeId();
  const clearReference = useCallback(
    (e: BaseSyntheticEvent) => {
      // if click was on the root, clear reference
      if (e.target.classList?.contains('react-page-editable'))
        setReference(null);
    },
    [setReference]
  );

  return (
    <Droppable droppableId="fallback-drop-area" isDropDisabled={false}>
      {(provided, snapshot) => (
        <div 
          ref={provided.innerRef}
          {...provided.droppableProps}
          onClick={clearReference}
          className={snapshot.isDraggingOver ? 'react-page-droppable-is-over' : ''}
        >
          {children}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default FallbackDropArea;
