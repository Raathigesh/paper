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
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Button,
} from '@chakra-ui/react';
import { Edit, Check, Edit2, Trash } from 'react-feather';
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
            const response = await fetch(`${API_URL}/activeFilePath`);
            const data = await response.json();
            if (data.activeFilePath) {
                setPath(data.activeFilePath);
            }
        }
    };

    useEffect(() => {
        getActivePath();
    }, []);

    const openFile = (path: string) => {
        fetch(`${API_URL}/open-file`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                filePath: path,
            }),
        });
    };

    return (
        <NodeViewWrapper className="bookmarkRenderer">
            <Flex
                display="inline-flex"
                backgroundColor="#0087FF"
                borderRadius="3px"
                paddingLeft="5px"
                fontSize="13px"
                cursor="pointer"
                _hover={{ backgroundColor: '#0074da' }}
                minHeight="25px"
                alignItems="center"
                onClick={() => openFile(props.node.attrs.path)}
            >
                <Flex marginLeft="5px">{props.node.attrs.path}</Flex>
                <Flex
                    _hover={{ backgroundColor: '#0074da' }}
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
