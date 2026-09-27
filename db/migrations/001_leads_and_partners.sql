create extension if not exists pgcrypto;

create table if not exists nxg_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'new' check (status in ('new', 'contacted', 'qualified', 'closed', 'spam')),
  lead_type text not null check (lead_type in ('contact', 'estimate', 'consultation', 'virtual_quote')),
  name text not null,
  email text not null,
  phone text,
  service text,
  project_type text,
  address text,
  message text not null,
  preferred_date date,
  preferred_time text,
  landing_path text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  utm_content text,
  utm_term text,
  hubspot_contact_id text,
  hubspot_sync_status text not null default 'pending' check (hubspot_sync_status in ('pending', 'synced', 'failed', 'not_configured'))
);

create index if not exists nxg_leads_created_at_idx on nxg_leads (created_at desc);
create index if not exists nxg_leads_email_idx on nxg_leads (lower(email));
create index if not exists nxg_leads_hubspot_sync_idx on nxg_leads (hubspot_sync_status, created_at);

create table if not exists nxg_partner_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  status text not null default 'pending_review' check (status in ('pending_review', 'approved', 'rejected', 'suspended')),
  company text not null,
  contact_name text not null,
  email text not null,
  phone text not null,
  trade text not null,
  service_areas text not null,
  website text,
  license_number text,
  insurance_provider text,
  years_in_business text,
  message text,
  directory_consent boolean not null default false,
  terms_accepted_at timestamptz not null default now()
);

create index if not exists nxg_partner_applications_created_at_idx on nxg_partner_applications (created_at desc);