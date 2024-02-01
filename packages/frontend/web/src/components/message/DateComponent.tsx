export default function DateComponent({ date }: { readonly date: string }) {
    // Convert date string to Date object
    const messageDate = new Date(date);
  
    // Get current date
    const currentDate = new Date();
    // Set hours, minutes, seconds and milliseconds to 0
    currentDate.setHours(0, 0, 0, 0);
  
    // Get next date
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
  
    // Get yesterday date
    const yesterdayDate = new Date(currentDate);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
  
    // If the message date is in the current date, return the time
    if (messageDate >= currentDate && messageDate < nextDate) {
      const time = messageDate.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
  
      return <p className='opacity-50'>{time}</p>;
    }
  
    // If the message date is in the previous date, return yesterday
    if (messageDate >= yesterdayDate && messageDate < currentDate) {
      return <p className='opacity-50'>{`yesterday`}</p>;
    }
  
    // If the message date is in the previous date
    if (messageDate < currentDate) {
      const day = messageDate.toLocaleString('en-US', { day: '2-digit' });
      const month = messageDate.toLocaleString('en-US', { month: 'short' });
  
      let date = `${day} ${month} `;
  
      // Add the year if the year is not the current year
      if (messageDate.getFullYear() < currentDate.getFullYear()) {
        date += messageDate.getFullYear();
      }
  
      return <p className='opacity-50'>{`${date}`}</p>;
    }
  }