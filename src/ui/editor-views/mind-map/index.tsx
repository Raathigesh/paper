import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import Component from './Component';

export default Node.create({
    name: 'mindmap',

    group: 'block',

    atom: true,

    addAttributes() {
        return {
            data: {
                default: '[]',
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'mindmap',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['mindmap', mergeAttributes(HTMLAttributes)];
    },

    addNodeView() {
        return ReactNodeViewRenderer(Component);
    },

    addCommands() {
        return {
            toggleMindmap: () => ({ chain }: any) => {
                return chain()
                    .insertContent('<mindmap></mindmap>')
                    .run();
            },
        } as any;
    },
});
