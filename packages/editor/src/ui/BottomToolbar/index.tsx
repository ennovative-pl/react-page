import type { FC, PropsWithChildren } from 'react';
import React from 'react';
import { BottomToolbarDrawer } from './Drawer';
import { BottomToolbarMainBar } from './NodeTools';
import { ScaleButton } from './ScaleButton';
import type { BottomToolbarProps } from './types';
import { MinimizeButton } from './MinimizeButton';
export * from './types';
export * from './Drawer';
export * from './NodeTools';
export * from './Tools';

export const BottomToolbar: FC<PropsWithChildren<BottomToolbarProps>> =
  React.memo(
    ({
      open = false,
      className,

      anchor = 'bottom',
      pluginControls,
      nodeId,
      actionsLeft,
      style,
      children,
    }) => {
      const [scale, setScale] = React.useState(1);
      const [minimized, setMinimized] = React.useState(false);

      return (
        <BottomToolbarDrawer
          className={className}
          open={open}
          anchor={anchor}
          scale={scale}
          style={style}
        >
          {!minimized && (
            <>
              {children}
              {pluginControls}
            </>
          )}
          <BottomToolbarMainBar
            nodeId={nodeId}
            actionsLeft={[
              <div className="btn-group mx-2" key="buttons">
                <MinimizeButton
                  key="scalebutton"
                  minimized={minimized}
                  setMinimized={setMinimized}
                />
                <ScaleButton
                  key="scalebutton"
                  scale={scale}
                  setScale={setScale}
                />
              </div>,
              ...React.Children.toArray(actionsLeft),
            ]}
          />
        </BottomToolbarDrawer>
      );
    }
  );
