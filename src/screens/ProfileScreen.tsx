import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { 
  User, 
  Watch, 
  Target, 
  Bell, 
  Sparkles, 
  ShieldCheck, 
  LogOut, 
  ChevronRight, 
  Plus, 
  Minus,
  Check,
  Smartphone
} from 'lucide-react';

export const ProfileScreen: React.FC = () => {
  const { 
    userProfile, 
    healthData, 
    updateStepGoal, 
    updateCalorieGoal, 
    updateSleepGoal, 
    updateUserProfile,
    logout 
  } = useHealth();

  const [savedFeedback, setSavedFeedback] = useState<string | null>(null);

  const showFeedback = (text: string) => {
    setSavedFeedback(text);
    setTimeout(() => setSavedFeedback(null), 2000);
  };

  const handleStepGoalChange = (delta: number) => {
    const next = Math.max(3000, Math.min(30000, healthData.stepGoal + delta));
    updateStepGoal(next);
    showFeedback(`걸음 목표가 ${next.toLocaleString()}보로 변경되었습니다.`);
  };

  const handleCalorieGoalChange = (delta: number) => {
    const next = Math.max(200, Math.min(2000, healthData.calorieGoal + delta));
    updateCalorieGoal(next);
    showFeedback(`칼로리 목표가 ${next} kcal로 변경되었습니다.`);
  };

  const handleSleepGoalChange = (deltaMins: number) => {
    const next = Math.max(300, Math.min(600, healthData.sleepGoalMinutes + deltaMins));
    updateSleepGoal(next);
    const h = Math.floor(next / 60);
    const m = next % 60;
    showFeedback(`수면 목표가 ${h}시간 ${m > 0 ? `${m}분` : ''}으로 변경되었습니다.`);
  };

  // BMI calculate
  const heightM = userProfile.heightCm / 100;
  const bmi = (userProfile.weightKg / (heightM * heightM)).toFixed(1);

  return (
    <div className="flex flex-col gap-5 pb-28 pt-2 px-4 max-w-lg mx-auto w-full animate-fadeIn">
      {/* Toast Feedback */}
      {savedFeedback && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#131A26] border border-[#38BDF8] text-[#38BDF8] px-4 py-2 rounded-full text-xs font-semibold shadow-[0_0_20px_rgba(56,189,248,0.4)] flex items-center gap-2">
          <Check className="w-3.5 h-3.5" />
          {savedFeedback}
        </div>
      )}

      {/* Profile Header Card */}
      <div className="glass-panel rounded-2xl p-5 border border-white/10 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 rounded-full blur-2xl pointer-events-none"></div>

        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-sky-400/40 shadow-[0_0_15px_rgba(56,189,248,0.25)]">
              <img
                src={userProfile.avatarUrl}
                alt="Profile Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#00F59B] border-2 border-[#0c141f]"></span>
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-black text-white">{userProfile.name}</h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#00F59B]/15 text-[#00F59B] border border-[#00F59B]/30">
                PRO ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">{userProfile.email}</p>
            <p className="text-[11px] text-slate-500 mt-1">
              연동 기기: <span className="text-slate-300 font-medium">{userProfile.deviceSynced}</span>
            </p>
          </div>
        </div>

        {/* Biometric Body Metric Grid */}
        <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-white/5 font-mono text-center">
          <div className="bg-[#0c141f]/60 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block">나이</span>
            <span className="text-sm font-bold text-white">{userProfile.age}세</span>
          </div>
          <div className="bg-[#0c141f]/60 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block">신장</span>
            <span className="text-sm font-bold text-white">{userProfile.heightCm}cm</span>
          </div>
          <div className="bg-[#0c141f]/60 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block">체중</span>
            <span className="text-sm font-bold text-white">{userProfile.weightKg}kg</span>
          </div>
          <div className="bg-[#0c141f]/60 p-2 rounded-xl">
            <span className="text-[10px] text-slate-400 block">BMI</span>
            <span className="text-sm font-bold text-[#00F59B]">{bmi}</span>
          </div>
        </div>
      </div>

      {/* Health Goal Adjustments */}
      <div className="glass-panel rounded-2xl p-5 border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Target className="w-4 h-4 text-[#00F59B]" />
            일일 건강 목표 커스텀 설정
          </h3>
        </div>

        <div className="flex flex-col gap-3">
          {/* Step Goal */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#0c141f]/70 border border-white/5">
            <div>
              <span className="text-xs font-bold text-white block">목표 걸음수</span>
              <span className="text-[11px] text-slate-400 font-mono">
                현재 목표: <strong className="text-[#00F59B]">{healthData.stepGoal.toLocaleString()}</strong> 보
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleStepGoalChange(-1000)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="-1,000보"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleStepGoalChange(1000)}
                className="w-7 h-7 rounded-lg bg-[#00F59B]/20 hover:bg-[#00F59B]/30 text-[#00F59B] flex items-center justify-center transition-colors cursor-pointer"
                title="+1,000보"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Calorie Goal */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#0c141f]/70 border border-white/5">
            <div>
              <span className="text-xs font-bold text-white block">활동 소모 칼로리</span>
              <span className="text-[11px] text-slate-400 font-mono">
                현재 목표: <strong className="text-[#FF7043]">{healthData.calorieGoal}</strong> kcal
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleCalorieGoalChange(-50)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="-50 kcal"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleCalorieGoalChange(50)}
                className="w-7 h-7 rounded-lg bg-[#FF7043]/20 hover:bg-[#FF7043]/30 text-[#FF7043] flex items-center justify-center transition-colors cursor-pointer"
                title="+50 kcal"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Sleep Goal */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#0c141f]/70 border border-white/5">
            <div>
              <span className="text-xs font-bold text-white block">목표 수면 시간</span>
              <span className="text-[11px] text-slate-400 font-mono">
                현재 목표: <strong className="text-[#A78BFA]">{Math.floor(healthData.sleepGoalMinutes / 60)}시간 {healthData.sleepGoalMinutes % 60 > 0 ? `${healthData.sleepGoalMinutes % 60}분` : ''}</strong>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSleepGoalChange(-30)}
                className="w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 text-white flex items-center justify-center transition-colors cursor-pointer"
                title="-30분"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => handleSleepGoalChange(30)}
                className="w-7 h-7 rounded-lg bg-[#A78BFA]/20 hover:bg-[#A78BFA]/30 text-[#A78BFA] flex items-center justify-center transition-colors cursor-pointer"
                title="+30분"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Connected Devices & System Settings */}
      <div className="glass-panel rounded-2xl p-5 border border-white/10">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Watch className="w-4 h-4 text-sky-400" />
          스마트 센서 & 앱 환경 설정
        </h3>

        <div className="flex flex-col gap-2.5">
          {/* Bioluminescence glow toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#0c141f]/70 border border-white/5">
            <div className="flex items-center gap-3">
              <Sparkles className="w-4 h-4 text-[#00F59B]" />
              <div>
                <span className="text-xs font-bold text-white block">미드나잇 바이오 발광 테마</span>
                <span className="text-[10px] text-slate-400">생체 반응형 네온 글로우 활성화</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                updateUserProfile({ isBioLuminescenceEnhanced: !userProfile.isBioLuminescenceEnhanced })
              }
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                userProfile.isBioLuminescenceEnhanced ? 'bg-[#00F59B]' : 'bg-slate-700'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-[#0c141f] transition-transform ${
                  userProfile.isBioLuminescenceEnhanced ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Notifications toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#0c141f]/70 border border-white/5">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-amber-400" />
              <div>
                <span className="text-xs font-bold text-white block">스마트 건강 알림 수신</span>
                <span className="text-[10px] text-slate-400">수분 섭취, 정체 방지 기상 알림</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                updateUserProfile({ isNotificationsEnabled: !userProfile.isNotificationsEnabled })
              }
              className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                userProfile.isNotificationsEnabled ? 'bg-[#00F59B]' : 'bg-slate-700'
              }`}
            >
              <span
                className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-[#0c141f] transition-transform ${
                  userProfile.isNotificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Device sync status */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#0c141f]/70 border border-white/5">
            <div className="flex items-center gap-3">
              <Smartphone className="w-4 h-4 text-slate-400" />
              <div>
                <span className="text-xs font-bold text-white block">생체 데이터 클라우드 백업</span>
                <span className="text-[10px] text-emerald-400">오늘 18:42 백업 완료</span>
              </div>
            </div>
            <span className="text-xs text-slate-400 font-mono">자동 동기화</span>
          </div>
        </div>
      </div>

      {/* Required Logout Button: Element (xpath: `//button[contains(., '로그아웃')]`) */}
      <div className="pt-2">
        <button
          type="button"
          onClick={logout}
          className="w-full py-3.5 px-4 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 font-bold text-sm flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(244,63,94,0.1)] active:scale-[0.98] transition-all cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>계정 로그아웃</span>
        </button>
        <p className="text-[11px] text-slate-500 text-center mt-2 font-mono">
          BioLume Health OS v2.4.0 · 빌드 2026.10
        </p>
      </div>
    </div>
  );
};
