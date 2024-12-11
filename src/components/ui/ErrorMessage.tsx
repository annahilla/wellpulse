import { IoIosAlert } from "react-icons/io";

const ErrorMessage = ({ text } : { text: string }) => {
    return (
        <div className="flex gap-2 items-center text-red-600 text-md">
            <IoIosAlert />
            <p>{text}</p>
        </div>
    )
}

export default ErrorMessage;