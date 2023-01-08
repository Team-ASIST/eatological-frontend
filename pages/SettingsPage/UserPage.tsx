import React, { useState } from "react";
import { createBox, createText } from '@shopify/restyle';
import theme, { Theme } from '../../utils/theme';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { selectUsername, selectToken, addUser, renameUser, deleteUser } from "../../redux/slice/userSlice";
import { useSelector } from "react-redux";
import { TextInput, Keyboard } from "react-native";
import IconButton from "../../components/ui/inputs/IconButton";
import TextButton from "../../components/ui/inputs/TextButton";
import { NavigationScreenProp } from "react-navigation";

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

const UsernameInput = ({ clicked, setClicked, username, currentUsername, setCurrentUsername, changeUser }: UsernameInputProps) => {
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
        placeholder={username}
        value={currentUsername}
        onChangeText={setCurrentUsername}
        onFocus={() => {
          setClicked(true)
        }}
      />
      {/* close button, depending on whether the search bar is clicked or not */}
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

export type UserPageProps = {
  navigation: NavigationScreenProp<any, any>
};

const UserPage = ({ navigation }: UserPageProps) => {
  const username = useSelector(selectUsername)
  const token = useSelector(selectToken)
  const [currentUsername, setCurrentUsername] = useState("")
  const [clicked, setClicked] = useState(false)

  const dispatch = useDispatch<AppDispatch>()

  const changeUser = (newUsername: string) => {
    if (username === "") {
      dispatch(addUser(newUsername))
    } else {
      dispatch(renameUser(newUsername))
    }
  }

  const deleteUsername = () => {
    /*
    if (username != "") {
      dispatch(deleteUser(username))
    }
    */
  }

  return (
    <Box padding="m" backgroundColor="mainBackground" flex={1}>
        <Box marginTop="l" marginHorizontal="xs" padding="m">
          <Text variant="subheader"> User Setting </Text>
          <Text variant="subsubheader">User: {username}</Text>
          <Text variant="subsubheader">Token: {token}</Text>
        </Box>

        <Box marginTop={"m"}>
          <UsernameInput
            clicked={clicked}
            setClicked={setClicked}
            username={username}
            currentUsername={currentUsername}
            setCurrentUsername={setCurrentUsername}
            changeUser={changeUser}
          />
        </Box>

        <Box marginTop={"m"}>
          <TextButton
            onPress={deleteUsername}
            icon={"close-circle-outline"}
            size={35}
            label={"Delete Account"}
            color={theme.colors.alert}
          />
        </Box>
        <Box flexGrow={1} />

        <Box alignItems={"center"}>
          <IconButton
            onPress={() => navigation.navigate("Restrictions")}
            icon={'chevron-forward-circle-outline'}
            size={60}
            color={theme.colors.inactiveButtonColor} />
        </Box>

      </Box>
  );
}

export default UserPage; 