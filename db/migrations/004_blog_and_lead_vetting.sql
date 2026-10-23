create table if not exists nxg_blog_posts (
  id uuid primary key default gen_random_uuid(),
  company_id text not null references nxg_companies(company_id),
  slug text not null,
  title text not null,
  excerpt text not null,
  body_markdown text not null default '',
  cover_asset_id text,
  category text not null,
  author_name text not null default 'NXG Coatings Team',
  status text not null default 'draft' check (status in ('draft', 'review', 'approved', 'published', 'archived')),
  source text not null default 'admin' check (source in ('admin', 'contentstack', 'import')),
  published_at timestamptz,
  created_by text not null,
  approved_by text,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, slug)
);

create index if not exists nxg_blog_posts_company_status_idx on nxg_blog_posts (company_id, status, updated_at desc);
create index if not exists nxg_blog_posts_published_idx on nxg_blog_posts (company_id, published_at desc);

alter table nxg_leads add column if not exists vetting_status text not null default 'unscored'
  check (vetting_status in ('unscored', 'needs_information', 'review', 'priority', 'manual_hold'));
alter table nxg_leads add column if not exists vetting_score integer not null default 0 check (vetting_score between 0 and 100);
alter table nxg_leads add column if not exists vetting_flags jsonb not null default '[]'::jsonb;
alter table nxg_leads add column if not exists vetting_updated_at timestamptz;

create index if not exists nxg_leads_company_vetting_idx on nxg_leads (company_id, vetting_status, vetting_score desc, created_at desc);

create table if not exists nxg_lead_vetting_events (
  id uuid primary key default gen_random_uuid(),
  company_id text not null references nxg_companies(company_id),
  lead_id uuid not null references nxg_leads(id) on delete cascade,
  actor text not null,
  score integer not null check (score between 0 and 100),
  status text not null check (status in ('unscored', 'needs_information', 'review', 'priority', 'manual_hold')),
  flags jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists nxg_lead_vetting_events_lead_idx on nxg_lead_vetting_events (lead_id, created_at desc);
