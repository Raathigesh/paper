import { ChakraProvider, Flex, GlobalStyle } from '@chakra-ui/react';
import React, { useCallback, useEffect, useState } from 'react';
import { Grid } from 'react-feather';
import Editor from './Editor';
import { ClientDoc } from './types';
import CreateDoc from './docs-list';
import { theme } from './theme';

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
        <ChakraProvider theme={theme}>
            <GlobalStyle />

            <Flex flexDir="column">
                <Flex
                    justifyContent="space-between"
                    alignItems="center"
                    backgroundColor="brand.100"
                    padding="3px"
                >
                    <Flex marginLeft="15px" fontSize="12px">
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
    );
}

export default App;
