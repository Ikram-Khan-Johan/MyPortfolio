import {buildRoute, pointAlongRoute} from './route-model.mjs';

const $=selector=>document.querySelector(selector);
const $$=selector=>[...document.querySelectorAll(selector)];
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let motionPaused=reducedMotion.matches;
let userMotionChoice=false;
let routeAnimation=0;
let routeRunning=false;
let currentRoute;
const routeState={destination:'riverside',addStop:false,offline:false};

function setMotion(paused){
  motionPaused=paused;
  document.documentElement.classList.toggle('motion-paused',paused);
  $('#motion-toggle').setAttribute('aria-pressed',String(paused));
  $('#motion-label').textContent=paused?'Enable motion':'Pause motion';
  if(paused && routeRunning) finishRoute();
  if(paused) $$('.reveal-pending').forEach(el=>el.classList.add('revealed'));
}
$('#motion-toggle').addEventListener('click',()=>{userMotionChoice=true;setMotion(!motionPaused);});
reducedMotion.addEventListener('change',event=>{if(!userMotionChoice)setMotion(event.matches);});
setMotion(motionPaused);

const hero=$('.hero');
const finePointer=window.matchMedia('(pointer: fine)');
let heroFrame=0;
hero.addEventListener('pointermove',event=>{
  if(motionPaused || !finePointer.matches)return;
  cancelAnimationFrame(heroFrame);
  heroFrame=requestAnimationFrame(()=>{const box=hero.getBoundingClientRect();hero.style.setProperty('--pointer-x',((event.clientX-box.left)/box.width-.5)*2);hero.style.setProperty('--pointer-y',((event.clientY-box.top)/box.height-.5)*2);});
});
hero.addEventListener('pointerleave',()=>{cancelAnimationFrame(heroFrame);hero.style.setProperty('--pointer-x',0);hero.style.setProperty('--pointer-y',0);});

$$('[data-hero-view]').forEach(button=>button.addEventListener('click',()=>{
  const routeView=button.dataset.heroView==='route';
  $('#hero-portrait').hidden=routeView;
  $('#hero-route-panel').hidden=!routeView;
  $('.portrait-stage').classList.toggle('show-route',routeView);
  $$('[data-hero-view]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
}));

const careerChapters=[
  {label:'2018—2022 / MIDDAYDREAMS',text:'From commercial Android games to leading a multiplayer research project. Every frame mattered.',index:3},
  {label:'2022—2025 / 10 MINUTE SCHOOL',text:'Offline lessons for 150K+ iOS learners. Crash hunting. A new appreciation for scale.',index:1},
  {label:'2025—NOW / TECHNONEXT',text:'Architecting map-based iOS apps. Leading four developers. Finding new routes.',index:0}
];
let selectedCareer=2;
$$('[data-career]').forEach(button=>button.addEventListener('click',()=>{
  selectedCareer=Number(button.dataset.career);
  const chapter=careerChapters[selectedCareer];
  $('#career-preview-label').textContent=chapter.label;
  $('#career-preview-text').textContent=chapter.text;
  $$('[data-career]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));
}));
$('#career-preview-link').addEventListener('click',event=>{
  event.preventDefault();
  const stops=$$('.career-stop');
  const target=stops[careerChapters[selectedCareer].index];
  stops.forEach(stop=>{stop.open=stop===target;});
  target.scrollIntoView({behavior:motionPaused?'instant':'smooth',block:'center'});
  target.querySelector('summary').focus({preventScroll:true});
});

const specialties=['experiences that find a way.','maps that work without signal.','architecture teams can grow.','apps people depend on.'];
let specialtyIndex=0;
setInterval(()=>{
  if(motionPaused || document.hidden || hero.getBoundingClientRect().bottom<0)return;
  specialtyIndex=(specialtyIndex+1)%specialties.length;
  const text=$('#specialty-text');text.classList.remove('specialty-change');text.textContent=specialties[specialtyIndex];
  requestAnimationFrame(()=>text.classList.add('specialty-change'));
},4300);

const traveler=$('#lab-traveler');
const traveled=$('#lab-route-traveled');
const routePath=$('#lab-route-path');
function positionTraveler(progress){
  const [x,y]=pointAlongRoute(currentRoute.points,progress);
  traveler.setAttribute('transform',`translate(${x} ${y})`);
  traveled.style.strokeDashoffset=String(1-progress);
}
function resetRoutePlayback(){
  cancelAnimationFrame(routeAnimation);
  routeRunning=false;
  $('#route-play').innerHTML='<span aria-hidden="true">▶</span> Follow the route';
  $('#route-play').setAttribute('aria-label','Animate the route to '+currentRoute.name);
  positionTraveler(0);
}
function routeHint(){
  if(routeState.offline)return routeState.addStop?'A stop added, a signal removed. This demo keeps the full journey available locally.':'No signal? Your route stays put. The idea: downloaded maps and on-device navigation.';
  return routeState.addStop?'One journey, three waypoints. The route now visits the coffee stop before your destination.':'Every journey starts with a clear destination. Pick a pin to change yours.';
}
function renderRoute(){
  currentRoute=buildRoute(routeState.destination,routeState.addStop,routeState.offline);
  resetRoutePlayback();
  ['#lab-route-glow','#lab-route-base','#lab-route-path','#lab-route-traveled'].forEach(selector=>$(selector).setAttribute('d',currentRoute.path));
  traveled.setAttribute('pathLength','1');traveled.style.strokeDasharray='1';traveled.style.strokeDashoffset='1';
  $('#playground').classList.toggle('offline-mode',routeState.offline);
  $('#destination-select').value=routeState.destination;
  $$('[data-destination]').forEach(pin=>pin.setAttribute('aria-pressed',String(pin.dataset.destination===routeState.destination)));
  $('#map-coffee-stop').hidden=!routeState.addStop;
  $('#stop-toggle').setAttribute('aria-checked',String(routeState.addStop));
  $('#offline-toggle').setAttribute('aria-checked',String(routeState.offline));
  $('#lab-network-status').textContent=routeState.offline?'◌ OFFLINE MODE':'● ONLINE';
  $('#lab-map-footnote').textContent=routeState.offline?'Route available without a live request':'Route calculated in this demo';
  $('#lab-waypoints').textContent=String(currentRoute.waypoints).padStart(2,'0');
  $('#lab-mode').textContent=currentRoute.mode;
  $('#lab-mode-detail').textContent=routeState.offline?'ON-DEVICE CONCEPT':'DEMO ROUTING';
  $('#lab-insight-icon').textContent=routeState.offline?'✓':'↗';
  $('#lab-insight-text').textContent=routeHint();
  $('.lab-map-svg').setAttribute('aria-label',`Illustrative route from the studio ${routeState.addStop?'via a coffee stop ':''}to ${currentRoute.name}, in ${currentRoute.mode.toLowerCase()} mode.`);
}
function finishRoute(){
  cancelAnimationFrame(routeAnimation);routeRunning=false;positionTraveler(1);
  $('#route-play').innerHTML='<span aria-hidden="true">↻</span> Replay the journey';
  $('#route-play').setAttribute('aria-label','Replay the route to '+currentRoute.name);
  $('#lab-insight-text').textContent=`You’ve arrived at ${currentRoute.name}.${routeState.addStop?' Coffee stop included.':''} ${routeState.offline?'The signal was off. The journey kept going.':'A clear route, from first tap to last stop.'}`;
}
$('#route-play').addEventListener('click',()=>{
  if(routeRunning){resetRoutePlayback();$('#lab-insight-text').textContent=routeHint();return;}
  if(motionPaused){finishRoute();return;}
  cancelAnimationFrame(routeAnimation);routeRunning=true;
  $('#route-play').innerHTML='<span aria-hidden="true">■</span> Stop the journey';
  $('#route-play').setAttribute('aria-label','Stop route animation');
  $('#lab-insight-text').textContent=`On the way to ${currentRoute.name}${routeState.addStop?' — with a stop for coffee':''}.`;
  let start=null;
  function frame(time){if(start===null)start=time;const progress=Math.min(1,(time-start)/3300);positionTraveler(progress);if(progress<1)routeAnimation=requestAnimationFrame(frame);else finishRoute();}
  routeAnimation=requestAnimationFrame(frame);
});
$('#destination-select').addEventListener('change',event=>{routeState.destination=event.target.value;renderRoute();});
$$('[data-destination]').forEach(pin=>pin.addEventListener('click',()=>{routeState.destination=pin.dataset.destination;renderRoute();}));
$('#stop-toggle').addEventListener('click',()=>{routeState.addStop=!routeState.addStop;renderRoute();});
$('#offline-toggle').addEventListener('click',()=>{routeState.offline=!routeState.offline;renderRoute();});
renderRoute();

$$('.project-card').forEach(card=>{
  let frame=0;
  card.addEventListener('pointermove',event=>{
    if(motionPaused || !finePointer.matches)return;
    cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const box=card.getBoundingClientRect();const x=(event.clientX-box.left)/box.width;const y=(event.clientY-box.top)/box.height;card.style.setProperty('--tilt-x',`${(y-.5)*-3}deg`);card.style.setProperty('--tilt-y',`${(x-.5)*3}deg`);card.style.setProperty('--shine-x',`${x*100}%`);card.style.setProperty('--shine-y',`${y*100}%`);});
  });
  card.addEventListener('pointerleave',()=>{cancelAnimationFrame(frame);card.style.setProperty('--tilt-x','0deg');card.style.setProperty('--tilt-y','0deg');});
});

if('IntersectionObserver' in window){
  const revealObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('revealed');revealObserver.unobserve(entry.target);}}),{threshold:.08,rootMargin:'0px 0px -25px 0px'});
  if(!motionPaused)$$('.section-heading,.about-grid,.service-grid,.milestones,.toolkit-layout').forEach(el=>{el.classList.add('reveal-pending');revealObserver.observe(el);});
  const stats=$$('.stat');
  const values=[8,150,98,4];
  stats.forEach((el,index)=>{el.setAttribute('aria-label',el.textContent);el.dataset.target=values[index];});
  const statsObserver=new IntersectionObserver(entries=>{if(entries.some(entry=>entry.isIntersecting)){
    statsObserver.disconnect();if(motionPaused)return;
    const starts=performance.now();
    function count(time){const t=Math.min(1,(time-starts)/1200);const eased=1-Math.pow(1-t,3);stats.forEach((el,index)=>{const value=Math.round(values[index]*(motionPaused?1:eased));const prefix=index===2?'~':'';el.firstChild.textContent=prefix+(index===3?String(value).padStart(2,'0'):value);});if(t<1&&!motionPaused)requestAnimationFrame(count);}
    requestAnimationFrame(count);
  }},{threshold:.5});statsObserver.observe($('.impact'));

  const sections=[['home','Start'],['playground','Playground'],['work','Selected work'],['about','About'],['journey','Journey'],['toolkit','Toolkit'],['contact','Contact']];
  const dock=document.createElement('nav');dock.className='route-dock';dock.setAttribute('aria-label','Page route');
  sections.forEach(([id,label])=>{const link=document.createElement('a');link.href=`#${id}`;link.setAttribute('aria-label',label);const text=document.createElement('span');text.textContent=label;link.append(text);dock.append(link);});document.body.append(dock);
  const dockObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){[...dock.children].forEach(link=>{const current=link.hash===`#${entry.target.id}`;link.classList.toggle('active',current);if(current)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});}});},{rootMargin:'-10% 0px -55% 0px',threshold:0});
  sections.forEach(([id])=>dockObserver.observe(document.getElementById(id)));
  const playbackObserver=new IntersectionObserver(entries=>{if(!entries[0].isIntersecting&&routeRunning){resetRoutePlayback();$('#lab-insight-text').textContent=routeHint();}},{threshold:0});playbackObserver.observe($('#playground'));
}
document.addEventListener('visibilitychange',()=>{if(document.hidden&&routeRunning){resetRoutePlayback();$('#lab-insight-text').textContent=routeHint();}});
