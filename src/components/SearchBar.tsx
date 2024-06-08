import { useDebouncedCallback } from 'use-debounce';

export default function SearchBar({
  onSearch,
}: {
  onSearch: (value: string) => void;
}) {
  const handleChange = useDebouncedCallback((value) => {
    onSearch(value);
  }, 300);

  return (
    <div>
      <p>Search:</p>
      <input
        placeholder="Seach a book"
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
