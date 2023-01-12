import { createText, createBox } from "@shopify/restyle";
import { Dimensions, Image } from "react-native";
import { Theme } from "../../../utils/theme";

const Text = createText<Theme>()
const Box = createBox<Theme>()

type animationProps = {
    setupPhase: boolean
  }

const SplashAnimation = (props: animationProps) => {
    const windowWidth = Dimensions.get('window').width;
    if (props.setupPhase) {
      return (
        <Box alignItems={"center"} flexGrow={1} flexDirection={"column"} justifyContent={"center"}>
          <Image
            style={{ width: windowWidth, height: 9 / 16 * windowWidth }}
            source={require('../../../assets/animation.gif')} />
        </Box>
      )
    } else {
      return <Box />
    }
  }

export default SplashAnimation