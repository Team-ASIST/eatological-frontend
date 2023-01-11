import React from 'react'
import { createBox, createText } from '@shopify/restyle'
import { Theme } from '../../../utils/theme'
import IconButton from './IconButton'

export interface IngredientInputProps {
    remove: () => {}
    title: string
}

const Box = createBox<Theme>()
const Text = createText<Theme>()

const IngredientInput = ({ remove, title }: IngredientInputProps) => {
    return (
        <Box
            marginVertical="s"
            padding="m"
            backgroundColor="accent"
            borderRadius={10}
            flexDirection="row"
            justifyContent="space-between">
            <Box flexDirection="row" flex={1} flexWrap="wrap">
                <Text variant="subsubheader" color={'primaryCardText'}>
                    {title}{' '}
                </Text>
            </Box>
            <IconButton onPress={remove} icon={'trash-outline'} size={28}></IconButton>
        </Box>
    )
}

export default IngredientInput
