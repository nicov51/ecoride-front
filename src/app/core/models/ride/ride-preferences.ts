export type PreferenceValue = 'yes' | 'no' | 'neutral';
export interface RidePreferences {
  chat: PreferenceValue;
  smoking: PreferenceValue;
  music: PreferenceValue;
  pets: PreferenceValue;
  other?: string;
}
