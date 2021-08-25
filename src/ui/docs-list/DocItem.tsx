import { Flex, Input } from '@chakra-ui/react';
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
            backgroundColor={isActive ? '#090909' : '#272727'}
            fontSize="13px"
            _hover={{
                backgroundColor: '#090909',
            }}
            cursor="pointer"
            padding="5px"
            borderRadius="4px"
            onClick={() => {
                onClick();
            }}
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
                            borderColor="#090909"
                            _hover={{
                                borderColor: '#272727',
                            }}
                            size="small"
                            value={docName}
                            onChange={e => setDocName(e.target.value)}
                        />
                        <Flex
                            _hover={{
                                color: '#03a9f4',
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
                                    color: '#03a9f4',
                                }}
                            >
                                <Edit strokeWidth="1.5px" size="15px" />
                            </Flex>
                            <Flex
                                marginRight="5px"
                                onClick={() => onDelete(doc.id)}
                                _hover={{
                                    color: '#03a9f4',
                                }}
                            >
                                <Trash strokeWidth="1.5px" size="15px" />
                            </Flex>
                        </Flex>
                    </Flex>
                )}
            </Flex>
        </Flex>
    );
}
