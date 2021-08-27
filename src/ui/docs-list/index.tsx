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
import { Menu, ArrowRight } from 'react-feather';
import { ClientDoc } from '../types';
import { DocItem } from './DocItem';

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

    const renameDocument = async (id: string, newName: string) => {
        await fetch(`${API_URL}/renameDocument`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                newName,
            }),
        });

        getDocs();
    };

    const deleteDoc = async (id: string) => {
        await fetch(`${API_URL}/deleteDocument`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
            }),
        });

        getDocs();
    };

    return (
        <Popover
            colorScheme="blackAlpha"
            onOpen={() => getDocs()}
            arrowShadowColor="brand.300"
        >
            <PopoverTrigger>
                <Flex
                    size="sm"
                    color="brand.600"
                    _hover={{ color: 'brand.400' }}
                    cursor="pointer"
                    padding="3px"
                >
                    <Menu size="18px" strokeWidth="2px" />
                </Flex>
            </PopoverTrigger>
            <Portal>
                <PopoverContent
                    borderColor="brand.300"
                    width="400px"
                    zIndex={9999999999}
                    backgroundColor="brand.300"
                    colorScheme="blackAlpha"
                    boxShadow="none"
                    _focus={{
                        boxShadow: 'none',
                    }}
                >
                    <PopoverArrow
                        backgroundColor="brand.300"
                        borderColor="brand.100"
                        boxShadow="none"
                    />
                    <PopoverHeader borderColor="brand.100">Docs</PopoverHeader>
                    <PopoverCloseButton />
                    <PopoverBody>
                        {docs.map(item => (
                            <DocItem
                                doc={item}
                                isActive={
                                    !!activeDoc && activeDoc.id === item.id
                                }
                                onClick={() => {
                                    changeActiveDocument(item.id);
                                }}
                                onDelete={deleteDoc}
                                onRename={renameDocument}
                            />
                        ))}
                    </PopoverBody>
                    <PopoverFooter borderColor="brand.100">
                        <Flex>
                            <Input
                                size="small"
                                borderRadius="3px"
                                padding="2px"
                                variant="outline"
                                placeholder="Name your doc"
                                value={docName}
                                borderColor="brand.100"
                                _hover={{
                                    borderColor: 'brand.200',
                                }}
                                _focus={{
                                    boxShadow: 'none',
                                }}
                                onChange={e => setDocName(e.target.value)}
                                onKeyDown={e => {
                                    if (e.key === 'Enter') {
                                        createDoc(docName);
                                        setDocName('');
                                    }
                                }}
                            />
                            <Button
                                marginLeft="10px"
                                variant="outline"
                                backgroundColor="brand.300"
                                color="brand.600"
                                borderColor="brand.100"
                                _hover={{
                                    borderColor: 'brand.100',
                                    backgroundColor: 'brand.200',
                                }}
                                _focus={{
                                    boxShadow: 'none',
                                }}
                                onClick={() => {
                                    createDoc(docName);
                                    setDocName('');
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
