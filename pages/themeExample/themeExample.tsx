import { Switch, View } from 'react-native'
import React from 'react'
import { createBox, createText, useTheme } from '@shopify/restyle';
import { Theme } from '../../utils/theme';

type Props = {
}

const Text = createText<Theme>();
const Box = createBox<Theme>();

const themeExample = (props: Props) => {
  return (
    <Box padding="m" backgroundColor="mainBackground" flex={1}>
      <Box
        backgroundColor="primaryCardBackground"
        margin="s"
        padding="m"
        flexGrow={1}
      >
        <Text variant="header">
          Header
        </Text>
        <Text variant="subheader">
          Subheader
        </Text>
        <Text variant="body">
          Primary Card
        </Text>
      </Box>
      <Box
        backgroundColor="secondaryCardBackground"
        margin="s"
        padding="m"
        flexGrow={1}
      >
        <Text variant="body" color="secondaryCardText">
          Secondary Card
        </Text>
      </Box>
    </Box>
  )
}

export default themeExample