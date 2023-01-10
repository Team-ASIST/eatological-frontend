import { createBox, createText, useTheme } from '@shopify/restyle'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Theme } from '../../../utils/theme'

type Props = {
    onPress?: () => void
    icon: string
    size: number
    label?: string
    color?: string
}

const Text = createText<Theme>();
const Box = createBox<Theme>();

const TextButton = ({ onPress, icon, size, color, label }: Props) => {
    const theme = useTheme<Theme>();

    return (
        <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} onPress={onPress}>
            <Box flexDirection={"row"} alignItems="center" justifyContent="center" borderRadius={5} borderWidth={1} padding="xs">
                <Ionicons name={icon} size={size} color={color ? color : theme.colors.primaryCardText} />
                {label ? <Text variant="boldBody">{label}</Text> : null}
            </Box>

        </TouchableOpacity>
    )
}

export default TextButton
