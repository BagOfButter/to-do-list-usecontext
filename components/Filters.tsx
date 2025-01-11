import React from "react";

type FiltersProps = {
  tags: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
};

export const Filters: React.FC<FiltersProps> = ({
  tags,
  selectedTags,
  onTagSelect,
  searchTerm,
  onSearchChange,
}) => {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search todos..."
        className="w-full p-2 mb-2 border rounded-md"
      />
      <div>
        {tags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
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
    </div>
  );
};
