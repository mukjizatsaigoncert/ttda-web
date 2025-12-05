"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function CalendarSidebar() {
  const [mounted, setMounted] = useState(false);
  const [currentTime, setCurrentTime] = useState<Date | null>(null);

  useEffect(() => {
    setMounted(true);
    setCurrentTime(new Date());
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Hiển thị placeholder khi chưa mount (SSR)
  const time = currentTime
    ? {
        h: currentTime.getHours().toString().padStart(2, "0"),
        m: currentTime.getMinutes().toString().padStart(2, "0"),
        s: currentTime.getSeconds().toString().padStart(2, "0"),
      }
    : { h: "--", m: "--", s: "--" };

  const weekday = currentTime
    ? currentTime.toLocaleDateString("vi-VN", { weekday: "long" })
    : "---";
  const dateStr = currentTime
    ? currentTime.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : "--/--/----";

  // Không render gì khi chưa mount để tránh hydration mismatch
  if (!mounted) {
    return (
      <div className="container mx-auto px-4 mt-2 pb-4">
        <div className="bg-slate-800/95 backdrop-blur-md text-white rounded-full shadow-xl px-4 md:px-6 py-2.5 h-[52px]" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 mt-2 pb-4">
      <div className="bg-slate-800/95 backdrop-blur-md text-white rounded-full shadow-xl px-4 md:px-6 py-2.5">
        <div className="flex items-center justify-between gap-2 md:gap-4">
          {/* Left: Clock & Âm Dương (phụ) */}
          <div className="flex items-center gap-3 md:gap-4">
            {/* Clock */}
            <div className="flex items-center gap-2">
              <div className="font-mono font-bold">
                <span className="text-emerald-400 text-lg">{time.h}</span>
                <span className="text-emerald-400 text-lg animate-pulse">
                  :
                </span>
                <span className="text-emerald-400 text-lg">{time.m}</span>
                <span className="text-slate-500 text-sm">:{time.s}</span>
              </div>
              <div className="hidden md:block text-[10px] leading-tight text-slate-400">
                <div>{weekday}</div>
                <div className="text-white/70">{dateStr}</div>
              </div>
            </div>

            {/* Âm Dương - compact, phụ */}
            <div className="hidden lg:flex items-center gap-3 text-[10px] text-slate-400">
              <div className="flex items-center gap-1">
                <span>☀️</span>
                <span>04/12 T49</span>
              </div>
              <div className="flex items-center gap-1">
                <span>🌙</span>
                <span>04/11 Giáp Thìn</span>
              </div>
            </div>
          </div>

          {/* Center: Văn Lang & Con Nước (chính) */}
          <div className="flex items-center gap-3 md:gap-6">
            {/* Văn Lang - Thông tin chính */}
            <div className="flex items-center gap-2 md:gap-3 bg-emerald-500/10 border border-emerald-500/30 rounded-full px-3 md:px-4 py-1">
              <div className="text-center">
                <div className="text-[8px] md:text-[10px] text-emerald-400/80 uppercase font-semibold tracking-wide">
                  Văn Lang
                </div>
                <div className="text-xl md:text-2xl font-bold text-emerald-400 leading-none">
                  15
                </div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-emerald-500/30" />
              <div className="hidden sm:block text-xs leading-tight">
                <div className="text-emerald-300 font-bold">Tháng Tý (11)</div>
                <div className="text-slate-400 text-[10px]">Năm Ất Tỵ</div>
                <div className="text-emerald-400/70 text-[10px]">
                  Ngày 319 • Tuần 29
                </div>
              </div>
            </div>

            {/* Con Nước - Thông tin chính */}
            <div className="flex items-center gap-2 md:gap-3 bg-cyan-500/10 border border-cyan-500/30 rounded-full px-3 md:px-4 py-1">
              <div className="text-center">
                <div className="text-[8px] md:text-[10px] text-cyan-400/80 uppercase font-semibold tracking-wide">
                  Con Nước
                </div>
                <div className="text-xl md:text-2xl font-bold text-cyan-400 leading-none">
                  02
                </div>
              </div>
              <div className="hidden sm:block w-px h-8 bg-cyan-500/30" />
              <div className="hidden sm:block text-xs leading-tight">
                <div className="text-cyan-300 font-bold">con</div>
                <div className="text-slate-400 text-[10px]">Tuần 01/Th.11</div>
                <div className="text-cyan-400/70 text-[10px]">
                  Sinh Thìn • Hồi Tỵ
                </div>
              </div>
            </div>
          </div>

          {/* Right: Link */}
          <Link
            href="/lich-van-nien"
            className="bg-emerald-500 hover:bg-emerald-400 text-white px-3 md:px-4 py-1.5 rounded-full font-semibold text-xs transition-all whitespace-nowrap"
          >
            <span className="hidden md:inline">Xem chi tiết</span>
            <span className="md:hidden">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
