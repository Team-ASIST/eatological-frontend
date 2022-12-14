import React from 'react'
import { createBox, createText } from '@shopify/restyle'
import { Theme } from '../../../utils/theme'
import IconButton from './IconButton'

export interface AddItemButtonProps {
    onPress: () => {},
    title: string
}

const Box = createBox<Theme>()
const Text = createText<Theme>()

const AddItemButton = ({onPress, title}: AddItemButtonProps) => {
    return (
        <Box
            marginVertical="s"
            padding="m"
            backgroundColor="primaryCardBackground"
            borderRadius={50}
            flexDirection="row"
            justifyContent="space-between">
            <Text variant="body">{title}</Text>
            <IconButton
                onPress={onPress}
                icon={'ios-add-circle-outline'}
                size={25}></IconButton>
        </Box>
    )
}

export default AddItemButton