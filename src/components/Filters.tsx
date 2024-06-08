import { useState } from 'react';
import Filter from './Filter';
import { filters as filtersData } from '../test/filters';
import { filterType } from '../types/types';
import { useActions } from '../store/store';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

export default function Filters() {
  const [index, setIndex] = useState(0);
  const [selecting, setSelecting] = useState(true);
  const [selectedFilters, setSelectedFilters] = useState<filterType[]>([]);

  const { updateFilters } = useActions();

  const filters = filtersData[index];

  function handleFliterClick(filter: string, add: boolean) {
    let newFilters: filterType[];
    if (add) {
      newFilters = [
        ...selectedFilters,
        { filter: filters.filter, values: [filter] },
      ];
    } else {
      newFilters = [
        ...selectedFilters.filter((f) => !f.values.includes(filter)),
      ];
    }
    setSelectedFilters(newFilters);
  }

  function handleFinish() {
    setSelecting(false);
    updateFilters(selectedFilters);
    // let finalFilters = '';
    // selectedFilters.forEach((el) => {
    //   finalFilters += `${el.filter}: ${el.values} \n`;
    // });
    // console.log('final filters: ', finalFilters);
  }

  function reset() {
    setIndex(0);
    setSelecting(true);
    setSelectedFilters([]);
    updateFilters([]);
  }

  const filterTab = filtersData[index].values?.map((filter, i) => {
    return (
      <Filter key={filters.filter + '-' + i} onFilterClick={handleFliterClick}>
        {filter}
      </Filter>
    );
  });
  return (
    <div>
      <h2 className="text-xl text-center font-bold m-2 mb-4">
        Create custom filter:
      </h2>
      {selecting && (
        <>
          <div className="text-center">
            {filterTab}{' '}
            {filtersData.length - 1 > index ? (
              <button
                className="border border-gray-400 rounded-md p-2 hover:bg-slate-900"
                onClick={() => setIndex(index + 1)}
              >
                → Next
              </button>
            ) : (
              <>
                <button
                  className="border border-gray-400 rounded-md p-2 hover:bg-slate-900"
                  onClick={() => handleFinish()}
                >
                  Finish
                </button>
                <br />
              </>
            )}
          </div>
          <div className="w-full text-center mt-2"></div>
        </>
      )}

      <div className="min-h-8 transition duration-150 ease-in-out mt-4 flex flex-wrap items-center justify-center">
        {selectedFilters.map((filter, i) => {
          return (
            <span
              className="text-sm border border-gray-400 rounded-md p-1 hover:bg-slate-900 m-1"
              key={`filter-selected-${i}`}
            >
              {filter.values}
            </span>
          );
        })}
        {!selecting && (
          <button className="" onClick={() => reset()}>
            <ArrowPathIcon className="w-8 text-gray-400 m-2 hover:rotate-180 transform transition duration-150 ease-in-out" />
          </button>
        )}
      </div>
    </div>
  );
}
