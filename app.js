/* Plain DOM implementation. All artwork is local; complete screens are never images. */
'use strict';
const $=(q,root=document)=>root.querySelector(q), $$=(q,root=document)=>[...root.querySelectorAll(q)];
const node=(id,root=document)=>root.querySelector(`[data-node-id="${id}"]`);
const fragment=id=>DESIGN['node-'+id.replace(':','-')]||'';
function appendHTML(parent,html){const t=document.createElement('template');t.innerHTML=html;parent.append(t.content);return parent.lastElementChild;}
function section(id,name,height){const s=document.createElement('section');s.className='section '+name;s.id=id;if(height)s.style.height=height+'px';$('#main').append(s);return s;}
function placed(parent,id,override){const m=Object.assign({},LAYERS[id],override);const html=fragment(id);if(!html)return null;const t=document.createElement('template');t.innerHTML=html;const root=t.content.firstElementChild;const contents=root&&getClassDisplay(root)==='contents';if(contents){parent.append(root);return root;}const w=document.createElement('div');w.className='placed';Object.assign(w.style,{left:m.x+'px',top:m.y+'px',width:m.width+'px',height:m.height+'px'});w.append(root);parent.append(w);return w;}
function getClassDisplay(el){document.body.append(el);const d=getComputedStyle(el).display;el.remove();return d;}
function background(parent){appendHTML(parent,'<div class="art-background"><img src="assets/561f8939-377c-48e8-8341-01d5a7dfc9a2.png" alt=""></div>');}
const left=appendHTML($('#left-panel'),'<div class="side-art"></div>');background(left);
const leftPositions={'0:10':[-48,711,466,125],'0:11':[-2,40,437.444,719.773],'0:38':[362,751.5,34.077,32.169],'0:39':[148,-5.922,32.492,36.391],'0:40':[309.239,5,31.132,26.898],'0:41':[19,258,400,277],'0:61':[46,192,112,119],'0:296':[43,597,123.863,176.874],'0:504':[282,146,116,133.185],'0:547':[261,579,116,162.738],'0:741':[16,15,102,21],'0:748':[20,103,168,54.86]};
for(const [id,[x,y,width,height]]of Object.entries(leftPositions))placed(left,id,{x,y,width,height});
const right=appendHTML($('#right-panel'),'<div class="side-art"></div>');appendHTML(right,DESIGN['context-4']);appendHTML($('.mobile-header'),'<div class="mobile-header-art" aria-hidden="true">'+RECOVERED['0:5969']+'</div>');$('#menu-toggle').textContent='';
const isEvent=location.pathname.endsWith('events.html');
if(!isEvent){
 const hero=section('top','hero');const art=appendHTML(hero,'<div class="hero-art" role="img" aria-label="パルシェのクリスマス・ナルミヤキャラクターズ"></div>');background(art);
 const hp={'0:2600':[-25,653,523.402,124.433],'0:2601':[7,-19,437.444,719.773],'0:2630':[28,199,400,277],'0:2650':[55,132,113,119],'0:2915':[52,538,123.863,176.874],'0:3123':[291,87,116,133.185],'0:3166':[270,520,116,162.738]};
 for(const[id,[x,y,width,height]]of Object.entries(hp))placed(art,id,{x,y,width,height});
 appendHTML(section('intro','intro'),DESIGN['context-2']);
 for(const [id,name,gridId]of [['0:899','gourmet','0:916'],['0:3399','fashion','0:3788'],['0:3806','goods','0:4103']]){
  const s=section(name,'product-section');appendHTML(s,fragment(id));const artRoot=s.firstElementChild;s.style.backgroundImage=artRoot.style.backgroundImage;artRoot.style.backgroundImage='none';const grid=node(gridId,s);grid.classList.add('product-grid');grid.id=name+'-products';
  const cards=[...grid.children];cards.forEach((c,i)=>{c.classList.add('product-card');c.setAttribute('role','button');c.tabIndex=0;c.setAttribute('aria-haspopup','dialog');c.dataset.cardIndex=i;c.hidden=i>=6;c.setAttribute('aria-label',c.textContent.trim().replace(/\s+/g,' '));c.addEventListener('click',()=>openProduct(c));c.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openProduct(c);}});});
  const moreIds={gourmet:['0:6090','0:6113'],fashion:['0:5998','0:6021'],goods:['0:6044','0:6067']}[name];const more=appendHTML(s,`<button class="more-button" aria-label="商品をすべて表示" aria-expanded="false" aria-controls="${name}-products"></button>`);const moreArt=()=>{more.innerHTML='<span aria-hidden="true">'+RECOVERED[moreIds[more.getAttribute('aria-expanded')==='true'?1:0]]+'</span>';};moreArt();more.onclick=()=>{const expand=more.getAttribute('aria-expanded')!=='true';animateProducts(grid,cards,expand);more.setAttribute('aria-expanded',expand);more.setAttribute('aria-label',expand?'商品を6件に戻す':'商品をすべて表示');moreArt();if(!expand)s.scrollIntoView({block:'start',behavior:'smooth'});};
 }
 appendHTML(section('event','event-preview'),RECOVERED['0:1175']);
 const profiles=section('characters','character-intro');for(const id of ['0:1648','0:1711','0:1736'])placed(profiles,id);
 const body=appendHTML(profiles,RECOVERED['0:1737']);Object.assign(body.style,{position:'absolute',left:'36px',top:'274px'});
}else{
 const s=section('event-detail','event-detail');appendHTML(s,RECOVERED['0:4292']);
 appendHTML(s,'<a class="event-return" href="index.html#event" aria-label="Back"><span class="sr-only">Back</span><img src="assets/back-0-5133.svg" width="47.1784362793" height="17" alt=""></a>');
}
appendHTML(section('footer','footer'),fragment('0:847'));
appendHTML($('#main'),'<div class="review-strip">制作プレビュー：一部の原稿・画像・リンク・仕様は未確定です。<a href="README.md">確認事項</a></div>');
appendHTML($('#navigation-content'),RECOVERED['0:6136']);
function action(el,callback,label){if(!el)return;el.classList.add('action');el.setAttribute('role','button');el.tabIndex=0;if(label)el.setAttribute('aria-label',label);el.onclick=callback;el.onkeydown=e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();callback();}};}
const destinations=['gourmet','fashion','goods','event'];
for(const group of [['0:3395','0:3396','0:3397','0:3398'],['0:803','0:804','0:805','0:806']])group.forEach((id,i)=>action(node(id),()=>navigate(destinations[i]),destinations[i]));
const menuButtons=$$('[data-name*="@2x"]',$('#navigation-content')).filter(e=>/Gourmet|Fashion|Gift|Event/.test(e.dataset.name||''));menuButtons.forEach((e,i)=>action(e,()=>{closeDialog($('#navigation')).then(()=>navigate(destinations[i]));},destinations[i]));
function navigate(id){if(isEvent)location.href='index.html#'+id;else {const target=document.getElementById(id);if(target)window.scrollTo({top:scrollY+target.getBoundingClientRect().top-$('.mobile-header').getBoundingClientRect().height,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}}
for(const id of ['0:912','0:3410','0:3818','0:1201'])action(node(id),()=>navigate('characters'),'キャラクター紹介');
for(const id of ['0:1205','0:1206','0:1207','0:1208','0:1215','0:1634','0:1632'])action(node(id),()=>location.href='events.html','イベント詳細');
let modalTemplates=null,modalLoad=null;
function loadModalTemplates(){
 if(modalTemplates)return Promise.resolve(modalTemplates);
 if(!modalLoad)modalLoad=new Promise((resolve,reject)=>{const script=document.createElement('script');script.src='modal-data.js';script.onload=()=>{modalTemplates=Object.entries(window.MODAL_DATA).map(([k,markup])=>{const t=document.createElement('template');t.innerHTML=markup;return {key:'node-'+k.replace(':','-'),markup,text:t.content.textContent.replace(/\s+/g,'')};});resolve(modalTemplates);};script.onerror=()=>{script.remove();modalLoad=null;reject(new Error('商品データを読み込めませんでした。もう一度お試しください。'));};document.head.append(script);});
 return modalLoad;
}

function restoreDialog(d){if(!d._locked)return;d._locked=false;document.body.style.position='';document.body.style.top='';document.body.style.width='';window.scrollTo({top:d._scrollY,behavior:'instant'});d._returnFocus?.focus({preventScroll:true});$('#menu-toggle').setAttribute('aria-expanded','false');}
function openDialog(d){d._returnFocus=document.activeElement;d._scrollY=window.scrollY;d._locked=true;document.body.style.position='fixed';document.body.style.top=-d._scrollY+'px';document.body.style.width='100%';d._closing=false;d.showModal();d.classList.remove('dialog-closing');d.animate([{opacity:0},{opacity:1}],{duration:matchMedia('(prefers-reduced-motion: reduce)').matches?0:300,easing:'ease-out'});d.scrollTop=0;($('.dialog-x',d)||d).focus({preventScroll:true});}
function closeDialog(d){if(d._closing||!d.open)return Promise.resolve();d._closing=true;d.classList.add('dialog-closing');return d.animate([{opacity:1},{opacity:0}],{duration:matchMedia('(prefers-reduced-motion: reduce)').matches?0:300,easing:'ease-in'}).finished.then(()=>{d.close();restoreDialog(d);d._closing=false;});}
for(const d of $$('dialog')){ const x=$('.dialog-x',d);if(x)x.onclick=()=>closeDialog(d);d.addEventListener('cancel',e=>{e.preventDefault();closeDialog(d);});d.addEventListener('close',()=>{if(!d.open)restoreDialog(d);});d.addEventListener('click',e=>{if(e.target===d){const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(d);}});}
$('#menu-toggle').onclick=()=>{alignMenuClose();$('#menu-toggle').setAttribute('aria-expanded','true');openDialog($('#navigation'));};
async function openProduct(card){if(card.dataset.loading)return;card.dataset.loading='true';card.setAttribute('aria-busy','true');try{await loadModalTemplates();}catch(error){card.removeAttribute('aria-busy');delete card.dataset.loading;alert(error.message);return;}card.removeAttribute('aria-busy');delete card.dataset.loading;const shop=$$('p',card)[1]?.textContent.replace(/\s+/g,'')||'';const match=modalTemplates.find(m=>shop.length>1&&m.text.includes(shop));const best=match?10:0;
 const content=$('#modal-content');content.innerHTML='';if(match&&best>4){appendHTML(content,match.markup);content.dataset.modal=match.key;content.setAttribute('aria-label',shop+' 商品詳細');for(const e of $$('[data-name="ボタン"]',content))action(e,()=>closeDialog($('#modal')),'閉じる');for(const e of $$('p',content).filter(e=>e.textContent==='Shop info')){const a=document.createElement('a');a.href=card.dataset.shopUrl;a.target='_blank';a.rel='noopener noreferrer';a.textContent='Shop info';a.setAttribute('aria-label',shop+' ショップ情報');e.replaceChildren(a);}}
 else{content.dataset.modal='pending';appendHTML(content,'<div class="pending-modal status-note"><h2>商品詳細は制作確認中です</h2><p>この商品の詳細データとの対応を確認中です。確定していない価格・説明は補完していません。</p><button>閉じる</button></div>');$('button',content).onclick=()=>closeDialog($('#modal'));}openDialog($('#modal'));fitImageBorders($('#modal'));}
for(const id of ['0:865','0:869','0:873','0:878']){const e=node(id);if(e){e.title='リンク先未指定';e.classList.add('disabled-link');}}
function fitImageBorders(scope=document){for(const el of $$('[data-node-id]',scope)){const child=el.querySelector(':scope > div[aria-hidden]');if(!child)continue;const cs=getComputedStyle(el);if(parseFloat(cs.borderLeftWidth)>0){el.classList.add('figma-image-frame');el.style.setProperty('--stroke',cs.borderLeftWidth);el.style.setProperty('--stroke-color',cs.borderLeftColor);el.style.setProperty('--radius',cs.borderTopLeftRadius);}}}
fitImageBorders();
function resize(){const scale=Math.min(1,window.innerWidth/456);$('.page-width').style.setProperty('--scale',scale);for(const d of $$('dialog')){d.style.setProperty('--scale',scale);d.style.width=456*scale+'px';}}resize();window.addEventListener('resize',resize);
if(location.hash)requestAnimationFrame(()=>{const target=document.getElementById(location.hash.slice(1));if(target)window.scrollTo({top:scrollY+target.getBoundingClientRect().top-$('.mobile-header').getBoundingClientRect().height,behavior:'instant'});});

// Keep the mobile menu close circle centered on the header hamburger.
function alignMenuClose(){
 const x=$('#navigation .dialog-x');if(!x)return;
 if(innerWidth<=900){const r=$('#menu-toggle').getBoundingClientRect();x.style.left=(r.left+r.width/2-20)+'px';x.style.top=(r.top+r.height/2-20)+'px';}
 else{x.style.left='';x.style.top='';}
}
addEventListener('resize',()=>{if($('#navigation').open)alignMenuClose();});
