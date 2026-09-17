# Monir Hossain — Portfolio

Next.js 16 + TypeScript + Tailwind CSS v4 + shadcn/ui দিয়ে তৈরি একটি সম্পূর্ণ পোর্টফোলিও ওয়েবসাইট।

## Features

- Next.js 16 (App Router) + TypeScript
- Tailwind CSS v4 (fully responsive)
- shadcn/ui style components (Button, Card, Badge, Separator, Carousel)
- Framer Motion scroll animations + parallax hero
- Smooth scroll with Lenis
- Dark / Light mode (next-themes)
- Project carousel (Embla)
- CV download button
- WhatsApp contact button (wa.me/8801688518962)

## চালানোর নিয়ম (How to run)

এই প্রজেক্টটি সম্পূর্ণ সোর্স কোড হিসেবে দেওয়া হয়েছে। এই sandbox-এ npm রেজিস্ট্রিতে নেটওয়ার্ক অ্যাক্সেস ব্লক থাকায় `npm install` চালিয়ে সরাসরি বিল্ড/টেস্ট করা সম্ভব হয়নি — তাই দয়া করে নিজের কম্পিউটারে নিচের ধাপগুলো অনুসরণ করুন:

```bash
# 1. dependencies install করুন
npm install

# 2. development server চালু করুন
npm run dev

# 3. ব্রাউজারে http://localhost:3000 খুলুন
```

Production build:

```bash
npm run build
npm run start
```

## Deploy

সবচেয়ে সহজ উপায় — [Vercel](https://vercel.com) এ প্রজেক্ট ফোল্ডারটি push করে deploy করুন (Next.js official platform):

```bash
npm i -g vercel
vercel
```

## কনটেন্ট এডিট করবেন কীভাবে

- সব লেখা/ডেটা (নাম, স্কিলস, এক্সপেরিয়েন্স, প্রজেক্টস, কন্টাক্ট) আছে `src/lib/data.ts` ফাইলে — এখানেই সব পরিবর্তন করবেন।
- প্রোফাইল ছবি: `public/monir-hossain.jpg`
- CV ফাইল: `public/Monir-Hossain-CV.pdf` (এই নামেই রাখলে ডাউনলোড বাটন কাজ করবে)
- Theme color (brand color) পরিবর্তন করতে `src/app/globals.css` এর `--brand` ভ্যারিয়েবল বদলান।

## নোট

আপনার CV-তে থাকা ব্যক্তিগত তথ্য — NID নম্বর, বাবা-মায়ের নাম, ধর্ম, ব্লাড গ্রুপ, ম্যারিটাল স্ট্যাটাস, সম্পূর্ণ বাসার ঠিকানা — ইচ্ছাকৃতভাবে ওয়েবসাইটে রাখা হয়নি, কারণ এগুলো সবার জন্য পাবলিক ওয়েবসাইটে দেখানো নিরাপদ নয়। একইভাবে IHCM ও Maslow প্রজেক্টের demo login email/password-ও পাবলিক সাইটে রাখা হয়নি।
