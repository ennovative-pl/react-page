// Define our own monitor interface to replace DropTargetMonitor from react-dnd
interface CustomMonitor {
  getItem: () => any;
  isOver: (options?: { shallow: boolean }) => boolean;
  didDrop: () => boolean;
  getClientOffset: () => { x: number; y: number } | null;
  getDifferenceFromInitialOffset: () => { x: number; y: number } | null;
  getSourceClientOffset: () => { x: number; y: number } | null;
}

import type { CellPluginList, PartialCell } from '../../types';
import type { HoverInsertActions, Room, Vector } from '../../types/hover';
import type { HoverTarget } from './computeHover';
import { computeHover } from './computeHover';

const computeCurrentDropPosition = (
  actions: HoverInsertActions,
  hover: HoverTarget,
  drag: PartialCell,
  monitor: CustomMonitor,
  element: HTMLElement,
  cellPlugins: CellPluginList
) => {
  const mousePosition = monitor.getClientOffset();

  const componentPosition = element.getBoundingClientRect();
  const room: Room = {
    height: componentPosition.bottom - componentPosition.top,
    width: componentPosition.right - componentPosition.left,
  };
  if (!mousePosition) {
    return;
  }

  const mouse: Vector = {
    y: mousePosition.y - componentPosition.top,
    x: mousePosition.x - componentPosition.left,
  };

  computeHover(drag, hover, actions, {
    room,
    mouse,
    cellPlugins,
  });
};

export const computeAndDispatchInsert = (
  hover: HoverTarget,
  drag: PartialCell,
  monitor: CustomMonitor,
  element: HTMLElement,
  actions: HoverInsertActions,
  cellPlugins: CellPluginList
) => {
  return computeCurrentDropPosition(
    actions,
    hover,
    drag,
    monitor,
    element,
    cellPlugins
  );
};

export const computeAndDispatchHover = (
  hover: HoverTarget,
  drag: PartialCell,
  monitor: CustomMonitor,
  element: HTMLElement,
  actions: HoverInsertActions,
  cellPlugins: CellPluginList
) =>
  computeCurrentDropPosition(
    actions,
    hover,
    drag,
    monitor,
    element,
    cellPlugins
  );
