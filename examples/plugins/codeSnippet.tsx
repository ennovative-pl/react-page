import type { CellPlugin } from '@react-page/editor';
import dynamic from 'next/dynamic';
import React from 'react';

// lazy load to keep initial bundle small
const CodeSnippet = dynamic(() => import('../components/CodeSnippet'));

const codeSnippet: CellPlugin<{
  code: string;
  code1: string;
  code2: string;
  code3: string;
  code4: string;
  code5: string;
  code6: string;
  language: string;
  select: string;
  check: boolean;
}> = {
  Renderer: ({ data }) =>
    data?.code ? (
      <CodeSnippet language={data.language} code={data.code} />
    ) : null,
  id: 'code-snippet',
  title: 'Code snippet',
  description: 'A code snippet',
  version: 1,
  controls: [
    {
      title: 'Part 1',
      icon: 'fa-user',
      controls: {
        type: 'autoform',
        columnCount: 2,
        schema: {
          properties: {
            language: {
              type: 'string',
            },
            code1: {
              type: 'string',
            },
            code2: {
              type: 'string',
            },
            code3: {
              type: 'string',
            },
            code4: {
              type: 'string',
            },
            code5: {
              type: 'string',
            },
            code6: {
              type: 'string',
            },
            select: {
              type: 'string',
              enum: ['one', 'two'],
              uniforms: {
                options: [
                  { label: 'Jeden', value: 'one' },
                  { label: 'Dwa', value: 'two' },
                ],
              },
            },
            check: {
              type: 'boolean',
            },
          },
          required: ['code'],
        },
      },
    },
    {
      title: 'Part 2',
      controls: {
        type: 'autoform',
        schema: {
          properties: {
            code: {
              type: 'string',
              uniforms: {
                multiline: true,
              },
            },
          },
          required: ['code'],
        },
      },
    },

  ],
};
export default codeSnippet;
