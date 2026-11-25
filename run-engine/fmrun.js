/*! FlowMate run animation engine v1.3.1. Plays a run script (run-script-spec.md) from the page's CMS data. */
(function () {
  'use strict';
  if (window.FMRun) return;
  var VERSION = '1.3.1';
  var APPS = { flowmate: { n: 'FlowMate', fm: true } };
  var CAST = {};
  var WS = { n: 'Brindlewood', logo: '' };
  var TONES = ['#0B0B2E', '#3A3570', '#6557FF', '#1E9E6E', '#2F6BD8', '#B4590E', '#D2453B'];
  var initialsOf = function (n) { return String(n || '').split(/\s+/).filter(Boolean).map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase(); };

  var castByName = function (name) { return Object.entries(CAST).find(function (e) { return e[1].n === name; }); };
  /* Apps and cast come from the page: any element with data-fmrun-app="slug" or data-fmrun-cast="cast-id",
     a data-fmrun-name attribute (or its text) and an <img> inside. */
  function loadRegistry(doc) {
    APPS = { flowmate: { n: 'FlowMate', fm: true } };
    CAST = {};
    doc.querySelectorAll('[data-fmrun-app]').forEach(function (el) {
      var slug = (el.getAttribute('data-fmrun-app') || '').trim();
      if (!slug || APPS[slug]) return;
      var img = el.tagName === 'IMG' ? el : el.querySelector('img');
      var src = img && (img.currentSrc || img.getAttribute('src'));
      APPS[slug] = { n: (el.getAttribute('data-fmrun-name') || el.textContent || slug).trim(), icon: src && !/placeholder/i.test(src) ? src : '' };
    });
    /* The example customer's workspace (name and logo), shown in app skins: data-fmrun-workspace with an <img>. */
    var wsEl = doc.querySelector('[data-fmrun-workspace]');
    if (wsEl) {
      var wImg = wsEl.tagName === 'IMG' ? wsEl : wsEl.querySelector('img');
      WS = { n: (wsEl.getAttribute('data-fmrun-name') || wsEl.textContent || 'Brindlewood').trim(), logo: wImg ? (wImg.currentSrc || wImg.getAttribute('src') || '') : '' };
    }
    var i = 0;
    doc.querySelectorAll('[data-fmrun-cast]').forEach(function (el) {
      var id = (el.getAttribute('data-fmrun-cast') || '').trim();
      if (!id || CAST[id]) return;
      var img = el.tagName === 'IMG' ? el : el.querySelector('img');
      var src = img && (img.currentSrc || img.getAttribute('src'));
      var n = (el.getAttribute('data-fmrun-name') || el.textContent || id).trim();
      CAST[id] = { n: n, i: initialsOf(n), bg: TONES[i++ % TONES.length], photo: src && !/placeholder/i.test(src) ? src : '' };
    });
  }
const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const svg = (d, s, c, w) => '<svg width="' + s + '" height="' + s + '" viewBox="0 0 24 24" fill="none" stroke="' + c + '" stroke-width="' + w + '" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex:none"><path d="' + d + '"/></svg>';
const SP = 'M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z';
const CHECK = 'M5 12l5 5L20 7';
const fmLogo = (s) => '<svg width="' + s + '" height="' + s + '" viewBox="0 0 256 256" aria-hidden="true" style="flex:none"><rect width="256" height="256" rx="128" fill="#6557FF"/><path fill="#fff" d="M121.4 73.1C122.9 74.6 123.8 76.7 123.8 78.8L123.8 132.2C123.8 143.6 114.5 152.8 103.2 152.8C91.8 152.8 82.5 143.6 82.5 132.2L82.5 113.5C82.5 110.9 80.4 108.8 77.8 108.8C75.2 108.8 73.1 110.9 73.1 113.5L73.1 132.2C73.1 143.6 63.9 152.8 52.5 152.8C41.1 152.8 31.9 143.6 31.9 132.2L31.9 112.1C31.9 107.7 35.4 104.1 39.9 104.1C44.3 104.1 47.8 107.7 47.8 112.1L47.8 136.9C47.8 139.5 49.9 141.6 52.5 141.6C55.1 141.6 57.2 139.5 57.2 136.9L57.2 115.3C57.2 103.9 66.4 94.7 77.8 94.7C89.2 94.7 98.5 103.9 98.5 115.3L98.5 136.9C98.5 139.5 100.6 141.6 103.2 141.6C105.7 141.6 107.8 139.5 107.8 136.9L107.8 78.8C107.8 74.4 111.4 70.8 115.8 70.8C117.9 70.8 120 71.6 121.4 73.1ZM134.6 182.4C133.1 180.9 132.2 178.8 132.2 176.7L132.2 115.3C132.2 103.9 141.5 94.7 152.8 94.7C164.2 94.7 173.5 103.9 173.5 115.3L173.5 134.1C173.5 136.7 175.6 138.8 178.2 138.8C180.8 138.8 182.9 136.7 182.9 134.1L182.9 115.3C182.9 103.9 192.1 94.7 203.5 94.7C214.9 94.7 224.1 103.9 224.1 115.3L224.1 135.4C224.1 139.8 220.6 143.4 216.1 143.4C211.7 143.4 208.2 139.8 208.2 135.4L208.2 110.7C208.2 108.1 206.1 106 203.5 106C200.9 106 198.8 108.1 198.8 110.7L198.8 132.2C198.8 143.6 189.6 152.8 178.2 152.8C166.8 152.8 157.5 143.6 157.5 132.2L157.5 110.7C157.5 108.1 155.4 106 152.8 106C150.3 106 148.2 108.1 148.2 110.7L148.2 176.7C148.2 181.1 144.6 184.7 140.2 184.7C138.1 184.7 136 183.9 134.6 182.4Z"/></svg>';
const appChip = (slug, s) => {
  const a = APPS[slug] || { n: slug };
  if (a.fm) return fmLogo(s);
  if (a.icon) return '<img class="fmrun-appimg" src="' + esc(a.icon) + '" alt="" width="' + s + '" height="' + s + '" style="width:' + s + 'px;height:' + s + 'px">';
  return '<span class="fmrun-mono" style="width:' + s + 'px;height:' + s + 'px;background:#6B6E83;font-size:' + Math.round(s * 0.42) + 'px">' + esc(String(a.n || slug).slice(0, 2)) + '</span>';
};
const avatar = (id, s) => {
  const c = CAST[id];
  if (!c) return '<span class="fmrun-av" style="width:' + s + 'px;height:' + s + 'px;font-size:' + Math.round(s * 0.38) + 'px;background:#6B6E83">' + esc(String(id).slice(0, 2).toUpperCase()) + '</span>';
  const ph = (CAST[id] || {}).photo;
  return '<span class="fmrun-av" style="width:' + s + 'px;height:' + s + 'px;font-size:' + Math.round(s * 0.38) + 'px;background:' + c.bg + '">' + (ph ? '<img src="' + ph + '" alt="">' : esc(c.i)) + '</span>';
};
const initials = (name, s, bg) => {
  const hit = castByName(name);
  if (hit) return avatar(hit[0], s);
  const i = name.split(/\s+/).map((w) => w[0]).join('').slice(0, 2).toUpperCase();
  return '<span class="fmrun-av" style="width:' + s + 'px;height:' + s + 'px;font-size:' + Math.round(s * 0.38) + 'px;background:' + (bg || '#B4B6C4') + '">' + esc(i) + '</span>';
};

/* Running counter: when fresh, the leading number counts from the "from" text's number to the "to" text's number. */
function counter(fromTxt, toTxt, on, fresh, dur) {
  const txt = on ? toTxt : fromTxt;
  const m = String(toTxt || '').match(/^([\d,]+)(.*)$/);
  if (!on || !fresh || !m) return esc(txt);
  const to = Number(m[1].replace(/,/g, ''));
  const fm = String(fromTxt || '').match(/^([\d,]+)/);
  const from = fm ? Number(fm[1].replace(/,/g, '')) : 0;
  return '<span class="fmrun-cnt" style="--fmrun-from:' + from + ';--fmrun-to:' + to + ';animation-duration:' + (dur * 0.85).toFixed(2) + 's" aria-label="' + esc(toTxt) + '"></span>' + esc(m[2]);
}
/* Streaming list: while streaming, the stream rows run up from below and the list settles on its showcase rows. */
function streamWrap(showHtml, streamHtml, nShow, nStream, V) {
  if (!V.streaming() || !nStream) return '<div class="fmrun-list">' + showHtml + '</div>';
  const f = (nStream / (nStream + nShow)) * 100;
  return '<div class="fmrun-list fmrun-streaming" style="--fmrun-s0:28%;--fmrun-s1:' + (-f).toFixed(2) + '%;animation-duration:' + (V.dur * 0.9).toFixed(2) + 's">' + streamHtml + showHtml + '</div>';
}

/* Visibility: a key listed in any line's "show" stays hidden until that line is active.
   A key in the active line's "mark" gets the highlight. Keys not listed are always visible. */
function keyState(step, active, final) {
  const showAt = {};
  step.lines.forEach((l, i) => (l.show || []).forEach((k) => { if (!(k in showAt)) showAt[k] = i; }));
  const marks = final || active < 0 ? [] : (step.lines[active].mark || []);
  const on = (k) => final || !(k in showAt) || showAt[k] <= active;
  const enter = (k) => (!final && showAt[k] === active ? ' fmrun-k-enter' : '');
  const dur = active >= 0 ? (step.lines[active].dur || 2.4) : 2.4;
  return {
    on,
    enter,
    dur,
    /* a list "streams" (scrolls up through its stream rows) while the line that shows "stream" is active */
    streaming: () => !final && showAt.stream === active,
    fresh: (k) => !final && showAt[k] === active,
    cls: (k) => (on(k) ? enter(k) : 'fmrun-k-hidden') + (marks.includes(k) ? ' fmrun-k-mark' : ''),
    mark: (k) => (marks.includes(k) ? ' fmrun-k-mark' : ''),
  };
}

const wsTile = (s, r, bg, fg) => WS.logo
  ? '<img src="' + esc(WS.logo) + '" alt="" style="width:' + s + 'px;height:' + s + 'px;border-radius:' + r + 'px;display:block;flex:none">'
  : '<span style="width:' + s + 'px;height:' + s + 'px;border-radius:' + r + 'px;background:' + bg + ';color:' + fg + ';font-size:' + Math.round(s * 0.5) + 'px;font-weight:800;display:inline-flex;align-items:center;justify-content:center;flex:none">' + esc(WS.n.charAt(0)) + '</span>';
/* App skins: the frame type sets what happens, the skin sets how the app looks. A skin is chosen by the step's app;
   apps without a skin use the frame's neutral look. */
const SKIN_STATUS = { new: ['New', 'fmrun-at-green'], customer: ['Customer', 'fmrun-at-blue'], lead: ['Open lead', 'fmrun-at-yellow'], past: ['Past contact', 'fmrun-at-pink'] };
const atIcon = (d) => '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex:none"><path d="' + d + '"/></svg>';
const AT = {
  bell: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21h4',
  task: 'M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9',
  note: 'M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9zM14 3v6h6',
  mail: 'M4 5h16v14H4zM4 6l8 7 8-7',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  sort: 'M3 6h18M6 12h12M10 18h4',
  filter: 'M4 5h16l-6 8v6l-4-2v-4z',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5',
};
const atSquare = (bg) => '<span style="width:14px;height:14px;border-radius:4px;background:' + bg + ';flex:none"></span>';

function attioLookup(c, V, step) {
  const cnt = c.count || {};
  const showS = V.on('skips'), showR = V.on('record');
  const all = c.rows || [];
  const n = all.length;
  const coLogo = (name) => {
    const h = [...String(name)].reduce((a, ch) => a + ch.charCodeAt(0), 0);
    const bg = ['#E8EEFF', '#FFF1E6', '#E9F8F0', '#F4ECFF', '#FFEDEF', '#EAF6FB'][h % 6];
    const fg = ['#3A5BD9', '#C46A1B', '#1E8A5A', '#7A4FD0', '#C8414E', '#2A7FA6'][h % 6];
    return '<span style="width:16px;height:16px;border-radius:4px;background:' + bg + ';color:' + fg + ';font-size:9px;font-weight:800;display:inline-flex;align-items:center;justify-content:center;flex:none">' + esc(String(name).charAt(0)) + '</span>';
  };
  const row = (r, i, filler) => {
    const skip = showS && (r.status === 'customer' || r.status === 'lead');
    const st = SKIN_STATUS[r.status] || [r.status, 'fmrun-at-gray'];
    const label = skip ? st[0] + ', skipped' : r.status === 'past' && showR ? 'Signal added' : st[0];
    const cls = skip ? 'fmrun-at-gray' : r.status === 'past' && showR ? 'fmrun-at-purple' : st[1];
    return '<div class="fmrun-at-row' + (filler ? '' : V.mark('row-' + (i + 1))) + (skip ? ' fmrun-struck' : '') + (!filler && r.open && showR ? ' fmrun-at-sel' : '') + '" style="' + (skip ? 'opacity:.5;' : '') + '">' +
      '<span class="fmrun-at-cb"></span>' +
      '<span class="fmrun-at-c" style="width:170px;gap:7px">' + initials(r.name, 20) + '<b style="font-weight:600">' + esc(r.name) + '</b></span>' +
      '<span class="fmrun-at-c" style="width:160px;gap:7px">' + coLogo(r.company) + '<span>' + esc(r.company) + '</span></span>' +
      '<span class="fmrun-at-c" style="width:150px"><span class="fmrun-at-pill ' + cls + '">' + esc(label) + '</span></span>' +
      '<span class="fmrun-at-c" style="flex:1;color:#6E7179">' + esc(r.source || 'Comment on a post') + '</span></div>';
  };
  const head = '<div class="fmrun-at-head"><span class="fmrun-at-cb"></span><span class="fmrun-at-c" style="width:170px">Person</span><span class="fmrun-at-c" style="width:160px">Company</span><span class="fmrun-at-c" style="width:150px">CRM status</span><span class="fmrun-at-c" style="flex:1">Source</span></div>';
  const list = V.on('rows')
    ? streamWrap(all.map((r, i) => row(r, i, false)).join(''), (c.stream || []).map((r, i) => row(r, i, true)).join(''), n, (c.stream || []).length, V).replace('class="fmrun-list', 'class="fmrun-list fmrun-at-list')
    : '<div class="fmrun-list fmrun-at-list"><div class="fmrun-at-row"><span class="fmrun-sk" style="width:55%"></span></div><div class="fmrun-at-row"><span class="fmrun-sk" style="width:40%"></span></div></div>';
  const rec = c.record || {};
  const drawer = showR
    ? '<div class="fmrun-at-drawer' + V.enter('record') + '"><div style="display:flex;align-items:center;gap:10px;padding:14px 16px 10px">' + initials(rec.name || '', 32) + '<div style="flex:1;min-width:0"><div style="font-weight:700;font-size:15px">' + esc(rec.name) + '</div><div style="font-size:12px;color:#6E7179">' + esc(rec.title) + '</div></div>' + (rec.owner ? avatar(rec.owner, 24) : '') + '</div>' +
      '<div style="display:flex;gap:16px;padding:0 16px;border-bottom:1px solid #EEEFF1;font-size:12.5px;color:#6E7179"><span>Overview</span><span style="color:#1F2328;font-weight:600;border-bottom:2px solid #1F2328;padding-bottom:7px">Notes</span><span>Tasks</span><span>Emails</span></div>' +
      '<div style="padding:12px 16px;display:flex;flex-direction:column;gap:10px">' +
      (rec.fields || []).map((f) => '<div style="display:flex;justify-content:space-between;gap:10px;font-size:12px"><span style="color:#6E7179">' + esc(f.label) + '</span><span style="font-weight:600;text-align:right">' + esc(f.value) + '</span></div>').join('') +
      (rec.note ? '<div style="border:1px solid #EEEFF1;border-radius:8px;padding:10px 12px;font-size:12.5px;line-height:1.5;background:#fff"><div style="display:flex;align-items:center;gap:6px;color:#6E7179;font-size:11px">' + svg(SP, 11, '#6557FF', 2.4) + esc(rec.note.meta) + '</div><div style="font-weight:700;margin-top:2px">' + esc(rec.note.title) + '</div>' + rec.note.lines.map((l) => '<div style="color:#3B3E45">' + esc(l) + '</div>').join('') + '</div>' : '') +
      (rec.activity ? '<div style="border:1px solid #EEEFF1;border-radius:8px;padding:9px 12px;display:flex;align-items:center;gap:9px;font-size:12.5px;background:#fff"><span style="width:14px;height:14px;border-radius:4px;border:1.5px solid #B4B7BF;flex:none"></span><span style="flex:1;font-weight:600">' + esc(rec.activity.title) + '</span><span style="color:#6E7179;white-space:nowrap">' + esc(rec.activity.due) + ' · ' + esc(rec.activity.owner) + '</span></div>' : '') + '</div></div>'
    : '';
  const nav = (ic, t, on) => '<div class="fmrun-at-nav' + (on ? ' fmrun-at-on' : '') + '">' + ic + '<span>' + esc(t) + '</span></div>';
  const side = '<div class="fmrun-side fmrun-at-side">' +
    '<div style="display:flex;align-items:center;gap:8px;padding:2px 6px 12px">' + wsTile(20, 6, '#1F2328', '#fff') + '<b style="font-size:13px;font-weight:700">' + esc(WS.n) + '</b><span style="color:#9A9DA5;font-size:10px">▾</span></div>' +
    '<div class="fmrun-at-qa">' + atIcon(AT.search) + '<span>Quick actions</span><span style="margin-left:auto;color:#9A9DA5;font-size:10px">⌘K</span></div>' +
    nav(atIcon(AT.bell), 'Notifications') + nav(atIcon(AT.task), 'Tasks') + nav(atIcon(AT.note), 'Notes') + nav(atIcon(AT.mail), 'Emails') + nav(atIcon(AT.chart), 'Reports') +
    '<div class="fmrun-at-sec">Records</div>' + nav(atSquare('#3B82F6'), 'Companies') + nav(atSquare('#3B82F6'), 'People', true) + nav(atSquare('#F59E0B'), 'Deals') +
    '<div class="fmrun-at-sec">Lists</div>' + nav(atSquare('#EC4899'), 'Inbound leads') + nav(atSquare('#8B5CF6'), 'Social signals') + '</div>';
  const main = '<div style="flex:1;min-width:0;display:flex;flex-direction:column;position:relative;background:#fff">' +
    '<div style="height:40px;flex:none;display:flex;align-items:center;gap:8px;padding:0 14px;border-bottom:1px solid #EEEFF1">' + atSquare('#3B82F6') + '<b style="font-size:13px;font-weight:600">People</b></div>' +
    '<div style="height:42px;flex:none;display:flex;align-items:center;gap:8px;padding:0 14px">' +
    '<span class="fmrun-at-chip">' + atSquare('#22C55E') + 'All People ▾</span><span class="fmrun-at-chip">View settings ▾</span>' +
    '<span style="margin-left:auto;background:#266DF0;color:#fff;font-size:12px;font-weight:600;padding:5px 10px;border-radius:7px">+ New Person</span></div>' +
    '<div style="height:36px;flex:none;display:flex;align-items:center;gap:8px;padding:0 14px;border-bottom:1px solid #EEEFF1"><span class="fmrun-at-chip">' + atIcon(AT.sort) + 'Sorted by <b style="font-weight:600;margin-left:3px">Lookup time</b></span><span class="fmrun-at-chip">' + atIcon(AT.filter) + 'Filter</span></div>' +
    head + '<div class="fmrun-listbox">' + list + '</div>' +
    '<div class="fmrun-at-foot"><span class="' + V.mark('count') + '" style="font-weight:600;color:#1F2328;font-variant-numeric:tabular-nums;padding:1px 4px">' + counter(cnt.from, cnt.to, V.on('count'), V.fresh('count'), V.dur) + '</span><span>+ Add calculation</span></div>' +
    drawer + '</div>';
  return '<div class="fmrun-at" style="position:absolute;inset:0;display:flex">' + side + main + '</div>';
}

const SKINS = { 'crm-lookup': { attio: attioLookup } };
function skinFor(type, app) { return (SKINS[type] || {})[app]; }

function lemlistCampaign(c, V, step) {
  const cnt = c.count || {};
  const added = V.on('leads'), sched = V.on('schedule'), showE = V.on('email');
  const all = c.leads || [];
  const n = all.length;
  const tones = ['#7C5CFF', '#22A06B', '#F08A24', '#2F80ED', '#E5484D', '#0FA5A5'];
  const av = (name, i) => '<span style="width:22px;height:22px;border-radius:50%;background:' + tones[[...String(name)].reduce((a, ch) => a + ch.charCodeAt(0), 0) % tones.length] + ';color:#fff;font-size:9px;font-weight:700;display:inline-flex;align-items:center;justify-content:center;flex:none">' + esc(initialsOf(name)) + '</span>';
  const status = (filler) => sched && !filler
    ? '<span class="fmrun-lm-st fmrun-lm-ok' + V.enter('schedule') + '">' + svg(CHECK, 11, '#1F8A4C', 3) + 'Scheduled</span>'
    : '<span class="fmrun-lm-st fmrun-lm-todo"><span style="width:10px;height:10px;border-radius:50%;background:#7C8DF5;flex:none"></span>To launch</span>';
  const row = (l, i, filler) => '<div class="fmrun-lm-row' + (!filler && l.open && showE ? ' fmrun-lm-sel' : '') + '">' +
    '<span class="fmrun-lm-cb"></span>' +
    '<span class="fmrun-lm-c" style="width:150px;gap:7px">' + av(l.name, i) + '<b style="font-weight:600">' + esc(l.name) + '</b></span>' +
    '<span class="fmrun-lm-c fmrun-lm-ai" style="flex:1"><span class="fmrun-lm-ib' + (!filler && V.fresh('leads') ? ' fmrun-k-enter' : '') + '" style="animation-delay:' + (filler ? 0 : (0.2 + i * (V.dur * 0.6 / n)).toFixed(2)) + 's">' + esc(l.icebreaker) + '</span></span>' +
    '<span class="fmrun-lm-c" style="width:116px">' + status(filler) + '</span>' +
    '<span class="fmrun-lm-c" style="width:112px"><span class="fmrun-lm-tz">' + esc(l.tz || '') + '<span style="color:#9A9DA5">▾</span></span></span>' +
    '<span class="fmrun-lm-c" style="width:130px;color:#3B3E45">' + esc(l.company) + '</span></div>';
  const head = '<div class="fmrun-lm-head"><span class="fmrun-lm-cb"></span><span class="fmrun-lm-c" style="width:150px">Full name</span>' +
    '<span class="fmrun-lm-c" style="flex:1;gap:5px;color:#4638C9">' + svg(SP, 11, '#6557FF', 2.4) + esc(c.fieldColumn || 'Icebreaker') + '<span class="fmrun-agtag" style="margin-left:4px">FlowMate agent</span></span>' +
    '<span class="fmrun-lm-c" style="width:116px">Status</span><span class="fmrun-lm-c" style="width:112px">Timezone</span><span class="fmrun-lm-c" style="width:130px">Company name</span></div>';
  const list = added
    ? streamWrap(all.map((l, i) => row(l, i, false)).join(''), (c.stream || []).map((l, i) => row(l, i, true)).join(''), n, (c.stream || []).length, V).replace('class="fmrun-list', 'class="fmrun-list fmrun-at-list')
    : '<div class="fmrun-list fmrun-at-list"><div class="fmrun-lm-row"><span class="fmrun-sk" style="width:55%"></span></div><div class="fmrun-lm-row"><span class="fmrun-sk" style="width:40%"></span></div></div>';
  const em = c.email || {};
  let fi = 0;
  const parts = (em.parts || []).map((p) => {
    const txt = esc(p.text).replace(/\n/g, '<br>');
    if (!p.field) return '<p style="margin:0">' + txt + '</p>';
    const d = (fi++ * Math.min(1.1, V.dur * 0.4)).toFixed(2);
    return '<div class="fmrun-field' + V.mark('field-' + p.field) + '" style="animation-delay:' + d + 's"><span class="fmrun-field-lbl"><span class="fmrun-lm-var">{{' + esc(p.variable || p.field) + '}}</span>' + svg(SP, 10, '#6557FF', 2.6) + esc(p.label || 'Written by the FlowMate agent') + '</span>' + txt + '</div>';
  }).join('');
  const acts = (c.actions || []).map((a) => '<span class="fmrun-act" style="font-weight:600;font-size:12px;padding:6px 11px;border-radius:7px;border:1px solid #E1E3E8;background:#fff">' + esc(a) + '</span>').join('');
  const panel = showE
    ? '<div class="fmrun-lm-panel' + V.enter('email') + '">' +
      '<div style="display:flex;align-items:center;gap:8px;padding:10px 14px;border-bottom:1px solid #EEEFF2"><span style="width:24px;height:24px;border-radius:6px;background:#E6F6EC;display:inline-flex;align-items:center;justify-content:center">' + svg('M4 6h16v12H4zM4 7l8 6 8-6', 14, '#1F8A4C', 2) + '</span><b style="font-weight:600;font-size:13px">Email</b><span style="font-size:11px;color:#8A8D96">Step 1</span>' +
      '<span class="fmrun-lm-btn" style="margin-left:auto">Automated ▾</span><span class="fmrun-lm-btn" style="background:#F1F4FF;border-color:#D7E0FF;color:#2F5BE0">Preview: ' + esc((em.to || '').split('@')[0]) + '</span></div>' +
      '<div style="padding:10px 14px;display:flex;flex-direction:column;gap:8px;font-size:12.5px">' +
      '<div><div class="fmrun-lm-lbl">Sender</div><span class="fmrun-lm-box" style="display:inline-flex;align-items:center;gap:7px">' + initials(em.from || '', 18) + esc(em.from) + '<span style="color:#9A9DA5">▾</span></span></div>' +
      '<div><div class="fmrun-lm-lbl">Subject line</div><div class="fmrun-lm-box">' + esc(em.subject) + '</div></div>' +
      '<div><div class="fmrun-lm-lbl">Message</div><div class="fmrun-lm-box" style="display:flex;flex-direction:column;gap:8px;line-height:1.5;color:#26282E">' + parts + '</div></div>' +
      '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px"><span class="' + V.cls('schedule') + '" style="font-size:12px;font-weight:600;color:#1F8A4C">' + esc(em.status) + '</span><span class="' + V.cls('actions') + '" style="display:flex;gap:6px">' + acts + '</span></div></div></div>'
    : '';
  const tab = (t, on, extra) => '<span class="fmrun-lm-tab' + (on ? ' fmrun-lm-tab-on' : '') + '">' + esc(t) + (extra || '') + '</span>';
  const launchN = '<span class="' + V.mark('count') + '" style="margin-left:5px;font-size:11px;color:#6E7179;background:#F1F1F3;border-radius:5px;padding:0 5px;font-variant-numeric:tabular-nums">' + counter(cnt.from, cnt.to, V.on('count'), V.fresh('count'), V.dur) + '</span>';
  return '<div class="fmrun-lm" style="position:absolute;inset:0;display:flex;flex-direction:column;background:#fff">' +
    '<div style="height:44px;flex:none;display:flex;align-items:center;gap:10px;padding:0 14px;border-bottom:1px solid #EEEFF2">' + appChip('lemlist', 20) + '<b style="font-weight:600;font-size:13px;white-space:nowrap">' + esc(c.campaign) + '</b>' +
    '<span style="display:inline-flex;align-items:center;gap:5px;background:#EEF2FF;color:#2F5BE0;font-size:11.5px;font-weight:600;padding:3px 8px;border-radius:6px;white-space:nowrap">In progress ▾</span>' +
    '<span style="margin-left:auto;display:flex;align-items:center;gap:4px;font-size:12px;color:#6E7179;white-space:nowrap">' + tab('Sequence', false) + '<span>›</span>' + tab('Leads list', true) + '<span>›</span>' + tab('Launch', false, launchN) + '<span>›</span>' + tab('Performance', false) + '</span>' +
    '<span style="display:inline-flex;align-items:center;gap:5px;background:#E6F6EC;color:#1F8A4C;font-size:11.5px;font-weight:600;padding:4px 9px;border-radius:7px;white-space:nowrap">' + svg(CHECK, 11, '#1F8A4C', 3) + 'All set</span></div>' +
    '<div style="height:42px;flex:none;display:flex;align-items:center;gap:8px;padding:0 14px"><span class="fmrun-lm-btn" style="flex:0 1 220px;color:#9A9DA5">Search for anything</span><span class="fmrun-lm-btn">Filters</span>' +
    '<span class="fmrun-lm-btn" style="margin-left:auto;color:#4638C9">' + svg(SP, 11, '#6557FF', 2.4) + ' AI Columns ▾</span><span style="background:#316BFF;color:#fff;font-size:12px;font-weight:600;padding:6px 11px;border-radius:7px;white-space:nowrap">+ Add leads</span></div>' +
    head + '<div class="fmrun-listbox">' + list + '</div>' +
    '<div class="fmrun-at-foot" style="color:#3B3E45"><span>1 - ' + Math.min(50, Number(String(cnt.to || '').replace(/\D/g, '')) || 50) + ' of ' + esc(String(cnt.to || '').replace(/\D.*$/, '')) + '</span></div>' +
    panel + '</div>';
}
SKINS.CampaignLeads = { lemlist: lemlistCampaign };

function slackChat(c, V, step) {
  const ic = (d, s) => '<svg width="' + (s || 15) + '" height="' + (s || 15) + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex:none"><path d="' + d + '"/></svg>';
  const P = { home: 'M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z', dm: 'M21 12a8 8 0 0 1-12 7l-5 1 1-4a8 8 0 1 1 16-4z', bell: 'M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9M10 21h4', files: 'M8 3h8l4 4v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z', search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5', lock: 'M6 11h12v9H6zM8 11V8a4 4 0 0 1 8 0v3' };
  const ch = c.channel || '# marketing';
  const chName = ch.replace(/^#\s*/, '');
  const rail = '<div class="fmrun-sl-rail">' + wsTile(32, 8, '#fff', '#350D36') +
    [['home', 'Home', 1], ['dm', 'DMs'], ['bell', 'Activity'], ['files', 'Files']].map((x) => '<span class="fmrun-sl-ri' + (x[2] ? ' fmrun-sl-ri-on' : '') + '"><span class="fmrun-sl-rib">' + ic(P[x[0]], 15) + '</span>' + x[1] + '</span>').join('') + '</div>';
  const chan = (n, on, lock) => '<div class="fmrun-sl-ch' + (on ? ' fmrun-sl-ch-on' : '') + '">' + (lock ? ic(P.lock, 12) : '<span style="width:12px;text-align:center;opacity:.8">#</span>') + '<span>' + esc(n) + '</span></div>';
  const dm = (name) => '<div class="fmrun-sl-ch">' + initials(name, 16) + '<span>' + esc(name) + '</span></div>';
  const side = '<div class="fmrun-side fmrun-sl-side"><div style="display:flex;align-items:center;justify-content:space-between;padding:2px 10px 10px"><b style="font-size:15px;color:#fff">' + esc(WS.n) + ' ▾</b></div>' +
    '<div class="fmrun-sl-find">' + ic(P.search, 12) + 'Find a conversation...</div>' +
    '<div class="fmrun-sl-sec">Channels</div>' + chan('general') + chan(chName, true) + chan('sales') + chan('leadership', false, true) + chan('signups') +
    '<div class="fmrun-sl-sec">Direct messages</div>' + dm('Tom Becker') + dm('Lena Kraus') + dm('Maya Singh') +
    '<div class="fmrun-sl-sec">Apps</div><div class="fmrun-sl-ch" style="color:#fff;font-weight:700">' + fmLogo(16) + '<span>FlowMate</span><span style="margin-left:auto;background:#2BAC76;color:#fff;font-size:10px;font-weight:800;border-radius:9px;padding:1px 6px">1</span></div></div>';
  const msgs = (c.messages || []).map((m, i) => {
    const isApp = !!m.app || /flowmate/i.test(m.author || '');
    const head = '<div style="display:flex;align-items:baseline;gap:6px"><b style="font-size:13.5px;font-weight:800">' + esc(m.author) + '</b>' + (isApp ? '<span class="fmrun-sl-app">APP</span>' : '') + '<span style="font-size:11.5px;color:#616061">' + esc(m.time) + '</span></div>';
    const avatarHtml = isApp ? '<span style="width:34px;height:34px;border-radius:7px;background:#EEECFF;display:flex;align-items:center;justify-content:center;flex:none">' + fmLogo(22) + '</span>' : initials(m.author, 34).replace('border-radius:50%', 'border-radius:7px');
    const cd = m.card;
    const card = cd ? '<div class="fmrun-sl-card ' + V.cls('card') + '">' +
      (cd.title ? '<div style="font-weight:800;font-size:13px;margin-bottom:8px">' + esc(cd.title) + '</div>' : '') +
      (cd.fields ? '<div style="display:grid;grid-template-columns:repeat(' + cd.fields.length + ',minmax(0,1fr));gap:6px;margin-bottom:8px">' + cd.fields.map((f) => { const big = cd.fields.every((x) => String(x.value).length <= 5); return '<div style="background:#F8F8F8;border-radius:6px;padding:' + (big ? '7px 9px' : '5px 8px') + '"><div style="font-size:10.5px;color:#616061">' + esc(f.label) + '</div><div style="font-size:' + (big ? 17 : 13) + 'px;font-weight:800;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;font-variant-numeric:tabular-nums">' + esc(f.value) + '</div></div>'; }).join('') + '</div>' : '') +
      (cd.rows || []).map((r) => '<div style="display:flex;align-items:center;gap:8px;margin-top:6px;font-size:12.5px">' + initials(r.name, 20) + '<b style="font-weight:700">' + esc(r.name) + '</b><span style="color:#616061;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(r.detail) + '</span>' + (r.score ? '<span class="fmrun-pill fmrun-p-ok" style="margin-left:auto">' + esc(r.score) + '</span>' : '') + '</div>').join('') +
      (cd.note ? '<div style="margin-top:9px;font-size:12.5px;color:#1D1C1D">' + esc(cd.note) + '</div>' : '') + '</div>' : '';
    const acts = isApp && c.actions && i === (c.messages || []).map((x) => !!x.app || /flowmate/i.test(x.author || '')).lastIndexOf(true) ? '<div class="' + V.cls('actions') + '" style="display:flex;gap:8px;margin-top:8px">' + c.actions.map((a, j) => '<span class="fmrun-act" style="font-weight:700;font-size:12.5px;padding:5px 12px;border-radius:6px;border:1px solid ' + (j === 0 ? '#007A5A' : '#BBBABB') + ';background:' + (j === 0 ? '#007A5A' : '#fff') + ';color:' + (j === 0 ? '#fff' : '#1D1C1D') + '">' + esc(a) + '</span>').join('') + '</div>' : '';
    const day = m.day ? '<div class="fmrun-sl-day"><span>' + esc(m.day) + '</span></div>' : '';
    return day + '<div class="' + V.cls('message-' + (i + 1)) + '" style="display:flex;gap:9px;align-items:flex-start;padding:6px 18px">' + avatarHtml + '<div style="min-width:0;flex:1">' + head + '<div style="font-size:13.5px;line-height:1.46;color:#1D1C1D;margin-top:1px">' + esc(m.text).replace(/@([A-Z][a-z]+(?: [A-Z][a-z]+)?)/g, '<span style="color:#1264A3;background:rgba(29,155,209,.12);border-radius:3px;padding:0 2px;font-weight:600">@$1</span>') + '</div>' + card + acts + '</div></div>';
  }).join('');
  const main = '<div style="flex:1;min-width:0;display:flex;flex-direction:column;background:#fff">' +
    '<div style="height:44px;flex:none;display:flex;align-items:center;gap:8px;padding:0 18px;border-bottom:1px solid #E8E8E8"><b style="font-size:15px;font-weight:800"># ' + esc(chName) + '</b><span style="margin-left:auto;display:flex;align-items:center;gap:5px;font-size:12px;color:#616061;border:1px solid #DDDDDD;border-radius:6px;padding:2px 7px">' + initials('Tom Becker', 14) + initials('Lena Kraus', 14) + ' 8</span></div>' +
    '<div style="height:34px;flex:none;display:flex;align-items:flex-end;gap:16px;padding:0 18px;border-bottom:1px solid #E8E8E8;font-size:12.5px;color:#616061"><span style="color:#1D1C1D;font-weight:700;border-bottom:2px solid #1D1C1D;padding-bottom:7px">Messages</span><span style="padding-bottom:9px">Files & links</span><span style="padding-bottom:9px">Pins</span></div>' +
    '<div style="flex:1;min-height:0;overflow:hidden;display:flex;flex-direction:column;justify-content:flex-end;padding:6px 0">' + msgs + '</div>' +
    '<div style="flex:none;margin:0 18px 14px;border:1px solid #BBBABB;border-radius:8px;overflow:hidden"><div style="height:28px;background:#F8F8F8;display:flex;align-items:center;gap:12px;padding:0 10px;color:#868686;font-size:12px;font-weight:700"><b>B</b><i>I</i><s>S</s></div><div style="padding:9px 12px;font-size:13px;color:#868686">Message #' + esc(chName) + '</div></div></div>';
  return '<div class="fmrun-sl" style="position:absolute;inset:0;display:flex;flex-direction:column"><div class="fmrun-sl-top"><span class="fmrun-sl-search">' + ic(P.search, 12) + 'Search ' + esc(WS.n) + '</span></div><div style="flex:1;min-height:0;display:flex">' + rail + side + main + '</div></div>';
}
SKINS.chat = { slack: slackChat };

/* Frame library */
const FRAMES = {
  meeting(c, V) {
    const tiles = (c.participants || []).map((id) => {
      const p = CAST[id] || { n: id };
      const ph = (CAST[id] || {}).photo;
      return '<div style="position:relative;border-radius:8px;overflow:hidden;background:#2C2C36;display:flex;align-items:center;justify-content:center">' + (ph ? '<img src="' + ph + '" alt="" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 18%">' : '<span style="color:#fff;font-size:28px;font-weight:900">' + esc(p.i || '') + '</span>') + '<span style="position:absolute;left:8px;bottom:8px;background:rgba(11,11,46,.65);color:#fff;font-size:12px;font-weight:700;padding:3px 8px;border-radius:4px">' + esc(p.n) + '</span></div>';
    }).join('');
    const keyLines = (c.transcript || []).filter((l) => l.key);
    const markers = keyLines.map((l) => {
      const [m, s] = l.time.split(':').map(Number);
      const [dm, ds] = (c.duration || '30:00').split(':').map(Number);
      const pct = ((m * 60 + s) / (dm * 60 + ds)) * 100;
      return '<span style="position:absolute;left:' + pct.toFixed(1) + '%;top:-4px;width:14px;height:14px;margin-left:-7px;border-radius:50%;background:#3DE3A5;border:2px solid #1C1C24"></span>';
    }).join('');
    const lit = V.on('moments');
    const tr = (c.transcript || []).map((l) => '<div><span style="color:#6B6E83;font-size:12px">' + esc(l.time) + ' · ' + esc(l.speaker) + '</span><br><span class="fmrun-fx' + (l.key && lit && V.fresh('moments') ? ' fmrun-k-glow' : '') + '" style="border-radius:3px;padding:0 2px;' + (l.key && lit ? 'background:#D9F9EC' : '') + '">' + esc(l.text) + '</span></div>').join('');
    return '<div style="position:absolute;inset:0;display:flex;flex-direction:column"><div class="fmrun-fh">' + appChip('google-meet', 18) + '<b>' + esc(c.title) + '</b><span>Recording · ' + esc(c.duration) + '</span></div>' +
      '<div style="flex:1;display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);min-height:0"><div style="background:#1C1C24;padding:16px;display:flex;flex-direction:column;gap:12px"><div style="flex:1;display:grid;grid-template-columns:1fr 1fr;gap:8px">' + tiles + '</div>' +
      '<div style="position:relative;height:6px;border-radius:3px;background:#8A8A99"><span class="' + V.cls('markers') + '">' + markers + '</span></div><div style="display:flex;justify-content:space-between;color:#8A8A99;font-size:11px"><span>00:00</span><span>' + esc(c.duration) + '</span></div></div>' +
      '<div style="padding:16px;display:flex;flex-direction:column;gap:12px;font-size:14px;line-height:1.5;overflow:hidden"><div style="font-size:11px;font-weight:900;color:#6B6E83">Transcript</div>' + tr + '</div></div></div>';
  },

  workspace(c, V) {
    const rules = (c.rules || []).map((r, i) => '<div class="' + V.mark('rule-' + (i + 1)) + '" style="display:flex;gap:9px;align-items:flex-start;padding:6px 8px;margin:0 -8px;border-radius:8px"><span style="flex:none;width:18px;height:18px;margin-top:1px;border-radius:50%;background:#F0EEFF;color:#6557FF;font-size:10.5px;font-weight:900;display:flex;align-items:center;justify-content:center">' + (i + 1) + '</span><span style="line-height:1.4">' + esc(r) + '</span></div>').join('');
    const mem = (c.memory || []).map((m) => '<span>' + esc(m) + '</span>').join('');
    const out = V.on('output')
      ? (c.output || []).map((o, i) => '<div class="' + V.enter('output') + '" style="animation-delay:' + (i * 0.25) + 's"><span style="font-size:11px;font-weight:900;color:' + (/blocker/i.test(o.label) ? '#D2453B' : '#6B6E83') + '">' + esc(o.label) + '</span><br>' + esc(o.text) + '</div>').join('')
      : '<div style="display:flex;flex-direction:column;gap:10px"><span class="fmrun-sk" style="width:70%"></span><span class="fmrun-sk" style="width:85%"></span><span class="fmrun-sk" style="width:55%"></span></div>';
    return '<div style="position:absolute;inset:0;display:flex;flex-direction:column"><div class="fmrun-fh">' + fmLogo(20) + '<b>FlowMate · Agent workspace</b></div>' +
      '<div style="flex:1;display:grid;grid-template-columns:270px minmax(0,1fr);min-height:0"><div style="background:#FBFBFD;border-right:1px solid #E6E7EE;padding:18px;display:flex;flex-direction:column;gap:12px"><div style="font-size:11px;font-weight:900;color:#6557FF">Your skill</div>' +
      '<div class="' + V.mark('rules') + '" style="background:#fff;border:1px solid #E6E7EE;border-radius:10px;padding:14px;display:flex;flex-direction:column;gap:8px"><div style="font-weight:900;font-size:15px">' + esc(c.rulesTitle) + '</div><div style="display:flex;flex-direction:column;gap:2px;color:#3A3C55">' + rules + '</div></div>' +
      '<div style="font-size:11px;font-weight:900;color:#6B6E83;margin-top:6px">Memory</div><div class="' + V.cls('memory') + '" style="display:flex;flex-direction:column;gap:6px;color:#3A3C55">' + mem + '</div></div>' +
      '<div style="padding:24px 28px;display:flex;flex-direction:column;gap:14px;font-size:15px;line-height:1.5"><div style="font-size:20px;font-weight:900">' + esc(c.outputTitle) + '</div>' + out + '</div></div></div>';
  },

  'crm-record'(c, V, step) {
    const st = c.stages || { list: [], current: -1 };
    const stages = st.list.map((s, i) => '<span style="flex:1;background:' + (i <= st.current ? '#08A742' : '#EEEEF3') + ';color:' + (i <= st.current ? '#fff' : '#6B6E83') + ';padding:5px 0;text-align:center;border-radius:4px">' + esc(s) + '</span>').join('');
    const fields = (c.fields || []).map((f) => {
      const k = f.key, shown = !k || V.on(k);
      const val = shown ? esc(f.value) : (f.from ? esc(f.from) : '<span style="color:#B4B6C4">Empty</span>');
      return '<div style="display:flex;flex-direction:column;gap:2px"><span style="color:#6B6E83;font-size:11px">' + esc(f.label) + '</span><span class="' + (k ? V.mark(k) + (shown ? V.enter(k) : '') : '') + '" style="align-self:flex-start;padding:0 3px;' + (k && shown && f.from ? 'background:#D9F9EC;border-radius:3px;font-weight:700' : '') + '">' + val + '</span></div>';
    }).join('');
    const n = c.note;
    const note = n ? (V.on('note')
      ? '<div class="' + V.mark('note') + V.enter('note') + '" style="background:#FFF6D6;border:1px solid #F2E2A6;border-radius:8px;padding:12px 14px;display:flex;flex-direction:column;gap:5px;line-height:1.5"><div style="color:#6B6E83;font-size:12px">' + esc(n.meta) + '</div><div style="font-weight:900">' + esc(n.title) + '</div>' + n.lines.map((l) => '<div>' + esc(l) + '</div>').join('') + '</div>'
      : '<div style="background:#fff;border:1px solid #E6E7EE;border-radius:8px;padding:12px 14px;display:flex;flex-direction:column;gap:8px"><span class="fmrun-sk" style="width:40%"></span><span class="fmrun-sk" style="width:85%"></span></div>') : '';
    const a = c.activity;
    const act = a ? '<div class="' + V.cls('activity') + '" style="background:#fff;border:1px solid #E6E7EE;border-radius:8px;padding:10px 14px;display:flex;align-items:center;gap:10px"><span style="width:20px;height:20px;border-radius:50%;border:2px solid #08A742;flex:none"></span><span style="flex:1;font-weight:700">' + esc(a.title) + '</span><span style="color:#6B6E83;white-space:nowrap">' + esc(a.due) + ' · ' + esc(a.owner) + '</span></div>' : '';
    return '<div style="position:absolute;inset:0;display:flex"><div class="fmrun-side" style="width:48px;flex:none;background:#1F1B4D;display:flex;flex-direction:column;align-items:center;gap:14px;padding-top:12px">' + appChip(step.app, 26) + '<span style="width:20px;height:20px;border-radius:5px;background:#3A3570"></span><span style="width:20px;height:20px;border-radius:5px;background:#6557FF"></span><span style="width:20px;height:20px;border-radius:5px;background:#3A3570"></span></div>' +
      '<div style="flex:1;min-width:0;display:flex;flex-direction:column"><div style="padding:14px 18px 10px;display:flex;align-items:center;gap:12px"><div style="flex:1;font-size:20px;font-weight:700">' + esc(c.title) + '</div>' + (c.owner ? avatar(c.owner, 26) : '') + '</div>' +
      '<div class="' + V.mark('stage') + '" style="display:flex;gap:3px;padding:0 18px 12px;font-size:11px;font-weight:700">' + stages + '</div>' +
      '<div style="flex:1;min-height:0;display:grid;grid-template-columns:230px minmax(0,1fr);border-top:1px solid #E6E7EE"><div style="padding:14px 16px;border-right:1px solid #E6E7EE;display:flex;flex-direction:column;gap:10px">' + fields + '</div>' +
      '<div style="background:#F7F7F9;padding:14px 16px;display:flex;flex-direction:column;gap:10px;min-width:0"><div style="display:flex;gap:18px;border-bottom:1px solid #E6E7EE;background:#fff;padding:10px 14px 0;border-radius:8px 8px 0 0"><span style="color:#2F6BD8;font-weight:700;padding-bottom:8px;border-bottom:2px solid #2F6BD8">Notes</span><span style="color:#6B6E83">Activity</span><span style="color:#6B6E83">Email</span></div>' + note + act + '</div></div></div></div>';
  },

  'task-list'(c, V) {
    const head = '<tr>' + (c.columns || []).map((h) => '<th>' + esc(h) + '</th>').join('') + '</tr>';
    const dash = '<span style="display:inline-block;width:20px;height:20px;border-radius:50%;border:1.5px dashed #B4B6C4;vertical-align:middle"></span>';
    const rows = V.on('rows') ? (c.rows || []).map((r, i) => '<tr class="' + V.mark('row-' + (i + 1)) + V.enter('rows') + '" style="animation-delay:' + (i * 0.2) + 's"><td><span style="display:inline-flex;align-items:center;gap:8px"><span style="width:16px;height:16px;border-radius:50%;border:1.5px solid #9A9AA0;flex:none"></span>' + esc(r.name) + '</span></td>' +
      '<td>' + (V.on('assignees') ? '<span class="' + V.enter('assignees') + '" style="animation-delay:' + (i * 0.25) + 's;display:inline-flex;flex-wrap:wrap;align-items:center;gap:4px 6px">' + avatar(r.assignee, 20) + esc((CAST[r.assignee] || {}).n?.split(' ')[0] || r.assignee) + (r.assigneeNote ? '<span style="background:#F0EEFF;color:#6557FF;font-size:10px;font-weight:900;padding:2px 7px;border-radius:999px">' + esc(r.assigneeNote) + '</span>' : '') + '</span>' : dash) + '</td>' +
      '<td>' + (V.on('dates') ? '<span class="' + V.enter('dates') + '" style="display:inline-block;white-space:nowrap;animation-delay:' + (i * 0.25) + 's">' + esc(r.due) + '</span>' : dash) + '</td><td><span style="background:#E3F4CC;font-size:12px;padding:2px 8px;border-radius:4px;white-space:nowrap">' + esc(r.tag) + '</span></td></tr>').join('') : '';
    const empty = '<tr><td colspan="4"><span class="fmrun-sk" style="display:block;width:45%"></span></td></tr><tr><td colspan="4"><span class="fmrun-sk" style="display:block;width:35%"></span></td></tr>';
    return '<div style="position:absolute;inset:0;display:flex"><div class="fmrun-side" style="width:150px;flex:none;background:#2E2E30;padding:14px 12px;display:flex;flex-direction:column;gap:10px;color:#C9C9CE">' + appChip('asana', 24) + '<div style="font-size:11px;color:#9A9AA0;margin-top:10px">Projects</div><div style="background:#47474A;color:#fff;padding:6px 8px;border-radius:6px">' + esc(c.project) + '</div></div>' +
      '<div style="flex:1;min-width:0;display:flex;flex-direction:column"><div style="padding:16px 20px 12px;font-size:20px;font-weight:700;border-bottom:1px solid #E6E7EE">' + esc(c.project) + '</div><div style="padding:12px 20px"><span style="background:#4573D2;color:#fff;font-weight:700;padding:6px 12px;border-radius:6px">+ Add task</span></div>' +
      '<table class="fmrun-tbl"><thead>' + head + '</thead><tbody>' + rows + empty + '</tbody></table></div></div>';
  },

  email(c, V) {
    const ps = (c.paragraphs || []).map((p, i) => '<span class="fmrun-fx ' + V.cls('paragraph-' + (i + 1)) + '">' + esc(p) + '</span>').join('');
    const acts = (c.actions || []).map((a, i, all) => '<span class="fmrun-act" style="font-weight:700;padding:8px 16px;border-radius:10px;' + (i === all.length - 1 ? 'background:#6557FF;color:#fff' : 'background:#fff;border:1px solid #D9DAE3') + '">' + esc(a) + '</span>').join('');
    const bars = [110, 90, 120, 80, 100].map((w) => '<div style="display:flex;gap:16px;padding:10px 0;border-bottom:1px solid #F0F1F4"><span class="fmrun-sk" style="width:' + w + 'px"></span><span class="fmrun-sk" style="flex:1;background:#F3F4F7"></span></div>').join('');
    return '<div style="position:absolute;inset:0;display:flex;flex-direction:column;background:#F6F8FC"><div style="height:52px;flex:none;display:flex;align-items:center;gap:16px;padding:0 16px">' + appChip('gmail', 24) + '<span style="flex:1;max-width:420px;height:34px;border-radius:17px;background:#E9EEF6"></span></div>' +
      '<div style="flex:1;display:flex;min-height:0"><div class="fmrun-side" style="width:160px;flex:none;padding:4px 12px"><span style="display:inline-block;background:#C2E7FF;font-weight:700;padding:12px 18px;border-radius:14px">Compose</span></div><div style="flex:1;background:#fff;border-radius:14px 0 0 0;padding:10px 16px">' + bars + '</div></div>' +
      '<div class="' + V.cls('draft') + '" style="position:absolute;right:12px;bottom:0;width:min(470px,calc(100% - 24px));background:#fff;border-radius:10px 10px 0 0;box-shadow:0 8px 28px rgba(11,11,46,.22);display:flex;flex-direction:column"><div style="background:#F2F6FC;border-radius:10px 10px 0 0;padding:10px 14px;font-weight:700">Draft</div>' +
      '<div style="padding:9px 14px;border-bottom:1px solid #EEEEF3;color:#3A3C55">' + esc(c.to) + '</div><div style="padding:9px 14px;border-bottom:1px solid #EEEEF3;font-weight:700">' + esc(c.subject) + '</div>' +
      '<div style="padding:12px 14px;line-height:1.55;display:flex;flex-direction:column;gap:8px;min-height:150px">' + ps + '</div>' +
      '<div class="' + V.cls('actions') + '" style="padding:12px 14px 14px;border-top:1px solid #EEEEF3;display:flex;justify-content:flex-end;gap:8px">' + acts + '</div></div></div>';
  },

  'social-post'(c, V) {
    const a = c.author || {};
    const post = V.on('post')
      ? '<div style="background:#fff;border:1px solid #E6E7EE;border-radius:12px;padding:16px 18px;display:flex;flex-direction:column;gap:12px">' +
        '<div style="display:flex;align-items:center;gap:10px">' + initials(a.name || '', 40, '#3A3570') + '<div style="flex:1;min-width:0"><div style="font-weight:900;font-size:14px">' + esc(a.name) + '</div><div style="color:#6B6E83;font-size:12px">' + esc(a.headline) + '</div></div><span class="' + V.mark('age') + '" style="color:#6B6E83;font-size:12px;padding:2px 6px">' + esc(c.age) + '</span></div>' +
        '<p class="' + V.mark('text') + '" style="margin:0;font-size:14px;line-height:1.55;padding:2px 4px">' + esc(c.text) + '</p>' +
        '<div class="' + V.mark('stats') + '" style="display:flex;gap:16px;color:#6B6E83;font-size:12px;padding:6px 4px;border-top:1px solid #EEEFF4"><span><b style="color:#0B0B2E">' + esc(c.stats?.reactions) + '</b> reactions</span><span><b style="color:#0B0B2E">' + esc(c.stats?.comments) + '</b> comments</span></div>' +
        '<div class="' + V.cls('comments') + '" style="display:flex;flex-direction:column;gap:8px">' + (c.comments || []).map((cm, i) => '<div class="' + V.mark('comment-' + (i + 1)) + '" style="display:flex;gap:8px;align-items:flex-start">' + initials(cm.author, 26) + '<div style="background:#F5F5F8;border-radius:10px;padding:8px 10px;font-size:12.5px;line-height:1.45;flex:1"><b>' + esc(cm.author) + '</b><br>' + esc(cm.text) + '</div></div>').join('') + '</div></div>'
      : '<div style="background:#fff;border:1px solid #E6E7EE;border-radius:12px;padding:16px 18px;display:flex;flex-direction:column;gap:10px"><span class="fmrun-sk" style="width:40%"></span><span class="fmrun-sk" style="width:90%"></span><span class="fmrun-sk" style="width:75%"></span></div>';
    const v = c.verdict;
    const verdict = v ? '<div class="' + V.cls('verdict') + '" style="align-self:flex-start;display:flex;align-items:center;gap:6px;background:#F0EEFF;color:#4638C9;font-weight:700;padding:6px 12px;border-radius:999px">' + svg(SP, 13, '#6557FF', 2.2) + esc(v.label) + '</div>' : '';
    return '<div style="position:absolute;inset:0;display:flex;flex-direction:column;background:#F3F4F8"><div class="fmrun-fh" style="background:#fff">' + appChip('apify', 18) + '<b>New posts</b><span>From ' + esc(c.source) + '</span></div>' +
      '<div style="flex:1;min-height:0;padding:16px 22px;display:flex;flex-direction:column;gap:12px;overflow:hidden">' + verdict + post + '</div></div>';
  },

  /* A list of posts from a search: author, headline, snippet, comments. Keys: rows, stream (the list runs while
     that line is active, through content.stream rows), count (running counter), drops (rows with drop set are
     struck out), verdicts (a reading highlight passes and each row gets its verdict), kept (rows without keep fade). */
  'post-list'(c, V, step) {
    const cnt = c.count || {};
    const showV = V.on('verdicts'), showK = V.on('kept'), showD = V.on('drops');
    const all = c.rows || [];
    const n = all.length;
    const row = (r, i, filler) => {
      const keep = !!r.keep;
      const struck = showD && r.drop;
      const dim = (showK && !keep) || struck ? 'opacity:.4;' : '';
      const vd = !filler && r.verdict && showV ? '<span class="fmrun-pill ' + (keep ? 'fmrun-p-ok' : 'fmrun-p-out') + (V.fresh('verdicts') ? ' fmrun-k-enter' : '') + '" style="animation-delay:' + (V.fresh('verdicts') ? (0.3 + i * (V.dur * 0.75 / n)).toFixed(2) : 0) + 's">' + (keep ? svg(SP, 10, '#0B7A57', 2.6) + '&nbsp;' : '') + esc(r.verdict) + '</span>' : '';
      const dr = !filler && struck ? '<span class="fmrun-pill fmrun-p-out' + (V.fresh('drops') ? ' fmrun-k-enter' : '') + '">' + esc(r.drop) + '</span>' : '';
      return '<div class="fmrun-post' + (filler ? '' : V.mark('row-' + (i + 1))) + (showK && keep ? ' fmrun-post-kept' : '') + (struck ? ' fmrun-struck' : '') + '" style="' + dim + '">' +
        initials(r.author || '', 30, '#3A3570') +
        '<div style="min-width:0;flex:1"><div style="display:flex;align-items:baseline;gap:8px;min-width:0"><b style="font-size:13px;white-space:nowrap">' + esc(r.author) + '</b><span style="font-size:11.5px;color:#6B6E83;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(r.headline) + '</span></div>' +
        '<div class="fmrun-post-t">' + esc(r.text) + '</div></div>' +
        '<div style="flex:none;display:flex;flex-direction:column;align-items:flex-end;gap:6px;min-width:96px"><span style="font-size:11.5px;color:#6B6E83;white-space:nowrap"><b style="color:#0B0B2E">' + esc(r.comments) + '</b> comments</span>' + vd + dr + '</div></div>';
    };
    const body = V.on('rows')
      ? streamWrap(all.map((r, i) => row(r, i, false)).join(''), (c.stream || []).map((r, i) => row(r, i, true)).join(''), n, (c.stream || []).length, V)
      : '<div class="fmrun-list"><div class="fmrun-post"><span class="fmrun-sk" style="width:60%"></span></div><div class="fmrun-post"><span class="fmrun-sk" style="width:45%"></span></div><div class="fmrun-post"><span class="fmrun-sk" style="width:52%"></span></div></div>';
    const scan = V.fresh('verdicts') ? '<div class="fmrun-scan" style="animation-duration:' + (V.dur * 0.8).toFixed(2) + 's"></div>' : '';
    return '<div style="position:absolute;inset:0;display:flex;flex-direction:column;background:#F6F7FA"><div class="fmrun-fh" style="background:#fff">' + appChip((step && step.app) || 'apify', 18) + '<b>' + esc(c.title) + '</b><span>' + esc(c.query || '') + '</span><span class="' + V.mark('count') + '" style="margin-left:auto;font-weight:900;color:#3A3D55;padding:2px 8px;font-variant-numeric:tabular-nums">' + counter(cnt.from, cnt.to, V.on('count'), V.fresh('count'), V.dur) + '</span></div>' +
      '<div class="fmrun-listbox" style="padding:0 14px">' + scan + body + '</div></div>';
  },

  'lead-list'(c, V, step) {
    const map = { Name: 'name', Title: 'title', Company: 'company', Score: 'score', Reason: 'reason', Status: 'status', Comment: 'comment', Icebreaker: 'icebreaker' };
    const gate = { Score: 'scores', Reason: 'reasons', Status: 'status', Title: 'titles', Comment: 'comments', Icebreaker: 'icebreakers' };
    const width = { Name: '180px', Title: '210px', Company: '150px', Score: '64px', Reason: '220px', Status: '160px' };
    const cols = c.columns || [];
    const colg = '<colgroup>' + cols.map((h) => '<col style="width:' + (width[h] || 'auto') + '">').join('') + '</colgroup>';
    const cnt = c.count || {};
    const head = '<table class="fmrun-tbl fmrun-fixed">' + colg + '<thead><tr>' + cols.map((h) => '<th>' + esc(h) + '</th>').join('') + '</tr></thead></table>';
    const all = c.rows || [];
    const n = all.length;
    let typed = false;
    const pill = (v, out) => '<span class="fmrun-pill ' + (out ? 'fmrun-p-out' : /strong/i.test(v) ? 'fmrun-p-ok' : 'fmrun-p-todo') + '">' + esc(v) + '</span>';
    const ib = (v, typeIt) => v ? '<span class="fmrun-ib' + (typeIt ? ' fmrun-type' : '') + '">' + svg(SP, 11, '#6557FF', 2.4) + '<span>' + esc(v) + '</span></span>' : '<span style="color:#B4B6C4">-</span>';
    const rowHtml = (r, i, filler) => {
      const out = /removed|left out/i.test(r.status || '');
      const settled = out && (V.on('status') || V.on('reasons'));
      const tds = cols.map((h) => {
        const f = map[h] || h.toLowerCase(), g = gate[h], shown = !g || V.on(g);
        const v = r[f];
        if (!shown) return '<td></td>';
        let inner;
        if (f === 'name') inner = '<span style="display:inline-flex;align-items:center;gap:8px;min-width:0;max-width:100%">' + initials(r.name, 24) + '<b style="font-weight:700;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(v) + '</b></span>';
        else if (f === 'score') inner = '<span class="fmrun-score" style="color:' + (v >= 70 ? '#0B7A57' : '#A3A5B6') + '">' + esc(v) + '</span>';
        else if (f === 'status') inner = pill(v, out);
        else if (f === 'icebreaker') { const t1 = !typed && !filler && v && V.fresh('icebreakers'); if (t1) typed = true; inner = ib(v, t1); }
        else if (f === 'comment') inner = '<span style="font-style:italic">' + esc(v) + '</span>';
        else inner = esc(v);
        if (g && V.fresh(g) && !filler) inner = '<span class="fmrun-k-enter" style="display:inline-block;max-width:100%;animation-delay:' + (0.2 + i * (V.dur * 0.7 / n)).toFixed(2) + 's">' + inner + '</span>';
        return '<td' + (f === 'reason' || f === 'comment' || f === 'title' ? ' style="color:#3A3D55"' : '') + '>' + inner + '</td>';
      }).join('');
      const dim = settled ? 'opacity:.42;' : '';
      return '<tr class="' + (filler ? '' : V.mark('row-' + (i + 1))) + (settled && /removed/i.test(r.status || '') ? ' fmrun-struck' : '') + '" style="' + dim + '">' + tds + '</tr>';
    };
    const withGroups = (rows, filler) => {
      let g = null;
      return rows.map((r, i) => {
        const gh = r.group && r.group !== g ? '<tr class="fmrun-grp"><td colspan="' + cols.length + '">' + esc(r.group) + '</td></tr>' : '';
        if (r.group) g = r.group;
        return gh + rowHtml(r, i, filler);
      }).join('');
    };
    const tb = (html) => '<table class="fmrun-tbl fmrun-fixed">' + colg + '<tbody>' + html + '</tbody></table>';
    const body = V.on('rows')
      ? streamWrap(tb(withGroups(all, false)), tb(withGroups(c.stream || [], true)), n, (c.stream || []).length, V)
      : '<div class="fmrun-list" style="padding:10px"><span class="fmrun-sk" style="display:block;width:60%;margin-bottom:12px"></span><span class="fmrun-sk" style="display:block;width:45%"></span></div>';
    return '<div style="position:absolute;inset:0;display:flex;flex-direction:column"><div class="fmrun-fh">' + appChip((step && step.app) || 'flowmate', 18) + '<b>' + esc(c.title) + '</b><span class="' + V.mark('count') + '" style="margin-left:auto;font-weight:900;color:#3A3D55;padding:2px 8px;font-variant-numeric:tabular-nums">' + counter(cnt.from, cnt.to, V.on('count'), V.fresh('count'), V.dur) + '</span></div>' +
      '<div style="padding:0 10px">' + head + '</div><div class="fmrun-listbox" style="padding:0 10px">' + body + '</div></div>';
  },

  /* CRM lookup: people checked against your CRM, each with a status chip (new, customer, lead, past); then one
     past contact's record with the new signal and a task for the owner. Keys: rows, stream, count, skips, record. */
  'crm-lookup'(c, V, step) {
    const cnt = c.count || {};
    const lbl = { new: 'New', customer: 'Customer', lead: 'Open lead', past: 'Past contact' };
    const showS = V.on('skips'), showR = V.on('record');
    const all = c.rows || [];
    const n = all.length;
    const row = (r, i, filler) => {
      const skip = showS && (r.status === 'customer' || r.status === 'lead');
      const chipCls = r.status === 'new' ? 'fmrun-p-ok' : r.status === 'past' ? 'fmrun-p-todo' : 'fmrun-p-out';
      const chip = '<span class="fmrun-pill ' + chipCls + '">' + esc(skip ? lbl[r.status] + ', skipped' : r.status === 'past' && showR ? 'Signal added' : lbl[r.status] || r.status) + '</span>';
      return '<div class="fmrun-lk' + (filler ? '' : V.mark('row-' + (i + 1))) + (skip ? ' fmrun-struck' : '') + (!filler && r.open && showR ? ' fmrun-lk-open' : '') + '" style="' + (skip ? 'opacity:.45;' : '') + '">' + initials(r.name, 24) +
        '<span style="flex:1;min-width:0"><b style="font-size:12.5px">' + esc(r.name) + '</b><span style="display:block;font-size:11px;color:#6B6E83;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(r.company) + '</span></span>' + chip + '</div>';
    };
    const list = V.on('rows')
      ? streamWrap(all.map((r, i) => row(r, i, false)).join(''), (c.stream || []).map((r, i) => row(r, i, true)).join(''), n, (c.stream || []).length, V)
      : '<div class="fmrun-list" style="padding:12px"><span class="fmrun-sk" style="display:block;width:60%"></span></div>';
    const rec = c.record || {};
    const panel = showR
      ? '<div class="' + V.enter('record') + '" style="display:flex;flex-direction:column;gap:10px"><div style="display:flex;align-items:center;gap:10px">' + initials(rec.name || '', 34) + '<div style="flex:1;min-width:0"><div style="font-weight:900;font-size:15px">' + esc(rec.name) + '</div><div style="font-size:12px;color:#6B6E83">' + esc(rec.title) + '</div></div>' + (rec.owner ? avatar(rec.owner, 26) : '') + '</div>' +
        (rec.fields || []).map((f) => '<div style="display:flex;justify-content:space-between;gap:10px;font-size:12px;border-bottom:1px solid #EEEFF4;padding-bottom:6px"><span style="color:#6B6E83">' + esc(f.label) + '</span><b style="font-weight:700;text-align:right">' + esc(f.value) + '</b></div>').join('') +
        (rec.note ? '<div style="background:#FFF6D6;border:1px solid #F2E2A6;border-radius:8px;padding:10px 12px;font-size:12.5px;line-height:1.5"><div style="color:#6B6E83;font-size:11px">' + esc(rec.note.meta) + '</div><div style="font-weight:900">' + esc(rec.note.title) + '</div>' + rec.note.lines.map((l) => '<div>' + esc(l) + '</div>').join('') + '</div>' : '') +
        (rec.activity ? '<div style="background:#fff;border:1px solid #E6E7EE;border-radius:8px;padding:9px 12px;display:flex;align-items:center;gap:10px;font-size:12.5px"><span style="width:16px;height:16px;border-radius:50%;border:2px solid #08A742;flex:none"></span><b style="flex:1;font-weight:700">' + esc(rec.activity.title) + '</b><span style="color:#6B6E83;white-space:nowrap">' + esc(rec.activity.due) + ' · ' + esc(rec.activity.owner) + '</span></div>' : '') + '</div>'
      : '<div style="display:flex;flex-direction:column;gap:10px"><span class="fmrun-sk" style="width:50%"></span><span class="fmrun-sk" style="width:80%"></span><span class="fmrun-sk" style="width:65%"></span></div>';
    return '<div style="position:absolute;inset:0;display:flex"><div class="fmrun-side" style="width:48px;flex:none;background:#1F1B4D;display:flex;flex-direction:column;align-items:center;gap:14px;padding-top:12px">' + appChip(step.app, 26) + '<span style="width:20px;height:20px;border-radius:5px;background:#6557FF"></span><span style="width:20px;height:20px;border-radius:5px;background:#3A3570"></span></div>' +
      '<div style="flex:1;min-width:0;display:flex;flex-direction:column"><div class="fmrun-fh"><b>' + esc(c.title) + '</b><span class="' + V.mark('count') + '" style="margin-left:auto;font-weight:900;color:#3A3D55;padding:2px 8px;font-variant-numeric:tabular-nums">' + counter(cnt.from, cnt.to, V.on('count'), V.fresh('count'), V.dur) + '</span></div>' +
      '<div style="flex:1;min-height:0;display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr)"><div class="fmrun-listbox" style="border-right:1px solid #E6E7EE">' + list + '</div><div style="background:#F7F7F9;padding:16px;min-width:0;overflow:hidden">' + panel + '</div></div></div></div>';
  },

  chat(c, V) {
    const msgs = (c.messages || []).map((m, i) => {
      const cd = m.card;
      const card = cd ? '<div class="' + V.cls('card') + '" style="border:1px solid #E6E7EE;border-radius:10px;padding:12px 14px;margin-top:10px"><div style="font-size:12px;font-weight:700;color:#6B6E83;margin-bottom:8px">' + esc(cd.title) + '</div>' + cd.rows.map((r) => '<div style="display:flex;align-items:center;gap:10px;margin-top:8px">' + initials(r.name, 26) + '<div style="flex:1;min-width:0"><div style="font-weight:700">' + esc(r.name) + '</div><div style="font-size:12px;color:#6B6E83">' + esc(r.detail) + '</div></div><span class="fmrun-pill fmrun-p-ok" style="font-size:12px">' + esc(r.score) + '</span></div>' + (r.firstLine ? '<div style="margin:6px 0 0 36px;padding:7px 10px;background:#F7F6FF;border-radius:8px;font-size:12.5px;line-height:1.45;color:#3A3D55"><b style="color:#6557FF">First line:</b> ' + esc(r.firstLine) + '</div>' : '')).join('') + '</div>' : '';
      return '<div class="' + V.cls('message-' + (i + 1)) + '" style="display:flex;gap:10px;align-items:flex-start"><span style="width:34px;height:34px;border-radius:8px;background:#EEECFF;display:flex;align-items:center;justify-content:center;flex:none">' + fmLogo(20) + '</span><div style="min-width:0;flex:1"><div style="display:flex;align-items:baseline;gap:8px"><b style="font-size:14px">' + esc(m.author) + '</b><span style="font-size:12px;color:#6B6E83">' + esc(m.time) + '</span></div><p style="margin:4px 0 0;font-size:13.5px;line-height:1.5">' + esc(m.text) + '</p>' + card + '</div></div>';
    }).join('');
    const acts = (c.actions || []).map((a) => '<span class="fmrun-act" style="font-weight:700;padding:8px 14px;border-radius:8px;border:1px solid #DCDDE6;background:#fff">' + esc(a) + '</span>').join('');
    return '<div style="position:absolute;inset:0;display:flex"><div class="fmrun-side" style="width:150px;flex:none;background:#3B1A40;color:rgba(255,255,255,.72);padding:14px 10px;display:flex;flex-direction:column;gap:2px">' +
      '<div style="color:#fff;font-weight:900;font-size:14px;padding:0 6px 12px">' + esc(WS.n) + '</div><div style="padding:5px 6px"># marketing</div><div style="padding:5px 6px"># sales</div><div style="padding:14px 6px 5px;font-size:11px;font-weight:700;color:rgba(255,255,255,.55)">Direct messages</div><div style="padding:5px 6px;border-radius:6px;background:rgba(255,255,255,.14);color:#fff;font-weight:700">FlowMate agent</div><div style="padding:5px 6px">Tom Becker</div></div>' +
      '<div style="flex:1;min-width:0;padding:14px 18px;display:flex;flex-direction:column;gap:12px;overflow:hidden"><div style="font-weight:900;font-size:14px;padding-bottom:10px;border-bottom:1px solid #ECECF2">' + esc(c.channel) + '</div>' + msgs +
      '<div class="' + V.cls('actions') + '" style="display:flex;gap:8px;margin-left:44px;flex-wrap:wrap">' + acts + '</div></div></div>';
  },

  /* Custom component (candidate type "campaign"): your outreach template, the leads with the agent-written
     field as a column, and one lead's email open, with the agent-written fields highlighted. */
  CampaignLeads(c, V) {
    const cnt = c.count || {};
    const added = V.on('leads');
    const tag = '<span class="fmrun-agtag">' + svg(SP, 10, '#6557FF', 2.6) + 'FlowMate agent</span>';
    const lead = (l, i, filler) => '<div class="fmrun-cl' + (!filler && l.open && V.on('email') ? ' fmrun-cl-open' : '') + '">' +
      '<div style="display:flex;justify-content:space-between;gap:6px;align-items:baseline"><span style="display:flex;align-items:center;gap:7px;min-width:0">' + initials(l.name, 22) + '<b style="font-size:12.5px;white-space:nowrap">' + esc(l.name) + '</b><span style="font-size:11px;color:#6B6E83;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(l.company) + '</span></span>' +
      '<span class="' + V.cls('schedule') + '" style="font-size:11px;color:#6B6E83;white-space:nowrap">' + esc(l.status) + '</span></div>' +
      '<div class="fmrun-ib" style="margin-top:6px">' + svg(SP, 11, '#6557FF', 2.4) + '<span>' + esc(l.icebreaker) + '</span></div></div>';
    const leads = added ? streamWrap((c.leads || []).map((l, i) => lead(l, i, false)).join('') + (c.more ? '<div style="padding:10px 12px;font-size:12px;font-weight:700;color:#6B6E83">' + esc(c.more) + '</div>' : ''), (c.stream || []).map((l, i) => lead(l, i, true)).join(''), (c.leads || []).length + 1, (c.stream || []).length, V)
      : '<div style="padding:12px;display:flex;flex-direction:column;gap:10px"><span class="fmrun-sk" style="width:70%"></span><span class="fmrun-sk" style="width:55%"></span></div>';
    const em = c.email || {};
    let fi = 0;
    const parts = (em.parts || []).map((p) => {
      const txt = esc(p.text).replace(/\n/g, '<br>');
      if (!p.field) return '<p style="margin:0">' + txt + '</p>';
      const k = 'field-' + p.field;
      const d = (fi++ * Math.min(1.1, V.dur * 0.4)).toFixed(2);
      return '<div class="fmrun-field' + V.mark(k) + '" style="animation-delay:' + d + 's"><span class="fmrun-field-lbl">' + svg(SP, 10, '#6557FF', 2.6) + esc(p.label || 'Written by the FlowMate agent') + '</span>' + txt + '</div>';
    }).join('');
    const acts = (c.actions || []).map((a) => '<span class="fmrun-act" style="font-weight:700;font-size:12.5px;padding:7px 12px;border-radius:8px;border:1px solid #DCDDE6;background:#fff">' + esc(a) + '</span>').join('');
    const email = V.on('email')
      ? '<div class="' + V.enter('email') + '" style="display:flex;flex-direction:column;gap:9px;font-size:13px;line-height:1.5;color:#26251F">' +
        '<div style="font-size:11.5px;color:#6B6E83;line-height:1.6;border-bottom:1px solid #EEEFF4;padding-bottom:8px"><div><b style="color:#3A3D55">From</b> ' + esc(em.from) + '</div><div><b style="color:#3A3D55">To</b> ' + esc(em.to) + '</div><div><b style="color:#3A3D55">Subject</b> ' + esc(em.subject) + '</div></div>' + parts +
        '<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;border-top:1px solid #EEEFF4;padding-top:9px;margin-top:2px"><span class="' + V.cls('schedule') + '" style="font-size:12px;font-weight:700;color:#0B7A57">' + esc(em.status) + '</span><span class="' + V.cls('actions') + '" style="display:flex;gap:6px">' + acts + '</span></div></div>'
      : '<div style="display:flex;flex-direction:column;gap:10px"><span class="fmrun-sk" style="width:40%"></span><span class="fmrun-sk" style="width:90%"></span><span class="fmrun-sk" style="width:80%"></span><span class="fmrun-sk" style="width:60%"></span></div>';
    return '<div style="position:absolute;inset:0;display:flex;flex-direction:column"><div class="fmrun-fh">' + appChip('lemlist', 20) + '<b>' + esc(c.campaign) + '</b><span>' + esc(c.schedule) + '</span><span class="' + V.mark('count') + '" style="margin-left:auto;font-weight:900;color:#0B7A57;background:' + (V.on('count') ? '#DDF9EE' : 'transparent') + ';padding:3px 10px;border-radius:999px;font-variant-numeric:tabular-nums">' + counter(cnt.from, cnt.to, V.on('count'), V.fresh('count'), V.dur) + '</span></div>' +
      '<div style="flex:1;min-height:0;display:grid;grid-template-columns:minmax(0,0.92fr) minmax(0,1.08fr)"><div style="border-right:1px solid #E6E7EE;min-width:0;overflow:hidden;display:flex;flex-direction:column">' +
      '<div style="display:flex;justify-content:space-between;align-items:center;padding:8px 12px;font-size:11px;font-weight:700;color:#6B6E83;border-bottom:1px solid #E6E7EE"><span>Lead · ' + esc(c.fieldColumn || 'Icebreaker') + '</span>' + tag + '</div><div class="fmrun-listbox">' + leads + '</div></div>' +
      '<div style="padding:14px 16px;min-width:0;overflow:hidden">' + email + '</div></div></div>';
  },
};

/* v1.3.x-draft (WF-058): ticket frame with Zendesk skin, HubSpot skin for crm-record, IssueRecord (candidate frame type "issue") with Linear skin. */
const lic = (d, s, c) => '<svg width="' + (s || 14) + '" height="' + (s || 14) + '" viewBox="0 0 24 24" fill="none" stroke="' + (c || 'currentColor') + '" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" style="flex:none"><path d="' + d + '"/></svg>';
const IC = {
  inbox: 'M3 13h5l2 3h4l2-3h5M5 5h14l2 8v6H3v-6z', user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 21a8 8 0 0 1 16 0',
  search: 'M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM21 21l-5-5', ticket: 'M4 7h16v4a2 2 0 0 0 0 4v4H4v-4a2 2 0 0 0 0-4z',
  chart: 'M4 20V10M10 20V4M16 20v-7M22 20H2', gear: 'M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1M12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z', home: 'M3 11l9-7 9 7v9H3z',
  layers: 'M12 3l9 5-9 5-9-5zM3 13l9 5 9-5', note: 'M5 4h14v16H5zM9 9h6M9 13h6', mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
  phone: 'M5 4h4l2 5-3 2a11 11 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 6a2 2 0 0 1 2-2z', task: 'M9 11l3 3 8-8M20 12v7H4V5h11',
  cal: 'M4 6h16v14H4zM4 10h16M9 3v4M15 3v4', back: 'M15 18l-6-6 6-6', link: 'M10 14a4 4 0 0 0 6 0l3-3a4 4 0 0 0-6-6l-1 1M14 10a4 4 0 0 0-6 0l-3 3a4 4 0 0 0 6 6l1-1',
};
const showOr = (V, k, html, sk) => (V.on(k) ? html : (sk || '<span class="fmrun-sk" style="display:inline-block;width:70px;vertical-align:middle"></span>'));

/* ---------- Ticket: Zendesk ---------- */
const ZD_STATUS = { New: ['#FFB648', '#3B2A00'], Open: ['#E34F32', '#fff'], Pending: ['#3091EC', '#fff'], Solved: ['#87929D', '#fff'] };
const zdStatus = (t) => { const s = ZD_STATUS[t] || ['#87929D', '#fff']; return '<span style="display:inline-flex;font-size:11px;font-weight:700;padding:2px 8px;border-radius:4px;background:' + s[0] + ';color:' + s[1] + '">' + esc(t) + '</span>'; };
function zendeskTicket(c, V, step) {
  const cu = c.customer || {};
  const st = typeof c.status === 'object' && c.status ? (V.on('status') ? c.status.to : c.status.from) : c.status;
  const agent = CAST[c.assignee] || { n: c.assignee };
  const TEAL = '#30A2B5';
  const badge = (t, bg) => '<span style="display:inline-flex;font-size:10px;font-weight:700;padding:2px 6px;border-radius:3px;background:' + bg + ';color:#fff;line-height:1.3">' + esc(t) + '</span>';
  const stBg = { New: '#F5B53F', Open: '#E34F32', Pending: '#3091EC', Solved: '#87929D' }[st] || '#87929D';
  const field = (label, html, key, h) => '<div style="display:flex;flex-direction:column;gap:5px"><span style="font-size:11.5px;color:#68737D">' + esc(label) + '</span><div class="' + (key ? V.mark(key) : '') + '" style="border:1px solid #D8DCDE;border-radius:4px;background:#fff;padding:6px 9px;font-size:12px;color:#2F3941;display:flex;align-items:' + (h ? 'flex-start' : 'center') + ';gap:7px;flex-wrap:wrap;min-height:' + (h || 18) + 'px">' + html + '</div></div>';
  const tags = (c.tags || []).map((t) => '<span style="background:#E9EBED;border-radius:3px;padding:1px 7px;font-size:11px;color:#49545C">' + esc(t) + '</span>').join('');
  const left = '<div class="fmrun-side" style="width:196px;flex:none;border-right:1px solid #E9EBED;padding:12px 14px;display:flex;flex-direction:column;gap:10px;background:#fff">' +
    field('Requester', initials(cu.name || '', 18, '#5E6AD2') + esc(cu.name)) +
    field('Assignee', avatar(c.assignee, 18) + esc(agent.n || '')) +
    field('Email', esc(cu.email)) +
    field('Tags', tags, 'tags', 26) +
    '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">' + field('Type', 'Problem') + field('Priority', esc(c.priority), 'priority') + '</div></div>';
  const comment = (who, time, lines, extra, cls, note) => '<div class="' + (cls || '') + '" style="display:flex;gap:12px;align-items:flex-start;padding:11px 4px;border-bottom:1px solid #E9EBED' + (note ? ';background:#FFF8E6;border-radius:4px;padding:10px 10px' : '') + '">' + who +
    '<div style="flex:1;min-width:0"><div style="display:flex;gap:8px;align-items:baseline"><b style="font-size:12.5px;font-weight:600;color:#2F3941">' + extra.name + '</b><span style="font-size:11px;color:#87929D">' + esc(time) + '</span>' + (extra.tag || '') + '</div>' +
    '<div style="margin-top:3px;font-size:12.5px;line-height:1.45;color:#49545C">' + lines + '</div></div></div>';
  const join = (arr) => (arr || []).map(esc).join('<br>');
  const r = c.reply, n = c.note;
  const showR = r && V.on('reply'), showN = n && V.on('note');
  const collapsed = !!r;
  const marta = collapsed
    ? comment(initials(cu.name || '', 32, '#5E6AD2'), c.received, '<span style="display:block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;color:#87929D">' + esc((c.message || []).join(' ')) + '</span>', { name: esc(cu.name) })
    : comment(initials(cu.name || '', 32, '#5E6AD2'), c.received, '<span class="' + V.mark('message') + '" style="display:block;padding:2px 6px;margin:-2px 8px -2px -6px">' + join(c.message) + '</span>', { name: esc(cu.name) });
  const maya = showR ? comment(avatar(r.author, 32), r.time, join(r.text), { name: esc((CAST[r.author] || { n: r.author }).n), tag: '<span style="font-size:10.5px;color:#68737D;font-weight:600">Public reply to ' + esc((cu.name || '').split(' ')[0]) + '</span>' + (r.state && V.on('status') ? ' <span style="font-size:10.5px;color:#038153;font-weight:700">' + esc(r.state) + '</span>' : '') }, V.enter('reply') + V.mark('reply')) : '';
  const nt = showN ? comment('<span style="width:32px;height:32px;border-radius:50%;background:#EEECFF;display:flex;align-items:center;justify-content:center;flex:none">' + fmLogo(20) + '</span>', n.time, esc(n.text), { name: esc(n.author), tag: '<span style="font-size:10.5px;color:#AD5918;font-weight:700">Internal note</span>' }, V.enter('note') + V.mark('note'), true) : '';
  const total = 1 + (showR ? 1 : 0) + (showN ? 1 : 0);
  const ctab = (t, nn, on) => '<span style="display:inline-flex;align-items:center;gap:6px;padding:0 2px 8px;font-size:12px;' + (on ? 'color:' + TEAL + ';border-bottom:2px solid ' + TEAL + ';font-weight:600' : 'color:#87929D') + '">' + esc(t) + '<span style="font-size:10px;font-weight:700;color:#fff;background:' + (on ? TEAL : '#C2C8CC') + ';border-radius:8px;padding:0 5px">' + nn + '</span></span>';
  const center = '<div style="flex:1;min-width:0;display:flex;flex-direction:column;background:#fff">' +
    '<div style="flex:1;min-height:0;overflow:hidden;padding:14px 22px 0;display:flex;flex-direction:column;gap:10px">' +
    '<div style="flex:none"><div style="display:flex;align-items:center;gap:8px;min-width:0"><span style="font-size:18px;color:#2F3941;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(c.subject) + '</span><span class="' + V.mark('status') + '" style="display:inline-flex;gap:5px">' + badge(st, stBg) + badge('Today', '#87929D') + '</span></div>' +
    '<div style="font-size:11px;color:#87929D;margin-top:3px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Email from ' + esc(cu.name) + ' | ' + esc(cu.email) + ' to <b style="color:#68737D">Support</b> support@' + esc(String(WS.n).toLowerCase()) + '.io</div></div>' +
    '<div style="flex:none;display:flex;gap:22px;border-bottom:1px solid #E9EBED;font-size:12px;padding-left:18px"><span style="color:' + TEAL + ';border-bottom:2px solid ' + TEAL + ';padding-bottom:7px;font-weight:600">Public Comment</span><span style="color:#87929D">Internal Note</span></div>' +
    '<div style="flex:none;height:34px;border:1px solid #D8DCDE;border-radius:4px;margin-top:-4px"></div>' +
    '<div style="flex:none;display:flex;gap:22px;border-bottom:1px solid #E9EBED;margin-top:4px">' + ctab('All comments', total, true) + ctab('Public', 1 + (showR ? 1 : 0)) + ctab('Notes', showN ? 1 : 0) + '<span style="margin-left:auto;font-size:12px;color:#87929D">Show events</span></div>' +
    '<div style="flex:1;min-height:0;overflow:hidden">' + maya + nt + marta + '</div></div>' +
    '<div style="flex:none;height:46px;border-top:1px solid #E9EBED;display:flex;align-items:center;gap:10px;padding:0 16px;background:#F8F9F9"><span style="width:170px;border:1px solid #D8DCDE;border-radius:4px;background:#fff;padding:6px 10px;font-size:12px;color:#49545C;display:flex;justify-content:space-between">Apply a macro<span style="color:#87929D">⌃</span></span>' +
    '<span class="' + V.mark('status') + '" style="margin-left:auto;display:inline-flex;border-radius:4px;overflow:hidden"><span style="background:' + TEAL + ';color:#fff;font-size:12px;padding:7px 14px">Submit as <b>' + esc(st) + '</b></span><span style="background:' + TEAL + ';border-left:1px solid rgba(255,255,255,.35);color:#fff;padding:7px 9px;font-size:12px">≡</span></span></div></div>';
  const navI = (d, on) => '<span style="width:46px;height:38px;display:flex;align-items:center;justify-content:center;' + (on ? 'background:' + TEAL + ';color:#fff' : 'color:#9FB7BA') + '">' + lic(d, 16) + '</span>';
  const rail = '<div class="fmrun-side" style="width:46px;flex:none;background:#03363D;display:flex;flex-direction:column;align-items:center;padding-top:10px">' + '<span style="height:34px;display:flex;align-items:center">' + appChip(step.app, 22) + '</span>' + navI(IC.home) + navI(IC.inbox) + navI(IC.user, true) + navI(IC.chart) + navI(IC.gear) + '</div>';
  const top = '<div style="height:38px;flex:none;display:flex;align-items:center;background:#fff;border-bottom:1px solid #E9EBED"><span style="height:100%;display:flex;align-items:center;gap:8px;padding:0 16px;border-right:1px solid #E9EBED;background:#F8F9F9;font-size:12.5px;color:#2F3941;min-width:150px">' + appChip(step.app, 15) + 'Ticket ' + esc(c.id) + '</span><span style="padding:0 14px;font-size:12.5px;color:#87929D">+ Add</span><span style="margin-left:auto;display:flex;align-items:center;gap:14px;padding:0 14px;color:#68737D">' + lic(IC.search, 15) + lic(IC.inbox, 15) + avatar(c.assignee, 22) + '</span></div>';
  const crumb = (t, on) => '<span style="padding:5px 12px;font-size:11.5px;border:1px solid ' + (on ? TEAL : '#D8DCDE') + ';margin-left:-1px;' + (on ? 'background:' + TEAL + ';color:#fff' : 'color:#68737D;background:#fff') + '">' + esc(t) + '</span>';
  const sub = '<div style="height:38px;flex:none;display:flex;align-items:center;padding:0 14px;border-bottom:1px solid #E9EBED;background:#fff"><span style="display:flex;border-radius:4px;overflow:hidden">' + crumb(cu.company || 'Organization') + crumb(cu.name) + crumb('Ticket ' + c.id, true) + '</span><span style="margin-left:auto;border:1px solid ' + TEAL + ';color:' + TEAL + ';border-radius:4px;padding:4px 14px;font-size:11.5px">Apps</span></div>';
  return '<div style="position:absolute;inset:0;display:flex;font-family:\'Inter\',\'Lato\',system-ui,sans-serif;background:#fff">' + rail + '<div style="flex:1;min-width:0;display:flex;flex-direction:column">' + top + sub + '<div style="flex:1;min-height:0;display:flex">' + left + center + '</div></div></div>';
}
FRAMES.ticket = zendeskTicket;
SKINS.ticket = { zendesk: zendeskTicket };

/* ---------- crm-record: HubSpot ---------- */
function hubspotRecord(c, V, step) {
  const NAV = '#3A1236', ACT = '#8B2C73', LINE = '#DFE3EB', INK = '#33475B', SUB = '#516F90';
  const card = (inner, extra) => '<div style="background:#fff;border:1px solid ' + LINE + ';border-radius:8px;' + (extra || '') + '">' + inner + '</div>';
  const val = (f) => {
    const k = f.key, shown = !k || V.on(k);
    return shown ? '<span class="' + (k ? V.mark(k) + V.enter(k) : '') + '" style="padding:1px 4px;margin-left:-4px;border-radius:3px;' + (k && V.fresh(k) ? 'background:#E5F5F8' : '') + '">' + esc(f.value) + '</span>' : '<span class="fmrun-sk" style="display:inline-block;width:90px"></span>';
  };
  const fields = (c.fields || []);
  const contactF = fields.find((f) => /contact/i.test(f.label));
  const emailF = fields.find((f) => /email/i.test(f.label));
  const owner = CAST[c.owner] || { n: c.owner };
  const about = [{ label: 'Company domain name', value: c.domain || String(c.title).toLowerCase() + '.com' }, { label: 'Company owner', value: owner.n }].concat(fields.filter((f) => f !== contactF && f !== emailF))
    .map((f) => '<div style="display:flex;flex-direction:column;gap:2px"><span style="font-size:10.5px;color:' + SUB + '">' + esc(f.label) + '</span><span style="font-size:12px;color:' + INK + '">' + val(f) + '</span></div>').join('');
  const co = String(c.title || '?');
  const logo = (s) => '<span style="width:' + s + 'px;height:' + s + 'px;border-radius:6px;background:#FFEDE5;color:#C2410C;font-weight:800;font-size:' + Math.round(s * 0.5) + 'px;display:flex;align-items:center;justify-content:center;flex:none">' + esc(co.charAt(0)) + '</span>';
  const acts = [['Note', IC.note], ['Email', IC.mail], ['Call', IC.phone], ['Task', IC.task], ['Meeti...', IC.cal]].map((a) => '<span style="display:flex;flex-direction:column;align-items:center;gap:3px;font-size:9.5px;color:' + INK + '"><span style="width:24px;height:24px;border-radius:50%;border:1px solid #CBD6E2;display:flex;align-items:center;justify-content:center;color:' + SUB + '">' + lic(a[1], 11) + '</span>' + a[0] + '</span>').join('');
  const head = card('<div style="padding:10px 12px;display:flex;flex-direction:column;gap:9px"><div style="display:flex;justify-content:space-between;font-size:11.5px;color:' + INK + ';font-weight:600"><span style="display:flex;align-items:center;gap:4px">' + lic(IC.back, 11) + 'Companies</span><span>Actions ▾</span></div>' +
    '<div style="display:flex;align-items:center;gap:8px">' + logo(28) + '<div style="min-width:0"><b style="font-size:15px;color:' + INK + ';display:block">' + esc(co) + '</b><span style="font-size:11px;color:#0091AE;text-decoration:underline">www.' + esc(c.domain || co.toLowerCase() + '.com') + '</span></div></div>' +
    '<div style="display:flex;justify-content:space-between">' + acts + '</div></div>');
  const aboutCard = card('<div style="padding:10px 12px;display:flex;flex-direction:column;gap:8px"><div style="display:flex;justify-content:space-between;font-size:12px;color:' + INK + ';font-weight:700"><span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">⌄ About this company</span><span style="font-weight:600;font-size:11px;white-space:nowrap;flex:none;margin-left:6px">Actions ▾</span></div>' + about + '</div>', 'flex:1;min-height:0;overflow:hidden');
  const left = '<div style="width:196px;flex:none;display:flex;flex-direction:column;gap:8px;min-height:0">' + head + aboutCard + '</div>';
  const tab = (t, on) => '<span style="flex:1;text-align:center;padding:8px 0;font-size:12px;color:' + INK + ';' + (on ? 'background:#fff;font-weight:700' : 'background:#F5F8FA') + ';border-right:1px solid ' + LINE + '">' + esc(t) + '</span>';
  const hl = (l, v) => '<div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:4px"><span style="font-size:10px;color:' + SUB + ';text-transform:uppercase;letter-spacing:.04em">' + esc(l) + '</span><span style="font-size:12.5px;color:' + INK + ';font-weight:600;display:flex;align-items:center;gap:5px">' + v + '</span></div>';
  const mid = '<div style="flex:1;min-width:0;display:flex;flex-direction:column;gap:8px">' +
    card('<div style="display:flex">' + tab('Overview', true) + tab('Activities') + tab('Intelligence') + '</div>', 'overflow:hidden') +
    card('<div style="padding:12px;display:flex;flex-direction:column;gap:10px"><b style="font-size:12.5px;color:' + INK + '">Data highlights</b><div style="display:flex;gap:10px">' + hl('Lifecycle stage', 'Customer') + hl('Company owner', avatar(c.owner, 18) + esc(owner.n)) + hl('Last activity', 'Today') + '</div></div>') +
    card('<div style="padding:12px;display:flex;flex-direction:column;gap:9px"><b style="font-size:12.5px;color:' + INK + '">Recent activities</b>' +
      '<div style="border:1px solid ' + LINE + ';border-radius:6px;padding:9px;display:flex;flex-direction:column;gap:6px"><span style="font-size:11px;color:' + INK + '"><b>Renewal call</b> by Tom Becker</span><span class="fmrun-sk" style="width:80%"></span></div>' +
      '<div style="border:1px solid ' + LINE + ';border-radius:6px;padding:9px;display:flex;flex-direction:column;gap:6px"><span style="font-size:11px;color:' + INK + '"><b>Email</b> by Maya Singh</span><span class="fmrun-sk" style="width:65%"></span></div></div>', 'flex:1;min-height:0;overflow:hidden') + '</div>';
  const side = (title, inner) => card('<div style="padding:10px 12px;display:flex;flex-direction:column;gap:8px"><div style="display:flex;justify-content:space-between;align-items:center;font-size:12px;color:' + INK + '"><b>⌄ ' + esc(title) + '</b><span style="font-size:11px;font-weight:600">+ Add</span></div>' + inner + '</div>');
  const cName = contactF ? contactF.value.split(',')[0] : '';
  const cRole = contactF ? (contactF.value.split(',')[1] || '').trim() : '';
  const right = '<div class="fmrun-side" style="width:190px;flex:none;display:flex;flex-direction:column;gap:8px">' +
    side('Contacts (1)', '<div style="display:flex;gap:8px;align-items:flex-start">' + initials(cName, 24, '#7C98B6') + '<span style="min-width:0;line-height:1.35;font-size:11.5px;color:' + INK + '"><b style="display:block;color:#0091AE">' + esc(cName) + '</b><span style="color:' + SUB + '">' + esc(cRole) + '</span><br>' + (emailF ? val(emailF) : '') + '</span></div>') +
    side('Deals (1)', '<div style="font-size:11.5px;line-height:1.4;color:' + INK + '"><b style="color:#0091AE">' + esc(co) + ' · Renewal</b><br><span style="color:' + SUB + '">Renewal · ' + esc((fields.find((f) => /renewal/i.test(f.label)) || {}).value || '') + '</span></div>') +
    side('Tickets (1)', '<div style="font-size:11.5px;line-height:1.4;color:' + INK + '"><b style="color:#0091AE">Handoff report export is empty</b><br><span style="color:' + SUB + '">Zendesk · New</span></div>') + '</div>';
  const nav = (t, d, on) => '<div style="display:flex;align-items:center;gap:7px;padding:6px 9px;border-radius:5px;font-size:11.5px;color:#fff;' + (on ? 'background:' + ACT : 'opacity:.85') + '">' + lic(d, 12, '#fff') + esc(t) + '</div>';
  const leftNav = '<div class="fmrun-side" style="width:104px;flex:none;background:' + NAV + ';padding:8px 6px;display:flex;flex-direction:column;gap:2px">' + nav('Bookmarks', IC.layers) + '<div style="border-top:1px solid rgba(255,255,255,.18);margin:5px 4px"></div>' + nav('CRM', IC.user, true) + nav('Marketing', IC.mail) + nav('Content', IC.note) + nav('Sales', IC.chart) + nav('Service', IC.inbox) + '</div>';
  const top = '<div style="height:36px;flex:none;background:' + NAV + ';display:flex;align-items:center;gap:12px;padding:0 12px;border-bottom:1px solid rgba(255,255,255,.08)">' + appChip(step.app, 18) +
    '<span style="margin-left:72px;flex:1;max-width:330px;display:flex;align-items:center;justify-content:space-between;gap:6px;border:1px solid rgba(255,255,255,.35);color:rgba(255,255,255,.8);font-size:11.5px;border-radius:999px;padding:4px 12px">Search HubSpot' + lic(IC.search, 12, '#fff') + '</span>' +
    '<span style="margin-left:auto;display:flex;align-items:center;gap:7px;color:#fff;font-size:11.5px">' + wsTile(18, 9, '#FF7A59', '#fff') + esc(WS.n) + ' ▾</span></div>';
  return '<div style="position:absolute;inset:0;display:flex;flex-direction:column;font-family:\'Inter\',\'Lato\',system-ui,sans-serif">' + top +
    '<div style="flex:1;min-height:0;display:flex">' + leftNav + '<div style="flex:1;min-width:0;background:#F0F3F6;padding:10px;display:flex;gap:8px;min-height:0;border-top-left-radius:10px">' + left + mid + right + '</div></div></div>';
}
SKINS['crm-record'] = Object.assign(SKINS['crm-record'] || {}, { hubspot: hubspotRecord });

/* ---------- IssueRecord (candidate frame type "issue"): Linear ---------- */
const PRI = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
const priIcon = (p) => {
  if (p === 'Urgent') return '<span style="width:14px;height:14px;border-radius:3px;background:#F2994A;color:#fff;font-size:10px;font-weight:900;display:inline-flex;align-items:center;justify-content:center;flex:none">!</span>';
  const n = PRI[p] || 0;
  return '<svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true" style="flex:none">' + [0, 1, 2].map((i) => '<rect x="' + (1.5 + i * 5) + '" y="' + (10 - i * 3.5) + '" width="3" height="' + (4 + i * 3.5) + '" rx="1" fill="' + (i < n ? '#C9CBD1' : '#3A3B40') + '"/>').join('') + '</svg>';
};
function linearIssue(c, V, step) {
  const s = c.search || {};
  const open = V.on('linked-new');
  const hi = V.on('comment');
  const pri = c.priority && typeof c.priority === 'object' ? (hi ? c.priority.to : c.priority.from) : c.priority;
  const rows = V.on('matches')
    ? (s.matches || []).map((m, i) => '<div class="' + V.enter('matches') + (m.match ? V.mark('match') : '') + '" style="animation-delay:' + (i * 0.2) + 's;display:flex;flex-direction:column;gap:3px;padding:9px 12px;border-bottom:1px solid #26272B;' + (m.match && open ? 'background:#262840' : 'background:#1B1C1F') + '"><div style="display:flex;align-items:center;gap:7px;font-size:11.5px;color:#8A8F98">' + priIcon(m.match && hi ? c.priority.to : m.priority) + '<span>' + esc(m.key) + '</span><span style="margin-left:auto;display:inline-flex;align-items:center;gap:3px">' + lic(IC.link, 11) + (m.match && open ? (c.linked || []).length : m.linked) + '</span></div><span style="font-size:12.5px;color:#E6E6E8;line-height:1.35;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">' + esc(m.title) + '</span></div>').join('')
    : [70, 55, 62].map((w) => '<div style="padding:12px;border-bottom:1px solid #26272B;display:flex;flex-direction:column;gap:8px"><span class="fmrun-sk" style="width:40%"></span><span class="fmrun-sk" style="width:' + w + '%"></span></div>').join('');
  const list = '<div style="width:230px;flex:none;border-right:1px solid #2A2B30;display:flex;flex-direction:column;background:#1B1C1F"><div style="flex:none;padding:10px 12px;border-bottom:1px solid #2A2B30;display:flex;flex-direction:column;gap:6px"><span style="display:flex;align-items:center;gap:6px;font-size:12px;color:#C9CBD1;border:1px solid #34353B;border-radius:6px;padding:5px 8px">' + lic(IC.search, 12) + '<span style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">' + esc(s.query) + '</span></span><span style="font-size:11px;color:#8A8F98">' + (V.on('matches') ? (s.matches || []).length + ' results · ' + esc(s.scope || '') : 'Searching ' + esc(s.scope || '') + '...') + '</span></div><div style="flex:1;min-height:0;overflow:hidden">' + rows + '</div></div>';
  const chip = (html, key) => '<span class="' + (key ? V.mark(key) : '') + '" style="display:inline-flex;align-items:center;gap:6px;border:1px solid #34353B;border-radius:6px;padding:3px 8px;font-size:12px;color:#C9CBD1;background:#1B1C1F;white-space:nowrap">' + html + '</span>';
  const linked = (c.linked || []).map((l) => {
    const isNew = !!l.new;
    return '<div class="' + (isNew ? V.enter('linked-new') : '') + '" style="display:flex;align-items:center;gap:8px;padding:6px 9px;border-top:1px solid #26272B;font-size:12px;' + (isNew && V.fresh('linked-new') ? 'background:#262840' : '') + '">' + appChip('zendesk', 14) + '<b style="font-weight:600;color:#E6E6E8">' + esc(l.company) + '</b><span style="color:#8A8F98">' + esc(l.id) + (l.person ? ' · ' + esc(l.person) : '') + '</span><span style="margin-left:auto;color:#8A8F98">' + esc(l.time) + '</span>' + (isNew ? '<span style="font-size:10px;font-weight:700;color:#5E6AD2;background:#2D2F55;border-radius:4px;padding:1px 5px">New</span>' : '') + '</div>';
  }).join('');
  const desc = (c.description || []).map((d) => {
    if (d.key && !V.on(d.key)) return '';
    return '<div class="' + (d.key ? V.enter(d.key) : '') + '" style="display:flex;gap:8px;font-size:12px;line-height:1.45"><span style="flex:none;width:70px;color:#8A8F98">' + esc(d.label) + '</span><span style="color:#C9CBD1;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:0">' + esc(d.text) + '</span></div>';
  }).join('');
  const cm = c.comment;
  const comment = cm && V.on('comment') ? '<div class="' + V.enter('comment') + V.mark('comment') + '" style="flex:none;display:flex;gap:8px;align-items:flex-start;border:1px solid #2A2B30;border-radius:8px;padding:8px 10px;background:#202125"><span style="width:20px;height:20px;border-radius:50%;background:#EEECFF;display:flex;align-items:center;justify-content:center;flex:none">' + fmLogo(14) + '</span><div style="min-width:0;font-size:12px;line-height:1.45;color:#C9CBD1"><b style="color:#E6E6E8">' + esc(cm.author) + '</b> <span style="color:#8A8F98">' + esc(cm.time) + '</span><div>' + esc(cm.text) + '</div></div></div>' : '';
  const assignee = CAST[c.assignee] || { n: c.assignee };
  const detail = open
    ? '<div class="' + V.enter('linked-new') + '" style="flex:1;min-width:0;display:flex;flex-direction:column;gap:10px;padding:14px 18px;overflow:hidden;background:#1B1C1F">' +
      '<div style="flex:none;font-size:11.5px;color:#8A8F98">' + esc(c.team) + ' › ' + esc(c.key) + '</div><b style="flex:none;font-size:17px;line-height:1.3;color:#E6E6E8">' + esc(c.title) + '</b>' +
      '<div style="flex:none;display:flex;flex-wrap:wrap;gap:6px">' + chip('<span style="width:11px;height:11px;border-radius:50%;border:2px solid #B8BBC2;flex:none"></span>' + esc(c.status)) + chip(priIcon(pri) + esc(pri), 'priority') + chip(avatar(c.assignee, 16) + esc(assignee.n || '')) + (c.labels || []).map((l) => chip('<span style="width:7px;height:7px;border-radius:50%;background:' + (/customer/.test(l) ? '#EB5757' : '#5E6AD2') + '"></span>' + esc(l))).join('') + '</div>' +
      '<div style="flex:none;border:1px solid #2A2B30;border-radius:8px;overflow:hidden"><div style="padding:6px 9px;font-size:11px;font-weight:600;color:#8A8F98;background:#202125">' + esc(c.linkedTitle || 'Linked tickets') + ' · ' + (V.on('linked-new') ? (c.linked || []).length : (c.linked || []).length - 1) + '</div>' + linked + '</div>' +
      '<div style="flex:1;min-height:0;overflow:hidden;display:flex;flex-direction:column;gap:6px">' + desc + '</div>' + comment + '</div>'
    : '<div style="flex:1;display:flex;flex-direction:column;gap:12px;padding:22px 20px"><span class="fmrun-sk" style="width:30%"></span><span class="fmrun-sk" style="width:70%;height:14px"></span><span class="fmrun-sk" style="width:55%"></span><span class="fmrun-sk" style="width:80%"></span></div>';
  const nav = (t, d, on) => '<div style="display:flex;align-items:center;gap:8px;padding:5px 8px;border-radius:6px;font-size:12.5px;color:' + (on ? '#E6E6E8' : '#C9CBD1') + ';' + (on ? 'background:#26272C;font-weight:600' : '') + '">' + lic(d, 13, '#8A8F98') + esc(t) + '</div>';
  const side = '<div class="fmrun-side" style="width:150px;flex:none;background:#151618;border-right:1px solid #2A2B30;padding:10px 8px;display:flex;flex-direction:column;gap:2px">' +
    '<div style="display:flex;align-items:center;gap:7px;padding:2px 6px 10px">' + wsTile(18, 5, '#1F4D3A', '#fff') + '<b style="font-size:12.5px;color:#E6E6E8">' + esc(WS.n) + '</b></div>' +
    nav('Inbox', IC.inbox) + nav('My issues', IC.user) + '<div style="font-size:11px;color:#8A8F98;padding:10px 8px 3px">Your teams</div>' + nav(c.team || 'Web', IC.layers) + nav('Issues', IC.ticket, true) + nav('Triage', IC.inbox) + nav('Projects', IC.chart) + '</div>';
  return '<style>.fmrun-lin .fmrun-k-mark{background:rgba(94,106,210,.30)!important;box-shadow:0 0 0 2px #7C86F0}.fmrun-lin .fmrun-sk{background:#2A2B30}</style><div class="fmrun-lin" style="position:absolute;inset:0;display:flex;font-family:\'Inter\',\'Lato\',system-ui,sans-serif;background:#1B1C1F;color:#E6E6E8">' + side + list + detail + '</div>';
}
FRAMES.IssueRecord = linearIssue;
SKINS.IssueRecord = { linear: linearIssue };

function renderFrame(step, V) {
  const f = step.frame || {};
  const kind = f.type === 'custom' ? f.component : f.type;
  const fn = skinFor(kind, step.app) || FRAMES[kind];
  if (!fn) return '<div style="padding:24px;color:#6B6E83">No renderer for "' + esc(f.type === 'custom' ? f.component : f.type) + '" yet.</div>';
  return fn(f.content || {}, V, step);
}

const BADGE = {
  agent: () => '<span class="fmrun-badge fmrun-b-agent">' + svg(SP, 14, '#6557FF', 2.2) + 'Agent deciding</span>',
  rules: () => '<span class="fmrun-badge fmrun-b-rules">' + svg(CHECK, 14, 'currentColor', 2.6) + 'Following your rules</span>',
  end: (txt) => {
    const cls = /review/i.test(txt) ? 'fmrun-b-review' : /done/i.test(txt) ? 'fmrun-b-done' : 'fmrun-b-ready';
    const icon = /review/i.test(txt) ? svg('M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z', 14, 'currentColor', 2.2) : svg(CHECK, 14, 'currentColor', 2.6);
    return '<span class="fmrun-badge ' + cls + '">' + icon + esc(txt) + '</span>';
  },
};

/* Timeline: lines appear one after another; each step holds briefly, the end state holds end.hold seconds. */
function timeline(s) {
  const steps = [];
  let t = 0;
  s.steps.forEach((st) => {
    const start = t;
    t += 0.5;
    const lines = st.lines.map((l) => { const at = t; t += l.dur || 2.4; return at; });
    t += 0.8;
    steps.push({ start, lines, end: t });
  });
  return { steps, runEnd: t, total: t + (s.end?.hold || 4) };
}
function stateAt(tl, T) {
  if (T >= tl.runEnd) return { si: tl.steps.length - 1, active: -1, final: true };
  const si = Math.max(0, tl.steps.findIndex((x) => T >= x.start && T < x.end));
  const st = tl.steps[si];
  let active = -1;
  st.lines.forEach((at, i) => { if (T >= at) active = i; });
  return { si, active, final: false };
}

function renderCard(s, state) {
  const { si, active, final } = state;
  const rows = s.steps.map((st, i) => {
    const run = i === si && !final, done = i < si || final;
    const icon = run ? fmLogo(30) + '<span class="fmrun-spin"></span>' : done ? '<span class="fmrun-dn">' + svg(CHECK, 13, '#1E9E6E', 3.5) + '</span>' : '<span class="fmrun-num">' + (i + 1) + '</span>';
    const app = APPS[st.app] || { n: st.app };
    let inner = '<div class="fmrun-verb">' + esc(st.title) + '</div><div class="fmrun-in"><span style="display:flex;align-items:center;gap:5px">in ' + appChip(st.app, 14) + '<b>' + esc(app.n) + '</b></span>' + (st.skill ? '<span class="fmrun-skill">Skill: ' + esc(st.skill) + '</span>' : '') + '</div>';
    if (run) {
      inner += '<div class="fmrun-uses">' + (st.uses || []).map((u) => '<span class="fmrun-use">' + svg('M12 5v14M5 12l7 7 7-7', 11, '#1E9E6E', 3) + esc(u) + '</span>').join('') + '</div>' +
        st.lines.map((l, j) => '<div class="fmrun-ln ' + (l.type === 'judgment' ? 'fmrun-j' : 'fmrun-r') + (j === active ? ' fmrun-cur' : '') + (j > active ? ' fmrun-pending' : '') + '"><span>' + (l.type === 'judgment' ? svg(SP, 13, '#6557FF', 2.2) : svg('M5 12h14M13 6l6 6-6 6', 13, '#A3A5B6', 2.4)) + '<span class="fmrun-lt">' + esc(l.text) + '</span></span></div>').join('');
    }
    if (done) inner += '<div class="fmrun-res">' + esc(st.result) + '</div>';
    return '<div class="fmrun-row ' + (run ? 'fmrun-run' : done ? 'fmrun-done' : 'fmrun-wait') + '" data-i="' + i + '" role="button" tabindex="0" aria-label="' + esc('Play from step ' + (i + 1) + ': ' + st.title) + '"><div class="fmrun-ico">' + icon + '</div><div class="fmrun-rt">' + inner + '</div></div>';
  }).join('');
  const st = s.steps[si];
  const V = keyState(st, active, final);
  const badge = final ? BADGE.end(s.end?.badge || 'Done') : active < 0 ? (st.lines[0].type === 'judgment' ? BADGE.agent() : BADGE.rules()) : (st.lines[active].type === 'judgment' ? BADGE.agent() : BADGE.rules());
  return '<div class="fmrun-rc"><div class="fmrun-rl"><div class="fmrun-rl-head">' + fmLogo(36) + '<div class="fmrun-rl-title">' + esc(s.title) + '</div></div>' +
    '<div class="fmrun-rl-trig"><span style="flex:none;width:30px;display:flex;justify-content:center">' + svg('M13 2L4 14h7l-1 8 9-12h-7z', 15, '#6B6E83', 2.2) + '</span><span>' + esc(s.trigger.label) + ' · <b>' + esc(s.trigger.time) + '</b></span></div>' +
    '<div class="fmrun-rl-list"><div class="fmrun-rl-scroll"><div class="fmrun-rl-rail"></div>' + rows + '</div></div></div>' +
    '<div class="fmrun-rr"><div class="fmrun-rr-head"><div class="fmrun-rr-title">' + esc(st.title) + '</div>' + badge + '</div><div class="fmrun-frame">' + renderFrame(st, V) + '</div></div></div>';
}

function heroStep(s) {
  const n = s.hero && Number(s.hero.step);
  return (n >= 1 && s.steps[n - 1]) || s.steps[s.steps.length - 1];
}
function renderHero(s) {
  const apps = [s.trigger.app, ...s.steps.map((x) => x.app)].filter((a, i, all) => i === 0 || a !== all[i - 1]);
  const chain = apps.map((a, i) => (i ? '<span class="fmrun-link"></span>' : '') + (a === 'flowmate'
    ? '<span class="fmrun-node" style="background:#EEECFF;border:1px solid #C9C2FF;box-shadow:0 0 0 5px rgba(101,87,255,.12)">' + svg(SP, 16, '#6557FF', 2.2) + '</span>'
    : '<span class="fmrun-node" style="background:#fff;border:1px solid #E6E7EE">' + appChip(a, 22) + '</span>')).join('');
  const last = heroStep(s);
  const V = keyState(last, -1, true);
  return '<div class="fmrun-strip"><div class="fmrun-chain" role="img" aria-label="' + esc(apps.map((a) => (APPS[a] || { n: a }).n).join(', ')) + '">' + chain + '</div><div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap"><span style="font-size:13px;font-weight:700;color:#6B6E83">' + esc(s.trigger.label) + ' · ' + esc(s.trigger.time) + '</span>' + BADGE.end(s.end?.badge || 'Done') + '</div></div>' +
    '<div class="fmrun-frame fmrun-hero-frame">' + renderFrame(last, V) + '</div>';
}


  /* ---------- Player ---------- */
  var MIN_SCALE = 0.6, CARD_W = 1282, CARD_H = 642;
  var reduced = function () { return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches; };

  function Player(root, script) {
    this.root = root; this.s = script; this.tl = timeline(script);
    this.T = 0; this.lastKey = ''; this.visible = false; this.raf = 0; this.prev = 0;
    root.classList.add('fmrun-player');
    root.innerHTML = '<div class="fmrun-stage"><div class="fmrun-stage-box"><div class="fmrun-stage-in"></div></div></div><div class="fmrun-ctl"><div class="fmrun-swipe" hidden>Swipe to follow the steps</div><button type="button" class="fmrun-pp" aria-pressed="false">Pause</button></div>';
    this.paused = false;
    this.stage = root.querySelector('.fmrun-stage');
    this.box = root.querySelector('.fmrun-stage-box');
    this.inner = root.querySelector('.fmrun-stage-in');
    this.hint = root.querySelector('.fmrun-swipe');
    this.pp = root.querySelector('.fmrun-pp');
    this.inner.setAttribute('aria-label', 'Run animation: ' + script.title + '. Choose a step to play from there.');
    this.inner.setAttribute('role', 'group');
    var self = this;
    this.fit();
    window.addEventListener('resize', function () { self.fit(); });
    /* Clicking a step in the list plays the run from that step (reduced motion: shows that step's end state). */
    var go = function (i) {
      var st = self.tl.steps[i]; if (!st) return;
      self.T = reduced() ? st.end - 0.05 : st.start + 0.01;
      self.draw(true);
    };
    this.inner.addEventListener('click', function (e) {
      var r = e.target.closest && e.target.closest('.fmrun-row'); if (r) go(Number(r.getAttribute('data-i')));
    });
    this.kbd = false;
    this.inner.addEventListener('pointerdown', function () { self.kbd = false; });
    this.inner.addEventListener('keydown', function (e) {
      self.kbd = true;
      if (e.key !== 'Enter' && e.key !== ' ') return;
      var r = e.target.closest && e.target.closest('.fmrun-row'); if (!r) return;
      e.preventDefault(); go(Number(r.getAttribute('data-i')));
    });
    this.pp.addEventListener('click', function () {
      self.paused = !self.paused;
      self.pp.textContent = self.paused ? 'Play' : 'Pause';
      self.pp.setAttribute('aria-pressed', String(self.paused));
      if (!self.paused) { self.visible = true; self.start(); }
    });
    if (reduced()) { this.T = this.tl.runEnd + 0.01; this.paused = true; this.pp.textContent = 'Play'; this.draw(true); return; }
    this.draw(true);
    var answered = false;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { answered = true; self.visible = e.isIntersecting; if (self.visible) self.start(); });
      }, { threshold: 0.2 }).observe(root);
    }
    /* Some embeds never report visibility: start anyway after a moment. */
    setTimeout(function () { if (!answered) { self.visible = true; self.start(); } }, 900);
  }
  Player.prototype.fit = function () {
    var fw = this.stage.clientWidth || CARD_W;
    var sc = Math.max(MIN_SCALE, Math.min(1, fw / CARD_W));
    var scrolls = fw < CARD_W * MIN_SCALE;
    this.inner.style.transform = 'scale(' + sc + ')';
    this.box.style.width = Math.round(CARD_W * sc) + 'px';
    this.box.style.height = Math.round(CARD_H * sc) + 'px';
    this.box.style.marginLeft = scrolls ? '0' : Math.max(0, (fw - CARD_W * sc) / 2) + 'px';
    this.stage.style.overflowX = scrolls ? 'auto' : 'hidden';
    this.hint.hidden = !scrolls;
  };
  Player.prototype.start = function () {
    if (this.raf) return;
    var self = this; this.prev = performance.now();
    var loop = function (now) {
      if (!self.visible) { self.raf = 0; return; }
      if (!self.paused) self.T += Math.max(0, Math.min(0.1, (now - self.prev) / 1000));
      self.prev = now;
      if (self.T >= self.tl.total) self.T = 0;
      self.draw(false);
      self.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  };
  Player.prototype.draw = function (force) {
    var s = this.s, state = stateAt(this.tl, this.T);
    var key = state.si + ':' + state.active + ':' + state.final;
    if (key === this.lastKey && !force) return;
    this.lastKey = key;
    var ae = document.activeElement, fi = this.kbd && ae && this.inner.contains(ae) && ae.getAttribute('data-i');
    this.inner.innerHTML = renderCard(s, state);
    if (fi !== null && fi !== false && fi !== undefined) {
      var fr = this.inner.querySelector('.fmrun-row[data-i="' + fi + '"]');
      if (fr) try { fr.focus({ preventScroll: true }); } catch (e) { fr.focus(); }
    }
    var scroll = this.inner.querySelector('.fmrun-rl-scroll');
    var row = scroll && (scroll.querySelector('.fmrun-row.fmrun-run') || scroll.querySelector('.fmrun-row[data-i="' + (s.steps.length - 1) + '"]'));
    if (row) {
      var bottom = row.offsetTop + row.offsetHeight + 24;
      scroll.style.transform = 'translateY(' + -Math.max(0, bottom - scroll.parentElement.clientHeight) + 'px)';
    }
  };

  /* ---------- Hero result: the hero step's frame (hero.step, default the last step) in its final state ---------- */
  function HeroResult(root, script) {
    this.root = root; this.s = script;
    root.classList.add('fmrun-hero-result');
    var last = heroStep(script);
    root.innerHTML = '<div class="fmrun-hero-box"><div class="fmrun-frame fmrun-hero-frame">' + renderFrame(last, keyState(last, -1, true)) + '</div></div>';
    this.box = root.querySelector('.fmrun-hero-box');
    this.frame = root.querySelector('.fmrun-hero-frame');
    /* The result's buttons are never dead: they link to sign-up (data-fmrun-cta overrides the target). */
    var cta = root.getAttribute('data-fmrun-cta') || '/signup';
    root.querySelectorAll('.fmrun-act').forEach(function (b) {
      var a = document.createElement('a');
      a.href = cta; a.className = 'fmrun-act fmrun-act-link'; a.setAttribute('style', b.getAttribute('style') || '');
      a.textContent = b.textContent; b.parentNode.replaceChild(a, b);
    });
    var self = this;
    this.fit();
    window.addEventListener('resize', function () { self.fit(); });
  }
  HeroResult.prototype.fit = function () {
    var cw = this.root.clientWidth || 560;
    var narrow = cw < 560;
    var nw = narrow ? Math.max(420, Math.round(cw / 0.78)) : Math.max(560, Math.min(808, cw));
    var nh = narrow ? 400 : 440;
    var sc = Math.min(1, cw / nw);
    this.root.classList.toggle('fmrun-narrow', narrow);
    this.frame.style.width = nw + 'px'; this.frame.style.height = nh + 'px';
    this.frame.style.transform = 'scale(' + sc + ')';
    this.box.style.height = Math.round(nh * sc) + 'px';
  };

  function stripApps(s) {
    return [s.trigger.app].concat(s.steps.map(function (x) { return x.app; })).filter(function (a, i, all) { return i === 0 || a !== all[i - 1]; });
  }
  function renderStrip(s) {
    var apps = stripApps(s);
    var chain = apps.map(function (a, i) {
      return (i ? '<span class="fmrun-link"></span>' : '') + (a === 'flowmate'
        ? '<span class="fmrun-node fmrun-node-agent">' + fmLogo(38) + '</span>'
        : '<span class="fmrun-node">' + appChip(a, 22) + '</span>');
    }).join('');
    return '<div class="fmrun-strip"><div class="fmrun-chain" role="img" aria-label="' + esc(apps.map(function (a) { return (APPS[a] || { n: a }).n; }).join(', ')) + '">' + chain + '</div>' +
      '<div class="fmrun-strip-meta"><span class="fmrun-strip-status">' + esc(s.trigger.label) + ', ' + esc(s.trigger.time) + '</span>' + BADGE.end((s.end && s.end.badge) || 'Done') + '</div></div>';
  }
  function renderConnected(s) {
    var seen = {};
    return stripApps(s).filter(function (a) { if (a === 'flowmate' || seen[a]) return false; seen[a] = 1; return true; }).map(function (a) {
      return '<span class="fmrun-conn">' + appChip(a, 20) + '<span>' + esc((APPS[a] || { n: a }).n) + '</span>' + svg(CHECK, 14, '#1E9E6E', 3) + '</span>';
    }).join('');
  }

  /* ---------- Checks (run-script-spec.md, section 6) ---------- */
  var KEYS = {
    meeting: ['moments', 'markers'],
    workspace: ['rules', 'rule-#', 'memory', 'output'],
    'crm-record': ['note', 'activity', 'stage'],
    'task-list': ['rows', 'row-#', 'assignees', 'dates'],
    email: ['draft', 'paragraph-#', 'actions'],
    chat: ['message-#', 'card', 'actions'],
    'lead-list': ['rows', 'row-#', 'stream', 'count', 'titles', 'scores', 'reasons', 'status', 'comments', 'icebreakers'],
    'social-post': ['post', 'text', 'stats', 'age', 'verdict', 'comments', 'comment-#'],
    'post-list': ['rows', 'row-#', 'stream', 'count', 'drops', 'verdicts', 'kept'],
    'crm-lookup': ['rows', 'row-#', 'stream', 'count', 'skips', 'record'],
    ticket: ['message', 'reply', 'note', 'status', 'priority', 'tags'],
    IssueRecord: ['matches', 'match', 'linked-new', 'steps', 'priority', 'comment'],
    CampaignLeads: ['leads', 'stream', 'email', 'field-icebreaker', 'field-use-case', 'schedule', 'actions', 'count'],
  };
  var BADGES = { Supervised: 'Waits for your review', Assisted: 'Ready for you', Automated: 'Done' };
  function allStrings(o, out) {
    if (typeof o === 'string') out.push(o);
    else if (Array.isArray(o)) o.forEach(function (x) { allStrings(x, out); });
    else if (o && typeof o === 'object') Object.keys(o).forEach(function (k) { allStrings(o[k], out); });
    return out;
  }
  function check(s) {
    var R = [];
    var err = function (m) { R.push({ level: 'error', msg: m }); };
    var warn = function (m) { R.push({ level: 'warn', msg: m }); };
    if (!s || !Array.isArray(s.steps)) { err('Run script is missing or not valid JSON.'); return R; }
    if (!s.version) warn('No version number.');
    if (!BADGES[s.autonomy]) err('Autonomy must be Automated, Assisted or Supervised.');
    if (!s.trigger || !s.trigger.app) err('Trigger app missing.');
    // 1 counts and lengths
    if (s.steps.length < 3 || s.steps.length > 7) err('Run has ' + s.steps.length + ' steps (3 to 7 allowed).');
    var judg = 0;
    s.steps.forEach(function (st, i) {
      var n = 'Step ' + (i + 1);
      if ((st.title || '').length > 40) err(n + ' title over 40 characters.');
      if (!st.lines || st.lines.length < 1 || st.lines.length > 3) err(n + ' has ' + ((st.lines || []).length) + ' lines (1 to 3 allowed).');
      (st.lines || []).forEach(function (l, j) {
        if ((l.text || '').length > 55) err(n + ', line ' + (j + 1) + ' over 55 characters.');
        if (l.type !== 'rule' && l.type !== 'judgment') err(n + ', line ' + (j + 1) + ' has no valid type.');
        if (l.type === 'judgment') judg++;
      });
      // 3 every step needs its result line
      if (!st.result) err(n + ' has no result line.');
      else if (st.result.length > 35) err(n + ' result over 35 characters.');
      // 5 frame and keys
      var f = st.frame || {}, ft = f.type === 'custom' ? f.component : f.type;
      if (!FRAMES[ft]) err(n + ': frame "' + ft + '" is not built yet.');
      var allowed = (KEYS[ft] || []).slice();
      if (f.type === 'crm-record') ((f.content || {}).fields || []).forEach(function (x) { if (x.key) allowed.push(x.key); });
      (st.lines || []).forEach(function (l) {
        (l.show || []).concat(l.mark || []).forEach(function (k) {
          var ok = allowed.indexOf(k) >= 0 || allowed.some(function (a) { return /#$/.test(a) && new RegExp('^' + a.slice(0, -1) + '\\d+$').test(k); });
          if (!ok) err(n + ': key "' + k + '" does not exist in frame "' + ft + '".');
        });
      });
      // 6 apps
      if (st.app && !APPS[st.app]) err(n + ': app "' + st.app + '" is not on this page (Apps collection).');
    });
    if (s.trigger && s.trigger.app && !APPS[s.trigger.app]) err('Trigger app "' + s.trigger.app + '" is not on this page (Apps collection).');
    // 2 at least one judgment line
    if (!judg) err('No judgment line in the run.');
    if (s.hero && s.hero.step && !s.steps[Number(s.hero.step) - 1]) err('hero.step ' + s.hero.step + ' does not exist.');
    // 4 control moment
    if (s.end && BADGES[s.autonomy] && s.end.badge !== BADGES[s.autonomy]) err('End badge should be "' + BADGES[s.autonomy] + '" for ' + s.autonomy + '.');
    var lastC = (s.steps[s.steps.length - 1].frame || {}).content || {};
    var acts = allStrings(lastC.actions || [], []).join(' | ');
    if (s.autonomy === 'Automated' && /approve/i.test(acts)) err('Automated run ends on an approve action.');
    if (s.autonomy === 'Automated' && !acts) warn('Automated run should end on actions to inspect or stop it.');
    if ((s.autonomy === 'Supervised' || s.autonomy === 'Assisted') && !/approve|edit/i.test(acts)) err(s.autonomy + ' run should end on actions to edit or approve.');
    // cast ids
    var castIds = [];
    s.steps.forEach(function (st) {
      var c = (st.frame || {}).content || {};
      (c.participants || []).forEach(function (p) { castIds.push(p); });
      if (c.owner) castIds.push(c.owner);
      (c.rows || []).forEach(function (r) { if (r.assignee) castIds.push(r.assignee); });
    });
    castIds.forEach(function (id) { if (!CAST[id]) warn('Cast "' + id + '" has no photo on this page (Cast collection).'); });
    // 8 wording
    allStrings(s, []).forEach(function (t) {
      if (/\u2014/.test(t)) err('Em dash in: "' + t.slice(0, 50) + '"');
      if (/\bMCP\b/.test(t) || /\bflows?\b/i.test(t) || /\binside\b/i.test(t)) err('Retired term in: "' + t.slice(0, 50) + '"');
    });
    // 7 is a content comparison with the Page copy sheet: reported as a manual check
    R.push({ level: 'info', msg: 'Manual: names, amounts and texts match the Page copy sheet (check 7).' });
    return R;
  }
  function report(results, title) {
    var errors = results.filter(function (r) { return r.level === 'error'; });
    var warns = results.filter(function (r) { return r.level === 'warn'; });
    if (window.console) {
      console[errors.length ? 'warn' : 'info']('[FMRun ' + VERSION + '] ' + title + ': ' + (errors.length ? errors.length + ' failed check(s)' : 'all checks passed'));
      results.forEach(function (r) { console.log('  ' + r.level + ': ' + r.msg); });
    }
    // Staging shows the box only when a check fails or warns; ?fmrun-check always shows the full report
    var forced = /[?&]fmrun-check/.test(location.search);
    var show = forced || (/\.webflow\.io$/.test(location.hostname) && (errors.length || warns.length));
    if (!show) return;
    var box = document.createElement('div');
    box.className = 'fmrun-checks' + (errors.length ? ' fmrun-checks-bad' : '');
    box.innerHTML = '<b>Run script checks: ' + esc(title) + '</b><span>' + (errors.length ? errors.length + ' failed' : 'All passed') + (warns.length ? ', ' + warns.length + ' warning(s)' : '') + '</span>' +
      '<ul>' + results.map(function (r) { return '<li class="fmrun-c-' + r.level + '">' + esc(r.msg) + '</li>'; }).join('') + '</ul><button type="button" aria-label="Close checks">Close</button>';
    box.querySelector('button').addEventListener('click', function () { box.remove(); });
    document.body.appendChild(box);
  }

  /* ---------- Init: reads the page and mounts every target ---------- */
  function parseScript(el) {
    if (!el) return null;
    var txt = (el.value || el.textContent || '').trim();
    try { return JSON.parse(txt); } catch (e) { return null; }
  }
  function init(doc) {
    doc = doc || document;
    loadRegistry(doc);
    var src = doc.querySelector('[data-fmrun-script]');
    if (!src) return null;
    var s = parseScript(src);
    var results = check(s);
    report(results, (s && s.title) || 'Run script');
    if (!s || results.some(function (r) { return r.level === 'error' && /missing or not valid|not built/.test(r.msg); })) return { script: s, results: results };
    doc.querySelectorAll('[data-fmrun="player"]').forEach(function (el) { new Player(el, s); });
    doc.querySelectorAll('[data-fmrun="hero-strip"]').forEach(function (el) { el.innerHTML = renderStrip(s); });
    doc.querySelectorAll('[data-fmrun="hero-result"]').forEach(function (el) { new HeroResult(el, s); });
    doc.querySelectorAll('[data-fmrun="connected"]').forEach(function (el) { el.classList.add('fmrun-connected'); el.innerHTML = renderConnected(s); });
    return { script: s, results: results };
  }

  window.FMRun = { version: VERSION, init: init, check: check, loadRegistry: loadRegistry, Player: Player };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { init(document); });
  else init(document);
})();

