import React from "react";
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../../utils/theme';

const Text = createText<Theme>();
const Box = createBox<Theme>();

const CurrentPlan = () => {
    return (
        <Box padding="m" backgroundColor="mainBackground" flex={1}>
        <Box
          backgroundColor="primaryCardBackground"
          margin="s"
          padding="m"
          flexGrow={1}
        >
          <Text variant="header">
            Current Plan
          </Text>
          <Text variant="subheader">
            Here should be the current plan!
          </Text>
        </Box>
      </Box>
    );
  }

export default CurrentPlan; 