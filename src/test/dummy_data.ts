import { Book } from '../types/types';

export const bookList: Book[] = [
  {
    id: '1',
    title: 'The Life of Samuel Johnson',
    description:
      "A biography of Samuel Johnson, one of the most distinguished literary figures of the 18th century, as written by his friend James Boswell. The book provides a detailed and vivid account of Johnson's life and his contributions to English literature.",
    authors: 'James Boswell',
    cover:
      'https://ia804703.us.archive.org/view_archive.php?archive=/9/items/l_covers_0012/l_covers_0012_62.zip&file=0012622046-L.jpg',
    cover_i: 2805263,
  },
  {
    id: '2',
    title: 'Narrative of the Life of Frederick Douglass, an American Slave',
    description:
      'The powerful and moving autobiography of Frederick Douglass, detailing his experiences as a slave and his journey to freedom. It is a seminal work in American literature and provides a firsthand account of the horrors of slavery.',
    authors: 'Frederick Douglass',
    cover:
      'https://ia804703.us.archive.org/view_archive.php?archive=/9/items/l_covers_0012/l_covers_0012_62.zip&file=0012622046-L.jpg',
    cover_i: 5821273,
  },
  {
    id: '3',
    title: 'The Metamorphosis',
    description:
      'A novella by Franz Kafka that tells the story of Gregor Samsa, a man who wakes up one morning to find himself transformed into a giant insect. The story explores themes of alienation, guilt, and the human condition.',
    authors: 'Franz Kafka',
    cover:
      'https://ia804703.us.archive.org/view_archive.php?archive=/9/items/l_covers_0012/l_covers_0012_62.zip&file=0012622046-L.jpg',
    cover_i: 9933109,
  },
  {
    id: '4',
    title: 'My Life',
    description:
      'The autobiography of Leon Trotsky, a prominent Marxist revolutionary and one of the key leaders of the Russian Revolution. The book provides insights into his personal life, political career, and the tumultuous events of early 20th-century Russia.',
    authors: 'Leon Trotsky',
    cover:
      'https://ia804703.us.archive.org/view_archive.php?archive=/9/items/l_covers_0012/l_covers_0012_62.zip&file=0012622046-L.jpg',
    cover_i: 6871972,
  },
];

export const prompts = [
  'Tell me more about the Author',
  'Tell me about the context',
  'What critics say?',
  'What are main ideas?',
  // 'Suggest similar books',
];

export const READY_MADE_FILTERS = [
  'Books about the French Revolution',
  'Books about the Russian Revolution',
  'Books about 19th century Paris',
  'Spy novel set in Cold War',
  'The Great American Novel',
  'English Short story collections',
  'Persian Poetry',
  'Books about classical music',
  'Historical Novels',
  'Ancient Greek Philosophy',
  'Popular science books from 20th century',
  'Most popular sci-fi novels of all time',
  'Russian classical literature',
  'Fantasy books like The Lords of the Rings',
];
