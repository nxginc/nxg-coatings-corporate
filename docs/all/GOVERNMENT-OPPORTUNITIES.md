# Government opportunity tracker

The authenticated `/dashboard/government` workspace records sourced state and
federal funding opportunities for manual review. It starts empty; no grant or
eligibility data is asserted without a source supplied by an operator.
Apply database migrations `001` through `005` in order before using the tracker.

## Workflow and controls

- Add an opportunity with its funder, jurisdiction, authoritative HTTPS source,
  optional application link, deadline, and source-backed eligibility notes.
- Review eligibility and any required company qualifications against the
  original source. The dashboard's company profile contains canonical contact
  details only; it does not assert registrations, certifications, ownership,
  insurance, financial status, or past performance.
- Move an opportunity to `review_required` only after a draft has been prepared
  for a human reviewer. `submitted` is a manual record of an external action,
  not a portal submission performed by this application.
- Status changes and opportunity creation are recorded in the admin audit log.

No government portal login, browser automation, application submission, or
batch submission is implemented. Before adding one, provide the authorized
portal, verified company evidence, applicable program rules, and an explicit
human approval step. Never invent answers or submit attestations automatically.
