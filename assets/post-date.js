document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded fired');
  
  // Function to parse and convert date
  const convertDate = (dateElement, displayElementSelector, format) => {
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
      
      let localDateStr;
      
      if (format === 'iso') {
        // ISO format: 2026-04-01 (date only)
        const localYear = utcAdjusted.getFullYear();
        const localMonth = String(utcAdjusted.getMonth() + 1).padStart(2, '0');
        const localDay = String(utcAdjusted.getDate()).padStart(2, '0');
        localDateStr = localYear + '-' + localMonth + '-' + localDay;
      } else if (format === 'chinese') {
        // Chinese format: 2026年4月1日 22:17:50 (with time, no padding for month/day)
        const localYear = utcAdjusted.getFullYear();
        const localMonth = String(utcAdjusted.getMonth() + 1);
        const localDay = String(utcAdjusted.getDate());
        const localHours = String(utcAdjusted.getHours()).padStart(2, '0');
        const localMinutes = String(utcAdjusted.getMinutes()).padStart(2, '0');
        const localSeconds = String(utcAdjusted.getSeconds()).padStart(2, '0');
        localDateStr = localYear + '年' + localMonth + '月' + localDay + '日 ' + localHours + ':' + localMinutes + ':' + localSeconds;
      }
      
      console.log('Local date:', localDateStr);
      
      const displayElement = dateElement.querySelector(displayElementSelector);
      if (displayElement) {
        displayElement.textContent = localDateStr;
      }
    } else {
      console.error('Failed to parse date:', dateStr);
    }
  };
  
  // Handle post dates with Chinese format and time (on post page)
  const postDateElement = document.querySelector('.post-date');
  if (postDateElement) {
    console.log('Processing .post-date element (Chinese format with time)');
    convertDate(postDateElement, '#post-date-display', 'chinese');
  }
  
  // Handle post dates in ISO format (on home page) - date only
  const postDateListIsoElements = document.querySelectorAll('.post-date-list-iso');
  if (postDateListIsoElements.length > 0) {
    console.log('Processing', postDateListIsoElements.length, '.post-date-list-iso elements (ISO format date only)');
    postDateListIsoElements.forEach(element => {
      convertDate(element, '.post-date-display', 'iso');
    });
  }
});

