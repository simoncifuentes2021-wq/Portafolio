import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Ingresa al menos 2 caracteres."),
  email: z.string().email("Ingresa un correo valido."),
  message: z.string().min(10, "El mensaje debe tener al menos 10 caracteres."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;
