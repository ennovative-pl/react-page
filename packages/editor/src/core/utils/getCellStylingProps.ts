import type { Cell, CellPlugin, DataTType } from '../types';

import classNames from 'classnames';

export const getCellInnerDivStyle = (
  cell: Cell | null,
  plugin: CellPlugin | null,
  data: DataTType
) => {
  if (!cell) {
    return undefined;
  }

  const style = plugin?.cellStyle
    ? typeof plugin?.cellStyle === 'function'
      ? plugin?.cellStyle(data)
      : plugin?.cellStyle
    : {};

  const marginStyle = plugin?.marginStyle
    ? typeof plugin?.marginStyle === 'function'
      ? plugin?.marginStyle(data)
      : plugin?.marginStyle
    : {};

  const result = { ...style, ...marginStyle };
  return Object.keys(result).length == 0 ? undefined : result;
};

export const getCellInnerDivClassName = (
  cell: Cell | null,
  plugin: CellPlugin | null,
  data: unknown
) => {
  const additionalClass = plugin?.cellClassName
    ? typeof plugin?.cellClassName === 'function'
      ? plugin?.cellClassName(data)
      : plugin?.cellClassName
    : undefined;

  // const cellMarginClassName = plugin?.marginClassName
  //   ? typeof plugin?.marginClassName === 'function'
  //     ? plugin?.marginClassName(data)
  //     : plugin?.marginClassName
  //   : undefined;

  return (
    'react-page-cell-inner' +
    ((cell?.rows?.length ?? 0) > 0 ? '' : ' react-page-cell-inner-leaf') +
    (additionalClass ? ' ' + additionalClass : '') //+
    //(cellMarginClassName ? ' ' + cellMarginClassName : '')
  );
};

export const getCellInnerDivStylingProps = (
  cell: Cell | null,
  plugin: CellPlugin | null,
  data: DataTType
) => {
  return {
    style: getCellInnerDivStyle(cell, plugin, data),
    className: getCellInnerDivClassName(cell, plugin, data),
  };
};

export const getContentStyle = (plugin: CellPlugin | null, data: DataTType) =>
  plugin?.contentStyle
    ? typeof plugin?.contentStyle === 'function'
      ? plugin?.contentStyle(data)
      : plugin?.contentStyle
    : undefined;

export const getContentClassName = (
  plugin: CellPlugin | null,
  data: unknown
) => {
  const additionalClass = plugin?.contentClassName
    ? typeof plugin?.contentClassName === 'function'
      ? plugin?.contentClassName(data)
      : plugin?.contentClassName
    : undefined;

  return additionalClass ? ' ' + additionalClass : '';
};

export const getContentStylingProps = (
  plugin: CellPlugin | null,
  data: DataTType
) => {
  return {
    style: getContentStyle(plugin, data),
    className: getContentClassName(plugin, data),
  };
};

export const gridClass = (size?: number): string => {
  if (size === 0) {
    return '';
  }
  return `react-page-cell-sm-${size || 12} react-page-cell-xs-12`;
};

export const getCellOuterDivClassName = ({
  size,
  hasInlineNeighbour,
  inline,
  hasChildren,
  plugin,
  data,
}: {
  size?: number;
  hasChildren: boolean;
  hasInlineNeighbour?: string;
  inline?: string | null;
  plugin?: CellPlugin | null;
  data?: unknown;
}) => {
  const cellMarginClassName = plugin?.marginClassName
    ? typeof plugin?.marginClassName === 'function'
      ? plugin?.marginClassName(data)
      : plugin?.marginClassName
    : undefined;

  return (
    classNames('react-page-cell', gridClass(size), {
      'react-page-cell-has-inline-neighbour': hasInlineNeighbour,
      [`react-page-cell-inline-${inline || ''}`]: inline,
      'react-page-cell-leaf': !hasChildren,
    }) + (cellMarginClassName ? ' ' + cellMarginClassName : '')
  );
};

export const getMarginStyle = (plugin?: CellPlugin | null, data?: DataTType) =>
  plugin?.marginStyle
    ? typeof plugin?.marginStyle === 'function'
      ? plugin?.marginStyle(data)
      : plugin?.marginStyle
    : undefined;
