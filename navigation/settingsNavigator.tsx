import { createBox } from '@shopify/restyle';
import theme, { Theme } from '../utils/theme';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SettingsStackParamList } from './types';
import { SafeAreaView } from 'react-native';
import RestrictionsPage from '../pages/SettingsPage/RestrictionsPage';
import UserPage from '../pages/SettingsPage/UserPage';


const NewPlan = createNativeStackNavigator<SettingsStackParamList>();
const Box = createBox<Theme>();

export const SettingsScreen = () => {
    return (
      <Box backgroundColor="mainBackground" flex={1}>
        <SafeAreaView style={{ flex: 1 }}>
          <NewPlan.Navigator>
            <NewPlan.Screen name="User" options={{ headerShown: false }} component={UserPage} />
            <NewPlan.Screen name="Restrictions" options={{ headerShown: false }} component={RestrictionsPage} />
          </ NewPlan.Navigator>
        </SafeAreaView>
      </Box>
    );
  }