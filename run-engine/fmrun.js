/*! FlowMate run animation engine v1.2.3. Plays a run script (run-script-spec.md) from the page's CMS data. */
(function () {
  'use strict';
  if (window.FMRun) return;
  var VERSION = '1.2.3';
  var APPS = { flowmate: { n: 'FlowMate', fm: true } };
  var CAST = {};
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

/* Visibility: a key listed in any line's "show" stays hidden until that line is active.
   A key in the active line's "mark" gets the highlight. Keys not listed are always visible. */
function keyState(step, active, final) {
  const showAt = {};
  step.lines.forEach((l, i) => (l.show || []).forEach((k) => { if (!(k in showAt)) showAt[k] = i; }));
  const marks = final || active < 0 ? [] : (step.lines[active].mark || []);
  const on = (k) => final || !(k in showAt) || showAt[k] <= active;
  const enter = (k) => (!final && showAt[k] === active ? ' fmrun-k-enter' : '');
  return {
    on,
    enter,
    fresh: (k) => !final && showAt[k] === active,
    cls: (k) => (on(k) ? enter(k) : 'fmrun-k-hidden') + (marks.includes(k) ? ' fmrun-k-mark' : ''),
    mark: (k) => (marks.includes(k) ? ' fmrun-k-mark' : ''),
  };
}

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
    const rules = (c.rules || []).map((r, i) => '<span class="' + V.mark('rule-' + (i + 1)) + '" style="padding:2px 6px;margin:0 -6px">' + (i + 1) + '. ' + esc(r) + '</span>').join('');
    const mem = (c.memory || []).map((m) => '<span>' + esc(m) + '</span>').join('');
    const out = V.on('output')
      ? (c.output || []).map((o, i) => '<div class="' + V.enter('output') + '" style="animation-delay:' + (i * 0.25) + 's"><span style="font-size:11px;font-weight:900;color:' + (/blocker/i.test(o.label) ? '#D2453B' : '#6B6E83') + '">' + esc(o.label) + '</span><br>' + esc(o.text) + '</div>').join('')
      : '<div style="display:flex;flex-direction:column;gap:10px"><span class="fmrun-sk" style="width:70%"></span><span class="fmrun-sk" style="width:85%"></span><span class="fmrun-sk" style="width:55%"></span></div>';
    return '<div style="position:absolute;inset:0;display:flex;flex-direction:column"><div class="fmrun-fh">' + fmLogo(20) + '<b>FlowMate · Agent workspace</b></div>' +
      '<div style="flex:1;display:grid;grid-template-columns:270px minmax(0,1fr);min-height:0"><div style="background:#FBFBFD;border-right:1px solid #E6E7EE;padding:18px;display:flex;flex-direction:column;gap:12px"><div style="font-size:11px;font-weight:900;color:#6557FF">Your skill</div>' +
      '<div class="' + V.mark('rules') + '" style="background:#fff;border:1px solid #E6E7EE;border-radius:10px;padding:14px;display:flex;flex-direction:column;gap:8px"><div style="font-weight:900;font-size:15px">' + esc(c.rulesTitle) + '</div><div style="display:flex;flex-direction:column;gap:6px;color:#3A3C55">' + rules + '</div></div>' +
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

  'lead-list'(c, V) {
    const map = { Name: 'name', Title: 'title', Company: 'company', Score: 'score', Reason: 'reason', Status: 'status' };
    const gate = { Score: 'scores', Reason: 'reasons', Status: 'status', Title: 'titles' };
    const cnt = c.count || {};
    const countTxt = V.on('count') ? (cnt.to || '') : (cnt.from || '');
    const head = '<tr>' + (c.columns || []).map((h) => '<th>' + esc(h) + '</th>').join('') + '</tr>';
    const rows = V.on('rows') ? (c.rows || []).map((r, i) => {
      const out = /removed|left out/i.test(r.status || '');
      const tds = (c.columns || []).map((h) => {
        const f = map[h] || h.toLowerCase(), g = gate[h], shown = !g || V.on(g);
        let v = r[f];
        if (!shown) return '<td></td>';
        if (g && V.fresh(g) && f !== 'name') {
          const inner = f === 'score' ? '<span class="fmrun-score" style="color:' + (v >= 70 ? '#0B7A57' : '#A3A5B6') + '">' + esc(v) + '</span>' : f === 'status' ? '<span class="fmrun-pill ' + (out ? 'fmrun-p-out' : /strong/i.test(v) ? 'fmrun-p-ok' : 'fmrun-p-todo') + '">' + esc(v) + '</span>' : esc(v);
          return '<td' + (f === 'reason' ? ' style="color:#3A3D55;max-width:220px"' : '') + '><span class="fmrun-k-enter" style="display:inline-block;animation-delay:' + (i * 0.12) + 's">' + inner + '</span></td>';
        }
        if (f === 'name') return '<td><span style="display:inline-flex;align-items:center;gap:8px">' + initials(r.name, 24) + '<b style="font-weight:700">' + esc(v) + '</b></span></td>';
        if (f === 'score') return '<td><span class="fmrun-score" style="color:' + (v >= 70 ? '#0B7A57' : '#A3A5B6') + '">' + esc(v) + '</span></td>';
        if (f === 'status') return '<td><span class="fmrun-pill ' + (out ? 'fmrun-p-out' : /strong/i.test(v) ? 'fmrun-p-ok' : 'fmrun-p-todo') + '">' + esc(v) + '</span></td>';
        if (f === 'reason') return '<td style="color:#3A3D55;max-width:220px">' + esc(v) + '</td>';
        return '<td style="color:#3A3D55">' + esc(v) + '</td>';
      }).join('');
      const dim = out && V.on(gate.Status) ? 'opacity:.55;' : '';
      return '<tr class="' + V.mark('row-' + (i + 1)) + V.enter('rows') + '" style="' + dim + 'animation-delay:' + (i * 0.15) + 's">' + tds + '</tr>';
    }).join('') : '<tr><td colspan="' + (c.columns || []).length + '"><span class="fmrun-sk" style="display:block;width:60%"></span></td></tr><tr><td colspan="' + (c.columns || []).length + '"><span class="fmrun-sk" style="display:block;width:45%"></span></td></tr>';
    return '<div style="position:absolute;inset:0;display:flex;flex-direction:column"><div class="fmrun-fh">' + fmLogo(18) + '<b>' + esc(c.title) + '</b><span class="' + V.mark('count') + V.enter('count') + '" style="margin-left:auto;font-weight:700;color:#3A3D55;padding:2px 8px">' + esc(countTxt) + '</span></div>' +
      '<div style="flex:1;min-height:0;overflow:hidden;padding:4px 10px"><table class="fmrun-tbl"><thead>' + head + '</thead><tbody>' + rows + '</tbody></table></div></div>';
  },

  chat(c, V) {
    const msgs = (c.messages || []).map((m, i) => {
      const cd = m.card;
      const card = cd ? '<div class="' + V.cls('card') + '" style="border:1px solid #E6E7EE;border-radius:10px;padding:12px 14px;margin-top:10px"><div style="font-size:12px;font-weight:700;color:#6B6E83;margin-bottom:8px">' + esc(cd.title) + '</div>' + cd.rows.map((r) => '<div style="display:flex;align-items:center;gap:10px;margin-top:8px">' + initials(r.name, 26) + '<div style="flex:1;min-width:0"><div style="font-weight:700">' + esc(r.name) + '</div><div style="font-size:12px;color:#6B6E83">' + esc(r.detail) + '</div></div><span class="fmrun-pill fmrun-p-ok" style="font-size:12px">' + esc(r.score) + '</span></div>' + (r.firstLine ? '<div style="margin:6px 0 0 36px;padding:7px 10px;background:#F7F6FF;border-radius:8px;font-size:12.5px;line-height:1.45;color:#3A3D55"><b style="color:#6557FF">First line:</b> ' + esc(r.firstLine) + '</div>' : '')).join('') + '</div>' : '';
      return '<div class="' + V.cls('message-' + (i + 1)) + '" style="display:flex;gap:10px;align-items:flex-start"><span style="width:34px;height:34px;border-radius:8px;background:#EEECFF;display:flex;align-items:center;justify-content:center;flex:none">' + fmLogo(20) + '</span><div style="min-width:0;flex:1"><div style="display:flex;align-items:baseline;gap:8px"><b style="font-size:14px">' + esc(m.author) + '</b><span style="font-size:12px;color:#6B6E83">' + esc(m.time) + '</span></div><p style="margin:4px 0 0;font-size:13.5px;line-height:1.5">' + esc(m.text) + '</p>' + card + '</div></div>';
    }).join('');
    const acts = (c.actions || []).map((a) => '<span class="fmrun-act" style="font-weight:700;padding:8px 14px;border-radius:8px;border:1px solid #DCDDE6;background:#fff">' + esc(a) + '</span>').join('');
    return '<div style="position:absolute;inset:0;display:flex"><div class="fmrun-side" style="width:150px;flex:none;background:#3B1A40;color:rgba(255,255,255,.72);padding:14px 10px;display:flex;flex-direction:column;gap:2px">' +
      '<div style="color:#fff;font-weight:900;font-size:14px;padding:0 6px 12px">Brindlewood</div><div style="padding:5px 6px"># marketing</div><div style="padding:5px 6px"># sales</div><div style="padding:14px 6px 5px;font-size:11px;font-weight:700;color:rgba(255,255,255,.55)">Direct messages</div><div style="padding:5px 6px;border-radius:6px;background:rgba(255,255,255,.14);color:#fff;font-weight:700">FlowMate agent</div><div style="padding:5px 6px">Tom Becker</div></div>' +
      '<div style="flex:1;min-width:0;padding:14px 18px;display:flex;flex-direction:column;gap:12px;overflow:hidden"><div style="font-weight:900;font-size:14px;padding-bottom:10px;border-bottom:1px solid #ECECF2">' + esc(c.channel) + '</div>' + msgs +
      '<div class="' + V.cls('actions') + '" style="display:flex;gap:8px;margin-left:44px;flex-wrap:wrap">' + acts + '</div></div></div>';
  },

  /* Custom component, named in the script: a campaign with leads, first lines and timezones. */
  CampaignLeads(c, V) {
    const cnt = c.count || {};
    const added = V.on('leads');
    const leads = (c.leads || []).map((l) => '<div style="display:grid;grid-template-columns:200px minmax(0,1fr) 92px 92px;gap:12px;align-items:center;padding:10px 14px;border-bottom:1px solid #EEEFF4;' + (added ? '' : 'background:#FBFBFD') + '">' +
      '<span style="display:flex;align-items:center;gap:8px">' + initials(l.name, 26) + '<span style="min-width:0"><b style="display:block">' + esc(l.name) + '</b><span style="font-size:11.5px;color:#6B6E83">' + esc(l.title) + ', ' + esc(l.company) + '</span></span></span>' +
      '<span class="' + V.cls('first-line') + '" style="font-size:12.5px;line-height:1.45;color:#3A3D55;padding:4px 6px">' + esc(l.firstLine) + '</span>' +
      '<span class="' + V.cls('timezones') + '" style="font-size:12px;color:#3A3D55">' + esc(l.timezone) + '</span>' +
      '<span><span class="fmrun-pill ' + (added ? 'fmrun-p-ok' : 'fmrun-p-out') + (added ? V.enter('leads') : '') + '">' + (added ? esc(l.status) : 'Preparing') + '</span></span></div>').join('');
    return '<div style="position:absolute;inset:0;display:flex;flex-direction:column"><div class="fmrun-fh">' + appChip('lemlist', 20) + '<b>' + esc(c.campaign) + '</b><span>' + esc(c.schedule) + '</span><span class="' + V.mark('count') + '" style="margin-left:auto;font-weight:700;color:#3A3D55;padding:2px 8px">' + esc(V.on('count') ? cnt.to : cnt.from) + '</span></div>' +
      '<div style="display:grid;grid-template-columns:200px minmax(0,1fr) 92px 92px;gap:12px;padding:8px 14px;font-size:11px;font-weight:700;color:#6B6E83;border-bottom:1px solid #E6E7EE"><span>Lead</span><span>First line</span><span>Timezone</span><span>Status</span></div>' + leads + '</div>';
  },
};
function renderFrame(step, V) {
  const f = step.frame || {};
  const fn = f.type === 'custom' ? FRAMES[f.component] : FRAMES[f.type];
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
  const si = tl.steps.findIndex((x) => T >= x.start && T < x.end);
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

function renderHero(s) {
  const apps = [s.trigger.app, ...s.steps.map((x) => x.app)].filter((a, i, all) => i === 0 || a !== all[i - 1]);
  const chain = apps.map((a, i) => (i ? '<span class="fmrun-link"></span>' : '') + (a === 'flowmate'
    ? '<span class="fmrun-node" style="background:#EEECFF;border:1px solid #C9C2FF;box-shadow:0 0 0 5px rgba(101,87,255,.12)">' + svg(SP, 16, '#6557FF', 2.2) + '</span>'
    : '<span class="fmrun-node" style="background:#fff;border:1px solid #E6E7EE">' + appChip(a, 22) + '</span>')).join('');
  const last = s.steps[s.steps.length - 1];
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
    root.innerHTML = '<div class="fmrun-stage"><div class="fmrun-stage-box"><div class="fmrun-stage-in"></div></div></div><div class="fmrun-swipe" hidden>Swipe to follow the steps</div>';
    this.stage = root.querySelector('.fmrun-stage');
    this.box = root.querySelector('.fmrun-stage-box');
    this.inner = root.querySelector('.fmrun-stage-in');
    this.hint = root.querySelector('.fmrun-swipe');
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
    if (reduced()) { this.T = this.tl.runEnd + 0.01; this.draw(true); return; }
    this.draw(true);
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) { self.visible = e.isIntersecting; if (self.visible) self.start(); });
      }, { threshold: 0.2 }).observe(root);
    } else { this.visible = true; this.start(); }
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
      self.T += Math.min(0.1, (now - self.prev) / 1000); self.prev = now;
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

  /* ---------- Hero result: the last frame in its final state, sized to its column ---------- */
  function HeroResult(root, script) {
    this.root = root; this.s = script;
    root.classList.add('fmrun-hero-result');
    var last = script.steps[script.steps.length - 1];
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
    'lead-list': ['rows', 'row-#', 'count', 'titles', 'scores', 'reasons', 'status'],
    'social-post': ['post', 'text', 'stats', 'age', 'verdict', 'comments', 'comment-#'],
    CampaignLeads: ['leads', 'first-line', 'timezones', 'count'],
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
