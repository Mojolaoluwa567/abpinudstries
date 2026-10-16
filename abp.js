gsap.registerPlugin(ScrollTrigger);
const pg=location.pathname.split('/').pop()||'index.html',L=[['index','Home'],['about','About'],['product','Products'],['contact','Contact']];
document.body.insertAdjacentHTML('afterbegin',`<div class=bar></div><header class=nav><a href=index.html><img src="images/ABP-removebg.png" alt="ABP"></a><nav>${L.map(([h,t])=>`<a href=${h}.html class="${pg==h+'.html'||(pg=='index.html'&&h=='index')?'on':''}">${t}</a>`).join('')}</nav></header>`);
document.body.insertAdjacentHTML('beforeend',`<footer><div><b>ABP Industries</b>52 Ogudu Road, beside NNPC, Ojota, Lagos<br>info@abpindustries.com</div><div><b>Call</b>+234 703 946 0584<br>+234 812 317 3007</div><div><b>Hours</b>Mon–Fri 8–5<br>Sat 9–1 WAT</div><div class=c>© 2026 ABP Industries Limited · NAFDAC certified · 100% Nigerian grown</div></footer>`);
gsap.to('.bar',{scaleX:1,ease:'none',scrollTrigger:{scrub:.2,start:0,end:'max'}});
// split text into words
document.querySelectorAll('[data-split]').forEach(e=>{e.innerHTML=e.textContent.trim().split(/\s+/).map(w=>`<span class=w>${w}</span>`).join(' ')});
document.querySelectorAll('.manifesto').forEach(m=>gsap.to(m.querySelectorAll('.w'),{opacity:1,stagger:.1,ease:'none',scrollTrigger:{trigger:m,start:'top 80%',end:'bottom 45%',scrub:true}}));
// hero
const hb=document.querySelector('.hero .big');
if(hb){hb.innerHTML=[...hb.textContent].map(c=>`<span>${c==' '?'&nbsp;':c}</span>`).join('');
 gsap.from('.hero .big span',{yPercent:110,stagger:.05,duration:1.2,ease:'expo.out'});
 gsap.from('.hero>img',{scale:1.25,duration:2.2,ease:'expo.out'});
 gsap.from('.hero .foot>*',{y:30,opacity:0,delay:.8,duration:1,stagger:.15});
 gsap.to('.hero .big',{yPercent:-40,opacity:.2,ease:'none',scrollTrigger:{trigger:'.hero',scrub:true,start:'top top',end:'bottom top'}});
 gsap.to('.hero>img',{scale:1.15,yPercent:12,ease:'none',scrollTrigger:{trigger:'.hero',scrub:true,start:'top top',end:'bottom top'}})}
document.querySelectorAll('.rv').forEach(e=>gsap.to(e,{opacity:1,y:0,duration:1,ease:'power3.out',scrollTrigger:{trigger:e,start:'top 88%'}}));
document.querySelectorAll('.clip').forEach(c=>{gsap.from(c,{clipPath:'inset(18% 18% 18% 18% round 16px)',duration:1.4,ease:'expo.out',scrollTrigger:{trigger:c,start:'top 85%'}});
 gsap.fromTo(c.querySelector('img'),{scale:1.3,yPercent:-8},{scale:1,yPercent:8,ease:'none',scrollTrigger:{trigger:c,scrub:true}})});
document.querySelectorAll('[data-n]').forEach(e=>{const o={v:0},s=e.dataset.s||'';gsap.to(o,{v:+e.dataset.n,duration:2,ease:'power2.out',scrollTrigger:{trigger:e,start:'top 90%'},onUpdate:()=>e.textContent=Math.round(o.v)+s})});
document.querySelectorAll('.mq div').forEach((m,i)=>gsap.to(m,{xPercent:i?15:-30,ease:'none',scrollTrigger:{trigger:m,scrub:true}}));
document.querySelectorAll('.stack .s').forEach((s,i,a)=>{if(i<a.length-1)gsap.to(s,{scale:.94,ease:'none',scrollTrigger:{trigger:a[i+1],start:'top 80%',end:'top 15%',scrub:true}})});
document.querySelectorAll('.prod .pic img').forEach(i=>gsap.fromTo(i,{rotate:-8,y:60},{rotate:6,y:-60,ease:'none',scrollTrigger:{trigger:i,scrub:true}}));
ScrollTrigger.matchMedia({'(min-width:801px)':()=>{const t=document.querySelector('.track');if(t)gsap.to(t,{x:()=>-(t.scrollWidth-innerWidth),ease:'none',scrollTrigger:{trigger:'.hwrap',pin:true,scrub:.6,end:()=>'+='+(t.scrollWidth-innerWidth),invalidateOnRefresh:true}})}});
document.querySelectorAll('.pill[data-f]').forEach(b=>b.onclick=()=>{document.querySelectorAll('.pill[data-f]').forEach(x=>x.classList.toggle('on',x==b));document.querySelectorAll('.tile').forEach(t=>t.classList.toggle('off',b.dataset.f!='all'&&t.dataset.c!=b.dataset.f))});
const f=document.querySelector('.form');if(f)f.onsubmit=e=>{e.preventDefault();const d=new FormData(f);open('https://wa.me/2347039460584?text='+encodeURIComponent(`Hi ABP, I'm ${d.get('n')}. ${d.get('m')}`))};
