import { Tooltip, Button } from '@chakra-ui/react';
import React from 'react';

interface Props {
    onClick: () => void;
    tooltip: string;
    icon: any;
}

export function EditorFloatingButton({ onClick, tooltip, icon }: Props) {
    return (
        <Tooltip label={tooltip}>
            <Button
                size="xs"
                backgroundColor="#2F2E31"
                color="#f1f0ee"
                _hover={{ backgroundColor: '#090909' }}
                onClick={onClick}
            >
                {icon}
            </Button>
        </Tooltip>
    );
}
