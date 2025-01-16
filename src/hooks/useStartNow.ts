import { useNavigate } from "react-router";

export const useStartNow = () => {
  const navigate = useNavigate();

  const handleStartNow = () => {
      navigate("/calendar", {
        state: { isFormModalOpen: true },
      });
  };

  return handleStartNow;
};