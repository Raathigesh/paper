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
            arrowShadowColor="#2F2E31"
        >
            <PopoverTrigger>
                <Flex
                    size="sm"
                    color="#f1f0ee"
                    _hover={{ color: '#03a9f4' }}
                    cursor="pointer"
                    padding="3px"
                >
                    <Menu size="18px" strokeWidth="2px" />
                </Flex>
            </PopoverTrigger>
            <Portal>
                <PopoverContent
                    borderColor="#2F2E31"
                    width="400px"
                    zIndex={9999999999}
                    backgroundColor="#2F2E31"
                    colorScheme="blackAlpha"
                    boxShadow="none"
                    _focus={{
                        boxShadow: 'none',
                    }}
                >
                    <PopoverArrow
                        backgroundColor="#2F2E31"
                        borderColor="#090909"
                        boxShadow="none"
                    />
                    <PopoverHeader borderColor="#090909">Docs</PopoverHeader>
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
                    <PopoverFooter borderColor="#090909">
                        <Flex>
                            <Input
                                size="small"
                                borderRadius="3px"
                                padding="2px"
                                variant="outline"
                                placeholder="Name your doc"
                                value={docName}
                                borderColor="#090909"
                                _hover={{
                                    borderColor: '#272727',
                                }}
                                _focus={{
                                    boxShadow: 'none',
                                }}
                                onChange={e => setDocName(e.target.value)}
                            />
                            <Button
                                marginLeft="10px"
                                variant="outline"
                                backgroundColor="#2F2E31"
                                color="#f1f0ee"
                                borderColor="#090909"
                                _hover={{
                                    borderColor: '#090909',
                                    backgroundColor: '#272727',
                                }}
                                _focus={{
                                    boxShadow: 'none',
                                }}
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
