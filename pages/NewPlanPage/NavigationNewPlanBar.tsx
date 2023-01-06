import { createBox, useTheme } from "@shopify/restyle";
import React, { ReactElement, ReactNode } from "react";
import StepIndicator from 'react-native-step-indicator';
import { Theme } from "../../utils/theme";
import { useRoute } from '@react-navigation/native'
import IconButton from "../../components/ui/inputs/IconButton";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Alert, View } from 'react-native';


const Box = createBox<Theme>()

const WorkflowLength = 3

const ScreenToPosition: { [id: string]: number; } = {
  MealQuantity: 0,
  LeftOvers: 1,
  FoodPreferences: 1,
  SwapMeals: 2
}

interface NavigationNewPlanBarProps {
  children: typeof React.Children | ReactNode | ReactElement;
  onClickBack?: () => void;
  onClickNext?: () => void;
  onClickAbort?: () => void;
}

const NavigationNewPlanBar = (props: NavigationNewPlanBarProps): ReactElement => {
  const theme = useTheme<Theme>();
  const route = useRoute();

  const customStyles = {
    stepStrokeCurrentColor: theme.colors.accent,
    stepStrokeUnFinishedColor: '#aaaaaa',
    stepStrokeFinishedColor: theme.colors.accent,
    separatorUnFinishedColor: '#aaaaaa',
    separatorFinishedColor: theme.colors.accent,
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#ffffff',
    stepIndicatorFinishedColor: theme.colors.accent,
    stepIndicatorLabelCurrentColor: theme.colors.accent,
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#aaaaaa',
    labelColor: '#999999',
    currentStepLabelColor: theme.colors.accent
  }

  const getStepIndicatorIconConfig = ({
    position,
    stepStatus,
  }: {
    position: number;
    stepStatus: string;
  }) => {
    const iconConfig = {
      name: 'feed',
      color: stepStatus === 'finished' ? '#ffffff' : theme.colors.accent,
      size: 15,
    };
    switch (position) {
      case 0: {
        iconConfig.name = 'person-circle-outline';
        break;
      }
      case 1: {
        iconConfig.name = 'cart-outline';
        break;
      }
      case 2: {
        iconConfig.name = 'albums-outline';
        break;
      }
      default: {
        break;
      }
    }
    return iconConfig;
  };

  const renderStepIndicator = (params: any) => (
    <Ionicons {...getStepIndicatorIconConfig(params)} />
  );

  return (<>
    <Box marginLeft="l" marginRight="l">
      <StepIndicator
        customStyles={customStyles}
        stepCount={WorkflowLength}
        currentPosition={ScreenToPosition[route.name]}
        renderStepIndicator={renderStepIndicator}
      />
    </Box>
    <>{props.children}</>
    <Box flexDirection={"row"} justifyContent="space-between">
      {
        props.onClickBack ? <IconButton
            onPress={props.onClickBack}
            icon={'chevron-back-circle-outline'}
            size={60}
            color={theme.colors.inactiveButtonColor} /> : 
            <View style={{ width: 60 }} />
      }
      <IconButton
        onPress={
          () => {
            Alert.alert(
              "Abort Meal Generation",
              "Are you sure to abort the process?",
              [
                {
                  text: "Yes",
                  onPress: props.onClickAbort,
                  style: "cancel"
                },
                { text: "No", onPress: () => { } }
              ]
            );
          }
        }
        icon={'close-circle-outline'}
        size={50}
        color={theme.colors.alert} />
      {
        props.onClickNext ?
          <IconButton
            onPress={props.onClickNext}
            icon={ScreenToPosition[route.name] == WorkflowLength - 1 ? 'checkmark-circle-outline' : 'chevron-forward-circle-outline'}
            size={60}
            color={ScreenToPosition[route.name] == WorkflowLength - 1 ? theme.colors.success : theme.colors.inactiveButtonColor} /> : 
            <View style={{ width: 60 }} />
      }
    </Box>
  </>)
};

export default NavigationNewPlanBar;