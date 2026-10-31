alter table nxg_campaigns
  add column if not exists ad_plan jsonb not null default '{}'::jsonb;
