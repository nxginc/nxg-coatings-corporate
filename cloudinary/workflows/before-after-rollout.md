# Before/After Rollout Tasks

The slider component and dataset are ready, but the homepage mount is deliberately commented out. Keep the entries at `pending-visual-approval` until each checklist item is complete.

## Colonial Home Exterior

- [ ] Compare the before/after pair visually and confirm it is the same property and scope.
- [ ] Confirm NXG has usage rights and record the rights/consent reference.
- [ ] Confirm alt text, project naming, and any location details with the project owner.
- [ ] Upload copies to Cloudinary staging; retain the ImageKit URLs as source references.
- [ ] Save before/after `public_id`, Cloudinary version, secure URL, and checksum in the dataset/asset registry.
- [ ] Inspect the matched 4:3 crop at mobile and desktop sizes; record reviewer and date.
- [ ] Change status to `approved` only after all checks pass.

## Modern Office Interior

- [ ] Compare the before/after pair visually and confirm it is the same property and scope.
- [ ] Confirm NXG has usage rights and record the rights/consent reference.
- [ ] Confirm alt text, project naming, and any location details with the project owner.
- [ ] Upload copies to Cloudinary staging; retain the ImageKit URLs as source references.
- [ ] Save before/after `public_id`, Cloudinary version, secure URL, and checksum in the dataset/asset registry.
- [ ] Inspect the matched 4:3 crop at mobile and desktop sizes; record reviewer and date.
- [ ] Change status to `approved` only after all checks pass.

## Enablement

- [ ] Update the related records from `pending-visual-approval` to `approved` after sign-off.
- [ ] Remove the JSX TODO comment in `app/page.tsx` and mount only `approvedBeforeAfterProjects`.
- [ ] Decide whether to show the same approved set in `/gallery`; do not add a pair to ad posts automatically.
- [ ] Run keyboard, screen-reader label, reduced-motion, mobile, and image-load checks.