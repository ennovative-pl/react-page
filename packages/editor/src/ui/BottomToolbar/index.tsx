import type { FC, PropsWithChildren } from 'react';
import React from 'react';
import { BottomToolbarDrawer } from './Drawer';
import { BottomToolbarMainBar } from './NodeTools';
import { ScaleButton } from './ScaleButton';
import type { BottomToolbarProps } from './types';
import { MinimizeButton } from './MinimizeButton';
import { Drawer, Portal } from '@mui/material';
import { useFocusCell, usePluginOfCell } from '../../core/components/hooks';
import { CustomAvatar } from '../_Custom/CustomAvatar';
import MoveActions from './MoveActions';
import { BottomToolbarTools } from './Tools';
export * from './types';
export * from './Drawer';
export * from './NodeTools';
export * from './Tools';

export const BottomToolbar: FC<PropsWithChildren<BottomToolbarProps>> =
  React.memo(
    ({
      open = false,
      className,
      anchor = 'right',
      pluginControls,
      nodeId,
      actionsLeft,
      style,
      children,
    }) => {
      const [scale, setScale] = React.useState(1);
      const [minimized, setMinimized] = React.useState(true);
      const { title, icon } = usePluginOfCell(nodeId) ?? {};
      const focus = useFocusCell(nodeId);

      const containerStyle = {
        position: 'fixed',
        top: 0,
        right: 0,
        width: '30px',
        display: 'flex',
        alignItems: 'center',
        // borderTopLeftRadius: '10px', // adjust as needed
        // borderBottomLeftRadius: '10px', // adjust as needed
        backgroundColor: '#fff', // example background color
        // boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // optional, for better visibility
      };

      const textStyle = {
        transform: 'rotate(-90deg) translate(-100%, 0)',
        transformOrigin: 'bottom left',
        whiteSpace: 'nowrap',
        marginTop: '30px',
        marginLeft: '3px',
        //position: 'absolute',
        //bottom: '0',
      };

      const iconStyle = {
        marginLeft: '10px',
        marginTop: '10px', // space above the icon, adjust as needed
        marginBottom: '5px', // space below the icon, adjust as needed
      };

      return (
        <>
          {minimized && (
            <div
              //onMouseEnter={() => setMinimized?.(false)}
              onClick={() => setMinimized?.(false)}
            >
              <Portal>
                <Drawer
                  SlideProps={{
                    mountOnEnter: true,
                    unmountOnExit: true,
                  }}
                  variant="persistent"
                  className={className}
                  open={open}
                  anchor={anchor}
                  PaperProps={{
                    style: {
                      zIndex: 10010,
                      width: 30,
                      //                      ...(containerStyle as any),
                    },
                  }}
                >
                  <div style={containerStyle as any}>
                    <div style={iconStyle}>
                      <i className="fas fa-cog" />
                    </div>
                    <div style={textStyle as any}>{title}</div>
                  </div>
                </Drawer>
              </Portal>
            </div>
          )}
          {!minimized && (
            <div
              //onMouseEnter={minimized ? () => setMinimized?.(false) : undefined}
              //onMouseLeave={() => setMinimized?.(true)}
              id="bottom-drawer"
            >
              <div className="offcanvas offcanvas-end" data-bs-scroll="true">
                <BottomToolbarDrawer
                  className={className}
                  open={open}
                  anchor={anchor}
                  scale={scale}
                  style={style}
                >
                  <div className="offcanvas-header">
                    <CustomAvatar
                      onClick={() => focus(true)}
                      children={icon || (title ? title[0] : '')}
                      style={{
                        cursor: 'pointer',
                        marginRight: 16,
                      }}
                    />{' '}
                    {title}
                    {/* <MinimizeButton
                      key="minimizebutton"
                      minimized={minimized}
                      setMinimized={setMinimized}
                    /> */}
                    <button
                      id="offcanvas-close"
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="offcanvas"
                      onClick={() => setMinimized?.(true)}
                      aria-label="Zamknij"
                    ></button>
                  </div>

                  {/* <div className="offcanvas-header">
                    <BottomToolbarMainBar
                      nodeId={nodeId}
                      actionsLeft={[
                        <div className="btn-group me-2" key="buttons">
                          <ScaleButton
                  key="scalebutton"
                  scale={scale}
                  setScale={setScale}
                />
                        </div>,
                        ...React.Children.toArray(actionsLeft),
                      ]}
                    />
                  </div> */}
                  <div
                    className="offcanvas-body"
                    style={{ maxHeight: 'calc(100vh - 180px)' }}
                  >
                    <div className={minimized ? 'box' : 'box-hover'}>
                      {children}
                      {pluginControls}
                      <div className="position-absolute bottom-0 m-4">
                        <div className="d-flex justify-content-between">
                          <MoveActions nodeId={nodeId} />
                          <div className="ms-5">
                            <BottomToolbarTools nodeId={nodeId} />
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* )} 
            {minimized && ( */}
                    {/* <div className={'text-center'}>
              <small className="text-muted">Najedź aby edytować</small>
            </div> */}
                    {/* )} */}
                  </div>
                </BottomToolbarDrawer>
              </div>
            </div>
          )}
        </>
      );
    }
  );
