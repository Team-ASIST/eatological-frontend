import { createBox, createText } from '@shopify/restyle'
import { Theme } from '../../utils/theme'
import { Button, View } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import NavigationButton from '../../components/ui/NavigationButton'

const Text = createText<Theme>()
const Box = createBox<Theme>()

type Props = {
    navigation: NavigationScreenProp<any, any>
}

const MealQuantityScreen = ({ navigation }: Props) => {
    return (
        <Box padding="m" backgroundColor="mainBackground" flex={1}>
            <Box backgroundColor="primaryCardBackground" margin="s" padding="m" flexGrow={1}>
                <Text variant="header">How many meals do you want?</Text>
                <Text variant="subheader">Here should be the create a new plan!</Text>
                <Button title="Home" onPress={() => navigation.navigate('CurrentPlan')} />
                <NavigationButton
                    onPress={function (): void {
                        navigation.navigate('Leftovers')
                    }}
                    text="Next"
                />
            </Box>
        </Box>
    )
}

export default MealQuantityScreen
