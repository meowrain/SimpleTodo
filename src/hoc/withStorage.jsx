import React, { useState, useEffect } from 'react';
import { loadTodos, saveTodos } from '../utils/handleTodos';

const withStorage = (WrappedComponent) => {
  const WithStorageComponent = (props) => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
      // 从本地存储中加载代办事项并设置列表状态
      loadTodos(setTodos);
    }, []);

    const addTodo = (task) => {
      const newTodo = {
        id: todos.length ? todos[todos.length - 1].id + 1 : 1,
        task,
      };
      const newTodos = [...todos, newTodo];
      setTodos(newTodos);
      // 保存到本地存储
      saveTodos(newTodos);
    };

    const updateTodo = (newTask, oldTask) => {
      const updatedTodos = todos.map((todo) => {
        if (todo.task === oldTask) {
          return { ...todo, task: newTask };
        }
        return todo;
      });
      setTodos(updatedTodos);
      // 保存更新后的数据到本地存储
      saveTodos(updatedTodos);
    };

    const deleteTodo = (id) => {
      const todoWillDelete = todos.filter((todo) => todo.id !== id);
      setTodos(todoWillDelete);
      // 保存删除后的数据到本地存储
      saveTodos(todoWillDelete);
    };
    // 置顶 Todo 项的逻辑
    const pinTodo = (todo) => {
      const newTodos = todos.filter((t) => t.id !== todo.id); // 先移除该 Todo
      const updatedTodos = [todo, ...newTodos]; // 然后把它添加到数组的开头
      setTodos(updatedTodos); // 更新状态
      saveTodos(updatedTodos); // 这里保存到本地或者服务端
    };


    return (
      <WrappedComponent
        todos={todos}
        addTodo={addTodo}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
        pinTodo={pinTodo}
        {...props}
      />
    );
  };

  return WithStorageComponent;
};

export default withStorage;