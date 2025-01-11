"use client";

import React from "react";
import { TodoProvider } from "@/contexts";
import { TodoForm } from "@/components";
import Link from "next/link";

const CreateTodoPage: React.FC = () => {
  return (
    <TodoProvider>
      <div className="max-w-2xl mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Create New Todo</h1>
        <TodoForm />
        <Link
          href="/"
          className="mt-4 inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
        >
          Back to Todo List
        </Link>
      </div>
    </TodoProvider>
  );
};

export default CreateTodoPage;
