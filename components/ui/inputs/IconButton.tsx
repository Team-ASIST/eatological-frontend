import { createText, createBox, color, useTheme } from '@shopify/restyle'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Theme } from '../../../utils/theme'

const Text = createText<Theme>()
const Box = createBox<Theme>()

type Props = {
    onPress: () => void
    icon: string
    size: number
}

const IconButton = ({ onPress, icon, size }: Props) => {
    const theme = useTheme<Theme>();

    return (
        <TouchableOpacity onPress={onPress}>
            <Ionicons name={icon} size={size}  color={theme.colors.primaryCardText} />
        </TouchableOpacity>
    )
}

export default IconButton
