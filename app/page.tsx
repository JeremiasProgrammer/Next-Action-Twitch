import FormTodo from "@/app/todo/components/form.todo";
import ListTodo from "@/app/todo/components/list.todo";
import { prisma } from "@/libs/prismadb";

import type { User } from "@clerk/nextjs/server";
import { currentUser } from "@clerk/nextjs/server";
import Header from "./todo/components/Header";

const TodoPage = async () => {
    const user: User | null = await currentUser();

    if (!user) {
        return <div>Loading...</div>;
    }

    const todos = await prisma.todo.findMany({
        where: {
            userId: user.id,
        },
    });

    return (
        <div className="space-y-5 ">
            <Header />

            <h1 className="text-center text-3xl my-10 text-white">
                Todos: {user.username}
            </h1>
            <FormTodo />
            {/* <pre>{JSON.stringify(todos, null, 2)}</pre> */}
            <ListTodo todos={todos} />
        </div>
    );
};
export default TodoPage;
