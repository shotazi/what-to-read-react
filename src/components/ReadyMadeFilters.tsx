import Filter from '@/components/Filter';
import { useActions } from '@/store/store';
import { useState } from 'react';
import { READY_MADE_FILTERS } from '@/test/dummy_data';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

function ReadyMadeFilters() {
  const { updateFilters } = useActions();
  const [readyMadeFilters, setReadyMadeFilters] = useState(
    generateRandomReadyMadeFilters()
  );

  function generateRandomReadyMadeFilters() {
    const arrCopy = [...READY_MADE_FILTERS];
    const result = [];

    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * arrCopy.length);
      result.push(arrCopy[randomIndex]);
      arrCopy.splice(randomIndex, 1);
    }

    return result;
  }

  function changeFilters() {
    const result = generateRandomReadyMadeFilters();
    setReadyMadeFilters(result);
  }

  function handleReadyMadeFilterClick(prompt: string) {
    updateFilters([{ filter: 'general', values: [prompt] }]);
  }

  return (
    <div className="w-full p-2 m-2 bg-gray-800 shadow-md rounded-md">
      <h2 className="text-xl text-center font-bold m-2 mb-4">
        Choose from ready made filters:
      </h2>
      <div className="flex justify-center flex-wrap">
        {readyMadeFilters.map((filter, i) => (
          <Filter
            key={`ready-made-filter-${i}`}
            onFilterClick={handleReadyMadeFilterClick}
            isActivable={false}
          >
            {filter}
          </Filter>
        ))}
      </div>
      <div className="w-full flex justify-center">
        <button onClick={changeFilters}>
          <ArrowPathIcon className="w-10 text-gray-400 m-2 hover:rotate-180 transform transition duration-150 ease-in-out" />
        </button>
      </div>
    </div>
  );
}

export default ReadyMadeFilters;
