import { useActions } from '@/store/store';
import { useState } from 'react';

function ManualFilter() {
  const [prompt, setPrompt] = useState('');
  const { updateFilters } = useActions();

  function handleSubmit() {
    updateFilters([{ filter: 'general', values: [prompt] }]);
  }
  return (
    <div className="w-full gap-4 p-4 px-12 m-2 my-5 bg-gray-800 shadow-md rounded-md flex flex-col items-center">
      <h2 className="text-xl text-center font-bold m-2 mb-2">
        Just enter your prompt:
      </h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
        className="w-full flex flex-col items-center gap-4"
      >
        <input
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full bg-gray-900 p-3 rounded-md border border-gray-500 text-gray-200 h-18 text-xl"
          placeholder="Example: books about quantum physics for beginners"
        />
        <button
          type="submit"
          className="w-32 bg-gray-600 p-3 rounded-md hover:bg-gray-400 hover:scale-105 transition duration-150 ease-in-ou "
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default ManualFilter;
