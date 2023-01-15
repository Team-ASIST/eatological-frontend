import { createTheme } from '@shopify/restyle';

export const palette = {
    // Main Palette
    pastelPink: '#FFD0D0',
    lightPink: '#FFADAD',
    salmonPink:'#FF9999',
    congoPink: '#FF7070',

    //Accent
    backgroundGreen: '#EBFBDA',
    navyGreen:'#304C09',
    sapGreen: '#4E790D',

    mistyRose: '#FFEBEB',
    spanishPink: '#FFC2C2',

    //Various
    green: '#42ba96',
    yellow: '#ffc107',
    red: '#df4759',
     
    white: '#ffffff',
    black: '#000000',
    grey: '#aEa8a4',
    sonicSilver: '#7E7570'
};

export const fonts = {
    light: 'Fraunces_300Light',
    medium: 'Fraunces_500Medium',
    bold: 'Fraunces_700Bold'
}

const theme = createTheme({
    spacing: {
        xs: 4,
        s: 8,
        m: 16,
        l: 32, 
        xl: 64, 
        xxl: 128,
        xxxl: 256,
    },
    heights: {
        xs: 100,
        s: 150,
        m: 200,
        l: 250, 
    },
    colors: {
        mainBackground: palette.backgroundGreen,
        mainForeground: palette.sapGreen,
        primaryCardBackground: palette.navyGreen,
        secondaryCardBackground: palette.spanishPink,
        primaryCardText: palette.white,
        secondaryCardText: palette.black,
        primaryButtonColor: palette.mistyRose,
        secondaryButtonColor: palette.sapGreen,
        inactiveButtonColor: palette.grey,
        navigationButtonColor: palette.sonicSilver,
        alert: palette.red,
        warn: palette.yellow,
        success: palette.green,
        accent: palette.navyGreen,
        black: palette.black,
        white: palette.white
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
            color:  'secondaryCardText',
        },
        subheader: {
            fontFamily: 'Fraunces_500Medium',
            fontWeight: '600',
            fontSize: 28,
            lineHeight: 36,
            color: 'secondaryCardText',
        },
        subsubheader: {
            fontFamily: 'Fraunces_500Medium',
            fontWeight: '600',
            fontSize: 18,
            lineHeight: 30,
            color: 'secondaryCardText',
        },
        body: {
            fontFamily: 'Fraunces_300Light',
            fontSize: 16,
            lineHeight: 24,
            color: 'primaryCardText',
        },
        tag: {
            fontFamily: 'Fraunces_700Bold',
            fontSize: 12,
            lineHeight: 16,
            color: 'primaryCardText',
        },
        boldBody: {
            fontFamily: 'Fraunces_700Bold',
            fontSize: 16,
            lineHeight: 24,
            color: 'primaryCardText',
        },
        navigationButton: {
            fontFamily: 'Fraunces_500Medium',
            fontSize: 20,
            lineHeight: 24,
            color: 'navigationButtonColor',
            
        }
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

        secondaryCardBackground: palette.navyGreen,
        secondaryCardText: palette.black,
        accent: palette.sapGreen,
    },
};

export type Theme = typeof theme;
export default theme;