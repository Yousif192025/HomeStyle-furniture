# 🛋️ HomeStyle Furniture — Landing Page

موقع Landing Page احترافي لمتجر أثاث منزلي فاخر.  
مبني بـ **HTML + CSS + JavaScript** فقط — بدون أي Framework أو مكتبات خارجية.  
جاهز للنشر مباشرة على **GitHub Pages** أو **Vercel**.

---

## 🔗 روابط الموقع
- GitHub Pages: https://yousif192025.github.io/HomeStyle-furniture/
- Vercel: https://home-style-furniture-ten.vercel.app/

---

## 📁 هيكل المشروع

```
HomeStyle-furniture/
│
├── index.html                        ← الصفحة الرئيسية الكاملة
├── manifest.json                     ← PWA Manifest
├── robots.txt                        ← توجيهات محركات البحث
├── sitemap.xml                       ← خريطة الموقع (SEO)
│
└── assets/
    ├── css/
    │   └── style.css                 ← كامل التصميم (1487 سطر)
    │
    ├── js/
    │   └── main.js                   ← كل الوظائف التفاعلية (428 سطر)
    │
    ├── images/
    │   ├── hero/
    │   │   └── hero-living-room.webp ← صورة Hero (1600×1200)
    │   ├── gallery/
    │   │   ├── gallery-01.webp       ← 12 صورة معرض (WebP)
    │   │   ├── gallery-02.webp
    │   │   ├── ...
    │   │   └── gallery-12.webp
    │   └── projects/
    │       ├── project-01.webp       ← 6 صور أعمال (WebP)
    │       ├── ...
    │       └── project-06.webp
    │
    └── favicon/
        ├── favicon.svg               ← أيقونة SVG (جميع المتصفحات)
        ├── favicon.ico               ← أيقونة ICO متعددة الأحجام
        ├── apple-touch-icon.png      ← أيقونة iOS (180×180)
        ├── icon-192.png              ← PWA icon (192×192)
        └── icon-512.png              ← PWA icon maskable (512×512)
```

---

## 🎨 الأقسام

| القسم | الوصف |
|-------|-------|
| **Announcement Bar** | شريط إعلان قابل للإغلاق مع حفظ الحالة |
| **Hero** | صورة رئيسية + H1 تسويقي + زر WhatsApp + زر عرض سعر + ثقة |
| **Material Swatches** | عرض خامات الأثاث بـ CSS خالص (خشب/كتان/نحاس/جلد/رخام/بوكلي) |
| **About** | أرقام ومؤشرات الأداء (500+ مشروع، 15 سنة، ضمان 5 سنوات) |
| **Features** | 4 مزايا رئيسية مع أيقونات SVG |
| **Categories** | 4 تشكيلات مع فلتر للمعرض |
| **Gallery** | 12 صورة Masonry Grid + Filter + Lightbox |
| **Projects** | 6 مشاريع منجزة بـ Hover Overlay |
| **Offer + Countdown** | عرض خاص مع عداد تنازلي 72 ساعة |
| **Testimonials** | Slider تلقائي بـ 3 شهادات |
| **FAQ** | 5 أسئلة شائعة بـ Accordion |
| **CTA + Quote Form** | نموذج طلب سعر يرسل عبر WhatsApp |
| **Contact** | معلومات التواصل + خريطة Google Maps |
| **Footer** | 4 أعمدة + روابط اجتماعية + حقوق النشر |
| **FABs** | زر WhatsApp عائم + زر العودة للأعلى |

---

## ⚙️ الوظائف التفاعلية (main.js)

1. **Announcement Bar** — إغلاق مع حفظ في `sessionStorage`
2. **Sticky Header** — تغيير المظهر عند التمرير
3. **Mobile Navigation** — قائمة جوال مع Hamburger + Escape
4. **Active Nav Link** — تعليم الرابط النشط بـ IntersectionObserver
5. **Gallery Filter** — تصفية الصور بالفئة مع انتقال سلس
6. **Lightbox** — عرض الصور بالحجم الكامل + لوحة المفاتيح + Swipe
7. **Testimonials Slider** — تلقائي كل 5 ثواني + يتوقف عند Hover
8. **FAQ Accordion** — فتح/إغلاق مع CSS Grid animation
9. **Countdown Timer** — عداد 72 ساعة محفوظ في `sessionStorage`
10. **Quote Form → WhatsApp** — إرسال الطلب عبر wa.me
11. **Scroll Reveal** — ظهور تدريجي بـ IntersectionObserver
12. **Back-to-Top FAB** — يظهر بعد 500px تمرير

---

## 🎯 SEO المنجز

- `<title>` محسّن بالكلمات المفتاحية
- `<meta description>` و `<meta keywords>`
- `<link rel="canonical">`
- **Open Graph** كامل (og:title, og:description, og:image, og:url)
- **Twitter Cards** (summary_large_image)
- **Structured Data JSON-LD**:
  - `FurnitureStore` + `LocalBusiness`
  - `Organization`
  - `WebSite`
  - `BreadcrumbList`
  - `FAQPage` (5 أسئلة)
- H1 واحد فقط، تسلسل H2/H3 صحيح
- Alt text احترافي لكل صورة (19 صورة)
- `robots.txt` + `sitemap.xml` مع Image Sitemap
- `loading="lazy"` + `decoding="async"` لكل الصور
- `fetchpriority="high"` لصورة Hero (تحسين LCP)
- `rel="preload"` لصورة Hero
- `display=swap` للخطوط (تحسين FCP)

---

## ♿ إمكانية الوصول (WCAG AA)

- `<a class="skip-link">` — تخطي إلى المحتوى
- `aria-label` على كل العناصر التفاعلية
- `aria-expanded` و `aria-controls` على القائمة والـ FAQ
- `aria-current` على روابط التنقل النشطة
- `aria-live="polite"` على العداد التنازلي
- `role` صحيح على الـ dialog, tablist, listitem, region
- `focus-visible` واضح على كل العناصر التفاعلية
- `prefers-reduced-motion` محترم بالكامل
- ألوان بتباين كافٍ (WCAG AA)

---

## 🚀 كيفية النشر

### GitHub Pages
```bash
git init
git add .
git commit -m "Initial: HomeStyle Furniture landing page"
git remote add origin https://github.com/USERNAME/HomeStyle-furniture.git
git push -u origin main
# فعّل GitHub Pages من Settings → Pages → Branch: main
```

### Vercel
```bash
# اسحب المستودع ثم:
vercel deploy --prod
# أو اربط المستودع مباشرة من vercel.com
```

> ⚠️ لا يوجد `package.json` أو `node_modules` — مشروع Static خالص.

---

## 🔧 تخصيص المشروع

### 1. رقم واتساب
ابحث عن `966500000000` في الملفات واستبدله برقمك الفعلي (بدون + وبدون مسافات):
```
index.html  → 12 موضع
main.js     → سطر 1 في initQuoteForm()
```

### 2. الصور
استبدل الصور في `assets/images/` بصورك الحقيقية بنفس الأسماء:
```
assets/images/hero/hero-living-room.webp
assets/images/gallery/gallery-01.webp ... gallery-12.webp
assets/images/projects/project-01.webp ... project-06.webp
```
**نصيحة:** استخدم صيغة WebP دائماً لأفضل أداء.

### 3. Google Maps
في قسم Contact، استبدل `src` الـ `<iframe>` بـ embed URL لموقعك الفعلي من Google Maps.

### 4. الـ Canonical URL
في `<head>` بـ `index.html`:
```html
<link rel="canonical" href="https://YOUR-DOMAIN.com/">
```
وفي `sitemap.xml` و `robots.txt` استبدل الدومين.

---

## 🎨 لوحة الألوان

| المتغير | الكود | الاستخدام |
|---------|-------|-----------|
| `--cream` | `#F5EFE6` | خلفية رئيسية |
| `--espresso` | `#2B2118` | نص داكن + هيدر Footer |
| `--clay-deep` | `#9C5536` | CTA + Accent |
| `--clay` | `#B9744A` | تأكيد ثانوي |
| `--brass` | `#B68D4C` | تفاصيل ذهبية |
| `--muted` | `#6E5F52` | نص ثانوي |

---

## 📊 توقعات PageSpeed Insights

| المقياس | متوقع |
|---------|-------|
| **Performance Mobile** | 88–94 |
| **Performance Desktop** | 95–99 |
| **Accessibility** | 95–100 |
| **Best Practices** | 95–100 |
| **SEO** | 95–100 |

> ✅ للوصول لأعلى نقاط: استبدل placeholder WebP بصور حقيقية محسّنة، واستخدم CDN للصور.

--- -- 

## 📝 ما يجب استبداله قبل النشر الفعلي

- [ ] رقم واتساب (`966500000000` → رقمك الحقيقي)
- [ ] صورة Hero بصورة غرفة معيشة حقيقية
- [ ] 12 صورة معرض بأعمالك الحقيقية
- [ ] 6 صور مشاريع بأعمالك المنجزة
- [ ] Canonical URL بدومينك الحقيقي
- [ ] Google Maps iframe بموقعك الفعلي
- [ ] روابط السوشيال ميديا الحقيقية
- [ ] `sitemap.xml` و `robots.txt` بدومينك الحقيقي

---

*صُنع بـ ❤️ — HTML + CSS + JS خالص، بدون مكتبات خارجية.*
