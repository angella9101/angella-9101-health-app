export type ScreenType = 'home' | 'activity' | 'sleep' | 'profile';
export type TransitionType = 'none' | 'push' | 'push_back';

export interface HealthData {
  steps: number;
  stepGoal: number;
  distanceKm: number;
  floors: number;
  
  sleepMinutes: number;
  sleepGoalMinutes: number;
  sleepScore: number;
  bedTime: string;
  wakeTime: string;
  remMinutes: number;
  deepMinutes: number;
  lightMinutes: number;
  awakeMinutes: number;
  hrv: number;
  avgSleepHeartRate: number;
  
  activeCalories: number;
  calorieGoal: number;
  restingCalories: number;
  
  heartRate: number;
  waterIntakeMl: number;
  waterGoalMl: number;
  
  isWorkoutActive: boolean;
  workoutType: string;
  workoutSeconds: number;
  workoutCalories: number;
  workoutDistanceKm: number;
}

export interface UserProfile {
  name: string;
  email: string;
  avatarUrl: string;
  age: number;
  heightCm: number;
  weightKg: number;
  deviceSynced: string;
  isNotificationsEnabled: boolean;
  isBioLuminescenceEnhanced: boolean;
}
