"use client";

import { useFormStatus } from "react-dom";
import { FaSpinner } from "react-icons/fa";

const ButtonForm = () => {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            className="border border-gray-400 bg-white rounded p-2 w-28 grid place-items-center font-black"
        >
            {pending ? (
                <span className="block animate-spin">
                    <FaSpinner className="transform rotate-90" />
                </span>
            ) : (
                "Add"
            )}
        </button>
    );
};
export default ButtonForm;
