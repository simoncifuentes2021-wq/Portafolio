import { z } from "zod";
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Ingresa al menos 2 caracteres.")
    .max(100, "Usa hasta 100 caracteres."),
  email: z
    .string()
    .trim()
    .email("Ingresa un correo válido.")
    .max(254, "El correo es demasiado largo."),
  message: z
    .string()
    .trim()
    .min(10, "El mensaje debe tener al menos 10 caracteres.")
    .max(5000, "Usa hasta 5000 caracteres."),
});
export type ContactFormValues = z.infer<typeof contactSchema>;
