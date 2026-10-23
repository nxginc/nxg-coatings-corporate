# NXG Entity Contract

All core entities use:

- `id`: UUIDv7 primary key where available
- `nxg_id`: immutable human-facing ID
- `org_id`
- `status`
- `created_at`
- `updated_at`
- `created_by`
- `updated_by`
- `metadata`

Human IDs:
- NXGC
- NXGCTR
- NXGP
- NXGPRJ
- NXGTAKE
- NXGPROP
- NXGBID
- NXGPO
- NXGINV
- NXGPMT
- NXGPOST
- NXGASSET
- NXGCAM
- NXGAG
- NXGDOC

Do not use the human-readable ID as the database primary key.

Relationships must be explicit and queryable. Avoid storing critical relational data only inside metadata JSON.
