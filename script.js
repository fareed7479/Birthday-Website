

const TITLES=["Lock","Wait","Hello","Yes/No","Pop","Cake","Photos","Wishes","Letter","Promise","Gift"];
const $=id=>document.getElementById(id);
$("nm").textContent=$("nm2").textContent=$("nm3").textContent=NAME;$("from").textContent=FROM;
const IMG={
 "g": {
  "laugh": "assets/girl-laugh.webp",
  "grump": "assets/girl-grump.webp",
  "chin": "assets/girl-chin.webp",
  "think": "assets/girl-think.webp",
  "kiss": "assets/girl-kiss.webp",
  "wink": "assets/girl-wink.webp",
  "wow": "assets/girl-wow.webp",
  "cute": "assets/girl-cute.webp"
 },
 "b": {
  "laugh": "assets/boy-laugh.webp",
  "cry": "assets/boy-cry.webp",
  "wow": "assets/boy-wow.webp",
  "smirk": "assets/boy-smirk.webp",
  "wave": "assets/boy-wave.webp",
  "grump": "assets/boy-grump.webp",
  "joy": "assets/boy-joy.webp",
  "heart": "assets/boy-heart.webp"
 }
};
const DEF=[["smirk","think"],["smirk","cute"],["wave","laugh"],["wow","think"],["joy","wink"],["wow","cute"],["joy","wink"],["heart","cute"],["heart","chin"],["smirk","think"],["smirk","cute"]];
document.querySelectorAll(".ted").forEach(t=>{t.innerHTML='<img class="av" alt=""><div class="bub">'+t.dataset.say+'</div>';const g=document.createElement("img");g.className="av gal";g.alt="";t.parentNode.appendChild(g)});
function say(i,t,b,g){const s=screens[i];if(t)s.querySelector(".bub").textContent=t;s.querySelector(".av").src=IMG.b[b||DEF[i][0]];s.querySelector(".gal").src=IMG.g[g||DEF[i][1]]}
$("popImg").src=IMG.b.wave;
for(let i=0;i<60;i++){const s=document.createElement("i");s.className="s";s.style.cssText=`left:${Math.random()*100}%;top:${Math.random()*100}%;animation-delay:${Math.random()*4}s`;document.body.prepend(s)}
const screens=[...document.querySelectorAll(".screen")],nav=$("nav");
TITLES.forEach((t,i)=>{const b=document.createElement("button");b.textContent=t;b.className="pg";b.onclick=()=>show(i);nav.appendChild(b)});
let typed,timers=[];
function show(i){
  timers.forEach(clearTimeout);timers=[];clearInterval(typed);
  screens.forEach((s,k)=>s.classList.toggle("on",k===i));say(i,screens[i].querySelector(".ted").dataset.say);
  const pgs=[...nav.querySelectorAll(".pg")];pgs.forEach((b,k)=>b.classList.toggle("on",k===i));pgs[i].scrollIntoView({inline:"center",block:"nearest",behavior:"smooth"});$("wish").classList.remove("on");
  document.querySelectorAll(".balloon,.fall").forEach(e=>e.remove());
  if(i===2)balloons();
  if(i===3){const n=$("no");n.style.cssText="";n.textContent="No";nn=0;$("yes").style.transform=""}
  if(i===4){popped=0;$("cnt").textContent="0/4 popped";$("toCake").hidden=true;document.querySelectorAll("#bgrid .cell").forEach(c=>{c.classList.remove("on");c.querySelector(".bl").classList.remove("pop")})}
  if(i===7){$("wb").classList.remove("on");later(()=>$("wb").classList.add("on"),200)}
  if(i===5)startCake();
  if(i===8){sparkles();resetEnv()}
}
document.querySelectorAll("[data-go]").forEach(b=>b.onclick=()=>show(+b.dataset.go));
const later=(f,ms)=>timers.push(setTimeout(f,ms));
function balloons(){const c=["#ffd66b","#ff9f8a","#8fe3c8","#f6f1ea"];for(let i=0;i<9;i++){const b=document.createElement("div");b.className="balloon";b.style.cssText=`left:${5+Math.random()*88}%;background:${c[i%4]};animation-duration:${9+Math.random()*7}s;animation-delay:${-Math.random()*10}s`;screens[2].appendChild(b)}}
function sparkles(){for(let i=0;i<12;i++){const h=document.createElement("span");h.className="fall";h.textContent="✦";h.style.cssText=`left:${Math.random()*100}%;font-size:${12+Math.random()*14}px;animation-duration:${7+Math.random()*7}s;animation-delay:${-Math.random()*8}s`;screens[8].appendChild(h)}}
function typeMsg(){const el=$("msg");el.textContent="";let n=0;typed=setInterval(()=>{el.textContent=MESSAGE.slice(0,++n);if(n>=MESSAGE.length)clearInterval(typed)},35)}

// lock
let code="";const dials=$("dials");
function drawDots(){dials.innerHTML="";for(let i=0;i<4;i++){const d=document.createElement("i");d.className="dot"+(i<code.length?" f":"");dials.appendChild(d)}}drawDots();
function key(k){if(code.length>=4&&k!=="x")return;code=k==="x"?code.slice(0,-1):code+k;drawDots();if(code.length===4)setTimeout(check4,220)}
function check4(){if(code===CODE){$("lock").classList.add("open");say(0,"Unlocked! Come in!","laugh","laugh");confetti();later(()=>show(1),1800)}
else{dials.classList.add("bad","shake");say(0,"Nope! Try again.","cry","grump");later(()=>{dials.classList.remove("bad","shake");code="";drawDots()},650)}}
["1","2","3","4","5","6","7","8","9","","0","x"].forEach(k=>{if(!k){$("pad").appendChild(document.createElement("span"));return}const b=document.createElement("button");b.textContent=k==="x"?"⌫":k;b.onclick=()=>key(k);$("pad").appendChild(b)});
$("hint").onclick=()=>$("hintTxt").textContent=HINT;
addEventListener("keydown",e=>{if(!screens[0].classList.contains("on"))return;if(/^\d$/.test(e.key))key(e.key);if(e.key==="Backspace")key("x")});

// cake
const cw=$("candles");
for(let i=0;i<3;i++){const c=document.createElement("div");c.className="candle";c.innerHTML='<div class="flame"></div><div class="smoke"></div>';
  c.onclick=()=>{if(!cw.classList.contains("show")||c.classList.contains("out"))return;c.classList.add("lit");
    if([...cw.children].every(x=>x.classList.contains("lit"))){$("cakeTitle").textContent="Make a wish…";say(5,"Make a wish!","smirk","kiss");$("cakeHint").textContent="Blow into your mic, or tap the button.";$("blow").hidden=false;listen()}};cw.appendChild(c)}
function startCake(){
  cw.classList.remove("show");[...cw.children].forEach(c=>c.className="candle");$("blow").hidden=$("toPhotos").hidden=true;$("spr").style.opacity=0;
  $("cakeTitle").textContent="Pouring the good stuff…";$("cakeHint").textContent="";
  ["rv","sd","so"].forEach(id=>$(id).beginElement());
  later(()=>{$("spr").style.opacity=1;$("cakeTitle").textContent="Made with a pure heart, for you";},3000);
  later(()=>{cw.classList.add("show");$("cakeHint").textContent="Tap each candle to light it.";},4000)}
let done=false;
function out(){if(done)return;done=true;[...cw.children].forEach(c=>{c.classList.remove("lit");c.classList.add("out")});
  $("cakeTitle").textContent="Wish made!";$("cakeHint").textContent="Now, party time.";say(5,"Yaaay!","joy","laugh");$("blow").hidden=true;confetti();$("wish").classList.add("on");later(()=>{$("wish").classList.remove("on");$("toPhotos").hidden=false},3600);later(()=>done=false,1500)}
$("blow").onclick=out;
async function listen(){try{const s=await navigator.mediaDevices.getUserMedia({audio:true}),ac=new AudioContext(),an=ac.createAnalyser();ac.createMediaStreamSource(s).connect(an);const d=new Uint8Array(an.fftSize);
  const t=setInterval(()=>{an.getByteTimeDomainData(d);let m=0;d.forEach(v=>m=Math.max(m,Math.abs(v-128)));if(m>70){clearInterval(t);s.getTracks().forEach(x=>x.stop());out()}},80)}catch(e){}}

// photos
const stack=$("stack");let idx=0;
CAPS.forEach((c,i)=>{const p=document.createElement("div");p.className="pol";p.style.zIndex=10-i;p.style.rotate=(i%2?3:-3)+"deg";
  p.innerHTML=`<div class="ph"><img src="${PHOTOS[i]||""}" alt="" onerror="this.remove()">Photo ${i+1}</div><div class="cap">${c}</div>`;
  p.onclick=()=>{if(i!==idx)return;p.classList.add("gone");idx++;$("count").textContent=idx<CAPS.length?`${CAPS.length-idx} more`:"that’s all of them";if(idx>=CAPS.length)$("toLetter").hidden=false};stack.appendChild(p)});

// promises
let sealed=0;const total=MINE.length+YOURS.length;
[["g1",MINE],["g2",YOURS]].forEach(([g,arr])=>arr.forEach(t=>{const b=document.createElement("button");b.className="pr";b.innerHTML="<i></i><span>"+t+"</span>";
  b.onclick=()=>{if(b.classList.contains("sealed"))return;b.classList.add("sealed");b.firstChild.textContent="✓";sealed++;say(9,0,0,"wink");
    if(sealed===total){say(9,"Sealed forever!","joy","laugh");confetti();$("toGift").hidden=false}};$(g).appendChild(b)}));

// gift
let gt=0;$("box").onclick=()=>{const bx2=$("box");if(bx2.classList.contains("open"))return;gt++;$("tapTxt").textContent=gt<3?`tap ${3-gt} more`:"";bx2.classList.remove("wob");void bx2.offsetWidth;bx2.classList.add("wob");
  if(gt>=3){bx2.classList.add("open");$("tapTxt").hidden=true;$("rev").classList.add("on");say(10,"Surprise!! It’s me!","laugh","laugh");confetti()}};
$("replay").onclick=()=>location.reload();

// confetti
const cv=$("conf"),cx=cv.getContext("2d");let parts=[],raf;
function size(){cv.width=innerWidth;cv.height=innerHeight}size();addEventListener("resize",size);
function confetti(){const col=["#ffd66b","#ff9f8a","#8fe3c8","#f6f1ea"];for(let i=0;i<150;i++)parts.push({x:cv.width/2,y:cv.height*.45,vx:(Math.random()-.5)*14,vy:-Math.random()*14-3,w:5+Math.random()*6,h:8+Math.random()*6,r:Math.random()*6,c:col[i%4]});
  cancelAnimationFrame(raf);(function f(){cx.clearRect(0,0,cv.width,cv.height);parts.forEach(p=>{p.vy+=.28;p.x+=p.vx;p.y+=p.vy;p.r+=.15;cx.save();cx.translate(p.x,p.y);cx.rotate(p.r);cx.fillStyle=p.c;cx.fillRect(-p.w/2,-p.h/2,p.w,p.h);cx.restore()});parts=parts.filter(p=>p.y<cv.height+20);if(parts.length)raf=requestAnimationFrame(f)})()}
// cake backdrop
const ck=document.querySelector(".cake"),hl=document.createElement("div");hl.className="halo";ck.prepend(hl);
[[-34,24,22,0],[252,38,28,1],[-18,170,16,2],[266,156,20,3],[34,-18,14,1],[214,-14,18,0],[118,232,14,2],[236,206,16,3]].forEach(([x,y,z,c],i)=>{const d=document.createElement("i");d.className="drop";d.style.cssText=`left:${x}px;top:${y}px;width:${z}px;height:${z}px;background:${["#ecd3b8","#dcb896","#f4e0c9","#caa07f"][c]};animation-delay:${-i*.6}s`;ck.appendChild(d)});
// bunting
function bunt(){const w=innerWidth,c=["#ffd66b","#ff9f8a","#8fe3c8","#f6f1ea"];let h=`<path d="M0 6Q${w/2} 30 ${w} 6" fill="none" stroke="#ffd66b" stroke-opacity=".5"/>`;
  for(let x=14,i=0;x<w-20;x+=38,i++){const y=6+24*Math.sin(Math.PI*x/w)*1.0;h+=`<path d="M${x} ${y}h26l-13 28z" fill="${c[i%4]}" fill-opacity=".85"/>`}$("bunt").innerHTML=h}bunt();
// premium backdrop: bokeh + tap sparks + pointer light
const bg=$("bg"),bx=bg.getContext("2d");let W,H,orbs=[],sparks=[],mx=-999,my=-999;
const CL=["255,214,107","255,159,138","143,227,200"];
function rs(){W=bg.width=innerWidth;H=bg.height=innerHeight}rs();addEventListener("resize",rs);
for(let i=0;i<32;i++)orbs.push({x:Math.random()*W,y:Math.random()*H,r:8+Math.random()*34,v:.1+Math.random()*.35,c:CL[i%3],a:.05+Math.random()*.1,p:Math.random()*6});
const flk=Array.from({length:28},(_,i)=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,v:.4+Math.random()*.6,p:Math.random()*6,r:Math.random()*6,c:CL[i%3]}));
function loop(t){bx.clearRect(0,0,W,H);
  flk.forEach(f=>{f.y+=f.v;f.x+=Math.sin(t/900+f.p)*.5;f.r+=.03;if(f.y>H+10){f.y=-10;f.x=Math.random()*W}bx.save();bx.translate(f.x,f.y);bx.rotate(f.r);bx.fillStyle=`rgba(${f.c},.45)`;bx.fillRect(-2,-4,4,8);bx.restore()});
  orbs.forEach(o=>{o.y-=o.v;o.x+=Math.sin(t/2000+o.p)*.3;const dx=o.x-mx,dy=o.y-my,d=Math.hypot(dx,dy);if(d<130){o.x+=dx/d*1.3;o.y+=dy/d*1.3}
    if(o.y<-50){o.y=H+50;o.x=Math.random()*W}
    const g=bx.createRadialGradient(o.x,o.y,0,o.x,o.y,o.r);g.addColorStop(0,`rgba(${o.c},${o.a*1.8})`);g.addColorStop(1,`rgba(${o.c},0)`);bx.fillStyle=g;bx.beginPath();bx.arc(o.x,o.y,o.r,0,7);bx.fill()});
  sparks=sparks.filter(s=>s.l>0);sparks.forEach(s=>{s.x+=s.vx;s.y+=s.vy;s.vy+=.07;s.l-=.022;bx.fillStyle=`rgba(${s.c},${s.l})`;bx.fillRect(s.x,s.y,3,3)});
  requestAnimationFrame(loop)}
requestAnimationFrame(loop);
addEventListener("pointermove",e=>{mx=e.clientX;my=e.clientY;$("glow").style.setProperty("--x",mx+"px");$("glow").style.setProperty("--y",my+"px")});
addEventListener("pointerdown",e=>{for(let i=0;i<26;i++){const a=Math.random()*6.28,v=1+Math.random()*4;sparks.push({x:e.clientX,y:e.clientY,vx:Math.cos(a)*v,vy:Math.sin(a)*v-1,l:1,c:CL[i%3]})}});
// countdown
function tick(){const d=Math.max(0,BDAY-Date.now())/1000,v=[d/86400,d/3600%24,d/60%60,d%60].map(x=>String(Math.floor(x)).padStart(2,"0"));$("cd").innerHTML=["days","hrs","min","sec"].map((l,i)=>`<div><b>${v[i]}</b><span>${l}</span></div>`).join("")}tick();setInterval(tick,1000);
// yes / no
$("ynB").src=IMG.b.laugh;$("ynG").src=IMG.g.laugh;$("wImg").src=IMG.g.laugh;
const NOS=["No","Nope?","Sure?","Think again!","Pretty please?","Just say yes"];let nn=0;
function dodge(e){e.preventDefault();nn++;const n=$("no");n.style.position="fixed";n.textContent=NOS[nn%NOS.length];n.style.left=(20+Math.random()*(innerWidth-130))+"px";n.style.top=(130+Math.random()*(innerHeight-300))+"px";$("yes").style.transform=`scale(${Math.min(1+nn*.1,1.7)})`;say(3,["Hey!","Rude!","Ouch…","Come on!"][nn%4],"grump","grump")}
["pointerenter","pointerdown","click"].forEach(ev=>$("no").addEventListener(ev,dodge));
$("yes").onclick=()=>{say(3,"Knew it!","laugh","laugh");confetti();later(()=>show(4),1100)};
// balloons
const BC=["#ffd66b","#ff9f8a","#8fe3c8","#c9b6ff"];let popped=0;
POP.forEach((w,i)=>{const c=document.createElement("div");c.className="cell";c.innerHTML=`<div class="bl" style="--c:${BC[i]};animation-delay:${-i*.7}s"></div><span class="word">${w}</span>`;
  c.querySelector(".bl").onclick=e=>{const b=e.currentTarget;if(b.classList.contains("pop"))return;b.classList.add("pop");c.classList.add("on");popped++;$("cnt").textContent=popped+"/4 popped";say(4,popped<4?"Nice!":"Aww, so true!",popped<4?"joy":"heart","wink");if(popped===4){confetti();$("toCake").hidden=false}};$("bgrid").appendChild(c)});
// wishes
[["l",3],["r",15],["l",34],["r",50],["l",66],["r",82]].forEach(([sd,t],i)=>{const d=document.createElement("div");d.className="wbub";d.textContent=BUBBLES[i];d.style.cssText=`${sd==="l"?"left":"right"}:0;top:${t}%;transition-delay:${i*.3}s;animation-delay:${-i*.5}s`;$("wb").appendChild(d)});
// envelope
function resetEnv(){$("env").classList.remove("open","gone");$("envHint").hidden=false;$("lcard").hidden=true;$("lnext").hidden=true}
$("env").onclick=()=>{$("env").classList.add("open");later(()=>{$("env").classList.add("gone");$("envHint").hidden=true;$("lcard").hidden=false;$("lnext").hidden=false;typeMsg()},750)};
// music box
const mus=document.createElement("button");mus.textContent="♪ Music off";nav.prepend(mus);let ac2,on=false,loopT;
const SEQ=[[392,.75],[392,.25],[440,1],[392,1],[523,1],[494,2],[392,.75],[392,.25],[440,1],[392,1],[587,1],[523,2],[392,.75],[392,.25],[784,1],[659,1],[523,1],[494,1],[440,2],[698,.75],[698,.25],[659,1],[523,1],[587,1],[523,2]];
function playTune(){if(!on)return;let t=ac2.currentTime+.1;SEQ.forEach(([f,d])=>{const o=ac2.createOscillator(),g=ac2.createGain();o.type="triangle";o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.12,t+.02);g.gain.exponentialRampToValueAtTime(.0001,t+d*.5+.4);o.connect(g).connect(ac2.destination);o.start(t);o.stop(t+d*.5+.5);t+=d*.5});loopT=setTimeout(playTune,(t-ac2.currentTime+1.2)*1000)}
mus.onclick=()=>{on=!on;mus.textContent=on?"♪ Music on":"♪ Music off";if(on){ac2=new AudioContext();playTune()}else{clearTimeout(loopT);ac2.close()}};
show(0);
