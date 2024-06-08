import { Book } from '@/types/types';
import { useState, useEffect } from 'react';
import noImage from '@/assets/no-image.png';

function BookCover({
  book,
  cover_i,
  loadingCoverUrl,
}: {
  book: Book;
  cover_i: number;
  loadingCoverUrl: boolean;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState('');

  // console.log('cover from book cover: ', cover_i);

  useEffect(() => {
    if (loadingCoverUrl) return;
    const image = new Image();

    if (cover_i) {
      const url = `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`;
      setImageUrl(url);
      if (url) {
        image.src = url;
      }
      image.onload = () => {
        console.log('loaded');
        setIsLoading(false);
      };
    } else {
      setImageUrl(noImage);
      setIsLoading(false);
    }

    return () => {
      image.onload = null;
    };
  }, [book, cover_i, imageUrl, loadingCoverUrl]);

  let content;
  if (loadingCoverUrl || isLoading)
    content = (
      <div className="skeleton h-full w-full bg-gray-200 animate-pulse" />
    );

  if (!loadingCoverUrl && !isLoading)
    content = (
      <img
        src={imageUrl!}
        alt={book.title || 'Book Cover'}
        className="object-cover h-full w-full absolute top-0 left-0 loaded"
      />
    );

  return (
    <div
      className="book-cover h-48 min-w-32 relative overflow-hidden rounded-md border border-gray-700"
      data-book-id={book.id}
    >
      {content}
    </div>
  );
}

export default BookCover;
