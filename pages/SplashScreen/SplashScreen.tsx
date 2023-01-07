import { createBox } from '@shopify/restyle'
import React from 'react'
import { Dimensions, Image } from 'react-native'
import { Theme } from '../../utils/theme'

const Box = createBox<Theme>()

const SplashScreen = () => {
    const windowWidth = Dimensions.get('window').width;

    return (
        <Box flex={1}>
            <Box alignItems={"center"} flexGrow={1} flexDirection={"column"} justifyContent={"center"}>
                <Image
                    style={{ width: windowWidth, height: 9 / 16 * windowWidth }}
                    source={require('../../assets/animation.gif')} />
            </Box>
        </Box>
    )
}

export default SplashScreen