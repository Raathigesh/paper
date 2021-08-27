import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
    styles: {
        global: {
            'html, body': {
                padding: '0px',
                backgroundColor: 'brand.500',
                color: 'white',
                caretColor: 'white',
                fontSize: '15px',
            },
            h1: {
                fontSize: '25px',
                fontWeight: 300,
            },
            h2: {
                fontSize: '20px',
                fontWeight: 300,
            },
            h3: {
                fontSize: '18px',
                fontWeight: 300,
            },
            h4: {
                fontSize: '15px',
                fontWeight: 300,
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
            ':focus': {
                outline: 'none',
            },
        },
    },
    colors: {
        brand: {
            100: '#090909',
            200: '#272727',
            300: '#2F2E31',
            400: '#03a9f4',
            500: '#1C1C1E',
            600: '#f1f0ee',
            700: '#25252e',
            800: '#ffc107',
            900: '#e91e63',
        },
    },
});
