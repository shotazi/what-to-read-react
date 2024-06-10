import { create } from 'zustand';
import { Book, BookComment, filterType } from '../types/types';

type State = {
  selectedFilters: filterType[];
  selectingFilters: boolean;
  bookList: Book[];
  book: Book | null;
  currentPrompts: [];
  comments: BookComment[];
};

type Action = {
  actions: {
    updateFilters: (filters: filterType[]) => void;
    updateSelectingFilters: (value: boolean) => void;
    updateBook: (book: Book | null, metaData: any) => void;
    updateBooks: (book: Book[]) => void;
    updateComments: (comments: BookComment[]) => void;
  };
};

const useBookStore = create<State & Action>((set) => ({
  selectedFilters: [],
  selectingFilters: false,
  bookList: [],
  book: null,
  currentPrompts: [],
  comments: [],
  actions: {
    updateFilters: (filters) =>
      set(() => ({
        selectedFilters: filters,
        bookList: [],
        book: null,
        comments: [],
        currentPrompts: [],
      })),
    updateSelectingFilters: (value) => set(() => ({ selectingFilters: value })),
    updateBook: (book, metaData) =>
      set(() => {
        if (book !== null) {
          return {
            book: {
              ...book,
              cover_i: metaData?.cover_i,
              published: metaData?.publish_year[0],
            },
          };
        } else {
          return { book: null };
        }
      }),
    updateBooks: (bookList: Book[]) => set(() => ({ bookList: bookList })),
    updateComments: (comments: BookComment[]) =>
      set(() => ({ comments: comments })),
  },
}));

export default useBookStore;

// Custom Hooks

export const useBook = () => useBookStore((state) => state.book);

export const useSelectedFilters = () =>
  useBookStore((state) => state.selectedFilters);

export const useActions = () => useBookStore((state) => state.actions);
