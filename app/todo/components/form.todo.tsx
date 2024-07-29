"use client";

import toast from "react-hot-toast";

import { useRef } from "react";
import { createTodo } from "../actions/todo.actions";
import ButtonForm from "./button-form.todo";

const FormTodo = () => {
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = async (data: FormData) => {
        const title = data.get("title") as string;

        // validaciones del frontend
        if (!title || !title.trim()) {
            return toast.error("Title is Required.");
        }

        const res = await createTodo(title);

        if (res?.error) {
            return toast.error(res.error);
        }

        formRef.current?.reset();

        toast.success("Todo Added");
    };

    return (
        <form
            ref={formRef}
            action={handleSubmit}
            className="flex"
        >
            <input
                type="text"
                name="title"
                className="border border-gray-400 rounded p-2 mr-2 w-full"
            />
            <ButtonForm />
        </form>
    );
};
export default FormTodo;
