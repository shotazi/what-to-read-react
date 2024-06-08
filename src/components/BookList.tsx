import { getBooksFromChatGPT } from '@/services/books';
import { useActions } from '../store/store';
import { useQueries, useQuery } from '@tanstack/react-query';
import { getBook } from '@/services/getBook';
import BookCover from './BookCover';
// import { Book } from '../types/types';

function BookList({ filters }: { filters: string }) {
  const { updateBook } = useActions();

  // const booksQuery = useBooks(filters);

  const {
    isPending,
    isError,
    data: books,
    error,
  } = useQuery({
    queryKey: ['books', filters],
    queryFn: () => getBooksFromChatGPT(filters),
    // enabled: !!memoizedFilters,
    staleTime: Infinity,
  });

  const getBooksMetaData = useQueries({
    queries: (books ?? []).map((book) => {
      return {
        queryKey: ['getBook', book.title],
        queryFn: () => getBook(book.title),
        staleTime: Infinity,
      };
    }),
  });

  console.log('meta data: ', getBooksMetaData);

  const booksMetaData = getBooksMetaData.map((q) => q.data);
  // todo: update bookList in store

  console.log('get books queries', booksMetaData);

  if (isPending) {
    return <p>Loading</p>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!books) return null;

  return (
    <div className="w-full m-2 grid grid-cols-2 gap-2">
      {books.map((book, i) => (
        <div
          key={book.id}
          className="max-w-md flex gap-2 bg-gray-800 hover:bg-gray-700 hover:scale-105 transition-all p-3 shadow-md rounded-md cursor-pointer"
          onClick={() => updateBook(book, booksMetaData[i])}
        >
          <BookCover
            book={book}
            cover_i={booksMetaData[i]?.cover_i}
            loadingCoverUrl={getBooksMetaData[i].isLoading}
          />
          <div className="flex flex-col items-start gap-2 text-left">
            <h2 className="text-xl font-bold">
              {book.title}{' '}
              {booksMetaData[i] && `(${booksMetaData[i]?.publish_year[0]})`}
            </h2>
            <p className="text-gray-300">
              {book.description.substring(0, 70)}...
            </p>
            <p className="mt-4 italic font-medium text-gray-400">
              {Array.isArray(book.authors)
                ? book.authors.join(', ')
                : book.authors}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookList;
