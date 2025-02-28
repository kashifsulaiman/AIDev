const DotsLoader = () => {
  return (
    <div className="ml-8 flex w-fit items-center justify-center gap-1 rounded-2xl rounded-ss-none bg-slate-100 p-4">
      <span className="h-2 w-2 animate-bounce rounded-full bg-custom-purple [animation-delay:-0.2s]"></span>
      <span className="h-2 w-2 animate-bounce rounded-full bg-custom-purple [animation-delay:-0.1s]"></span>
      <span className="h-2 w-2 animate-bounce rounded-full bg-custom-purple"></span>
    </div>
  );
};

export default DotsLoader;
