export default function Page({ params }: { params: { postId: string } }) {
  return <div>{params.postId}</div>;
}
