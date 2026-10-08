import React, { useState } from 'react';
import { useHealth } from '../context/HealthContext';
import { 
  Moon, 
  Sparkles, 
  Clock, 
  Heart, 
  Wind, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  Circle,
  Bell,
  Sliders,
  ChevronRight
} from 'lucide-react';

export const SleepScreen: React.FC = () => {
  const { healthData, updateSleepMinutes } = useHealth();

  const [activeSound, setActiveSound] = useState<string | null>(null);
  const [routines, setRoutines] = useState<{ id: string; label: string; done: boolean }[]>([
    { id: '1', label: '취침 2시간 전 스마트폰 블루라이트 차단', done: true },
    { id: '2', label: '취침 전 5분 가벼운 호흡 및 스트레칭', done: true },
    { id: '3', label: '실내 온도 20°C 및 습도 50% 최적화', done: false },
  ]);
  const [isEditingSleep, setIsEditingSleep] = useState(false);

  const sleepHours = Math.floor(healthData.sleepMinutes / 60);
  const sleepMins = healthData.sleepMinutes % 60;

  const toggleSound = (sound: string) => {
    setActiveSound((prev) => (prev === sound ? null : sound));
  };

  const toggleRoutine = (id: string) => {
    setRoutines((prev) =>
      prev.map((r) => (r.id === id ? { ...r, done: !r.done } : r))
    );
  };

  const sleepStages = [
    { name: '깊은 수면 (Deep)', mins: healthData.deepMinutes, color: '#6366f1', glow: 'rgba(99,102,241,0.4)', desc: '근육 & 조직 회복, 면역력 강화' },
    { name: '렘 수면 (REM)', mins: healthData.remMinutes, color: '#A78BFA', glow: 'rgba(167,139,250,0.4)', desc: '기억 정리 및 인지 기능 리프레시' },
    { name: '얕은 수면 (Light)', mins: healthData.lightMinutes, color: '#38BDF8', glow: 'rgba(56,189,248,0.4)', desc: '기초 신체 이완 및 에너지 축적' },
    { name: '수면 중 깸 (Awake)', mins: healthData.awakeMinutes, color: '#F43F5E', glow: 'rgba(244,63,94,0.4)', desc: '미세 각성 (정상 범위)' },
  ];

  return (
    <div className="flex flex-col gap-5 pb-28 pt-2 px-4 max-w-lg mx-auto w-full animate-fadeIn">
      {/* Top Sleep Quality Hero */}
      <div className="glass-panel rounded-2xl p-5 border border-[#A78BFA]/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-36 h-36 bg-[#A78BFA]/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#A78BFA] shadow-[0_0_8px_#A78BFA]"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">
              어젯밤 수면 분석 리포트
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsEditingSleep(!isEditingSleep)}
            className="text-[11px] text-[#A78BFA] hover:underline flex items-center gap-1 font-mono cursor-pointer"
          >
            <Sliders className="w-3 h-3" />
            {isEditingSleep ? '수정 완료' : '수면 시간 조정'}
          </button>
        </div>

        {/* Big Score and total hours */}
        <div className="flex items-center justify-between my-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black font-mono text-white tracking-tight">
                {sleepHours}시간 {sleepMins}분
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1 font-mono">
              취침 {healthData.bedTime} → 기상 {healthData.wakeTime}
            </p>
          </div>

          <div className="text-right">
            <div className="inline-flex flex-col items-center justify-center p-3 rounded-2xl bg-[#A78BFA]/15 border border-[#A78BFA]/30 shadow-[0_0_20px_rgba(167,139,250,0.25)]">
              <span className="text-[10px] uppercase font-mono text-slate-300">수면 점수</span>
              <span className="text-2xl font-black font-mono text-[#A78BFA]">
                {healthData.sleepScore}점
              </span>
              <span className="text-[9px] text-emerald-400 font-bold">회복 완료</span>
            </div>
          </div>
        </div>

        {/* Interactive sleep duration slider (when user clicks '수면 시간 조정') */}
        {isEditingSleep && (
          <div className="mt-4 p-3 rounded-xl bg-[#0c141f] border border-[#A78BFA]/30 animate-fadeIn">
            <div className="flex justify-between text-xs text-slate-300 mb-2 font-mono">
              <span>수면 시간 직접 시뮬레이션:</span>
              <strong className="text-[#A78BFA]">{sleepHours}시간 {sleepMins}분</strong>
            </div>
            <input
              type="range"
              min="240"
              max="600"
              step="15"
              value={healthData.sleepMinutes}
              onChange={(e) => updateSleepMinutes(Number(e.target.value))}
              className="w-full accent-[#A78BFA] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
              <span>4시간</span>
              <span>7시간</span>
              <span>10시간</span>
            </div>
          </div>
        )}
      </div>

      {/* Sleep Stages Architecture (Hypnogram Style Breakdown) */}
      <div className="glass-panel rounded-2xl p-5 border border-white/10">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Moon className="w-4 h-4 text-[#A78BFA]" />
            수면 단계 아키텍처
          </h3>
          <span className="text-xs text-slate-400 font-mono">총 4회 수면 주기 완료</span>
        </div>

        {/* Visual composite bar */}
        <div className="w-full h-3 rounded-full overflow-hidden flex my-2 bg-slate-800">
          <div
            style={{ width: `${(healthData.deepMinutes / healthData.sleepMinutes) * 100}%` }}
            className="h-full bg-indigo-500"
            title="깊은 수면"
          />
          <div
            style={{ width: `${(healthData.remMinutes / healthData.sleepMinutes) * 100}%` }}
            className="h-full bg-purple-400"
            title="렘 수면"
          />
          <div
            style={{ width: `${(healthData.lightMinutes / healthData.sleepMinutes) * 100}%` }}
            className="h-full bg-sky-400"
            title="얕은 수면"
          />
          <div
            style={{ width: `${(healthData.awakeMinutes / healthData.sleepMinutes) * 100}%` }}
            className="h-full bg-rose-500"
            title="수면 중 깸"
          />
        </div>

        {/* Detailed Stages List */}
        <div className="flex flex-col gap-2.5 mt-4">
          {sleepStages.map((stage) => {
            const pct = Math.round((stage.mins / healthData.sleepMinutes) * 100);
            const h = Math.floor(stage.mins / 60);
            const m = stage.mins % 60;
            return (
              <div
                key={stage.name}
                className="p-2.5 rounded-xl bg-[#0c141f]/70 border border-white/5 flex items-center justify-between text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: stage.color, boxShadow: `0 0 6px ${stage.glow}` }}
                  />
                  <div>
                    <h4 className="font-bold text-white">{stage.name}</h4>
                    <p className="text-[10px] text-slate-400">{stage.desc}</p>
                  </div>
                </div>

                <div className="text-right font-mono">
                  <span className="font-bold text-white">
                    {h > 0 ? `${h}h ` : ''}{m}m
                  </span>
                  <span className="text-[10px] text-slate-400 ml-1.5 font-normal">({pct}%)</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Biometric Night Telemetry: Sleep Heart Rate & HRV */}
      <div className="grid grid-cols-2 gap-3.5">
        <div className="glass-panel rounded-2xl p-4 border border-indigo-500/20">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-1">
            <Heart className="w-3.5 h-3.5 text-indigo-400" />
            평균 수면 심박수
          </span>
          <div className="flex items-baseline gap-1 mt-1 font-mono">
            <span className="text-2xl font-black text-white">{healthData.avgSleepHeartRate}</span>
            <span className="text-xs text-slate-400">BPM</span>
          </div>
          <p className="text-[10px] text-emerald-400 mt-1 font-mono">
            낮 대비 -18 BPM (최적 이완)
          </p>
        </div>

        <div className="glass-panel rounded-2xl p-4 border border-purple-500/20">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-1">
            <Wind className="w-3.5 h-3.5 text-purple-400" />
            심박 변이도 (HRV)
          </span>
          <div className="flex items-baseline gap-1 mt-1 font-mono">
            <span className="text-2xl font-black text-white">{healthData.hrv}</span>
            <span className="text-xs text-slate-400">ms</span>
          </div>
          <p className="text-[10px] text-emerald-400 mt-1 font-mono">
            자율신경계 회복 지수 높음
          </p>
        </div>
      </div>

      {/* Smart Sleep Recovery Tools */}
      <div className="glass-panel rounded-2xl p-5 border border-white/10">
        <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-[#A78BFA]" />
          스마트 수면 케어 도구
        </h3>

        {/* Smart Wake-up Time Recommendation */}
        <div className="p-3 rounded-xl bg-[#0c141f]/70 border border-white/5 mb-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-amber-400/15 text-amber-400 flex items-center justify-center">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">최적 기상 스마트 알람</h4>
              <p className="text-[10px] text-slate-400">얕은 수면 구간에서 부드럽게 기상 (06:40 제안)</p>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-amber-400 bg-amber-400/10 px-2 py-1 rounded-md">
            06:40
          </span>
        </div>

        {/* Ambient Sound Simulator */}
        <div className="p-3 rounded-xl bg-[#0c141f]/70 border border-white/5 mb-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-white">수면 유도 백색소음</span>
            {activeSound && (
              <span className="text-[10px] font-mono text-[#A78BFA] flex items-center gap-1 animate-pulse">
                <Volume2 className="w-3 h-3" /> 재생 중 ({activeSound})
              </span>
            )}
          </div>
          <div className="grid grid-cols-3 gap-2">
            {['온화한 빗소리', '깊은 파도', '핑크 노이즈'].map((sound) => {
              const isPlaying = activeSound === sound;
              return (
                <button
                  key={sound}
                  type="button"
                  onClick={() => toggleSound(sound)}
                  className={`py-2 px-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                    isPlaying
                      ? 'bg-[#A78BFA] text-[#0c141f] shadow-[0_0_12px_rgba(167,139,250,0.5)] font-bold'
                      : 'bg-white/5 hover:bg-white/10 text-slate-300'
                  }`}
                >
                  {isPlaying ? <Volume2 className="w-3 h-3" /> : <VolumeX className="w-3 h-3 opacity-60" />}
                  <span className="truncate">{sound}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Bedtime Routine Checklist */}
        <div>
          <span className="text-xs font-bold text-white block mb-2">취침 준비 루틴</span>
          <div className="flex flex-col gap-1.5">
            {routines.map((item) => (
              <div
                key={item.id}
                onClick={() => toggleRoutine(item.id)}
                className="flex items-center gap-2 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer text-xs"
              >
                {item.done ? (
                  <CheckCircle2 className="w-4 h-4 text-[#00F59B] shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 text-slate-500 shrink-0" />
                )}
                <span className={item.done ? 'text-slate-300 line-through' : 'text-slate-200'}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
