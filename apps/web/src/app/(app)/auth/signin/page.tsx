import SigninForm from "@/components/custom/signin";
type Props = {
  searchParams?: Record<"callbackUrl" | "error", string>;
};
export default function SigninPage(props: Props) {
  return <SigninForm    error={props.searchParams?.error}
  callbackUrl={props.searchParams?.callbackUrl} />;
}
