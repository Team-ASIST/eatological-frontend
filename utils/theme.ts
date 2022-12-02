import { createTheme } from '@shopify/restyle';

export const palette = {
    coral: '#F88379',
    lightCoral: '#FF9F96',
    darkCoral: '#AB4B43',
    darkMintGreen: '#32AB67',
    lightMintGreen: '#79F7B1',

    white: '#ffffff',
    black: '#000000',
    grey: '#5E5854',
    creme: '#FFE5E3',
};

const theme = createTheme({
    spacing: {
        s: 8,
        m: 16,
        l: 32, 
    },
    colors: {
        mainBackground: palette.creme,
        mainForeground: palette.darkCoral,
        primaryCardBackground: palette.coral,
        secondaryCardBackground: palette.darkMintGreen,
        primaryCardText: palette.white,
        secondaryCardText: palette.black,
    },
    breakpoints: {
        phone: 0,
        mobile: {
            width: 0,
            height: 812,
        },
        desktop: 768,
        largeTablet: 1024,
    },
    textVariants: {
        header: {
            fontFamily: 'Fraunces_700Bold',
            fontWeight: 'bold',
            fontSize: 34,
            lineHeight: 42.5,
            color:  'primaryCardText',
        },
        subheader: {
            fontFamily: 'Fraunces_500Medium',
            fontWeight: '600',
            fontSize: 28,
            lineHeight: 36,
            color: 'primaryCardText',
        },
        body: {
            fontFamily: 'Fraunces_300Light',
            fontSize: 16,
            lineHeight: 24,
            color: 'primaryCardText',
        },
    },
    cardVariants: {
        primary: {
            backgroundColor: 'primaryCardBackground',
            shadowOpacity: 0.3,
        },
        secondary: {
            backgroundColor: 'secondaryCardBackground',
            shadowOpacity: 0.1,
        },
    },
});

export const darkTheme: Theme = {
    ...theme,
    colors: {
        ...theme.colors,
        mainBackground: palette.grey,
        mainForeground: palette.white,

        secondaryCardBackground: palette.darkMintGreen,
        secondaryCardText: palette.black,
    },
};

export type Theme = typeof theme;
export default theme;