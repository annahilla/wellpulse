export const calculateEndTime = (timeOfDay: string, duration: number) => {
    const [hours, minutes] = timeOfDay.split(":").map(Number);
    
    const startDate = new Date();
    startDate.setHours(hours, minutes, 0, 0);

    const endDate = new Date(startDate.getTime() + duration * 60 * 1000);

    const endHours = endDate.getHours();
    const endMinutes = endDate.getMinutes();

    return `${endHours.toString().padStart(2, "0")}:${endMinutes.toString().padStart(2, "0")}`;
};

