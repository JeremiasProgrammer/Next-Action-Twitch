"use server";

import { prisma } from "@/libs/prismadb";
import { revalidatePath } from "next/cache";

import { ZodError } from "zod";
import { TodoZodSchema } from "../schema/todo.zod.schema";

import { auth } from '@clerk/nextjs/server';

export interface TodoResponse {
    success: boolean;
    message: string;
}

export const createTodo = async (title: string): Promise<TodoResponse> => {

    const {userId} : {userId: string | null} = auth();

    if(!userId) { 
        return{
            success: false,
            message: "User not found (backend)",
        }
    }

    try {

        TodoZodSchema.parse ({title});

        await prisma.todo.create({ 
            data: { 
                title,
                userId,
            } 
        });
        revalidatePath("/todo");
        return {
            success: true,
            message: "Todo creado con exito (backend)"
        }
    }catch(error) {

        if (error instanceof ZodError) {
            return {
                success: false,
                message: error.issues[0].message + " (backend)",
            };
        }

        return {
            success: false,
            message: "Error creating todo (backend)"
        }
    }

};

export const removeItem = async (id: string) => {
    if (!id || !id.trim()) return { error: "Id is required (backend)" };
  
    try {
      await prisma.todo.delete({ where: { id } });
      revalidatePath("/todo");
      return {
        success: "Todo deleted successfully",
      };
    } catch (error) {
      return {
        error: "Something went wrong",
      };
    }
};