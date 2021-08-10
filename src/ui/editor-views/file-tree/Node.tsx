import { Flex } from '@chakra-ui/react';
import React from 'react';
import { File, Folder } from 'react-feather';

interface Props {
    name: string;
    type: 'file' | 'directory';
    path: string;
    children: Props[];
    onFileClick: (path: string) => void;
}

export function Node({ name, type, path, onFileClick, children = [] }: Props) {
    const Icon = type === 'file' ? File : Folder;
    return (
        <Flex flexDir="column" marginLeft="10px">
            <Flex
                alignItems="center"
                cursor="pointer"
                onClick={() => {
                    if (type === 'file') {
                        onFileClick(path);
                    }
                }}
            >
                <Icon size="13px" />
                {name}
            </Flex>
            {children.map(child => (
                <Node {...child} onFileClick={onFileClick} />
            ))}
        </Flex>
    );
}
