import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validations";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Revisa los campos del formulario.", errors: parsed.error.flatten().fieldErrors },
        { status: 400 },
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    const contactEmail = process.env.CONTACT_EMAIL;

    if (!apiKey || !contactEmail) {
      return NextResponse.json(
        { message: "El envio de correos no esta configurado. Define RESEND_API_KEY y CONTACT_EMAIL." },
        { status: 503 },
      );
    }

    const resend = new Resend(apiKey);
    const { name, email, message } = parsed.data;

    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [contactEmail],
      replyTo: email,
      subject: `Nuevo contacto desde el portafolio: ${name}`,
      text: `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`,
    });

    if (error) {
      return NextResponse.json(
        { message: "No se pudo enviar el mensaje. Intentalo nuevamente." },
        { status: 500 },
      );
    }

    return NextResponse.json({ message: "Mensaje enviado correctamente. Te respondere pronto." });
  } catch {
    return NextResponse.json(
      { message: "Ocurrio un error inesperado al procesar el mensaje." },
      { status: 500 },
    );
  }
}
