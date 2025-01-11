"use client";

import React, { useState } from "react";
import { TodoProvider, useTodoContext } from "@/contexts";
import { Filters, TodoItem } from "@/components";
import Link from "next/link";

const AVAILABLE_TAGS = ["Work", "Personal", "Urgent", "Later"];

const TodoList: React.FC = () => {
  const { todos, deleteMultipleTodos } = useTodoContext();
  const [selectedTodos, setSelectedTodos] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleTodoSelection = (id: string) => {
    setSelectedTodos((prev) =>
      prev.includes(id) ? prev.filter((todoId) => todoId !== id) : [...prev, id]
    );
  };

  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filteredTodos = todos.filter(
    (todo) =>
      (selectedTags.length === 0 ||
        todo.tags.some((tag) => selectedTags.includes(tag))) &&
      (todo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        todo.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDeleteSelected = () => {
    deleteMultipleTodos(selectedTodos);
    setSelectedTodos([]);
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Todo List</h1>
      <Link
        href="/create"
        className="mb-4 inline-block px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors duration-200"
      >
        Create New Todo
      </Link>
      <Filters
        tags={AVAILABLE_TAGS}
        selectedTags={selectedTags}
        onTagSelect={handleTagSelect}
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      {selectedTodos.length > 0 && (
        <button
          onClick={handleDeleteSelected}
          className="mb-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors duration-200"
        >
          Delete Selected ({selectedTodos.length})
        </button>
      )}
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onSelect={toggleTodoSelection}
          isSelected={selectedTodos.includes(todo.id)}
        />
      ))}
    </div>
  );
};

const Home: React.FC = () => {
  return (
    <TodoProvider>
      <TodoList />
    </TodoProvider>
  );
};

export default Home;
