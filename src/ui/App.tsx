import {
    ChakraProvider,
    Flex,
    GlobalStyle,
    theme as defaultTheme,
} from '@chakra-ui/react';
import React, { Fragment, useContext, useEffect, useState } from 'react';
import { ThemeProvider } from '@devtools-ds/themes';
import copy from 'copy-to-clipboard';
import Editor from './Editor';

const theme = {
    ...defaultTheme,
    styles: {
        global: {
            'html, body': {
                padding: '0px',
                backgroundColor: '#1C1C1E',
                color: 'white',
                caretColor: 'white',
                fontSize: '15px',
            },
            h1: {
                fontSize: '25px',
            },
            ul: {
                marginLeft: '15px',
            },
            li: {
                marginLeft: '15px',
            },
            button: {
                margin: '3px',
            },
        },
    },
};

const API_URL = `http://localhost:${(window as any).port || '4545'}`;

function App() {
    return (
        <ThemeProvider theme={'chrome'} colorScheme={'dark'}>
            <ChakraProvider theme={theme}>
                <GlobalStyle />
                <div>
                    <Editor />
                </div>
            </ChakraProvider>
        </ThemeProvider>
    );
}

export default App;
