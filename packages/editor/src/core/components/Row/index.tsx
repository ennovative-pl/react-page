import classNames from 'classnames';
import React from 'react';
import { useMeasure } from 'react-use';
import type { Node } from '../../types/node';
import { isRow, Row } from '../../types/node';
import {
  useCellData,
  useCellSpacing,
  useNodeHoverPosition,
  useNodeProps,
  useParentCellId,
} from '../hooks';
import Droppable from './Droppable';
import ResizableRowCell from './ResizableRowCell';
import Cell from '../Cell';

const reduceToIdAndSizeArray = (
  acc: {
    offset: number;
    id: string;
    size: number;
    maxSize: number;
    noWidth: boolean;
  }[],
  node: Node,
  index: number,
  array: Node[]
) => {
  const nextNode = array[index + 1];

  const size = isRow(node) ? 12 : node.size ?? 12;
  const nextSize = !nextNode || isRow(nextNode) ? 0 : nextNode.size ?? 12;
  const offset = size + (acc[index - 1]?.offset ?? 0);
  //console.log('reduceToIdAndSizeArray: ', node, size, nextSize, offset);
  const noWidth = !isRow(node)
    ? (node.dataI18n?.default?.width || node.dataI18n?.default?.minWidth) ==
      undefined
    : false;
  return [
    ...acc,
    {
      id: node.id,
      size,
      maxSize: size + nextSize - 1,
      offset,
      noWidth,
    },
  ];
};
const Row: React.FC<{ nodeId: string }> = ({ nodeId }) => {
  const [ref, { width: rowWidth }] = useMeasure();
  const parentNodeId = useParentCellId(nodeId);
  const data = useCellData(parentNodeId ?? '');
  const useFlex = data?.useFlex;

  // Get flex properties from cell data
  type FlexWrap = 'nowrap' | 'wrap' | 'wrap-reverse';
  const flexWrap: FlexWrap = data?.nowrap ? 'nowrap' : 'wrap'; // default value
  // const align = (data?.align as string) || 'left'; // default value
  // const verticalAlign = (data?.verticalAlign as string) || 'top'; // default value
  const direction = 'flex-' + ((data?.direction as string) || 'row'); // default value

  // let alignClassName = '';
  // switch (align) {
  //   case 'left':
  //     alignClassName = 'justify-content-start';
  //     break;
  //   case 'center':
  //     alignClassName = 'justify-content-center';
  //     break;
  //   case 'right':
  //     alignClassName = 'justify-content-end';
  //     break;
  //   case 'between':
  //     alignClassName = 'justify-content-between';
  //     break;
  //   case 'around':
  //     alignClassName = 'justify-content-around';
  //     break;
  //   case 'evenly':
  //     alignClassName = 'justify-content-evenly';
  //     break;
  // }

  // let verticalAlignClassName = '';
  // switch (verticalAlign) {
  //   case 'top':
  //     verticalAlignClassName = 'align-items-start';
  //     break;
  //   case 'center':
  //     verticalAlignClassName = 'align-items-center';
  //     break;
  //   case 'bottom':
  //     verticalAlignClassName = 'align-items-end';
  //     break;
  //   case 'baseline':
  //     verticalAlignClassName = 'align-items-baseline';
  //     break;
  //   case 'stretch':
  //     verticalAlignClassName = 'align-items-stretch';
  //     break;
  // }

  // console.log(
  //   'Row nodeId: ',
  //   nodeId,
  //   parentNodeId,
  //   data,
  //   data.useFlex,
  //   flexWrap,
  //   align,
  //   alignClassName,
  //   verticalAlign,
  //   verticalAlignClassName
  // );

  const hoverPosition = useNodeHoverPosition(nodeId);

  const childrenWithOffsets = useNodeProps(nodeId, (node) =>
    isRow(node)
      ? node.cells?.reduce(reduceToIdAndSizeArray, []) ?? []
      : node?.rows?.reduce(reduceToIdAndSizeArray, []) ?? []
  );

  //console.log('childrenWithOffsets: ', childrenWithOffsets);

  const rowHasInlineChildrenPosition = useNodeProps(
    nodeId,
    (node) =>
      (isRow(node) && node.cells.length === 2 && node.cells[0]?.inline) || null
  );

  const cellSpacing = useCellSpacing();

  return (
    <Droppable nodeId={nodeId}>
      <div
        ref={ref as any}
        className={classNames('react-page-row', {
          'react-page-row-has-floating-children': Boolean(
            rowHasInlineChildrenPosition
          ),
          'd-flex': useFlex,
          // [alignClassName]: useFlex && alignClassName != '',
          [direction]: useFlex && direction != '',
          // [verticalAlignClassName]:
          //   useFlex && verticalAlignClassName != '',
        })}
        style={{
          //display: useFlex ? 'flex' : 'block',
          flexWrap: flexWrap,
          // justifyContent: useFlex ? align : undefined,
          // alignItems: useFlex ? verticalAlign : undefined,
          position: 'relative',
          margin:
            cellSpacing && cellSpacing.x !== 0
              ? `0 ${-cellSpacing.x / 2}px`
              : undefined,
        }}
      >
        <div
          style={{
            position: 'absolute',
            pointerEvents: 'none',
            ...(cellSpacing
              ? {
                  top: `${cellSpacing.y / 2}px`,
                  left: `${cellSpacing.x / 2}px`,
                  bottom: `${cellSpacing.y / 2}px`,
                  right: `${cellSpacing.x / 2}px`,
                }
              : {}),
          }}
          className={classNames({
            'react-page-row-is-hovering-this': Boolean(hoverPosition),
            [`react-page-row-is-hovering-${hoverPosition || ''}`]:
              Boolean(hoverPosition),
          })}
        />
        {childrenWithOffsets.map(
          ({ offset, id, size, maxSize, noWidth }, index) =>
            useFlex ? (
              // When using flex layout
              // <div key={id} style={{ flex: `0 0 ${(size / 12) * 100}%` }}>
              // <div
              //   key={id}
              //   style={{ flex: `0 0`, width: noWidth ? '300px' : undefined }}
              // >
              <Cell nodeId={id} inFlexbox={true} noWidth={noWidth} />
            ) : (
              // </div>
              // When using grid layout
              <ResizableRowCell
                key={id}
                isLast={index === childrenWithOffsets.length - 1}
                rowWidth={rowWidth}
                nodeId={id}
                rowHasInlineChildrenPosition={rowHasInlineChildrenPosition}
                offset={offset}
                size={size}
                maxSize={maxSize}
              />
            )
        )}
      </div>
    </Droppable>
  );
};

export default React.memo(Row);
