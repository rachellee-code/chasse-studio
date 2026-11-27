import './style.css';
import { portfolio } from './portfolio.config.js';

const $ = (selector) => document.querySelector(selector);
const mediaURL = (path) => /^(https?:)?\/\//.test(path) ? path : `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const hoverCapable = matchMedia('(hover: hover) and (pointer: fine)');
const saveData = navigator.connection?.saveData;
const grid = $('#project-grid');
const dialog = $('#project-dialog');
const player = $('#full-player');
let playingPreview = null;
let returnFocus = null;

document.querySelectorAll('[data-brand]').forEach(el => { el.textContent = portfolio.brand; });
document.querySelectorAll('[data-hero]').forEach(el => { el.textContent = portfolio.hero[el.dataset.hero]; });
document.querySelectorAll('[data-hero-title]').forEach(el => { el.textContent = portfolio.hero.titleLines[Number(el.dataset.heroTitle)]; });
$('[data-bio-zh]').textContent = portfolio.bioZh;
$('[data-bio]').textContent = portfolio.bio;
function setLines(element, lines, mutedLast = false) {
  element.replaceChildren();
  lines.forEach((line, index) => {
    if (index) element.append(document.createElement('br'));
    const text = document.createElement('span');
    text.textContent = line;
    if (mutedLast && index === lines.length - 1) text.className = 'muted-line';
    element.append(text);
  });
}
setLines($('#about-title'), portfolio.about.titleZh, true);
setLines($('.about-en'), portfolio.about.titleEn);
portfolio.about.services.forEach(service => {
  const item = document.createElement('span');
  item.append(document.createTextNode(service.zh));
  const english = document.createElement('small'); english.lang = 'en'; english.textContent = service.en;
  item.append(english);
  $('.services').append(item);
});
$('#year').textContent = new Date().getFullYear();
$('.work-total').textContent = `(${String(portfolio.projects.length).padStart(2, '0')})`;
setLines($('#contact-title'), portfolio.contact.titleZh, true);
setLines($('.contact-en'), portfolio.contact.titleEn);
document.querySelectorAll('[data-contact]').forEach(el => { el.textContent = portfolio.contact[el.dataset.contact]; });
if (portfolio.email) {
  const email = $('#email-link');
  $('#email-channel').hidden = false;
  email.hidden = false;
  email.textContent = portfolio.email;
  email.href = `mailto:${portfolio.email}`;
}
if (portfolio.wechat) {
  $('#wechat-channel').hidden = false;
  $('#wechat-id').textContent = portfolio.wechat;
  $('#copy-wechat').addEventListener('click', async () => {
    const feedback = $('#contact-feedback');
    try {
      await navigator.clipboard.writeText(portfolio.wechat);
      feedback.textContent = '微信号已复制 / WeChat ID copied';
    } catch {
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents($('#wechat-id'));
      selection?.removeAllRanges();
      selection?.addRange(range);
      feedback.textContent = '微信号已选中，请手动复制 / Select and copy the WeChat ID';
    }
  });
}
$('#contact-empty').hidden = Boolean(portfolio.email || portfolio.wechat);

const revealObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
}), { threshold: 0.06 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

function releasePreview(video) {
  video.pause();
  video.removeAttribute('src');
  video.load();
  video.closest('.project-media')?.classList.remove('is-playing');
  if (playingPreview === video) playingPreview = null;
}

const visibilityObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) {
    const video = entry.target.querySelector('video');
    if (video?.hasAttribute('src')) releasePreview(video);
  }
}), { threshold: 0 });

function setBilingual(element, chinese, english) {
  const zh = document.createElement('span'); zh.className = 'text-zh'; zh.lang = 'zh-CN'; zh.textContent = chinese;
  const en = document.createElement('span'); en.className = 'text-en'; en.lang = 'en'; en.textContent = english;
  element.replaceChildren(zh, en);
}

function renderProjects(category = 'All Work') {
  if (playingPreview) releasePreview(playingPreview);
  visibilityObserver.disconnect();
  grid.querySelectorAll('.reveal').forEach(el => revealObserver.unobserve(el));
  grid.replaceChildren();
  const projects = portfolio.projects.filter(project => category === 'All Work' || project.category === category);
  projects.forEach((project, index) => {
    const article = document.createElement('article');
    article.className = `project reveal ${project.format === '16:9' ? 'landscape' : ''}`;
    article.style.setProperty('--delay', `${index % 3 * 65}ms`);
    const button = document.createElement('button');
    button.className = 'project-button';
    button.setAttribute('aria-label', `观看 ${project.titleZh} / Watch ${project.title} — ${project.category}`);
    const media = document.createElement('div');
    media.className = 'project-media';
    const image = document.createElement('img');
    image.src = mediaURL(project.cover);
    image.alt = `${project.titleZh} / ${project.title} — 概念画面`;
    image.width = project.format === '9:16' ? 540 : 960;
    image.height = project.format === '9:16' ? 960 : 540;
    image.loading = 'lazy';
    image.decoding = 'async';
    const video = document.createElement('video');
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = 'none';
    video.setAttribute('aria-hidden', 'true');
    const caption = document.createElement('div');
    caption.className = 'project-overlay';
    caption.innerHTML = '<span class="concept-label">概念短片 / CONCEPT FILM</span><span class="play-label"><span class="play-icon" aria-hidden="true">▶</span> 播放 / Watch</span>';
    const format = document.createElement('span');
    format.className = 'format-label';
    format.textContent = project.format;
    media.append(image, video, caption, format);
    const info = document.createElement('div');
    info.className = 'project-info';
    const title = document.createElement('h3'); setBilingual(title, project.titleZh, project.title);
    const meta = document.createElement('span'); meta.className = 'project-category'; setBilingual(meta, portfolio.categoryLabels[project.category], project.category);
    info.append(title, meta);
    button.append(media, info);
    article.append(button);
    grid.append(article);
    const startPreview = async () => {
      if (!hoverCapable.matches || reducedMotion.matches || saveData || dialog.open) return;
      if (playingPreview && playingPreview !== video) releasePreview(playingPreview);
      playingPreview = video;
      video.src = mediaURL(project.preview);
      try {
        await video.play();
        if (playingPreview === video) media.classList.add('is-playing');
      } catch { /* The cover remains visible if autoplay is blocked or the source fails. */ }
    };
    button.addEventListener('pointerenter', startPreview);
    button.addEventListener('pointerleave', () => { if (video.hasAttribute('src')) releasePreview(video); });
    video.addEventListener('error', () => media.classList.remove('is-playing'));
    button.addEventListener('click', () => openProject(project, button));
    revealObserver.observe(article);
    visibilityObserver.observe(article);
  });
  $('#filter-status').textContent = `已显示 ${projects.length} 个项目 / ${projects.length} projects. ${category}.`;
}

portfolio.categories.forEach((category, index) => {
  const button = document.createElement('button');
  setBilingual(button, portfolio.categoryLabels[category], category);
  button.setAttribute('aria-pressed', String(index === 0));
  button.addEventListener('click', () => {
    document.querySelectorAll('#filters button').forEach(el => el.setAttribute('aria-pressed', String(el === button)));
    renderProjects(category);
  });
  $('#filters').append(button);
});

function openProject(project, trigger) {
  returnFocus = trigger;
  if (playingPreview) releasePreview(playingPreview);
  setBilingual($('#dialog-title'), project.titleZh, project.title);
  $('#dialog-category').textContent = `${portfolio.categoryLabels[project.category]} / ${project.category} · 概念习作`;
  $('#dialog-meta').textContent = `${project.year} · ${project.format} · ${project.roleZh} / ${project.role}`;
  setBilingual($('#dialog-description'), project.descriptionZh, project.description);
  $('#video-error').hidden = true;
  player.poster = mediaURL(project.cover);
  player.src = mediaURL(project.video);
  player.style.aspectRatio = project.format.replace(':', '/');
  dialog.showModal();
  document.body.classList.add('modal-open');
  player.play().catch(() => {});
}

$('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => {
  player.pause();
  player.removeAttribute('src');
  player.load();
  document.body.classList.remove('modal-open');
  returnFocus?.focus({ preventScroll: true });
});
player.addEventListener('error', () => { if (player.hasAttribute('src')) $('#video-error').hidden = false; });
document.addEventListener('visibilitychange', () => {
  if (document.hidden) { if (playingPreview) releasePreview(playingPreview); player.pause(); }
});
reducedMotion.addEventListener('change', () => { if (reducedMotion.matches && playingPreview) releasePreview(playingPreview); });
renderProjects();
