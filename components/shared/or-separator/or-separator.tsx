export type OrSeparatorProps = Readonly<{
  text?: string;
}>;

export function OrSeparator({ text = "o" }: OrSeparatorProps) {
  return (
    <div className="relative flex items-center justify-center w-full">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <span className="relative px-3 text-gray-500 bg-white">{text}</span>
    </div>
  );
}
