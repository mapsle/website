import { Button } from "@/components/ui/button";
import Link from "next/link";
import HeroGraphic from "@/assets/hero-graphic.svg";
import Image from "next/image";

export default function Home() {
  return (
    <div className="absolute top-0 h-screen -z-10 w-full">
      <Image
        src={HeroGraphic}
        alt="Hero Graphic"
        className="w-fit object-cover h-full -z-20 absolute top-0 left-0 opacity-50"
      />
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
