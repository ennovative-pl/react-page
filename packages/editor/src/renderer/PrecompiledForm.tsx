import React from 'react';
import type {
  CellPluginList,
  CellSpacing,
  ValueWithLegacy,
} from '../core/types';
import { HTMLRenderer } from './HTMLRenderer';

export type PrecompiledFormProps = {
  /**
   * The content value to render
   */
  value: ValueWithLegacy | null;

  /**
   * The language of the content
   */
  lang?: string;

  /**
   * The cell plugins used to render the content
   */
  cellPlugins: CellPluginList;

  /**
   * Optional cell spacing configuration
   */
  cellSpacing?: CellSpacing;
};

/**
 * PrecompiledForm - A fully SSR-compliant readonly form renderer
 *
 * This component is designed specifically for Next.js SSR and has zero frontend dependencies.
 * It renders the form content using only the HTMLRenderer, with no editing capabilities,
 * drag-and-drop, or client-side state management.
 *
 * @example
 * ```tsx
 * import { PrecompiledForm } from '@react-page/editor';
 *
 * export default function MyPage({ formData, plugins }) {
 *   return (
 *     <PrecompiledForm
 *       value={formData}
 *       cellPlugins={plugins}
 *       lang="en"
 *     />
 *   );
 * }
 * ```
 */
export const PrecompiledForm: React.FC<PrecompiledFormProps> = ({
  value,
  cellPlugins,
  lang = 'default',
  cellSpacing = null,
}) => {
  return (
    <HTMLRenderer
      value={value}
      cellPlugins={cellPlugins}
      lang={lang}
      cellSpacing={cellSpacing}
    />
  );
};

export default PrecompiledForm;
