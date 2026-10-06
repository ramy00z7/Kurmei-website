import { db } from "@/app/lib/db";
const COLS = "e.slug,e.title,e.summary,e.date_label,e.date_precision,e.place,e.lat,e.lng,e.location_precision,exists(select 1 from event_citations c where c.event_id=e.id) as cited";
const ORDER = "order by e.sort_year nulls last, e.id";
export async function publishedEvents(limit?: number) {
  return (await (await db()).query(`select ${COLS} from events e where e.status='published' ${ORDER} ${limit ? "limit " + Math.floor(limit) : ""}`)).rows;
}
export async function searchEvents(term: string) {
  const like = "%" + term.replace(/[\\%_]/g, m => "\\" + m) + "%";
  return (await (await db()).query(`select ${COLS} from events e where e.status='published' and (e.title ilike $1 or e.summary ilike $1 or e.place ilike $1 or e.date_label ilike $1) ${ORDER} limit 50`, [like])).rows;
}

const PCOLS = "slug,name,summary,period,lat,lng,location_precision";
export async function publishedPlaces() {
  return (await (await db()).query(`select ${PCOLS} from places where status='published' order by name`)).rows;
}
export async function searchPlaces(term: string) {
  const like = "%" + term.replace(/[\\%_]/g, m => "\\" + m) + "%";
  return (await (await db()).query(`select ${PCOLS} from places where status='published' and (name ilike $1 or period ilike $1 or summary ilike $1) order by name limit 50`, [like])).rows;
}
const HCOLS = "slug,name,summary,life_span,role";
export async function publishedPeople() {
  return (await (await db()).query(`select ${HCOLS} from people where status='published' order by name`)).rows;
}
export async function searchPeople(term: string) {
  const like = "%" + term.replace(/[\\%_]/g, m => "\\" + m) + "%";
  return (await (await db()).query(`select ${HCOLS} from people where status='published' and (name ilike $1 or role ilike $1 or summary ilike $1) order by name limit 50`, [like])).rows;
}
const OCOLS = "slug,name,summary,founded_label,kind";
export async function publishedOrganizations() {
  return (await (await db()).query(`select ${OCOLS} from organizations where status='published' order by name`)).rows;
}
export async function searchOrganizations(term: string) {
  const like = "%" + term.replace(/[\\%_]/g, m => "\\" + m) + "%";
  return (await (await db()).query(`select ${OCOLS} from organizations where status='published' and (name ilike $1 or kind ilike $1 or summary ilike $1) order by name limit 50`, [like])).rows;
}
