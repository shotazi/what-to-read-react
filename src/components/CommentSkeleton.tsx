function CommentSkeleton() {
  return (
    <div className="w-full flex gap-2 bg-gray-800  p-3 shadow-md rounded-md cursor-pointer">
      <div className="w-full flex flex-col items-start gap-2 text-left">
        {Array.from({ length: 8 }, (_, index) => (
          <h2
            key={index}
            className="w-full h-3 px-4 text-xl font-bold animate-pulse  bg-gray-600"
          ></h2>
        ))}
      </div>
    </div>
  );
}

export default CommentSkeleton;
