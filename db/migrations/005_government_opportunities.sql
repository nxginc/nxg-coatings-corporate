create table if not exists nxg_government_opportunities (
  id uuid primary key default gen_random_uuid(),
  company_id text not null references nxg_companies(company_id),
  title text not null,
  funder text not null,
  state_code text not null default 'MN' check (state_code = 'US' or state_code ~ '^[A-Z]{2}$'),
  source_url text not null,
  application_url text,
  eligibility_notes text not null default '',
  deadline date,
  status text not null default 'researching'
    check (status in ('researching', 'eligible', 'ineligible', 'drafting', 'review_required', 'submitted', 'awarded', 'declined', 'archived')),
  created_by text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists nxg_government_opportunities_company_status_idx
  on nxg_government_opportunities (company_id, status, updated_at desc);

create index if not exists nxg_government_opportunities_company_deadline_idx
  on nxg_government_opportunities (company_id, deadline);
