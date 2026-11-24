# FMRun - run animation engine

Plays a workflow run script (JSON from the Webflow CMS field "Run script") on flowmate.io workflow pages and, later, the homepage. The run script format is defined in run-script-spec.md (FlowMate 3.0 project).

## Files
- `fmrun.js`, `fmrun.css`: readable source
- `fmrun.min.js`, `fmrun.min.css`: minified files loaded by Webflow

## Releases
Every release is tagged `vX.Y.Z` (the same number as `VERSION` in fmrun.js). Webflow always loads a fixed tag via jsDelivr, never `main`, so nothing on the site changes by accident:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/FlowMateIO/FlowMate-Website-Scripts@vX.Y.Z/run-engine/fmrun.min.css">
<script src="https://cdn.jsdelivr.net/gh/FlowMateIO/FlowMate-Website-Scripts@vX.Y.Z/run-engine/fmrun.min.js" defer></script>
```

To update or roll back, change the tag in Webflow. Never move or reuse an existing tag: jsDelivr caches tagged files permanently.

## Staging checks
On *.webflow.io the engine shows a check box only when a run script check fails or warns. Add `?fmrun-check` to any page URL to see the full report.
