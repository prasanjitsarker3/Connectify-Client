export const formatDate = (dateString: any) => {
  const date = new Date(dateString);
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12 || 12;

  const day = date.getDate();
  const month = date.toLocaleString("default", { month: "short" });

  return `${hours}:${minutes} ${ampm}`;
};
