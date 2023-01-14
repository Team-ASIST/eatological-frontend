import React from 'react'
import { BackgroundColorProps, createBox, createText } from '@shopify/restyle'
import { Theme } from '../../../utils/theme'

const Box = createBox<Theme>()
const Text = createText<Theme>()

interface TagItemProps {
  text: string
}

const TagItem = (props: TagItemProps & BackgroundColorProps<Theme>) => {
  return (
    <Box borderRadius={13} backgroundColor={props.backgroundColor} padding={"xs"} marginRight="xs">
      <Text variant="tag">{props.text}</Text>
    </Box>
  )
}

export default TagItem