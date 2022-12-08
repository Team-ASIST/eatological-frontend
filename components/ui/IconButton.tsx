import { createText, createBox, color } from '@shopify/restyle'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Theme } from '../../utils/theme'

const Text = createText<Theme>()
const Box = createBox<Theme>()

type Props = {
    onPress: () => void
    icon: string
    size: number
    color: string
}

const IconButton = ({ onPress, icon, size, color }: Props) => {
    return (
        <TouchableOpacity onPress={onPress}>
            <Ionicons name={icon} size={size} color={color} />
        </TouchableOpacity>
    )
}

export default IconButton
