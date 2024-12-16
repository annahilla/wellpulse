import { IoIosAlert } from "react-icons/io";

const ErrorMessage = ({ text } : { text: string }) => {
    return (
        <div className="flex gap-2 items-start justify-start text-left text-red-600 text-sm">
            <IoIosAlert className="mt-1" />
            <p>{text}</p>
        </div>
    )
}

export default ErrorMessage;