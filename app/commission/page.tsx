"use client";

import { Button } from "@/components/ui/button";
import clsx from "clsx";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  MountainSnow,
  LocateFixed,
  AlertCircleIcon,
  LoaderCircle,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import type { LatLng } from "leaflet";

import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { div } from "motion/react-m";

const Map = dynamic(() => import("./map"), { ssr: false });
const LatLngHandler = dynamic(() => import("@/components/LatLngHandler"), {
  ssr: false,
});

export default function CommissionPage() {
  let [step, setStep] = useState(1);
  let [size, setSize] = useState<"a3" | "a4" | "a5">("a4");
  let [orientation, setOrientation] = useState<"portrait" | "landscape">(
    "portrait",
  );

  const queryClient = new QueryClient();

  let [category, setCategory] = useState<"real" | "fictional" | null>();

  let [mapAnimating, setMapAnimating] = useState(false);
  let [position, setPosition] = useState<LatLng | undefined>();
  let [zoom, setZoom] = useState<number | undefined>();

  let [search, setSearch] = useState<string>("");

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
      <div className="w-full h-full flex justify-center items-center pt-40 pb-20 md:pt-0 md:pb-0 [&>div]:absolute">
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
                  "rounded-md bg-neutral-50 flex justify-center items-center scale-75 md:scale-100 border border-dashed",
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
                exit={{
                  width: width + "px",
                  height: height + "px",
                }}
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
                {category == "real" && !mapAnimating && (
                  <Map
                    position={position}
                    setPosition={setPosition}
                    zoom={zoom}
                    setZoom={setZoom}
                  />
                )}
                {category == "real" && (
                  <Button
                    className="absolute top-3 right-3 z-[400]"
                    onClick={() => {
                      orientation == "landscape"
                        ? setOrientation("portrait")
                        : setOrientation("landscape");
                    }}
                  >
                    Change orientation
                  </Button>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="w-full flex  bg-neutral-100 p-3 [&>div]:top-0 md:[&>div]:top-auto relative [&>div]:absolute h-full overflow-auto justify-center pt-30">
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
              <h2 className="text-xl">1. Size</h2>
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
              <h2 className="text-xl">2. Orientation</h2>
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
              <h2 className="text-xl">3. Fictional or real place</h2>
              <div className="grid grid-cols-2 w-full gap-3">
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
                  ? "4. Select a location on the map"
                  : "4. Describe your fictional place"}
              </h2>

              {category === "fictional" ? (
                <>
                  <div className="prose">
                    <p>
                      Since you chose a fictional map, here’s your space to
                      describe anything specific you’d like me to include. You
                      can be as detailed or vague as you like. The more you give
                      me, the more personal the map becomes.
                    </p>
                    <p>Some things you could include:</p>
                    <ul>
                      <li>
                        <p>
                          <strong>Specific names</strong> (streets, suburbs,
                          rivers, etc)
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>Landmarks</strong> (bridge, clock tower, giant
                          fork, etc)
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>Terrain &amp; geography</strong> (Mountains,
                          rivers, lakes, beaches, waterfalls, ocean, islands,
                          etc)
                        </p>
                      </li>
                      <li>
                        <p>
                          <strong>Road layout</strong> - You can give me a
                          specific city to incorporate its layout, or tell me
                          what style you’d like. For example, a:
                        </p>
                        <ul>
                          <li>Grid (New York, Melbourne) </li>
                          <li>Radial or planned design (Canberra, Brasilia)</li>
                          <li>Organic/terrain influenced design (Europe) </li>
                          <li>Loopy suburban layout </li>
                          <li>etc</li>
                        </ul>
                      </li>
                      <li>
                        <p>
                          <strong>Public infrastructure:</strong>
                        </p>
                        <ul>
                          <li>
                            Transport (Airport, train line, port, tram, etc)
                          </li>
                          <li>Highways (interchanges and tunnels) </li>
                          <li>
                            Utilities/services (Substations, reservoirs,
                            landfill, etc),
                          </li>
                          <li>
                            Buildings (Court house, library, post office, etc
                          </li>
                          <li>
                            Amenities (Schools, Universities, Markets, Shopping
                            centres, Hospitals, Pools, etc)
                          </li>
                          <li>
                            Green Spaces (Park, Botanic Gardens, Oval/stadium,
                            Golf courses, wetlands, national parks, etc)
                          </li>
                        </ul>
                      </li>
                      <li>
                        <strong>Specific themed areas</strong> (Historic
                        district, touristy area, industrial area, etc)
                      </li>
                      <li>
                        <strong>Special/unique features</strong> (Abandoned
                        theme park, lemonade factory, peanut shaped roundabout,
                        etc)
                      </li>
                      <li>
                        <strong>Personal touches</strong> (Statue of your pet,
                        personal names, etc)
                      </li>
                    </ul>
                    <p>
                      Don’t worry if you’re not sure what to write, even one
                      sentence helps me get a feel for what you want. Or you
                      could just say surprise me and I’ll draw something cool.
                    </p>
                    <p>
                      If you wish to send any images, say so in the text box,
                      and I will email you about them once you have completed
                      your order.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 w-full gap-3 min-h-32">
                    <Textarea placeholder="Add as many details as possible"></Textarea>
                  </div>
                </>
              ) : (
                <>
                  <Input
                    placeholder="Or search"
                    onKeyDown={(event) => {
                      if (event.key == "Enter") {
                        event.preventDefault();
                        setSearch((event.target as HTMLInputElement).value);
                      }
                    }}
                  />
                  <QueryClientProvider client={queryClient}>
                    <LatLngHandler
                      onPositionChange={setPosition}
                      onZoomChange={setZoom}
                      search={search}
                    />
                  </QueryClientProvider>
                </>
              )}
              {category == "real" && (
                <>
                  <h2 className="text-xl">Add any more details</h2>
                  <div className="prose overflow-x-auto">
                    <p>
                      Since you chose me to draw a real place, here’s your space
                      to describe anything specific you’d like me to include.
                      You can be as detailed or vague as you like. The more you
                      give me, the more personal the map becomes. There isn’t as
                      much you can customise when compared to a fictional map,
                      but here are some things you could ask me to incorporate:
                    </p>
                    <ul>
                      <li>
                        Specific buildings or locations you want highlighted
                        (Your house, favourite cafe, work, etc)
                      </li>
                      <li>Anything you’d like excluded</li>
                      <li>
                        Custom naming (rename a street, suburb, building, etc)
                      </li>
                    </ul>
                    <p>
                      Don’t worry if you’re not sure what to write, even one
                      sentence helps me get a feel for what you want. Or you
                      could just say surprise me and I’ll draw the location you
                      pinpointed.
                    </p>
                    <p>
                      If you wish to send any images, say so in the text box,
                      and I will email you about them once you have completed
                      your order.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 w-full gap-3 min-h-32">
                    <Textarea></Textarea>
                  </div>
                </>
              )}
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
