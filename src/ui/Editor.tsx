import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import symbolBookmark from './editor-views/symbol-bookmark';
import treeView from './editor-views/file-tree';
import './styles.css';
import { Button } from '@chakra-ui/react';
import { File, List } from 'react-feather';

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
        extensions: [StarterKit, symbolBookmark, treeView],
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
                    <Button
                        size="xs"
                        backgroundColor="#0088FF"
                        color="#f1f0ee"
                        onClick={() => {
                            const focusResult = editor.chain().focus();
                            (focusResult as any).toggleReactComponent().run();
                        }}
                    >
                        <File size="13px" strokeWidth="2px" />
                    </Button>
                    <Button
                        size="xs"
                        backgroundColor="#0088FF"
                        color="#f1f0ee"
                        onClick={() => {
                            const focusResult = editor.chain().focus();
                            (focusResult as any).toggleTreeView().run();
                        }}
                    >
                        <List size="13px" strokeWidth="2px" />
                    </Button>
                </FloatingMenu>
            )}
            <EditorContent editor={editor} />
        </>
    );
};

export default Editor;
