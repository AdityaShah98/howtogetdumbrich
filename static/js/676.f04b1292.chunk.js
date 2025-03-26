"use strict";(self.webpackChunkhowtogetdumbrich=self.webpackChunkhowtogetdumbrich||[]).push([[676],{6676:(e,t,o)=>{o.r(t),o.d(t,{default:()=>y});var r=o(5043),n=o(5464),i=o(8270),s=(o(1806),o(579));const l=n.Ay.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
`,a=n.Ay.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: visible;
`,c=n.Ay.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: #333;
  margin: 0;
  line-height: 1.2;
  overflow: visible;
`,u=n.Ay.span`
  display: inline-block;
  overflow: visible;
`,d=n.Ay.span`
  display: inline-block;
  transform-origin: center;
  overflow: visible;
`,f=n.Ay.span`
  color: #4CAF50;
  font-weight: 800;
  position: relative;
`,p=n.Ay.div`
  position: absolute;
  top: -50px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 1.5rem;
  pointer-events: none;
  z-index: 2;
`,h=n.Ay.p`
  font-size: 1.4rem;
  color: #666;
  margin: 1rem 0 0 0;
  opacity: 0;
  text-align: center;
  max-width: 80%;
`,m=n.Ay.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
`,y=e=>{let{exitSplash:t}=e;const o=(0,r.useRef)(null),n=(0,r.useRef)(null),y=(0,r.useRef)([]),g=(0,r.useRef)([]),x=(0,r.useRef)(null),w=(0,r.useRef)(null),b=(0,r.useRef)(null),[v,j]=(0,r.useState)(!1);return(0,r.useEffect)((()=>{i.os.config({nullTargetWarn:!1}),i.os.ticker.lagSmoothing(0),j(!0);const e=i.os.timeline();return()=>{e.kill()}}),[]),(0,r.useEffect)((()=>{if(!v)return;if(!o.current)return;if(b.current)for(let t=0;t<20;t++){const e=document.createElement("div");e.textContent="$",e.style.position="absolute",e.style.top="0",e.style.left=t%5*20-40+"px",e.style.color="#4CAF50",e.style.opacity="0",e.className="dollar-rain",b.current.appendChild(e)}const e=i.os.timeline({onComplete:()=>{i.os.to(o.current,{opacity:0,duration:1,delay:1,onComplete:t})}});e.fromTo(w.current,{backgroundPosition:"0% 0%"},{backgroundPosition:"100% 100%",duration:4,ease:"power1.inOut"},0),g.current.length>0&&(i.os.set(g.current,{opacity:0,scale:0,y:-20}),e.to(g.current,{opacity:1,scale:1,y:0,duration:.03,stagger:.03,ease:"back.out(3)"},.5));const r=y.current[4];r&&(e.to(r,{scale:1.1,color:"#2a9d2a",duration:.3,ease:"back.out(2)",onComplete:()=>{if(b.current){b.current.querySelectorAll(".dollar-rain").forEach(((e,t)=>{i.os.to(e,{opacity:1,y:120*Math.random()+60,x:60*(Math.random()-.5),rotation:360*Math.random(),duration:1.5,delay:.1*t,ease:"power3.out",onComplete:()=>{i.os.to(e,{opacity:0,duration:.3})}})}))}}},"-=1"),e.to(r,{scale:1,color:"#333",duration:.3,ease:"power2.out"},"-=0.8")),x.current&&e.to(x.current,{opacity:1,y:0,duration:.8,ease:"power2.out"},"-=4")}),[t,v]),(0,s.jsxs)(l,{ref:o,className:"initial-fade-in",children:[(0,s.jsx)(m,{ref:w,className:"splash-gradient"}),(0,s.jsxs)(a,{children:[(0,s.jsx)(c,{ref:n,className:"shine-effect",children:"How To Get Dumb Rich".split(" ").map(((e,t)=>(0,s.jsxs)(u,{ref:e=>{e&&(y.current[t]=e)},children:["Rich"===e?(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(f,{className:"dollar-sign pulse",children:"$"}),(0,s.jsx)(p,{ref:b}),e.split("").map(((e,o)=>(0,s.jsx)(d,{ref:e=>{e&&g.current.push(e)},children:e},`${t}-${o}`)))]}):e.split("").map(((e,o)=>(0,s.jsx)(d,{ref:e=>{e&&g.current.push(e)},children:e},`${t}-${o}`))),t<4?" ":""]},t)))}),(0,s.jsx)(h,{ref:x,children:"How much cash could you have made?"})]})]})}}}]);
//# sourceMappingURL=676.f04b1292.chunk.js.map