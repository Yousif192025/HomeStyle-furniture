// DOM Elements and Data
const galleryData = Array.from({ length: 12 }, (_, i) => `gallery-${String(i+1).padStart(2,'0')}.webp`);
const projectsData = [
    { name: 'فيلا الشاطئ', desc: 'غرفة معيشة مودرن', img: 'project-1.webp' },
    { name: 'قصر اليمامة', desc: 'دريسنج روم فاخر', img: 'project-2.webp' },
    { name: 'شقة العليا', desc: 'طقم سفرة زجاج', img: 'project-3.webp' },
    { name: 'استراحة الساحل', desc: 'ركنة زاوية مودرن', img: 'project-4.webp' }
];
const testimonials = [
    { text: 'أثاث راقي وخامات ممتازة، خدمة التوصيل كانت سريعة جداً.', name: 'أمل عبدالله', city: 'جدة' },
    { text: 'التصاميم العصرية جعلت منزلي يبدو فاخراً، ودقة التنفيذ رائعة.', name: 'خالد الفهد', city: 'الرياض' },
    { text: 'رائع! استشارة مجانية ساعدتني في اختيار قطع تتوافق مع مساحة بيتي.', name: 'سارة المنصور', city: 'الخبر' }
];
const faqData = [
    { q: 'ما هي مدة التوصيل؟', a: 'نوصل لكافة مناطق المملكة خلال 3-7 أيام عمل بعد التصنيع.' },
    { q: 'هل توفرون خدمة التركيب؟', a: 'نعم، فريق متخصص يقوم بالتركيب المجاني لجميع القطع.' },
    { q: 'هل يمكن تغيير لون القطعة؟', a: 'بالتأكيد، نوفر أكثر من 20 لوناً حسب الطلب.' }
];

// Helper: Render Gallery with Lazy Loading
function renderGallery() {
    const container = document.getElementById('galleryContainer');
    if(!container) return;
    container.innerHTML = galleryData.map(src => `
        <div class="gallery-item" data-img="assets/images/gallery/${src}">
            <img src="assets/images/gallery/${src}" alt="تصميم أثاث منزلي HomeStyle" loading="lazy" decoding="async">
        </div>
    `).join('');
    // Lightbox Event
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', () => {
            const imgSrc = item.dataset.img;
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `<img src="${imgSrc}" alt="تكبير الصورة">`;
            lightbox.addEventListener('click', () => lightbox.remove());
            document.body.appendChild(lightbox);
        });
    });
}

function renderProjects() {
    const container = document.getElementById('projectsContainer');
    if(!container) return;
    container.innerHTML = `<div class="projects-grid" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:2rem;">` + 
        projectsData.map(p => `
            <div class="project-card">
                <img src="assets/images/projects/${p.img}" alt="${p.name}" loading="lazy" decoding="async">
                <h3>${p.name}</h3>
                <p>${p.desc}</p>
            </div>
        `).join('') + `</div>`;
}

// Testimonials Slider
let currentSlide = 0;
function renderTestimonials() {
    const container = document.getElementById('sliderContainer');
    if(!container) return;
    container.innerHTML = testimonials.map(t => `
        <div class="testimonial-card">
            <p>“${t.text}”</p>
            <h4>${t.name}</h4>
            <small>${t.city}</small>
        </div>
    `).join('');
    updateSlider();
}
function updateSlider() {
    const slider = document.getElementById('sliderContainer');
    if(slider) slider.style.transform = `translateX(-${currentSlide * 100}%)`;
}
function nextSlide() { currentSlide = (currentSlide + 1) % testimonials.length; updateSlider(); }
function prevSlide() { currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length; updateSlider(); }

// FAQ Accordion
function renderFAQ() {
    const container = document.getElementById('faqContainer');
    if(!container) return;
    container.innerHTML = faqData.map((faq, idx) => `
        <div class="faq-item">
            <div class="faq-question" role="button" tabindex="0" aria-expanded="false">${faq.q}</div>
            <div class="faq-answer"><p>${faq.a}</p></div>
        </div>
    `).join('');
    document.querySelectorAll('.faq-question').forEach((q, i) => {
        q.addEventListener('click', () => {
            const parent = q.parentElement;
            parent.classList.toggle('active');
            const expanded = parent.classList.contains('active');
            q.setAttribute('aria-expanded', expanded);
        });
        q.addEventListener('keypress', (e) => { if(e.key === 'Enter') q.click(); });
    });
}

// Quote Button Alert
function setupQuoteBtn() {
    const btn = document.getElementById('quoteBtn');
    if(btn) btn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('📞 شكراً لاهتمامك! سيتم التواصل معك خلال 24 ساعة لتقديم عرض سعر دقيق.');
    });
}

// Initialize All
document.addEventListener('DOMContentLoaded', () => {
    renderGallery();
    renderProjects();
    renderTestimonials();
    renderFAQ();
    setupQuoteBtn();
    if(document.querySelector('.next')) document.querySelector('.next').addEventListener('click', nextSlide);
    if(document.querySelector('.prev')) document.querySelector('.prev').addEventListener('click', prevSlide);
});
