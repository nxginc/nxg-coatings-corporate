CREATE SEQUENCE IF NOT EXISTS nxg_partner_application_id_seq;

CREATE TABLE IF NOT EXISTS nxg_partner_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nxg_id text NOT NULL UNIQUE DEFAULT (
    'NXGPR-' || to_char(nextval('nxg_partner_application_id_seq'), 'FM000000')
  ),
  company_id uuid NOT NULL,
  idempotency_key uuid NOT NULL,
  contact_name text NOT NULL,
  company_name text NOT NULL,
  email text NOT NULL,
  phone text,
  trade_types text[] NOT NULL CHECK (cardinality(trade_types) > 0),
  service_areas text[] NOT NULL CHECK (cardinality(service_areas) > 0),
  website_url text,
  experience_summary text,
  status text NOT NULL DEFAULT 'pending'
    CHECK (status IN ('pending', 'under_review', 'approved', 'declined')),
  consent_at timestamptz NOT NULL,
  reviewed_by text,
  reviewed_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (company_id, idempotency_key)
);

CREATE UNIQUE INDEX IF NOT EXISTS nxg_partner_applications_open_email_idx
  ON nxg_partner_applications (company_id, email)
  WHERE status IN ('pending', 'under_review');

CREATE INDEX IF NOT EXISTS nxg_partner_applications_company_status_idx
  ON nxg_partner_applications (company_id, status, created_at DESC);

CREATE TABLE IF NOT EXISTS nxg_audit_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  request_id uuid NOT NULL,
  actor_type text NOT NULL CHECK (actor_type IN ('public', 'admin', 'system')),
  actor_email text,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid NOT NULL,
  details jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS nxg_audit_events_company_entity_idx
  ON nxg_audit_events (company_id, entity_type, entity_id, created_at DESC);
