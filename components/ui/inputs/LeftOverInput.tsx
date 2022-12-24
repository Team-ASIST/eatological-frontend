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

const LeftOverInput = ({ increment, decrement,remove, value, title, unit }: LeftOverInputProps) => {
    return (
        <Box >
         
        <Box
            marginVertical="s"
            padding="m"
            backgroundColor="primaryCardBackground"
            opacity={0.78}
            borderRadius={10}
            flexDirection="row"
            justifyContent="space-between"
            >
           <Box flexDirection="row" flex= {1} flexWrap= "wrap" >
                
            <Text variant="subsubheader" color={'primaryCardText'} >
                {title}{' '}
            </Text>

            </Box>
            <Box flexDirection="row">
                <IconButton
                    onPress={decrement}
                    icon={'ios-remove-circle-outline'}
                    size={28}></IconButton>
                <Box flexDirection="row" alignContent="center" marginHorizontal="m">
                    <Text variant="subsubheader" color={'primaryCardText'} marginLeft="xs">
                        {value}{' '}{unit}
                    </Text>
                </Box>
                <IconButton
                    onPress={increment}
                    icon={'ios-add-circle-outline'}
                    size={28}></IconButton>
                
            </Box>
            
        </Box>
        <IconButton
                    onPress={remove}
                    icon={'trash-outline'}
                    size={25}></IconButton>
        </Box>
    )
}

export default LeftOverInput
