import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { 
  Footprints, 
  Flame, 
  Moon, 
  Heart, 
  Droplets, 
  ChevronRight, 
  Play, 
  Plus, 
  Sparkles,
  TrendingUp,
  Zap
} from 'lucide-react';

export const HomeScreen: React.FC = () => {
  const { 
    navigateTo, 
    healthData, 
    addSteps, 
    addCalories, 
    addWater, 
    startWorkout 
  } = useHealth();

  const [stepToast, setStepToast] = useState<string | null>(null);

  const stepPercent = Math.min(100, Math.round((healthData.steps / healthData.stepGoal) * 100));
  const caloriePercent = Math.min(100, Math.round((healthData.activeCalories / healthData.calorieGoal) * 100));
  const sleepPercent = Math.min(100, Math.round((healthData.sleepMinutes / healthData.sleepGoalMinutes) * 100));

  const sleepHours = Math.floor(healthData.sleepMinutes / 60);
  const sleepRemainingMins = healthData.sleepMinutes % 60;

  const showToast = (msg: string) => {
    setStepToast(msg);
    setTimeout(() => setStepToast(null), 2500);
  };

  const handleQuickSteps = (amount: number) => {
    addSteps(amount);
    showToast(`+${amount.toLocaleString()} 걸음 추가되었습니다!`);
  };

  const handleStartRunning = () => {
    startWorkout('야외 러닝');
    navigateTo('activity', 'push');
  };

  const handleStartWorkout = () => {
    startWorkout('인터벌 트레이닝');
    navigateTo('activity', 'push');
  };

  // Concentric SVG Ring calculations
  // Outer (Steps): r = 70, circ = 2 * pi * 70 = 439.8
  // Middle (Calories): r = 52, circ = 2 * pi * 52 = 326.7
  // Inner (Sleep): r = 34, circ = 2 * pi * 34 = 213.6
  const circSteps = 2 * Math.PI * 70;
  const circCalories = 2 * Math.PI * 52;
  const circSleep = 2 * Math.PI * 34;

  const offsetSteps = circSteps - (circSteps * Math.min(100, stepPercent)) / 100;
  const offsetCalories = circCalories - (circCalories * Math.min(100, caloriePercent)) / 100;
  const offsetSleep = circSleep - (circSleep * Math.min(100, sleepPercent)) / 100;

  return (
    <div className="flex flex-col gap-5 pb-28 pt-2 px-4 max-w-lg mx-auto w-full animate-fadeIn">
      {/* Toast popup */}
      {stepToast && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#131A26] border border-[#00F59B] text-[#00F59B] px-4 py-2 rounded-full text-xs font-semibold shadow-[0_0_20px_rgba(0,245,155,0.4)] flex items-center gap-2">
          <Sparkles className="w-3.5 h-3.5" />
          {stepToast}
        </div>
      )}

      {/* Hero Overview: Concentric Biometric Rings */}
      <div className="glass-panel rounded-2xl p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#00F59B]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-36 h-36 bg-[#A78BFA]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400/90 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00F59B] shadow-[0_0_8px_#00F59B]"></span>
              오늘의 바이오 메트릭스
            </div>
            <h2 className="text-xl font-extrabold text-white tracking-tight mt-0.5">
              신체 회복 & 활동 지수 <span className="text-[#00F59B]">87%</span>
            </h2>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#00F59B]/15 text-[#00F59B] border border-[#00F59B]/30">
            컨디션 최상
          </span>
        </div>

        {/* Rings & Legend Layout */}
        <div className="flex flex-col sm:flex-row items-center justify-around gap-4 my-2">
          {/* Concentric Rings Visualizer */}
          <div className="relative w-44 h-44 flex items-center justify-center shrink-0">
            <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 160 160">
              {/* Outer Track (Steps) */}
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="rgba(255, 255, 255, 0.07)"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="#00F59B"
                strokeWidth="10"
                strokeDasharray={circSteps}
                strokeDashoffset={offsetSteps}
                strokeLinecap="round"
                fill="transparent"
                style={{
                  transition: 'stroke-dashoffset 0.8s ease-out',
                  filter: 'drop-shadow(0 0 6px rgba(0, 245, 155, 0.5))',
                }}
              />

              {/* Middle Track (Calories) */}
              <circle
                cx="80"
                cy="80"
                r="52"
                stroke="rgba(255, 255, 255, 0.07)"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="80"
                cy="80"
                r="52"
                stroke="#FF7043"
                strokeWidth="10"
                strokeDasharray={circCalories}
                strokeDashoffset={offsetCalories}
                strokeLinecap="round"
                fill="transparent"
                style={{
                  transition: 'stroke-dashoffset 0.8s ease-out',
                  filter: 'drop-shadow(0 0 6px rgba(255, 112, 67, 0.5))',
                }}
              />

              {/* Inner Track (Sleep) */}
              <circle
                cx="80"
                cy="80"
                r="34"
                stroke="rgba(255, 255, 255, 0.07)"
                strokeWidth="10"
                fill="transparent"
              />
              <circle
                cx="80"
                cy="80"
                r="34"
                stroke="#A78BFA"
                strokeWidth="10"
                strokeDasharray={circSleep}
                strokeDashoffset={offsetSleep}
                strokeLinecap="round"
                fill="transparent"
                style={{
                  transition: 'stroke-dashoffset 0.8s ease-out',
                  filter: 'drop-shadow(0 0 6px rgba(167, 139, 250, 0.5))',
                }}
              />
            </svg>

            {/* Inner Center Badge */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <Zap className="w-5 h-5 text-[#00F59B] animate-pulse" />
              <span className="text-[10px] uppercase font-mono text-slate-400 mt-0.5">ENERGY</span>
              <span className="text-base font-black text-white">87%</span>
            </div>
          </div>

          {/* Quick Ring Legend */}
          <div className="flex flex-col gap-2.5 w-full sm:w-auto">
            <div className="flex items-center justify-between sm:justify-start gap-3 bg-[#0c141f]/60 px-3 py-2 rounded-xl border border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#00F59B] shadow-[0_0_6px_#00F59B]"></span>
                <span className="text-xs text-slate-300 font-medium">걸음 달성</span>
              </div>
              <span className="text-xs font-mono font-bold text-[#00F59B]">{stepPercent}%</span>
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-3 bg-[#0c141f]/60 px-3 py-2 rounded-xl border border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#FF7043] shadow-[0_0_6px_#FF7043]"></span>
                <span className="text-xs text-slate-300 font-medium">활동 칼로리</span>
              </div>
              <span className="text-xs font-mono font-bold text-[#FF7043]">{caloriePercent}%</span>
            </div>

            <div className="flex items-center justify-between sm:justify-start gap-3 bg-[#0c141f]/60 px-3 py-2 rounded-xl border border-white/5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#A78BFA] shadow-[0_0_6px_#A78BFA]"></span>
                <span className="text-xs text-slate-300 font-medium">수면 회복</span>
              </div>
              <span className="text-xs font-mono font-bold text-[#A78BFA]">{sleepPercent}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Required Action Buttons: "러닝 시작" and "운동 시작" */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={handleStartRunning}
          className="group relative flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#00F59B] to-[#10B981] text-[#07130c] font-bold text-sm shadow-[0_0_20px_rgba(0,245,155,0.35)] hover:shadow-[0_0_30px_rgba(0,245,155,0.5)] active:scale-[0.98] transition-all cursor-pointer overflow-hidden"
        >
          <div className="w-7 h-7 rounded-full bg-black/15 flex items-center justify-center">
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
          <span className="tracking-tight text-[15px]">러닝 시작</span>
        </button>

        <button
          type="button"
          onClick={handleStartWorkout}
          className="group relative flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-[#1A2333] hover:bg-[#232f45] border border-white/10 hover:border-[#FF7043]/50 text-white font-bold text-sm shadow-[0_4px_16px_rgba(0,0,0,0.4)] active:scale-[0.98] transition-all cursor-pointer"
        >
          <div className="w-7 h-7 rounded-full bg-[#FF7043]/20 text-[#FF7043] flex items-center justify-center">
            <Flame className="w-4 h-4 fill-current" />
          </div>
          <span className="tracking-tight text-[15px]">운동 시작</span>
        </button>
      </div>

      {/* 3 Core Highlight Cards: 오늘 걸음수, 오늘 칼로리, 오늘 수면시간 */}
      <div className="flex flex-col gap-3.5">
        <div className="flex items-center justify-between px-1">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            핵심 건강 지표 모니터
          </h3>
          <span className="text-[11px] font-mono text-emerald-400">실시간 연동</span>
        </div>

        {/* 1. 오늘 걸음수 카드 */}
        <div className="glass-panel rounded-2xl p-4.5 border border-[#00F59B]/20 relative overflow-hidden group hover:border-[#00F59B]/40 transition-colors">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#00F59B]/15 border border-[#00F59B]/30 flex items-center justify-center text-[#00F59B] shadow-[0_0_12px_rgba(0,245,155,0.25)]">
                <Footprints className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                  오늘 걸음수
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black font-mono tracking-tight text-white">
                    {healthData.steps.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    / {healthData.stepGoal.toLocaleString()} 보
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigateTo('activity', 'none')}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="활동 분석 상세"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-3.5 mb-2.5">
            <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#00F59B] to-[#53ffab] shadow-[0_0_10px_#00F59B] transition-all duration-500"
                style={{ width: `${stepPercent}%` }}
              />
            </div>
          </div>

          {/* Submetrics & Quick Increment Buttons */}
          <div className="flex items-center justify-between pt-1 text-xs">
            <div className="flex items-center gap-4 text-slate-300">
              <span className="flex items-center gap-1 font-mono">
                <span className="text-slate-400">거리</span>
                <strong className="text-white">{healthData.distanceKm}</strong> km
              </span>
              <span className="text-slate-600">|</span>
              <span className="flex items-center gap-1 font-mono">
                <span className="text-slate-400">계단</span>
                <strong className="text-white">{healthData.floors}</strong> 층
              </span>
            </div>

            {/* Quick Step Buttons for testing/interaction */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => handleQuickSteps(500)}
                className="px-2 py-1 rounded-md bg-[#00F59B]/15 hover:bg-[#00F59B]/25 text-[#00F59B] text-[11px] font-bold border border-[#00F59B]/30 transition-colors cursor-pointer"
              >
                +500보
              </button>
              <button
                type="button"
                onClick={() => handleQuickSteps(1000)}
                className="px-2 py-1 rounded-md bg-[#00F59B]/15 hover:bg-[#00F59B]/25 text-[#00F59B] text-[11px] font-bold border border-[#00F59B]/30 transition-colors cursor-pointer"
              >
                +1,000보
              </button>
            </div>
          </div>
        </div>

        {/* 2. 오늘 칼로리 카드 */}
        <div className="glass-panel rounded-2xl p-4.5 border border-[#FF7043]/20 relative overflow-hidden group hover:border-[#FF7043]/40 transition-colors">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FF7043]/15 border border-[#FF7043]/30 flex items-center justify-center text-[#FF7043] shadow-[0_0_12px_rgba(255,112,67,0.25)]">
                <Flame className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                  오늘 소모 칼로리
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black font-mono tracking-tight text-white">
                    {healthData.activeCalories.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    / {healthData.calorieGoal} kcal
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigateTo('activity', 'none')}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="활동 분석 상세"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-3.5 mb-2.5">
            <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#FF7043] to-[#ffb59f] shadow-[0_0_10px_#FF7043] transition-all duration-500"
                style={{ width: `${caloriePercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-xs">
            <div className="text-slate-300 flex items-center gap-3 font-mono">
              <span>
                <span className="text-slate-400">기초 대사</span>{' '}
                <strong className="text-white">{healthData.restingCalories}</strong> kcal
              </span>
              <span className="text-slate-600">|</span>
              <span>
                <span className="text-slate-400">총</span>{' '}
                <strong className="text-[#FF7043]">
                  {(healthData.activeCalories + healthData.restingCalories).toLocaleString()}
                </strong>{' '}
                kcal
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                addCalories(100);
                showToast('+100 kcal 활동이 기록되었습니다!');
              }}
              className="px-2 py-1 rounded-md bg-[#FF7043]/15 hover:bg-[#FF7043]/25 text-[#FF7043] text-[11px] font-bold border border-[#FF7043]/30 transition-colors cursor-pointer"
            >
              +100 kcal
            </button>
          </div>
        </div>

        {/* 3. 오늘 수면시간 카드 */}
        <div className="glass-panel rounded-2xl p-4.5 border border-[#A78BFA]/20 relative overflow-hidden group hover:border-[#A78BFA]/40 transition-colors">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#A78BFA]/15 border border-[#A78BFA]/30 flex items-center justify-center text-[#A78BFA] shadow-[0_0_12px_rgba(167,139,250,0.25)]">
                <Moon className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400">
                  오늘 수면 시간
                </span>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-black font-mono tracking-tight text-white">
                    {sleepHours}시간 {sleepRemainingMins}분
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    (점수: <strong className="text-[#A78BFA]">{healthData.sleepScore}점</strong>)
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={() => navigateTo('sleep', 'none')}
              className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
              title="수면 분석 상세"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-3.5 mb-2.5">
            <div className="w-full h-2 rounded-full bg-slate-800/80 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] shadow-[0_0_10px_#A78BFA] transition-all duration-500"
                style={{ width: `${sleepPercent}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1 text-xs">
            <div className="flex items-center gap-3 text-slate-300 font-mono">
              <span>
                <span className="text-slate-400">취침</span>{' '}
                <strong className="text-white">{healthData.bedTime}</strong>
              </span>
              <span className="text-slate-600">~</span>
              <span>
                <span className="text-slate-400">기상</span>{' '}
                <strong className="text-white">{healthData.wakeTime}</strong>
              </span>
            </div>

            <span className="text-[11px] font-semibold text-[#A78BFA] bg-[#A78BFA]/15 px-2 py-0.5 rounded-md border border-[#A78BFA]/30">
              깊은 수면 {Math.floor(healthData.deepMinutes / 60)}h {healthData.deepMinutes % 60}m
            </span>
          </div>
        </div>
      </div>

      {/* Biometric Telemetry Grid: Heart Rate & Hydration */}
      <div className="grid grid-cols-2 gap-3.5">
        {/* Real-time Heart Rate Card */}
        <div className="glass-panel rounded-2xl p-4 flex flex-col justify-between border border-red-500/20">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-500/20 animate-pulse" />
                심박수
              </span>
              <span className="text-[10px] font-mono text-emerald-400">안정적</span>
            </div>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-3xl font-black font-mono text-white tracking-tight">
                {healthData.heartRate}
              </span>
              <span className="text-xs text-slate-400 font-medium">BPM</span>
            </div>
          </div>

          {/* Mini pulse wave SVG */}
          <div className="h-8 mt-2 flex items-center">
            <svg className="w-full h-full text-rose-500/80" viewBox="0 0 100 24" preserveAspectRatio="none">
              <path
                d="M0,12 L20,12 L28,4 L36,20 L44,8 L50,15 L56,12 L100,12"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="animate-pulse"
              />
            </svg>
          </div>
        </div>

        {/* Hydration Tracker Card */}
        <div className="glass-panel rounded-2xl p-4 flex flex-col justify-between border border-sky-500/20">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Droplets className="w-3.5 h-3.5 text-sky-400 fill-sky-400/20" />
                수분 섭취
              </span>
              <button
                type="button"
                onClick={() => {
                  addWater(250);
                  showToast('+250ml 수분을 섭취했습니다!');
                }}
                className="w-5 h-5 rounded-full bg-sky-400/20 hover:bg-sky-400/40 text-sky-400 flex items-center justify-center transition-colors cursor-pointer"
                title="250ml 추가"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
            <div className="flex items-baseline gap-1.5 mt-1">
              <span className="text-2xl font-black font-mono text-white tracking-tight">
                {(healthData.waterIntakeMl / 1000).toFixed(2)}
              </span>
              <span className="text-xs text-slate-400 font-medium">
                / {(healthData.waterGoalMl / 1000).toFixed(1)} L
              </span>
            </div>
          </div>

          <div className="mt-3">
            <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-sky-400 shadow-[0_0_8px_#38bdf8]"
                style={{
                  width: `${Math.min(100, (healthData.waterIntakeMl / healthData.waterGoalMl) * 100)}%`,
                }}
              />
            </div>
            <p className="text-[10px] text-slate-400 mt-1 font-mono text-right">
              {Math.round((healthData.waterIntakeMl / healthData.waterGoalMl) * 100)}% 달성
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
