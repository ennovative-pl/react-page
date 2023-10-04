import { Fab } from '@mui/material';
import type { CSSProperties } from 'react';
import React from 'react';

import IconUp from '@mui/icons-material/ArrowDropUp';
import IconDown from '@mui/icons-material/ArrowDropDown';
import IconRight from '@mui/icons-material/ArrowRight';
import IconLeft from '@mui/icons-material/ArrowLeft';
import {
  useMoveNodeDown,
  useMoveNodeUp,
  useMoveNodeLeft,
  useMoveNodeRight,
} from '../../core/components/hooks';

const Base: React.FC<{
  onClick: null | (() => void);
  icon: string | NonNullable<React.ReactNode>;
  style?: CSSProperties;
}> = ({ onClick, icon, style }) => {
  // don't show at all

  return (
    <button
      type="button"
      disabled={!onClick}
      onClick={onClick ?? undefined}
      style={{ pointerEvents: 'all', ...style }}
      className="btn btn-sm btn-secondary"
    >
      <i className={`fas fa-fw ${icon}`} />
    </button>
    // <Fab
    //   disabled={!onClick}
    //   style={{ margin: 10, pointerEvents: 'all', ...style }}
    //   size="small"
    //   onClick={onClick ?? undefined}
    //   color="default"
    // >
    //   {icon}
    // </Fab>
  );
};

export const MoveUp: React.FC<{ nodeId: string; style?: CSSProperties }> = ({
  nodeId,
  style,
}) => {
  const moveUp = useMoveNodeUp(nodeId);
  //return <Base onClick={moveUp} icon={<IconUp />} style={style} />;
  return <Base onClick={moveUp} icon="fa-arrow-up" style={style} />;
};

export const MoveDown: React.FC<{ nodeId: string; style?: CSSProperties }> = ({
  nodeId,
  style,
}) => {
  const moveDown = useMoveNodeDown(nodeId);
  //return <Base onClick={moveDown} icon={<IconDown />} style={style} />;
  return <Base onClick={moveDown} icon="fa-arrow-down" style={style} />;
};

export const MoveLeft: React.FC<{ nodeId: string; style?: CSSProperties }> = ({
  nodeId,
  style,
}) => {
  const moveLeft = useMoveNodeLeft(nodeId);
  //return <Base onClick={moveLeft} icon={<IconLeft />} style={style} />;
  return <Base onClick={moveLeft} icon="fa-arrow-left" style={style} />;
};

export const MoveRight: React.FC<{ nodeId: string; style?: CSSProperties }> = ({
  nodeId,
  style,
}) => {
  const moveRight = useMoveNodeRight(nodeId);
  //return <Base onClick={moveRight} icon={<IconRight />} style={style} />;
  return <Base onClick={moveRight} icon="fa-arrow-right" style={style} />;
};
