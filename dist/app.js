(() => {
  'use strict';
  const content = window.GAME_CONTENT;
  const main = document.querySelector('#main');
  const nav = document.querySelector('#main-nav');
  const menu = document.querySelector('.menu-toggle');
  const dialog = document.querySelector('#preview-dialog');
  const draftKey = 'everstarine-gaming:guestbook-draft:v1';
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeUrl = value => { try { const u = new URL(value, location.href); return ['http:', 'https:'].includes(u.protocol) ? u.href : ''; } catch { return ''; } };
  const icons = {
    accounts: '<rect x="5" y="7" width="38" height="29" rx="2"/><path d="M16 42h16M24 36v6M12 17h10M17 12v10M32 15h1M36 20h1"/>',
    achievements: '<path d="M14 7h20v10c0 9-4 14-10 14s-10-5-10-14zM14 11H7v6c0 6 4 9 10 9M34 11h7v6c0 6-4 9-10 9M24 31v9M16 41h16"/><path d="m24 12 2 4 4 .5-3 3 .8 4-3.8-2-3.8 2 .8-4-3-3 4-.5z"/>',
    gallery: '<path d="M8 12h9l3-5h9l3 5h8v28H8z"/><circle cx="24" cy="25" r="8"/><path d="M34 17h2"/>',
    guestbook: '<path d="M6 8h36v26H22l-10 8v-8H6zM14 17h20M14 24h13"/>',
    cross: '<path d="M12 24h24M24 12v24"/>',
    badge: '<path d="m24 5 16 9v20l-16 9-16-9V14zM17 24l5 5 10-11"/>'
  };
  const icon = (name, cls = '') => `<svg class="icon ${cls}" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.35" stroke-linecap="square" aria-hidden="true">${icons[name] || icons.cross}</svg>`;
  const count = list => String(list.length).padStart(2, '0');
  const modules = [
    { id:'accounts', no:'01', en:'GAME ACCOUNTS', title:'游戏账号', desc:'在不同世界，留下同一个名字。', count:content.accounts.length },
    { id:'achievements', no:'02', en:'ACHIEVEMENTS', title:'成就展示', desc:'每一个值得记住的高光时刻。', count:content.achievements.length },
    { id:'gallery', no:'03', en:'FIELD GALLERY', title:'影像档案', desc:'把沿途的风景，留在这里。', count:content.gallery.length },
    { id:'guestbook', no:'04', en:'MESSAGE WALL', title:'留言墙', desc:'路过这处据点，留下一段回响。', count:content.messages.length }
  ];
  const empty = (kind, title, description, compact = false) => `<div class="empty-state ${compact ? 'compact' : ''}"><div class="empty-emblem">${icon(kind)}<i></i><i></i><i></i><i></i></div><h3>${esc(title)}</h3><p>${esc(description)}</p><span class="empty-code">NO RECORDS / 等待录入</span></div>`;
  const pageHead = (no, en, title, description) => `<header class="page-head"><div class="breadcrumb"><a href="#/">据点总览</a><span>/</span><span>${title}</span></div><div class="page-heading"><div><span class="eyebrow">${en} / ${no}</span><h1>${title}</h1><p>${description}</p></div><span class="page-number" aria-hidden="true">${no}</span></div></header>`;
  const tabs = (items, label) => `<div class="filter-tabs" role="group" aria-label="${label}">${items.map((x,i)=>`<button type="button" data-filter="${esc(x)}" aria-pressed="${i === 0}">${esc(x)}</button>`).join('')}</div>`;
  const sectionLabel = (no, en, title, link, href) => `<div class="section-heading"><div><span class="eyebrow">${no} / ${en}</span><h2>${title}</h2></div>${link ? `<a class="text-link" href="${href}">${link} <span aria-hidden="true">↗</span></a>` : ''}</div>`;

  function home() {
    return `<section class="hero"><div class="hero-art" role="img" aria-label="灰色山谷中的重工业设施、钢架与管线"></div><div class="hero-grid" aria-hidden="true"></div><div class="hero-rail" aria-hidden="true"><span>ES / PERSONAL ARCHIVE</span><i></i><span>PLAYER BASE · ES</span></div><div class="hero-content"><span class="hero-kicker"><i></i> EVERSTARINE’S GAMING BASE</span><h1>游戏之外，<br>我的<span>据点。</span></h1><p>账号、成就与旅途中的片刻。<br>一份属于 <strong>EverStarine</strong> 的游戏档案。</p><div class="hero-actions"><a class="button primary" href="#/accounts">探索游戏档案 <span>↗</span></a><a class="button secondary" href="#/guestbook">前往留言墙 <span>↗</span></a></div><div class="hero-caption"><span class="small-cross">+</span><span>新的故事，正等待被写下。</span></div></div><div class="hero-marker" aria-hidden="true"><span>PLAYER</span><strong>ES</strong><span>ARCHIVE STATION</span></div><div class="hero-bottom"><span><i></i> 个人档案 · 待录入</span><span>EXPLORE THE ARCHIVE <b>↓</b></span><span>EST. 2026 / VOL. 01</span></div></section>
      <section class="directory section-wrap">${sectionLabel('01','ARCHIVE DIRECTORY','从这里出发')}<div class="module-grid">${modules.map(m=>`<a class="module" href="#/${m.id}"><div class="module-top"><span>${m.no} / ${m.en}</span><span class="module-arrow" aria-hidden="true">↗</span></div>${icon(m.id)}<h3>${m.title}</h3><p>${m.desc}</p><div class="module-bottom"><span>${String(m.count).padStart(2,'0')} 项记录</span><span>进入档案 →</span></div></a>`).join('')}</div></section>
      <section class="showcase section-wrap"><div class="showcase-intro"><span class="eyebrow">02 / HALL OF MOMENTS</span><h2>留给每一次<br><span>全力以赴。</span></h2><p>通关、突破、收藏。<br>让值得纪念的瞬间，有一席之地。</p><a class="text-link" href="#/achievements">进入成就展厅 <span>↗</span></a></div><div class="achievement-vault"><div class="vault-top"><span>精选成就 / FEATURED</span><span>— —</span></div><div class="medal-slots" aria-hidden="true">${icon('badge')}${icon('achievements')}${icon('badge')}</div><div class="vault-caption"><span class="tiny-mark"></span><div><h3>展柜已就绪</h3><p>等待第一个高光时刻。</p></div><span class="vault-no">00</span></div></div></section>
      <section class="transmission section-wrap"><div class="transmission-icon">${icon('guestbook')}</div><div><span class="eyebrow">04 / OPEN CHANNEL</span><h2>在这里，留下你的回响。</h2><p>一句问候，或是一场下一次冒险的邀约。</p></div><a class="button primary" href="#/guestbook">前往留言墙 <span>↗</span></a></section>`;
  }
  function accounts() {
    return `<div class="page-shell">${pageHead('01','GAME ACCOUNTS','游戏账号','不同的世界，同一个玩家。')}<div class="toolbar">${tabs(['全部','电脑','主机','移动端'],'游戏平台')}<label class="search-box"><span aria-hidden="true">⌕</span><input type="search" id="account-search" placeholder="搜索游戏或平台" aria-label="搜索游戏或平台"></label></div><div class="results-label"><span id="results-caption">全部账号</span><span id="result-count">${count(content.accounts)} 项记录</span></div><div id="account-results"></div><div class="footnote"><span>ACCOUNT ARCHIVE</span><p>游戏名称、平台、区服与 UID 将在这里展示。</p></div></div>`;
  }
  function achievements() {
    return `<div class="page-shell">${pageHead('02','ACHIEVEMENTS','成就展示','每一份热爱，都有值得珍藏的回报。')}<div class="achievement-summary"><div><span>已收录成就</span><strong>${count(content.achievements)}<small>项</small></strong></div><div><span>精选展示</span><strong>${count(content.achievements.filter(x=>x.featured))}<small>项</small></strong></div><p>那些坚持到最后的瞬间，<br>终将点亮这里。</p><span class="summary-badge" aria-hidden="true">${icon('achievements')}</span></div><div class="toolbar">${tabs(['全部','通关记录','挑战达成','收藏纪念'],'成就类别')}<label class="sort-label">排序 <select id="achievement-sort"><option value="newest">最新优先</option><option value="oldest">最早优先</option></select></label></div><div id="achievement-results"></div></div>`;
  }
  function gallery() {
    return `<div class="page-shell">${pageHead('03','FIELD GALLERY','影像档案','为游戏中的风景与瞬间，按下快门。')}<div class="toolbar">${tabs(['全部','游戏截图','精彩瞬间'],'影像类别')}<span class="toolbar-note">${count(content.gallery)} 份影像</span></div><div id="gallery-results"></div><div class="film-strip" aria-hidden="true">${Array.from({length:30},()=>'<i></i>').join('')}</div></div>`;
  }
  function guestbook() {
    return `<div class="page-shell">${pageHead('04','MESSAGE WALL','留言墙','信号已抵达。很高兴，在这里遇见你。')}<div class="guestbook-layout"><section class="message-area"><div class="results-label"><span>来自访客的回响</span><span>${count(content.messages)} 条留言</span></div>${content.messages.length ? `<div class="message-list">${content.messages.map(messageCard).join('')}</div>` : empty('guestbook','这里还很安静','留言墙正等待第一声问候。')}<div class="channel-strip"><span class="signal-bars" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span>留言通道筹备中</span><span>STANDBY</span></div></section><aside class="compose-panel"><span class="eyebrow">LEAVE A SIGNAL</span><h2>写下一段留言</h2><p class="compose-help">先试写一段问候，看看它的样子。<br>留言发布将在后续开放。</p><form id="message-form"><label for="nickname">称呼 <span>必填</span></label><input id="nickname" name="nickname" placeholder="希望怎么称呼你？" required maxlength="24" autocomplete="nickname"><label for="message">想说的话 <span>必填</span></label><textarea id="message" name="message" placeholder="你好，路过这里……" required minlength="1" maxlength="300" rows="5"></textarea><div class="input-meta"><span id="draft-status">草稿仅保存在当前浏览器</span><span id="char-count">0 / 300</span></div><button class="button primary" type="submit">预览留言 <span>↗</span></button><button class="clear-draft" type="button">清空草稿</button></form></aside></div></div>`;
  }
  function about() {
    return `<div class="page-shell">${pageHead('05','ABOUT THIS PLACE','关于本站','一处放下日常，收集热爱的个人据点。')}<div class="about-layout"><div class="profile-placeholder"><span class="profile-monogram">ES<span>+</span></span><span class="eyebrow">PLAYER PROFILE</span><h2>${esc(content.profile.name)}</h2><p>${esc(content.profile.bio || '个人介绍待补充。')}</p></div><div class="about-copy"><span class="eyebrow">THE ARCHIVE</span><h2>把冒险，留在这里。</h2><p>这里收录游戏账号、成就与影像，也为来访的人留下一面留言墙。档案从空白开始，等待未来慢慢填满。</p><dl><div><dt>游戏账号</dt><dd>游戏 / 平台 / 区服 / UID</dd></div><div><dt>成就展示</dt><dd>通关 / 挑战 / 收藏</dd></div><div><dt>影像档案</dt><dd>截图 / 精彩瞬间</dd></div><div><dt>关联站点</dt><dd>入口预留，暂未开放</dd></div></dl><p class="about-style">本站采用深色重工业视觉，背景为原创生成插画。</p></div></div></div>`;
  }
  function messageCard(x) { return `<article class="message-card"><span class="message-avatar" aria-hidden="true">${esc((x.name || '?').slice(0,1))}</span><div><h3>${esc(x.name)}</h3><p>${esc(x.message)}</p><span class="eyebrow">${esc(x.date || '留言预览')}</span></div></article>`; }
  function readDraft() { try { return JSON.parse(localStorage.getItem(draftKey)) || {}; } catch { return {}; } }
  function setAnnouncement(text) { document.querySelector('#announcement').textContent = text; }
  function selectedFilter() { return main.querySelector('[data-filter][aria-pressed="true"]')?.dataset.filter || '全部'; }
  function bindFilters(update) { main.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => { main.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b===button))); update(); })); }
  function updateAccounts() {
    const filter = selectedFilter();
    const term = document.querySelector('#account-search').value.trim().toLocaleLowerCase();
    const records = content.accounts.filter(x=>(filter==='全部'||x.category===filter) && [x.game,x.platform,x.name].some(v=>String(v||'').toLocaleLowerCase().includes(term)));
    document.querySelector('#results-caption').textContent = term ? `搜索「${term}」` : `${filter}账号`;
    document.querySelector('#result-count').textContent = `${count(records)} 项记录`;
    document.querySelector('#account-results').innerHTML = records.length ? `<div class="record-grid">${records.map(x=>`<article class="record-card">${icon('accounts')}<span class="eyebrow">${esc(x.platform)}</span><h2>${esc(x.game)}</h2><p>${esc(x.name)}</p><dl><div><dt>区服</dt><dd>${esc(x.server || '待补充')}</dd></div><div><dt>UID</dt><dd>${esc(x.uid || '待补充')}</dd></div></dl></article>`).join('')}</div>` : empty('accounts',term?'没有找到匹配的账号':filter==='全部'?'账号档案尚未录入':`暂无${filter}账号`,term?'试试其他名称，或清空搜索条件。':'这里将展示游戏名片、平台与账号信息。');
    setAnnouncement(`找到 ${records.length} 个账号`);
  }
  function updateAchievements() {
    const filter = selectedFilter();
    const order = document.querySelector('#achievement-sort').value;
    const records = content.achievements.filter(x=>filter==='全部'||x.category===filter).sort((a,b)=>String(a.date||'').localeCompare(String(b.date||''))*(order==='newest'?-1:1));
    document.querySelector('#achievement-results').innerHTML = records.length ? `<div class="record-grid">${records.map(x=>`<article class="record-card">${icon('achievements')}<span class="eyebrow">${esc(x.category)}</span><h2>${esc(x.title)}</h2><p>${esc(x.description)}</p><span class="record-date">${esc(x.game)} / ${esc(x.date)}</span></article>`).join('')}</div>` : empty('achievements',filter==='全部'?'第一枚成就，静候归档':`暂无${filter}`,'先把展柜留好，未来的高光慢慢收藏。');
    setAnnouncement(`找到 ${records.length} 项成就`);
  }
  function updateGallery() {
    const filter = selectedFilter();
    const records = content.gallery.filter(x=>filter==='全部'||x.category===filter);
    document.querySelector('#gallery-results').innerHTML = records.length ? `<div class="record-grid gallery-grid">${records.map(x=>`<figure class="gallery-card"><img src="${esc(safeUrl(x.src))}" alt="${esc(x.alt||x.title)}" loading="lazy"><figcaption><h2>${esc(x.title)}</h2><p>${esc(x.game)} / ${esc(x.date)}</p></figcaption></figure>`).join('')}</div>` : `<div class="gallery-empty"><span class="viewfinder-corner tl"></span><span class="viewfinder-corner tr"></span><span class="viewfinder-corner bl"></span><span class="viewfinder-corner br"></span>${empty('gallery',filter==='全部'?'下一帧，值得期待':`暂无${filter}`,'截图与精彩瞬间，将在这里留下影像。')}<div class="viewfinder-meta"><span>FRAME — / —</span><span>ARCHIVE EMPTY</span></div></div>`;
    setAnnouncement(`找到 ${records.length} 份影像`);
  }
  function bindGuestbook() {
    const form = document.querySelector('#message-form');
    const draft = readDraft();
    form.nickname.value = String(draft.name || '').slice(0,24);
    form.message.value = String(draft.message || '').slice(0,300);
    const updateCount = () => { document.querySelector('#char-count').textContent = `${form.message.value.length} / 300`; };
    updateCount();
    form.addEventListener('input', () => {
      updateCount(); form.nickname.setCustomValidity(''); form.message.setCustomValidity('');
      try { localStorage.setItem(draftKey, JSON.stringify({ name:form.nickname.value, message:form.message.value })); document.querySelector('#draft-status').textContent='草稿已保存在当前浏览器'; }
      catch { document.querySelector('#draft-status').textContent='浏览器未允许保存草稿'; }
    });
    form.addEventListener('submit', e => {
      e.preventDefault();
      const name = form.nickname.value.trim(), message = form.message.value.trim();
      if (!name || !message) { (!name ? form.nickname : form.message).setCustomValidity('请填写有效内容。'); form.reportValidity(); return; }
      document.querySelector('#message-preview').innerHTML = messageCard({ name, message });
      dialog.showModal();
    });
    form.querySelector('.clear-draft').addEventListener('click',()=>{
      form.reset(); form.nickname.value=''; form.message.value='';
      form.nickname.setCustomValidity(''); form.message.setCustomValidity('');
      try { localStorage.removeItem(draftKey); } catch { /* Browser storage is optional. */ }
      updateCount(); document.querySelector('#draft-status').textContent='草稿已清空'; setAnnouncement('草稿已清空'); form.nickname.focus();
    });
  }
  const views = { home, accounts, achievements, gallery, guestbook, about };
  const titles = { home:'据点总览', accounts:'游戏账号', achievements:'成就展示', gallery:'影像档案', guestbook:'留言墙', about:'关于本站' };
  function closeMenu() { menu.setAttribute('aria-expanded','false'); nav.classList.remove('is-open'); }
  function render(initial = false) {
    const route = location.hash.replace(/^#\/?/,'').split('?')[0] || 'home';
    const valid = Object.hasOwn(views, route);
    main.innerHTML = valid ? views[route]() : `<div class="page-shell">${pageHead('—','SIGNAL LOST','这个坐标暂未收录','换一个方向，回到熟悉的据点。')}<a class="button primary" href="#/">返回据点总览 <span>↗</span></a></div>`;
    document.title=`${titles[route] || '页面未找到'} · EverStarine 游戏档案`;
    nav.querySelectorAll('a').forEach(a=>{ if(a.dataset.route===route) a.setAttribute('aria-current','page'); else a.removeAttribute('aria-current'); });
    closeMenu();
    if (route==='accounts') { bindFilters(updateAccounts); document.querySelector('#account-search').addEventListener('input',updateAccounts); updateAccounts(); }
    if (route==='achievements') { bindFilters(updateAchievements); document.querySelector('#achievement-sort').addEventListener('change',updateAchievements); updateAchievements(); }
    if (route==='gallery') { bindFilters(updateGallery); updateGallery(); }
    if (route==='guestbook') bindGuestbook();
    if (!initial) { window.scrollTo({top:0,behavior:'instant'}); main.focus({preventScroll:true}); }
  }
  menu.addEventListener('click',()=>{ const open=menu.getAttribute('aria-expanded')!=='true'; menu.setAttribute('aria-expanded',String(open)); nav.classList.toggle('is-open',open); });
  document.querySelector('.skip-link').addEventListener('click',e=>{ e.preventDefault(); main.focus({preventScroll:true}); main.scrollIntoView({block:'start'}); });
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();} });
  document.addEventListener('click', e=>{ if(!nav.contains(e.target)&&!menu.contains(e.target))closeMenu(); });
  dialog.querySelectorAll('.close-dialog').forEach(b=>b.addEventListener('click',()=>dialog.close()));
  dialog.addEventListener('click',e=>{ if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();} });
  document.querySelector('#year').textContent=new Date().getFullYear();
  if(content.relatedSite.enabled && safeUrl(content.relatedSite.url)) {
    const link=document.createElement('a');link.className='text-link';link.href=safeUrl(content.relatedSite.url);link.textContent=content.relatedSite.title+' ↗';link.target='_blank';link.rel='noopener noreferrer';document.querySelector('.reserved-link').replaceWith(link);
  }
  window.addEventListener('hashchange',()=>{ if(location.hash==='#main'){ main.focus(); return; } render(); });
  render(true);
})();
