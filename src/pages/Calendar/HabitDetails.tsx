import Modal from "../../components/ui/Modal";
import { Habit } from "../../types/types";
import Button from "../../components/ui/Button";
import { useDispatch } from "react-redux";
import { deleteHabit } from "../../redux/habitsActions";
import { AppDispatch } from "../../redux/store";

interface HabitDetailsProps {
    isHabitModalOpen: boolean,
    habit: Habit | null,
    closeHabitModal: () =>  void,
    removeEvent: (id: string) =>  void,
}

const HabitDetails = ({isHabitModalOpen, habit, closeHabitModal, removeEvent} : HabitDetailsProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleDeleteHabit = async () => {
        try {
            if (habit && habit._id !== undefined) {
                await dispatch(deleteHabit(habit._id));
                removeEvent(habit._id)
                closeHabitModal();
            }
            } catch (err) {
              console.error("Error creating habit: ", err);
            }
    }

    return (
        <Modal isOpen={isHabitModalOpen} closeModal={closeHabitModal}>
        <h3 className="text-2xl text-center font-bold mb-8">{habit?.name}</h3>
        <div className="flex flex-col items-center">
        <div className="flex flex-col items-start gap-4 text-lg">
            <div className="flex items-center gap-4">
                <p className="font-bold">Category:</p>
                <p className="border px-12 py-1 rounded">{habit?.category}</p>
            </div>
            <div className="flex items-center gap-4">
                <p className="font-bold">Frequency:</p>
                <p className="border px-12 py-1 rounded">{habit?.frequency}</p>
            </div>
            <div className="flex items-center gap-4">
                <p className="font-bold">Time:</p>
                <p className="border px-12 py-1 rounded">{habit?.timeOfDay}</p>
            </div>
            <div className="flex items-center gap-4">
                <p className="font-bold">Duration:</p>
                <p className="border px-12 py-1 rounded">{habit?.duration} minutes</p>
            </div>
        </div>
            <div className="flex gap-6 mt-7">
                <Button type="primary" textSize="text-md" size="sm">Update</Button>
                <Button handleClick={handleDeleteHabit} type="alert" textSize="text-md" size="sm">Delete</Button>
            </div>
        </div>
       
      </Modal>
    )
}

export default HabitDetails;