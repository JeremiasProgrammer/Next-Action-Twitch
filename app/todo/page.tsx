import { prisma } from "@/libs/prismadb";
import FormTodo from "./components/form.todo";
import ListTodo from "./components/list.todo";

const TodoPage = async () => {
    const todos = await prisma.todo.findMany();

    return (
        <div className="space-y-5">
            <h1 className="text-center text-3xl my-10">TodoPage</h1>
            <FormTodo />
            {/* <pre>{JSON.stringify(todos, null, 2)}</pre> */}
            <ListTodo todos={todos} />
        </div>
    );
};
export default TodoPage;
