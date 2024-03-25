import React, { useState } from "react";
import { Modal, Portal, Text, Button, TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import { ThemeContext } from "../stores/themeContext";
import { Platform, Vibration, Alert } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function SetReminder({ hideModal, visible, setReminder }) {
  const themeContext = React.useContext(ThemeContext);
  const [reminderTime, setReminderTime] = useState(null);
  const [isDatePickerVisible, setDatePickerVisible] = useState(false);

  const handleSetReminder = () => {
    if (reminderTime) {
      setReminderTime(reminderTime);
      scheduleNotification();
      hideModal();
      Alert.alert('提醒设置成功', '您的提醒已成功设置！');
    } else {
      Alert.alert('提醒设置失败', '请先选择提醒时间。');
    }
  };

  const scheduleNotification = () => {
    if (reminderTime) {
      const now = new Date();
      const scheduledTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), reminderTime.getHours(), reminderTime.getMinutes(), 0, 0);

        if (scheduledTime) {
          const AlarmManager = require('react-native').NativeModules.AlarmManagerAndroid;
          AlarmManager.setAlarm(scheduledTime.getTime());
        } else {
          console.log("提醒时间不能为空");
          // 进行错误处理或设置默认值
        }

      Vibration.vibrate([1000, 500, 1000]);
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
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}
        theme={themeContext.paperTheme}
      >
        <Text>设置提醒时间</Text>
        <TextInput
          label="提醒时间"
          value={reminderTime ? reminderTime.toLocaleString() : ''}
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
};
