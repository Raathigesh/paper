import {
    ChakraProvider,
    Flex,
    GlobalStyle,
    theme as defaultTheme,
} from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { ThemeProvider } from '@devtools-ds/themes';
import { Grid } from 'react-feather';
import Editor from './Editor';
import { ClientDoc } from './types';
import CreateDoc from './CreateDoc';

const theme = {
    ...defaultTheme,
    styles: {
        global: {
            'html, body': {
                padding: '0px',
                backgroundColor: '#1C1C1E',
                color: 'white',
                caretColor: 'white',
                fontSize: '15px',
            },
            h1: {
                fontSize: '25px',
            },
            ul: {
                marginLeft: '15px',
            },
            li: {
                marginLeft: '15px',
            },
            button: {
                margin: '3px',
            },
        },
    },
};

const API_URL = `http://localhost:${(window as any).port || '4545'}`;

function App() {
    const [activeDoc, setActiveDoc] = useState<ClientDoc | null>(null);

    const updateContent = useCallback(
        async (content: string) => {
            if (activeDoc === null) {
                return;
            }

            fetch(`${API_URL}/content`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content,
                    id: activeDoc.id,
                }),
            });
        },
        [activeDoc]
    );

    async function getContent() {
        const document: ClientDoc = await (
            await fetch(`${API_URL}/content`)
        ).json();
        setActiveDoc(document);
    }

    useEffect(() => {
        getContent();
    }, [setActiveDoc]);

    return (
        <ThemeProvider theme={'chrome'} colorScheme={'dark'}>
            <ChakraProvider theme={theme}>
                <GlobalStyle />

                <Flex flexDir="column">
                    <Flex justifyContent="flex-end">
                        <CreateDoc
                            activeDoc={activeDoc}
                            onActiveDocumentChange={() => {
                                getContent();
                            }}
                        />
                    </Flex>

                    {activeDoc && (
                        <Editor
                            content={activeDoc?.content}
                            onChange={updateContent}
                        />
                    )}
                </Flex>
            </ChakraProvider>
        </ThemeProvider>
    );
}

export default App;
