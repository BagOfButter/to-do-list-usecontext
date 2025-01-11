"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

export type Todo = {
  id: string;
  name: string;
  description: string;
  tags: string[];
};

type TodoContextType = {
  todos: Todo[];
  addTodo: (todo: Omit<Todo, "id">) => void;
  deleteTodo: (id: string) => void;
  deleteMultipleTodos: (ids: string[]) => void;
};

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodoContext must be used within a TodoProvider");
  }
  return context;
};

export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window !== "undefined") {
      const savedTodos = localStorage.getItem("todos");
      return savedTodos ? JSON.parse(savedTodos) : [];
    }
    return [];
  });

  const addTodo = (todo: Omit<Todo, "id">) => {
    const newTodo = { ...todo, id: Date.now().toString() };
    setTodos([...todos, newTodo]);
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const deleteMultipleTodos = (ids: string[]) => {
    setTodos(todos.filter((todo) => !ids.includes(todo.id)));
  };

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, deleteTodo, deleteMultipleTodos }}
    >
      {children}
    </TodoContext.Provider>
  );
};
