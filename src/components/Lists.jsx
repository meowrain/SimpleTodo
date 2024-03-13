import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { List, FAB, Portal, Card, Button } from "react-native-paper";
import todosData from "../stores/todos.json";
import InputTodo from "./InputTodoModal";
import DeleteTodo from "./DeleteTodoModal";

const TodoLists = () => {
  const [todos, setTodos] = useState(todosData);
  const [visible, setVisible] = useState(false);
  const [dialogVisible, setDialogVisble] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const showDialog = () => setDialogVisble(true);
  const hideDialog = () => setDialogVisble(false);

  const addTodo = (task) => {
    const newTodo = {
      id: todos.length ? todos[todos.length - 1].id + 1 : 1,
      task,
    };

    setTodos([...todos, newTodo]);
    hideModal();
  };
  const deleteTodo = () => {
    showDialog();
  };
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
              <Button>修改</Button>
              <Button onPress={deleteTodo}>删除</Button>
            </Card.Actions>
          </Card>
        )}
      />
      <InputTodo
        showModal={showModal}
        hideModal={hideModal}
        visible={visible}
        setTodos={setTodos}
        addTodo={addTodo}
      />
      <DeleteTodo
        visible={dialogVisible}
        showDialog={showDialog}
        hideDialog={hideDialog}
      />
      <Portal.Host>
        <FAB style={styles.fab} icon="plus" onPress={showModal} />
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
