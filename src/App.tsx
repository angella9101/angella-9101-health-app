/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HealthProvider, useHealth } from './context/HealthContext';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './screens/HomeScreen';
import { ActivityScreen } from './screens/ActivityScreen';
import { SleepScreen } from './screens/SleepScreen';
import { ProfileScreen } from './screens/ProfileScreen';

const ScreenRenderer: React.FC = () => {
  const { currentScreen, transition } = useHealth();

  const getTransitionClass = () => {
    switch (transition) {
      case 'push':
        return 'transition-all duration-300 ease-out translate-x-0 opacity-100 animate-in slide-in-from-right-4 fade-in-50';
      case 'push_back':
        return 'transition-all duration-300 ease-out translate-x-0 opacity-100 animate-in slide-in-from-left-4 fade-in-50';
      case 'none':
      default:
        return '';
    }
  };

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'activity':
        return <ActivityScreen />;
      case 'sleep':
        return <SleepScreen />;
      case 'profile':
        return <ProfileScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0c141f] text-[#dce2f4] flex flex-col relative selection:bg-[#00F59B]/30 selection:text-[#00F59B]">
      {/* Background ambient bio-glow lights */}
      <div className="fixed top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#00F59B]/[0.03] blur-[120px] pointer-events-none -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-[#A78BFA]/[0.03] blur-[120px] pointer-events-none -z-10" />

      {/* Global Header */}
      <Header />

      {/* Dynamic Screen Content with transition container */}
      <main className={`flex-1 w-full max-w-lg mx-auto ${getTransitionClass()}`}>
        {renderCurrentScreen()}
      </main>

      {/* Bottom Floating Navigation */}
      <BottomNav />
    </div>
  );
};

export default function App() {
  return (
    <HealthProvider>
      <ScreenRenderer />
    </HealthProvider>
  );
}
