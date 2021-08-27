import React, { useEffect, useState } from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import {
    Input,
    Box,
    IconButton,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
} from '@chakra-ui/react';
import { Edit, Check, Trash } from 'react-feather';
import './styles.css';

const API_URL = `http://localhost:${(window as any).port || '4545'}`;

export default (props: any) => {
    const setPath = (bookmark: string) => {
        props.updateAttributes({
            path: bookmark,
        });
    };

    const getActivePath = async () => {
        if (props.node.attrs.path === '') {
            const response = await fetch(`${API_URL}/getSelection`);
            const data = await response.json();
            if (data.selection) {
                setPath(data.selection);
            }
        }
    };

    useEffect(() => {
        getActivePath();
    }, []);

    const [
        name,
        path,
        startLine,
        startChar,
        endLine,
        endChar,
    ] = props.node.attrs.path.split('|');

    const openFile = (path: string) => {
        fetch(`${API_URL}/open-file`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filePath: path,
                selection: {
                    start: {
                        line: Number(startLine),
                        column: Number(startChar),
                    },
                    end: {
                        line: Number(endLine),
                        column: Number(endChar),
                    },
                },
            }),
        });
    };

    return (
        <NodeViewWrapper className="bookmarkRenderer">
            <Flex
                display="inline-flex"
                backgroundColor="brand.100"
                color="brand.800"
                borderRadius="5px"
                fontSize="14px"
                cursor="pointer"
                _hover={{ backgroundColor: 'brand.200' }}
                minHeight="25px"
                alignItems="center"
                onClick={() => openFile(path)}
            >
                <Flex padding="2px" marginLeft="5px">
                    {name}
                </Flex>
                <Flex
                    _hover={{
                        backgroundColor: 'brand.900',
                        color: 'brand.100',
                    }}
                    padding="6px"
                    borderRadius="0px 3px 3px 0px"
                    onClick={e => {
                        e.stopPropagation();
                        props.deleteNode();
                    }}
                    marginLeft="5px"
                    height="100%"
                    alignItems="center"
                >
                    <Trash size="12px" strokeWidth="2px" />
                </Flex>
            </Flex>
        </NodeViewWrapper>
    );
};
