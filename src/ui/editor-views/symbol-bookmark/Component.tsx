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

    console.log(props.node.attrs);

    return (
        <NodeViewWrapper className="bookmarkRenderer">
            {!isInEdit && (
                <Box
                    color="#0088FF"
                    fontWeight={600}
                    borderRadius="3px"
                    fontSize="15px"
                    height="25px"
                    paddingLeft="5px"
                    paddingRight="2px"
                    cursor="pointer"
                    onClick={() => openFile(props.node.attrs.path)}
                    wordBreak="break-all"
                >
                    {props.node.attrs.path}
                    <IconButton
                        padding="1px"
                        variant="ghost"
                        onClick={() => setIsInEdit(true)}
                        size="sm"
                        aria-label="Edit icon"
                        icon={<Edit size="9px" />}
                        width="10px"
                    />
                </Box>
            )}

            {isInEdit && (
                <Flex alignItems="center">
                    <Input
                        onChange={e => setPath(e.target.value)}
                        value={props.node.attrs.path}
                        onBlur={() => setIsInEdit(false)}
                        borderColor="#2F2E31"
                        _focus={{ borderColor: '#2F2E31' }}
                        size="sm"
                    />
                    <IconButton
                        color="#0088FF"
                        onClick={() => setIsInEdit(false)}
                        size="sm"
                        padding="3px"
                        aria-label="Edit icon"
                        icon={<Check size="10px" />}
                    />
                </Flex>
            )}
        </NodeViewWrapper>
    );
};
