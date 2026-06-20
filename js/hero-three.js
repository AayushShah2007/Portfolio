(function(){
if(typeof THREE==='undefined')return;
var container=document.getElementById('hero-canvas');
if(!container)return;

var w=window.innerWidth,h=window.innerHeight;
var scene=new THREE.Scene();
scene.fog=new THREE.FogExp2(0x06080a,0.035);

var camera=new THREE.PerspectiveCamera(50,w/h,0.1,50);
camera.position.set(0,1.5,7);
camera.lookAt(0,0.5,0);

var renderer=new THREE.WebGLRenderer({antialias:true,alpha:true});
renderer.setSize(w,h);
renderer.setPixelRatio(Math.min(window.devicePixelRatio,2));
renderer.setClearColor(0x06080a,0);
renderer.shadowMap.enabled=true;
renderer.shadowMap.type=THREE.PCFSoftShadowMap;
container.appendChild(renderer.domElement);

var mouse={x:0,y:0,targetX:0,targetY:0};
document.addEventListener('mousemove',function(e){
  mouse.targetX=(e.clientX/w-0.5)*2;
  mouse.targetY=-(e.clientY/h-0.5)*2;
});

var clock=new THREE.Clock();

// ===== GROUND PLANE =====
var groundGeo=new THREE.PlaneGeometry(20,14,1,1);
var groundMat=new THREE.MeshStandardMaterial({
  color:0x0a0c10,
  roughness:0.9,
  metalness:0.1,
  transparent:true,
  opacity:0.6,
  side:THREE.DoubleSide
});
var ground=new THREE.Mesh(groundGeo,groundMat);
ground.rotation.x=-Math.PI/2;
ground.position.y=-0.8;
ground.receiveShadow=true;
scene.add(ground);

// ===== GRID OVERLAY =====
var grid=new THREE.GridHelper(16,32,0xff6b57,0x2dd4bf);
grid.position.y=-0.78;
grid.material.transparent=true;
grid.material.opacity=0.06;
scene.add(grid);

// ===== AMBIENT LIGHT =====
var ambient=new THREE.AmbientLight(0x223344,0.5);
scene.add(ambient);

var dirLight=new THREE.DirectionalLight(0xff6b57,1.2);
dirLight.position.set(3,5,2);
dirLight.castShadow=true;
dirLight.shadow.mapSize.width=1024;
dirLight.shadow.mapSize.height=1024;
scene.add(dirLight);

var fillLight=new THREE.DirectionalLight(0x2dd4bf,0.6);
fillLight.position.set(-3,2,-2);
scene.add(fillLight);

// ===== ARCHITECTURAL ELEMENTS (Data Pillars) =====
var pillars=[];
var pillarMat=new THREE.MeshStandardMaterial({
  color:0x1a1a2a,
  roughness:0.4,
  metalness:0.7,
  transparent:true,
  opacity:0.7
});
var pillarPositions=[-2.8,-1.4,0,1.4,2.8];
for(var i=0;i<pillarPositions.length;i++){
  var geo=new THREE.BoxGeometry(0.25,2.2,0.25);
  var mesh=new THREE.Mesh(geo,pillarMat);
  mesh.position.set(pillarPositions[i],-0.8+1.1,-1.2);
  mesh.castShadow=true;
  mesh.receiveShadow=true;
  scene.add(mesh);
  pillars.push(mesh);

  // Glow strip on each pillar
  var stripMat=new THREE.MeshBasicMaterial({
    color:i%2===0?0xff6b57:0x2dd4bf,
    transparent:true,
    opacity:0.08,
    wireframe:false
  });
  var strip=new THREE.Mesh(new THREE.BoxGeometry(0.28,0.04,0.28),stripMat);
  strip.position.set(pillarPositions[i],-0.8+Math.random()*2,1.2);
  scene.add(strip);
  pillars.push(strip);
}

// ===== FLOATING GEOMETRIC FORMS =====
var geoForms=[];
function addGeo(GeoClass,args,color,pos,opacity,wireframe){
  var mat=new THREE.MeshStandardMaterial({
    color:color,
    wireframe:wireframe!==false,
    transparent:true,
    opacity:opacity||0.2,
    roughness:0.3,
    metalness:0.8,
    emissive:color,
    emissiveIntensity:0.1
  });
  var mesh=new THREE.Mesh(new GeoClass(args[0],args[1],args[2],args[3]),mat);
  mesh.position.set(pos[0],pos[1],pos[2]);
  mesh.castShadow=true;
  scene.add(mesh);
  return mesh;
}

geoForms.push(addGeo(THREE.TorusKnotGeometry,[0.45,0.15,48,8],0xff6b57,[-2.2,1.2,1.5],0.25));
geoForms.push(addGeo(THREE.TorusGeometry,[0.55,0.15,24,24],0x2dd4bf,[2.2,0.5,-0.5],0.2));
geoForms.push(addGeo(THREE.IcosahedronGeometry,[0.32,0],0xff6b57,[1.5,-0.2,1.8],0.2));
geoForms.push(addGeo(THREE.OctahedronGeometry,[0.28,0],0x2dd4bf,[-1.8,1.5,-1],0.18));
geoForms.push(addGeo(THREE.DodecahedronGeometry,[0.25,0],0x79c0ff,[0,1.8,0.5],0.15));
geoForms.push(addGeo(THREE.BoxGeometry,[0.5,0.5,0.5],0xa5d6ff,[0,-0.3,2],0.1,false));

// ===== FLOATING DATA ORBS =====
var orbs=[];
for(var i=0;i<8;i++){
  var orbMat=new THREE.MeshBasicMaterial({
    color:i%2===0?0xff6b57:0x2dd4bf,
    transparent:true,
    opacity:0.08
  });
  var orb=new THREE.Mesh(new THREE.SphereGeometry(0.06+Math.random()*0.05,8,8),orbMat);
  orb.position.set(
    (Math.random()-0.5)*7,
    (Math.random()-0.5)*3+0.5,
    (Math.random()-0.5)*4-1
  );
  orb.userData={speed:0.2+Math.random()*0.3,offset:Math.random()*Math.PI*2};
  scene.add(orb);
  orbs.push(orb);
}

// ===== PARTICLE SYSTEM (Data Stream) =====
var pCount=200;
var pGeo=new THREE.BufferGeometry();
var pPos=new Float32Array(pCount*3);
for(var i=0;i<pCount;i++){
  pPos[i*3]=(Math.random()-0.5)*12;
  pPos[i*3+1]=(Math.random()-0.5)*5-0.5;
  pPos[i*3+2]=(Math.random()-0.5)*6-1;
}
pGeo.setAttribute('position',new THREE.BufferAttribute(pPos,3));

var pMat=new THREE.PointsMaterial({
  color:0x79c0ff,
  size:0.02,
  transparent:true,
  opacity:0.3,
  blending:THREE.AdditiveBlending
});
var particles=new THREE.Points(pGeo,pMat);
scene.add(particles);

// ===== FLOATING CODE-LIKE BLOCKS =====
var codeBlocks=[];
for(var i=0;i<8;i++){
  var cMat=new THREE.MeshBasicMaterial({
    color:[0xff6b57,0x2dd4bf,0x79c0ff,0xd2a8ff][i%4],
    transparent:true,
    opacity:0.04+Math.random()*0.04
  });
  var block=new THREE.Mesh(new THREE.BoxGeometry(0.3,0.02+Math.random()*0.06,0.02),cMat);
  block.position.set((Math.random()-0.5)*10,(Math.random()-0.5)*3.5,(Math.random()-0.5)*4);
  block.userData={speed:0.1+Math.random()*0.2,offset:Math.random()*Math.PI*2};
  scene.add(block);
  codeBlocks.push(block);
}

// ===== CAMERA ORBIT =====
var orbitAngle=0;

// ===== ANIMATION LOOP =====
function animate(){
  requestAnimationFrame(animate);
  var t=clock.getElapsedTime();

  mouse.x+=(mouse.targetX-mouse.x)*0.04;
  mouse.y+=(mouse.targetY-mouse.y)*0.04;

  // Subtle camera orbit
  orbitAngle+=0.002;
  var orbitRadius=0.3;
  var orbitX=Math.sin(orbitAngle)*orbitRadius;
  var orbitZ=Math.cos(orbitAngle)*orbitRadius*0.5;
  camera.position.x=mouse.x*0.8+orbitX;
  camera.position.y=1.5+mouse.y*0.3+Math.sin(orbitAngle*0.7)*0.1;
  camera.position.z=7+orbitZ;
  camera.lookAt(0,0.5,0);

  // Update data stream particles (float upward)
  var p=particles.geometry.attributes.position.array;
  for(var i=0;i<pCount;i++){
    p[i*3+1]+=0.003+Math.sin(t+i)*0.001;
    if(p[i*3+1]>3){p[i*3+1]=-3;p[i*3]=(Math.random()-0.5)*12;p[i*3+2]=(Math.random()-0.5)*6-1}
  }
  particles.geometry.attributes.position.needsUpdate=true;

  // Animate geometric forms
  geoForms[0].rotation.x=t*0.3;geoForms[0].rotation.y=t*0.5;
  geoForms[0].position.y=1.2+Math.sin(t*0.4)*0.2;
  geoForms[1].rotation.z=t*0.2;geoForms[1].rotation.y=t*0.4;
  geoForms[1].position.y=0.5+Math.sin(t*0.3+1)*0.25;
  geoForms[2].rotation.x=t*0.5;geoForms[2].rotation.y=t*0.7;
  geoForms[3].rotation.x=t*0.6;geoForms[3].rotation.y=t*0.4;
  geoForms[4].rotation.x=t*0.4;geoForms[4].rotation.y=t*0.6;
  geoForms[5].rotation.x=t*0.2;geoForms[5].rotation.y=t*0.3;

  // Animate orbs
  for(var i=0;i<orbs.length;i++){
    orbs[i].position.y+=Math.sin(t*orbs[i].userData.speed+orbs[i].userData.offset)*0.002;
    orbs[i].position.x+=Math.cos(t*0.1+i)*0.001;
  }

  // Animate code blocks
  for(var i=0;i<codeBlocks.length;i++){
    codeBlocks[i].position.y+=Math.sin(t*codeBlocks[i].userData.speed+codeBlocks[i].userData.offset)*0.001;
    codeBlocks[i].rotation.y+=0.002;
  }

  renderer.render(scene,camera);
}

// ===== RESIZE =====
window.addEventListener('resize',function(){
  w=window.innerWidth;h=window.innerHeight;
  camera.aspect=w/h;camera.updateProjectionMatrix();
  renderer.setSize(w,h);
});

animate();
})();
