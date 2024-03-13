import React from "react";
import { Portal, Text, Button, Dialog } from "react-native-paper";
import { StyleSheet, View } from "react-native";
export default function DeleteTodo({ showDialog, hideDialog, visible }) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>警告</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">确认要删除吗？</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>取消</Button>
          <Button onPress={hideDialog}>确定</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
const styles = StyleSheet.create({
  containerStyle: {
    backgroundColor: "white",
    padding: 20,
    margin: 20, //添加外边距使其离屏幕边缘有一定距离
    borderRadius: 20, //添加圆角
  },
});
