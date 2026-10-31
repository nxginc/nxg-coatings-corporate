create table if not exists nxg_career_openings (
  id uuid primary key default gen_random_uuid(),
  company_id text not null references nxg_companies(company_id),
  slug text not null,
  title text not null,
  location text not null,
  employment_type text not null,
  summary text not null,
  details text not null default '',
  status text not null default 'draft' check (status in ('draft', 'published', 'closed')),
  created_by text not null,
  updated_by text not null,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, slug)
);

create index if not exists nxg_career_openings_public_idx
  on nxg_career_openings (company_id, status, published_at desc);
