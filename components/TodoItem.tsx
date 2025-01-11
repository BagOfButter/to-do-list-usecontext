import React from "react";
import { Todo } from "../contexts/TodoContext";

type TodoItemProps = {
  todo: Todo;
  onSelect: (id: string) => void;
  isSelected: boolean;
};

export const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onSelect,
  isSelected,
}) => {
  return (
    <div
      className={`p-4 border rounded-lg mb-2 ${
        isSelected ? "bg-blue-100" : ""
      } shadow-sm hover:shadow-md transition-shadow duration-200`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">{todo.name}</h3>
          <p className="text-gray-600">{todo.description}</p>
        </div>
        <input
          type="checkbox"
          checked={isSelected}
          onChange={() => onSelect(todo.id)}
          className="h-5 w-5"
        />
      </div>
      <div className="mt-2">
        {todo.tags.map((tag) => (
          <span
            key={tag}
            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};
