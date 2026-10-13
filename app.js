'use strict';

const projects = {
  online: {
    title: 'Map Online', label: 'iOS · MAPS · TECHNONEXT', hook: 'A map app that plans the whole trip, not just the next turn.',
    role: 'Architect and iOS lead',
    challenge: 'Build a map and navigation app for business workflows: location search, routing, multiple stops, saved places, and secure sign-in. The architecture had to support a team of four working in parallel.',
    approach: ['Chose MVVM-C so coordinators own navigation and screens stay independent.', 'Combined UIKit for map-heavy views with SwiftUI for faster-to-build screens.', 'Built custom routing, multi-stop journeys, location search, and saved places.', 'Collaborated with backend engineers on authentication, API contracts, and validation.', 'Led task planning and code reviews through App Store submission.'],
    result: 'A production-ready map app that passed App Store review, built on a structure the team could extend together.',
    note: 'Built for business use and not publicly released. The portfolio visual is a concept illustration, not a product screenshot.',
    tags: ['Swift', 'UIKit', 'SwiftUI', 'MVVM-C', 'REST APIs', 'App Store Connect']
  },
  offline: {
    title: 'Map Offline', label: 'iOS · OFFLINE-FIRST · TECHNONEXT', hook: 'Maps that keep working when the signal disappears.',
    role: 'Lead iOS engineer · customization and extension',
    challenge: 'Adapt an open-source mapping platform into a secure, offline-first product with business-specific features and a modern interface, while preserving the legacy core.',
    approach: ['Redesigned map downloads and updates so users can fetch maps once and use them offline.', 'Added encryption and decryption to protect downloaded map files.', 'Kept rendering and routing local, without requiring a network connection.', 'Integrated custom map services and save-place workflows.', 'Modernized the interface and adapted legacy components to the business requirements.'],
    result: 'An offline map app that downloads, protects, renders, and routes on the device.',
    note: 'The portfolio visual is a concept illustration. Internal implementation details and proprietary assets are not included.',
    tags: ['Swift', 'UIKit', 'Native library integration', 'Offline-first', 'Encryption']
  },
  school: {
    title: '10 Minute School', label: 'iOS · ED-TECH · JUL 2022—JUN 2025', hook: 'Learning that doesn’t stop when the data runs out.',
    role: 'Software Engineer · iOS',
    challenge: 'Support an audience of 150K+ iOS learners, including students on limited or unreliable mobile data, with dependable access to lessons.',
    approach: ['Built a download system with progress tracking, cancellation, deletion, and local persistence.', 'Investigated crash clusters in Firebase Crashlytics, identified root causes, and prioritized fixes.', 'Integrated live meetings, analytics, push notifications, and remote configuration.', 'Used MVVM and Clean Architecture to keep production features maintainable.'],
    result: 'Offline learning for an iOS audience of 150K+ learners, with approximately 98% crash-free sessions.',
    note: 'Impact figures describe the iOS app during my time at 10 Minute School. The project visual is a concept illustration.',
    tags: ['Swift', 'UIKit', 'MVVM', 'Clean Architecture', 'Firebase', 'REST APIs']
  },
  commerce: {
    title: 'E-commerce App', label: 'FLUTTER · CLIENT PROJECT', hook: 'From Figma to cart.', role: 'Mobile engineer · Flutter contribution',
    challenge: 'Translate a client’s shopping experience from Figma into a functioning cross-platform application.',
    approach: ['Built product listing interfaces from the supplied designs.', 'Added pagination and a shopping cart.', 'Connected the interface to REST APIs using Flutter and Dart.'],
    result: 'A client-facing shopping experience covering browsing, pagination, and cart workflows.', tags: ['Flutter', 'Dart', 'REST APIs']
  },
  teebay: {
    title: 'Teebay', label: 'iOS · SAMPLE APPLICATION', hook: 'A small app with big-app patterns.', role: 'iOS developer',
    challenge: 'Demonstrate structured native app development through a focused sample application.',
    approach: ['Used UIKit for native screen workflows.', 'Integrated REST APIs and push notifications.', 'Organized the app with MVVM routing.'],
    result: 'A sample iOS app illustrating API integration, UIKit workflows, and maintainable presentation logic.', tags: ['Swift', 'UIKit', 'MVVM', 'Push notifications']
  },
  harvest: {
    title: 'Harvesting United', label: 'UNITY · MULTIPLAYER · RESEARCH', hook: 'Science, disguised as a game.', role: 'Senior Game Developer · team lead',
    challenge: 'Turn the research goals of a Japanese university into an engaging multiplayer game.',
    approach: ['Led a team of three engineers from concept to production.', 'Collaborated with researchers to translate their needs into gameplay and surveys.', 'Built REST-connected team formation, synchronization, and game-state updates.'],
    result: 'A multiplayer research game connecting gameplay, surveys, and backend synchronization.', tags: ['Unity', 'C#', 'Multiplayer', 'REST APIs', 'Leadership']
  },
  stars: {
    title: 'Star Graph: Astro Pattern', label: 'UNITY · PATTERN-MATCHING GAME', hook: 'Connect the stars.', role: 'Game developer',
    challenge: 'Build a pattern-matching game inspired by astronomy and real-world objects.',
    approach: ['Created gameplay and visual interactions in Unity.', 'Used C# to connect game state, interface flows, and pattern-matching mechanics.'],
    result: 'An astronomy-inspired puzzle experience built around identifying and connecting patterns.', tags: ['Unity', 'C#', 'Gameplay']
  },
  kids: {
    title: 'Kids School', label: 'UNITY · EDUCATIONAL GAME', hook: 'Where play becomes practice.', role: 'Game developer',
    challenge: 'Bring several kinds of learning activities together in a 2D game for children.',
    approach: ['Built multiple gameplay types and learning interactions.', 'Integrated video content and REST APIs.', 'Created the interface and game logic in Unity and C#.'],
    result: 'A 2D learning game combining interactive play, videos, and backend-connected content.', tags: ['Unity', 'C#', 'REST APIs', 'Education']
  }
};

const skills = {
  ios: {label: 'NATIVE iOS DEVELOPMENT', heading: 'From the first pixel\nto the last network call.', chips: ['Swift', 'UIKit', 'SwiftUI', 'Combine', 'Swift Concurrency', 'GCD', 'URLSession', 'REST APIs', 'Alamofire', 'Core Data', 'Realm', 'Firebase', 'Push Notifications'], note: 'Production apps built in Swift, UIKit, and SwiftUI, with the systems that keep them fast and dependable.'},
  architecture: {label: 'ARCHITECTURE & ENGINEERING', heading: 'Structure today.\nRoom to grow tomorrow.', chips: ['MVVM', 'MVVM-C', 'Clean Architecture', 'SOLID', 'Modular Architecture', 'Design Patterns', 'Offline-First', 'Performance', 'Memory Management', 'Code Review'], note: 'Clear ownership, small modules, and thoughtful boundaries. Architecture that helps the whole team ship with confidence.'},
  games: {label: 'GAME DEVELOPMENT & CROSS-PLATFORM', heading: 'Every frame counts.\nEvery platform teaches.', chips: ['Unity', 'C#', 'Multiplayer Systems', 'Gameplay Architecture', 'Animation', 'Cinemachine', 'Flutter', 'Dart', 'REST Integration'], note: 'Four years in game development shaped my approach to performance, interaction, and making complex systems feel effortless.'},
  tools: {label: 'TOOLS, PLATFORMS & PEOPLE', heading: 'Good tools.\nBetter collaboration.', chips: ['Xcode', 'Git', 'GitHub', 'Swift Package Manager', 'CocoaPods', 'VS Code', 'Visual Studio', 'Claude Code', 'GitHub Copilot', 'Gemini AI', 'Mentoring', 'Code Review'], note: 'A practical toolkit, a collaborative mindset, and AI pair programmers — with architecture, review, and quality always my responsibility.'}
};

const nav = document.querySelector('#navigation');
const menu = document.querySelector('.menu-toggle');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.setAttribute('aria-label', 'Open navigation'); }
menu.addEventListener('click', () => { const isOpen = nav.classList.toggle('open'); menu.setAttribute('aria-expanded', String(isOpen)); menu.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation'); });
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav.classList.contains('open')) { closeMenu(); menu.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeMenu(); });

const cards = [...document.querySelectorAll('[data-project]')];
const filters = [...document.querySelectorAll('[data-filter]')];
const showProjects = document.querySelector('#show-projects');
let activeFilter = 'all';
let allExpanded = false;
function filterProjects() {
  let visible = 0;
  cards.forEach(card => {
    const matches = activeFilter === 'all' || card.dataset.categories.split(' ').includes(activeFilter);
    const show = matches && (activeFilter !== 'all' || allExpanded || card.classList.contains('featured'));
    card.hidden = !show;
    if (show) { visible++; card.classList.remove('fade-in'); requestAnimationFrame(() => card.classList.add('fade-in')); }
  });
  filters.forEach(button => { const selected = button.dataset.filter === activeFilter; button.classList.toggle('active', selected); button.setAttribute('aria-pressed', String(selected)); });
  document.querySelector('.project-count').textContent = `${String(visible).padStart(2, '0')} ${activeFilter === 'all' && !allExpanded ? 'SELECTED' : 'MATCHING'} PROJECTS`;
  showProjects.hidden = activeFilter !== 'all';
  showProjects.setAttribute('aria-expanded', String(allExpanded));
  showProjects.innerHTML = allExpanded ? 'Show selected projects <span>↑</span>' : 'Explore all 8 projects <span>↓</span>';
}
filters.forEach(button => button.addEventListener('click', () => { activeFilter = button.dataset.filter; filterProjects(); }));
showProjects.addEventListener('click', () => { allExpanded = !allExpanded; filterProjects(); if (!allExpanded) document.querySelector('.work-toolbar').scrollIntoView({block:'start'}); });

const dialog = document.querySelector('#project-dialog');
let dialogTrigger;
function appendTextElement(parent, tag, value, className) { const el = document.createElement(tag); el.textContent = value; if (className) el.className = className; parent.append(el); return el; }
function openProject(id, trigger) {
  const project = projects[id];
  if (!project) return;
  dialogTrigger = trigger;
  document.querySelector('#dialog-title').textContent = project.title;
  document.querySelector('#dialog-label').textContent = project.label;
  document.querySelector('#dialog-hook').textContent = project.hook;
  const body = document.querySelector('#dialog-body'); body.replaceChildren();
  appendTextElement(body, 'h3', 'My role'); appendTextElement(body, 'p', project.role);
  appendTextElement(body, 'h3', 'The challenge'); appendTextElement(body, 'p', project.challenge);
  appendTextElement(body, 'h3', 'The approach'); const list = document.createElement('ul'); project.approach.forEach(item => appendTextElement(list, 'li', item)); body.append(list);
  appendTextElement(body, 'h3', 'The result'); appendTextElement(body, 'p', project.result);
  const tags = document.createElement('div'); tags.className = 'tags'; project.tags.forEach(tag => appendTextElement(tags, 'span', tag)); body.append(tags);
  if (project.note) appendTextElement(body, 'p', project.note, 'project-note');
  dialog.showModal(); document.body.classList.add('modal-open'); dialog.scrollTop = 0;
}
document.querySelectorAll('[data-open]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.open, button)));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', event => { if (event.target === dialog) { const r = dialog.getBoundingClientRect(); if (event.clientX < r.left || event.clientX > r.right || event.clientY < r.top || event.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); if (dialogTrigger) dialogTrigger.focus({preventScroll:true}); });
document.querySelector('#dialog-contact').addEventListener('click', () => { dialog.close(); });

const tabs = [...document.querySelectorAll('[data-skill]')];
function selectSkill(key) {
  const skill = skills[key];
  tabs.forEach(tab => { const selected = tab.dataset.skill === key; tab.setAttribute('aria-selected', String(selected)); tab.tabIndex = selected ? 0 : -1; });
  document.querySelector('#skill-label').textContent = skill.label;
  const heading = document.querySelector('#skill-heading'); heading.replaceChildren(); skill.heading.split('\n').forEach((line, index) => { if (index) heading.append(document.createElement('br')); heading.append(document.createTextNode(line)); });
  const chips = document.querySelector('#skill-chips'); chips.replaceChildren(); skill.chips.forEach(chip => appendTextElement(chips, 'span', chip));
  document.querySelector('#skill-note').textContent = skill.note;
  document.querySelector('#skill-panel').setAttribute('aria-labelledby', `tab-${key}`);
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectSkill(tab.dataset.skill));
  tab.addEventListener('keydown', event => { let next = index; if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index+1)%tabs.length; else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index-1+tabs.length)%tabs.length; else if (event.key === 'Home') next = 0; else if (event.key === 'End') next = tabs.length-1; else return; event.preventDefault(); tabs[next].focus(); selectSkill(tabs[next].dataset.skill); });
});
selectSkill('ios');

const copyButton = document.querySelector('#copy-email');
let copyResetTimer;
copyButton.addEventListener('click', async () => {
  const email = 'ikram.johan@gmail.com';
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
    await navigator.clipboard.writeText(email);
    copyButton.innerHTML = 'Copied! <span>✓</span>';
    document.querySelector('#copy-status').textContent = 'Email address copied to your clipboard.';
    clearTimeout(copyResetTimer); copyResetTimer = setTimeout(() => { copyButton.innerHTML = 'Copy email <span>⧉</span>'; document.querySelector('#copy-status').textContent = ''; }, 3500);
  } catch {
    copyButton.textContent = 'Select the email above to copy';
    document.querySelector('#copy-status').textContent = 'Clipboard access is unavailable. Select ikram.johan@gmail.com above to copy it manually.';
    const range = document.createRange(); range.selectNodeContents(document.querySelector('.email-link')); const selection = window.getSelection(); selection.removeAllRanges(); selection.addRange(range);
  }
});

let scrollQueued = false;
function updateProgress() { const available = document.documentElement.scrollHeight - window.innerHeight; const progress = available > 0 ? Math.min(100, Math.max(0, window.scrollY / available * 100)) : 0; document.querySelector('.reading-progress').style.width = `${progress}%`; scrollQueued = false; }
window.addEventListener('scroll', () => { if (!scrollQueued) { scrollQueued = true; requestAnimationFrame(updateProgress); } }, {passive:true});
window.addEventListener('resize', () => { updateProgress(); if (window.innerWidth > 780) closeMenu(); });
updateProgress();
document.querySelector('#year').textContent = new Date().getFullYear();

if ('IntersectionObserver' in window) {
  const navLinks = [...nav.querySelectorAll('a')];
  const observer = new IntersectionObserver(entries => { entries.forEach(entry => { if (entry.isIntersecting) navLinks.forEach(link => { const active = link.getAttribute('href') === `#${entry.target.id}`; link.classList.toggle('active',active); if (active) link.setAttribute('aria-current','location'); else link.removeAttribute('aria-current'); }); }); }, {rootMargin:'-10% 0px -65% 0px',threshold:0});
  ['playground','work','about','journey'].forEach(id => observer.observe(document.getElementById(id)));
}
