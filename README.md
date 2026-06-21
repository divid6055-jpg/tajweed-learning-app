# 📖 تطبيق تعلم التجويد التفاعلي

<div dir="rtl" align="center">

![Version](https://img.shields.io/badge/version-1.0.0-emerald.svg)
![Next.js](https://img.shields.io/badge/Next.js-16-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)
![PWA](https://img.shields.io/badge/PWA-ready-purple.svg)

**تطبيق عصري تفاعلي لتعلم أحكام التجويد بطريقة سهلة وممتعة**

</div>

## ✨ نظرة عامة

تطبيق ويب تقدمي (PWA) متكامل لتعلم علم التجويد، يجمع بين المحتوى العلمي الموثوق والتصميم العصري والتجربة التفاعلية. يعمل التطبيق على جميع الأجهزة (الجوال، اللوحي، الحاسوب) ويمكن تثبيته كتطبيق أصلي على الهواتف.

## 🎯 الأقسام التعليمية

| القسم | المستوى | عدد الدروس | المدة المقدرة |
|-------|---------|------------|----------------|
| 📚 مخارج الحروف | مبتدئ | 6 دروس | 25 دقيقة |
| ✨ صفات الحروف | متوسط | 5 دروس | 30 دقيقة |
| 📖 النون الساكنة والتنوين | متوسط | 4 دروس | 35 دقيقة |
| 📚 الميم الساكنة | متوسط | 3 دروس | 20 دقيقة |
| 🌊 أحكام المد | متقدم | 6 دروس | 40 دقيقة |
| 📜 أحكام متفرقة | متقدم | 3 دروس | 30 دقيقة |

**المجموع: 27 درساً + 18 سؤال اختباري تفاعلي**

## 🌟 المميزات

### 📚 المحتوى التعليمي
- ✅ شرح مفصل لكل حكم مع أمثلة من القرآن الكريم
- ✅ تقسيم منطقي للدروس حسب المستوى (مبتدئ/متوسط/متقدم)
- ✅ أمثلة صوتية لكل قاعدة (Web Speech API)
- ✅ محتوى مبني على المراجع المعتمدة (تحفة الأطفال، المقدمة الجزرية، الشاطبية)

### 🎮 التفاعلية
- ✅ اختبارات تفاعلية مع تصحيح فوري وتفسيرات
- ✅ تتبع التقدم مع إحصائيات تفصيلية
- ✅ نظام علامات مرجعية للدروس المفضلة
- ✅ تتبع الأيام المتتالية (Streak) للتشجيع على الاستمرارية
- ✅ شاشة نتائج احتفالية بعد كل اختبار

### 🎨 التصميم
- ✅ تصميم عصري بألوان إسلامية (الأخضر الزمردي والذهبي)
- ✅ دعم كامل للغة العربية واتجاه RTL
- ✅ خطوط عربية متعددة (Cairo, Amiri, Reem Kufi)
- ✅ تصميم متجاوب (Mobile-First)
- ✅ حركات انتقالية سلسة (Framer Motion)
- ✅ دعم الوضع الليلي (Dark Mode)
- ✅ أنماط زخرفية إسلامية في الخلفيات

### 📲 التثبيت والاستخدام
- ✅ يعمل كـ PWA قابل للتثبيت على الهواتف
- ✅ يعمل بدون إنترنت بعد التحميل الأول (Service Worker)
- ✅ حفظ تلقائي للتقدم في المتصفح (localStorage)
- ✅ لا يحتاج تسجيل دخول أو حساب

## 🛠️ التقنيات المستخدمة

| التقنية | الإصدار | الاستخدام |
|---------|---------|-----------|
| Next.js | 16 | Framework رئيسي (App Router) |
| TypeScript | 5 | لغة البرمجة |
| Tailwind CSS | 4 | التنسيق |
| shadcn/ui | - | مكتبة المكونات |
| Framer Motion | - | الحركات والانتقالات |
| Lucide React | - | الأيقونات |
| Google Fonts | - | الخطوط العربية |

## 🚀 التشغيل المحلي

### المتطلبات
- Node.js 18+ أو Bun
- متصفح حديث

### التثبيت والتشغيل

```bash
# استنساخ المستودع
git clone https://github.com/divid6055-jpg/tajweed-learning-app.git
cd tajweed-learning-app

# تثبيت الاعتماديات
bun install
# أو: npm install

# تشغيل خادم التطوير
bun run dev
# أو: npm run dev

# فتح التطبيق في المتصفح
# http://localhost:3000
```

### فحص الكود
```bash
# فحص الأخطاء
bun run lint
```

## 📦 بناء APK (Android)

هذا التطبيق مبني كـ PWA ويمكن تحويله إلى APK بعدة طرق:

### الطريقة 1: PWABuilder (الأسهل)
1. ارفع التطبيق على أي استضافة (Vercel, Netlify, GitHub Pages)
2. اذهب إلى [PWABuilder](https://www.pwabuilder.com/)
3. أدخل رابط التطبيق
4. اضغط "Build My PWA" واختر Android
5. حمّل ملف APK

### الطريقة 2: Capacitor (للمطورين)
```bash
# تثبيت Capacitor
npm install @capacitor/core @capacitor/cli @capacitor/android

# تهيئة
npx cap init tajweed-app com.tajweed.app --web-dir=out

# بناء التطبيق
npm run build
npx cap add android
npx cap sync
npx cap open android

# في Android Studio: Build > Generate Signed APK
```

### الطريقة 3: TWA (Trusted Web Activity)
يمكن استخدام [Bubblewrap](https://github.com/GoogleChromeLabs/bubblewrap) لإنشاء TWA:
```bash
npm i -g @bubblewrap/cli
bubblewrap init --manifest=https://your-domain.com/manifest.json
bubblewrap build
```

## 📂 هيكل المشروع

```
tajweed-learning-app/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # التخطيط الرئيسي (RTL + خطوط)
│   │   ├── page.tsx            # الصفحة الرئيسية (SPA navigation)
│   │   ├── globals.css         # الأنماط العامة + الثيم
│   │   └── icon.svg            # Favicon
│   ├── components/
│   │   ├── ui/                 # مكونات shadcn/ui
│   │   └── tajweed/
│   │       ├── bottom-nav.tsx          # شريط التنقل السفلي
│   │       ├── install-prompt.tsx      # موجه تثبيت PWA
│   │       └── screens/
│   │           ├── home-screen.tsx     # الصفحة الرئيسية
│   │           ├── section-screen.tsx  # شاشة القسم
│   │           ├── lesson-screen.tsx   # شاشة الدرس
│   │           ├── quiz-screen.tsx     # شاشة الاختبارات
│   │           └── progress-screen.tsx # شاشة التقدم
│   └── lib/
│       └── tajweed/
│           ├── data.ts         # محتوى التجويد والأسئلة
│           └── use-progress.ts # Hook لتتبع التقدم
├── public/
│   ├── manifest.json           # PWA manifest
│   ├── sw.js                   # Service Worker
│   ├── icon-192.svg            # أيقونة 192px
│   └── icon-512.svg            # أيقونة 512px
└── package.json
```

## 📚 المراجع العلمية

المحتوى مبني على المراجع المعتمدة في علم التجويد:
- **تحفة الأطفال** للإمام سليمان الجمزوري
- **المقدمة الجزرية** للإمام ابن الجزري
- **متن الشاطبية** للإمام القاسم الشاطبي
- **التمهيد في علم التجويد** للإمام ابن الجزري

## 🤝 المساهمة

المساهمات مرحب بها! يرجى:
1. فتح issue لمناقشة التغييرات المقترحة
2. إنشاء fork للمستودع
3. إرسال pull request مع وصف واضح للتغييرات

## 📜 الترخيص

MIT License - حر للاستخدام والتعديل والنشر

## 📞 التواصل

- GitHub: [divid6055-jpg](https://github.com/divid6055-jpg)
- Repository: [tajweed-learning-app](https://github.com/divid6055-jpg/tajweed-learning-app)

---

<div dir="rtl" align="center">

**وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا** - سورة المزمل، آية 4

صُنع بحب لخدمة كتاب الله 🤲

</div>
