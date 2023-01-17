import { Modal } from "react-native";
import { createBox, useTheme } from "@shopify/restyle";
import { Theme } from '../../../utils/theme';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Box = createBox<Theme>();

type FeedbackModalProps = {
    modalVisible: boolean,
    success: boolean
}

export const FeedbackModal = ({ modalVisible, success }: FeedbackModalProps) => {
    const theme = useTheme<Theme>()

    return (
        <Modal visible={modalVisible} animationType="fade" transparent={true}>
            <Box flex={1} justifyContent={"flex-start"} alignItems={"flex-end"} padding={"m"}>
                <Box marginTop={"l"} paddingRight={"s"}>
                    <Ionicons
                        name={success ? "checkmark-circle-outline" : "close-circle-outline"}
                        size={35}
                        color={success ? theme.colors.success : theme.colors.alert}
                    />
                </Box>
            </Box>
        </Modal>
    )
}
