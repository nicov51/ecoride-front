/**
 * Utilitaires pour les dates/heures
 */

/**
 * Formate une durée en secondes vers une durée en heures/minutes
 */
export function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);

  return `${hours}h${minutes.toString().padStart(2, '0')}`;
}

/**
 * Calcule la date d'arrivée
 */
export function calculateArrivalTime(
  departureDate: Date,
  departureTime: string,
  durationSeconds: number
): Date {
  const [hours, minutes] = departureTime.split(':').map(Number);
  const departure = new Date(departureDate);
  departure.setHours(hours, minutes, 0, 0);

  return new Date(departure.getTime() + durationSeconds * 1000);
}
