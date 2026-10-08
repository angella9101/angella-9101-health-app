import React from 'react';
import { useHealth } from '../context/HealthContext';
import { Activity, Bell, BatteryCharging, Wifi } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentScreen, navigateTo, userProfile, healthData } = useHealth();

  const handleProfileClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigateTo('profile', 'push');
  };

  const getScreenTitle = () => {
    switch (currentScreen) {
      case 'home':
        return { title: '바이오룸 헬스', subtitle: '오늘의 신체 바이오 리듬' };
      case 'activity':
        return { title: '활동 & 운동 분석', subtitle: '심폐 지구력 및 칼로리 연소' };
      case 'sleep':
        return { title: '수면 & 회복 분석', subtitle: '서카디안 리듬 및 HRV 아키텍처' };
      case 'profile':
        return { title: '프로필 및 설정', subtitle: '바이오 센서 동기화 & 목표 관리' };
    }
  };

  const info = getScreenTitle();

  return (
    <header className="sticky top-0 z-40 w-full px-4 pt-3 pb-3 backdrop-blur-xl bg-[#0c141f]/85 border-b border-white/[0.06] transition-all">
      {/* Top telemetry bar */}
      <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2 px-1">
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 text-[#00F59B]">
            <span className="inline-block w-2 h-2 rounded-full bg-[#00F59B] animate-pulse"></span>
            LIVE SYNC
          </span>
          <span className="text-slate-600">|</span>
          <span className="text-slate-300 flex items-center gap-1">
            <Wifi className="w-3 h-3 text-[#00F59B]" /> 99.8%
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-slate-300">
            <BatteryCharging className="w-3.5 h-3.5 text-[#00F59B]" /> 94%
          </span>
          <span className="text-slate-400">10월 8일 (수)</span>
        </div>
      </div>

      {/* Main Header Row */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#131A26] border border-[#00F59B]/30 flex items-center justify-center text-[#00F59B] shadow-[0_0_12px_rgba(0,245,155,0.2)]">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-white tracking-tight leading-tight">
              {info.title}
            </h1>
            <p className="text-xs text-slate-400 font-medium">{info.subtitle}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {healthData.isWorkoutActive && (
            <div className="px-2.5 py-1 rounded-full bg-[#FF7043]/15 border border-[#FF7043]/40 text-[#FF7043] text-xs font-semibold flex items-center gap-1.5 animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF7043]"></span>
              운동 기록중
            </div>
          )}

          <button
            type="button"
            className="w-8 h-8 rounded-full bg-[#131A26] border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-colors"
            title="알림"
          >
            <Bell className="w-4 h-4" />
          </button>

          {/* Profile Image with alt='Profile' required by Navigation Spec */}
          <button
            type="button"
            onClick={handleProfileClick}
            className="relative rounded-full p-0.5 focus:outline-none focus:ring-2 focus:ring-[#00F59B]/70 group transition-transform active:scale-95 cursor-pointer"
            title="프로필로 이동"
          >
            <div className="relative w-9 h-9 rounded-full overflow-hidden border-2 border-emerald-400/40 group-hover:border-[#00F59B] transition-colors shadow-[0_0_10px_rgba(0,245,155,0.25)]">
              <img
                src={userProfile.avatarUrl}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#00F59B] border-2 border-[#0c141f]"></span>
          </button>
        </div>
      </div>
    </header>
  );
};
