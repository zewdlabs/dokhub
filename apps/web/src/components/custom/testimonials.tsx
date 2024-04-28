import Link from "next/link";
import TestimonialCard from "./testimonial-card";
import { buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

export interface Testimonial {
  prefix?: string;
  name: string;
  testimonial: string;
  company?: string;
  role?: string;
  image?: string;
}

const testimonials = [
  {
    prefix: "Dr.",
    name: "Fitsum Terefe",
    testimonial:
      "I really would like to give thanks to the team behind dokhub for making a collaboration platform dedicated for doctors, it has been a game changer for us",
    company: "Yekatit 12 Hospital",
    role: "Surgeon",
  },
  {
    prefix: "Dr.",
    name: "Eyerusalem Amosa",
    testimonial:
      "I have enjoyed working with dokhub. It has helped me and my team collaborate with doctors all around the world",
    company: "Tikur Anbessa General Hospital",
    role: "Neurosurgeon",
  },
  {
    prefix: "Dr.",
    name: "Jane Cooper",
    testimonial:
      "dokhub and dokbot have been a game changer for us. I have been able to collaborate with many doctors across the globe",
    company: "Mount Sinai Hospital",
    role: "Cardiologist",
  },
] satisfies Testimonial[];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative min-h-screen grid grid-cols-1 lg:grid-cols-12 place-content-center lg:gap-16 md:container mx-auto"
    >
      <div className="relative z-10 mb-10 lg:mb-0 flex flex-col justify-center col-span-6">
        <h1 className="relative z-10 sm:text-5xl text-3xl 2xl:text-6xl font-bold sm:leading-snug 2xl:leading-tight font-cal">
          Bringing value across different brands.
        </h1>
        <p className="mt-4 mb-6 max-w-sm 2xl:text-lg 2xl:mt-4 2xl:mb-8">
          Doctors from 3 medical institutions are using{" "}
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "link" }),
              "text-base px-0 py-0 text-primary/70 hover:text-primary/100",
            )}
          >
            Dokhub
          </Link>{" "}
          to get assistance in their day to day tasks. Here are some of their
          opinions on the platform.
        </p>
        <Link
          href={""}
          className={cn(
            buttonVariants({
              variant: "default",
              size: "lg",
            }),
            "rounded-full w-fit",
          )}
        >
          Read success stories
        </Link>
      </div>
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-1 gap-5 col-span-6">
        {testimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.testimonial}
            testimonial={testimonial}
          />
        ))}
      </div>
    </section>
  );
}
