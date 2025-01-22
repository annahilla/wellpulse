export const getTomorrowDate = () => {
  const today = new Date();
  today.setDate(today.getDate() + 1); 
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); 
  const day = today.getDate().toString().padStart(2, "0"); 
  return `${year}-${month}-${day}`;
};

export const getCurrentTime = () => {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, "0"); 
  const minutes = now.getMinutes().toString().padStart(2, "0"); 
  return `${hours}:${minutes}`;
};

export const getLastNDays = (n: number) => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < n; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      dates.push(date.toISOString().split('T')[0]);
    }
    return dates.reverse();
  };