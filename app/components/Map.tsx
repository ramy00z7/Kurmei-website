"use client"; import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"; import L from "leaflet"; import "leaflet/dist/leaflet.css";
export type Point = { key: string; name: string; note?: string; lat: number; lng: number; href?: string };
const icon = new L.Icon({ iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png", iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png", shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png", iconSize: [25, 41], iconAnchor: [12, 41] });
export default function Map({ points }: { points: Point[] }) {
  return <MapContainer center={[17.5, 31.5]} zoom={5} style={{ height: "100%", width: "100%" }} scrollWheelZoom><TileLayer attribution='&copy; OpenStreetMap contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    {points.map(p => <Marker key={p.key} position={[p.lat, p.lng]} icon={icon}><Popup><b>{p.name}</b><br />{p.note}{p.href && <><br /><a href={p.href}>Open →</a></>}</Popup></Marker>)}</MapContainer>;
}
