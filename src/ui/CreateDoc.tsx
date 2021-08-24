import {
    Button,
    Flex,
    Input,
    Popover,
    PopoverArrow,
    PopoverBody,
    PopoverCloseButton,
    PopoverContent,
    PopoverFooter,
    PopoverHeader,
    PopoverTrigger,
    Portal,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { PlusSquare, ArrowRight } from 'react-feather';
import { ClientDoc } from './types';

const API_URL = `http://localhost:${(window as any).port || '4545'}`;

interface Props {
    activeDoc: ClientDoc | null;
    onActiveDocumentChange: () => void;
}

export default function CreateDoc({
    activeDoc,
    onActiveDocumentChange,
}: Props) {
    const [docs, setDocs] = useState<ClientDoc[]>([]);
    const [docName, setDocName] = useState('');

    const getDocs = async () => {
        const response = await fetch(`${API_URL}/documents`);
        const documents = await response.json();
        setDocs(documents);
    };

    const changeActiveDocument = async (id: string) => {
        await fetch(`${API_URL}/changeActiveDocument`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
            }),
        });

        onActiveDocumentChange();
    };

    const createDoc = async (name: string) => {
        const response = await fetch(`${API_URL}/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                type: 'doc',
            }),
        });
        const documents = await response.json();
        setDocs(documents);
    };

    return (
        <Popover colorScheme="blackAlpha" onOpen={() => getDocs()}>
            <PopoverTrigger>
                <Button
                    size="sm"
                    backgroundColor="#2F2E31"
                    color="#f1f0ee"
                    _hover={{ backgroundColor: '#090909' }}
                    onClick={() => {}}
                >
                    <PlusSquare size="18px" strokeWidth="2px" />
                </Button>
            </PopoverTrigger>
            <Portal>
                <PopoverContent
                    zIndex={9999999999}
                    backgroundColor="#2F2E31"
                    colorScheme="blackAlpha"
                >
                    <PopoverArrow backgroundColor="#2F2E31" />
                    <PopoverHeader>Docs</PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                        {docs.map(item => (
                            <Flex
                                backgroundColor={
                                    activeDoc
                                        ? activeDoc.id === item.id
                                            ? '#090909'
                                            : ''
                                        : ''
                                }
                                _hover={{
                                    backgroundColor: '#090909',
                                }}
                                cursor="pointer"
                                padding="3px"
                                borderRadius="2px"
                                onClick={() => {
                                    changeActiveDocument(item.id);
                                }}
                            >
                                {item.name || item.id}
                            </Flex>
                        ))}
                    </PopoverBody>
                    <PopoverFooter>
                        <Flex>
                            <Input
                                size="medium"
                                borderRadius="3px"
                                padding="2px"
                                variant="outline"
                                placeholder="Name your doc"
                                value={docName}
                                onChange={e => setDocName(e.target.value)}
                            />
                            <Button
                                size="sm"
                                backgroundColor="#2F2E31"
                                color="#f1f0ee"
                                _hover={{ backgroundColor: '#090909' }}
                                onClick={() => {
                                    createDoc(docName);
                                }}
                                isDisabled={docName.trim() === ''}
                            >
                                <ArrowRight size="18px" strokeWidth="2px" />
                            </Button>
                        </Flex>
                    </PopoverFooter>
                </PopoverContent>
            </Portal>
        </Popover>
    );
}
