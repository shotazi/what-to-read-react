import openai from '@/lib/openai';
import { Book } from '@/types/types';

import { queryOptions, useQuery } from '@tanstack/react-query';

export async function getBooksFromChatGPT(prompt: string) {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `Your job is to recommend books. I will provide you with filters in this format:
        'filtername': 'value',

        and you will ONLY return JSON which consists of array of 4 books in this format:
        [{ id: 'uniqueid',title: 'title',
        description: 'description',
        authors: 'author'},...]`,
        },
        {
          role: 'assistant',
          content: `Alright. I can certainly help with that. Please provide the filters you have in mind for the book recommendations, and I'll get started on finding some options for you.`,
        },
        { role: 'user', content: prompt },
      ],
      model: 'gpt-3.5-turbo-0125',
    });
    const result = response.choices[0].message.content;
    // return { message: response.choices[0].message.content || '', error: false };
    if (result) {
      if (!JSON.parse(result)?.books) {
        throw new Error('Error in generating AI definition');
      }
      const books = JSON.parse(result).books as Book[];
      return books;
    }
  } catch (error) {
    console.error('Error in generating AI definition:', error);
    throw new Error('Error in generating AI definition:' + error);
    // return { response: 'OpenAI request failed:' + error, error: true };
  }
}

export const getBooksQueryOptions = (promptText: string) => {
  return queryOptions({
    queryKey: ['getBooks', promptText],
    queryFn: () => getBooksFromChatGPT(promptText),
  });
};

export const useBooks = (promptText: string) => {
  return useQuery({
    ...getBooksQueryOptions(promptText),
  });
};

export async function fetchComment(prompt: string, book: Book) {
  try {
    const response = await openai.chat.completions.create({
      messages: [
        {
          role: 'system',
          content: `Your job is to give me answers about the specific book. I will provide you information about book and then give you a question.
          Book title: ${book.title}
          Book Author(s): ${book.authors}`,
        },
        {
          role: 'assistant',
          content: `Alright. I can certainly help with that. What do you want to know more about this book?`,
        },
        { role: 'user', content: prompt },
      ],
      model: 'gpt-3.5-turbo-0125',
    });
    const result = response.choices[0].message.content;
    // return { message: response.choices[0].message.content || '', error: false };
    // if (result) {
    //   if (!JSON.parse(result)?.books) {
    //     throw new Error('Error in generating AI definition');
    //   }
    //   const books = JSON.parse(result).books as Book[];
    //   return books;
    // }
    return result;
  } catch (error) {
    console.error('Error in generating AI definition:', error);
    throw new Error('Error in generating AI definition:' + error);
    // return { response: 'OpenAI request failed:' + error, error: true };
  }
}
