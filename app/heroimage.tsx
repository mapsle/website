"use client";
import { motion } from "motion/react";
import HeroGraphic from "@/assets/hero-graphic.svg";
import Image from "next/image";

export default function HeroImage() {
  return (
    <Image
      src={HeroGraphic}
      alt="Hero Graphic"
      className="w-fit object-cover h-full -z-20 absolute top-0 left-0 opacity-50"
    />
  );
}
