import type { RootState } from '../types/state';

export const getLang = ({ reactPage: { settings } }: RootState) =>
  settings.lang ?? 'default';

export const getEditingNode = ({ reactPage: { edit } }: RootState) => edit?.nodeId;
