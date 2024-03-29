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
    disabled: boolean
}

const Text = createText<Theme>();
const Box = createBox<Theme>();

const TextButton = ({ onPress, icon, size, label, disabled }: Props) => {
    const theme = useTheme<Theme>();

    return (
        <TouchableOpacity hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }} onPress={onPress} disabled={disabled}>
            <Box flexDirection={"row"} alignItems="center" justifyContent="flex-start" borderRadius={5} borderWidth={1} padding="xs">
                <Box marginHorizontal={'m'}>
                <Ionicons name={icon} size={size} color={theme.colors.secondaryCardText} />
                </Box>
                {label ? <Text  variant="boldBody" color={"secondaryCardText"}>{label}</Text> : null}
            </Box>

        </TouchableOpacity>
    )
}

export default TextButton
