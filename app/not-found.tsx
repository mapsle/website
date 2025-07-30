import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex p-10 flex-col items-center justify-center gap-3">
      <h1 className="text-4xl font-bold text-center">404</h1>
      <p className="text-xl text-center">
        Looks like you&apos;re lost. I can make you a map :)
      </p>
      <div className="flex flex-row gap-3">
        <Button>
          <Link href="/commission">Commission Me</Link>
        </Button>
        <Button variant="ghost">
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  );
}
