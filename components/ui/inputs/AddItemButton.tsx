import React from 'react'
import { createBox, createText, useTheme } from '@shopify/restyle'
import { Theme } from '../../../utils/theme'
import { TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import IconButton from './IconButton'

export interface AddItemButtonProps {
    onPress: () => {}
}

const Box = createBox<Theme>()
const Text = createText<Theme>()

const AddItemButton = ({ onPress }: AddItemButtonProps) => {
    const theme = useTheme<Theme>()

    return (
            <Box marginVertical="s" alignItems={'center'}>
                <TouchableOpacity
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    onPress={onPress}>
                    <Box flexDirection={'row'}>
                        <Ionicons
                            name={'add-outline'}
                            size={28}
                            color={theme.colors.primaryCardBackground}
                        />
                        <Text variant={'subsubheader'} color={'primaryCardBackground'}>
                            Gericht hinzufügen
                        </Text>
                    </Box>
                </TouchableOpacity>
            </Box>
    )
}

export default AddItemButton
