import Tiptap from "@/components/custom/tiptap";

const getPostDetails = async (id: string) => {
  const req = await fetch(`${process.env.BACKEND_URL}/api/posts/${id}`);
  if (req.status === 404 || !req.ok) return null;
  return req.json();
};

export default async function WriterPage({
  params,
}: {
  params: { id: string };
}) {
  const data = (await getPostDetails(params.id)) as {
    id: string;
    title: string;
    content: string;
  };

  return <Tiptap id={params.id} title={data.title} content={data.content} />;
}
