import * as yup from "yup";
import { prisma } from "services";
import { User } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import NextCors from "nextjs-cors";
import bcrypt from "bcrypt";

const userValidationSchema = yup.object().shape({
  names: yup.string().required(),
  firstname: yup.string().required(),
  lastname: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().required().min(8),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextCors(req, res, {
    methods: ["POST"],
    origin: "*",
  });
  if (req.method == "POST") {
    const data = req.body as User;

    // Validate user input
    const isValidUser = await isValid(data, userValidationSchema);

    //Verify if user input is valid
    if (isValidUser != null) {
      res.status(400).json({ errors: isValidUser });
      res.end();
      return;
    }

    //Destructure user data
    const { names, firstname, lastname, email, password } = data;

    // Generate salt
    const salt = await bcrypt.genSalt();

    // Hash password
    const encryptedPassword = await bcrypt.hash(password, salt);

    //Create user
    try {
      await prisma.user.create({
        data: {
          names,
          firstname,
          lastname,
          email,
          password: encryptedPassword,
        },
      });
      res.status(201).json({ message: "Usuario registrado correctamente" });
      res.end();
      return;
    } catch (error: any) {
      res.status(400).json({ error: "El email de usuario ya esta en uso" });
      if (error.code === "P2002") {
        res.status(400).json({
          error: "Email ya esta en uso",
        });
        return;
      }

      res.status(500).json({ error: "Internal server error", message: error });
      return;
    }
  }
}

//Validate data input with yup
async function isValid(data: any, schema: yup.AnyObjectSchema) {
  try {
    await schema.validate(data);
    return null;
  } catch (e: any) {
    return e.errors;
  }
}
