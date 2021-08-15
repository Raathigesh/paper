import React, { useState } from 'react';
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
import { Edit, Check } from 'react-feather';
import './styles.css';

const API_URL = `http://localhost:${(window as any).port || '4545'}`;

export default (props: any) => {
    const [isInEdit, setIsInEdit] = useState(props.node.attrs.path === '');
    const setPath = (bookmark: string) => {
        props.updateAttributes({
            path: bookmark,
        });
    };

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
            <Modal isOpen={isInEdit} onClose={() => setIsInEdit(false)}>
                <ModalOverlay />
                <ModalContent backgroundColor="#2F2E31">
                    <ModalHeader fontSize="15px" fontWeight={400}>
                        Add range bookmark
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            onChange={e => setPath(e.target.value)}
                            value={props.node.attrs.path}
                            onBlur={() => setIsInEdit(false)}
                            size="sm"
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => {
                                setIsInEdit(false);
                                if (props.node.attrs.path === '') {
                                    props.deleteNode();
                                }
                            }}
                            backgroundColor="#2F2E31"
                            color="#f1f0ee"
                            _hover={{ backgroundColor: '#090909' }}
                            size="sm"
                            fontWeight={400}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={e => {
                                e.stopPropagation();
                                setIsInEdit(false);
                            }}
                            backgroundColor="#5E5CED"
                            color="#f1f0ee"
                            _hover={{ backgroundColor: '#5452f3' }}
                            size="sm"
                            fontWeight={400}
                        >
                            Add
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

            {!isInEdit && (
                <Flex
                    display="inline-flex"
                    backgroundColor="#FFD300"
                    borderRadius="3px"
                    paddingLeft="5px"
                    fontSize="13px"
                    cursor="pointer"
                    _hover={{ backgroundColor: '#eec600' }}
                    minHeight="25px"
                    alignItems="center"
                    onClick={() => openFile(path)}
                    color="#090909"
                >
                    <Flex marginLeft="5px">{name}</Flex>
                    <Flex
                        _hover={{ backgroundColor: '#d3b000' }}
                        padding="6px"
                        borderRadius="0px 3px 3px 0px"
                        onClick={e => {
                            e.stopPropagation();
                            setIsInEdit(true);
                        }}
                        marginLeft="5px"
                        height="100%"
                        alignItems="center"
                    >
                        <Edit size="12px" strokeWidth="2px" />
                    </Flex>
                </Flex>
            )}
        </NodeViewWrapper>
    );
};
