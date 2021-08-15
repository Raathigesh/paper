import { Box, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { File, Folder, ChevronDown, ChevronRight } from 'react-feather';

interface Props {
    name: string;
    type: 'file' | 'directory';
    path: string;
    children: Props[];
    onFileClick: (path: string) => void;
}

export function Node({ name, type, path, onFileClick, children = [] }: Props) {
    const [isExpanded, setIsExpanded] = useState(true);

    const ArrowIcon =
        type === 'directory' ? (
            isExpanded ? (
                <ChevronDown size="15px" />
            ) : (
                <ChevronRight size="15px" />
            )
        ) : null;
    const Icon = type === 'file' ? File : Folder;
    return (
        <Flex flexDir="column" marginLeft="20px">
            <Flex
                alignItems="center"
                cursor="pointer"
                padding="3px"
                borderRadius="3px"
                fontSize="14px"
                _hover={{
                    backgroundColor: '#25252e',
                }}
                onClick={e => {
                    e.stopPropagation();
                    if (type === 'file') {
                        onFileClick(path);
                    } else {
                        setIsExpanded(!isExpanded);
                    }
                }}
            >
                <Box marginRight="3px">{ArrowIcon}</Box>
                <Icon size="13px" strokeWidth="1px" />
                <Box marginLeft="3px" fontSize="13px">
                    {name}
                </Box>
            </Flex>
            {isExpanded &&
                children.map(child => (
                    <Node {...child} onFileClick={onFileClick} />
                ))}
        </Flex>
    );
}
