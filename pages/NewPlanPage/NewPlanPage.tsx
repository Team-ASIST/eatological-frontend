import React from "react";
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../../utils/theme';
import { Button } from "react-native";
import { NavigationScreenProp } from "react-navigation";

const Text = createText<Theme>();
const Box = createBox<Theme>();

export type NewPlanPageProps = {
    navigation: NavigationScreenProp<any,any>
};

const NewPlanPage = ({ navigation }: NewPlanPageProps) => {
    return (
        <Box padding="m" backgroundColor="mainBackground" flex={1}>
        <Box
          backgroundColor="primaryCardBackground"
          margin="s"
          padding="m"
          flexGrow={1}
        >
          <Text variant="header">
            New Plan Process is started!
          </Text>
          <Text variant="subheader">
            Here should be the create a new plan!
          </Text>
          <Button
        title="Home"
        onPress={() => navigation.navigate('CurrentPlan')}
      />
        </Box>
      </Box>
    );
  }

export default NewPlanPage; 