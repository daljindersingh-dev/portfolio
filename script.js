
/* CURSOR */

const cur = document.getElementById('cur');
const ph_time = document.getElementsByClassName('ph-time')
setInterval(() =>
{
    ph_time[0].innerHTML = new Date().toLocaleTimeString();
}, 1000);
  document.getElementById('current-year').textContent = new Date().getFullYear();

let mx = 0, my = 0, cx = 0, cy = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY });
(function loop() { cx += (mx - cx) * .13; cy += (my - cy) * .13; cur.style.left = cx + 'px'; cur.style.top = cy + 'px'; requestAnimationFrame(loop) })();
document.querySelectorAll('a,button,.chip,.sk-e,.exp-c,.tl-bd,.stat-c,.ct-card,.soc-b,.ham').forEach(el =>
{
    el.addEventListener('mouseenter', () => document.body.classList.add('hov'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('hov'));
});

/* SCROLL */
const nav = document.getElementById('nav'), btt = document.getElementById('btt'), prog = document.getElementById('prog');
window.addEventListener('scroll', () =>
{
    const st = window.scrollY, dh = document.documentElement.scrollHeight - window.innerHeight;
    prog.style.width = (st / dh * 100) + '%';
    nav.classList.toggle('scrolled', st > 60);
    btt.classList.toggle('show', st > 500);
    updateActive();
});
function updateActive()
{
    const secs = document.querySelectorAll('section[id]'), links = document.querySelectorAll('.nav-links a');
    let cur = '';
    secs.forEach(s => { if (window.scrollY >= s.offsetTop - 120) cur = s.id });
    links.forEach(a => a.classList.toggle('act', a.getAttribute('href') === '#' + cur && !a.classList.contains('nav-cta')));
}

/* DRAWER */
function toggleD() { document.getElementById('ham').classList.toggle('open'); document.getElementById('drawer').classList.toggle('open'); document.body.style.overflow = document.getElementById('drawer').classList.contains('open') ? 'hidden' : '' }
function closeD() { document.getElementById('ham').classList.remove('open'); document.getElementById('drawer').classList.remove('open'); document.body.style.overflow = '' }

/* OBSERVER */
const io = new IntersectionObserver(entries =>
{
    entries.forEach(entry =>
    {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('vis');
        entry.target.querySelectorAll('.sk-fi').forEach(b => b.style.width = b.dataset.width + '%');
        entry.target.querySelectorAll('[data-count]').forEach(el => countUp(el, +el.dataset.count));
        io.unobserve(entry.target);
    });
}, { threshold: .16 });
document.querySelectorAll('.rev,.tl-e,.exp-c').forEach(el => io.observe(el));
document.querySelectorAll('.exp-c').forEach((c, i) => c.style.transitionDelay = (i * .13) + 's');
document.querySelectorAll('.tl-e').forEach((c, i) => c.style.transitionDelay = (i * .1) + 's');
document.querySelectorAll('.stat-c.rev').forEach((c, i) => c.style.transitionDelay = (i * .08) + 's');

/* COUNTER */
function countUp(el, target)
{
    let v = 0; const step = target / 50;
    const t = setInterval(() => { v += step; if (v >= target) { el.textContent = target; clearInterval(t) } else el.textContent = Math.floor(v) }, 28);
}

/* FORM */
function sendMsg(btn)
{
    btn.textContent = 'Sending…'; btn.style.opacity = '.7';
    setTimeout(() =>
    {
        btn.textContent = '✓ Message Sent!'; btn.style.opacity = '1'; btn.style.background = 'linear-gradient(135deg,#059669,#10b981)';
        setTimeout(() => { btn.textContent = 'Send Message →'; btn.style.background = '' }, 3000);
    }, 1600);
}

/* PARTICLES */
(function ()
{
    const c = document.getElementById('spark'), ctx = c.getContext('2d');
    let W, H, pts = [];
    function resize() { W = c.width = window.innerWidth; H = c.height = window.innerHeight }
    resize(); window.addEventListener('resize', resize);
    for (let i = 0; i < 65; i++)pts.push({ x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.8 + .4, vx: (Math.random() - .5) * .25, vy: (Math.random() - .5) * .25, o: Math.random() * .7 + .3 });
    function draw()
    {
        ctx.clearRect(0, 0, W, H);
        pts.forEach(p =>
        {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0) p.x = W; if (p.x > W) p.x = 0; if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(2,132,199,${p.o * .3})`; ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
})();