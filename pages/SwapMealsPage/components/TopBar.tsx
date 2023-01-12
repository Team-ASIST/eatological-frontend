import { createText, createBox } from "@shopify/restyle"
import Ionicons from "react-native-vector-icons/Ionicons"
import { ScoreBar } from "../../../components/ui/common/scoreBar"
import { Theme } from "../../../utils/theme"

const Text = createText<Theme>()
const Box = createBox<Theme>()

 type TopBarProps = {
    score: number
  }
  
  const TopBar = ({ score }: TopBarProps) => {
    return (
      <Box marginTop="l" marginHorizontal="xs" padding="m">
        <Text variant="subheader">Wähle deine Rezepte...</Text>
        <ScoreBar
          score={score}
          maxScore={1}
        />
        <Box flexDirection={"row"} flexGrow={1}>
          <Box flex={1} justifyContent={"flex-start"} alignItems={"center"} flexDirection={"row"}>
            <Ionicons name="arrow-back-circle-outline" size={20} color="black" />
            <Text paddingLeft={"xs"} variant={"body"} color={"secondaryCardText"}>
              Prev
            </Text>
          </Box>
          <Box>
            <Text variant={"body"} color={"secondaryCardText"}>
              Nachhaltigkeit
            </Text>
          </Box>
          <Box flex={1} justifyContent={"flex-end"} alignItems={"center"} flexDirection={"row"}>
            <Text paddingRight={"xs"} variant={"body"} color={"secondaryCardText"}>
              Next
            </Text>
            <Ionicons name="arrow-forward-circle-outline" size={20} color="black" />
          </Box>
        </Box>
      </Box>
    )
  }

export default TopBar