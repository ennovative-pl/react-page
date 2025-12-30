import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import { useMeasure } from 'react-use';
import Cell from '../Cell';
import {
  useIsEditMode,
  useIsPreviewMode,
  useIsResizeMode,
  useResizeCell,
  useCellSpacing,
  useOption,
  useOnMobile,
  useIsSmallScreen,
} from '../hooks';

type Props = {
  nodeId: string;
  rowWidth: number;
  rowHasInlineChildrenPosition?: string | null;
  isLast: boolean;
  offset: number;
  size: number;
  maxSize: number;
};
const ResizableRowCell: React.FC<Props> = ({
  nodeId,
  rowWidth,
  rowHasInlineChildrenPosition,
  isLast,
  offset,
  size,
  maxSize,
}) => {
  const stepWidth = rowWidth / 12; // we're going to keep it a real number to preserve some precision
  const allowResizeInEditMode = useOption('allowResizeInEditMode');
  const isResizeMode = useIsResizeMode();
  const isEditMode = useIsEditMode();
  const isPreviewMode = useIsPreviewMode();
  const onMobile = useOnMobile();
  const isSmallScreen = useIsSmallScreen();
  const resize = useResizeCell(nodeId);
  const [ref, { height: cellHeight }] = useMeasure();
  const { y: cellSpacingY } = useCellSpacing() ?? { y: 0 };
  const draggableRef = useRef<HTMLDivElement>(null);

  const showResizeHandle =
    !isPreviewMode &&
    !isLast &&
    !onMobile &&
    !isSmallScreen &&
    (isResizeMode || (allowResizeInEditMode && isEditMode));

  return (
    <>
      <Cell nodeId={nodeId} measureRef={ref} />

      {showResizeHandle ? (
        <Draggable
          nodeRef={draggableRef}
          bounds={{
            top: 0,
            bottom: 0,
            left: Math.round(stepWidth),
            right: Math.round(rowWidth - stepWidth),
          }}
          position={{
            x:
              rowHasInlineChildrenPosition === 'right'
                ? Math.round(stepWidth * (12 - offset))
                : Math.round(stepWidth * offset),
            y: 0,
          }}
          axis="x"
          onDrag={(_e, data) => {
            const diff = Math.round(data.deltaX / stepWidth);
            const newSize =
              rowHasInlineChildrenPosition === 'right'
                ? size - diff
                : size + diff;
            if (newSize > 0 && newSize <= maxSize) resize(newSize);
          }}
          grid={[Math.round(stepWidth), 0]}
        >
          <div
            ref={draggableRef}
            className="resize-handle"
            style={{
              // fix floating style
              height: rowHasInlineChildrenPosition ? cellHeight : 'auto',
              margin:
                cellSpacingY !== 0 ? `${cellSpacingY / 2}px 0` : undefined,
            }}
            onClick={(e) => e.stopPropagation()}
          ></div>
        </Draggable>
      ) : null}
    </>
  );
};

export default React.memo(ResizableRowCell);
