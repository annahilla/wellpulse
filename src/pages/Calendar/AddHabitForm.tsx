import { FormEvent } from "react";
import Modal from "../../components/ui/Modal";
import { Habit } from "../../types/types";
import Button from "../../components/ui/Button";
import ErrorMessage from "../../components/ui/ErrorMessage";
import { useTypedSelector } from ".";
import useHabitOptions from "../../hooks/useHabitOptions";

interface AddHabitFormProps {
  isFormModalOpen: boolean;
  newHabit: Habit;
  closeFormModal: () => void;
  createHabitHandler: (event: FormEvent<HTMLFormElement>) => Promise<void>;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const AddHabitForm = ({
  isFormModalOpen,
  newHabit,
  closeFormModal,
  createHabitHandler,
  handleInputChange,
}: AddHabitFormProps) => {
  const { categories, frequencies } = useHabitOptions();
  const { error } = useTypedSelector((state) => state.habits);
  const date = newHabit.date.split("T")[0];

  return (
    <Modal isOpen={isFormModalOpen} closeModal={closeFormModal}>
      <h3 className="text-2xl text-center font-bold mb-4">Add a new habit</h3>
      <form
        onSubmit={createHabitHandler}
        className="flex flex-col gap-5 my-6"
        noValidate
      >
        <div className="flex flex-col gap-2">
          <label htmlFor="name">What habit do you want to incorporate?</label>
          <input
            onChange={handleInputChange}
            className="px-5 py-2 rounded border border-neutral-200 focus:outline-none"
            type="text"
            name="name"
            placeholder="Morning Walk"
            value={newHabit.name}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="category">
            What category does this habit belong to?
          </label>
          <select
            onChange={handleInputChange}
            className="px-5 py-2 rounded border border-neutral-200 focus:outline-none"
            name="category"
            value={newHabit.category}
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
        <div className="flex flex-col gap-2">
          <label htmlFor="frequency">How often would you like to do it?</label>
          <select
            onChange={handleInputChange}
            className="px-5 py-2 rounded border border-neutral-200 focus:outline-none"
            name="frequency"
            value={newHabit.frequency}
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
        <div className="flex flex-col gap-2">
          <label htmlFor="timeOfDay">
            When during the day would you like to do it?
          </label>
          <input
            onChange={handleInputChange}
            className="px-5 py-2 rounded border border-neutral-200 focus:outline-none"
            name="timeOfDay"
            type="time"
            value={newHabit.timeOfDay}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="duration">
            How much time in minutes would you spend on this habit?
          </label>
          <div className="relative flex items-center rounded border border-neutral-200 active:outline-none focus:outline-none">
            <input
              onChange={handleInputChange}
              className="px-5 py-2"
              name="duration"
              type="number"
              placeholder="30"
              value={newHabit.duration}
              required
            />
            <span className="absolute text-sm right-0 px-5 py-2 border-l">
              minutes
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="date">When do you want to start this habit?</label>
          <input
            onChange={handleInputChange}
            className="px-5 py-2 rounded border border-neutral-200 focus:outline-none"
            name="date"
            type="date"
            value={date}
            required
          />
        </div>
        <Button
          isDisabled={error ? true : false}
          type="primary"
          size="sm"
          textSize="text-md"
        >
          Add
        </Button>
        {error && <ErrorMessage text={error} />}
      </form>
    </Modal>
  );
};

export default AddHabitForm;
