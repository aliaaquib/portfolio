import Link from "next/link";
import avatar from "@/public/avatar1.png";

import BlurImage from "@/components/blur-image";

export function Header() {
  return (
    <div className="flex items-center gap-4 py-4">
      <Link href="/" className="size-16 shrink-0 overflow-hidden rounded-full">
        <BlurImage
          className="size-full object-cover"
          src={avatar}
          alt="avatar"
          width={100}
          height={100}
          priority
          placeholder="blur"
        />
      </Link>

      <div>
        <h1 className="text-3xl font-bold">aaquib ali</h1>
        <p className="text-lg font-medium text-muted-foreground">
          Teacher & Freelancer
        </p>
      </div>
    </div>
  );
}
