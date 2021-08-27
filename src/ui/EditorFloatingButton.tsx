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
                backgroundColor="brand.300"
                color="brand.600"
                _hover={{ backgroundColor: 'brand.100' }}
                onClick={onClick}
            >
                {icon}
            </Button>
        </Tooltip>
    );
}
