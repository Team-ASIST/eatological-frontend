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
            <View>
                <Text variant="navigationButton">{text}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default NavigationButton
