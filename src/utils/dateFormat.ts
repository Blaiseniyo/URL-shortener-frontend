/**
 * Formats a date string into a human-readable format
 * @param dateString - Date string in ISO format
 * @returns Formatted date string
 */
const formatDate = (dateString: string): string => {
  try {
    const date = new Date(dateString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      return 'Invalid date';
    }
    
    // Use different format based on how old the date is
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 1) {
      // Today - show time only
      return date.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit'
      });
    } else if (diffDays < 7) {
      // Within a week - show day of week and time
      return date.toLocaleDateString(undefined, {
        weekday: 'short',
        hour: '2-digit',
        minute: '2-digit'
      });
    } else {
      // Older - show full date
      return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    }
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString || 'Unknown date';
  }
};

export default formatDate;