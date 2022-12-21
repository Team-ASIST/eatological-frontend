import { useTheme } from '@shopify/restyle'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Theme } from '../../../utils/theme'

type Props = {
    onPress?: () => void
    icon: string
    size: number
    color?: string
}

const IconButton = ({ onPress, icon, size, color }: Props) => {
    const theme = useTheme<Theme>();

    return (
        <TouchableOpacity hitSlop={{top: 10, bottom: 10, left: 10, right: 10}} onPress={onPress}>
            <Ionicons name={icon} size={size}  color={color ? color: theme.colors.primaryCardText} />
        </TouchableOpacity>
    )
}

export default IconButton
