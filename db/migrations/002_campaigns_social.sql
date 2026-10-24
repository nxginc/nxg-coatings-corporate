create table if not exists nxg_campaigns (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  description text not null,
  service text not null,
  audience text not null,
  landing_path text not null,
  image_url text,
  asset_ids jsonb not null default '[]'::jsonb,
  channel_variants jsonb not null default '{}'::jsonb,
  status text not null default 'draft' check (status in ('draft', 'review', 'approved', 'rejected', 'archived')),
  created_by text not null,
  approved_by text,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists nxg_social_posts (
  id uuid primary key default gen_random_uuid(),
  campaign_id uuid not null references nxg_campaigns(id) on delete restrict,
  platform text not null check (platform in ('facebook', 'instagram', 'linkedin', 'google', 'marketplace')),
  caption text not null,
  media_asset_ids jsonb not null default '[]'::jsonb,
  destination_url text,
  status text not null default 'draft' check (status in ('draft', 'review', 'approved', 'rejected', 'queued', 'published', 'failed')),
  scheduled_at timestamptz,
  provider_post_id text,
  created_by text not null,
  approved_by text,
  approved_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists nxg_campaigns_status_updated_idx on nxg_campaigns (status, updated_at desc);
create index if not exists nxg_social_posts_status_scheduled_idx on nxg_social_posts (status, scheduled_at);

create table if not exists nxg_admin_audit_events (
  id uuid primary key default gen_random_uuid(),
  actor text not null,
  action text not null,
  entity_type text not null,
  entity_id text not null,
  created_at timestamptz not null default now(),
  details jsonb not null default '{}'::jsonb
);