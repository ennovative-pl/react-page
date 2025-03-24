import classNames from 'classnames';
import type { FC, PropsWithChildren } from 'react';
import React, { useCallback, useEffect } from 'react';
import { Droppable as DroppableRBD } from 'react-beautiful-dnd';
import { useSelector } from '../../../reduxConnect';
import type { RootState } from '../../../types';
import type { CellDrag } from '../../../types/node';
import {
  useNodeAsHoverTarget,
  useCellHasPlugin,
  useCellIsAllowedHere,
  useCellSpacing,
  useDropActions,
  useHoverActions,
  useIsInsertMode,
  useIsLayoutMode,
  useNodeHoverPosition,
  usePluginOfCell,
  useOption,
  useAllCellPluginsForNode,
} from '../../hooks';

export const useCellDrop = (nodeId: string) => {
  const ref = React.useRef<HTMLDivElement>();

  const hoverTarget = useNodeAsHoverTarget(nodeId);
  const targetParentNodeId = hoverTarget?.ancestorIds?.[0];
  const checkIfAllowed = useCellIsAllowedHere(targetParentNodeId);
  const plugin = usePluginOfCell(nodeId);
  const cellPlugins = useAllCellPluginsForNode(targetParentNodeId);
  const hoverActions = useHoverActions();
  const dropActions = useDropActions(targetParentNodeId);
  const isHoveringOverThis = useSelector(
    (state: RootState) => state.reactPage.hover?.nodeId === nodeId
  );

  // This simulates the same interface as the previous useDrop hook
  // but will be integrated with react-beautiful-dnd's Droppable component
  const isOver = false;
  const isAllowed = true;

  // see https://github.com/react-dnd/react-dnd/issues/1955
  const attach = useCallback(
    (domElement: HTMLDivElement) => {
      ref.current = domElement;
      // use dom element here for measuring
    },
    []
  );

  useEffect(() => {
    if (!isOver && isHoveringOverThis) {
      hoverActions.clear();
    }
  }, [isOver, isHoveringOverThis, hoverActions]);

  return [attach, isAllowed] as const;
};

const Droppable: FC<PropsWithChildren<{ nodeId: string; isLeaf?: boolean }>> = (
  props
) => {
  const isLayoutMode = useIsLayoutMode();
  const isInsertMode = useIsInsertMode();
  const [attach, isAllowed] = useCellDrop(props.nodeId);
  const hoverPosition = useNodeHoverPosition(props.nodeId);
  const allowMoveInEditMode = useOption('allowMoveInEditMode');
  const hasPlugin = useCellHasPlugin(props.nodeId);
  const { y: cellSpacingY } = useCellSpacing() ?? { y: 0 };
  const needVerticalMargin = !props.isLeaf && !hasPlugin;

  if (!(isLayoutMode || isInsertMode) && !allowMoveInEditMode) {
    return (
      <div className={'react-page-cell-droppable-container'}>
        {props.children}
      </div>
    );
  }

  // Use react-beautiful-dnd's Droppable for drag-drop functionality
  return (
    <DroppableRBD droppableId={props.nodeId}>
      {(provided, snapshot) => (
        <div
          ref={(node) => {
            attach(node as HTMLDivElement);
            provided.innerRef(node);
          }}
          style={{
            height: '100%',
          }}
          className="react-page-cell-droppable"
          {...provided.droppableProps}
        >
          <div
            style={{
              position: 'absolute',
              pointerEvents: 'none',
              top: needVerticalMargin ? `${cellSpacingY / 2}px` : 0,
              left: 0,
              bottom: needVerticalMargin ? `${cellSpacingY / 2}px` : 0,
              right: 0,
            }}
            className={classNames({
              'react-page-cell-droppable-not-allowed': !isAllowed,
              'react-page-cell-droppable-is-over-current':
                isAllowed && hoverPosition,
              [`react-page-cell-droppable-is-over-${hoverPosition}`]:
                isAllowed && hoverPosition,
              'react-page-cell-droppable-leaf': props.isLeaf,
            })}
          />
          {props.children}
          {provided.placeholder}
        </div>
      )}
    </DroppableRBD>
  );
};

export default Droppable;
