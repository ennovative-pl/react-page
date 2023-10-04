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
      const [minimized, setMinimized] = React.useState(true);

      return (
        <div
          onMouseEnter={minimized ? () => setMinimized?.(false) : undefined}
          onMouseLeave={minimized ? () => setMinimized?.(true) : undefined}
          id="bottom-drawer"
        >
          <BottomToolbarDrawer
            className={className}
            open={open}
            anchor={anchor}
            scale={scale}
            style={style}
          >
            {!minimized && (
              <div
                style={{
                  display: minimized ? 'none' : 'block',
                  transition: 'opacity 0.3s',
                }}
              >
                {children}
                {pluginControls}
              </div>
            )}
            {minimized && (
              <div
                style={{
                  display: !minimized ? 'none' : 'block',
                  transition: 'opacity 0.3s',
                }}
                className="text-center"
              >
                <small className="text-muted">Najedź aby edytować</small>
              </div>
            )}
            <BottomToolbarMainBar
              nodeId={nodeId}
              actionsLeft={[
                <div className="btn-group me-2" key="buttons">
                  <MinimizeButton
                    key="minimizebutton"
                    minimized={minimized}
                    setMinimized={setMinimized}
                  />
                  {/* <ScaleButton
                  key="scalebutton"
                  scale={scale}
                  setScale={setScale}
                /> */}
                </div>,
                ...React.Children.toArray(actionsLeft),
              ]}
            />
          </BottomToolbarDrawer>
        </div>
      );
    }
  );
