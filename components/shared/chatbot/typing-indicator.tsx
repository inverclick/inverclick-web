export const TypingIndicator = () => {
  return (
    <article className="flex w-max max-w-[75%] gap-1 rounded-lg bg-muted px-3 py-3">
      <div className="size-2 animate-bounce rounded-full bg-gray-400"></div>
      <div
        className="size-2 animate-bounce rounded-full bg-gray-400"
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div
        className="size-2 animate-bounce rounded-full bg-gray-400"
        style={{ animationDelay: "0.4s" }}
      ></div>
    </article>
  );
};
