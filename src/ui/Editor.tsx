import React, { useEffect, useState } from 'react';
import { useEditor, EditorContent, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import symbolBookmark from './editor-views/symbol-bookmark';
import './styles.css';
import { Button } from '@chakra-ui/react';
import { File } from 'react-feather';

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
        extensions: [StarterKit, symbolBookmark],
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
                        backgroundColor="#5F5F78"
                        color="#f1f0ee"
                        onClick={() => {
                            const focusResult = editor.chain().focus();
                            (focusResult as any).toggleReactComponent().run();
                        }}
                    >
                        <File size="10px" strokeWidth="1px" />
                    </Button>
                </FloatingMenu>
            )}
            <EditorContent editor={editor} />
        </>
    );
};

export default Editor;
