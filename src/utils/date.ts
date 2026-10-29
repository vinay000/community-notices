export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export function isExpired(expiresAt: string | null): boolean {
  if (!expiresAt) {
    return false;
  }
  const expTime = new Date(expiresAt).getTime();
  return !Number.isNaN(expTime) && expTime < Date.now();
}
