# Meta Regional Campaign Rotation

## Audience Setup

Use `geo-targeting-groups.json` as a service-area starting point, not as a claim that Meta targeting is already configured. Resolve each city's supported Meta location ID from the connected ad account and review the resulting map in Ads Manager. The group list deliberately uses cities already named in `SERVICE_AREAS`; it does not invent postal codes, radii, or provider IDs.

Keep targeting geographic and service-availability based. Do not infer or target sensitive traits or protected classes. Before launch, check Meta's current ad policy and whether the specific offer or creative falls into a restricted/special category. Obtain any required consent before using customer or website audience data.

## Rotation

1. Create a campaign draft for one service and one approved regional group.
2. Attach an approved creative variant and matching landing page, UTM values, and conversion event.
3. Keep placements/audience/budget stable during the initial observation window so the result is interpretable.
4. Review after at least seven days; rotate one creative variable no more often than the 14-day cadence unless an operator documents a policy, factual, or creative defect.
5. Preserve the prior ad and its metrics; create a new version rather than overwriting the historical record.
6. Pause a group only after an operator reviews delivery, lead quality, service coverage, and attribution. No automated budget increase, audience expansion, or campaign publication is enabled by this configuration.

## Organic Posts and Facebook Groups

Route Page and Instagram organic drafts to Vista Social only after approval and provider readiness. This workflow does not auto-post into arbitrary Facebook Groups. Group distribution is a human-managed handoff because group permissions, API availability, and posting rules differ. Do not treat a Meta Ads audience group as a Facebook community group.

## Rotation Record

For every review, save campaign ID, region group, ad-set/provider IDs, creative/render IDs, audience settings, placements, budget approval, start/end dates, spend, reach, clicks, qualified leads, UTM values, decision, operator, and next review date. Provider IDs and performance values are populated from the connected account, never fabricated in the source manifest.
