import React from 'react'
import { createBox, createText } from '@shopify/restyle'
import theme, { Theme } from '../../../utils/theme'
import { TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import IconButton from './IconButton'

export interface AddItemButtonProps {
    onPress: () => {}
}

const Box = createBox<Theme>()
const Text = createText<Theme>()

const AddItemButton = ({ onPress }: AddItemButtonProps) => {
    return (
            <Box marginVertical="s" alignItems={'center'}>
                <TouchableOpacity
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                    onPress={onPress}>
                    <Box flexDirection={'row'}>
                        <Ionicons
                            name={'add-outline'}
                            size={28}
                            color={theme.colors.accent}
                        />
                        <Text variant={'subsubheader'} color={'accent'}>
                            Add Meal
                        </Text>
                    </Box>
                </TouchableOpacity>
            </Box>
    )
}

export default AddItemButton
