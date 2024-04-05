import React from "react";
import { Modal, Portal, Text, Button, TextInput } from "react-native-paper";
import { StyleSheet } from "react-native";
import { ThemeContext } from "../stores/themeContext";

export default function InputTodo({ showModal, hideModal, visible, addTodo }) {
    const themeContext = React.useContext(ThemeContext);
    const [todo, setTodo] = React.useState("");

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

  // 记录用户执行添加动作时的时间戳
    const recordActionTime = () => {
    const actionTime = Date.now();
    return actionTime;
    };

  // 处理用户点击添加按钮的事件
    const handleAdd = () => {
    // 添加待办事项
    addTodo(todo);
    
    // 记录用户执行添加动作的时间戳
    const timeOfAction = recordActionTime();
    
    // 输出记录的时间戳
    console.log("用户执行添加动作的时间:", new Date(timeOfAction).toLocaleString());
    
    // 重置输入框并隐藏模态框
    setTodo("");
    hideModal();
    };

return (
    <Portal>
        <Modal
        visible={visible}
        onDismiss={hideModal}
        onRquestClose={hideModal}
        contentContainerStyle={styles.containerStyle}
        theme={themeContext.paperTheme}
        animationType="fade"
    >
        <Text>输入你要添加的todo</Text>
        <TextInput label="todo" value={todo} onChangeText={setTodo} multiline={true} />
        <Button
            icon="plus"
            mode="contained"
            style={styles.buttonStyle}
            onPress={handleAdd} // 当用户点击按钮时触发 handleAdd 函数
        >
        添加
        </Button>
    </Modal>
    </Portal>
    );
}