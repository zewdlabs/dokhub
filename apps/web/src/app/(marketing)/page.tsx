import { TextGenerateEffect } from "@/components/custom/gen-text";
import Hero from "@/components/custom/hero";
import { GlobalCollaborationCard } from "@/components/custom/marketing-globe-card";
import Testimonials from "@/components/custom/testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <GlobalCollaborationCard />
      <TextGenerateEffect
        className="p-12 md:px-28 md:py-40 text-4xl md:text-6xl max-w-7xl md:container md:leading-[85px] mb-12 font-cal"
        words="Our platform enables doctors and medical experts to collaborate effectively while leveraging state-of-the-art AI for diagnosis and other crucial tasks, ultimately enhancing patient care."
      />
      <Testimonials />
    </>
  );
}
