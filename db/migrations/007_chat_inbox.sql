create table if not exists nxg_chat_conversations (
  id uuid primary key default gen_random_uuid(),
  company_id text not null,
  visitor_token_hash text not null,
  status text not null default 'open' check (status in ('open', 'closed')),
  page_path text not null default '/',
  messages jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  last_message_at timestamptz not null default now()
);

create index if not exists nxg_chat_conversations_company_activity_idx
  on nxg_chat_conversations (company_id, status, last_message_at desc);
