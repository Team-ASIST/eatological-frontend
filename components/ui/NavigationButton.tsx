import { createText, createBox } from '@shopify/restyle'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Theme } from '../../utils/theme'

const Text = createText<Theme>()
const Box = createBox<Theme>()

type Props = {
    onPress: () => void
    text: String
}

const NavigationButton = ({ onPress, text }: Props) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Box
                padding="xs"
                backgroundColor="mainBackground"
                borderRadius={50}
                width={100}
                borderWidth={2}
                borderColor="navigationButtonColor"
                alignItems="center">
                <Text variant="navigationButton">{text}</Text>
            </Box>
        </TouchableOpacity>
    )
}

export default NavigationButton
