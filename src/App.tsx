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
import SearchBar from '@/components/SearchBar';
import BookList from '@/components/BookList';
import BookDetails from '@/components/BookDetails';
// import { bookList } from '@/test/dummy_data';
// import Comment from '@/components/Comment';
import { useBook, useSelectedFilters } from '@/store/store';
import FilterPage from './components/FilterPage';
import SelectedFiltes from './components/SelectedFiltes';

const queryClient = new QueryClient();

function App() {
  const [search, setSearch] = useState('');
  const showSearchBar = false;
  const book = useBook();
  const selectedFilters = useSelectedFilters();

  const filters = selectedFilters
    .map((f) => `${f.filter}:${f.values}`)
    .join(',');

  return (
    <QueryClientProvider client={queryClient}>
      <div className="w-4/5 max-w-[900px] m-auto">
        <h1 className="text-3xl font-bold text-center">
          What do you want to read?
        </h1>
        {selectedFilters.length == 0 ? <FilterPage /> : <SelectedFiltes />}
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
