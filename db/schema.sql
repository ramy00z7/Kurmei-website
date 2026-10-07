create table if not exists events(
  id serial primary key,
  slug text unique not null,
  title text not null,
  summary text not null default '',
  date_label text not null,
  date_precision text not null default 'year' check (date_precision in ('exact','year','approximate','range','century','era','unknown')),
  place text not null default '',
  lat double precision check (lat between -90 and 90),
  lng double precision check (lng between -180 and 180),
  location_precision text not null default 'approximate' check (location_precision in ('exact','approximate','region','route','unknown')),
  status text not null default 'draft' check (status in ('draft','proposed','review','approved','published','archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create table if not exists event_relations(
  id serial primary key,
  from_id int not null references events(id) on delete cascade,
  to_id int not null references events(id) on delete cascade,
  type text not null check (type in ('preceded','contributed_to')),
  confidence text not null check (confidence in ('direct','context','contested')),
  note text not null default ''
);
create table if not exists sources(
  id serial primary key,
  title text not null,
  author text, publisher text, year text, url text,
  rights text not null default 'unknown',
  created_at timestamptz not null default now()
);
create table if not exists audit_log(
  id serial primary key,
  at timestamptz not null default now(),
  action text not null, entity text not null, entity_id int, detail jsonb
);
create table if not exists documents(
  id serial primary key, title text not null, author text, year text,
  rights_confirmed boolean not null default false, page_count int not null default 0,
  created_at timestamptz not null default now()
);
create table if not exists document_pages(
  doc_id int not null references documents(id) on delete cascade, page int not null,
  text text not null, processed boolean not null default false, primary key(doc_id, page)
);
create table if not exists proposals(
  id serial primary key, doc_id int not null references documents(id) on delete cascade, page int not null,
  status text not null default 'pending' check (status in ('pending','approved','rejected')),
  title text not null, date_label text not null default '', date_precision text not null default 'unknown',
  place text not null default '', summary text not null default '', evidence text not null default '',
  evidence_verified boolean not null default false, confidence text not null default 'low',
  uncertainty text not null default '', duplicate_of int references events(id) on delete set null,
  event_id int references events(id) on delete set null, created_at timestamptz not null default now()
);
alter table proposals add column if not exists summary_copied boolean not null default false;
create table if not exists event_citations(
  id serial primary key, event_id int not null references events(id) on delete cascade,
  doc_id int not null references documents(id) on delete cascade, page int not null
);
alter table events add column if not exists sort_year int;
update events set sort_year = case when date_label ~* 'bce|bc' then -(substring(date_label from '[0-9]+'))::int else (substring(date_label from '[0-9]+'))::int end where sort_year is null and date_label ~ '[0-9]';
create table if not exists places(
  id serial primary key, slug text unique not null, name text not null, summary text not null default '',
  period text not null default '', lat double precision check (lat between -90 and 90), lng double precision check (lng between -180 and 180),
  location_precision text not null default 'approximate' check (location_precision in ('exact','approximate','region','route','unknown')),
  status text not null default 'draft' check (status in ('draft','proposed','review','approved','published','archived')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists people(
  id serial primary key, slug text unique not null, name text not null, summary text not null default '',
  life_span text not null default '', role text not null default '',
  status text not null default 'draft' check (status in ('draft','proposed','review','approved','published','archived')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists organizations(
  id serial primary key, slug text unique not null, name text not null, summary text not null default '',
  founded_label text not null default '', kind text not null default '',
  status text not null default 'draft' check (status in ('draft','proposed','review','approved','published','archived')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table if not exists involvements(
  id serial primary key, event_id int not null references events(id) on delete cascade,
  entity_type text not null check (entity_type in ('person','organization')),
  entity_id int not null, role text not null default ''
);
alter table proposals add column if not exists kind text not null default 'event' check (kind in ('event','person','organization'));
alter table proposals alter column date_label drop not null;
create table if not exists person_citations(id serial primary key, person_id int not null references people(id) on delete cascade, doc_id int not null references documents(id) on delete cascade, page int not null);
create table if not exists organization_citations(id serial primary key, organization_id int not null references organizations(id) on delete cascade, doc_id int not null references documents(id) on delete cascade, page int not null);
create table if not exists ethnic_groups(
  id serial primary key, slug text unique not null, name text not null, other_names text not null default '',
  region text not null default '', language_family text not null default '', summary text not null default '',
  sources text not null default '',
  status text not null default 'published' check (status in ('draft','proposed','review','approved','published','archived')),
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
