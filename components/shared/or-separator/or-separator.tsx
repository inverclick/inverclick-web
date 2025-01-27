export type OrSeparatorProps = Readonly<{
  text?: string;
}>;

export function OrSeparator({ text = "o" }: OrSeparatorProps) {
  return (
    <div className="relative flex w-full items-center justify-center">
      <div className="absolute inset-0 flex items-center">
        <div className="w-full border-t border-gray-300"></div>
      </div>
      <span className="relative bg-white px-3 text-gray-500">{text}</span>
    </div>
  );
}
