import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import symbolBookmark from './editor-views/symbol-bookmark';
import treeView from './editor-views/file-tree';
import rangeBookmark from './editor-views/range-bookmark';
import mindmap from './editor-views/mind-map';
import './styles.css';
import { Button, Flex, Tooltip } from '@chakra-ui/react';
import { File, List, MousePointer, Map } from 'react-feather';

const API_URL = `http://localhost:${(window as any).port || '4545'}`;

const Editor = () => {
    const updateContent = async (content: string) => {
        fetch(`${API_URL}/content`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content,
            }),
        });
    };

    const editor = useEditor({
        extensions: [
            StarterKit,
            symbolBookmark,
            treeView,
            rangeBookmark,
            mindmap,
        ],
        content: '',
        onUpdate: ({ editor }) => {
            updateContent(editor.getHTML());
        },
    });

    useEffect(() => {
        async function getContent() {
            const content = await (await fetch(`${API_URL}/content`)).text();
            editor?.commands.setContent(content);
        }

        getContent();
    }, [editor]);

    return (
        <>
            {editor && (
                <FloatingMenu editor={editor}>
                    <Flex backgroundColor="#2F2E31" borderRadius="4px">
                        <Tooltip label="Bookmark a file">
                            <Button
                                size="xs"
                                backgroundColor="#2F2E31"
                                color="#f1f0ee"
                                _hover={{ backgroundColor: '#090909' }}
                                onClick={() => {
                                    const focusResult = editor.chain().focus();
                                    (focusResult as any)
                                        .toggleReactComponent()
                                        .run();
                                }}
                            >
                                <File size="13px" strokeWidth="2px" />
                            </Button>
                        </Tooltip>
                        <Tooltip label="Embed a file tree">
                            <Button
                                size="xs"
                                backgroundColor="#2F2E31"
                                color="#f1f0ee"
                                _hover={{ backgroundColor: '#090909' }}
                                onClick={() => {
                                    const focusResult = editor.chain().focus();
                                    (focusResult as any).toggleTreeView().run();
                                }}
                            >
                                <List size="13px" strokeWidth="2px" />
                            </Button>
                        </Tooltip>
                        <Tooltip label="Bookmark a range">
                            <Button
                                size="xs"
                                backgroundColor="#2F2E31"
                                color="#f1f0ee"
                                _hover={{ backgroundColor: '#090909' }}
                                onClick={() => {
                                    const focusResult = editor.chain().focus();
                                    (focusResult as any).toggleRange().run();
                                }}
                            >
                                <MousePointer size="13px" strokeWidth="2px" />
                            </Button>
                        </Tooltip>
                        <Tooltip label="Mind map">
                            <Button
                                size="xs"
                                backgroundColor="#2F2E31"
                                color="#f1f0ee"
                                _hover={{ backgroundColor: '#090909' }}
                                onClick={() => {
                                    const focusResult = editor.chain().focus();
                                    (focusResult as any).toggleMindmap().run();
                                }}
                            >
                                <Map size="13px" strokeWidth="2px" />
                            </Button>
                        </Tooltip>
                    </Flex>
                </FloatingMenu>
            )}
            <EditorContent editor={editor} />
        </>
    );
};

export default Editor;
