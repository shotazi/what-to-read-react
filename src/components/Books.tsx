import { useQuery } from '@tanstack/react-query';

export default function Books({ query }: { query: string }) {
  const { isPending, error, data } = useQuery({
    queryKey: ['books', query],
    queryFn: async () => {
      console.log('query: ', query);
      const response = await fetch(
        `https://openlibrary.org/search.json?q=${query}&fields=key,title,author_name,editions,cover_i&limit=6`
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      const { docs } = result;
      console.log('result: ', docs);
      return docs;
    },
  });
  if (isPending) return <div>Loading...</div>;

  if (error) return 'An error has occurred: ' + error.message;

  return (
    <>
      <div>
        <h1 className="text-3xl font-bold">Books:</h1>
        <p>{query}</p>
        <div className="grid grid-cols-2">
          {data.map((book) => (
            <div
              key={book.key}
              className="max-w-sm flex gap-2 m-2 bg-slate-600 hover:bg-slate-500 hover:scale-105 transition-all p-2 shadow-md rounded-md cursor-pointer"
            >
              <img
                className="rounded-md object-contain"
                key={book.cover_i}
                width="80"
                height="80"
                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
              />
              <div className="flex flex-col items-start gap-2 text-left">
                <h2 className="text-xl font-bold">{book.title}</h2>
                <p className="italic">
                  {Array.isArray(book.author_name)
                    ? book.author_name.join(', ')
                    : book.author_name}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
