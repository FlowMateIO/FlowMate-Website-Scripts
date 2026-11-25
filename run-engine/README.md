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

## Changelog
- v1.3.1: ticket frame with Zendesk skin, HubSpot skin for crm-record, IssueRecord component with Linear skin (dark), player fix for a freeze on the first frame, Slack buttons only on the latest app message, Slack @mentions, compact card fields for text values, numbered rules in the agent workspace.
- v1.3.0: post-list and crm-lookup frames, CampaignLeads component, Attio, Lemlist and Slack skins, hero.step, streaming lists, counters, play/pause.
- v1.2.3: first release.
