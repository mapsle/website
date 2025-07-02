"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useState } from "react";

export default function CommissionPage() {
  let [step, setStep] = useState(1);
  let [size, setSize] = useState<"a3" | "a4" | "a5">("a4");
  let [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait",
  );
  return (
    <div className="absolute top-0 -z-10 w-full h-screen flex md:flex-row flex-col">
      <div className="w-full flex justify-center items-center bg-gray-50">
        {step == 1 && (
          <div
            className={clsx(
              "bg-white rounded-md max-w-full max-h-full duration-300 aspect-[11/8.5] w-96 drop-shadow-2xl flex justify-center items-center",
              orientation == "portrait" && "rotate-90",
              size == "a3" && "scale-125",
              size == "a5" && "scale-75",
            )}
          >
            <span
              className={clsx(
                "block duration-300 text-neutral-400 text-xl",
                orientation == "portrait" && "-rotate-90",
              )}
            >
              Map here
            </span>
          </div>
        )}
      </div>
      <div className="w-full flex justify-center items-center">
        {step == 1 && (
          <div className="p-3 gap-3 flex flex-col border min-w-96 rounded-md">
            <h2 className="text-xl">Size</h2>
            <div className="flex flex-row w-full gap-3 [&>button]:grow">
              <Button
                variant={size === "a3" ? "default" : "outline"}
                onClick={() => setSize("a3")}
              >
                A3
              </Button>
              <Button
                variant={size === "a4" ? "default" : "outline"}
                onClick={() => setSize("a4")}
              >
                A4
              </Button>
              <Button
                variant={size === "a5" ? "default" : "outline"}
                onClick={() => setSize("a5")}
              >
                A5
              </Button>
            </div>
            <h2 className="text-xl">Orientation</h2>
            <div className="flex flex-row w-full gap-3 [&>button]:grow">
              <Button
                variant={orientation === "portrait" ? "default" : "outline"}
                onClick={() => setOrientation("portrait")}
              >
                Portrait
              </Button>
              <Button
                variant={orientation === "landscape" ? "default" : "outline"}
                onClick={() => setOrientation("landscape")}
              >
                Landscape
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
