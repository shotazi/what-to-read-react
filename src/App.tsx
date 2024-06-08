import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import {
  // useQuery,
  // useMutation,
  // useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { useState } from 'react';
import Books from '@/components/Books';
import Filters from '@/components/Filters';
import SearchBar from '@/components/SearchBar';
import BookList from '@/components/BookList';
import BookDetails from '@/components/BookDetails';
// import { bookList } from '@/test/dummy_data';
// import Comment from '@/components/Comment';
import { useActions, useBook, useSelectedFilters } from '@/store/store';
import FilterPage from './components/FilterPage';
import { XMarkIcon } from '@heroicons/react/24/solid';

const queryClient = new QueryClient();

function App() {
  const [search, setSearch] = useState('');
  const showSearchBar = false;
  const book = useBook();
  const selectedFilters = useSelectedFilters();
  const { updateFilters } = useActions();

  console.log('selected filters: ', selectedFilters);

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

  let resetTab;
  if (selectedFilters.length > 0) {
    resetTab = (
      <div className="w-full p-4 m-2 bg-gray-800 shadow-md rounded-md flex flex-col items-center">
        <div>{filtersHTML}</div>
        <button onClick={() => updateFilters([])}>
          <XMarkIcon className="w-10 text-gray-400 m-2 hover:rotate-180 transform transition duration-150 ease-in-out" />{' '}
        </button>
      </div>
    );
  }

  const filters = selectedFilters
    .map((f) => `${f.filter}:${f.values}`)
    .join(',');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-4/5 max-w-[900px] m-auto">
        <h1 className="text-3xl font-bold text-center">
          What do you want to read?
        </h1>
        {resetTab}
        {selectedFilters.length == 0 && <FilterPage />}
        {/* <Filters /> */}
        {selectedFilters.length > 0 && !book && <BookList filters={filters} />}
        {selectedFilters.length > 0 && book && <BookDetails book={book} />}
      </div>
      {/*
      <Comment
      prompt="What critics say?"
      description="A biography of Samuel Johnson, one of the most distinguished literary figures of the 18th century, as written by his friend James Boswell. The book provides a detailed and vivid account of Johnson's life and his contributions to English literature."
    /> */}

      {showSearchBar && <SearchBar onSearch={setSearch} />}
      {search !== '' && <Books query={search} />}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
