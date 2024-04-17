import Image from "next/image";
import { Card, CardContent, CardFooter } from "../ui/card";

export interface BlogCardProps {
  title: string;
  description: string;
  image: string;
  authorImage?: string;
  author: string;
  dateOfPublication: Date;
  timeToRead: string;
  slug: string;
}

export default function BlogCard({
  title,
  description,
  image,
  authorImage,
  author,
  dateOfPublication,
  timeToRead,
  slug,
}: BlogCardProps) {
  return (
    <Card>
      <CardContent>
        <div>
          <div></div>
          <div></div>
        </div>
        <div></div>
      </CardContent>
      <CardFooter>
        <div>
          <div className="flex">
            <Image src={authorImage!} alt={author} width={48} height={48} />
            <span>{author}</span>
          </div>
          <span>{dateOfPublication.toLocaleDateString()}</span>
          <span>{timeToRead}</span>
        </div>
        <div></div>
      </CardFooter>
    </Card>
  );
}
