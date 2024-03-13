import React from "react";
import {
  Modal,
  Portal,
  Text,
  Button,
  TextInput,
} from "react-native-paper";
import { StyleSheet } from "react-native";
export default function InputTodo({ showModal, hideModal, visible ,addTodo}) {
  const [todo,setTodo] = React.useState("")
  const handleAdd = () => {
    addTodo(todo); //将用户添加的待办事项传给addTodo函数
    setTodo(""); //重置输入框
    // hideModal();
  };
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={styles.containerStyle}
      >
        <Text>输入你要添加的todo</Text>
        <TextInput label="todo" value={todo} onChangeText={setTodo} />
        <Button
          icon="plus"
          mode="contained"
          style={styles.buttonStyle}
          onPress={() => handleAdd()}
        >
          添加
        </Button>
      </Modal>
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
  buttonStyle : {
    marginTop: 15
  }
})