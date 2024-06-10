import { useState } from 'react';
import { useActions } from '../store/store';
import { Book } from '../types/types';
import BookCover from './BookCover';
import { prompts } from '@/test/dummy_data';
import { useQuery } from '@tanstack/react-query';
import { fetchComment } from '@/services/books';
import Comment from './Comment';
import CommentSkeleton from './CommentSkeleton';

function BookDetails({ book }: { book: Book }) {
  const { updateBook, updateFilters } = useActions();
  const [prompt, setPrompt] = useState('');

  const {
    data: comment,
    error,
    isLoading,
  } = useQuery({
    queryKey: ['comments', prompt, book],
    queryFn: () => fetchComment(prompt, book),
    enabled: !!prompt,
    staleTime: Infinity,
  });

  function handlePrompt(p: string) {
    // get prompt query
    setPrompt(p);
  }

  function handleSimilarBooks() {
    const prompt = `Books like ${book.title} by ${book.authors}`;
    updateFilters([{ filter: 'general', values: [prompt] }]);
  }

  return (
    <>
      <div
        key={book.id}
        className="w-full mx-auto my-4 p-6 bg-gray-800 rounded-lg shadow-md"
      >
        <div className="flex items-start gap-6">
          {/* <img
          className="w-40 h-56 object-cover rounded-md border border-gray-700"
          key={book.cover}
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
          alt={book.title}
        /> */}
          <BookCover book={book} cover_i={book?.cover_i} />
          <div className="flex-1">
            <button onClick={() => updateBook(null, 0)}>◀️ Back</button>
            <h2 className="text-2xl font-semibold text-white">
              {book.title} ({book?.published})
            </h2>
            <p className="mt-2 text-gray-300">{book.description}</p>
            <p className="mt-4 italic font-medium text-gray-400">
              {Array.isArray(book.authors)
                ? book.authors.join(', ')
                : book.authors}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {/* todo: make this dynamicd */}
              {prompts.map((p) => (
                <button
                  onClick={() => handlePrompt(p)}
                  className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md transition hover:bg-gray-600 hover:scale-105"
                >
                  {p}
                </button>
              ))}
              <button
                onClick={() => handleSimilarBooks()}
                className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md transition hover:bg-gray-600 hover:scale-105"
              >
                📚 Go to Simmilar Books
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* todo: here should be skeleton of comment */}
      {isLoading && <CommentSkeleton />}
      {error && 'Cannot load the comment...'}
      {comment && (
        <Comment bookId={book.id} prompt={prompt} description={comment} />
      )}
    </>
  );
}

export default BookDetails;
