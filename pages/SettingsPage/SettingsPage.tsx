import React, { useState, useEffect } from "react";
import { createBox, createText, useTheme } from '@shopify/restyle';
import { Theme } from '../../utils/theme';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { selectUsername, selectToken, getToken, renameUser, deleteUser, selectUpdatingUser, selectRestriction, changeRestriction } from "../../redux/slice/userSlice";
import { useSelector } from "react-redux";
import TextButton from "../../components/ui/inputs/TextButton";
import { NavigationScreenProp } from "react-navigation";
import { UsernameInput } from "../../components/ui/inputs/UsernameInput";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Restriction } from "../../utils/dataTypes";
import { getRestrictions, setRestrictions } from "../../utils/axios/userManagementCalls";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { RestrictionModal } from "../../components/ui/inputs/RestrictionModal";
import { getPlan } from "../../redux/slice/currentPlanSlice";
import { FeedbackModal } from "../../components/ui/common/FeedbackModal";
import { store } from "../../redux/store";

const Text = createText<Theme>();
const Box = createBox<Theme>();

const wait = (timeout: number) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export type SettingsPageProps = {
  navigation: NavigationScreenProp<any, any>
};

const SettingsPage = ({ navigation }: SettingsPageProps) => {
  // User Management
  const username = useSelector(selectUsername)
  const token = useSelector(selectToken)
  const theme = useTheme<Theme>()
  const [currentUsername, setCurrentUsername] = useState("")
  const [clicked, setClicked] = useState(false)
  const [switchMode, setSwitchMode] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  // UpdateState
  const updating = useSelector(selectUpdatingUser)
  const [resultVisible, setResultVisible] = useState(false)
  const [success, setSuccess] = useState(false)

  // Restriction Management
  const [currentRestrictions, setCurrentRestrictions] = useState([] as Restriction[])
  const [restrictionsVisible, setRestrictionsVisible] = useState(false)
  const restriction = useSelector(selectRestriction)

  const dispatch = useDispatch<AppDispatch>()

  const displaySuccess = async (oldName: string) => {
    if (store.getState().user.name != oldName) {
      setSuccess(true)
      setResultVisible(true)
      await wait(500)
      setResultVisible(false)
    } else {
      setSuccess(false)
      setResultVisible(true)
      await wait(500)
      setResultVisible(false)
    }
  }

  const changeUser = (newUsername: string) => {
    const oldName = username
    if (!switchMode) {
      dispatch(renameUser(newUsername)).then(
        async () => displaySuccess(oldName)
      )
    } else {
      dispatch(getToken(newUsername)).then(
        () => {
          displaySuccess(oldName)
          dispatch(getPlan())
          dispatch(changeRestriction(""))
          for (const rest of currentRestrictions) {
            rest.active = false
          }
        }
      )
    }
  }

  const deleteUsername = () => {
    const oldName = username
    if (username != "" && token.startsWith('T')) {
      dispatch(deleteUser()).then(
        async () => {
          displaySuccess(oldName)
          dispatch(changeRestriction(""))
          for (const rest of currentRestrictions) {
            rest.active = false
          }
        }
      )
    }
  }

  // Fetch available restrictions
  useEffect(() => {
    getRestrictions().then(
      (availableRestrictions: Restriction[]) => {
        if (availableRestrictions.find(Restriction => Restriction.name === restriction)) {
          availableRestrictions.find(Restriction => Restriction.name === restriction)!.active = true
        }
        setCurrentRestrictions(availableRestrictions)
      }
    )
  }, [])

  const setNewRestriction = async (restriction: string) => {
    const success: boolean = await setRestrictions(restriction)
    if (success) {
      const current = currentRestrictions.map((x) => x)
      for (const restr of current) {
        if (restr.active) {
          restr.active = false
        }
        if (!restr.active && restr.name === restriction) {
          restr.active = true
        }
      }
      setCurrentRestrictions(current)
      dispatch(changeRestriction(restriction))
    }
  }

  return (
    <Box padding="m" backgroundColor="mainBackground" flex={1}>
      <ScrollView keyboardShouldPersistTaps={'handled'} refreshControl={
        <RefreshControl
          refreshing={updating}
        />
      }>
        <FeedbackModal success={success} modalVisible={resultVisible} />

        <Box marginTop={"l"} flexDirection={"row"} alignItems={"center"} paddingLeft="s">
          <Ionicons name="person-circle-outline" size={30} color={theme.colors.secondaryCardText} />
          <Box paddingLeft={"xs"}>
            <Text variant="subsubheader">{username}</Text>
          </Box>
        </Box>

        <Box marginTop={"m"}>
          <UsernameInput
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
            clicked={clicked}
            setClicked={setClicked}
            switchMode={switchMode}
            currentUsername={currentUsername}
            setCurrentUsername={setCurrentUsername}
            changeUser={changeUser}
          />
        </Box>
        <Box marginTop={"m"}>
          <RestrictionModal
            visible={restrictionsVisible}
            toggleModal={() => setRestrictionsVisible(!restrictionsVisible)}
            restrictions={currentRestrictions}
            setNewRestriction={setNewRestriction}
          />
        </Box>
        <Box marginTop={"m"}>
          <Box marginTop={"s"} padding={'s'}>
            <TextButton
              onPress={() => {
                setSwitchMode(false)
                setModalVisible(true)
              }
              }
              icon={"person-circle-outline"}
              size={35}
              label={"Nutzernamen ändern"}
              disabled={false}
            />
          </Box>

          <Box padding={'s'}>
            <TextButton
              onPress={() => {
                setSwitchMode(true)
                setModalVisible(true)
              }
              }
              icon={"people-circle-outline"}
              size={35}
              label={"Konto wechseln"}
              disabled={false}
            />
          </Box>

          <Box marginBottom={"m"} padding={'s'}>
            <TextButton
              onPress={
                deleteUsername}
              icon={"close-circle-outline"}
              size={35}
              label={"Aktiven Account löschen"}
              disabled={false}
            />
          </Box>

          <Box padding={'s'}>
            <TextButton
              onPress={() => {
                setRestrictionsVisible(true)
              }
              }
              icon={"ellipsis-vertical-circle-outline"}
              size={35}
              label={"Ernährungsform wählen"}
              disabled={false}
            />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
}

export default SettingsPage; 