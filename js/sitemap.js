document.addEventListener('DOMContentLoaded',()=>{

const wrapper=document.getElementById('stCanvasWrap');
const svgGroup=document.getElementById('stSvgGroup');

// === CONNECTION DEFINITIONS ===
const edges=[
  {from:'home',to:'main-pages'},{from:'home',to:'services'},{from:'home',to:'projects'},{from:'home',to:'skills'},{from:'home',to:'blog'},
  {from:'main-pages',to:'about'},{from:'main-pages',to:'contact'},{from:'main-pages',to:'showcase'},{from:'main-pages',to:'hire-me'},{from:'main-pages',to:'faq'},{from:'main-pages',to:'testimonials'},{from:'main-pages',to:'achievements'},{from:'main-pages',to:'education'},{from:'main-pages',to:'experience-detail'},{from:'main-pages',to:'privacy'},{from:'main-pages',to:'terms'},{from:'main-pages',to:'sitemap-page'},
  {from:'services',to:'srv-overview'},{from:'services',to:'srv-web'},{from:'services',to:'srv-mobile'},{from:'services',to:'srv-api'},{from:'services',to:'srv-ui'},{from:'services',to:'srv-db'},{from:'services',to:'srv-cloud'},{from:'services',to:'srv-perf'},{from:'services',to:'srv-maintenance'},{from:'services',to:'srv-ai'},
  {from:'projects',to:'proj-overview'},{from:'projects',to:'proj-eat'},{from:'projects',to:'proj-eventpass'},{from:'projects',to:'proj-cs-eat'},{from:'projects',to:'proj-cs-eventpass'},{from:'projects',to:'proj-timeline'},{from:'projects',to:'proj-approach'},{from:'projects',to:'proj-tech'},{from:'projects',to:'proj-gallery'},{from:'projects',to:'proj-testimonials'},{from:'projects',to:'proj-results'},
  {from:'skills',to:'sk-overview'},{from:'skills',to:'sk-c'},{from:'skills',to:'sk-cpp'},{from:'skills',to:'sk-csharp'},{from:'skills',to:'sk-html'},{from:'skills',to:'sk-js'},{from:'skills',to:'sk-py'},{from:'skills',to:'sk-sql'},{from:'skills',to:'sk-next'},
  {from:'blog',to:'blog-home'},{from:'blog',to:'blog-next'},{from:'blog',to:'blog-supabase'},{from:'blog',to:'blog-ts'},{from:'blog',to:'blog-trends'},{from:'blog',to:'blog-rest'},{from:'blog',to:'blog-css'},{from:'blog',to:'blog-perf'},{from:'blog',to:'blog-seo'},{from:'blog',to:'blog-auth'},{from:'blog',to:'blog-realtime'},{from:'blog',to:'blog-payment'},{from:'blog',to:'blog-deploy'},{from:'blog',to:'blog-db'},{from:'blog',to:'blog-state'},{from:'blog',to:'blog-test'}
];

function getNodeRect(id){
  const el=document.querySelector(`[data-id="${id}"]`);
  if(!el)return null;
  const r=el.getBoundingClientRect(),wr=wrapper.getBoundingClientRect();
  return{x:r.left-wr.left,y:r.top-wr.top,w:r.width,h:r.height};
}

function bezierPath(x1,y1,x2,y2){
  const dy=Math.abs(y2-y1);
  const cp=Math.max(dy*0.5,Math.min(dy*0.8,80));
  return`M${x1},${y1} C${x1},${y1+cp} ${x2},${y2-cp} ${x2},${y2}`;
}

function drawConnections(){
  const d=document.createDocumentFragment();
  edges.forEach(e=>{
    const src=getNodeRect(e.from),tgt=getNodeRect(e.to);
    if(!src||!tgt)return;
    const x1=src.x+src.w/2,y1=src.y+src.h;
    const x2=tgt.x+tgt.w/2,y2=tgt.y;
    const path=document.createElementNS('http://www.w3.org/2000/svg','path');
    path.setAttribute('d',bezierPath(x1,y1,x2,y2));
    path.classList.add('st-conn');
    d.appendChild(path);
  });
  svgGroup.replaceChildren(d);
}

// Node hover highlight
document.querySelectorAll('.st-n').forEach(n=>{
  n.addEventListener('mouseenter',()=>{
    const id=n.dataset.id;
    svgGroup.querySelectorAll('.st-conn').forEach((p,i)=>{
      const e=edges[i];
      if(e.from===id||e.to===id)p.classList.add('active');
    });
  });
  n.addEventListener('mouseleave',()=>{
    svgGroup.querySelectorAll('.st-conn.active').forEach(p=>p.classList.remove('active'));
  });
});

// Draw on load and resize
drawConnections();
window.addEventListener('resize',drawConnections);
setTimeout(drawConnections,300);
setTimeout(drawConnections,800);

});
