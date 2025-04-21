import throttle from 'lodash.throttle';
import type {
  DroppableStateSnapshot,
  DraggableLocation,
  DropResult,
} from 'react-beautiful-dnd';
import { delay } from '../../../../helper/throttle';
import type { HoverTarget } from '../../../../service/hover/computeHover';
import {
  computeAndDispatchHover,
  computeAndDispatchInsert,
} from '../../../../service/hover/input';
import logger from '../../../../service/logger';
import type {
  CellDrag,
  HoverInsertActions,
  CellPluginList,
} from '../../../../types';

let last: { hoverId?: string; dragId?: string } = { hoverId: '', dragId: '' };

const shouldClear = (
  hoverId: string | undefined,
  dragId: string | undefined
) => {
  if (hoverId === last.hoverId && dragId === last.dragId) {
    return false;
  }
  last = { hoverId, dragId };
  return true;
};

// Helper to simulate monitor behavior for react-beautiful-dnd
const createSimulatedMonitor = (
  draggableId: string,
  destination: DraggableLocation | null,
  source: DraggableLocation,
  isOver: boolean
) => {
  return {
    getItem: () => ({ cell: { id: draggableId } }),
    isOver: () => isOver,
    didDrop: () => destination !== null,
    getClientOffset: () => ({ x: 0, y: 0 }),
    getDifferenceFromInitialOffset: () => ({ x: 0, y: 0 }),
    getSourceClientOffset: () => ({ x: 0, y: 0 }),
  };
};

// This function will be used with react-beautiful-dnd's onDragOver callback
export const onHover = throttle(
  (
    target: HoverTarget,
    snapshot: DroppableStateSnapshot,
    draggableId: string,
    element: HTMLElement,
    actions: HoverInsertActions,
    cellPlugins: CellPluginList
  ) => {
    if (!draggableId || !target) {
      return;
    }

    const simMonitor = createSimulatedMonitor(
      draggableId,
      null,
      { droppableId: '', index: 0 },
      snapshot.isDraggingOver
    );

    if (draggableId === target.id) {
      // If hovering over itself, do nothing
      if (shouldClear(target.id, draggableId)) {
        actions.clear();
      }
      return;
    } else if (!snapshot.isDraggingOver) {
      // If not hovering over this droppable, do nothing
      return;
    } else if (draggableId && target.ancestorIds?.includes(draggableId)) {
      if (shouldClear(target.id, draggableId)) {
        actions.clear();
      }
      return;
    } else if (!target.id) {
      // If hovering over something that isn't a cell or hasn't an id, do nothing. Should be an edge case
      logger.warn('Canceled cell drop, no id given.', target, {
        cell: { id: draggableId },
      });
      return;
    }

    last = { hoverId: target.id, dragId: draggableId };

    computeAndDispatchHover(
      target,
      { id: draggableId },
      simMonitor as any,
      element,
      actions,
      cellPlugins
    );
  },
  delay,
  { leading: false }
);

// This function will be called with react-beautiful-dnd's onDragEnd callback
export const onDrop = (
  result: DropResult,
  target: HoverTarget,
  element: HTMLElement,
  actions: HoverInsertActions,
  cellPlugins: CellPluginList
) => {
  const { draggableId, destination, source } = result;

  if (!destination || !target) {
    // If there's no destination, the drop was cancelled
    actions.cancelCellDrag();
    return;
  }

  const simMonitor = createSimulatedMonitor(
    draggableId,
    destination,
    source,
    true
  );

  if (draggableId === target.id) {
    // If the item being dropped on itself do nothing
    actions.cancelCellDrag();
    return;
  } else if (
    target &&
    draggableId &&
    target.ancestorIds?.includes(draggableId)
  ) {
    // If hovering over a child of itself, don't propagate further
    actions.cancelCellDrag();
    return;
  }

  last = { hoverId: target.id, dragId: draggableId };

  computeAndDispatchInsert(
    target,
    { id: draggableId },
    simMonitor as any,
    element,
    actions,
    cellPlugins
  );
};
