import { filterType } from '../types/types';

export const filters: filterType[] = [
  { filter: 'type', values: ['Fiction', 'Non-fiction'] },
  {
    filter: 'genre',
    values: [
      'History',
      'Science',
      'Biography',
      'Autobiography',
      'Sci-fi',
      'Classic',
      'Romance',
      'Drama',
      'Science',
    ],
  },
  {
    filter: 'period',
    values: ['18th century', '19th century', '20th century', '21st century'],
  },
  {
    filter: 'language',
    values: [
      'English',
      'German',
      'Arabic',
      'Chinese',
      'French',
      'Russian',
      'Italian',
      'Spanish',
    ],
  },
];

/*
- Fiction - Non-fiction
- Genre
-

*/
