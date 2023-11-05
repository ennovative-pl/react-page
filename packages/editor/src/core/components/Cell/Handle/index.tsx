import classNames from 'classnames';
import React from 'react';
import {
  useEditCellById,
  useFocusCell,
  useIsLayoutMode,
  useOption,
  usePluginOfCell,
  useRemoveCellById,
  useUiTranslator,
} from '../../hooks';
import { useDragHandle } from '../Draggable/useDragHandle';
const Handle: React.FC<{ nodeId: string }> = ({ nodeId }) => {
  const allowMoveInEditMode = useOption('allowMoveInEditMode');
  const isLayoutMode = useIsLayoutMode();
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
          })
        }
        ref={dragRef}
        onClick={(e) => {
          const mode = e.metaKey || e.ctrlKey ? 'add' : 'replace';
          focus(false, mode);
        }}
      >
        <div className="d-flex align-items-center gap-2">
          <button
            title="Ustawienia komponentu"
            className="btn btn-outline-secondary btn-sm me-2"
            onClick={() => edit()}
          >
            <i className="fas fa-cog" />{' '}
          </button>
          <span>{t(plugin?.title || plugin?.text)}</span>
          <button
            title="Usuń komponent"
            className="btn btn-outline-danger btn-sm ms-2"
            onClick={handleRemove}
          >
            <i className="fas fa-trash" />{' '}
          </button>
        </div>
      </div>
    </>
  );
};

export default React.memo(Handle);
