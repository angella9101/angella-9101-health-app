import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { 
  Flame, 
  Footprints, 
  Timer, 
  MapPin, 
  Play, 
  Pause, 
  Square, 
  Dumbbell, 
  Bike, 
  Trophy, 
  Sparkles,
  TrendingUp,
  Activity
} from 'lucide-react';

export const ActivityScreen: React.FC = () => {
  const { 
    healthData, 
    startWorkout, 
    stopWorkout, 
    toggleWorkoutPause, 
    isWorkoutPaused,
    addSteps,
    addCalories
  } = useHealth();

  const [activeTab, setActiveTab] = useState<'today' | 'weekly'>('today');
  const [selectedHour, setSelectedHour] = useState<number | null>(14);

  const formatTimer = (totalSecs: number) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Hourly steps data for visual bar chart
  const hourlyData = [
    { hour: '06시', steps: 320, cal: 18 },
    { hour: '08시', steps: 1420, cal: 85 },
    { hour: '10시', steps: 890, cal: 48 },
    { hour: '12시', steps: 1650, cal: 98 },
    { hour: '14시', steps: 1120, cal: 62 },
    { hour: '16시', steps: 940, cal: 52 },
    { hour: '18시', steps: 2280, cal: 145 },
    { hour: '20시', steps: 800, cal: 42 },
  ];

  const maxHourSteps = 2400;

  const workoutOptions = [
    { type: '야외 러닝', icon: Activity, defaultDuration: '30분', estCal: '280 kcal' },
    { type: '실내 사이클', icon: Bike, defaultDuration: '45분', estCal: '360 kcal' },
    { type: '웨이트 트레이닝', icon: Dumbbell, defaultDuration: '50분', estCal: '240 kcal' },
  ];

  return (
    <div className="flex flex-col gap-5 pb-28 pt-2 px-4 max-w-lg mx-auto w-full animate-fadeIn">
      {/* Live Active Workout HUD (when active) */}
      {healthData.isWorkoutActive ? (
        <div className="glass-panel rounded-2xl p-5 border-2 border-[#FF7043]/50 relative overflow-hidden shadow-[0_0_30px_rgba(255,112,67,0.25)]">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7043]/15 rounded-full blur-2xl pointer-events-none"></div>

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF7043] animate-ping"></span>
              <span className="text-xs font-bold text-[#FF7043] tracking-wide uppercase">
                실시간 세션 기록 중
              </span>
            </div>
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-[#FF7043]/20 text-[#FF7043] border border-[#FF7043]/40">
              {healthData.workoutType}
            </span>
          </div>

          {/* Big timer & heart rate */}
          <div className="flex items-center justify-between my-2">
            <div>
              <span className="text-[11px] font-mono uppercase text-slate-400">경과 시간</span>
              <div className="text-4xl font-black font-mono text-white tracking-tight">
                {formatTimer(healthData.workoutSeconds)}
              </div>
            </div>

            <div className="text-right">
              <span className="text-[11px] font-mono uppercase text-slate-400">실시간 심박수</span>
              <div className="text-3xl font-black font-mono text-[#FF7043] flex items-baseline justify-end gap-1">
                {healthData.heartRate}
                <span className="text-xs text-slate-400">BPM</span>
              </div>
              <span className="text-[10px] text-amber-400 font-semibold">Zone 3 유산소 연소</span>
            </div>
          </div>

          {/* Realtime stats grid */}
          <div className="grid grid-cols-3 gap-2.5 my-4 bg-[#0c141f]/70 p-3 rounded-xl border border-white/5 font-mono text-center">
            <div>
              <span className="text-[10px] text-slate-400 block">소모 칼로리</span>
              <span className="text-base font-bold text-white">
                {healthData.workoutCalories} <span className="text-xs text-[#FF7043]">kcal</span>
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">운동 거리</span>
              <span className="text-base font-bold text-white">
                {healthData.workoutDistanceKm.toFixed(2)} <span className="text-xs text-[#00F59B]">km</span>
              </span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 block">평균 페이스</span>
              <span className="text-base font-bold text-white">
                5&apos;38&quot; <span className="text-xs text-slate-400">/km</span>
              </span>
            </div>
          </div>

          {/* Workout controls */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggleWorkoutPause}
              className={`flex-1 py-3 px-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                isWorkoutPaused
                  ? 'bg-[#00F59B] text-[#07130c] shadow-[0_0_15px_rgba(0,245,155,0.4)]'
                  : 'bg-[#1A2333] text-white border border-white/10 hover:border-white/20'
              }`}
            >
              {isWorkoutPaused ? (
                <>
                  <Play className="w-4 h-4 fill-current" /> 재개하기
                </>
              ) : (
                <>
                  <Pause className="w-4 h-4 fill-current" /> 일시정지
                </>
              )}
            </button>

            <button
              type="button"
              onClick={stopWorkout}
              className="py-3 px-5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/30 font-bold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <Square className="w-4 h-4 fill-current" /> 종료
            </button>
          </div>
        </div>
      ) : null}

      {/* Tabs */}
      <div className="flex items-center justify-between border-b border-white/10 pb-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('today')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'today'
                ? 'bg-[#FF7043]/20 text-[#FF7043] border border-[#FF7043]/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            오늘 일간 분석
          </button>
          <button
            onClick={() => setActiveTab('weekly')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              activeTab === 'weekly'
                ? 'bg-[#FF7043]/20 text-[#FF7043] border border-[#FF7043]/40'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            주간 트렌드
          </button>
        </div>
        <span className="text-[11px] font-mono text-slate-400">목표 달성률 84%</span>
      </div>

      {/* Hourly Step Distribution Bar Chart */}
      <div className="glass-panel rounded-2xl p-5 border border-white/10">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
              시간대별 활동 강도
            </span>
            <h3 className="text-lg font-extrabold text-white">걸음 & 칼로리 분포</h3>
          </div>
          <span className="text-xs font-mono font-bold text-[#00F59B]">
            총 {healthData.steps.toLocaleString()} 보
          </span>
        </div>

        {/* Bar Chart Container */}
        <div className="h-40 flex items-end justify-between gap-2 pt-6 pb-2 px-1 border-b border-white/5">
          {hourlyData.map((d, idx) => {
            const heightPercent = Math.min(100, Math.round((d.steps / maxHourSteps) * 100));
            const isSelected = selectedHour === idx;

            return (
              <div
                key={d.hour}
                onClick={() => setSelectedHour(idx)}
                className="flex-1 flex flex-col items-center h-full justify-end group cursor-pointer"
              >
                {/* Tooltip on active */}
                {isSelected && (
                  <div className="text-[10px] font-mono text-[#00F59B] mb-1 font-bold animate-bounce">
                    {d.steps}
                  </div>
                )}

                <div className="w-full max-w-[28px] bg-slate-800/80 rounded-t-md overflow-hidden relative transition-all group-hover:scale-105">
                  <div
                    className={`w-full rounded-t-md transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-t from-[#00F59B] to-[#53ffab] shadow-[0_0_12px_#00F59B]'
                        : 'bg-gradient-to-t from-[#00F59B]/60 to-[#00F59B]'
                    }`}
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>

                <span
                  className={`text-[10px] font-mono mt-2 transition-colors ${
                    isSelected ? 'text-[#00F59B] font-bold' : 'text-slate-400'
                  }`}
                >
                  {d.hour}
                </span>
              </div>
            );
          })}
        </div>

        {selectedHour !== null && (
          <div className="mt-3 p-2.5 rounded-xl bg-[#0c141f]/60 border border-white/5 flex items-center justify-between text-xs">
            <span className="text-slate-300">
              <strong className="text-white">{hourlyData[selectedHour].hour}</strong> 활동 상세
            </span>
            <div className="flex items-center gap-3 font-mono">
              <span className="text-[#00F59B] font-bold">
                {hourlyData[selectedHour].steps.toLocaleString()} 보
              </span>
              <span className="text-slate-600">|</span>
              <span className="text-[#FF7043] font-bold">
                {hourlyData[selectedHour].cal} kcal 소모
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Heart Rate Zones Breakdown */}
      <div className="glass-panel rounded-2xl p-5 border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#FF7043]" />
            심박수 훈련 구간 (Heart Zones)
          </h3>
          <span className="text-xs text-slate-400 font-mono">최대 심박 184 BPM</span>
        </div>

        <div className="flex flex-col gap-2.5 text-xs">
          <div>
            <div className="flex justify-between text-slate-300 mb-1 font-mono">
              <span>Zone 4 - 고강도 무산소 (152~170 bpm)</span>
              <strong className="text-white">12분 (16%)</strong>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-rose-500 rounded-full" style={{ width: '16%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1 font-mono">
              <span>Zone 3 - 유산소 심폐 지구력 (134~151 bpm)</span>
              <strong className="text-[#00F59B]">38분 (52%)</strong>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full shadow-[0_0_8px_#00F59B]"
                style={{ width: '52%' }}
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-slate-300 mb-1 font-mono">
              <span>Zone 2 - 지방 연소 구간 (115~133 bpm)</span>
              <strong className="text-white">24분 (32%)</strong>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div className="h-full bg-amber-400 rounded-full" style={{ width: '32%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Workout Launchers */}
      {!healthData.isWorkoutActive && (
        <div className="glass-panel rounded-2xl p-5 border border-white/10">
          <h3 className="text-sm font-bold text-white mb-3">새 운동 시작하기</h3>
          <div className="grid grid-cols-1 gap-2.5">
            {workoutOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <div
                  key={opt.type}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#0c141f]/70 border border-white/5 hover:border-[#FF7043]/40 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[#FF7043]/15 text-[#FF7043] flex items-center justify-center">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{opt.type}</h4>
                      <p className="text-[11px] text-slate-400 font-mono">
                        권장 {opt.defaultDuration} · 예상 {opt.estCal}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => startWorkout(opt.type)}
                    className="px-3.5 py-1.5 rounded-lg bg-[#FF7043]/20 hover:bg-[#FF7043]/30 text-[#FF7043] border border-[#FF7043]/40 text-xs font-bold transition-all cursor-pointer"
                  >
                    시작
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Weekly Achievements */}
      <div className="glass-panel rounded-2xl p-4.5 border border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white">주간 챌린지 달성 임박</h4>
            <p className="text-xs text-slate-400">목표 50,000보 중 42,120보 완료</p>
          </div>
        </div>
        <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/30">
          84%
        </span>
      </div>
    </div>
  );
};
