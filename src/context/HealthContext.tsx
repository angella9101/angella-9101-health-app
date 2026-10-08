import React, { createContext, useContext, useState, useEffect } from 'react';
import { ScreenType, TransitionType, HealthData, UserProfile } from '../types/health';

interface HealthContextValue {
  currentScreen: ScreenType;
  transition: TransitionType;
  navigateTo: (screen: ScreenType, transition?: TransitionType) => void;
  healthData: HealthData;
  userProfile: UserProfile;
  addSteps: (amount: number) => void;
  addCalories: (amount: number) => void;
  updateSleepMinutes: (minutes: number) => void;
  addWater: (ml: number) => void;
  updateStepGoal: (goal: number) => void;
  updateCalorieGoal: (goal: number) => void;
  updateSleepGoal: (minutes: number) => void;
  startWorkout: (type: string) => void;
  stopWorkout: () => void;
  toggleWorkoutPause: () => void;
  isWorkoutPaused: boolean;
  updateUserProfile: (profile: Partial<UserProfile>) => void;
  logout: () => void;
}

const initialHealthData: HealthData = {
  steps: 8420,
  stepGoal: 10000,
  distanceKm: 5.89,
  floors: 14,

  sleepMinutes: 445, // 7h 25m
  sleepGoalMinutes: 480, // 8h
  sleepScore: 88,
  bedTime: '23:20',
  wakeTime: '06:45',
  remMinutes: 125,
  deepMinutes: 105,
  lightMinutes: 195,
  awakeMinutes: 20,
  hrv: 62,
  avgSleepHeartRate: 54,

  activeCalories: 540,
  calorieGoal: 650,
  restingCalories: 1640,

  heartRate: 72,
  waterIntakeMl: 1750,
  waterGoalMl: 2500,

  isWorkoutActive: false,
  workoutType: '야외 러닝',
  workoutSeconds: 0,
  workoutCalories: 0,
  workoutDistanceKm: 0,
};

const initialUserProfile: UserProfile = {
  name: '김민준',
  email: 'lisjar2451@gmail.com',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80',
  age: 29,
  heightCm: 178,
  weightKg: 71.5,
  deviceSynced: 'Galaxy Watch Ultra & BioRing',
  isNotificationsEnabled: true,
  isBioLuminescenceEnhanced: true,
};

const HealthContext = createContext<HealthContextValue | null>(null);

export const HealthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('home');
  const [transition, setTransition] = useState<TransitionType>('none');
  const [healthData, setHealthData] = useState<HealthData>(initialHealthData);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserProfile);
  const [isWorkoutPaused, setIsWorkoutPaused] = useState(false);

  // Active workout timer
  useEffect(() => {
    let interval: any;
    if (healthData.isWorkoutActive && !isWorkoutPaused) {
      interval = setInterval(() => {
        setHealthData((prev) => {
          const newSeconds = prev.workoutSeconds + 1;
          const burnRatePerSec = prev.workoutType.includes('러닝') ? 0.16 : 0.12;
          const distRatePerSec = prev.workoutType.includes('러닝') ? 0.0028 : 0.0015;
          const newBurn = Math.floor(prev.workoutCalories + burnRatePerSec);
          const newDist = parseFloat((prev.workoutDistanceKm + distRatePerSec).toFixed(3));
          
          return {
            ...prev,
            workoutSeconds: newSeconds,
            workoutCalories: newBurn,
            workoutDistanceKm: newDist,
            activeCalories: prev.activeCalories + Math.round(burnRatePerSec),
            steps: prev.steps + (prev.workoutType.includes('러닝') ? 2 : 1),
            distanceKm: parseFloat((prev.distanceKm + distRatePerSec).toFixed(2)),
            heartRate: Math.min(168, Math.max(128, Math.floor(136 + Math.sin(newSeconds / 5) * 8))),
          };
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [healthData.isWorkoutActive, isWorkoutPaused]);

  // Periodic subtle biometric pulse (heart rate)
  useEffect(() => {
    const pulseInterval = setInterval(() => {
      if (!healthData.isWorkoutActive) {
        setHealthData((prev) => ({
          ...prev,
          heartRate: Math.min(84, Math.max(68, Math.floor(72 + (Math.random() * 6 - 3)))),
        }));
      }
    }, 4000);
    return () => clearInterval(pulseInterval);
  }, [healthData.isWorkoutActive]);

  const navigateTo = (screen: ScreenType, transitionType: TransitionType = 'none') => {
    setTransition(transitionType);
    setCurrentScreen(screen);
  };

  const addSteps = (amount: number) => {
    setHealthData((prev) => {
      const newSteps = Math.max(0, prev.steps + amount);
      const addedKm = parseFloat((amount * 0.0007).toFixed(2));
      const addedCal = Math.round(amount * 0.04);
      return {
        ...prev,
        steps: newSteps,
        distanceKm: parseFloat((prev.distanceKm + addedKm).toFixed(2)),
        activeCalories: prev.activeCalories + addedCal,
      };
    });
  };

  const addCalories = (amount: number) => {
    setHealthData((prev) => ({
      ...prev,
      activeCalories: Math.max(0, prev.activeCalories + amount),
    }));
  };

  const updateSleepMinutes = (minutes: number) => {
    setHealthData((prev) => {
      const score = Math.min(99, Math.max(50, Math.round((minutes / prev.sleepGoalMinutes) * 95)));
      return {
        ...prev,
        sleepMinutes: minutes,
        sleepScore: score,
        deepMinutes: Math.round(minutes * 0.24),
        remMinutes: Math.round(minutes * 0.28),
        lightMinutes: Math.round(minutes * 0.44),
      };
    });
  };

  const addWater = (ml: number) => {
    setHealthData((prev) => ({
      ...prev,
      waterIntakeMl: Math.max(0, prev.waterIntakeMl + ml),
    }));
  };

  const updateStepGoal = (goal: number) => {
    setHealthData((prev) => ({ ...prev, stepGoal: goal }));
  };

  const updateCalorieGoal = (goal: number) => {
    setHealthData((prev) => ({ ...prev, calorieGoal: goal }));
  };

  const updateSleepGoal = (minutes: number) => {
    setHealthData((prev) => ({ ...prev, sleepGoalMinutes: minutes }));
  };

  const startWorkout = (type: string) => {
    setHealthData((prev) => ({
      ...prev,
      isWorkoutActive: true,
      workoutType: type,
      workoutSeconds: 0,
      workoutCalories: 0,
      workoutDistanceKm: 0,
      heartRate: 132,
    }));
    setIsWorkoutPaused(false);
  };

  const stopWorkout = () => {
    setHealthData((prev) => ({
      ...prev,
      isWorkoutActive: false,
    }));
    setIsWorkoutPaused(false);
  };

  const toggleWorkoutPause = () => {
    setIsWorkoutPaused((prev) => !prev);
  };

  const updateUserProfile = (profile: Partial<UserProfile>) => {
    setUserProfile((prev) => ({ ...prev, ...profile }));
  };

  const logout = () => {
    // Navigates to home screen with push_back as requested by navigation spec
    navigateTo('home', 'push_back');
  };

  return (
    <HealthContext.Provider
      value={{
        currentScreen,
        transition,
        navigateTo,
        healthData,
        userProfile,
        addSteps,
        addCalories,
        updateSleepMinutes,
        addWater,
        updateStepGoal,
        updateCalorieGoal,
        updateSleepGoal,
        startWorkout,
        stopWorkout,
        toggleWorkoutPause,
        isWorkoutPaused,
        updateUserProfile,
        logout,
      }}
    >
      {children}
    </HealthContext.Provider>
  );
};

export const useHealth = () => {
  const context = useContext(HealthContext);
  if (!context) {
    throw new Error('useHealth must be used within a HealthProvider');
  }
  return context;
};
