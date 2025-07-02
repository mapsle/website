import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div className="absolute top-0 h-screen -z-10 w-full">
      <div className="container mx-auto flex flex-col items-center justify-center h-full gap-5">
        <h1 className="text-4xl text-center">
          One-of-a-kind, hand-drawn maps crafted just for you
        </h1>
        <Button size="lg" asChild>
          <Link href="/commission">Commission Me</Link>
        </Button>
      </div>
    </div>
  );
}
