import type { MetadataRoute } from "next"; import { connection } from "next/server"; import { publishedEvents, publishedPlaces, publishedPeople, publishedOrganizations, publishedEthnicGroups } from "@/app/lib/repo";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await connection(); // render per request so newly published events appear
  const base = "https://kurmei.com";
  const pages = ["", "/timeline", "/map", "/explore", "/search", "/about", "/methodology", "/sources", "/support", "/contact", "/privacy", "/terms"];
  const [ev, pl, pe, og, tr] = await Promise.all([publishedEvents(), publishedPlaces(), publishedPeople(), publishedOrganizations(), publishedEthnicGroups()]);
  return [
    ...pages.map(p => ({ url: base + p })),
    ...ev.map(e => ({ url: `${base}/events/${e.slug}` })),
    ...pl.map(p => ({ url: `${base}/places/${p.slug}` })),
    ...pe.map(p => ({ url: `${base}/people/${p.slug}` })),
    ...og.map(o => ({ url: `${base}/organizations/${o.slug}` })),
    ...tr.map((t: any) => ({ url: `${base}/tribes/${t.slug}` })),
  ];
}
