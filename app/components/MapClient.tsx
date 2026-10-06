"use client";
import dynamic from "next/dynamic"; import type { Point } from "@/app/components/Map";
const Map = dynamic(() => import("@/app/components/Map"), { ssr: false });
export default function MapClient({ points }: { points: Point[] }) { return <Map points={points} />; }
