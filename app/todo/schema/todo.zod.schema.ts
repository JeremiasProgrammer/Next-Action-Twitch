import { z } from 'zod';

export const TodoZodSchema = z.object({
    title: z
    .string()
    .trim()
    .min(1, {
        message: "Debe escribir al menos 1 caracter"
    })
    .max(100, {
        message: "El titulo no debe superar los 100 caracteres"
    })
    .nonempty({
        message: "El titulo es requerido"
    })
});
