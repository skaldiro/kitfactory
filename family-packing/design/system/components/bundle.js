/* @ds-bundle: {"format":4,"namespace":"Kitmunk","components":[{"name":"Logo"},{"name":"ScoutMark"},{"name":"Button"},{"name":"IconButton"},{"name":"Chip"},{"name":"Segmented"},{"name":"Stepper"},{"name":"Switch"},{"name":"PackCheck"},{"name":"Tag"},{"name":"TextField"},{"name":"CrewAvatar"},{"name":"ItemRow"},{"name":"CategoryCard"},{"name":"ScoutCard"},{"name":"Assumed"},{"name":"ScoutBar"},{"name":"MicButton"},{"name":"Toast"},{"name":"ConfirmCard"},{"name":"SheetHeader"}]} */
(function () {
  var React = window.React;
  var h = React.createElement;
  function cx() { return Array.prototype.filter.call(arguments, Boolean).join(' '); }

  var CREW = {
    blue: ['var(--crew-blue)', 'var(--crew-blue-deep)', 'var(--ink)'],
    mint: ['var(--crew-mint)', 'var(--crew-mint-deep)', 'var(--ink)'],
    yellow: ['var(--crew-yellow)', 'var(--crew-yellow-deep)', 'var(--ink)'],
    pink: ['var(--crew-pink)', 'var(--crew-pink-deep)', 'var(--ink)'],
    lavender: ['var(--crew-lavender)', 'var(--crew-lavender-deep)', 'var(--ink)'],
    peach: ['var(--crew-peach)', 'var(--crew-peach-deep)', 'var(--ink)'],
    shared: ['var(--crew-shared)', 'var(--crew-shared)', 'var(--mist)']
  };
  function crew(c) { return CREW[c] || CREW.blue; }

  function svg(size, children, extra) {
    return h('svg', Object.assign({ width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2.2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true' }, extra || {}), children);
  }
  var ICONS = {
    back: function (s) { return svg(s, h('path', { d: 'M15 18l-6-6 6-6' })); },
    close: function (s) { return svg(s, h('path', { d: 'M6 6l12 12M18 6L6 18' }), { strokeWidth: 2.4 }); },
    plus: function (s) { return svg(s, h('path', { d: 'M12 5v14M5 12h14' })); },
    minus: function (s) { return svg(s, h('path', { d: 'M5 12h14' })); },
    arrowRight: function (s) { return svg(s, h('path', { d: 'M5 12h14M13 6l6 6-6 6' }), { strokeWidth: 2.4 }); },
    arrowUp: function (s) { return svg(s, h('path', { d: 'M12 19V5M5 12l7-7 7 7' }), { strokeWidth: 2.4 }); },
    check: function (s) { return svg(s, h('path', { d: 'M5 12.5l4.5 4.5L19 7.5' }), { strokeWidth: 3 }); },
    chevronDown: function (s) { return svg(s, h('path', { d: 'M6 9l6 6 6-6' }), { strokeWidth: 2.4 }); },
    more: function (s) { return h('svg', { width: s, height: s, viewBox: '0 0 24 24', fill: 'currentColor', 'aria-hidden': 'true' }, h('circle', { cx: 5, cy: 12, r: 1.8 }), h('circle', { cx: 12, cy: 12, r: 1.8 }), h('circle', { cx: 19, cy: 12, r: 1.8 })); },
    mic: function (s) { return svg(s, h('path', { d: 'M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3' })); },
    calendar: function (s) { return svg(s, [h('rect', { key: 1, x: 3.5, y: 5, width: 17, height: 15, rx: 3 }), h('path', { key: 2, d: 'M3.5 10h17M8 3v4M16 3v4' })], { strokeWidth: 2 }); },
    trash: function (s) { return svg(s, h('path', { d: 'M5 7h14M10 7V5h4v2M7 7l1 12h8l1-12' }), { strokeWidth: 2 }); },
    bag: function (s) { return svg(s, [h('rect', { key: 1, x: 4, y: 7, width: 16, height: 13, rx: 3 }), h('path', { key: 2, d: 'M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2' })]); }
  };
  function Icon(props) { var f = ICONS[props.name]; return f ? f(props.size || 20) : null; }

  function Logo(props) {
    var variant = props.variant || 'tile';
    var size = props.size || 48;
    var mark;
    if (variant === 'reversed') {
      mark = h('svg', { width: size, height: size, viewBox: '0 0 48 48', 'aria-hidden': 'true', className: 'km-logo-mark' },
        h('path', { d: 'M18 11V8a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3', fill: 'none', className: 'km-st-flare', strokeWidth: 3.5, strokeLinecap: 'round' }),
        h('rect', { x: 7, y: 11, width: 34, height: 30, rx: 7, className: 'km-f-flare' }),
        [12, 18.7, 25.3, 32].map(function (x) { return h('rect', { key: x, x: x, y: 17, width: 4, height: 18, rx: 2, className: 'km-f-ink' }); }),
        h('circle', { cx: 15, cy: 44, r: 2.2, className: 'km-f-flare' }), h('circle', { cx: 33, cy: 44, r: 2.2, className: 'km-f-flare' }));
    } else {
      var ribs = ['km-f-blue', 'km-f-mint', 'km-f-yellow', 'km-f-pink'];
      mark = h('svg', { width: size, height: size, viewBox: '0 0 48 48', 'aria-hidden': 'true', className: 'km-logo-mark' },
        h('rect', { x: 0, y: 0, width: 48, height: 48, rx: 12, className: 'km-f-flare' }),
        h('path', { d: 'M19 13v-2.5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2V13', fill: 'none', className: 'km-st-ink', strokeWidth: 2.6, strokeLinecap: 'round' }),
        h('rect', { x: 9, y: 13, width: 30, height: 25, rx: 6, className: 'km-f-ink' }),
        ribs.map(function (c, i) { return h('rect', { key: c, x: 13.5 + i * 6, y: 18, width: 3.6, height: 15, rx: 1.8, className: c }); }),
        h('circle', { cx: 16, cy: 41, r: 1.8, className: 'km-f-ink' }), h('circle', { cx: 32, cy: 41, r: 1.8, className: 'km-f-ink' }));
    }
    return h('span', { className: cx('km-logo', variant === 'reversed' && 'km-logo-rev'), role: 'img', 'aria-label': 'kitmunk' },
      mark, props.wordmark === false ? null : h('span', { className: 'km-wordmark', style: { fontSize: Math.round(size * (variant === 'reversed' ? 1 : 0.72)) + 'px' } }, 'kitmunk'));
  }

  function ScoutMark(props) {
    var s = props.size || 20;
    return h('svg', { width: s, height: s, viewBox: '0 0 24 24', className: 'km-scout-mark', role: props.label ? 'img' : null, 'aria-label': props.label || null, 'aria-hidden': props.label ? null : 'true' },
      h('rect', { x: 5, y: 5, width: 14, height: 14, rx: 3.5, transform: 'rotate(45 12 12)', className: 'km-f-flare' }),
      h('circle', { cx: 12, cy: 12, r: 2.6, className: 'km-f-ink' }));
  }

  function Button(props) {
    var variant = props.variant || 'primary';
    var rest = Object.assign({}, props); delete rest.variant; delete rest.size; delete rest.icon; delete rest.block; delete rest.className;
    return h('button', Object.assign({ type: 'button' }, rest, { className: cx('km-btn', 'km-btn-' + variant, props.size === 'sm' && 'km-btn-sm', props.block && 'km-btn-block', props.className) }),
      props.children, props.icon ? h(Icon, { name: props.icon, size: 18 }) : null);
  }

  function IconButton(props) {
    return h('button', { type: 'button', className: cx('km-iconbtn', 'km-iconbtn-' + (props.tone || 'card')), 'aria-label': props.label, onClick: props.onClick },
      h(Icon, { name: props.icon, size: props.icon === 'close' ? 18 : 20 }));
  }

  function Chip(props) {
    return h('button', { type: 'button', className: cx('km-chip', props.selected && 'is-on', props.size === 'sm' && 'km-chip-sm'), 'aria-pressed': props.selected ? 'true' : 'false', onClick: props.onClick },
      h('span', null, props.children), props.count != null ? h('span', { className: 'km-chip-n' }, props.count) : null);
  }

  function Segmented(props) {
    var opts = props.options || [];
    return h('div', { className: 'km-seg', role: 'radiogroup', 'aria-label': props.label },
      opts.map(function (o) {
        var on = o === props.value;
        return h('button', { key: o, type: 'button', role: 'radio', 'aria-checked': on ? 'true' : 'false', className: cx('km-seg-opt', on && 'is-on'), onClick: props.onChange ? function () { props.onChange(o); } : null }, o);
      }));
  }

  function Stepper(props) {
    var v = props.value == null ? 1 : props.value;
    var min = props.min == null ? 0 : props.min;
    return h('span', { className: 'km-stepper' },
      h('button', { type: 'button', 'aria-label': 'Fewer ' + (props.label || ''), disabled: v <= min, onClick: props.onChange ? function () { props.onChange(v - 1); } : null }, h(Icon, { name: 'minus', size: 18 })),
      h('span', { className: 'km-stepper-v', 'aria-live': 'polite' }, v),
      h('button', { type: 'button', 'aria-label': 'More ' + (props.label || ''), onClick: props.onChange ? function () { props.onChange(v + 1); } : null }, h(Icon, { name: 'plus', size: 18 })));
  }

  function Switch(props) {
    return h('button', { type: 'button', role: 'switch', 'aria-checked': props.on ? 'true' : 'false', 'aria-label': props.label, className: cx('km-switch', props.on && 'is-on'), onClick: props.onChange ? function () { props.onChange(!props.on); } : null }, h('span', { className: 'km-switch-knob' }));
  }

  function PackCheck(props) {
    var c = crew(props.crew);
    var state = props.state || 'empty';
    var style = { borderColor: state === 'empty' ? 'var(--edge)' : c[1], background: state === 'done' ? c[1] : 'var(--card)' };
    return h('button', { type: 'button', className: 'km-packcheck', 'aria-pressed': state === 'done' ? 'true' : 'false', 'aria-label': props.label, onClick: props.onClick },
      h('span', { className: 'km-packcheck-box', style: style },
        state === 'done' ? h('span', { className: 'km-on-dark' }, h(Icon, { name: 'check', size: 14 })) : null,
        state === 'partial' ? h('span', { className: 'km-packcheck-dash', style: { background: c[1] } }) : null));
  }

  function Tag(props) {
    return h('span', { className: cx('km-tag', 'km-tag-' + (props.kind || 'buy')) }, props.children || (props.kind === 'bought' ? 'Bought' : 'To buy'));
  }

  function TextField(props) {
    var id = props.id || ('km-f-' + String(props.label || 'field').replace(/\W+/g, '-').toLowerCase());
    return h('div', { className: 'km-field' },
      h('label', { htmlFor: id, className: 'km-field-label' }, props.label, props.optional ? h('span', { className: 'km-field-opt' }, ' · Optional') : null),
      h('span', { className: 'km-field-box' },
        props.icon ? h(Icon, { name: props.icon, size: 18 }) : null,
        h('input', { id: id, defaultValue: props.value, placeholder: props.placeholder, className: 'km-field-input' })));
  }

  function CrewAvatar(props) {
    var c = crew(props.crew);
    var s = props.size || 48;
    var r = 24;
    var prog = props.progress;
    var ringR = 22.75;
    var C = 2 * Math.PI * ringR;
    var ring = prog == null
      ? h('circle', { cx: r, cy: r, r: ringR, fill: 'none', stroke: c[1], strokeWidth: 2.5 })
      : [h('circle', { key: 't', cx: r, cy: r, r: ringR, fill: 'none', stroke: 'var(--track)', strokeWidth: 2.5 }),
         h('circle', { key: 'p', cx: r, cy: r, r: ringR, fill: 'none', stroke: c[1], strokeWidth: 2.5, strokeLinecap: 'round', strokeDasharray: (C * prog).toFixed(1) + ' ' + C.toFixed(1), transform: 'rotate(-90 24 24)' })];
    var avatar = h('svg', { width: s, height: s, viewBox: '0 0 48 48', role: 'img', 'aria-label': props.name + (props.caption ? ', ' + props.caption : '') },
      ring, h('circle', { cx: r, cy: r, r: 17.5, fill: c[0] }),
      h('text', { x: 24, y: 29, textAnchor: 'middle', fontFamily: 'Archivo, system-ui, sans-serif', fontSize: 14, fontWeight: 600, fill: c[2] }, props.initial || (props.name || '?').charAt(0)));
    if (!props.showName) return avatar;
    return h('span', { className: 'km-avatar' }, avatar, h('span', { className: 'km-avatar-name' }, props.name), props.caption ? h('span', { className: 'km-avatar-cap' }, props.caption) : null);
  }

  function ItemRow(props) {
    var q = props.qty || 1;
    var p = props.packed || 0;
    var state = p >= q ? 'done' : (p > 0 ? 'partial' : 'empty');
    return h('div', { className: cx('km-row', props.highlight && 'is-recent') },
      h(PackCheck, { crew: props.crew, state: state, label: (state === 'done' ? 'Unpack ' : 'Mark packed: ') + props.name, onClick: props.onToggle }),
      h('span', { className: 'km-row-main' },
        h('span', { className: cx('km-row-name', state === 'done' && 'is-done') }, props.name),
        props.toBuy ? h(Tag, { kind: 'buy' }) : null,
        props.bought ? h(Tag, { kind: 'bought' }) : null),
      props.bag ? h('span', { className: 'km-row-bag' }, h(Icon, { name: 'bag', size: 12 }), props.bag) : null,
      h('span', { className: 'km-row-qty' }, state === 'partial' ? p + ' of ' + q : '×' + q));
  }

  function CategoryCard(props) {
    var open = props.open !== false;
    return h('section', { className: 'km-cat' },
      h('button', { type: 'button', className: 'km-cat-head', 'aria-expanded': open ? 'true' : 'false', onClick: props.onToggle },
        h('span', { className: 'km-cat-name' }, props.name),
        h('span', { className: 'km-cat-left' }, props.left ? props.left + ' left' : 'Done'),
        h('span', { className: 'km-cat-chev', style: { transform: open ? 'rotate(180deg)' : 'none' } }, h(Icon, { name: 'chevronDown', size: 16 }))),
      open ? props.children : null);
  }

  function ScoutCard(props) {
    return h('section', { className: 'km-scoutcard' },
      h('span', { className: 'km-scout-label' }, h(ScoutMark, { size: 16 }), props.label || 'Scout noticed'),
      props.title ? h('span', { className: 'km-scoutcard-title' }, props.title) : null,
      props.children ? h('div', { className: 'km-scoutcard-body' }, props.children) : null,
      props.actions ? h('div', { className: 'km-scoutcard-actions' }, props.actions) : null);
  }

  function Assumed(props) {
    return h('span', { className: 'km-assumed', title: 'Scout assumed this. Tap to change.' }, props.children);
  }

  function ScoutBar(props) {
    return h('div', { className: 'km-scoutbar' },
      h('button', { type: 'button', className: 'km-scoutbar-field', onClick: props.onAsk },
        h(ScoutMark, { size: 20 }),
        h('span', { className: 'km-scoutbar-ph' }, props.placeholder || 'Ask Scout to change anything'),
        h('span', { className: 'km-scoutbar-send', 'aria-hidden': 'true' }, h(Icon, { name: 'arrowUp', size: 18 }))),
      props.onAdd !== false ? h('button', { type: 'button', className: 'km-scoutbar-add', 'aria-label': 'Add item', onClick: props.onAdd }, h(Icon, { name: 'plus', size: 22 })) : null);
  }

  function MicButton(props) {
    var rec = props.state === 'recording';
    return h('button', { type: 'button', className: cx('km-mic', rec && 'is-rec'), 'aria-label': rec ? 'Stop recording' : 'Talk instead of typing', onClick: props.onClick },
      rec ? h('span', { className: 'km-mic-ring', 'aria-hidden': 'true' }) : null,
      rec ? h('span', { className: 'km-mic-stop', 'aria-hidden': 'true' }) : h(Icon, { name: 'mic', size: 20 }));
  }

  function Toast(props) {
    return h('div', { className: 'km-toast', 'aria-live': 'polite' },
      h('span', { className: 'km-toast-text' }, props.children),
      props.onUndo !== false ? h('button', { type: 'button', className: 'km-toast-undo', onClick: props.onUndo }, props.action || 'Undo') : null);
  }

  function ConfirmCard(props) {
    return h('div', { className: 'km-confirm', role: 'alertdialog', 'aria-label': props.title },
      h('span', { className: 'km-confirm-icon' }, h(Icon, { name: 'trash', size: 18 })),
      h('span', { className: 'km-confirm-title' }, props.title),
      props.body ? h('span', { className: 'km-confirm-body' }, props.body) : null,
      h('div', { className: 'km-confirm-actions' },
        h(Button, { variant: 'danger', size: 'sm', onClick: props.onConfirm }, props.confirm || 'Delete'),
        h(Button, { variant: 'secondary', size: 'sm', onClick: props.onCancel }, props.cancel || 'Keep it')));
  }

  function SheetHeader(props) {
    return h('header', { className: 'km-sheethead' },
      props.scout ? h(ScoutMark, { size: 28 }) : null,
      h('span', { className: 'km-sheethead-text' },
        h('span', { className: 'km-sheethead-title' }, props.title),
        props.label ? h('span', { className: 'km-sheethead-label' }, props.label) : null),
      h(IconButton, { icon: 'close', tone: 'mist', label: 'Close ' + props.title, onClick: props.onClose }));
  }

  window.Kitmunk = Object.assign(window.Kitmunk || {}, {
    Logo: Logo, ScoutMark: ScoutMark, Button: Button, IconButton: IconButton, Chip: Chip, Segmented: Segmented,
    Stepper: Stepper, Switch: Switch, PackCheck: PackCheck, Tag: Tag, TextField: TextField, CrewAvatar: CrewAvatar,
    ItemRow: ItemRow, CategoryCard: CategoryCard, ScoutCard: ScoutCard, Assumed: Assumed, ScoutBar: ScoutBar,
    MicButton: MicButton, Toast: Toast, ConfirmCard: ConfirmCard, SheetHeader: SheetHeader, Icon: Icon
  });
})();
