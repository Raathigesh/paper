import React, { useEffect, useState } from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import { Input, Box, IconButton, Flex, Button } from '@chakra-ui/react';
import { Edit, Check } from 'react-feather';
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
        <NodeViewWrapper className="bookmarkRenderer">
            <Flex>
                <Input
                    onChange={e => setPath(e.target.value)}
                    value={props.node.attrs.path}
                    size="xs"
                />
                <Button
                    colorScheme="blackAlpha"
                    onClick={() => getTree(props.node.attrs.path)}
                    size="xs"
                >
                    Fetch
                </Button>
            </Flex>
            {data && (
                <Node
                    {...data}
                    onFileClick={path => {
                        openFile(path);
                    }}
                />
            )}
        </NodeViewWrapper>
    );
};
