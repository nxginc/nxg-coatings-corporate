create table if not exists nxg_companies (
  company_id text primary key,
  display_name text not null,
  primary_domain text not null,
  campaign_domain text not null,
  region text not null default 'us-mn',
  timezone text not null default 'America/Chicago',
  status text not null default 'active' check (status in ('active', 'paused')),
  created_at timestamptz not null default now()
);

insert into nxg_companies (company_id, display_name, primary_domain, campaign_domain)
values ('nxg-coatings', 'NXG Coatings Inc.', 'nxgcoatingsinc.com', 'go.nxgcoatingsinc.com')
on conflict (company_id) do nothing;

alter table nxg_leads add column if not exists company_id text not null default 'nxg-coatings' references nxg_companies(company_id);
alter table nxg_partner_applications add column if not exists company_id text not null default 'nxg-coatings' references nxg_companies(company_id);
alter table nxg_campaigns add column if not exists company_id text not null default 'nxg-coatings' references nxg_companies(company_id);
alter table nxg_social_posts add column if not exists company_id text not null default 'nxg-coatings' references nxg_companies(company_id);
alter table nxg_admin_audit_events add column if not exists company_id text not null default 'nxg-coatings' references nxg_companies(company_id);
alter table nxg_leads drop constraint if exists nxg_leads_hubspot_sync_status_check;
alter table nxg_leads add constraint nxg_leads_hubspot_sync_status_check check (hubspot_sync_status in ('pending', 'synced', 'failed', 'not_configured', 'disabled'));

alter table nxg_campaigns drop constraint if exists nxg_campaigns_slug_key;
create unique index if not exists nxg_campaigns_company_slug_idx on nxg_campaigns (company_id, slug);
create index if not exists nxg_leads_company_created_idx on nxg_leads (company_id, created_at desc);
create index if not exists nxg_partners_company_status_idx on nxg_partner_applications (company_id, status, created_at desc);
create index if not exists nxg_campaigns_company_status_idx on nxg_campaigns (company_id, status, updated_at desc);
create index if not exists nxg_social_company_status_idx on nxg_social_posts (company_id, status, created_at desc);

create table if not exists nxg_integrations (
  company_id text not null references nxg_companies(company_id),
  provider text not null,
  enabled boolean not null default false,
  updated_by text not null,
  updated_at timestamptz not null default now(),
  primary key (company_id, provider)
);

create table if not exists nxg_newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  company_id text not null references nxg_companies(company_id),
  email text not null,
  status text not null default 'pending_confirmation' check (status in ('pending_confirmation', 'subscribed', 'unsubscribed')),
  consented_at timestamptz not null default now(),
  source text not null default 'blog',
  created_at timestamptz not null default now(),
  unique (company_id, email)
);