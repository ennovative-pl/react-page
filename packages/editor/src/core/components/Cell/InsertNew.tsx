import React, { useRef, useState, useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import type { CellDrag } from '../../types';
import {
  useCellIsAllowedHere,
  useInsertNew,
  useIsFocused,
  useIsInsertMode,
  useIsLayoutMode,
  useIsPreviewMode,
  useNodeIsHovered,
  useOption,
  usePluginOfCell,
  useSetDisplayReferenceNodeId,
  useSetInsertMode,
  useUiTranslator,
} from '../hooks';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

export interface InsertNewProps {
  parentCellId?: string;
  childrenIds?: string[];
}

const InsertNew: React.FC<InsertNewProps> = ({ parentCellId }) => {
  const setInsertMode = useSetInsertMode();
  const insertNew = useInsertNew(parentCellId);
  const focused = useIsFocused(parentCellId ?? '');
  const insertAlways = useOption('insertAlways');
  const { t } = useUiTranslator();

  const isPreviewMode = useIsPreviewMode();
  const isLayoutMode = useIsLayoutMode();
  const isInsertMode = useIsInsertMode();
  const isHovered = useNodeIsHovered(parentCellId ?? '');

  const setReferenceNodeId = useSetDisplayReferenceNodeId();
  const checkIfAllowed = useCellIsAllowedHere(parentCellId);
  const plugin = usePluginOfCell(parentCellId ?? '');

  // Local state to track drop status
  const [isOver, setIsOver] = useState(false);
  const [canDrop, setCanDrop] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);

  // Generate a unique droppable ID for this insertion point
  const droppableId = `insert-new-${parentCellId || 'root'}-${Math.random().toString(36).substring(2)}`;

  if (isPreviewMode) return null;

  let visible = true;

  if (parentCellId && plugin?.hideAddChildrenInside) {
    visible = false;
  }

  if (!focused && !insertAlways && !isInsertMode && parentCellId) {
    visible = false;
  }

  if (isHovered) {
    visible = true;
  }

  return (
    <OverlayTrigger overlay={<Tooltip>{t('Add blocks') ?? ''}</Tooltip>}>
      <Droppable droppableId={droppableId}>
        {(provided, snapshot) => {
          // Update drop status based on snapshot
          const isCurrentlyOver = snapshot.isDraggingOver;

          return (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className={
                'react-page-cell-insert-new' +
                (isCurrentlyOver ? ' hover' : '') +
                (visible ? '' : ' d-none')
              }
              style={{
                pointerEvents: 'all',
                zIndex: isLayoutMode ? 10 : 1,
                overflow: 'hidden',
                width: '50%', // just so that it leaves some room to click on the parent element
                minWidth: 120,
                margin: 'auto',
                cursor: isCurrentlyOver && !isAllowed ? 'not-allowed' : 'pointer',
              }}
              onClick={(e) => {
                e.stopPropagation();
                setReferenceNodeId(parentCellId);
                setInsertMode();
              }}
            >
              <div className="react-page-cell-insert-new-icon">
                <button type="button" className={'btn btn-lg btn-secondary shadow'}>
                  <i className="fas fa-fw fa-plus" />
                </button>
              </div>
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </OverlayTrigger>
  );
};

export default React.memo(InsertNew);
