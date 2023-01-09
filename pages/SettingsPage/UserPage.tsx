import React, { useState } from "react";
import { createBox, createText } from '@shopify/restyle';
import theme, { Theme } from '../../utils/theme';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { selectUsername, selectToken, addUser, renameUser, deleteUser } from "../../redux/slice/userSlice";
import { useSelector } from "react-redux";
import IconButton from "../../components/ui/inputs/IconButton";
import TextButton from "../../components/ui/inputs/TextButton";
import { NavigationScreenProp } from "react-navigation";
import { UsernameInput } from "../../components/ui/inputs/UsernameInput";
import Ionicons from 'react-native-vector-icons/Ionicons'

const Text = createText<Theme>();
const Box = createBox<Theme>();

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
    if (username != "dev" && token.startsWith('T')) {
      dispatch(deleteUser(username))
    }
    */
  }

  return (
    <Box padding="m" backgroundColor="mainBackground" flex={1}>
      <Box marginTop={"l"} flexDirection="row">
        <Box flexDirection={"row"} alignItems={"center"}>
          <Ionicons name="person-circle-outline" size={30} color={theme.colors.black} />
          <Text variant="subsubheader">{username}</Text>
        </Box>
        <Box flexDirection={"row"} flexGrow={1} justifyContent="flex-end" alignItems={"center"}>
          <Text variant="subsubheader">{token}</Text>
        </Box>
      </Box>

      <Box marginTop={"l"}>
        <UsernameInput
          clicked={clicked}
          setClicked={setClicked}
          username={username}
          currentUsername={currentUsername}
          setCurrentUsername={setCurrentUsername}
          changeUser={changeUser}
        />
      </Box>

      <Box marginTop={"l"}>
        <TextButton
          onPress={deleteUsername}
          icon={"close-circle-outline"}
          size={35}
          label={"Delete Active Account"}
          color={theme.colors.black}
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