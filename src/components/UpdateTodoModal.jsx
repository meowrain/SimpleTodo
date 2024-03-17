import React, { useState, useEffect } from "react";
import {
  Modal,
  Portal,
  Text,
  Button,
  TextInput,
} from "react-native-paper";
import { StyleSheet } from "react-native";
import {ThemeContext} from "../stores/store";

export default function UpdateTodo({ hideModal, visible, updateTodo, taskToUpdate }) {
    const themeContext = React.useContext(ThemeContext)
    const [todo, setTodo] = useState('');
    const handleUpdate = () => {
      updateTodo(todo);
      hideModal();
    };

    useEffect(() => {
        if (visible && taskToUpdate) {
            setTodo(taskToUpdate); // 当模态框打开时，使用当前需要编辑的任务更新todo状态
        }
    }, [taskToUpdate, visible]);
    const styles = StyleSheet.create({
        containerStyle: {
            backgroundColor: themeContext.paperTheme.colors.background,
            padding: 20,
            margin: 20, //添加外边距使其离屏幕边缘有一定距离
            borderRadius: 20, //添加圆角
        },
        buttonStyle : {
            marginTop: 15
        }
    });
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}
        theme={themeContext.paperTheme}
      >
        <Text>修改你的todo</Text>
        <TextInput value={todo} onChangeText={setTodo} />
        <Button
          icon="plus"
          mode="contained"
          style={styles.buttonStyle}
          onPress={handleUpdate}
        >
          修改
        </Button>
      </Modal>
    </Portal>
  );
}

