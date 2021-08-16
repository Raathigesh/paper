import { Box, Flex } from '@chakra-ui/react';
import React, { useState } from 'react';
import { File, Folder, ChevronDown, ChevronRight } from 'react-feather';

interface Props {
    name: string;
    type: 'file' | 'directory';
    path: string;
    children: Props[];
    collapsedNodes: { [key: string]: boolean };
    onFileClick: (path: string) => void;
    onCollapse: (path: string, value: boolean) => void;
    selectedEditor: string | null;
}

export function Node({
    name,
    type,
    path,
    onFileClick,
    collapsedNodes,
    onCollapse,
    children = [],
    selectedEditor,
}: Props) {
    const isExpanded =
        collapsedNodes[path] === undefined ? true : collapsedNodes[path];

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
                backgroundColor={
                    selectedEditor?.toLowerCase() === path.toLowerCase()
                        ? '#25252e'
                        : 'none'
                }
                onClick={e => {
                    e.stopPropagation();
                    if (type === 'file') {
                        onFileClick(path);
                    } else {
                        onCollapse(path, !isExpanded);
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
                    <Node
                        {...child}
                        onFileClick={onFileClick}
                        collapsedNodes={collapsedNodes}
                        onCollapse={onCollapse}
                        selectedEditor={selectedEditor}
                    />
                ))}
        </Flex>
    );
}
