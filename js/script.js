document.addEventListener('DOMContentLoaded',()=>{

// === VIDEO SPEED ===
document.querySelectorAll('.chapter-video-bg video').forEach(v=>{v.playbackRate=.4});

// === NAVBAR ===
const nav=document.getElementById('navbar'),hb=document.getElementById('hamburger'),nl=document.getElementById('nav-links'),ni=document.querySelectorAll('.nav-link'),nLogo=document.querySelector('.nav-logo');
window.addEventListener('scroll',()=>{
  const sy=window.scrollY;nav.classList.toggle('scrolled',sy>50);
  const dh=document.documentElement.scrollHeight-window.innerHeight;
  const pb=document.getElementById('scroll-progress');if(pb)pb.style.width=(sy/dh)*100+'%';
  const bt=document.getElementById('back-to-top');if(bt)bt.classList.toggle('visible',sy>500);
  const heroEl=document.getElementById('hero');
  if(heroEl){
    ni.forEach(l=>l.classList.remove('active'));
    let activeLink=null;
    const sections=[{id:'hero',el:heroEl},{id:'scroll-story',el:document.getElementById('scroll-story')}];
    sections.forEach(s=>{if(s.el){const t=s.el.offsetTop-200,b=t+s.el.offsetHeight;if(sy>=t&&sy<b)activeLink=s.id}});
    ni.forEach(l=>{if(activeLink&&l.getAttribute('href')==='#'+activeLink)l.classList.add('active')});
    if(!activeLink)ni.forEach(l=>{if(l.getAttribute('href')==='index.html')l.classList.add('active')});
  }
  // Toggle nav logo: show only during chapter zone (past hero, before footer)
  const footerEl=document.getElementById('footer');
  const heroBottom=heroEl?heroEl.offsetHeight:0;
  const footerTop=footerEl?footerEl.offsetTop-400:document.body.scrollHeight;
  if(nLogo)nLogo.classList.toggle('hidden',sy<heroBottom||sy>=footerTop);
  // Hide floating contact buttons when near footer
  const fc=document.querySelector('.floating-contact');
  if(fc)fc.classList.toggle('hidden',sy>=footerTop);
});
window.dispatchEvent(new Event('scroll')); // initial check
function closeNav(){
  nl.classList.remove('open');
  const ov=document.querySelector('.nav-overlay');
  if(ov)ov.classList.remove('visible');
  if(hb)hb.innerHTML='<i class="fas fa-bars"></i>';
  document.body.classList.remove('nav-open');
}
if(hb){
  hb.addEventListener('click',(e)=>{
    e.stopPropagation();
    const isOpen=nl.classList.toggle('open');
    hb.innerHTML=isOpen?'<i class="fas fa-times"></i>':'<i class="fas fa-bars"></i>';
    document.body.classList.toggle('nav-open',isOpen);
    let ov=document.querySelector('.nav-overlay');
    if(!ov){
      ov=document.createElement('div');
      ov.className='nav-overlay';
      ov.addEventListener('click',closeNav);
      document.body.appendChild(ov);
    }
    ov.classList.toggle('visible',isOpen);
  });
}
ni.forEach(l=>l.addEventListener('click',closeNav));


// === LOADING ===
const ls=document.getElementById('loading-screen');
if(ls){const lt=document.querySelector('.loading-text');if(lt){const msgs=['Loading...','Crafting experience...','Almost ready...'];let mi=0;const int=setInterval(()=>{mi++;if(mi<msgs.length)lt.textContent=msgs[mi]},800);
window.addEventListener('load',()=>{clearInterval(int);lt.textContent='Welcome!';setTimeout(()=>ls.classList.add('hidden'),600)});setTimeout(()=>{clearInterval(int);ls.classList.add('hidden')},5000);}
else{window.addEventListener('load',()=>setTimeout(()=>ls.classList.add('hidden'),600))}}

// === SCROLL ANIMATIONS (reveal on scroll) ===
const revealEls=document.querySelectorAll('.chapter-block');
const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add('visible');
    }
  });
},{threshold:0.2});
revealEls.forEach(el=>observer.observe(el));

// === SMOOTH SCROLL ===
document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(a=>{a.addEventListener('click',function(e){const h=this.getAttribute('href');e.preventDefault();const t=document.querySelector(h);if(t)t.scrollIntoView({behavior:'smooth'})})});

// === BACK TO TOP ===
const btt=document.getElementById('back-to-top');if(btt)btt.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

// === PAGE TRANSITION ===
document.querySelectorAll('a[href]:not([href^="#"]):not([href^="http"]):not([href^="mailto"]):not([href^="tel"]):not([href^="https"]):not([href^="wa.me"])').forEach(a=>{const h=a.getAttribute('href');if(h&&h.endsWith('.html')&&!h.startsWith('http')){a.addEventListener('click',function(e){e.preventDefault();const t=this.getAttribute('href');const tr=document.getElementById('page-transition');if(tr){tr.style.opacity='1';setTimeout(()=>{window.location.href=t},400)}else{window.location.href=t}})}});

// === ACTIVE NAV ON PAGE LOAD ===
const cp=window.location.pathname.split('/').pop()||'index.html';
ni.forEach(l=>{const h=l.getAttribute('href');if(h===cp)l.classList.add('active')});

console.log('%c Aayush Shah ','background:#ff6b57;color:#06080a;font-size:1.3rem;padding:8px 16px;border-radius:4px;font-weight:bold;');
console.log('%c Scroll Story Teller Portfolio ','color:#ff6b57;font-size:.9rem;');
});
