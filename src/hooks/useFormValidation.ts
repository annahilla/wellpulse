import { useState, useEffect } from "react";
import { Habit } from "../types/types";

type Errors = { [key: string]: string };

const useFormValidation = (habit: Habit,isHome: boolean = true) => {
  const [formErrors, setFormErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  const handleTouch = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const validateField = (field: string, value: any): string | null => {
    switch (field) {
      case "name":
        if (!value) return "Please provide a habit name";
        if (value.length < 3) return "The habit name must be at least 3 characters";
        return null;
      case "category":
        if (!value) return "Please select a category";
        return null;
      case "frequency":
        if (!value) return "Please select a frequency";
        return null;
      case "timeOfDay":
        if (!value) return "Please specify a time of day";
        return null;
      case "duration":
        if (!value || value < 1 || value > 1440) return "Duration must be between 1 and 1440 minutes";
        return null;
      case "date":
        if (!value || new Date(value) < new Date()) return "Please select a valid date";
        return null;
      case "location":
        if (!value && !isHome) return "Please select a location from the map or do the habit at home";
        return null;
      default:
        return null;
    }
  };

  const validateForm = (validateAllFields: boolean = false) => {
    const errors: Errors = {};

    const fieldsToValidate = [
      "name",
      "category",
      "frequency",
      "timeOfDay",
      "duration",
      "date",
      "location"
    ];

    fieldsToValidate.forEach((field) => {
      const shouldValidate = validateAllFields || touched[field];
      if (shouldValidate) {
        const error = validateField(field, habit[field as keyof Habit]);
        if (error) errors[field] = error;
      }
    });

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
