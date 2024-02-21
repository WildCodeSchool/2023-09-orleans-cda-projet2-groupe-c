export default function useDateFormatted({
  dateString,
}: {
  dateString: string | undefined;
}) {
  // If date is undefined, return nothing
  if (dateString === undefined) {
    return;
  }

  // Convert the date string to a date object
  const newDate = new Date(dateString);

  // Get the year, month and day from the date object
  const year = newDate.getFullYear();
  const month = newDate.toLocaleString('en-US', { month: '2-digit' });
  const day = newDate.toLocaleString('en-US', { day: '2-digit' });

  // Format the date
  const birthdateFormatted = `${year}/${month}/${day}`;

  return birthdateFormatted;
}
