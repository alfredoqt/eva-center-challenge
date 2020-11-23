export type TemperatureRisk = 'low' | 'mid' | 'high';

export type TemperatureStats = {
  // Typo expected in response
  ambientTemperture: number;
  exteriorTemperature: number;
  patientTemperature: number;
  risk: TemperatureRisk;
};