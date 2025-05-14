import { ChangeEvent } from "react";

type SearchBarProps = {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="px-5 pt-4">
      <input
        type="text"
        placeholder="Search surah..."
        value={value}
        onChange={onChange}
        className="w-full p-3 rounded-lg bg-dark text-light focus:outline-none focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}

export default SearchBar;
