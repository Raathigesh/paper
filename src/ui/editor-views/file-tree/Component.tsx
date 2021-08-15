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

const API_URL = `http://localhost:${(window as any).port || '4545'}`;

export default (props: any) => {
    const [data, setData] = useState(null);

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
                border="1px solid #2F2E31"
                borderRadius="3px"
                padding="10px"
                flexGrow={1}
                backgroundColor="#2F2E31"
            >
                <Flex alignItems="center">
                    <Input
                        onChange={e => setPath(e.target.value)}
                        value={props.node.attrs.path}
                        borderColor="#2F2E31"
                        size="sm"
                        backgroundColor="#1C1C1E"
                        _hover={{ border: '1px solid #1C1C1E' }}
                        borderRadius="4px"
                    />
                    <Tooltip label="Refresh file tree">
                        <Button
                            colorScheme="blue"
                            onClick={() => getTree(props.node.attrs.path)}
                            backgroundColor="#2F2E31"
                            color="#f1f0ee"
                            _hover={{ backgroundColor: '#1C1C1E' }}
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
                            backgroundColor="#2F2E31"
                            color="#f1f0ee"
                            _hover={{ backgroundColor: '#1C1C1E' }}
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
                    marginTop="10px"
                >
                    {data && (
                        <Node
                            {...data}
                            onFileClick={path => {
                                openFile(path);
                            }}
                        />
                    )}
                </Flex>
            </Flex>
        </NodeViewWrapper>
    );
};
