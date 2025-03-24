import React from 'react';
import { useDragDropManager, useDrop } from 'react-dnd';
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

  const [{ isOver, canDrop, isAllowed }, dropRef] = useDrop<
    CellDrag,
    void,
    { isOver: boolean; canDrop: boolean; isAllowed: boolean }
  >({
    accept: 'cell',
    canDrop: (item) => {
      return checkIfAllowed(item);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
      isAllowed: checkIfAllowed(monitor.getItem()),
    }),
    drop: (item, monitor) => {
      // fallback drop
      if (!monitor.didDrop() && item.cell) {
        insertNew(item.cell);
      }
    },
  });

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
      <div
        ref={dropRef}
        className={
          'react-page-cell-insert-new' +
          (isOver && isAllowed ? ' hover' : '') +
          (visible ? '' : ' d-none')
        }
        style={{
          pointerEvents: 'all',
          zIndex: isLayoutMode ? 10 : 1,
          overflow: 'hidden',
          width: '50%', // just so that it leaves some room to click on the parent element
          minWidth: 120,
          margin: 'auto',
          cursor: isOver && !isAllowed ? 'not-allowed' : 'pointer',
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
          {/* <svg
          focusable="false"
          aria-hidden="true"
          viewBox="0 0 24 24"
          data-testid="AddIcon"
          >
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"></path>
          </svg> */}
        </div>
      </div>
    </OverlayTrigger>
  );
};

export default React.memo(InsertNew);
