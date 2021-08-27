import { Flex, Input, Tooltip, useTheme } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Edit, Check, Trash } from 'react-feather';
import { ClientDoc } from '../types';

interface Props {
    isActive: boolean;
    onClick: () => void;
    doc: ClientDoc;
    onRename: (id: string, newName: string) => void;
    onDelete: (id: string) => void;
}

export function DocItem({ isActive, onClick, doc, onRename, onDelete }: Props) {
    const [isEditMode, setIsEditMode] = useState(false);
    const [docName, setDocName] = useState(doc.name);

    return (
        <Flex
            backgroundColor={isActive ? 'brand.100' : 'brand.200'}
            fontSize="13px"
            _hover={{
                backgroundColor: 'brand.100',
            }}
            cursor="pointer"
            padding="5px"
            borderRadius="4px"
            onClick={() => {
                onClick();
            }}
            height="30px"
            marginBottom="3px"
        >
            <Flex width="100%">
                {isEditMode && (
                    <Flex
                        alignItems="center"
                        justifyContent="space-between"
                        width="100%"
                    >
                        <Input
                            borderColor="brand.100"
                            _hover={{
                                borderColor: 'brand.200',
                            }}
                            onKeyDown={e => {
                                if (e.key == 'Enter') {
                                    setIsEditMode(false);
                                    onRename(doc.id, docName);
                                }
                            }}
                            size="small"
                            value={docName}
                            onChange={e => setDocName(e.target.value)}
                        />
                        <Flex
                            _hover={{
                                color: 'brand.400',
                            }}
                            marginLeft="10px"
                            marginRight="5px"
                            onClick={() => {
                                setIsEditMode(false);
                                onRename(doc.id, docName);
                            }}
                        >
                            <Check strokeWidth="1.5px" size="15px" />
                        </Flex>
                    </Flex>
                )}
                {!isEditMode && (
                    <Flex justifyContent="space-between" width="100%">
                        <Flex>{doc.name || doc.id}</Flex>
                        <Flex alignItems="center">
                            <Flex
                                onClick={() => setIsEditMode(true)}
                                marginRight="10px"
                                _hover={{
                                    color: 'brand.400',
                                }}
                            >
                                <Edit strokeWidth="1.5px" size="15px" />
                            </Flex>

                            <Flex
                                marginRight="5px"
                                onClick={e => {
                                    if (!isActive) {
                                        onDelete(doc.id);
                                    }
                                    e.stopPropagation();
                                }}
                                cursor={isActive ? 'not-allowed' : 'pointer'}
                                _hover={{
                                    color: isActive ? 'none' : 'brand.400',
                                }}
                            >
                                <Tooltip
                                    label={
                                        isActive
                                            ? "Can't delete active note"
                                            : 'Delete note'
                                    }
                                >
                                    <Trash strokeWidth="1.5px" size="15px" />
                                </Tooltip>
                            </Flex>
                        </Flex>
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
}
