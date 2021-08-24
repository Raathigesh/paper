import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import Component from './Component';

export default Node.create({
    name: 'bookmark',

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
                tag: 'bookmark',
            },
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ['bookmark', mergeAttributes(HTMLAttributes)];
    },

    addNodeView() {
        return ReactNodeViewRenderer(Component);
    },

    addCommands() {
        return {
            toggleReactComponent: () => ({ chain }: any) => {
                return chain()
                    .insertContent('<bookmark></bookmark>')
                    .run();
            },
        } as any;
    },
});
