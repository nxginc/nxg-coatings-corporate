CREATE TABLE IF NOT EXISTS nxg_public_request_rate_limits (
  route text NOT NULL,
  identifier_hash char(64) NOT NULL,
  window_started_at timestamptz NOT NULL,
  request_count integer NOT NULL CHECK (request_count > 0),
  PRIMARY KEY (route, identifier_hash)
);

CREATE INDEX IF NOT EXISTS nxg_public_request_rate_limits_window_idx
  ON nxg_public_request_rate_limits (window_started_at);

ALTER TABLE nxg_partner_applications
  ADD COLUMN IF NOT EXISTS payload_hash char(64);

CREATE TABLE IF NOT EXISTS nxg_contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid NOT NULL,
  idempotency_key uuid NOT NULL,
  payload_hash char(64) NOT NULL,
  state text NOT NULL CHECK (state IN ('processing', 'sent', 'uncertain')),
  message_id text,
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz,
  UNIQUE (company_id, idempotency_key)
);
