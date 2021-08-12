import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import Component from './Component';

export default Node.create({
    name: 'range',

    group: 'inline',

    inline: true,

    atom: true,

    addAttributes() {
        return {
            path: {
                default: '',
            },
        };
    },

    parseHTML() {
        return [
            {
                tag: 'range',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['range', mergeAttributes(HTMLAttributes)];
    },

    addNodeView() {
        return ReactNodeViewRenderer(Component);
    },

    addCommands() {
        return {
            toggleRange: () => ({ chain }: any) => {
                return chain()
                    .insertContent('<range></range>')
                    .run();
            },
        } as any;
    },
});
