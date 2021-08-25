import React, { useEffect } from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import { Flex, Tooltip } from '@chakra-ui/react';
import { Trash } from 'react-feather';
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
                backgroundColor="#090909"
                color="#03a9f4"
                borderRadius="4px"
                fontSize="14px"
                cursor="pointer"
                _hover={{ backgroundColor: '#272727' }}
                minHeight="25px"
                alignItems="center"
                onClick={() => openFile(props.node.attrs.path)}
            >
                <Flex marginLeft="5px" padding="2px" alignItems="center">
                    {props.node.attrs.path}
                </Flex>
                <Flex
                    _hover={{ backgroundColor: '#03a9f4', color: '#090909' }}
                    padding="7px"
                    borderRadius="0px 4px 4px 0px"
                    onClick={e => {
                        e.stopPropagation();
                        props.deleteNode();
                    }}
                    marginLeft="5px"
                    height="100%"
                    alignItems="center"
                >
                    <Tooltip label="Delete">
                        <Trash size="12px" strokeWidth="2px" />
                    </Tooltip>
                </Flex>
            </Flex>
        </NodeViewWrapper>
    );
};
