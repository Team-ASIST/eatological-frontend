import { createBox, createText } from '@shopify/restyle'
import { Theme } from '../../utils/theme'
import { NavigationScreenProp } from 'react-navigation'
import { useDispatch } from 'react-redux'
import { resetPlanConfiguration } from '../../redux/slice/newPlanSlice'
import NewPlanNavigationBar from './NavigationNewPlanBar'
import { AppDispatch } from '../../redux/store'

const Text = createText<Theme>()
const Box = createBox<Theme>()

type Props = {
    navigation: NavigationScreenProp<any, any>
}

const FoodPreferencesScreen = ({ navigation }: Props) => {
    const dispatch = useDispatch<AppDispatch>()

    return (
        <Box padding="l" backgroundColor="mainBackground" flex={1}>
            <NewPlanNavigationBar
            onClickBack={
                () => navigation.navigate('LeftOvers')}
                onClickNext={
                    () => navigation.navigate('SwapMeals')}
                onClickAbort={
                    () => {
                        dispatch(resetPlanConfiguration())
                        navigation.navigate('CurrentPlan')
                    }
                }>
                <Box marginVertical="l" marginHorizontal="xs" padding="m" height={"75%"}>
                    <Text variant="subheader">Is there anything in particular you want to eat this week??</Text>
                </Box>
            </NewPlanNavigationBar>
        </Box>
    )
}

export default FoodPreferencesScreen
