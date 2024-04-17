import Image from "next/image";
import { Icons } from "../icons";
import { cn } from "@/lib/utils";

export interface Testimonial {
  prefix?: string;
  name: string;
  testimonial: string;
  image?: string;
  role?: string;
  company?: string;
}

export default function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <div
      className={cn(
        "border-border w-full rounded-lg border px-3 py-4 backdrop-blur-sm md:p-6 max-w-screen-xl mx-auto",
        "flex flex-col gap-6",
      )}
    >
      <div className="flex flex-col gap-4">
        <Icons.quote />
        <p className="2xl:text-lg">{testimonial.testimonial}</p>
        <p className="text-gray-400">
          <span className="name text-gray-900 capitalize font-bold">
            {testimonial.prefix} {testimonial.name}
          </span>{" "}
          &#8212; {testimonial.company}, {testimonial.role}{" "}
        </p>
      </div>
      <div className="relative shrink-0">
        {testimonial.image && (
          <Image
            src={testimonial.image}
            width={48}
            height={48}
            alt="Commenter image"
            className="rounded-full w-24 h-24 object-cover 2xl:w-28 2xl:h-28"
          />
        )}
      </div>
    </div>
  );
}
