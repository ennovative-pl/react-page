import { useCallback, useContext } from 'react';

import { ReduxContext, useDispatch, useSelector } from '../../reduxConnect';
import { setOnMobile, setZoom } from '../../actions/display';
import { useOption } from './options';

export const useSetZoom = () => {
  const dispatch = useDispatch();
  return useCallback((zoom: number) => dispatch(setZoom(zoom)), [dispatch]);
};

/**
 * @returns the current zoom
 */
export const useZoom = () => {
  return useSelector((state) => state.reactPage.display.zoom);
};

export const useZoomOut = () => {
  const zoom = useZoom();
  const zoomFactors = useOption('zoomFactors');
  const setZoom = useSetZoom();
  return useCallback(() => {
    const newZoom = zoomFactors?.find((z) => z < zoom);
    if (newZoom) setZoom(newZoom);
  }, [zoom, setZoom, zoomFactors]);
};

export const useZoomIn = () => {
  const zoom = useZoom();
  const setZoom = useSetZoom();
  const zoomFactors = useOption('zoomFactors');
  return useCallback(() => {
    const newZoom = [...(zoomFactors ?? [])].reverse().find((z) => z > zoom);
    if (newZoom) setZoom(newZoom);
  }, [zoom, setZoom, zoomFactors]);
};

export const useCanZoomOut = () => {
  const zoom = useZoom();
  const zoomFactors = useOption('zoomFactors');

  return zoomFactors?.some((z) => z < zoom) ?? false;
};

export const useCanZoomIn = () => {
  const zoom = useZoom();
  const zoomFactors = useOption('zoomFactors');
  return zoomFactors?.some((z) => z > zoom) ?? false;
};

export const useOnMobile = () => {
  const reduxContextValue = useContext(ReduxContext);
  const state =
    reduxContextValue && reduxContextValue?.store
      ? useSelector((state) => state?.reactPage.display.onMobile)
      : false;
  return (
    state ||
    (typeof navigator !== 'undefined' &&
      /iPad|iPhone|iPod|Android/.test(navigator.userAgent) &&
      typeof window !== 'undefined' &&
      !Object.prototype.hasOwnProperty.call(window, 'MSStream'))
  );
};

export const useSetOnMobile = () => {
  const dispatch = useDispatch();
  return useCallback(
    (onMobile: boolean) => dispatch(setOnMobile(onMobile)),
    [dispatch]
  );
};

export const useToggleOnMobile = () => {
  const onMobile = useOnMobile();
  const setOnMobile = useSetOnMobile();
  return useCallback(() => setOnMobile(!onMobile), [onMobile, setOnMobile]);
};
