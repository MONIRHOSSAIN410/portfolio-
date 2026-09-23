# Project preview images

এই ফোল্ডারে প্রজেক্টের স্ক্রিনশট থাকে। ফাইলের নাম হতে হবে প্রজেক্টের
`slug` + `.png` — `src/lib/data.ts`-এ প্রতিটা প্রজেক্টের `slug` লেখা আছে।

## সবচেয়ে সহজ উপায়

প্রজেক্টের রুট থেকে একবার চালান — সব স্ক্রিনশট নিজে থেকেই নেমে আসবে:

```bash
npm run covers               # যেগুলো নেই শুধু সেগুলো
npm run covers -- --force    # সবগুলো আবার
```

ফাইল না থাকলেও কার্ড খালি থাকে না — তখন লাইভ স্ক্রিনশট সার্ভিস থেকে ছবি
আসে, আর সেটাও না পেলে একটা ডিজাইন করা gradient preview দেখায়। তবে
লোকাল ফাইল থাকলে সেটাই আগে ব্যবহার হয় এবং সবচেয়ে দ্রুত লোড হয়, তাই
`npm run covers` একবার চালিয়ে ছবিগুলো git-এ commit করে রাখাই ভালো।

## ফাইলের নামগুলো

```
public/projects/mobile-com-bd.png
public/projects/zenji.png
public/projects/preclinic.png
public/projects/business-panel.png
public/projects/crm-application.png
public/projects/ihcm.png
public/projects/maslow-bangladesh.png
public/projects/cookme.png
public/projects/nextjs-web-app.png
public/projects/client-platform-i.png
public/projects/client-platform-ii.png
public/projects/mvc-frontend.png
```

## স্ক্রিনশট নেওয়ার নিয়ম

- **Aspect ratio:** 16:10 (কার্ডের preview এরিয়াও 16:10)
- **সাইজ:** 1280×800 px হলে সবচেয়ে ভালো (Retina-তেও ঝকঝকে থাকবে)
- ছবিটা উপর থেকে crop হয় (`object-top`), তাই সাইটের **উপরের অংশটা**
  স্ক্রিনশটে রাখুন — hero বা dashboard-এর প্রথম স্ক্রিন
- ফাইল সাইজ ৩০০KB-এর নিচে রাখার চেষ্টা করুন (TinyPNG দিয়ে compress করতে পারেন)

### Chrome-এ সহজে নেওয়ার উপায়

1. সাইটটা খুলুন → `F12` (DevTools)
2. `Ctrl + Shift + M` দিয়ে device toolbar চালু করুন
3. উপরে dimension-এ `1280 × 800` লিখুন
4. `Ctrl + Shift + P` → `Capture screenshot` লিখে Enter

`.jpg` বা `.webp` ব্যবহার করতে চাইলে `src/lib/data.ts`-এ ওই প্রজেক্টের
`cover` ফিল্ডে পুরো পাথ লিখে দিন, যেমন:

```ts
cover: "/projects/zenji.webp",
```
