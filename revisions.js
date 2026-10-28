/* Client revision, 26 October. Original artwork and editable DOM only. */
function animateProducts(grid,cards,expand){
 grid._animation?.cancel();const before=grid.getBoundingClientRect().height/Number(getComputedStyle($('.page-width')).getPropertyValue('--scale'));
 cards.forEach((c,i)=>c.hidden=!expand&&i>=6);const after=grid.offsetHeight;
 grid._animation=grid.animate([{height:before+'px'},{height:after+'px'}],{duration:matchMedia('(prefers-reduced-motion: reduce)').matches?0:350,easing:'ease-in-out'});
 grid.style.overflow='hidden';grid._animation.finished.then(()=>{grid.style.overflow='';}).catch(()=>{});
}
// Excel row order was checked against all 53 original card/modal associations.
$$('.product-card').forEach((card,i)=>{card.dataset.shopUrl=SHOP_LINKS[i].url;card.dataset.shopName=SHOP_LINKS[i].name;});
const tea=$$('.product-card').find(c=>c.dataset.shopUrl.endsWith('/53'));
if(tea){const p=$$('p',tea)[1];p.innerHTML='ニガクナイコウチャ<br>by green eight';p.style.whiteSpace='normal';p.style.textAlign='left';p.style.letterSpacing='0';}
const nakamura=node('0:3822');if(nakamura){const t=document.createElement('template');t.innerHTML=RECOVERED['0:3822'];const e=t.content.firstElementChild;Object.assign(e.style,{position:'absolute',left:'284px',top:'128px'});nakamura.replaceWith(e);}
function linkNode(id,url,label){const e=node(id);if(!e)return;e.classList.remove('disabled-link');e.removeAttribute('title');const a=document.createElement('a');a.href=url;a.className='node-link';a.setAttribute('aria-label',label);e.append(a);}
linkNode('0:848','https://www.parche.co.jp/','パルシェ公式サイト');linkNode('0:741','https://www.parche.co.jp/','パルシェ公式サイト');
$('#mobile-logo').href='https://www.parche.co.jp/';
for(const [label,url] of [['会社情報','https://www.parche.co.jp/company/'],['プライバシーポリシー','https://www.parche.co.jp/privacypolicy/'],['お問い合わせ','https://www.parche.co.jp/contact/']]){
 const e=$$('p',$('#footer')).find(e=>e.textContent.trim()===label);if(e){e.classList.remove('disabled-link');e.removeAttribute('title');const a=document.createElement('a');a.href=url;a.textContent=label;e.replaceChildren(a);}
}
// Original footer icon groups, resolved from source node names/geometry.
linkNode('0:880','https://line.me/R/ti/p/zOGjK9zn7h','LINE');
linkNode('0:879','https://www.instagram.com/shizuokaekibiru_parche/','Instagram');
const topArt=node('0:891');if(topArt)action(topArt,()=>window.scrollTo({top:0,behavior:'smooth'}),'TOP');
// Keep the original matrix (including tilt); floating uses the independent translate property.
$$('[data-name]').filter(e=>/AS_.*(heart|star|snow|spakle)/.test(e.dataset.name)&&!e.closest('dialog')).forEach((e,i)=>{e.classList.add('floating-decoration');e.style.animationDelay=-(i%7)*.45+'s';});
// Menu buttons are 1.25x the 280px source width, centered within 456px.
const menuGroup=node('0:6150',$('#navigation-content'));if(menuGroup){menuGroup.style.transform='translate(53px, 290px) scale(1.25)';}
function fitMenu(){const scale=Math.min(1,innerWidth/456),h=innerHeight/scale;$('#navigation-content').style.height=h+'px';$('#navigation-content').firstElementChild.style.height=h+'px';$('#navigation-content').firstElementChild.querySelector(':scope > svg')?.setAttribute('preserveAspectRatio','none');const cloud=node('0:6149',$('#navigation-content'));if(cloud)cloud.style.transform=`translate(-7px, ${h-120}px)`;if(menuGroup)menuGroup.style.transform=`translate(53px, ${Math.max(215,(h-365)/2+35)}px) scale(1.25)`;}
fitMenu();addEventListener('resize',fitMenu);
// 5.5s source-layer entrance. Hash links and reduced-motion requests go directly to content.
const shouldOpen=!isEvent&&!location.hash&&!matchMedia('(prefers-reduced-motion: reduce)').matches;
if(shouldOpen)document.documentElement.classList.add('opening-pending');
function startOpening(){if(shouldOpen){document.documentElement.classList.remove('opening-pending');
 const mobile=innerWidth<=900,overlay=document.createElement('div');overlay.className='opening';overlay.setAttribute('role','status');overlay.setAttribute('aria-label','Heartful Christmas 2026');
 const canvas=document.createElement('div');canvas.className='opening-canvas';canvas.innerHTML=RECOVERED[mobile?'0:2599':'0:6257'];overlay.append(canvas);
 const basePaint=canvas.firstElementChild?.querySelector(':scope > svg');if(basePaint){basePaint.classList.add('opening-source-background');basePaint.setAttribute('preserveAspectRatio','xMidYMid slice');overlay.prepend(basePaint);overlay.classList.add('has-source-background');}basePaint?.animate([{opacity:0},{opacity:1}],{duration:500,fill:'both'});
 const skip=document.createElement('button');skip.className='opening-skip';skip.textContent='Skip';overlay.append(skip);document.body.append(overlay);
 const page=$('.page-width');page.inert=true;const oldOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
 function size(){const w=mobile?456:1280,h=mobile?777:832,k=Math.min(innerWidth/w,innerHeight/h);Object.assign(canvas.style,{width:w+'px',height:h+'px',transform:`translate(-50%,-50%) scale(${k})`});if(mobile)overlay.style.setProperty('--opening-white-bottom',Math.max(0,(innerHeight-h*k)/2)+'px');}size();addEventListener('resize',size);
 const chars=mobile?['0:2650','0:2915','0:3123','0:3166']:['0:6291','0:6485','0:6528','0:6793'];
 const titles=mobile?['0:2630']:['0:6290','0:7028'];
 const decors=$$('[data-name]',canvas).filter(e=>/AS_|キラキラ背景|1000_F/.test(e.dataset.name));
 decors.forEach((e,i)=>e.animate([{opacity:0},{opacity:1}],{delay:500+(i%10)*65,duration:500,fill:'both'}));
 chars.forEach((id,i)=>{const e=node(id,canvas);e.dataset.openingRole='character';const vertical=mobile?(i%2===0?-110:110):0,horizontal=mobile?0:(i<2?110:-110);e.animate([{opacity:0,translate:`${horizontal}px ${vertical}px`},{opacity:1,translate:'0px 0px'}],{delay:1500,duration:1000,easing:'cubic-bezier(.2,.7,.3,1)',fill:'both'});});
 titles.forEach(id=>{const e=node(id,canvas);e.dataset.openingRole='title';e.animate([{opacity:0},{opacity:1}],{delay:2500,duration:1000,fill:'both'});});
 let done=false;function finish(){if(done)return;done=true;overlay.remove();page.inert=false;document.body.style.overflow=oldOverflow;removeEventListener('resize',size);window.dispatchEvent(new Event('openingfinished'));if(!mobile)scrollAfterOpening();}
 skip.onclick=finish;overlay.animate([{opacity:1},{opacity:0}],{delay:5000,duration:500,fill:'forwards'}).finished.then(finish);
}}
if(document.readyState==='complete')startOpening();else addEventListener('load',startOpening,{once:true});
// Requested editorial adjustments to original source layout.
if(!isEvent){
 for(const p of $$('p:not(.fig-text)',$('#event'))){if(p.textContent.includes('●')){for(const e of [...p.children]){e.style.display='inline';e.style.position='static';}p.style.whiteSpace='normal';}}
}else{
 // These source layers already contain the intended size and tilt. Scaling their
 // positioned parent also scales its translation, moving them onto other cards.
 const gift=node('0:4855');gift.style.translate='0 -22px';
 const prize=node('0:4771');prize.innerHTML='ミニポーチ<br>ナカムラくん';Object.assign(prize.style,{lineHeight:'20px',textAlign:'center',whiteSpace:'nowrap',overflow:'visible'});
 const copy=node('0:4783');copy.textContent=copy.textContent;copy.style.lineHeight='24px';copy.style.whiteSpace='normal';
 const deer=appendHTML(node('0:4292'),RECOVERED['0:1586']);Object.assign(deer.style,{position:'absolute',left:'17px',top:'1692px',width:'61px',height:'66.2293px'});deer.setAttribute('aria-hidden','true');
}

function fitSides(){document.documentElement.style.setProperty('--side-scale',Math.min(1,(innerWidth-456)/2/412));}fitSides();addEventListener('resize',fitSides);

// 27 October customer amendments. Keep keyboard focus, suppress pointer-only rings.
addEventListener('pointerdown',()=>document.documentElement.dataset.input='pointer',true);
addEventListener('keydown',e=>{if(['Tab','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key))document.documentElement.dataset.input='keyboard';},true);
for(const a of $$('a[href]'))if(/^https?:/.test(a.getAttribute('href')||'')){a.target='_blank';a.rel='noopener noreferrer';}
for(const p of $$('p',$('#footer')))if(p.textContent.includes('2024'))p.innerHTML=p.innerHTML.replace('2024','2026');
for(const img of $$('img')){img.decoding='async';if(img.closest('.product-section,.event-preview,.character-intro,.event-detail,.footer'))img.loading='lazy';}

// Bound the hit areas to the exact source footer rectangles, even if a group uses display:contents.
for(const [id,x,y,w,h] of [['0:848',114,197,228,75.1188736],['0:880',155,109,50,50],['0:879',252,109,50,50]]){
 const a=node(id)?.querySelector('a.node-link');if(a){$('#footer').append(a);Object.assign(a.style,{inset:'auto',left:x+'px',top:y+'px',width:w+'px',height:h+'px'});}
}
for(const [button,profile,name] of [['0:912','0:2218','pompom'],['0:3410','0:1973','berrie'],['0:3818','0:1738','nakamura'],['0:1201','0:2295','minto']]){
 const target=node(profile);if(target)target.id='profile-'+name;action(node(button),()=>navigate('profile-'+name),'キャラクター紹介');
}
const cloudCharacter=node('0:4114');if(cloudCharacter){const t=document.createElement('template');t.innerHTML=RECOVERED['0:4114'];const e=t.content.firstElementChild;Object.assign(e.style,{position:'absolute',left:'379px',top:'91px'});cloudCharacter.replaceWith(e);}
// Remove only the extra tree image from the right artwork, keeping the full side background.
const rightRoot=node('0:800');if(rightRoot)rightRoot.style.backgroundImage='none';

// The duplicate tree is an image child, rather than the frame's CSS background.
node('0:800')?.querySelector(':scope > .d33')?.remove();
for(const [id,panel] of [['0:10','#left-panel'],['0:801','#right-panel']]){const e=node(id);const img=e?.querySelector('img');if(!img)continue;const snow=document.createElement('div');snow.className='side-snow';snow.setAttribute('aria-hidden','true');snow.append(img);$(panel).append(snow);e.remove();}

for(const e of $$('[title="リンク先未指定"]',$('#footer'))){e.removeAttribute('title');e.classList.remove('disabled-link');}

// A measured 1.6-second ease-in/out instead of browser-dependent smooth timing.
function scrollAfterOpening(){
 const target=$('#intro');if(!target)return;
 const start=scrollY,end=start+target.getBoundingClientRect().top;
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){window.scrollTo({top:end,behavior:'instant'});return;}
 let frame=0,started;const events=['wheel','touchstart','pointerdown','keydown'];
 const stop=()=>{cancelAnimationFrame(frame);events.forEach(e=>removeEventListener(e,stop));};
 events.forEach(e=>addEventListener(e,stop,{passive:true}));
 function tick(now){started??=now;const t=Math.min(1,(now-started)/1600),ease=t*t*(3-2*t);window.scrollTo({top:start+(end-start)*ease,behavior:'instant'});if(t<1)frame=requestAnimationFrame(tick);else stop();}
 frame=requestAnimationFrame(tick);
}
