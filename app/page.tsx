import { Button } from "@/components/ui/button";
import Link from "next/link";
import HeroMap1 from "@/assets/hero-map-1";

export default function Home() {
  return (
    <div className="absolute top-0 h-screen -z-10 w-full">
      <HeroMap1 className="h-full absolute top-0 left-0 w-fit" />
      <div className="container mx-auto flex flex-col items-center justify-center h-full gap-5">
        <h1 className="text-4xl text-center">
          One-of-a-kind, hand-drawn maps crafted just for you <br />
          and delivered as the only copy in the world, straight to your door.
        </h1>
        <Button size="lg" asChild>
          <Link href="/commission">Commission Me</Link>
        </Button>
      </div>
    </div>
  );
}
