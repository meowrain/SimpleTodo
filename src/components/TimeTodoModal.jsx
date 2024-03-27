import React, { useState } from "react";
import { Modal, Portal, Text, Button, TextInput } from "react-native-paper";
import { StyleSheet, Platform, Alert } from "react-native";
import { ThemeContext } from "../stores/themeContext";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as Calendar from "expo-calendar";

export default function SetReminder({ hideDialog, visible }) {
  const themeContext = React.useContext(ThemeContext);
  const [reminderTime, setReminderTime] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleSetReminder = async () => {
    if (reminderTime) {
      try {
        await scheduleNotification();
        hideDialog();
        Alert.alert("提醒设置成功", "您的提醒已成功设置！");
      } catch (error) {
        console.error(error);
        Alert.alert("提醒设置失败", "无法创建提醒事件");
      }
    } else {
      Alert.alert("提醒设置失败", "请先选择提醒时间。");
    }
  };
  async function getDefaultCalendarSource() {
    const defaultCalendar = await Calendar.getDefaultCalendarAsync();
    return defaultCalendar.source;
  }
  const scheduleNotification = async () => {
    if (!reminderTime) {
      Alert.alert("提醒设置失败", "提醒时间不能为空");
      return;
    }

    const { status } = await Calendar.requestCalendarPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("提醒设置失败", "需要日历权限才能设置提醒");
      return;
    }
  };

  const showDateTimePicker = () => {
    setDatePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setDatePickerVisible(false);
  };

  const handleDateConfirm = (date) => {
    setReminderTime(date);
    hideDateTimePicker();
  };

  const handleClearReminder = () => {
    setReminderTime(null);
  };

  const styles = StyleSheet.create({
    containerStyle: {
      backgroundColor: themeContext.paperTheme.colors.background,
      padding: 20,
      margin: 20,
      borderRadius: 20,
    },
    buttonStyle: {
      marginTop: 15,
    },
  });

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideDialog}
        contentContainerStyle={styles.containerStyle}
        theme={themeContext.paperTheme}
      >
        <Text>设置提醒时间</Text>
        <TextInput
          label="提醒时间"
          value={reminderTime ? reminderTime.toLocaleString() : ""}
          onTouchStart={showDateTimePicker}
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="datetime"
          onConfirm={handleDateConfirm}
          onCancel={hideDateTimePicker}
        />
        <Button
          icon="alarm"
          mode="contained"
          style={styles.buttonStyle}
          onPress={handleSetReminder}
        >
          设置提醒
        </Button>
        <Button
          icon="close"
          mode="outlined"
          style={styles.buttonStyle}
          onPress={handleClearReminder}
        >
          清除提醒
        </Button>
      </Modal>
    </Portal>
  );
}
