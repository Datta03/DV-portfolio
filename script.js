const progress=document.getElementById("progress");
function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=`${max>0?Math.min(100,scrollY/max*100):0}%`;}
addEventListener("scroll",updateProgress,{passive:true});addEventListener("resize",updateProgress);updateProgress();

const nav=document.getElementById("nav"),menu=document.getElementById("menu");
menu.addEventListener("click",()=>{const open=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(open));menu.textContent=open?"✕":"☰";});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false");menu.textContent="☰";}));

const sections=[...document.querySelectorAll("main section[id]")],links=[...nav.querySelectorAll("a")];
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")===`#${e.target.id}`));}),{rootMargin:"-30% 0px -60% 0px"});
sections.forEach(s=>observer.observe(s));

const revealItems=[...document.querySelectorAll(".card, .skill, .role, .project, .cert, .contact-card, .download-card, .section, .ticker, .hero")];
const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
},{threshold:0.12,rootMargin:"0px 0px -40px 0px"});
revealItems.forEach(item=>{
  item.classList.add("reveal");
  revealObserver.observe(item);
});

document.getElementById("copy").addEventListener("click",async()=>{try{await navigator.clipboard.writeText("dattasvaidya@gmail.com");document.getElementById("copy").textContent="✓";setTimeout(()=>document.getElementById("copy").textContent="▢",1500)}catch{location.href="mailto:dattasvaidya@gmail.com"}});
