import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { List, FAB, Portal, Card, Button } from "react-native-paper";
import todosData from "../stores/todos.json";
import InputTodo from "./InputTodoModal";
import DeleteTodo from "./DeleteTodoModal";
import UpdateTodo from "./UpdateTodoModal";

const TodoLists = () => {
  const [todos, setTodos] = useState(todosData);

  //增加部分
  const [addModalVisible, setAddModalVisible] = useState(false);
  const showAddModal = () => setAddModalVisible(true);
  const hideAddModal = () => setAddModalVisible(false);
  const addTodo = (task) => {
    const newTodo = {
      id: todos.length ? todos[todos.length - 1].id + 1 : 1,
      task,
    };
    setTodos([...todos, newTodo]);
    hideAddModal();
  };

  //更新部分
  const [updateModalVisible, setUpdateModalVisible] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState("");
  const hideUpdateModal = () => setUpdateModalVisible(false);
  const showUpdateModal = (task) => {
    setTaskToUpdate(task);
    setUpdateModalVisible(true);
  };
  const updateTodo = (newTask) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.task === taskToUpdate) {
        return { ...todo, task: newTask };
      }
      return todo;
    });
    setTodos(updatedTodos);
    setUpdateModalVisible(false);
  };
  //删除部分
  const [dialogVisible, setDialogVisble] = useState(false);
  const [currentTodoId,setCurrentTodoId] = useState(null);
  const showDeleteDialog = (id) => {
    console.log(id);
    setCurrentTodoId(id)
    setDialogVisble(true);
  }
  const hideDeleteDialog = () => setDialogVisble(false);
  const handleDeleteTodo = (id)=>{
    setDialogVisble(false);
    setTodos(todos.filter((todo)=> todo.id !== id))
    console.log(todos);
  }
  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        ListHeaderComponent={<List.Section title="您的Todos"></List.Section>}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Card>
            <Card.Content>
              <List.Item title={item.task} />
            </Card.Content>
            <Card.Actions>
              <Button onPress={() => showUpdateModal(item.task)}>修改</Button>
              <Button onPress={()=> showDeleteDialog(item.id)}>删除</Button>
            </Card.Actions>
          </Card>
        )}
      />
      <InputTodo
        showModal={showAddModal}
        hideModal={hideAddModal}
        visible={addModalVisible}
        setTodos={setTodos}
        addTodo={addTodo}
      />
      <UpdateTodo
        hideModal={hideUpdateModal}
        visible={updateModalVisible}
        updateTodo={updateTodo}
        taskToUpdate={taskToUpdate}
      />
      <DeleteTodo
        visible={dialogVisible}
        hideDialog={hideDeleteDialog}
        onDelete={()=> handleDeleteTodo(currentTodoId)}
      />
      <Portal.Host>
        <FAB style={styles.fab} icon="plus" onPress={showAddModal} />
      </Portal.Host>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});

export default TodoLists;
