export type Book = {
  id: string;
  title: string;
  authors: string;
  description: string;
  cover: string;
  cover_i: number;
  published?: number;
};

export type BookComment = {
  bookId: string;
  prompt: string;
  description: string;
};

export type filterType = { filter: string; values: string[] };

// export type prompt = { }
