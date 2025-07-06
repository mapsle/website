"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MountainSnow, LocateFixed, AlertCircleIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const Map = dynamic(() => import("./map"), { ssr: false });

export default function CommissionPage() {
  let [step, setStep] = useState(1);
  let [size, setSize] = useState<"a3" | "a4" | "a5">("a4");
  let [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait",
  );

  let [category, setCategory] = useState<"real" | "fictional" | null>();

  let [mapAnimating, setMapAnimating] = useState(false);

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
      <div className="w-full h-full flex justify-center items-center p-3 [&>div]:absolute">
        <AnimatePresence>
          {step == 1 && (
            <motion.div
              key="1"
              className="drop-shadow-2xl"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className={clsx(
                  "bg-white rounded-md [&>div]:absolute flex justify-center items-center scale-75 md:scale-100",
                )}
                initial={{
                  width: width + "px",
                  height: height + "px",
                }}
                animate={{
                  width: width + "px",
                  height: height + "px",
                }}
              >
                <AnimatePresence>
                  <motion.div
                    key={width + "mm x " + height + "mm"}
                    exit={{ opacity: 0 }}
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: {
                        delay: 0.3,
                      },
                    }}
                    transition={{
                      duration: 0.3,
                    }}
                    className={clsx(
                      "text-center text-neutral-400 text-xl flex justify-center items-center",
                    )}
                    style={{ width: width + "px", height: height + "px" }}
                  >
                    {width}mm x {height}mm
                  </motion.div>
                </AnimatePresence>
              </motion.div>
            </motion.div>
          )}
          {step == 2 && (
            <motion.div
              key="2"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className={clsx(
                  "rounded-md  flex justify-center items-center scale-75 md:scale-100 border border-dashed",
                )}
                initial={{
                  width: width + "px",
                  height: height + "px",
                }}
                animate={{
                  width: width + "px",
                  height: height + "px",
                }}
              ></motion.div>
            </motion.div>
          )}
          {step == 3 && (
            <motion.div
              key="3"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <motion.div
                className={clsx(
                  "rounded-md bg-neutral-50 flex justify-center items-center scale-75 md:scale-100 border border-dashed overflow-hidden",
                )}
                initial={{
                  width: width + "px",
                  height: height + "px",
                }}
                animate={{
                  width: orientation == "portrait" ? "297px" : "420px",
                  height: orientation == "portrait" ? "420px" : "297px",
                }}
                onAnimationStart={() => setMapAnimating(true)}
                onAnimationComplete={() => setMapAnimating(false)}
              >
                {category == "real" && !mapAnimating && <Map />}

                <Button
                  className="absolute top-3 right-3 z-[400]"
                  onClick={() => {
                    orientation == "landscape"
                      ? setOrientation("portrait")
                      : setOrientation("landscape");
                  }}
                >
                  Rotate
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="w-full flex justify-center items-center bg-neutral-100 p-3 [&>div]:top-0 relative [&>div]:absolute h-full">
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
              <Alert variant="destructive" className="md:hidden">
                <AlertCircleIcon /> <AlertTitle>Notice</AlertTitle>
                <AlertDescription>
                  This site is not built for mobile. Use at your own risk.
                </AlertDescription>
              </Alert>
              <h2 className="text-xl">Size</h2>
              <div className="grid grid-cols-3 w-full gap-3">
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
              <div className="grid grid-cols-2 w-full gap-3">
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
          {step == 2 && (
            <motion.div
              key="2"
              className="p-3 gap-3 flex flex-col min-w-96"
              exit={{ opacity: 0, y: -100 }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ease: [0, 0.7, 0.2, 1],
              }}
            >
              <h2 className="text-xl">Real or fictional place</h2>
              <div className="grid grid-cols-2 w-full gap-3">
                <Button
                  variant={category === "real" ? "default" : "outline"}
                  onClick={() => {
                    if (category == null) {
                      setTimeout(() => setStep(3), 200);
                    }
                    setCategory("real");
                  }}
                >
                  <LocateFixed />
                  Real
                </Button>
                <Button
                  variant={category === "fictional" ? "default" : "outline"}
                  onClick={() => {
                    if (category == null) {
                      setTimeout(() => setStep(3), 200);
                    }
                    setCategory("fictional");
                  }}
                >
                  <MountainSnow />
                  Fictional
                </Button>
              </div>
              <div className="flex flex-row">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep(1);
                  }}
                >
                  Back
                </Button>
                <div className="grow"></div>
                <Button
                  variant="default"
                  disabled={category == null}
                  onClick={() => {
                    setStep(3);
                  }}
                >
                  Next
                </Button>
              </div>
            </motion.div>
          )}
          {step == 3 && (
            <motion.div
              key="3"
              className="p-3 gap-3 flex flex-col min-w-96"
              exit={{ opacity: 0, y: -100 }}
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ease: [0, 0.7, 0.2, 1],
              }}
            >
              <h2 className="text-xl">
                {category === "real"
                  ? "Select a location on the map"
                  : "Describe your fictional place"}
              </h2>

              {category === "fictional" ? (
                <div className="grid grid-cols-1 w-full gap-3 min-h-32">
                  <Textarea placeholder="Add as many details as possible"></Textarea>
                </div>
              ) : (
                <Input placeholder="Or search" />
              )}
              <h2 className="text-xl">Add any more details</h2>
              <div className="grid grid-cols-1 w-full gap-3 min-h-32">
                <Textarea></Textarea>
              </div>
              <div className="flex flex-row">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep(2);
                  }}
                >
                  Back
                </Button>
                <div className="grow"></div>
                <Button variant="default" onClick={() => {}}>
                  Continue
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
