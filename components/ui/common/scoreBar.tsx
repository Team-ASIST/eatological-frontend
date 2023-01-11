import { createBox, createText } from '@shopify/restyle';
import theme, { Theme } from '../../../utils/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Text = createText<Theme>()
const Box = createBox<Theme>();

type ScoreBarProps = {
    score: number,
    maxScore: number
}

export const ScoreBar = ({ score, maxScore }: ScoreBarProps) => {
    return (
        <Box
            marginTop={"s"}
            marginBottom={"s"}
            flexDirection="row"
            backgroundColor={"mainBackground"}
            borderColor={"accent"}
            borderWidth={2}
            borderRadius={5}
            justifyContent="flex-start"
        >
            <Box
                height={20}
                flex={score}
                backgroundColor={"accent"}
                alignItems="center"
            >
                <Ionicons name="leaf-outline" size={20} color="white" />
            </Box>
            <Box flex={maxScore - score} />
        </Box>
    )
}