import classNames from 'classnames';
import React from 'react';
import {
  useEditCellById,
  useFocusCell,
  useInsertNew,
  useIsLayoutMode,
  useOption,
  useParentCellId,
  usePluginOfCell,
  useRemoveCellById,
  useSetDisplayReferenceNodeId,
  useSetInsertMode,
  useUiTranslator,
} from '../../hooks';
import { useDragHandle } from '../Draggable/useDragHandle';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';

const Handle: React.FC<{ nodeId: string; noWidth: boolean }> = ({
  nodeId,
  noWidth,
}) => {
  const allowMoveInEditMode = useOption('allowMoveInEditMode');
  const isLayoutMode = useIsLayoutMode();
  const setInsertMode = useSetInsertMode();
  const parentCellId = useParentCellId(nodeId);
  const focusParent = useFocusCell(parentCellId);
  const setReferenceNodeId = useSetDisplayReferenceNodeId();

  const dragEnabled = allowMoveInEditMode || isLayoutMode;

  const [isDragging, dragRef, previewElement] = useDragHandle(
    nodeId,
    dragEnabled
  );
  const focus = useFocusCell(nodeId);
  const remove = useRemoveCellById();
  const edit = useEditCellById(nodeId);
  const plugin = usePluginOfCell(nodeId);
  const { t } = useUiTranslator();

  if (!plugin) {
    return null;
  }

  const handleRemove = () => {
    remove(nodeId);
  };

  return (
    <>
      {previewElement}
      <div
        className={
          'nav-item nav-link active ' +
          classNames('react-page-cell-handle', {
            'react-page-cell-handle-drag-enabled': dragEnabled,
            'react-page-cell-handle-is-dragging': isDragging,
            'bg-danger react-page-cell-handle-no-width': noWidth,
          })
        }
        ref={dragRef}
      >
        <div className="d-flex align-items-center gap-2" style={{ zIndex: 10 }}>
          <span>
            {t(plugin?.title || plugin?.text)}
            {plugin?.showId ? ` (${nodeId})` : ''}
          </span>
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Ustawienia komponentu</Tooltip>}
          >
            <button
              className="btn btn-outline-secondary btn-sm ms-2"
              onClick={() => edit()}
            >
              <i className="fas fa-cog" />{' '}
            </button>
          </OverlayTrigger>
          {parentCellId && (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Zaznacz komponent nadrzędny</Tooltip>}
            >
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => focusParent(true, 'replace')}
              >
                <i className="fas fa-arrows-up-to-line" />{' '}
              </button>
            </OverlayTrigger>
          )}
          {plugin.hideAddChildrenInside && (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Dodaj komponenty</Tooltip>}
            >
              <button
                className="btn btn-outline-secondary btn-sm"
                onClick={() => {
                  setReferenceNodeId(nodeId);
                  setInsertMode();
                }}
              >
                <i className="fas fa-plus" />{' '}
              </button>
            </OverlayTrigger>
          )}
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Usuń komponent</Tooltip>}
          >
            <button
              className="btn btn-outline-danger btn-sm"
              onClick={handleRemove}
            >
              <i className="fas fa-trash" />{' '}
            </button>
          </OverlayTrigger>
        </div>
      </div>
    </>
  );
};

export default React.memo(Handle);
