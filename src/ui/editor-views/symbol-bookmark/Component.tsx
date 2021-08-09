import React, { useState } from 'react';
import { NodeViewWrapper } from '@tiptap/react';
import { Input, Box, IconButton, Flex } from '@chakra-ui/react';
import { Edit, Check } from 'react-feather';
import './styles.css';

const API_URL = `http://localhost:${(window as any).port || '4545'}`;

export default (props: any) => {
    const [isInEdit, setIsInEdit] = useState(false);
    const setPath = (bookmark: string) => {
        props.updateAttributes({
            path: bookmark,
        });
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

    return (
        <NodeViewWrapper className="bookmarkRenderer">
            {!isInEdit && (
                <Box
                    backgroundColor="#5F5F78"
                    color="#f1f0ee"
                    borderRadius="3px"
                    fontSize="13px"
                    height="25px"
                    paddingLeft="5px"
                    paddingRight="2px"
                    cursor="pointer"
                    onClick={() => openFile(props.node.attrs.path)}
                >
                    {props.node.attrs.path}
                    <IconButton
                        variant="ghost"
                        padding="1px"
                        onClick={() => setIsInEdit(true)}
                        size="xs"
                        aria-label="Edit icon"
                        icon={<Edit size="9px" />}
                        _hover={{
                            backgroundColor: '#5F5F78',
                        }}
                        height="16px"
                        width="10px"
                    />
                </Box>
            )}

            {isInEdit && (
                <Flex>
                    <Input
                        onChange={e => setPath(e.target.value)}
                        value={props.node.attrs.path}
                        onBlur={() => setIsInEdit(false)}
                        size="xs"
                    />
                    <IconButton
                        onClick={() => setIsInEdit(false)}
                        backgroundColor="#5F5F78"
                        color="#f1f0ee"
                        size="xs"
                        padding="3px"
                        aria-label="Edit icon"
                        icon={<Check size="10px" />}
                    />
                </Flex>
            )}
        </NodeViewWrapper>
    );
};
