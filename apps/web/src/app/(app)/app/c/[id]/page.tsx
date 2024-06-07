import ChatWebUI from "@/components/custom/chat";

export default function Chat({ params }: { params: { id: string } }) {
  return <ChatWebUI chatId={params.id} />;
}
