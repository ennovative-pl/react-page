import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListSubheader from '@mui/material/ListSubheader';
import TextField from '@mui/material/TextField';
import React from 'react';
import { Portal } from 'react-portal';
import { Droppable } from 'react-beautiful-dnd';
import {
  useIsInsertMode,
  useUiTranslator,
  useDisplayModeReferenceNodeId,
  useAllCellPluginsForNode,
  useSetEditMode,
} from '../../core/components/hooks';
import type { CellPlugin } from '../../core/types';
import Item from './Item/index';
import { Form } from 'react-bootstrap';

export interface PluginDrawerLabels {
  noPluginFoundContent: string;
  searchPlaceholder: string;
  insertPlugin: string;
  dragMe: string;
}

const getPluginTitle = (plugin: CellPlugin) =>
  (plugin.title || plugin.text) ?? '';

export const PluginDrawer: React.FC = React.memo(() => {
  const defaultLabels: PluginDrawerLabels = {
    noPluginFoundContent: 'No blocks found',
    searchPlaceholder: 'Search for blocks',
    insertPlugin: 'Add blocks to page',
    dragMe: 'Drag me!',
  };
  const nodeId = useDisplayModeReferenceNodeId();
  const plugins = useAllCellPluginsForNode(nodeId);
  const setEditMode = useSetEditMode();

  const { t } = useUiTranslator();
  const [searchText, setSearchText] = React.useState<string>('');
  const searchFilter = React.useCallback(
    (plugin: CellPlugin) => {
      const id = plugin.id;
      const title = getPluginTitle(plugin);
      return (
        plugin &&
        id &&
        !plugin.hideInMenu &&
        (id.toLowerCase().includes(searchText?.toLowerCase()) ||
          (plugin.description &&
            plugin.description
              .toLowerCase()
              .includes(searchText?.toLowerCase())) ||
          (title && title.toLowerCase().includes(searchText?.toLowerCase())))
      );
    },
    [searchText]
  );

  const onSearch = React.useCallback(
    (e: React.ChangeEvent) => {
      const target = e.target;
      if (target instanceof HTMLInputElement) {
        setSearchText(target.value);
      }
    },
    [setSearchText]
  );
  const isInsertMode = useIsInsertMode();
  const inputRef = React.useRef<HTMLInputElement>();
  React.useEffect(() => {
    let handle: NodeJS.Timeout;
    if (inputRef.current && isInsertMode) {
      handle = setTimeout(() => {
        const e = inputRef?.current?.querySelector('input');
        if (e) {
          e.focus();
        }
      }, 100);
    }

    return () => {
      clearTimeout(handle);
    };
  }, [inputRef.current, isInsertMode]);

  const filteredPlugins = plugins.filter(searchFilter);

  // Generate a unique droppable ID for the plugin drawer
  const droppableId = `plugin-drawer-items-${Math.random()
    .toString(36)
    .substring(2)}`;

  return (
    <Portal>
      <Drawer
        variant="persistent"
        className="react-page-plugin-drawer"
        open={isInsertMode}
        PaperProps={{
          style: {
            width: 320,
          },
        }}
      >
        <List
          subheader={
            <ListSubheader>
              <div className="d-flex w-100 justify-content-between align-items-center">
                <span>{t(defaultLabels.insertPlugin)}</span>
                <button
                  type="button"
                  className="btn btn-close btn-primary"
                  onClick={() => setEditMode()}
                  aria-label="Zamknij"
                >
                  <i className="fas fa-times" />
                </button>
              </div>
            </ListSubheader>
          }
        >
          <ListItem>
            <Form.Control
              type="text"
              placeholder={t(defaultLabels.searchPlaceholder) ?? ''}
              onChange={onSearch}
              ref={inputRef as any}
            />
          </ListItem>
          {filteredPlugins.length === 0 && (
            <ListSubheader>
              {t(defaultLabels.noPluginFoundContent)}
            </ListSubheader>
          )}
        </List>
        {filteredPlugins.length > 0 && (
          <Droppable droppableId={droppableId} isDropDisabled={true}>
            {(provided) => (
              <List ref={provided.innerRef} {...provided.droppableProps}>
                {filteredPlugins.map((plugin, k: number) => {
                  return (
                    <Item
                      translations={defaultLabels}
                      plugin={plugin}
                      key={k.toString()}
                      index={k}
                      insert={{
                        plugin: plugin.id,
                      }}
                    />
                  );
                })}
                {provided.placeholder}
              </List>
            )}
          </Droppable>
        )}
      </Drawer>
    </Portal>
  );
});
