import { useState, useEffect } from 'react';

const useHabitOptions = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [frequencies, setFrequencies] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/options/categories");
        const data = await response.json();
        if (data.success) {
          setCategories(data.categories);
        } else {
          console.error('Failed to fetch categories.');
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchFrequencies = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/options/frequencies");
        const data = await response.json();
        if (data.success) {
          setFrequencies(data.frequencies);
        } else {
            console.error('Failed to fetch frequencies.');
        }
      } catch (error) {
        console.error("Error fetching frequencies:", error);
      }
    };

    fetchCategories();
    fetchFrequencies();
  }, []);

  return { categories, frequencies };
};

export default useHabitOptions;
