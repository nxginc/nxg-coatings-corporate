create table if not exists nxg_provider_connections (
  company_id text not null references nxg_companies(company_id),
  provider text not null check (provider in ('meta-pages', 'google-business-profile')),
  token_bundle_encrypted text not null,
  provider_account_id text,
  provider_account_name text,
  metadata jsonb not null default '{}'::jsonb,
  scopes text[] not null default '{}',
  connected_by text not null,
  connected_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (company_id, provider)
);

alter table nxg_social_posts drop constraint if exists nxg_social_posts_status_check;
alter table nxg_social_posts add constraint nxg_social_posts_status_check
  check (status in ('draft', 'review', 'approved', 'rejected', 'queued', 'publishing', 'published', 'failed'));

create table if not exists nxg_business_profiles (
  company_id text primary key references nxg_companies(company_id),
  display_name text not null,
  address_line_1 text not null,
  address_line_2 text not null default '',
  city text not null,
  region text not null,
  postal_code text not null,
  website text not null,
  email text not null,
  updated_by text not null,
  updated_at timestamptz not null default now()
);

create table if not exists nxg_external_publish_events (
  id uuid primary key default gen_random_uuid(),
  company_id text not null references nxg_companies(company_id),
  provider text not null,
  entity_type text not null check (entity_type in ('social_post', 'business_profile')),
  entity_id text not null,
  actor text not null,
  status text not null check (status in ('publishing', 'published', 'failed', 'unknown')),
  provider_entity_id text,
  error_message text,
  created_at timestamptz not null default now()
);

create index if not exists nxg_external_publish_events_company_created_idx
  on nxg_external_publish_events (company_id, created_at desc);
