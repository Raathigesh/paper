import React, { useEffect, useState } from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import {
    Input,
    Box,
    IconButton,
    Flex,
    Button,
    Tooltip,
} from '@chakra-ui/react';
import { Edit, Check, RefreshCw, Trash2 } from 'react-feather';
import { Node } from './Node';
import './styles.css';
import listener from '../../EventsListener';

const API_URL = `http://localhost:${(window as any).port || '4545'}`;

export default (props: any) => {
    const [data, setData] = useState(null);
    const [selectedEditor, setSelectedEditor] = useState<string | null>(null);
    const [collapsedNodes, setCollapsedNodes] = useState(
        JSON.parse(props.node.attrs.collapsedNodes)
    );

    useEffect(() => {
        const cb = (path: string) => {
            setSelectedEditor(path);
        };

        listener.addListener(cb);
    }, []);

    const getTree = async (path: string) => {
        const response = await fetch(`${API_URL}/tree`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                directoryPath: path,
            }),
        });

        const tree = await response.json();

        setData(tree);
    };

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

    const setCollapsedNode = (path: string, value: boolean) => {
        setCollapsedNodes({
            ...collapsedNodes,
            [path]: value,
        });
        props.updateAttributes({
            collapsedNodes: JSON.stringify({
                ...collapsedNodes,
                [path]: value,
            }),
        });
    };

    useEffect(() => {
        if (props.node.attrs.path !== '') {
            getTree(props.node.attrs.path);
        }
    }, []);

    const setPath = (bookmark: string) => {
        props.updateAttributes({
            path: bookmark,
        });
    };

    return (
        <NodeViewWrapper
            className="bookmarkRenderer"
            style={{ display: 'flex' }}
        >
            <Flex
                flexDir="column"
                border="1px solid"
                borderColor="brand.300"
                borderRadius="3px"
                padding="10px"
                flexGrow={1}
            >
                <Flex alignItems="center">
                    <Input
                        onChange={e => setPath(e.target.value)}
                        value={props.node.attrs.path}
                        borderColor="brand.300"
                        color="brand.600"
                        size="sm"
                        backgroundColor="brand.300"
                        _hover={{ border: '1px solid brand.500' }}
                        borderRadius="4px"
                        placeholder="Paste a directory path here"
                    />
                    <Tooltip label="Refresh file tree">
                        <Button
                            colorScheme="blue"
                            onClick={() => getTree(props.node.attrs.path)}
                            backgroundColor="brand.300"
                            color="brand.600"
                            _hover={{ backgroundColor: 'brand.500' }}
                            size="sm"
                            fontWeight={400}
                            marginLeft="10px"
                        >
                            <RefreshCw size="15px" />
                        </Button>
                    </Tooltip>
                    <Tooltip label="Delete widget">
                        <Button
                            colorScheme="blue"
                            onClick={() => props.deleteNode()}
                            backgroundColor="brand.300"
                            color="brand.600"
                            _hover={{ backgroundColor: 'brand.500' }}
                            size="sm"
                            fontWeight={400}
                        >
                            <Trash2 size="15px" />
                        </Button>
                    </Tooltip>
                </Flex>
                <Flex
                    marginLeft="-20px"
                    flexGrow={1}
                    flexDir="column"
                    marginTop="5px"
                >
                    {data && (
                        <Node
                            selectedEditor={selectedEditor}
                            collapsedNodes={collapsedNodes}
                            {...data}
                            onFileClick={path => {
                                openFile(path);
                            }}
                            onCollapse={setCollapsedNode}
                        />
                    )}
                </Flex>
            </Flex>
        </NodeViewWrapper>
    );
};
