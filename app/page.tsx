"use client";
import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/image";
import { products } from "../data/mockData";

import {
  Menu,
  X,
  Phone,
  MessageCircle,
  Package,
  Wrench,
  Shield,
  Target,
  Users,
  Lightbulb,
  Building2,
  CheckCircle2,
  Zap,
  ArrowRight,
  History,
  FileBadge,
  MapPin,
  Mail,
  Facebook,
  Activity,
  Cpu,
  Battery,
  HardHat,
  Settings,
  Bolt,
  Gauge,
  Cable,
  Newspaper,
  Calendar,
  ArrowUpRight,
  Sun,
  Monitor,
  Hammer,
} from "lucide-react";

import { FaLine } from "react-icons/fa";

/* ---------- STATIC DATA ---------- */

const ceo = {
  name: "นายอรรถสิทธิ์ สุตัญตั้งใจ",
  position: "ประธานเจ้าหน้าที่บริหาร",
  image: "/images/TJC3.jpg",
  quote: "คุณภาพและความปลอดภัย คือพันธะสัญญาที่เรามอบให้ลูกค้าทุกท่าน",
};

const services = [
  {
    icon: Zap,
    title: "จำหน่ายอุปกรณ์ไฟฟ้า",
    desc: "ตัวแทนจำหน่ายสายไฟ เบรกเกอร์ โคมไฟ และอุปกรณ์ไฟฟ้าโรงงานมาตรฐาน มอก. ครบวงจร",
    iconClass: "text-[#D4AF37] bg-[#D4AF37]/10 group-hover:bg-[#D4AF37]",
  },
  {
    icon: Wrench,
    title: "บริการติดตั้งระบบ",
    desc: "ทีมวิศวกรและช่างชำนาญการ รับเหมาเดินสายไฟ ติดตั้งตู้คอนโทรล MDB และระบบไฟฟ้าอาคาร",
    iconClass: "text-slate-600 bg-slate-100 group-hover:bg-[#0f172a]",
  },
  {
    icon: Shield,
    title: "ตรวจสอบและบำรุงรักษา",
    desc: "บริการ PM (Preventive Maintenance) ตรวจสอบระบบไฟฟ้าประจำปี เพื่อความปลอดภัยสูงสุด",
    iconClass: "text-emerald-600 bg-emerald-50 group-hover:bg-emerald-500",
  },
  {
    icon: Package,
    title: "จัดส่งรวดเร็ว",
    desc: "มีรถขนส่งพร้อมให้บริการจัดส่งอุปกรณ์ไฟฟ้ารวดเร็ว ทันต่อการใช้งานหน้างานทั่วประเทศ",
    iconClass: "text-sky-600 bg-sky-50 group-hover:bg-sky-500",
  },
];

const newsUpdates = [
  {
    id: 1,
    title: "ส่งมอบงานติดตั้งระบบไฟฟ้า โรงงานอุตสาหกรรมนวนคร",
    category: "Project Update",
    date: "15 Nov 2025",
    image:
      "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1000",
    excerpt:
      "ทีมวิศวกร A.R.T เข้าตรวจสอบและส่งมอบงานติดตั้งตู้ MDB ขนาด 3000A พร้อมระบบ Solar Rooftop",
  },
  {
    id: 2,
    title: "A.R.T EXPONENTIAL ได้รับรองมาตรฐาน ISO 9001:2015",
    category: "Company News",
    date: "01 Nov 2025",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=1000",
    excerpt:
      "ยกระดับมาตรฐานการบริการและการจัดการ สู่ความเป็นเลิศในระดับสากล เพื่อความมั่นใจสูงสุดของลูกค้า",
  },
  {
    id: 3,
    title: "จัดอบรมความปลอดภัยทางไฟฟ้า ประจำปี 2568",
    category: "Activity",
    date: "20 Oct 2025",
    image:
      "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=1000",
    excerpt:
      "เสริมสร้างความรู้และทักษะความปลอดภัยในการปฏิบัติงานให้กับพนักงานทุกคน",
  },
  {
    id: 4,
    title: "เปิดตัวสินค้าใหม่: Smart Meter IoT Ready",
    category: "Product Launch",
    date: "10 Oct 2025",
    image:
      "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=1000",
    excerpt:
      "นวัตกรรมมิเตอร์ไฟฟ้าอัจฉริยะ ที่ช่วยให้คุณตรวจสอบการใช้พลังงานได้ผ่านมือถือแบบ Real-time",
  },
];

const clients = [
  { name: "กระทรวง อว.", logo: "/images/dechudom.png" },
  { name: "กรมส่งเสริมฯ", logo: "/images/department.png" },
  { name: "สสว.", logo: "/images/ssw.jpg" },
  { name: "PSAU", logo: "/images/dechudom.png" },
  { name: "กรมควบคุมโรค", logo: "/images/diseasecontrol.jpg" },
  { name: "สพฐ.", logo: "/images/hightschoolbkk.jpg" },
  { name: "อบจ.", logo: "/images/busubon.jpg" },
  { name: "กรมสุขภาพจิต", logo: "/images/health.jpg" },
  { name: "เทศบาลอุบลฯ", logo: "/images/tessabanubon.png" },
  { name: "เทคนิคอุบลฯ", logo: "/images/technicalubon.jpg" },
];

/* ---------- 3D ANIMATION COMPONENT ---------- */
const ElectricalSystem3D = () => {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center perspective-[1200px] overflow-visible select-none pointer-events-none">
      {/* Container for the 3D Scene */}
      <div className="relative w-[300px] h-[300px] transform-style-3d rotate-x-[15deg] rotate-y-[-20deg] animate-scene-float">
        {/* --- 1. SOLAR PANEL (Background) --- */}
        <div className="absolute top-[-100px] left-[40px] w-[180px] h-[120px] transform-style-3d translate-z-[20px] rotate-x-[10deg] opacity-90">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900 to-slate-900 border border-slate-600 rounded-lg overflow-hidden shadow-lg">
            <div
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage:
                  "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                backgroundSize: "30px 30px",
              }}
            ></div>
          </div>
          {/* Stand */}
          <div className="absolute top-[50%] left-[50%] w-2 h-[80px] bg-slate-400 transform -translate-x-1/2 rotate-x-[-45deg] origin-top"></div>
        </div>

        {/* --- 2. CONTROL BOX / BREAKER (Right Side) --- */}
        <div className="absolute top-[20px] right-[-40px] w-[100px] h-[140px] transform-style-3d translate-z-[40px]">
          <div className="absolute inset-0 bg-slate-100 border-2 border-slate-300 rounded-lg shadow-xl flex flex-col p-2">
            <div className="flex justify-between items-center mb-2">
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
              <div className="text-[8px] font-bold text-slate-500">
                MDB PANEL
              </div>
            </div>
            {/* Breaker Switches */}
            <div className="flex-1 bg-slate-200 rounded border border-slate-300 p-1 grid grid-cols-3 gap-1 content-start">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-6 bg-slate-800 rounded-sm relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-black"></div>
                  <div className="absolute bottom-0 left-0 w-full h-1/2 bg-slate-600"></div>
                </div>
              ))}
            </div>
          </div>
          {/* Cable going out */}
          <div className="absolute bottom-[-20px] left-[50%] w-4 h-20 bg-slate-800 -translate-x-1/2 -z-10 rounded-full"></div>
        </div>

        {/* --- 3. WIRE SPOOLS (Foreground Left - HERO PRODUCT) --- */}
        <div className="absolute bottom-[20px] left-[-30px] transform-style-3d translate-z-[80px]">
          {/* Spool 1 (Copper) */}
          <div className="relative w-24 h-24 group">
            {/* The coil (Cylinder illusion) */}
            <div className="absolute inset-0 rounded-full border-[12px] border-[#b45309] bg-[#78350f] shadow-xl flex items-center justify-center transform rotate-y-[30deg]">
              <div className="w-12 h-12 rounded-full bg-black/50 border-4 border-slate-800"></div>
            </div>
            {/* Label */}
            <div className="absolute -top-4 left-0 bg-white px-2 py-0.5 rounded text-[10px] font-bold text-[#b45309] shadow border border-[#b45309]/20">
              THW Cable
            </div>
          </div>

          {/* Spool 2 (Black Wire - Stacked behind) */}
          <div className="absolute bottom-4 left-10 w-20 h-20 transform translate-z-[-20px]">
            <div className="absolute inset-0 rounded-full border-[10px] border-slate-800 bg-slate-900 shadow-lg flex items-center justify-center transform rotate-y-[30deg]">
              <div className="w-10 h-10 rounded-full bg-black border-2 border-slate-700"></div>
            </div>
          </div>
        </div>

        {/* --- 3b. TOOLBOX --- */}
        <div className="absolute bottom-[-120px] right-[-10px] transform-style-3d animate-toolbox-bob">
          <div className="absolute inset-x-4 -bottom-3 h-4 bg-black/40 blur-md rounded-full"></div>
          <div className="relative w-32 h-18">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-28 h-6 bg-red-700 rounded-t-xl border border-red-900 shadow-lg transform origin-bottom -rotate-x-[15deg]">
              <div className="absolute inset-x-8 top-1 h-3 rounded-full bg-red-500/60"></div>
            </div>
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-14 bg-red-600 border-2 border-red-900 rounded-xl shadow-2xl flex items-center justify-between px-3">
              <div className="absolute top-3 left-2 right-2 h-0.5 bg-red-900/50"></div>
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-6 h-4 bg-amber-200 rounded-sm border border-amber-500 shadow-sm"></div>
              <div className="flex flex-col gap-1 text-[7px] text-amber-100/80">
                <span className="px-1 py-0.5 rounded bg-red-800/70">TOOLS</span>
                <span className="px-1 py-0.5 rounded bg-red-800/40">
                  INSULATED
                </span>
              </div>
              <div className="flex flex-col gap-1 items-end text-[7px] text-amber-50/80">
                <span className="px-1 py-0.5 rounded bg-emerald-600/70">
                  IEC
                </span>
                <span className="px-1 py-0.5 rounded bg-slate-900/70">
                  1000V
                </span>
              </div>
            </div>
          </div>
          <div className="absolute -top-6 left-6 animate-tool-float-1 origin-bottom">
            <Wrench
              size={26}
              strokeWidth={1.5}
              className="text-slate-200 drop-shadow-lg -rotate-12"
            />
          </div>
          <div className="absolute -top-10 right-6 animate-tool-float-2 origin-bottom">
            <svg viewBox="0 0 24 24" className="w-6 h-6 drop-shadow-lg">
              <path
                d="M5 21l3-3 4-4-2-2-4 4-3 3 2 2zM14 4l3-3 4 4-3 3-2-2-3 3-2-2 3-3z"
                fill="currentColor"
                className="text-amber-200"
              />
            </svg>
          </div>
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 animate-tool-float-3 origin-bottom">
            <div className="w-7 h-7 rounded-full bg-slate-900 border border-slate-500 flex items-center justify-center">
              <span className="text-[8px] text-emerald-300 font-mono">
                500V
              </span>
            </div>
          </div>
        </div>

        {/* --- 4. FLOATING TOOLS --- */}
        <div className="absolute bottom-[40px] right-[20px] transform-style-3d translate-z-[100px] flex flex-col gap-4">
          <div className="w-16 h-24 bg-yellow-400 rounded-lg border-2 border-yellow-600 shadow-2xl p-2 relative animate-float delay-700">
            <div className="w-full h-8 bg-slate-200 border border-slate-400 mb-2 font-mono text-xs flex items-center justify-end px-1 text-slate-800">
              220 V
            </div>
            <div className="w-10 h-10 rounded-full border-4 border-slate-800 mx-auto relative">
              <div className="absolute top-1/2 left-1/2 w-1 h-4 bg-slate-800 -translate-x-1/2 -translate-y-full origin-bottom rotate-45"></div>
            </div>
          </div>

          <div className="absolute -right-10 top-0 text-slate-400 drop-shadow-xl animate-bounce-slow">
            <Wrench
              size={48}
              strokeWidth={1.5}
              className="transform rotate-45"
            />
          </div>
        </div>

        {/* --- 5. SAFETY GEAR --- */}
        <div className="absolute top-[100px] left-[50%] transform -translate-x-1/2 translate-z-[60px] animate-float delay-1000">
          <div className="relative">
            <HardHat
              size={50}
              className="text-yellow-500 fill-yellow-500/20 drop-shadow-lg"
            />
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
          </div>
        </div>

        {/* --- 6. CONNECTING CABLES (SVG) --- */}
        <svg
          className="absolute top-0 left-0 w-full h-full pointer-events-none transform-style-3d translate-z-[10px]"
          style={{ overflow: "visible" }}
        >
          <path
            d="M 60 250 C 100 250, 150 200, 260 100"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="4"
            strokeDasharray="8 8"
            className="animate-flow-line opacity-60"
          />
          <path
            d="M 120 0 C 120 50, 200 50, 260 80"
            fill="none"
            stroke="#334155"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M 100 230 C 160 250, 220 285, 275 360"
            fill="none"
            stroke="#D4AF37"
            strokeWidth="3"
            strokeDasharray="6 8"
            className="animate-flow-line opacity-70"
          />
        </svg>

        {/* --- 7. FLOATING BADGES --- */}
        <div className="absolute top-[20px] left-[-20px] bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg shadow-lg border-l-4 border-emerald-500 transform translate-z-[120px] animate-float">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={14} className="text-emerald-500" />
            <span className="text-xs font-bold text-slate-800">In Stock</span>
          </div>
        </div>
      </div>

      {/* Background Glow */}
      <div className="absolute z-[-1] w-[400px] h-[400px] bg-[#D4AF37]/15 rounded-full blur-[80px] animate-pulse-glow"></div>
    </div>
  );
};

/* ---------- MAIN COMPONENT ---------- */

export default function Home() {
  // 1. ประกาศ STATE ทั้งหมดที่นี่ (รวม isLoading ด้วย)
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // ✅ ย้ายมานี่แล้ว
  const [openImage, setOpenImage] = useState<any>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [activeAboutTab, setActiveAboutTab] = useState<
    "history" | "ceo" | "vision" | "standards"
  >("history");
  const [error, setError] = useState<string | null>(null);

  const electricalProducts = products
    ? products.filter(
        (p) => p.category === "ไฟฟ้า" || p.category === "ระบบไฟฟ้าและงานติดตั้ง"
      )
    : [];
  const featuredProducts = electricalProducts.slice(0, 6);

  // 2. ประกาศ useEffect ทั้งหมด
  useEffect(() => {
    setError("Something went wrong");
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Timer สำหรับ Loading Screen
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // 3. ส่วนแสดงผล Loading Screen (Function ภายใน Component)
  const LoadingScreen = () => (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0f172a] flex flex-col items-center justify-center transition-all duration-1000 ease-in-out ${
        isLoading
          ? "opacity-100 visible"
          : "opacity-0 invisible pointer-events-none"
      }`}
    >
      <div className="absolute inset-0 bg-[url('/images/circuit-pattern.png')] opacity-5 animate-pulse"></div>
      <div className="relative z-10 flex flex-col items-center">
        <div className="w-24 h-24 mb-8 relative">
          <div className="absolute inset-0 border-4 border-[#D4AF37]/30 rounded-full animate-[spin_3s_linear_infinite]"></div>
          <div className="absolute inset-0 border-t-4 border-[#D4AF37] rounded-full animate-[spin_1.5s_linear_infinite]"></div>
          <div className="absolute inset-4 bg-white rounded-full flex items-center justify-center animate-pulse">
            <img
              src="/images/logo.png"
              alt="Logo"
              className="w-20 h-20 object-contain"
            />
          </div>
        </div>
        <h1 className="text-3xl font-bold text-white tracking-widest mb-2">
          A.R.T <span className="text-[#D4AF37]">EXPONENTIAL</span>
        </h1>
        <div className="flex items-center gap-2 text-slate-400 text-sm font-mono">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-ping"></span>
          SYSTEM LOADING...
        </div>
        <div className="w-64 h-1 bg-slate-800 rounded-full mt-8 overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full bg-[#D4AF37] animate-[width_2s_ease-in-out_forwards] w-full origin-left"></div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* เรียกใช้ Loading Screen ที่นี่ */}
      <LoadingScreen />

      <Head>
        <title>A.R.T EXPONENTIAL | ผู้นำด้านระบบไฟฟ้าครบวงจร</title>
        <meta
          name="description"
          content="จำหน่ายและติดตั้งอุปกรณ์ไฟฟ้ามาตรฐานสากล โดยทีมงานมืออาชีพ"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Prompt:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx global>{`
        /* กำหนดตัวแปร (เผื่อใช้) */
        :root {
          --font-prompt: "Prompt", sans-serif;
        }

        /* บังคับใช้ Font Prompt กับทุกสิ่งอย่างในหน้านี้ */
        * {
          font-family: "Prompt", sans-serif !important;
        }

        /* กำหนดพื้นหลังและ Scrollbar (ของเดิม) */
        body {
          background-color: #fdfbf7;
          font-family: "Prompt", sans-serif !important;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 3px;
        }

        .news-scrollbar::-webkit-scrollbar {
          height: 6px;
        }
        .news-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .news-scrollbar::-webkit-scrollbar-thumb {
          background: #d4af37;
          border-radius: 10px;
        }
        .news-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #b59024;
        }

        /* Animation ต่างๆ (ของเดิม) */
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateZ(50px);
          }
          50% {
            transform: translateY(-10px) translateZ(50px);
          }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        @keyframes scene-float {
          0%,
          100% {
            transform: rotateX(20deg) rotateY(-15deg) translateY(0px);
          }
          50% {
            transform: rotateX(20deg) rotateY(-15deg) translateY(-15px);
          }
        }
        .animate-scene-float {
          animation: scene-float 8s ease-in-out infinite;
        }

        @keyframes bounce-slow {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        .animate-bounce-slow {
          animation: bounce-slow 3s infinite ease-in-out;
        }

        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.1);
          }
        }
        .animate-pulse-glow {
          animation: pulse-glow 4s infinite ease-in-out;
        }

        @keyframes flow-line {
          from {
            stroke-dashoffset: 20;
          }
          to {
            stroke-dashoffset: 0;
          }
        }
        .animate-flow-line {
          animation: flow-line 1s linear infinite;
        }

        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll-left {
          animation: scroll-left 80s linear infinite;
        }

        /* 3D Utility Classes */
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .translate-z-10 {
          transform: translateZ(10px);
        }

        .bg-grid-tech {
          background-image: linear-gradient(
              to right,
              rgba(15, 23, 42, 0.03) 1px,
              transparent 1px
            ),
            linear-gradient(
              to bottom,
              rgba(15, 23, 42, 0.03) 1px,
              transparent 1px
            );
          background-size: 40px 40px;
        }

        .text-gold {
          color: #d4af37;
        }
        .bg-gold {
          background-color: #d4af37;
        }
        .border-gold {
          border-color: #d4af37;
        }

        .text-gold-gradient {
          background: linear-gradient(to right, #d4af37, #f2d06b, #d4af37);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        @keyframes toolbox-bob {
          0% {
            transform: translate3d(0, 0, 95px) rotateX(4deg) rotateY(-10deg);
          }
          50% {
            transform: translate3d(0, -6px, 105px) rotateX(8deg) rotateY(-18deg);
          }
          100% {
            transform: translate3d(0, 0, 95px) rotateX(4deg) rotateY(-10deg);
          }
        }

        .animate-toolbox-bob {
          transform-origin: center bottom;
          animation: toolbox-bob 6s ease-in-out infinite;
        }

        /* เครื่องมือเด้งจากกล่อง – ใช้ดีเลย์ต่างกันให้ภาพดูมีชีวิต */
        @keyframes tool-float-1 {
          0% {
            opacity: 0;
            transform: translate3d(0, 8px, 0) rotateZ(-20deg);
          }
          20% {
            opacity: 1;
          }
          50% {
            transform: translate3d(0, -8px, 10px) rotateZ(-10deg);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 6px, 0) rotateZ(-18deg);
          }
        }

        @keyframes tool-float-2 {
          0% {
            opacity: 0;
            transform: translate3d(0, 10px, 0) rotateZ(18deg);
          }
          25% {
            opacity: 1;
          }
          55% {
            transform: translate3d(0, -10px, 12px) rotateZ(8deg);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 4px, 0) rotateZ(15deg);
          }
        }

        @keyframes tool-float-3 {
          0% {
            opacity: 0;
            transform: translate3d(0, 4px, 0) scale(0.9);
          }
          30% {
            opacity: 1;
          }
          60% {
            transform: translate3d(0, -6px, 8px) scale(1.05);
          }
          100% {
            opacity: 1;
            transform: translate3d(0, 2px, 0) scale(1);
          }
        }

        .animate-tool-float-1 {
          animation: tool-float-1 4.5s ease-in-out infinite;
        }
        .animate-tool-float-2 {
          animation: tool-float-2 4.8s ease-in-out infinite;
        }
        .animate-tool-float-3 {
          animation: tool-float-3 5.2s ease-in-out infinite;
        }
      `}</style>

      <div className="min-h-screen overflow-x-hidden selection:bg-[#F2D06B] selection:text-slate-900">
        {/* Navbar */}
        <nav
          className={`fixed w-full z-50 transition-all duration-500 ${
            scrolled
              ? "bg-white/95 backdrop-blur-md shadow-lg py-3 border-b border-[#D4AF37]/20"
              : "bg-transparent py-6 lg:bg-transparent"
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-3 group cursor-pointer">
                <div className="w-14 h-14 relative">
                  <Image
                    src="/images/logo.png"
                    alt="Logo"
                    width={80}
                    height={80}
                    className="object-contain"
                  />
                </div>
                <div>
                  <div
                    className={`text-lg font-bold tracking-tight leading-none text-slate-900`}
                  >
                    A.R.T <span className="text-[#D4AF37]">EXPONENTIAL</span>
                  </div>
                  <div
                    className={`text-[10px] tracking-wider font-medium text-slate-500`}
                  >
                    ELECTRICAL SOLUTIONS
                  </div>
                </div>
              </div>

              <div className="hidden md:flex space-x-1">
                {[
                  "หน้าแรก",
                  "เกี่ยวกับเรา",
                  "บริการ",
                  "สินค้า",
                  "ข่าวสาร",
                  "ลูกค้า",
                  "ติดต่อเรา",
                ].map((item) => (
                  <a
                    key={item}
                    href={`#${item}`}
                    className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 text-slate-600 hover:text-slate-900 hover:bg-[#D4AF37]/10`}
                  >
                    {item}
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsContactOpen(true)}
                  className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] hover:bg-[#B59024] text-white rounded-full text-sm font-bold transition-all duration-300 shadow-lg shadow-[#D4AF37]/30 transform hover:-translate-y-0.5"
                >
                  <Phone size={16} /> ติดต่อสอบถาม
                </button>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 text-slate-700 hover:text-[#D4AF37] rounded-full transition-colors"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Dropdown (Updated) */}
          <div
            className={`md:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl transition-all duration-300 ${
              isMenuOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            {/* เพิ่ม overflow-y-auto เพื่อให้เลื่อนได้ */}
            <div className="px-4 py-6 space-y-2 overflow-y-auto max-h-[80vh]">
              {[
                "หน้าแรก",
                "เกี่ยวกับเรา",
                "บริการ",
                "สินค้า",
                "ข่าวสาร",
                "ลูกค้า",
                "ติดต่อเรา",
              ].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  onClick={() => setIsMenuOpen(false)}
                  className="block px-4 py-3 text-slate-600 hover:text-[#D4AF37] hover:bg-[#D4AF37]/5 rounded-xl font-medium transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </nav>

        {/* HERO SECTION */}
        <section
          id="หน้าแรก"
          className="relative min-h-[95vh] flex items-center pt-20 pb-25 overflow-hidden bg-gradient-to-br from-white via-[#D4AF37]/5 to-slate-200/50"
        >
          <div className="absolute inset-0 bg-grid-tech opacity-40"></div>
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#D4AF37]/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-300/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="text-center lg:text-left space-y-8 animate-in slide-in-from-left duration-700">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded text-slate-500 text-xs font-mono font-bold tracking-wider mb-2 shadow-sm">
                  <Activity
                    size={14}
                    className="animate-pulse text-green-500"
                  />{" "}
                  SYSTEM READY
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold leading-tight text-slate-900 tracking-tight">
                  <span className="text-gold-gradient">A.R.T</span> <br />
                  <span className="relative">
                    EXPONENTIAL
                    <svg
                      className="absolute w-full h-3 -bottom-1 left-0 text-[#D4AF37] opacity-50"
                      viewBox="0 0 100 10"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0 5 Q 50 10 100 5"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                      />
                    </svg>
                  </span>
                  <br />
                  <span className="text-3xl lg:text-5xl text-slate-400 font-light mt-2 block">
                    Solutions Provider
                  </span>
                </h1>

                <p className="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-light border-l-4 border-[#D4AF37] pl-6">
                  ผู้เชี่ยวชาญด้านงานระบบไฟฟ้าครบวงจร
                  ตั้งแต่การจำหน่ายอุปกรณ์ไฟฟ้า ไปจนถึงการติดตั้งและบำรุงรักษา
                  ด้วยมาตรฐานความปลอดภัยสูงสุด
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-6">
                  <a
                    href="#สินค้า"
                    className="px-8 py-4 bg-[#0f172a] hover:bg-slate-800 text-white rounded-xl font-bold transition-all shadow-lg shadow-slate-300 hover:shadow-slate-400 flex items-center justify-center gap-2"
                  >
                    <Package size={20} /> ดูสินค้า
                  </a>
                  <a
                    href="#บริการ"
                    className="px-8 py-4 bg-white hover:bg-[#D4AF37]/10 text-slate-900 border border-[#D4AF37]/50 rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Wrench size={20} className="text-[#D4AF37]" />{" "}
                    บริการติดตั้ง
                  </a>
                </div>

                <div className="pt-8 flex items-center justify-center lg:justify-start gap-8 text-sm text-slate-500 font-mono">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span>ISO 9001:2015</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span>Standard TIS</span>
                  </div>
                </div>
              </div>

              <div className="relative h-[500px] flex items-center justify-center animate-in zoom-in-95 duration-1000 delay-200">
                {/* เปลี่ยนมาใช้ 3D Animation ใหม่ */}
                <ElectricalSystem3D />
              </div>
            </div>
          </div>
        </section>

        {/* ... (เนื้อหาในส่วนอื่นๆ เกี่ยวกับเรา, บริการ, สินค้า ยังคงเหมือนเดิมตามโค้ดต้นฉบับที่คุณให้มา) ... */}
        {/* เพื่อความกระชับ ผมจะละไว้ในฐานที่เข้าใจว่าต้องนำโค้ดส่วนที่เหลือมาต่อท้ายตรงนี้ */}

        {/* ABOUT US */}
        <section
          id="เกี่ยวกับเรา"
          className="py-24 bg-white relative overflow-hidden"
        >
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <span className="text-[#B59024] font-bold tracking-wider text-sm uppercase bg-[#D4AF37]/10 px-3 py-1 rounded-full">
                About Our Company
              </span>
              <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 mt-4">
                เกี่ยวกับเรา
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
              {[
                { id: "history", label: "ประวัติความเป็นมา", icon: History },
                { id: "ceo", label: "ผู้บริหาร", icon: Users },
                { id: "vision", label: "วิสัยทัศน์", icon: Target },
                { id: "standards", label: "มาตรฐาน", icon: FileBadge },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveAboutTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 border ${
                    activeAboutTab === tab.id
                      ? "bg-[#0f172a] text-white border-[#0f172a] shadow-md transform -translate-y-1"
                      : "bg-slate-50 text-slate-500 border-slate-100 hover:border-[#D4AF37] hover:text-[#D4AF37]"
                  }`}
                >
                  <tab.icon size={18} /> {tab.label}
                </button>
              ))}
            </div>
            {/* ... (About Content Logic - เหมือนเดิม) ... */}
            <div className="bg-white border border-slate-100 shadow-xl shadow-slate-200/50 rounded-[2.5rem] p-8 lg:p-12 min-h-[450px] flex items-center justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
              {activeAboutTab === "history" && (
                <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 grid md:grid-cols-2 gap-12 items-center relative z-10">
                  <div>
                    <div className="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center text-[#D4AF37] mb-6">
                      <History size={32} />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-4">
                      จากจุดเริ่มต้น สู่ผู้นำด้านนวัตกรรม
                    </h3>
                    <div className="space-y-6">
                      <div className="flex gap-4 group">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-[#0f172a] ring-4 ring-slate-100"></div>
                          <div className="w-0.5 h-full bg-slate-100 mt-1 group-hover:bg-slate-300 transition-colors"></div>
                        </div>
                        <div className="pb-6">
                          <span className="text-slate-600 font-bold text-sm">
                            พ.ศ. 2562
                          </span>
                          <h4 className="font-bold text-[#0f172a]">
                            ก่อตั้งบริษัท
                          </h4>
                          <p className="text-slate-500 text-sm mt-1">
                            เริ่มต้นดำเนินธุรกิจรับเหมาและซ่อมบำรุงระบบไฟฟ้าในโรงงานอุตสาหกรรม
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-3 h-3 rounded-full bg-[#D4AF37] ring-4 ring-[#D4AF37]/30"></div>
                        </div>
                        <div>
                          <span className="text-[#B59024] font-bold text-sm">
                            พ.ศ. 2567 (ปัจจุบัน)
                          </span>
                          <h4 className="font-bold text-[#0f172a]">
                            A.R.T EXPONENTIAL
                          </h4>
                          <p className="text-slate-500 text-sm mt-1">
                            เปลี่ยนชื่อและยกระดับองค์กร
                            เพื่อรองรับการเติบโตแบบก้าวกระโดด
                            ขยายขอบเขตงานสู่ระดับสากล
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg group">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] to-slate-800 opacity-90 group-hover:opacity-95 transition-opacity flex items-center justify-center">
                      <Building2
                        size={120}
                        className="text-white/20 transform group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    <div className="absolute bottom-0 left-0 p-8 text-white">
                      <div className="text-5xl font-bold mb-1">10+</div>
                      <div className="text-sm opacity-80 uppercase tracking-widest">
                        Years of Experience
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {/* ... (CEO, Vision, Standards Tabs - Copy from original) ... */}
              {activeAboutTab === "ceo" && (
                <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 relative z-10">
                  <div className="flex flex-col md:flex-row items-center gap-10 justify-center">
                    <div className="relative group">
                      <div className="absolute inset-0 bg-[#D4AF37] rounded-[2rem] rotate-6 group-hover:rotate-3 transition-transform duration-500 opacity-20"></div>
                      <div className="relative w-64 h-80 rounded-[2rem] overflow-hidden shadow-xl bg-slate-50">
                        <img
                          src={ceo.image}
                          alt={ceo.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="max-w-lg text-center md:text-left">
                      <div className="inline-block px-3 py-1 bg-slate-50 rounded-lg text-xs font-bold text-slate-500 mb-4 border border-slate-100">
                        EXECUTIVE
                      </div>
                      <h3 className="text-3xl font-bold text-slate-900 mb-1">
                        {ceo.name}
                      </h3>
                      <p className="text-[#D4AF37] font-bold mb-6">
                        {ceo.position}
                      </p>
                      <div className="relative p-8 bg-slate-50/50 rounded-2xl border border-slate-100">
                        <span className="absolute top-4 left-4 text-4xl text-[#D4AF37]/30 font-serif leading-none">
                          “
                        </span>
                        <p className="text-slate-600 italic relative z-10 text-lg leading-relaxed">
                          {ceo.quote}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeAboutTab === "vision" && (
                <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 grid md:grid-cols-3 gap-8 relative z-10">
                  <div className="md:col-span-1 bg-gradient-to-br from-[#0f172a] to-slate-800 rounded-3xl p-8 text-white shadow-lg flex flex-col justify-between relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                    <Target
                      size={48}
                      className="opacity-80 mb-6 text-[#D4AF37]"
                    />
                    <div>
                      <h3 className="text-2xl font-bold mb-2">วิสัยทัศน์</h3>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        มุ่งเป็นผู้นำด้านระบบไฟฟ้าและเทคโนโลยีมาตรฐานสากล
                        สร้างความเชื่อมั่นด้วยนวัตกรรม เพื่อความยั่งยืน
                      </p>
                    </div>
                  </div>
                  <div className="md:col-span-2 grid sm:grid-cols-2 gap-4">
                    {[
                      {
                        t: "Innovation",
                        d: "คิดค้นและนำเทคโนโลยีใหม่มาใช้เสมอ",
                        i: Lightbulb,
                        c: "bg-[#D4AF37]/10 text-[#D4AF37]",
                      },
                      {
                        t: "Teamwork",
                        d: "ร่วมมือร่วมใจเพื่อผลลัพธ์ที่ดีที่สุด",
                        i: Users,
                        c: "bg-blue-50 text-blue-600",
                      },
                      {
                        t: "Quality",
                        d: "ใส่ใจคุณภาพในทุกขั้นตอนการทำงาน",
                        i: CheckCircle2,
                        c: "bg-emerald-50 text-emerald-600",
                      },
                      {
                        t: "Safety",
                        d: "ความปลอดภัยต้องมาก่อนเสมอ",
                        i: Shield,
                        c: "bg-slate-100 text-slate-600",
                      },
                    ].map((v, i) => (
                      <div
                        key={i}
                        className="p-6 bg-white border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow hover:border-[#D4AF37]/30"
                      >
                        <div
                          className={`w-10 h-10 ${v.c} rounded-xl flex items-center justify-center mb-3`}
                        >
                          <v.i size={20} />
                        </div>
                        <h4 className="font-bold text-slate-800">{v.t}</h4>
                        <p className="text-sm text-slate-500 mt-1">{v.d}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeAboutTab === "standards" && (
                <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500 text-center relative z-10">
                  <div className="mb-10">
                    <h3 className="text-2xl font-bold text-slate-900">
                      การรับรองมาตรฐานสากล
                    </h3>
                    <p className="text-slate-500">
                      เครื่องหมายยืนยันคุณภาพและความใส่ใจของเรา
                    </p>
                  </div>
                  <div className="flex flex-wrap justify-center gap-10">
                    {[
                      {
                        img: "/images/iso9001.jpg",
                        t: "ISO 9001:2015",
                        d: "ระบบบริหารคุณภาพ",
                      },
                      {
                        img: "/images/iso14001.jpg",
                        t: "ISO 14001:2015",
                        d: "ระบบบริหารสิ่งแวดล้อม",
                      },
                    ].map((iso, i) => (
                      <div
                        key={i}
                        className="group cursor-pointer"
                        onClick={() => setOpenImage(iso.img)}
                      >
                        <div className="w-56 h-64 bg-white rounded-3xl p-6 shadow-lg border border-slate-100 group-hover:border-[#D4AF37] group-hover:shadow-xl transition-all mb-4 mx-auto flex items-center justify-center relative overflow-hidden">
                          <div className="absolute inset-0 bg-[#D4AF37]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
                          <img
                            src={iso.img}
                            alt={iso.t}
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="font-bold text-slate-900 text-lg group-hover:text-[#D4AF37] transition-colors">
                          {iso.t}
                        </div>
                        <div className="text-sm text-slate-500">{iso.d}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="บริการ"
          className="py-24 bg-slate-50 text-slate-800 relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-full bg-grid-tech opacity-10"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div>
                <h2 className="text-4xl font-bold mb-4 text-slate-900">
                  บริการของเรา
                </h2>
                <div className="h-1 w-20 bg-[#D4AF37] rounded-full mb-4"></div>
                <p className="text-slate-500 max-w-lg">
                  ตอบโจทย์ทุกความต้องการด้านไฟฟ้า
                  ด้วยทีมงานมืออาชีพและเครื่องมือที่ทันสมัย
                </p>
              </div>
              <button
                onClick={() => setIsContactOpen(true)}
                className="px-6 py-3 border border-slate-300 hover:bg-[#0f172a] hover:text-white hover:border-[#0f172a] rounded-full transition-colors flex items-center gap-2 text-slate-700"
              >
                สอบถามบริการ <ArrowRight size={16} />
              </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, idx) => {
                const Icon = service.icon;

                return (
                  <div
                    key={idx}
                    className="group bg-white border border-slate-100 p-8 rounded-2xl hover:shadow-xl hover:shadow-slate-200 transition-all duration-300 hover:-translate-y-2"
                  >
                    {/* ดึง iconClass มาใส่ตรงนี้เลย */}
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-colors duration-300 group-hover:text-white ${service.iconClass}`}
                    >
                      <Icon size={28} />
                    </div>

                    <h3 className="text-xl font-bold mb-3 group-hover:text-slate-900 transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {service.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Products */}
        <section
          id="สินค้า"
          className="py-24 bg-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#D4AF37]/10 rounded-full blur-[100px] opacity-60 pointer-events-none translate-x-1/3 -translate-y-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-slate-200/50 rounded-full blur-[100px] opacity-60 pointer-events-none -translate-x-1/3 translate-y-1/3"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-slate-900">
                สินค้าและบริการ
              </h2>
              <div className="w-16 h-1.5 bg-[#D4AF37] rounded-full mx-auto mt-4"></div>
              <p className="text-slate-500 mt-4 max-w-2xl mx-auto">
                เลือกดูรายการสินค้าคุณภาพสูง หรือ
                ปรึกษางานติดตั้งระบบไฟฟ้าครบวงจร
                เราพร้อมให้บริการด้วยมาตรฐานระดับสากล
              </p>
            </div>

            {/* 1. Category Cards */}
<div className="grid md:grid-cols-2 gap-6 lg:gap-8 mb-20">
  {/* Card 1: อุปกรณ์ไฟฟ้า */}
  <div 
    className="relative group overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-slate-100 border border-slate-100 p-6 md:p-8 lg:p-12 flex flex-col justify-between cursor-pointer hover:shadow-[#D4AF37]/20 hover:border-[#D4AF37]/50 transition-all duration-500 min-h-[400px] lg:min-h-[600px]"
    onClick={() => setSelectedCategory({ title: "อุปกรณ์ไฟฟ้าและงานติดตั้ง", key: "ไฟฟ้า" })}
  >
    <div className="relative z-10">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="p-3 bg-slate-100 rounded-xl text-slate-600">
          <Package size={28} className="md:w-8 md:h-8" />
        </div>
        <span className="px-3 py-1 bg-slate-100 text-slate-700 text-[10px] md:text-xs font-bold rounded-full tracking-wider">
          PRODUCT CATALOG
        </span>
      </div>
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-4 group-hover:text-[#D4AF37] transition-colors">
        อุปกรณ์ไฟฟ้าโรงงาน
      </h3>
      <p className="text-slate-600 text-sm md:text-base lg:text-lg mb-6 max-w-md">
        ศูนย์รวมสายไฟ ท่อร้อยสาย ตู้คอนโทรล และอุปกรณ์ติดตั้งครบวงจร มาตรฐาน มอก.
      </p>
      <ul className="space-y-3 mb-8 hidden sm:block">
        {["สายไฟ THW / NYY / VCT", "ตู้ Consumer Unit / Breaker", "โคมไฟ LED Industrial Grade"].map((item, i) => (
          <li key={i} className="flex items-center gap-3 text-slate-600 font-medium text-sm md:text-base">
            <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600 flex-shrink-0">
              <CheckCircle2 size={14} />
            </div>
            {item}
          </li>
        ))}
      </ul>
    </div>
    
    <div className="relative z-10 flex items-center gap-2 md:gap-3 text-slate-600 font-bold text-sm md:text-base group-hover:translate-x-2 transition-transform mt-auto">
      ดูรายการสินค้าทั้งหมด <ArrowRight size={18} />
    </div>

    {/* Image Background */}
    <div className="absolute top-1/2 -translate-y-1/2 -right-16 md:-right-24 w-[60%] h-[80%] transition-transform duration-700 group-hover:scale-105 group-hover:-rotate-2 opacity-90">
      <img
        src="https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&q=80&w=1000"
        alt="Electrical Products"
        className="w-full h-full object-cover rounded-l-3xl shadow-2xl"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-transparent"></div>
    </div>
  </div>

  {/* Card 2: งานติดตั้ง */}
  <div 
    className="relative group overflow-hidden rounded-[2rem] bg-[#0f172a] shadow-xl shadow-slate-300/50 border border-slate-800 p-6 md:p-8 lg:p-12 flex flex-col justify-between cursor-pointer hover:shadow-slate-400/50 transition-all duration-500 min-h-[400px] lg:min-h-[600px]"
    onClick={() => setSelectedCategory({ title: "งานติดตั้งและซ่อมบำรุง", key: "ระบบไฟฟ้าและงานติดตั้ง" })}
  >
    <div className="absolute inset-0 bg-[url('/images/circuit-pattern.png')] opacity-[0.05]"></div>
    <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37] rounded-full blur-[100px] opacity-20 group-hover:opacity-30 transition-opacity"></div>
    
    <div className="relative z-10">
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="p-3 bg-[#D4AF37]/10 rounded-xl text-[#D4AF37]">
          <HardHat size={28} className="md:w-8 md:h-8" />
        </div>
        <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#D4AF37] text-[10px] md:text-xs font-bold rounded-full tracking-wider border border-[#D4AF37]/20">
          ENGINEERING SERVICE
        </span>
      </div>
      <h3 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4 group-hover:text-[#D4AF37] transition-colors">
        งานติดตั้งและเดินระบบ
      </h3>
      <p className="text-slate-400 text-sm md:text-base lg:text-lg mb-6 max-w-md">
        บริการรับเหมาติดตั้งไฟฟ้าโรงงาน อาคารสูง และตรวจสอบระบบประจำปี โดยทีมวิศวกร
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-8">
        <div className="bg-slate-800/50 border border-slate-700 p-3 md:p-4 rounded-xl">
          <Settings className="text-[#D4AF37] mb-2" size={20} />
          <div className="text-white font-bold text-sm">ติดตั้ง</div>
          <div className="text-slate-500 text-[10px] md:text-xs">Main Distribution Board</div>
        </div>
        <div className="bg-slate-800/50 border border-slate-700 p-3 md:p-4 rounded-xl">
          <Activity className="text-emerald-400 mb-2" size={20} />
          <div className="text-white font-bold text-sm">บำรุงรักษา</div>
          <div className="text-slate-500 text-[10px] md:text-xs">Preventive Maintenance</div>
        </div>
      </div>
    </div>

    <div className="relative z-10 flex items-center gap-2 md:gap-3 text-[#D4AF37] font-bold text-sm md:text-base group-hover:translate-x-2 transition-transform mt-auto">
      ปรึกษางานติดตั้ง <ArrowRight size={18} />
    </div>
    
    <div className="absolute bottom-0 right-0 opacity-5 group-hover:opacity-10 transition-opacity transform translate-x-10 translate-y-10 text-white pointer-events-none">
      <Wrench size={200} className="md:w-[240px] md:h-[240px]" />
    </div>
  </div>
</div>
           
          </div>
        </section>

        {/* News Section */}
        <section
          id="ข่าวสาร"
          className="py-24 bg-slate-50 relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-grid-tech opacity-20"></div>
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <span className="flex items-center gap-2 px-3 py-1 bg-[#0f172a] text-white text-xs font-bold rounded-full tracking-wider">
                    <Newspaper size={14} className="text-[#D4AF37]" /> NEWSROOM
                  </span>
                  <span className="text-[#D4AF37] text-sm font-medium animate-pulse">
                    ● Latest Updates
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                  ข่าวสารและกิจกรรม
                </h2>
              </div>
              <div className="hidden md:flex gap-2 text-sm text-slate-500">
                <span>ติดตามความเคลื่อนไหวของเรา</span>
                <ArrowRight size={18} className="text-[#D4AF37]" />
              </div>
            </div>
            <div className="relative group">
              <div className="flex overflow-x-auto gap-6 pb-8 news-scrollbar snap-x snap-mandatory px-2">
                {newsUpdates.map((item) => (
                  <div
                    key={item.id}
                    className="min-w-[85vw] md:min-w-[400px] snap-center group/card cursor-pointer"
                  >
                    <div className="relative h-[450px] rounded-[2rem] overflow-hidden shadow-lg transition-all duration-500 hover:shadow-2xl hover:-translate-y-2">
                      <div className="absolute inset-0">
                        <Image
                          src={item.image}
                          alt={item.title}
                          layout="fill"
                          objectFit="cover"
                          className="transition-transform duration-700 group-hover/card:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent opacity-90"></div>
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-6 rounded-3xl border border-white/20 shadow-xl transition-all duration-300 group-hover/card:bottom-6">
                        <div className="flex justify-between items-start mb-3">
                          <span className="px-3 py-1 bg-[#D4AF37]/10 text-[#B59024] text-xs font-bold rounded-full border border-[#D4AF37]/20">
                            {item.category}
                          </span>
                          <div className="flex items-center gap-1 text-slate-400 text-xs">
                            <Calendar size={12} />
                            <span>{item.date}</span>
                          </div>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 group-hover/card:text-[#B59024] transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-slate-500 text-sm line-clamp-2 mb-4 font-light">
                          {item.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-bold text-[#0f172a] group-hover/card:translate-x-2 transition-transform">
                          อ่านเพิ่มเติม{" "}
                          <ArrowUpRight size={16} className="text-[#D4AF37]" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Clients */}
        <section
          id="ลูกค้า"
          className="py-16 bg-slate-50 border-t border-slate-100"
        >
          <div className="max-w-7xl mx-auto px-4 mb-10 text-center">
            <span className="text-slate-400 text-sm font-bold tracking-widest uppercase">
              Trusted by Trusted Companies
            </span>
          </div>
          <div className="relative w-full overflow-hidden group">
            <div className="flex gap-20 w-max animate-scroll-left group-hover:[animation-play-state:paused]">
              {[...clients, ...clients, ...clients].map((client, idx) => (
                <div
                  key={idx}
                  className="w-48 h-24 flex items-center justify-center transition-all duration-300 hover:scale-110 cursor-pointer px-4"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-w-full max-h-full object-contain drop-shadow-sm hover:drop-shadow-md transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        {/* Footer */}
        <footer
          id="ติดต่อเรา"
          className="bg-[#0f172a] border-t-4 border-[#D4AF37] text-white py-20 px-4 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-[120px] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
              {/* Column 1: Logo & Description */}
              <div className="col-span-2">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="w-14 h-14 flex items-center justify-center bg-white rounded-xl p-2">
                    <Image
                      src="/images/logo.png"
                      alt="A.R.T EXPONENTIAL"
                      width={56}
                      height={56}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">A.R.T EXPONENTIAL</div>
                    <div className="text-sm text-[#D4AF37] font-medium">
                      Excellence in Innovation
                    </div>
                  </div>
                </div>
                <p className="text-slate-400 mb-6 leading-relaxed text-lg font-light max-w-md">
                  ผู้นำด้านนวัตกรรมและเทคโนโลยี
                  มุ่งมั่นสร้างสรรค์โซลูชันที่ทรงพลังเพื่ออนาคตที่ดีกว่า
                  ด้วยประสบการณ์มากกว่า 10 ปี
                </p>

                {/* Social Icons Row */}
                <div className="flex space-x-4">
                  {/* Facebook Icon */}
                  <a
                    href="https://www.facebook.com/profile.php?id=61573842487909"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/5 hover:bg-[#1877F2] rounded-xl flex items-center justify-center transition-all transform hover:scale-110 text-slate-400 hover:text-white"
                  >
                    <Facebook size={24} />
                  </a>
                  {/* Line Icon (ใช้ FaLine) */}
                  <a
                    href="https://line.me/R/ti/p/@024lfgkw"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-white/5 hover:bg-[#06C755] rounded-xl flex items-center justify-center transition-all transform hover:scale-110 text-slate-400 hover:text-white"
                  >
                    <FaLine size={24} />
                  </a>
                  <a
                    href="mailto:TJC.OFFICE21@gmail.com"
                    className="w-12 h-12 bg-white/5 hover:bg-rose-500 rounded-xl flex items-center justify-center transition-all transform hover:scale-110 text-slate-400 hover:text-white"
                  >
                    <Mail size={24} />
                  </a>
                  <a
                    href="tel:0804746169"
                    className="w-12 h-12 bg-white/5 hover:bg-[#D4AF37] rounded-xl flex items-center justify-center transition-all transform hover:scale-110 text-slate-400 hover:text-white"
                  >
                    <Phone size={24} />
                  </a>
                </div>
              </div>

              {/* Column 2: Menu */}
              <div>
                <h4 className="text-xl font-bold mb-6 text-white border-b-2 border-[#D4AF37] inline-block pb-2">
                  เมนูหลัก
                </h4>
                <ul className="space-y-3">
                  {[
                    "หน้าแรก",
                    "เกี่ยวกับ",
                    "บริการ",
                    "สินค้า",
                    "ข่าวสาร",
                    "ลูกค้า",
                    "ติดต่อเรา",
                  ].map((item) => (
                    <li key={item}>
                      <a
                        href={`#${item
                          .replace("เกี่ยวกับ", "เกี่ยวกับเรา")
                          .replace("ลูกค้า", "ลูกค้า")
                          .replace("ติดต่อเรา", "ติดต่อเรา")
                          .replace("ข่าวสาร", "ข่าวสาร")}`}
                        className="text-slate-400 hover:text-[#D4AF37] transition-colors hover:translate-x-2 inline-block transform"
                      >
                        → {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Contact Details */}
              <div>
                <h4 className="text-xl font-bold mb-6 text-white border-b-2 border-blue-500 inline-block pb-2">
                  ติดต่อเรา
                </h4>
                <ul className="space-y-4 text-slate-300">
                  {/* Phone */}
                  <li className="flex items-start space-x-3 group">
                    <Phone
                      size={20}
                      className="mt-1 flex-shrink-0 text-[#D4AF37] group-hover:text-white transition-colors"
                    />
                    <div>
                      <div className="font-semibold text-white">
                        โทรศัพท์สำนักงาน
                      </div>
                      <a
                        href="tel:0945438829"
                        className="text-slate-400 hover:text-[#D4AF37] transition-colors"
                      >
                        094-543-8829
                      </a>
                    </div>
                  </li>

                  {/* Line Official (เพิ่มใหม่) */}
                  <li className="flex items-start space-x-3 group">
                    <div className="mt-1 flex-shrink-0 text-[#06C755] group-hover:text-white transition-colors">
                      <FaLine size={20} />
                    </div>
                    <div>
                      <div className="font-semibold text-white">
                        Line Official
                      </div>
                      <a
                        href="https://line.me/R/ti/p/@024lfgkw"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-[#06C755] transition-colors"
                      >
                        @artexponential
                      </a>
                    </div>
                  </li>

                  {/* Facebook (เพิ่มใหม่) */}
                  <li className="flex items-start space-x-3 group">
                    <Facebook
                      size={20}
                      className="mt-1 flex-shrink-0 text-[#1877F2] group-hover:text-white transition-colors"
                    />
                    <div>
                      <div className="font-semibold text-white">Facebook</div>
                      <a
                        href="https://www.facebook.com/profile.php?id=61573842487909"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-400 hover:text-[#1877F2] transition-colors"
                      >
                        A.R.T Exponential
                      </a>
                    </div>
                  </li>

                  {/* Email */}
                  <li className="flex items-start space-x-3 group">
                    <Mail
                      size={20}
                      className="mt-1 flex-shrink-0 text-rose-400 group-hover:text-white transition-colors"
                    />
                    <div>
                      <div className="font-semibold text-white">อีเมล</div>
                      <a
                        href="mailto:a.r.t.exponential.office@gmail.com"
                        className="text-slate-400 hover:text-rose-400 transition-colors break-all text-sm"
                      >
                        a.r.t.exponential.office@gmail.com
                      </a>
                    </div>
                  </li>

                  {/* Address */}
                  <li className="flex items-start space-x-3 group">
                    <MapPin
                      size={20}
                      className="mt-1 flex-shrink-0 text-red-400 group-hover:text-white transition-colors"
                    />
                    <a
                         href="https://maps.app.goo.gl/X83bYMXu977YD82j6"
                        className="text-slate-400 hover:text-rose-400 transition-colors break-all text-sm"
                      >
                    <div>
                      <div className="font-semibold text-white">ที่อยู่</div>
                      <span className="text-slate-400 text-sm leading-relaxed block mt-1">
                        เลขที่ 311/1 ม.4 ตำบลคำน้ำเเซบ อำเภอวารินชำราบ
                        อุบลราชธานี 34190
                        <br />
                        <span className="text-[#D4AF37]/80 mt-2 block">
                          ทำการ : จันทร์-ศุกร์ | 08:00 - 17:00 น.
                        </span>
                      </span>
                    </div>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
              © 2025 A.R.T EXPONENTIAL. All rights reserved.
            </div>
          </div>
        </footer>

        {/* Floating Contact Button */}
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setIsContactOpen(!isContactOpen)}
            className="w-14 h-14 bg-[#D4AF37] hover:bg-[#B59024] text-white rounded-full shadow-xl shadow-[#D4AF37]/50 flex items-center justify-center transition-transform hover:scale-110 animate-bounce"
          >
            {isContactOpen ? <X /> : <Phone />}
          </button>
        </div>

        {/* MODALS */}
        {/* MODALS */}
        {/* MODALS - CONTACT US (Full Screen Overlay) */}
        {isContactOpen && (
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[90] flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setIsContactOpen(false)}
          >
            <div
              className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300 border border-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h3 className="font-bold text-2xl text-slate-900">
                    ติดต่อเรา
                  </h3>
                  <p className="text-slate-500 text-sm">
                    เลือกช่องทางที่สะดวกที่สุดสำหรับคุณ
                  </p>
                </div>
                <button
                  onClick={() => setIsContactOpen(false)}
                  className="w-10 h-10 flex items-center justify-center bg-slate-200 hover:bg-slate-300 text-slate-600 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4 max-h-[70vh] overflow-y-auto custom-scrollbar bg-white">
                {/* 1. โทรศัพท์ */}
                <a
                  href="tel:0945438829"
                  className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:border-[#D4AF37] hover:shadow-lg hover:shadow-[#D4AF37]/10 hover:-translate-y-1 transition-all group"
                >
                  <div className="w-14 h-14 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] group-hover:bg-[#D4AF37] group-hover:text-white transition-colors">
                    <Phone size={28} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">
                      โทรศัพท์ด่วน
                    </div>
                    <div className="font-bold text-slate-900 text-xl">
                      094-543-8829
                    </div>
                  </div>
                </a>

                {/* 2. LINE */}
                <a
                  href="https://line.me/R/ti/p/@024lfgkw"
                  target="_blank"
                  className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:border-[#06C755] hover:shadow-lg hover:shadow-[#06C755]/10 hover:-translate-y-1 transition-all group"
                >
                  <div className="w-14 h-14 bg-[#06C755]/10 rounded-full flex items-center justify-center text-[#06C755] group-hover:bg-[#06C755] group-hover:text-white transition-colors">
                    <FaLine size={28} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">
                      แชทผ่าน LINE Official
                    </div>
                    <div className="font-bold text-slate-900 text-lg">
                      @artexponential
                    </div>
                  </div>
                </a>

                {/* 3. Facebook */}
                <a
                  href="https://www.facebook.com/profile.php?id=61573842487909"
                  target="_blank"
                  className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:border-[#1877F2] hover:shadow-lg hover:shadow-[#1877F2]/10 hover:-translate-y-1 transition-all group"
                >
                  <div className="w-14 h-14 bg-[#1877F2]/10 rounded-full flex items-center justify-center text-[#1877F2] group-hover:bg-[#1877F2] group-hover:text-white transition-colors">
                    <Facebook size={28} />
                  </div>
                  <div>
                    <div className="text-sm text-slate-500 font-medium">
                      ติดตามข่าวสารทาง Facebook
                    </div>
                    <div className="font-bold text-slate-900 text-lg">
                      A.R.T Exponential
                    </div>
                  </div>
                </a>

                {/* 4. Email */}
                <a
                  href="mailto:TJC.OFFICE21@gmail.com"
                  className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl hover:border-[#EA4335] hover:shadow-lg hover:shadow-[#EA4335]/10 hover:-translate-y-1 transition-all group"
                >
                  <div className="w-14 h-14 bg-[#EA4335]/10 rounded-full flex items-center justify-center text-[#EA4335] group-hover:bg-[#EA4335] group-hover:text-white transition-colors">
                    <Mail size={28} />
                  </div>
                  <div className="overflow-hidden">
                    <div className="text-sm text-slate-500 font-medium">
                      ส่งอีเมลสอบถาม
                    </div>
                    <div className="font-bold text-slate-900 text-sm md:text-lg truncate">
                      TJC.OFFICE21@gmail.com
                    </div>
                  </div>
                </a>

                <div className="border-t border-slate-100 my-4"></div>

                {/* 5. Map */}
                <a
                  href="https://maps.app.goo.gl/X83bYMXu977YD82j6"
                  target="_blank"
                  className="block p-1 rounded-2xl group overflow-hidden relative"
                >
                  <div className="absolute inset-0 bg-slate-900/5 group-hover:bg-slate-900/0 transition-colors pointer-events-none z-10"></div>
                  <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 group-hover:border-[#D4AF37] transition-colors text-center">
                    <div className="flex items-center justify-center gap-2 mb-2 text-slate-900 font-bold">
                      <MapPin className="text-red-500" /> แผนที่บริษัท
                    </div>
                    <p className="text-xs text-slate-500">
                      311/1 ม.4 ต.คำน้ำเเซบ อ.วารินชำราบ จ.อุบลราชธานี
                    </p>
                    <div className="mt-3 inline-block px-4 py-1.5 bg-[#D4AF37] text-white text-xs font-bold rounded-full group-hover:scale-105 transition-transform">
                      นำทาง Google Maps
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        )}
        {/* Product Modal Components */}
        {selectedCategory && (
          <div
            className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-[60] flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={() => setSelectedCategory(null)}
          >
            <div
              className="bg-white rounded-[2rem] w-full max-w-5xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800">
                    {selectedCategory.title}
                  </h3>
                  <p className="text-slate-500 text-sm">
                    รายการสินค้าคุณภาพที่เราคัดสรร
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="w-10 h-10 flex items-center justify-center bg-white/80 hover:bg-white text-slate-500 hover:text-red-500 rounded-full shadow-lg backdrop-blur-md transition-all duration-200 transform hover:scale-110 border border-slate-100"

                >
                  <X size={20} />
                </button>
              </div>
              <div className="p-8 overflow-y-auto custom-scrollbar flex-1 bg-slate-50/30">
                {electricalProducts.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {electricalProducts.map((p, i) => (
                      <div
                        key={i}
                        className="bg-white border border-slate-100 rounded-2xl p-4 hover:border-[#D4AF37] hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
                        onClick={() => setSelectedProduct(p)}
                      >
                        <div className="aspect-square bg-slate-50 rounded-xl mb-4 overflow-hidden relative">
                          <Image
                            width={300}
                            height={300}
                            src={p.image}
                            alt={p.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="font-bold text-slate-800 line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                          {p.name}
                        </div>
                        <div className="text-xs text-slate-400 mt-2">
                          ดูรายละเอียด →
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 text-slate-400">
                    <Package size={64} className="mx-auto mb-4 opacity-20" />
                    <p>กำลังปรับปรุงข้อมูลสินค้า</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* MODAL - PRODUCT DETAIL (Updated: Responsive & Close Button) */}
        {selectedProduct && (
          <div
            className="fixed inset-0 z-[70] overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
              onClick={() => setSelectedProduct(null)}
            ></div>

            {/* Container for scrolling */}
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
              <div
                className="relative transform overflow-hidden rounded-[2rem] bg-white text-left shadow-2xl transition-all sm:my-8 w-full max-w-4xl flex flex-col md:grid md:grid-cols-2 animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
              >
                {/* --- ปุ่มปิด (Close Button) ที่เพิ่มใหม่ --- */}
                <button
                  onClick={() => setSelectedProduct(null)}
                  className="absolute top-4 right-4 z-50 p-2 bg-white/80 hover:bg-white text-slate-500 hover:text-red-500 rounded-full shadow-lg backdrop-blur-md transition-all duration-200 transform hover:scale-110 border border-slate-100"
                >
                  <X size={24} strokeWidth={2.5} />
                </button>

                {/* Image Section */}
                <div className="bg-slate-100 relative h-64 md:h-auto md:min-h-[500px]">
                  <Image
                    fill
                    src={selectedProduct.image}
                    className="object-cover"
                    alt={selectedProduct.name}
                  />
                  {/* Gradient Overlay for text readability on mobile if needed */}
                  <div className="md:hidden absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div>
                </div>

                {/* Content Section */}
                <div className="p-6 md:p-10 lg:p-12 flex flex-col justify-center bg-white">
                  <div className="flex-1">
                    <span className="inline-block px-3 py-1 bg-[#D4AF37]/10 text-[#B59024] rounded-lg text-xs font-bold mb-4 uppercase tracking-wider">
                      Product Detail
                    </span>
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 leading-tight pr-8">
                      {selectedProduct.name}
                    </h3>
                    <div className="w-12 h-1 bg-[#D4AF37] rounded-full mb-6"></div>
                    
                    {/* Scrollable text area if content is too long */}
                    <div className="prose prose-slate max-h-[30vh] md:max-h-none overflow-y-auto custom-scrollbar pr-2">
                      <p className="text-slate-600 leading-relaxed text-base md:text-lg">
                        {selectedProduct.detail || "รายละเอียดสินค้า..."}
                      </p>
                      {selectedProduct.description && (
                        <p className="mt-4 text-slate-500 text-sm border-t border-slate-100 pt-4">
                          {selectedProduct.description}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedProduct(null);
                      setIsContactOpen(true);
                    }}
                    className="mt-8 w-full py-3 md:py-4 bg-[#0f172a] hover:bg-[#D4AF37] text-white rounded-xl font-bold transition-colors shadow-lg text-base md:text-lg flex items-center justify-center gap-2 group"
                  >
                    <MessageCircle size={20} className="group-hover:animate-bounce" /> ติดต่อสอบถาม
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* --- ส่วนแสดงผลรูปภาพขยายใหญ่ (Image Modal) --- */}
        {openImage && (
          <div
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setOpenImage(null)}
          >
            {/* ปุ่มปิด (X) */}
            <button
              onClick={() => setOpenImage(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[1000]"
            >
              <X size={40} />
            </button>

            {/* รูปภาพ */}
            <div 
              className="relative max-w-5xl max-h-[90vh] w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()} // กดที่รูปแล้วไม่ปิด
            >
              <img
                src={openImage}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                alt="Full view"
              />
            </div>
          </div>
        )}
      </div>
    </>
  );
}
