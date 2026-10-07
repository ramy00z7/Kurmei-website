import Link from "next/link"; import ThemeToggle from "./ThemeToggle";

export default function Nav({admin=false}:{admin?:boolean}){
 return <nav className="nav">
  <Link href={admin?"/admin":"/"} className="logo-link"><div className="logo">{admin?"KURMEI / ADMIN":"KURMEI"}</div></Link>
  <div className="links">{admin ? <>
   <Link href="/admin/events">Events</Link><Link href="/admin/people">People</Link><Link href="/admin/places">Places</Link><Link href="/admin/organizations">Orgs</Link><Link href="/admin/sources">Sources</Link><Link href="/admin/books">Books</Link><Link href="/admin/review">Review</Link><Link href="/">Public site</Link>
  </> : <>
   <Link href="/explore">Explore</Link><Link href="/timeline">Timeline</Link><Link href="/map">Map</Link><Link href="/search">Search</Link><Link href="/support">Support</Link><Link href="/tribes">Peoples</Link>
  </>}{!admin && <ThemeToggle />}</div>
 </nav>
}
