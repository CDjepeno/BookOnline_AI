export const formatDate = (isoString: string): string => {
  const [year, month, day] = isoString.split("T")[0].split("-");
  return `${day}-${month}-${year}`;
};
