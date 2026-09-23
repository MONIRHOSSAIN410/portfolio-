# Monir Hossain — Portfolio

Next.js 16 + TypeScript + Tailwind CSS v4 + shadcn/ui দিয়ে তৈরি একটি dynamic, animated পোর্টফোলিও ওয়েবসাইট।

## চালানোর নিয়ম (How to run)

```bash
npm install        # নতুন কোনো প্যাকেজ যোগ হয়নি, তবু একবার চালিয়ে নিন
npm run dev        # http://localhost:3000
```

Production:

```bash
npm run build
npm run start
```

---

## Features

### Dynamic content (API-driven)

কনটেন্ট আর কম্পোনেন্টের ভেতরে hardcode করা নেই। পুরো ডেটা একটা layer-এর পেছনে:

```
src/lib/data.ts       ← সব লেখা/ডেটা এখানে (একমাত্র এডিট করার ফাইল)
src/lib/types.ts      ← সব টাইপ ডেফিনিশন
src/lib/content.ts    ← async data-access layer (getProfile, getProjects, …)
src/app/api/*         ← সেই ডেটার REST endpoint
```

চালু API routes:

| Endpoint | কী দেয় |
| --- | --- |
| `GET /api/profile` | প্রোফাইল, স্ট্যাটস, এডুকেশন |
| `GET /api/projects` | প্রজেক্ট + ফিল্টার তালিকা। `?filter=Platform&q=crm&featured=1&limit=4` সাপোর্ট করে |
| `GET /api/skills` | স্কিল গ্রুপ, সার্ভিস, marquee স্ট্যাক |
| `GET /api/experience` | এক্সপেরিয়েন্স + এডুকেশন |
| `GET /api/github` | GitHub থেকে লাইভ রিপো ও স্ট্যাট (১ ঘণ্টা ক্যাশ) |
| `POST /api/contact` | কন্টাক্ট ফর্ম — ভ্যালিডেশন, honeypot, rate limit |

**পরে database লাগাতে চাইলে** শুধু `src/lib/content.ts`-এর ফাংশনগুলোর ভেতরটা বদলান
(MongoDB / Supabase / Sanity — যেটা খুশি)। সব ফাংশন already `async`, তাই
কম্পোনেন্ট বা API route-এর একটা লাইনও বদলাতে হবে না।

### Working features

- **Product-style project cards** — প্রতিটা কার্ডের উপরে ১৬:১০ preview, হোভারে
  "Visit site" ওভারলে, Featured ব্যাজ, আর প্রথমে ৬টা দেখিয়ে "Show more"
- **Project filter + search** — ক্যাটাগরি/ট্যাগ চিপ আর সার্চ বক্স; সার্ভারেই ফিল্টার হয়
  (`/api/projects`), ২৫০ms debounce, খালি হলে "no results" স্টেট
- **Contact form** — ক্লায়েন্ট ও সার্ভারে একই ভ্যালিডেশন, ইনলাইন ফিল্ড এরর, toast,
  honeypot অ্যান্টি-স্প্যাম, IP-ভিত্তিক rate limit (১০ মিনিটে ৫টা)
- **Live GitHub section** — রিপো, স্টার, ফলোয়ার, ভাষা — সব GitHub API থেকে,
  ঘণ্টায় রিফ্রেশ। API আনরিচেবল হলে চুপচাপ প্রোফাইল-লিংকে নেমে আসে
- **Active section navbar** — IntersectionObserver দিয়ে কোন সেকশনে আছেন সেটা হাইলাইট হয়
- **SEO** — OpenGraph, Twitter card, JSON-LD (schema.org Person), `sitemap.xml`, `robots.txt`

### Animation & interaction

`src/components/motion/` ফোল্ডারে সব reusable মোশন কম্পোনেন্ট:

| Component | কাজ |
| --- | --- |
| `reveal.tsx` | স্ক্রল রিভিল (`Reveal`, `RevealGroup`, `RevealItem`) — up/left/right/scale/blur |
| `scroll-progress.tsx` | উপরে প্রগ্রেস বার |
| `cursor-glow.tsx` | মাউস-ফলো গ্লো (শুধু ডেস্কটপ) |
| `magnetic.tsx` | ম্যাগনেটিক বাটন |
| `tilt-card.tsx` | 3D টিল্ট + স্পটলাইট কার্ড |
| `counter.tsx` | ০ থেকে গুনে ওঠা নাম্বার |
| `typing.tsx` | Hero-র রোল টাইপরাইটার |
| `marquee.tsx` | থামে না এমন টেক-স্ট্যাক স্ট্রিপ |
| `aurora.tsx` | ভাসমান ব্যাকগ্রাউন্ড ব্লব |

সবগুলোই `prefers-reduced-motion` মানে — কেউ "reduce motion" অন রাখলে
অ্যানিমেশন বন্ধ হয়ে শুধু ফেড থাকে।

---

## কনটেন্ট এডিট করবেন কীভাবে

- সব লেখা/ডেটা: **`src/lib/data.ts`** — এখানেই সব পরিবর্তন করবেন
- **প্রজেক্টের preview ছবি:** নিচের "Project cover images" অংশ দেখুন
- প্রোফাইল ছবি: `public/monir-hossain.jpg`
- CV ফাইল: `public/Monir-Hossain-CV.pdf` (এই নামেই রাখলে ডাউনলোড বাটন কাজ করবে)
- Brand color: `src/app/globals.css` এর `--brand` ভ্যারিয়েবল
- Favicon: `src/app/icon.svg`

---

## Project cover images

কার্ডের উপরের preview ছবি তিন ধাপে খোঁজা হয় — যেটা আগে পাওয়া যায় সেটাই দেখায়:

| ধাপ | উৎস | কখন |
| --- | --- | --- |
| ১ | `public/projects/<slug>.png` | ফাইলটা থাকলে (সবচেয়ে দ্রুত) |
| ২ | লাইভ স্ক্রিনশট সার্ভিস | ফাইল না থাকলে — সাইটের এখনকার চেহারা |
| ৩ | ডিজাইন করা gradient preview | উপরের দুটোই না পেলে |

অর্থাৎ **কিছু না করলেও কার্ডে প্রজেক্টের লাইভ স্ক্রিনশট দেখাবে**, আর সার্ভিস
ডাউন থাকলেও কার্ড ভাঙবে না — gradient preview-টা নিচে বসেই থাকে, ছবি লোড
হলে তার উপরে fade-in করে।

### ছবিগুলো নিজের সার্ভারে নিয়ে নিন (recommended)

একবার এই কমান্ডটা চালালে সব স্ক্রিনশট ডাউনলোড হয়ে `public/projects/`-এ
চলে আসবে। এরপর সাইট আর কোনো থার্ড-পার্টি সার্ভিসে হিট করবে না — অনেক দ্রুত
লোড হবে এবং কখনো ফেল করবে না:

```bash
npm run covers               # যেগুলো নেই শুধু সেগুলো নামাবে
npm run covers -- --force    # সবগুলো আবার নামাবে (সাইট আপডেট করার পর)
```

একটা সার্ভিস কাজ না করলে অন্যটা দিয়ে দেখুন:

```bash
npm run covers -- --force --provider mshots
npm run covers -- --force --provider microlink
```

ডাউনলোড হওয়া ছবিগুলো git-এ commit করে দেবেন, তাহলে Vercel-এ deploy হলেও
থাকবে।

### নিজে স্ক্রিনশট দিতে চাইলে

`public/projects/<slug>.png` নামে ফাইল রেখে দিলেই সেটাই দেখাবে (ধাপ ১ সবার
আগে)। ফাইলের নামের পুরো তালিকা আর স্ক্রিনশট নেওয়ার নিয়ম আছে
`public/projects/README.md`-এ।

### লাইভ স্ক্রিনশট বন্ধ করতে চাইলে

`.env.local`-এ `PROJECT_SHOTS=off` দিন — তখন শুধু লোকাল ফাইল আর gradient
preview ব্যবহার হবে।

---

## Environment variables (সব optional)

`.env.local` ফাইল বানিয়ে যোগ করুন — কোনোটাই বাধ্যতামূলক নয়, সাইট এগুলো ছাড়াও চলে:

```bash
# কন্টাক্ট ফর্মের মেইল সত্যিই পাঠাতে (না দিলে মেসেজ শুধু সার্ভার লগে যায়)
RESEND_API_KEY=re_xxxxxxxx
CONTACT_FROM="Portfolio <onboarding@resend.dev>"
CONTACT_TO=mh0168916@gmail.com

# GitHub API-র rate limit বাড়াতে (না দিলে ঘণ্টায় ৬০ রিকোয়েস্ট)
GITHUB_TOKEN=ghp_xxxxxxxx

# প্রজেক্ট কার্ডের লাইভ স্ক্রিনশট: thumio (default) | mshots | microlink | off
PROJECT_SHOTS=thumio

# OpenGraph/sitemap-এর জন্য আসল ডোমেইন
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

> কন্টাক্ট ফর্ম এখন প্রোভাইডার ছাড়াই কাজ করে — মেসেজ সার্ভার লগে যায় আর
> ভিজিটরকে WhatsApp-এ যোগাযোগ করতে বলা হয়। `RESEND_API_KEY` বসালেই
> সরাসরি ইনবক্সে মেইল আসতে শুরু করবে। অন্য প্রোভাইডার চাইলে
> `src/app/api/contact/route.ts`-এর `deliver()` ফাংশনটাই শুধু বদলান।

---

## Deploy

```bash
npm i -g vercel
vercel
```

Vercel-এ deploy করার পর উপরের environment variable-গুলো project settings-এ যোগ করুন।

---

## নোট

- আপনার CV-তে থাকা ব্যক্তিগত তথ্য — NID নম্বর, বাবা-মায়ের নাম, ধর্ম, ব্লাড গ্রুপ,
  ম্যারিটাল স্ট্যাটাস, সম্পূর্ণ বাসার ঠিকানা — ইচ্ছাকৃতভাবে সাইটে রাখা হয়নি,
  কারণ পাবলিক ওয়েবসাইটে এগুলো দেখানো নিরাপদ নয়। IHCM ও Maslow প্রজেক্টের
  demo login email/password-ও রাখা হয়নি।
- `eslint.config.mjs` আপডেট করা হয়েছে — `eslint-config-next` v16 এখন সরাসরি
  flat config দেয়, তাই পুরোনো `FlatCompat` সেটআপে `npm run lint` চালালে যে
  "Converting circular structure to JSON" এরর আসত সেটা আর আসবে না।
