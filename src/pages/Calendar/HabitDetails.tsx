import Modal from "../../components/ui/Modal";
import { HabitDetailsInterface } from "../../types/types";
import Button from "../../components/ui/Button";
import { useDispatch } from "react-redux";
import { deleteHabit, updateHabitAsync } from "../../redux/habitsActions";
import { AppDispatch } from "../../redux/store";
import { ChangeEvent, useEffect, useState } from "react";
import useHabitOptions from "../../hooks/useHabitOptions";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { toast } from "react-toastify";

interface HabitDetailsProps {
  isHabitModalOpen: boolean;
  habit: HabitDetailsInterface;
  closeHabitModal: () => void;
}

const HabitDetails = ({
  isHabitModalOpen,
  habit,
  closeHabitModal,
}: HabitDetailsProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { categories, frequencies } = useHabitOptions();
  const { name, _id, category, frequency, timeOfDay, duration, eventDate } =
    habit;

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [updatedHabit, setUpdatedHabit] =
    useState<HabitDetailsInterface>(habit);
  const currentDate = new Date();
  const eventDateFormatted = new Date(eventDate);

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setUpdatedHabit((prevHabit) => ({
      ...prevHabit,
      [name]: value,
    }));
  };

  const handleCompletionChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    if (!checked) {
      setError(false);
    } else {
      if (eventDateFormatted > currentDate) {
        setError(true);
        setErrorMessage("You can't complete an event in the future");
      } else {
        setError(false);
      }
    }

    setUpdatedHabit((prevHabit) => {
      const newCompletedDays = checked
        ? [...prevHabit.completedDays, eventDate]
        : prevHabit.completedDays.filter((day) => day !== eventDate);
      return { ...prevHabit, completedDays: newCompletedDays };
    });
  };

  useEffect(() => {
    setUpdatedHabit(habit);
  }, [habit]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!error) {
      try {
        if (habit && _id !== undefined) {
          await dispatch(
            updateHabitAsync({ habitId: _id, habitData: updatedHabit })
          );
          toast.success("Habit updated successfully!");
          closeHabitModal();
        }
      } catch (error) {
        console.error("Error updating habit:", error);
        toast.error("There was an error updating the habit.");
      }
    }
  };

  const handleDeleteHabit = async () => {
    try {
      if (habit && habit._id !== undefined) {
        await dispatch(deleteHabit(habit._id));
        toast.success("Habit deleted successfully!");
        closeHabitModal();
      }
    } catch (err) {
      console.error("Error creating habit: ", err);
      toast.error("There was an error deleting the habit.");
    }
  };

  return (
    <Modal isOpen={isHabitModalOpen} closeModal={closeHabitModal}>
      <h3 className="text-2xl text-center font-bold mb-8">Edit your habit</h3>
      <div className="flex flex-col items-center">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col items-start gap-4 text-lg"
        >
          <div className="flex items-center gap-4 w-full p-4 bg-light-green m-auto">
            <input
              name="done"
              type="checkbox"
              onChange={handleCompletionChange}
              checked={updatedHabit.completedDays.includes(eventDate)}
            />
            <p className="font-bold">Completed</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-bold">Name:</p>
            <input
              name="name"
              type="text"
              onChange={handleChange}
              className="border inputx-12 px-4 py-1 rounded"
              value={updatedHabit.name}
            />
          </div>
          <div className="flex items-center gap-4">
            <p className="font-bold">Category:</p>
            <select
              onChange={handleChange}
              className="px-5 py-2 rounded border border-neutral-200 focus:outline-none"
              name="category"
              value={updatedHabit.category}
              required
            >
              {categories.length > 0 &&
                categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-bold">Frequency:</p>
            <select
              onChange={handleChange}
              className="px-5 py-2 rounded border border-neutral-200 focus:outline-none"
              name="frequency"
              value={updatedHabit.frequency}
              required
            >
              {frequencies.length > 0 &&
                frequencies.map((frequency) => (
                  <option key={frequency} value={frequency}>
                    {frequency}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-bold">Time:</p>
            <input
              name="timeOfDay"
              type="time"
              onChange={handleChange}
              className="border inputx-12 px-4 py-1 rounded"
              value={updatedHabit.timeOfDay}
            />
          </div>
          <div className="flex items-center gap-4">
            <p className="font-bold">Duration:</p>
            <div className="flex items-center relative border inputx-12 rounded">
              <input
                onChange={handleChange}
                className="px-5 py-2"
                name="duration"
                type="number"
                value={updatedHabit.duration}
                required
              />
              <span className="absolute text-sm right-0 px-5 py-2 border-l">
                minutes
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-bold">Date:</p>
            <input
              name="date"
              type="date"
              onChange={handleChange}
              className="border inputx-12 px-4 py-1 rounded"
              value={eventDate}
              disabled
            />
          </div>
          {error && <ErrorMessage text={errorMessage} />}
          <div className="flex items-center m-auto gap-6 mt-7">
            <Button
              isDisabled={false}
              type="primary"
              textSize="text-md"
              size="sm"
            >
              Save
            </Button>
            <Button
              isDisabled={false}
              handleClick={handleDeleteHabit}
              type="alert"
              textSize="text-md"
              size="sm"
            >
              Delete
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default HabitDetails;
