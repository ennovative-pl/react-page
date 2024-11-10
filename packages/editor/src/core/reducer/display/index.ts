import type { BlurAllCellsAction } from '../../actions/cell';
import { CELL_BLUR_ALL } from '../../actions/cell';
import type { DisplayAction } from '../../actions/display';
import {
  DEFAULT_DISPLAY_MODE,
  DISPLAY_SET_ON_MOBILE,
  DISPLAY_SET_ZOOM,
  SET_DISPLAY_MODE,
  SET_DISPLAY_REFERENCE_NODE_ID,
} from '../../actions/display';
import type { Display } from '../../types/display';

export const display = (
  state: Display = {
    mode: DEFAULT_DISPLAY_MODE,
    zoom: 1,
    onMobile: false,
  },
  action: DisplayAction | BlurAllCellsAction
) => {
  switch (action.type) {
    case DISPLAY_SET_ZOOM: {
      return {
        ...state,
        zoom: action.zoom,
      };
    }
    case DISPLAY_SET_ON_MOBILE: {
      return {
        ...state,
        onMobile: action.onMobile,
      };
    }
    case SET_DISPLAY_REFERENCE_NODE_ID:
      return {
        ...state,
        referenceNodeId: action.referenceNodeId,
      };
    case CELL_BLUR_ALL: {
      return {
        ...state,
        mode: state.mode,
        referenceNodeId: null,
        onMobile: false,
      };
    }
    case SET_DISPLAY_MODE:
      return {
        ...state,
        mode: action.mode,
        referenceNodeId: action.referenceNodeId || state.referenceNodeId,
      };
    default:
      return state;
  }
};
