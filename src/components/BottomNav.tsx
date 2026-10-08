import React from 'react';
import { useHealth } from '../context/HealthContext';
import { ScreenType } from '../types/health';
import { Home, Flame, Moon, User } from 'lucide-react';

interface NavItem {
  path: ScreenType;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  accentColor: string;
  glowColor: string;
}

const navItems: NavItem[] = [
  {
    path: 'home',
    label: '홈',
    icon: Home,
    accentColor: '#00F59B',
    glowColor: 'rgba(0, 245, 155, 0.35)',
  },
  {
    path: 'activity',
    label: '활동',
    icon: Flame,
    accentColor: '#FF7043',
    glowColor: 'rgba(255, 112, 67, 0.35)',
  },
  {
    path: 'sleep',
    label: '수면',
    icon: Moon,
    accentColor: '#A78BFA',
    glowColor: 'rgba(167, 139, 250, 0.35)',
  },
  {
    path: 'profile',
    label: '프로필',
    icon: User,
    accentColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.35)',
  },
];

export const BottomNav: React.FC = () => {
  const { currentScreen, navigateTo } = useHealth();

  const handleNavClick = (e: React.MouseEvent, path: ScreenType) => {
    e.preventDefault();
    navigateTo(path, 'none');
  };

  return (
    <div className="fixed bottom-3 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="pointer-events-auto flex items-center justify-around w-full max-w-md px-3 py-2 rounded-2xl glass-nav shadow-[0_12px_36px_rgba(0,0,0,0.65)]">
        {navItems.map((item) => {
          const isActive = currentScreen === item.path;
          const Icon = item.icon;

          return (
            <a
              key={item.path}
              href={`#${item.path}`}
              data-path={item.path}
              onClick={(e) => handleNavClick(e, item.path)}
              className="relative flex flex-col items-center justify-center flex-1 py-1.5 px-2 rounded-xl transition-all duration-200 group cursor-pointer select-none"
              style={{
                color: isActive ? item.accentColor : '#94A3B8',
              }}
            >
              {/* Background pill glow on active */}
              {isActive && (
                <div
                  className="absolute inset-0 rounded-xl opacity-15"
                  style={{ backgroundColor: item.accentColor }}
                />
              )}

              {/* Icon with scale effect */}
              <div
                className={`relative flex items-center justify-center transition-transform duration-200 ${
                  isActive ? 'scale-110' : 'group-hover:scale-105'
                }`}
              >
                <Icon className="w-5 h-5 transition-colors" />
                {isActive && (
                  <div
                    className="absolute inset-0 blur-sm -z-10"
                    style={{ backgroundColor: item.glowColor }}
                  />
                )}
              </div>

              {/* Label */}
              <span
                className={`text-[11px] mt-1 font-semibold tracking-tight transition-all ${
                  isActive ? 'opacity-100 font-bold' : 'opacity-70 group-hover:opacity-90'
                }`}
              >
                {item.label}
              </span>

              {/* Active neon bottom line indicator */}
              {isActive && (
                <div
                  className="absolute -bottom-1 w-3 h-0.5 rounded-full"
                  style={{
                    backgroundColor: item.accentColor,
                    boxShadow: `0 0 8px ${item.accentColor}`,
                  }}
                />
              )}
            </a>
          );
        })}
      </nav>
    </div>
  );
};
