import type {
  BlurAllCellsAction,
  BlurCellAction,
  EditSettingsAction,
  FocusCellAction,
  RemoveCellAction,
} from '../../actions/cell';

export type Edit = {
  nodeId: string;
} | null;

export const edit = (
  state: Edit = null,
  action:
    | EditSettingsAction
    | BlurCellAction
    | BlurAllCellsAction
    | FocusCellAction
    | RemoveCellAction
) => {
  switch (action.type) {
    case 'CELL_BLUR':
    case 'CELL_BLUR_ALL':
    case 'CELL_REMOVE': {
      return null;
    }
    case 'CELL_FOCUS': {
      if (action.id != state?.nodeId) {
        return null;
      }
      break;
    }
    case 'CELL_EDIT': {
      return {
        nodeId: action.id,
      };
    }
    default:
      return state;
  }
  return state;
};
