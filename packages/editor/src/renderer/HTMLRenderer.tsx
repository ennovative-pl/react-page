import classNames from 'classnames';
import React from 'react';
import NoopProvider from '../core/components/Cell/NoopProvider';
import { migrateValue } from '../core/migrations/migrate';
import { optimizeRows } from '../core/reducer/value/helper/optimize';
import { setAllSizesAndOptimize } from '../core/reducer/value/helper/setAllSizesAndOptimize';
import type {
  Cell,
  CellPluginList,
  CellSpacing,
  RenderOptions,
  Row,
  ValueWithLegacy,
} from '../core/types';
import { getChildCellPlugins } from '../core/utils/getAvailablePlugins';
import { getCellData } from '../core/utils/getCellData';
import {
  getPluginCellSpacing,
  normalizeCellSpacing,
} from '../core/utils/getCellSpacing';
import {
  getCellInnerDivStylingProps,
  getCellOuterDivClassName,
  getContentStylingProps,
  getMarginStyle,
} from '../core/utils/getCellStylingProps';
import { useCellData, useOnMobile, useParentCellId } from '../core/components/hooks';

const rowHasInlineChildren = ({ cells }: { cells: Cell[] }) =>
  Boolean(cells.length === 2 && Boolean(cells[0].inline));

const HTMLRow: React.FC<
  Partial<Row> & {
    parent?: Cell;
    lang: string;
    className?: string;
    cellPlugins: CellPluginList;
    cellSpacing: CellSpacing;
  }
> = React.memo(
  ({ cells = [], className, parent, lang, cellPlugins, cellSpacing }) => (
    <div
      className={classNames('react-page-row', className, {
        'react-page-row-has-floating-children': rowHasInlineChildren({ cells }),
      })}
      style={{
        margin: cellSpacing.x > 0 ? `0 ${-cellSpacing.x / 2}px` : undefined,
      }}
    >
      {cells.map((c) => (
        <HTMLCell
          key={c.id}
          {...c}
          parent={parent}
          lang={lang}
          cellPlugins={cellPlugins ?? []}
          cellSpacing={cellSpacing}
        />
      ))}
    </div>
  )
);

// eslint-disable-next-line no-empty-function
const noop = () => {
  return;
};

const HTMLCell: React.FC<
  Cell & {
    lang?: string;
    parent?: Cell;
    cellPlugins: CellPluginList;
    cellSpacing: CellSpacing;
  }
> = React.memo((props) => {
  const { lang = 'default', cellPlugins, parent, cellSpacing, ...cell } = props;
  const { size, hasInlineNeighbour, inline, isDraftI18n, isDraft } = cell;
  const hasChildren = (cell.rows?.length ?? 0) > 0;
  const onMobile = useOnMobile();

  if (isDraftI18n?.[lang] ?? isDraft) {
    return null;
  }
  const parentData = parent ? getCellData(parent, lang) ?? {} : {};
  const data = getCellData(cell, lang) ?? {};
  const plugin = cell.plugin
    ? cellPlugins.find((p) => p.id === cell.plugin?.id)
    : null;
  const outerClasses = getCellOuterDivClassName({
    hasChildren,
    size: parentData.useFlex && !onMobile ? 0 : size,
    hasInlineNeighbour,
    inline,
    plugin: parentData.useFlex ? plugin : null,
    data: parentData.useFlex ? data : null,
  });

  const outerStyle = parentData.useFlex ? getMarginStyle(plugin, data) : {};

  const cellOuterStyle = {
    ...outerStyle,
    ...(cellSpacing.y !== 0 || cellSpacing.x !== 0
      ? {
          padding: `${cellSpacing.y / 2}px ${cellSpacing.x / 2}px`,
        }
      : {}),
  };

  if (plugin) {
    const { Renderer } = plugin;

    const Provider =
      plugin.Provider && !plugin.disableProviderInReadOnly
        ? plugin.Provider
        : NoopProvider;

    const pluginCellSpacing = getPluginCellSpacing(plugin, data);

    const normCellSpacing = pluginCellSpacing
      ? normalizeCellSpacing(pluginCellSpacing)
      : cellSpacing;

    const props = {
      readOnly: true,
      lang: lang,
      nodeId: cell.id,
      data: data,
      onChange: noop,
      pluginConfig: plugin,
      focused: false,
      isPreviewMode: false,
      isEditMode: false,
      onMobile: false,
    };
    const childCellPlugins = getChildCellPlugins(cellPlugins, {
      data,
      pluginId: plugin?.id,
    });

    const innerStylingProps = getCellInnerDivStylingProps(
      cell,
      plugin,
      data,
      !parentData.useFlex
    );
    const contentStylingProps = getContentStylingProps(plugin, data);

    const margin =
      normCellSpacing.y > 0 ? `${-normCellSpacing.y / 2}px 0` : undefined;

    return (
      <Provider {...props}>
        <div className={outerClasses} style={cellOuterStyle}>
          <div {...innerStylingProps}>
            <div
              style={
                hasInlineNeighbour
                  ? undefined
                  : {
                      display: 'flex',
                      flexDirection: 'column',
                      height: '100%',
                    }
              }
            >
              <Renderer {...props} {...contentStylingProps}>
                {cell.rows?.length ? (
                  <div className="w-100" style={{ margin }}>
                    {cell.rows?.map((r: Row) => (
                      <HTMLRow
                        key={r.id}
                        {...r}
                        parent={cell}
                        cellPlugins={childCellPlugins}
                        cellSpacing={normCellSpacing}
                        lang={lang}
                      />
                    ))}
                  </div>
                ) : null}
              </Renderer>
            </div>
          </div>
        </div>
      </Provider>
    );
  } else if ((cell.rows?.length ?? 0) > 0) {
    const padding = cellSpacing.x > 0 ? `0 ${cellSpacing.x / 2}px` : undefined;

    return (
      <div
        className={outerClasses}
        style={{
          ...outerStyle,
          padding,
        }}
      >
        {cell.rows?.map((r: Row) => (
          <HTMLRow
            key={r.id}
            {...r}
            parent={cell}
            lang={lang}
            cellPlugins={cellPlugins}
            cellSpacing={cellSpacing}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={outerClasses}>
      <div className="react-page-cell-inner" />
    </div>
  );
});

export type HTMLRendererProps = {
  value: ValueWithLegacy | null;

  lang?: string;
} & RenderOptions;

export const HTMLRenderer: React.FC<HTMLRendererProps> = React.memo(
  ({ value, cellPlugins, cellSpacing, lang = 'default' }) => {
    const data = migrateValue(value, { cellPlugins, lang });
    const normCellSpacing = normalizeCellSpacing(cellSpacing);

    if (!data) {
      return null;
    }
    const { rows } = data;
    const optRows = optimizeRows(rows);
    return (
      <div
        id="react-page-html"
        className="viewer-container"
        style={{
          margin:
            optRows?.length && normCellSpacing.x > 0
              ? `${-normCellSpacing.y / 2}px 0`
              : undefined,
        }}
      >
        {setAllSizesAndOptimize(optRows).map((row) => (
          <HTMLRow
            key={row.id}
            cellPlugins={cellPlugins}
            lang={lang}
            cellSpacing={normCellSpacing}
            {...row}
          />
        ))}
      </div>
    );
  }
);
