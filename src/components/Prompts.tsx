function Prompts({ prompts }: { prompts: string[] }) {
  function handlePromptClick() {
    // todo here goes zustand method call
    // it adds prompt to comments, sends react query to open ai api
    // and rerenders comments list
  }
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {prompts.map((prompt, i) => {
        return (
          <button
            key={i}
            className="px-4 py-2 bg-gray-700 text-gray-300 rounded-md transition hover:bg-gray-600 hover:scale-105"
            onClick={() => handlePromptClick()}
          >
            {prompt}
          </button>
        );
      })}
    </div>
  );
}

export default Prompts;
