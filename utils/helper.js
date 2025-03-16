const createQueryString = (params) => {
    const queryString = Object.entries(params)
      .filter(([_, value]) => value !== "" && value !== null && value !== undefined) // Remove empty values
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`) // Encode keys & values
      .join("&");
  
    return queryString ? `?${queryString}` : "";
  };
  
  export function formatRelativeDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now - date;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) {
        return "Today";
    } else if (diffInDays === 1) {
        return "Yesterday";
    } else if (diffInDays < 7) {
        return `${diffInDays} days ago`;
    } else if (diffInDays < 30) {
        return "Last week";
    } else if (diffInDays < 60) {
        return "Last month";
    } else {
        return date.toLocaleDateString(); // Default fallback
    }
}