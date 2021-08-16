import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import Component from './Component';

export default Node.create({
    name: 'treeview',

    group: 'block',

    atom: true,

    addAttributes() {
        return {
            path: {
                default: '',
            },
            collapsedNodes: {
                default: '{}',
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'treeview',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['treeview', mergeAttributes(HTMLAttributes)];
    },

    addNodeView() {
        return ReactNodeViewRenderer(Component);
    },

    addCommands() {
        return {
            toggleTreeView: () => ({ chain }: any) => {
                return chain()
                    .insertContent('<treeview></treeview>')
                    .run();
            },
        } as any;
    },
});
