function BookSkeletons() {
  return (
    <div className="w-full m-2 grid grid-cols-2 gap-2">
      {[1, 2, 3, 4].map((_, index) => (
        <div
          key={index}
          className="min-h-[210px] min-w-[350px] max-w-md flex gap-2 bg-gray-800  p-3 shadow-md rounded-md cursor-pointer"
        >
          <div className="min-w-32 animate-pulse rounded bg-gray-600"></div>
          <div className="w-full flex flex-col items-start gap-2 text-left">
            {Array.from({ length: 8 }, (_, index) => (
              <h2
                key={index}
                className="w-full h-4 px-4 text-xl font-bold animate-pulse  bg-gray-600"
              ></h2>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default BookSkeletons;
