import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function notEmpty<TValue>(
  value: TValue | null | undefined,
): value is TValue {
  return value !== null && value !== undefined;
}

export function scrollToBottom(containerRef: React.RefObject<HTMLElement>) {
  if (containerRef.current) {
    const lastMessage = containerRef.current.lastElementChild;
    if (lastMessage) {
      const scrollOptions: ScrollIntoViewOptions = {
        behavior: "smooth",
        block: "end",
      };
      lastMessage.scrollIntoView(scrollOptions);
    }
  }
}

export function formattedText(inputText: string) {
  return inputText
    .replace(/\n+/g, " ") // Replace multiple consecutive new lines with a single space
    .replace(/(\w) - (\w)/g, "$1$2") // Join hyphenated words together
    .replace(/\s+/g, " "); // Replace multiple consecutive spaces with a single space
}
