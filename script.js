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


document.querySelectorAll(".copy-mail").forEach((copyButton) => {
  copyButton.addEventListener("click", async (event) => {
    event.preventDefault();

    const email = "dattasvaidya@gmail.com";

    try {
      await navigator.clipboard.writeText(email);

      copyButton.innerHTML = "✓";
      copyButton.setAttribute("aria-label", "Email copied");
      copyButton.title = "Copied!";
      copyButton.classList.add("copied");

      setTimeout(() => {
        copyButton.innerHTML = `
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M9 9.5A2.5 2.5 0 0 1 11.5 7h7A2.5 2.5 0 0 1 21 9.5v7A2.5 2.5 0 0 1 18.5 19h-7A2.5 2.5 0 0 1 9 16.5z"></path>
            <path d="M15 14.5H6.5A2.5 2.5 0 0 1 4 12V6.5A2.5 2.5 0 0 1 6.5 4H13.5A2.5 2.5 0 0 1 16 6.5V10"></path>
          </svg>`;
        copyButton.setAttribute("aria-label", "Copy email");
        copyButton.title = "Copy email";
        copyButton.classList.remove("copied");
      }, 2000);

    } catch (error) {
      console.error("Clipboard copy failed:", error);
      alert("Could not copy automatically. Please copy this email manually: " + email);
    }
  });
});
