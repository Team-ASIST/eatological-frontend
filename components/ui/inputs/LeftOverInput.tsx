import React from 'react'
import { createBox, createText } from '@shopify/restyle'
import { Theme } from '../../../utils/theme'
import IconButton from './IconButton'

export interface LeftOverInputProps {
    increment: () => {}
    decrement: () => {}
    remove: () => {}
    value: number
    title: string
    unit: string
}

const Box = createBox<Theme>()
const Text = createText<Theme>()

{/* Field that displays chosen leftover with amount and possibility to increase/decrease it */}
const LeftOverInput = ({
    increment,
    decrement,
    remove,
    value,
    title,
    unit,
}: LeftOverInputProps) => {
    return (
        <Box
            marginVertical="s"
            padding="m"
            backgroundColor="primaryCardBackground"
            borderRadius={10}
            flexDirection="row"
            justifyContent="space-between">
            {/* Name of the ingredient */}
            <Box flexDirection="row" flex={1} flexWrap="wrap">
                <Text variant="subsubheader" color={'primaryCardText'}>
                    {title}{' '}
                </Text>
            </Box>
            <Box flexDirection="row">
                {/* Decrement Button */}
                <IconButton
                    onPress={decrement}
                    icon={'ios-remove-circle-outline'}
                    size={28}></IconButton>
                {/* Amount and unit of ingredient */}
                <Box flexDirection="row" alignContent="center" marginHorizontal="s">
                    <Text variant="subsubheader" color={'primaryCardText'} marginLeft="xs">
                        {value.toFixed(2).replace(/\.?0*$/, '')} {unit}
                    </Text>
                </Box>
                {/* Increment Button */}
                <IconButton
                    onPress={increment}
                    icon={'ios-add-circle-outline'}
                    size={28}></IconButton>
            </Box>
        </Box>
    )
}

export default LeftOverInput
