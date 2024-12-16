export const TypingIndicator = () => {
  return (
    <article className="flex gap-1 bg-muted px-3 py-3 w-max max-w-[75%] rounded-lg">
      <div className="size-2 bg-gray-400 rounded-full animate-bounce"></div>
      <div
        className="size-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div
        className="size-2 bg-gray-400 rounded-full animate-bounce"
        style={{ animationDelay: "0.4s" }}
      ></div>
    </article>
  );
};
