import React from "react";
import {Dialog, Portal,Text,Button} from "react-native-paper";

export default function PinTodoModal({hideDialog,visible,onPin,todoToPin}) {
    const confirmPin = ()=>{
        onPin(todoToPin);
        hideDialog();
    }
    return (
        <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
                <Dialog.Content>
                    <Text variant={"bodyMedium"}>是否要置顶？</Text>
                </Dialog.Content>
                <Dialog.Actions>
                    <Button onPress={hideDialog}>取消</Button>
                    <Button onPress={confirmPin}>确定</Button>
                </Dialog.Actions>
            </Dialog>
        </Portal>
    )
}