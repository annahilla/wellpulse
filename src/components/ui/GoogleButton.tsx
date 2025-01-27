import { FcGoogle } from "react-icons/fc";

const GoogleButton = ({ onClick }: { onClick: () => void }) => (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center justify-start gap-2 my-4 border border-light-grey px-3 py-2 text-sm shadow-sm rounded"
    >
      <FcGoogle size={22} />
      Continue with Google
    </button>
  );

  export default GoogleButton;