export async function getBook(title: string) {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${title}&fields=key,title,author_name,editions,publish_year,cover_i&limit=1`
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    // return data;
    return data?.docs[0];
  } catch (error) {
    console.error('Failed to fetch book data:', error);
    throw error;
  }
}
