import React, { CSSProperties, useEffect, useState } from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import ReactFlow, {
    Background,
    Controls,
    ControlButton,
    addEdge,
    removeElements,
} from 'react-flow-renderer';
import {
    Input,
    Box,
    IconButton,
    Flex,
    Button,
    Tooltip,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
} from '@chakra-ui/react';
import { Edit, Check, RefreshCw, Trash2, File } from 'react-feather';
import './styles.css';

const API_URL = `http://localhost:${(window as any).port || '4545'}`;

const Link = ({ path, onClick, onDelete }: any) => (
    <Flex
        cursor="pointer"
        color="#5E5CED"
        wordBreak="break-word"
        onClick={() => onClick(path)}
        _hover={{ color: '#3735e7' }}
    >
        {path}

        <Flex
            padding="6px"
            borderRadius="0px 3px 3px 0px"
            onClick={e => {
                e.stopPropagation();
                onDelete();
            }}
            marginLeft="5px"
            height="100%"
            alignItems="center"
        >
            <Trash2 size="12px" strokeWidth="2px" />
        </Flex>
    </Flex>
);

interface Node {
    id: string;
    data?: {
        label?: string;
        labelText?: string;
    };
    position: {
        x: number;
        y: number;
    };
    style?: CSSProperties;
}

export default (props: any) => {
    const [elements, setElements] = useState<Node[]>(
        JSON.parse(props.node.attrs.data)
    );

    const [isInEdit, setIsInEdit] = useState(false);
    const [txtPath, setTxtPath] = useState('');

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

    const setPath = (nodes: any[]) => {
        props.updateAttributes({
            data: JSON.stringify(nodes),
        });
    };
    const addNode = (path: string) => {
        const nextElements = [
            ...elements,
            {
                id: path,
                data: {
                    label: path,
                },
                position: { x: 250, y: 5 },
            },
        ];
        setElements(nextElements);

        setPath(nextElements);
    };

    const removeNode = (path: string) => {
        const nextElements = elements.filter(item => item.id !== path);
        setElements(nextElements);
        setPath(nextElements);
    };

    const update = (event: any, node: Node) => {
        if (node.data && node.data.label) {
            delete node.data.label;
            node.data.label = node.data.labelText;
            delete node.data.labelText;
            delete node.style;
        }
        const otherItems = elements.filter(item => item.id !== node.id);
        setElements([...otherItems, node]);
    };

    const onConnect = (params: any) => {
        const nextElements = addEdge(params, elements) as Node[];
        setElements(nextElements);
        setPath(nextElements);
    };

    const mappedElements = elements.map(element => {
        if (element.data && element.data.label) {
            return {
                ...element,
                data: {
                    label: (
                        <Link
                            path={element.data.label}
                            onClick={openFile}
                            onDelete={() => {
                                if (element.data && element.data.label) {
                                    removeNode(element.data.label);
                                }
                            }}
                        />
                    ),
                    labelText: element.data.label,
                },
                style: { width: '300px' },
            };
        }

        return element;
    });

    return (
        <NodeViewWrapper
            className="bookmarkRenderer"
            style={{ display: 'flex' }}
        >
            <Modal isOpen={isInEdit} onClose={() => setIsInEdit(false)}>
                <ModalOverlay />
                <ModalContent backgroundColor="#2F2E31">
                    <ModalHeader fontSize="15px" fontWeight={400}>
                        Add range bookmark
                    </ModalHeader>
                    <ModalBody>
                        <Input
                            onChange={e => setTxtPath(e.target.value)}
                            value={txtPath}
                            size="sm"
                        />
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            colorScheme="blue"
                            mr={3}
                            onClick={() => {
                                setIsInEdit(false);
                                setTxtPath('');
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
                                addNode(txtPath);
                                setTxtPath('');
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
            <Flex
                flexDir="column"
                border="1px solid #2F2E31"
                borderRadius="3px"
                padding="10px"
                flexGrow={1}
                backgroundColor="#2F2E31"
                height="500px"
            >
                <ReactFlow
                    elements={mappedElements}
                    onConnect={onConnect}
                    onNodeDragStop={update}
                >
                    <Background gap={12} size={1} />
                    <Controls>
                        <ControlButton onClick={() => setIsInEdit(true)}>
                            <File color="#5452f3" strokeWidth="2px" />
                        </ControlButton>
                    </Controls>
                </ReactFlow>
            </Flex>
        </NodeViewWrapper>
    );
};
