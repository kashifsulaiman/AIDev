// DividerWithText.tsx
interface DividerWithTextInterface {
  text: string;
}

export default function DividerWithText({ text }: DividerWithTextInterface) {
  return (
    <div className="my-1 flex w-full items-center">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-4 text-xs text-black md:text-sm">{text}</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
}
