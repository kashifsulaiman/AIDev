// DividerWithText.tsx
interface DividerWithTextInterface {
  text: string;
}

export default function DividerWithText({ text }: DividerWithTextInterface) {
  return (
    <div className="flex items-center my-1 w-full">
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-4 text-black text-xs md:text-sm">{text}</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
}
