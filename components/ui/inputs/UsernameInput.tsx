import React from "react";
import { createBox, createText } from '@shopify/restyle';
import theme, { Theme } from '../../../utils/theme';
import { TextInput, Keyboard } from "react-native";
import IconButton from "./IconButton";

const Text = createText<Theme>();
const Box = createBox<Theme>();

export type UsernameInputProps = {
  clicked: boolean,
  setClicked: (arg0: boolean) => void,
  username: string,
  currentUsername: string,
  setCurrentUsername: (arg0: string) => void,
  changeUser: (arg0: string) => void
}

export const UsernameInput = ({ clicked, setClicked, username, currentUsername, setCurrentUsername, changeUser }: UsernameInputProps) => {
  return (
    <Box
      flexDirection="row"
      padding="m"
      marginBottom="s"
      backgroundColor="mainBackground"
      borderRadius={50}
      borderWidth={2}
      borderColor="accent"
      justifyContent="space-between">
      {/* Input field */}
      <TextInput
        style={{ width: 235 }}
        placeholder={"Enter new Username..."}
        value={currentUsername}
        onChangeText={setCurrentUsername}
        onFocus={() => {
          setClicked(true)
        }}
      />
      {/* close button, depending on whether the Input is clicked or not */}
      {clicked && (
        <IconButton
          onPress={() => {
            Keyboard.dismiss()
            setClicked(false)
            changeUser(currentUsername)
            setCurrentUsername('')
          }}
          icon={'checkmark-circle-outline'}
          size={35}
          color={theme.colors.accent} />
      )}
    </Box>
  )
}