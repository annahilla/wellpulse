import { useState, useEffect } from "react";
import { Habit } from "../types/types";

const useFormValidation = (habit: Habit, validateDate: boolean = true, isHome: boolean = true) => {
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const handleTouch = (field: string) => {
    setTouched((prev) => ({
      ...prev,
      [field]: true,
    }));
  };

  const validateForm = (validateAllFields: boolean = false) => {
    const errors: { [key: string]: string } = {};
  
    if (validateAllFields || touched.name) {
      if (!habit.name) {
        errors.name = "Please provide a habit name";
      } else if (habit.name.length < 3) {
        errors.name = "The habit name must be at least 3 characters";
      }
    }
  
    if (validateAllFields || touched.category) {
      if (!habit.category) {
        errors.category = "Please select a category";
      }
    }
  
    if (validateAllFields || touched.frequency) {
      if (!habit.frequency) {
        errors.frequency = "Please select a frequency";
      }
    }
  
    if (validateAllFields || touched.timeOfDay) {
      if (!habit.timeOfDay) {
        errors.timeOfDay = "Please specify a time of day";
      }
    }
  
    if (validateAllFields || touched.duration) {
      if (!habit.duration || habit.duration < 1 || habit.duration > 1440) {
        errors.duration = "Duration must be between 1 and 1440 minutes";
      }
    }
  
    if(validateDate) {
      if (validateAllFields || touched.date) {
        if (!habit.date || new Date(habit.date) < new Date()) {
          errors.date = "Please select a valid date";
        }
      }
    }
  
    if (validateAllFields || touched.location) {
      if (!habit.location && !isHome) {
        errors.location = "Please select a location from the map or do the habit at home";
      }
    }
  
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  

  useEffect(() => {
    validateForm();
  }, [habit, touched]);

  return {
    formErrors,
    touched,
    setTouched,
    handleTouch,
    validateForm,
  };
};


export default useFormValidation;
