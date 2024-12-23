export const formatTimezoneOffset = (offset: number) => {
  const sign = offset > 0 ? "-" : "+"; // Determine the sign
  const hours = String(Math.floor(Math.abs(offset) / 60)).padStart(2, "0"); // Format hours with leading zero
  const minutes = String(Math.abs(offset) % 60).padStart(2, "0"); // Format minutes with leading zero
  const formattedOffset = `${sign}${hours}:${minutes}`; // Combine to format ±HH:MM}

  return formattedOffset;
};
