import { getUntilNow } from "@/lib/utils";

export const allowImageSize = 4_194_304;

export const successMessages = {
  login: "Tizimga muvaffaqiyatli kirdingiz",
  logout: "Tizimdan muvaffaqiyatli chiqdingiz",
  add: "Yangi ma'lumot qo'shildi",
  delete: "Ma'lumot o'chirildi",
  update: "Ma'lumot yangilandi",
};

export const errorMessages = {
  login: "Login yoki maxfiy so'zni noto'g'ri kiritdingiz",
  unknown: "Nimadur xato ketdi",
  403: "Tizimga qayta kiring",
};

export const warnMessages = {
  empty: {
    username: "Loginni kiriting",
    passsword: "Maxfiy so'zni kiriting",
    inputKeywords: "Kalit so'zni kiriting",
    inputAuthors: "Muallifni kiriting",
    title: "Sarlavhani kiriting",
    size: "Miqdorni kiriting",
    cover: "Rasm yuklanmagan",
    publishedAt: "Chop etilgan yilni tanlang",
    country: "Davlatni tanlang",
    language: "Tilni tanlang",
    resourceType: "Resurs turini tanlang",
    source: "Manbaa uchun havolani kiriting",
    summary: "Tavsif yozing",
    authors: "Mualliflarni kiririting",
    keywords: "Kalit so'zlarni kiriting!",
  },
  length: {
    inputKeywords: "Kalit so'z eng kamida 2 ta belgidan iborat bo'lishi kerak",
    inputAuthors: "Muallif eng kamida 6 belgidan iborat bo'lishi kerak",
    cover: "Hajmi 4 mbdan yuqori bo'lgan rasmlarni yuklay olmaysiz",
  },
  has: {
    inputKeywords: "Ushbu kalit so'z allaqachon qo'shilgan",
    inputAuthors: "Ushbu muallif allaqachon qo'shilgan",
  },
  less: {
    summary: "Tavsif eng kamida 30ta belgidan iborat bo'lishi kerak",
  },
};

export const form = {
  publishedAt: [...getUntilNow(1970)],
  countries: [
    "O'zbekiston",
    "Qoraqalpog'iston",
    "Turkmaniston",
    "Rossiya",
    "Amerika",
    "Angliya",
  ],
  languages: ["O'zbek", "Qoraqalpoq", "Turkman", "Rus", "Ingliz"],
  resourceTypes: [
    "O'quv qo'llanma",
    "Tezis",
    "Maqola",
    "Darslik",
    "Monografiya",
    "Taqdimot",
    "Video",
  ],
};
