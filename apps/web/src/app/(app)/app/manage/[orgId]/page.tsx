export default function Page({ params }: { params: { orgId: string } }) {
  return <div>{params.orgId}</div>;
}
