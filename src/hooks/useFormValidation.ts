import { useState } from 'react';
import { Habit } from '../types/types';

const useFormValidation = (habit: Habit) => {
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    const errors: { [key: string]: string } = {};
    const currentDate = new Date();
    const eventDate = new Date(habit.date);

    if (!habit.name) {
      errors.name = "Please provide a habit name";
    } else if (habit.name.length < 3) {
      errors.name = "The habit name must be at least 3 characters";
    }

    if (!habit.category) {
      errors.category = "Please select a category";
    }

    if (!habit.frequency) {
      errors.frequency = "Please select a frequency";
    }

    if (!habit.timeOfDay) {
      errors.timeOfDay = "Please specify a time of day";
    }

    if (!habit.duration || habit.duration < 1 || habit.duration > 1440) {
      errors.duration = "Duration must be between 1 and 1440 minutes";
    }

    if (!habit.date || eventDate < currentDate) {
      errors.date = "Please select a valid date";
    }

    setFormErrors(errors);

    return Object.keys(errors).length === 0;
  };

  return {
    formErrors,
    validateForm,
  };
};

export default useFormValidation;
