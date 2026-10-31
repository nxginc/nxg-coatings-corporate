create table if not exists nxg_lead_replies (
  id uuid primary key default gen_random_uuid(),
  company_id text not null references nxg_companies(company_id),
  lead_id uuid not null references nxg_leads(id) on delete cascade,
  recipient_email text not null,
  subject text not null,
  body_text text not null,
  status text not null default 'sending' check (status in ('sending', 'sent', 'failed')),
  actor text not null,
  provider_message_id text,
  error_message text,
  created_at timestamptz not null default now(),
  sent_at timestamptz
);

create index if not exists nxg_lead_replies_company_lead_idx
  on nxg_lead_replies (company_id, lead_id, created_at desc);

create table if not exists nxg_channel_drafts (
  id uuid primary key default gen_random_uuid(),
  company_id text not null references nxg_companies(company_id),
  channel text not null check (channel in ('indeed', 'yelp')),
  title text not null,
  source_url text,
  body text not null,
  status text not null default 'draft'
    check (status in ('draft', 'review', 'approved', 'handed_off', 'archived')),
  created_by text not null,
  approved_by text,
  approved_at timestamptz,
  handed_off_by text,
  handed_off_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists nxg_channel_drafts_company_channel_status_idx
  on nxg_channel_drafts (company_id, channel, status, updated_at desc);
