import { useActions, useSelectedFilters } from '@/store/store';
import { XMarkIcon, ArrowPathIcon } from '@heroicons/react/24/solid';
import { useQueryClient } from '@tanstack/react-query';

function SelectedFiltes() {
  const { updateFilters } = useActions();
  const selectedFilters = useSelectedFilters();
  const queryClient = useQueryClient();

  function reloadPrompt() {
    queryClient.invalidateQueries({ queryKey: ['books'] });
    console.log('reload query books');
  }

  let filtersHTML;
  if (selectedFilters.length == 1) {
    filtersHTML = (
      <span
        className="text-sm border border-gray-400 rounded-md p-1 hover:bg-slate-900 m-1"
        key={`filter-selected`}
      >
        {selectedFilters[0].values}
      </span>
    );
  } else if (selectedFilters.length > 1) {
    filtersHTML = selectedFilters.map((filter, i) => {
      return (
        <span
          className="text-sm border border-gray-400 rounded-md p-1 hover:bg-slate-900 m-1"
          key={`filter-selected-${i}`}
        >
          {filter.values}
        </span>
      );
    });
  }

  return (
    <div className="w-full p-4 m-2 bg-gray-800 shadow-md rounded-md flex flex-col items-center">
      <div>{filtersHTML}</div>
      <div>
        <button onClick={() => reloadPrompt()}>
          <ArrowPathIcon className="w-10 text-gray-400 m-2 hover:rotate-180 transform transition duration-150 ease-in-out" />{' '}
        </button>
        <button onClick={() => updateFilters([])}>
          <XMarkIcon className="w-10 text-gray-400 m-2 hover:rotate-180 transform transition duration-150 ease-in-out" />{' '}
        </button>
      </div>
    </div>
  );
}

export default SelectedFiltes;
