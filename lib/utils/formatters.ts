// lib/utils/formatters.ts
export function formatDate(dateString: string | undefined): string {
  if (!dateString) return "N/A";

  try {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  } catch (error) {
    console.error("Error formatting date:", error);
    return "N/A";
  }
}

export function truncateText(
  text: string | undefined,
  maxLength: number = 150,
): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  return `${text.substring(0, maxLength)}...`;
}

export function formatUrl(url: string | undefined): string {
  if (!url) return "";
  return url.startsWith("http") ? url : `https://${url}`;
}
