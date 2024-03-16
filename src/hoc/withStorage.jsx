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

    return (
      <WrappedComponent
        todos={todos}
        addTodo={addTodo}
        updateTodo={updateTodo}
        deleteTodo={deleteTodo}
        {...props}
      />
    );
  };

  return WithStorageComponent;
};

export default withStorage;