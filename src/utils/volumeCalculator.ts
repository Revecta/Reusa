export interface BoxDimensions {
  width: number;
  height: number;
  depth: number;
}

export function calculateVolume({ width, height, depth }: BoxDimensions): number {
  // Calculate volume in cm³ then convert to liters
  const volumeCm3 = width * height * depth;
  const volumeLiters = volumeCm3 / 1000;
  return Math.round(volumeLiters * 100) / 100; // Round to 2 decimal places
}

export function calculateCO2Savings(volumeLiters: number): number {
  // Estimate CO2 savings based on volume (simplified calculation)
  // Assuming average box density and CO2 per gram of cardboard
  const estimatedWeight = volumeLiters * 0.15; // kg (rough estimate)
  const co2Savings = estimatedWeight * 0.7; // kg CO2 saved
  return Math.round(co2Savings * 1000); // return in grams
}