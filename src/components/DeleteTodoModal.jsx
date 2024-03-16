import React from "react";
import { Portal, Text, Button, Dialog } from "react-native-paper";
export default function DeleteTodo({ hideDialog, visible,onDelete }) {
  const confirmDelete = ()=>{onDelete();hideDialog()}
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog} >
        <Dialog.Title>警告</Dialog.Title>
        <Dialog.Content>
          <Text variant="bodyMedium">确认要删除吗？</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog}>取消</Button>
          <Button onPress={confirmDelete}>确定</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
