export function formatRelativeTime(date) {
  const now = new Date();
  const diff = new Date(date) - now;

  if (diff <= 0) return 'Expired';

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (years > 0) return `in ${years} year${years > 1 ? 's' : ''}`;
  if (months > 0) return `in ${months} month${months > 1 ? 's' : ''}`;
  if (weeks > 0) return `in ${weeks} week${weeks > 1 ? 's' : ''}`;
  if (days > 0) return `in ${days} day${days > 1 ? 's' : ''}`;
  if (hours > 0) return `in ${hours} hour${hours > 1 ? 's' : ''}`;
  if (minutes > 0) return `in ${minutes} minute${minutes > 1 ? 's' : ''}`;

  return `in ${seconds} second${seconds > 1 ? 's' : ''}`;
}
