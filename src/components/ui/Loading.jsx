function Loading() {

  return (
    <div className="flex justify-center items-center min-h-svh">
      <div
        className={`absolute rounded-full border-gray-100 border-r-primary border-b-primary animate-spin `}
        style={{ animationDuration: '1s' }}
      ></div>
    </div>
  );
}

export default Loading;