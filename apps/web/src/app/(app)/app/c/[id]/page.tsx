import ChatWebUI from "@/components/custom/chat";

export default function Chat({ params }: { params: { id: string } }) {
  console.log(params);
  return <ChatWebUI />;
}
