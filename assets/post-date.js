document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded fired');
  
  const dateElement = document.querySelector('.post-date');
  console.log('dateElement:', dateElement);
  
  if (!dateElement) {
    console.error('Could not find .post-date element');
    return;
  }
  
  let dateStr = dateElement.getAttribute('data-date');
  
  // Trim whitespace
  dateStr = dateStr.trim();
  console.log('Raw dateStr:', dateStr);
  
  // Parse: 2026-04-01T22:17:50-0700 or 2026-04-01T22:17:50 -0700
  // More flexible regex to handle space before timezone
  const regex = /^(\d{4})-(\d{2})-(\d{2})[T\s](\d{2}):(\d{2}):(\d{2})\s*([+-])(\d{2})(\d{2})$/;
  const match = dateStr.match(regex);
  
  console.log('Match result:', match);
  
  if (match) {
    const year = parseInt(match[1]);
    const month = parseInt(match[2]);
    const day = parseInt(match[3]);
    const hours = parseInt(match[4]);
    const minutes = parseInt(match[5]);
    const seconds = parseInt(match[6]);
    const tzSign = match[7];
    const tzHours = parseInt(match[8]);
    const tzMinutes = parseInt(match[9]);
    
    console.log('Parsed:', { year, month, day, hours, minutes, seconds, tzSign, tzHours, tzMinutes });
    
    // Create UTC date first
    const utcDate = new Date(Date.UTC(year, month - 1, day, hours, minutes, seconds));
    
    // Adjust for timezone offset to get UTC
    const tzOffsetMs = (tzSign === '+' ? 1 : -1) * (tzHours * 60 + tzMinutes) * 60000;
    const utcAdjusted = new Date(utcDate.getTime() - tzOffsetMs);
    
    // Get local date and time from UTC
    const localYear = utcAdjusted.getFullYear();
    const localMonth = String(utcAdjusted.getMonth() + 1);
    const localDay = String(utcAdjusted.getDate());
    const localHours = String(utcAdjusted.getHours()).padStart(2, '0');
    const localMinutes = String(utcAdjusted.getMinutes()).padStart(2, '0');
    const localSeconds = String(utcAdjusted.getSeconds()).padStart(2, '0');
    const localDateStr = localYear + '年' + localMonth + '月' + localDay + '日 ' + localHours + ':' + localMinutes + ':' + localSeconds;
    
    console.log('Local date:', localDateStr);
    document.getElementById('post-date-display').textContent = localDateStr;
  } else {
    console.error('Failed to parse date:', dateStr);
  }
});
