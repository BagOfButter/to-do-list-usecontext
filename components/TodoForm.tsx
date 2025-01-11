import React, { useState } from "react";
import { useTodoContext } from "@/contexts";
import { useRouter } from "next/navigation";

const AVAILABLE_TAGS = ["Work", "Personal", "Urgent", "Later"];

export const TodoForm: React.FC = () => {
  const { addTodo } = useTodoContext();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      addTodo({ name, description, tags: selectedTags });
      setName("");
      setDescription("");
      setSelectedTags([]);
      router.push("/");
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Todo name"
        className="w-full p-2 mb-2 border rounded-md"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        className="w-full p-2 mb-2 border rounded-md"
      />
      <div className="mb-2">
        {AVAILABLE_TAGS.map((tag) => (
          <button
            key={tag}
            type="button"
            onClick={() => toggleTag(tag)}
            className={`mr-2 mb-2 px-3 py-1 rounded-full ${
              selectedTags.includes(tag)
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>
      <button
        type="submit"
        className="w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-200"
      >
        Add Todo
      </button>
    </form>
  );
};
