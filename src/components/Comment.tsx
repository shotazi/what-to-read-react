function Comment({
  bookId,
  prompt,
  description,
}: {
  bookId: string;
  prompt: string;
  description: string;
}) {
  return (
    <div
      id={bookId}
      className="w-full mx-auto my-4 p-6 bg-gray-800 rounded-lg shadow-md"
    >
      <h2 className="w-full h-8 border-b border-b-gray-500 text-xl font-semibold text-white">
        {prompt}
      </h2>
      <p className="mt-2 text-gray-300">{description}</p>
      {/* <Prompts prompts={prompts.filter((p) => p !== prompt)} /> */}
    </div>
  );
}

export default Comment;
