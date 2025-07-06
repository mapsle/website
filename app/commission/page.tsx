"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function CommissionPage() {
  let [step, setStep] = useState(1);
  let [size, setSize] = useState<"a3" | "a4" | "a5">("a4");
  let [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait",
  );

  let [category, setCategory] = useState<"real" | "fictional" | null>();

  const width = useMemo(() => {
    if (orientation === "portrait") {
      if (size === "a3") return "297";
      if (size === "a4") return "210";
      if (size === "a5") return "148";
    } else {
      if (size === "a3") return "420";
      if (size === "a4") return "297";
      if (size === "a5") return "210";
    }
  }, [orientation, size]);
  const height = useMemo(() => {
    if (orientation === "portrait") {
      if (size === "a3") return "420";
      if (size === "a4") return "297";
      if (size === "a5") return "210";
    } else {
      if (size === "a3") return "297";
      if (size === "a4") return "210";
      if (size === "a5") return "148";
    }
  }, [orientation, size]);

  return (
    <div className="absolute top-0 -z-10 w-full h-screen flex md:flex-row flex-col">
      <div className="w-full h-full flex justify-center items-center p-3">
        <AnimatePresence>
          {step == 1 && (
            <motion.div className="drop-shadow-2xl" exit={{ opacity: 0 }}>
              <motion.div
                className={clsx(
                  "bg-white rounded-md  flex justify-center items-center scale-75 md:scale-100",
                )}
                initial={{
                  width: "210px",
                  height: "297px",
                }}
                animate={{
                  width: width + "px",
                  height: height + "px",
                }}
              >
                <span
                  className={clsx("block text-center text-neutral-400 text-xl")}
                >
                  {width}mm x {height}mm
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="w-full flex justify-center items-center bg-neutral-50 p-3">
        <AnimatePresence>
          {step == 1 && (
            <motion.div
              key="1"
              className="p-3 gap-3 flex flex-col min-w-96"
              exit={{ opacity: 0, y: -100 }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ease: [0, 0.7, 0.2, 1],
              }}
            >
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
              <div className="flex flex-row">
                <div className="grow"></div>
                <Button
                  variant="default"
                  onClick={() => {
                    setStep(2);
                  }}
                >
                  Next
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
