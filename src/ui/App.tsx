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
import CreateDoc from './docs-list';

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
                fontWeight: 300,
            },
            h2: {
                fontSize: '20px',
                fontWeight: 300,
            },
            h3: {
                fontSize: '18px',
                fontWeight: 300,
            },
            h4: {
                fontSize: '15px',
                fontWeight: 300,
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
            ':focus': {
                outline: 'none',
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
                    <Flex
                        justifyContent="space-between"
                        alignItems="center"
                        backgroundColor="#090909"
                        padding="3px"
                    >
                        <Flex marginLeft="15px">
                            {activeDoc && activeDoc.name}
                        </Flex>
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
