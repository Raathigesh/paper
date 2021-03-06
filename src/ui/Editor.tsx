import React, { useEffect } from 'react';
import { useEditor, EditorContent, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import fileBookmark from './editor-views/file-bookmark';
import treeView from './editor-views/file-tree';
import selectionBookmark from './editor-views/selection-bookmark';
import './styles.css';
import { Flex } from '@chakra-ui/react';
import { File, MousePointer, Folder } from 'react-feather';
import { EditorFloatingButton } from './EditorFloatingButton';

const API_URL = `http://localhost:${(window as any).port || '4545'}`;

interface Props {
    content: string;
    onChange: (content: string) => void;
}

const Editor = ({ content, onChange }: Props) => {
    const editor = useEditor({
        extensions: [StarterKit, fileBookmark, treeView, selectionBookmark],
        content: '',
    });

    useEffect(() => {
        const handler = ({ editor }: any) => {
            onChange(editor.getHTML());
        };
        editor?.on('update', handler);
        return () => {
            editor?.off('update', handler);
        };
    }, [editor, onChange]);

    useEffect(() => {
        editor?.commands.setContent(content);
    }, [content, editor]);

    return (
        <>
            {editor && (
                <FloatingMenu editor={editor}>
                    <Flex backgroundColor="brand.300" borderRadius="4px">
                        <EditorFloatingButton
                            tooltip="Bookmark active file"
                            onClick={() => {
                                const focusResult = editor.chain().focus();
                                (focusResult as any)
                                    .toggleReactComponent()
                                    .run();
                            }}
                            icon={<File size="13px" strokeWidth="2px" />}
                        />
                        <Flex
                            borderLeft="1px solid brand.100"
                            marginTop="2px"
                            marginBottom="2px"
                        />
                        <EditorFloatingButton
                            tooltip="Bookmark current selection"
                            onClick={() => {
                                const focusResult = editor.chain().focus();
                                (focusResult as any).toggleRange().run();
                            }}
                            icon={
                                <MousePointer size="13px" strokeWidth="2px" />
                            }
                        />
                        <Flex borderLeft="1px solid brand.100" />
                        <EditorFloatingButton
                            tooltip="Embed a file tree"
                            onClick={() => {
                                const focusResult = editor.chain().focus();
                                (focusResult as any).toggleTreeView().run();
                            }}
                            icon={<Folder size="13px" strokeWidth="2px" />}
                        />
                    </Flex>
                </FloatingMenu>
            )}
            <EditorContent editor={editor} />
        </>
    );
};

export default Editor;
