import { axiosClient } from "./axios-client.service";

interface ILogin {
  email: string;
  password: string;
}

interface IRegister {
  names: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export const login = async ({ email, password }: ILogin) => {
  const response = await axiosClient().post("/auth/login", {
    email,
    password,
  });

  return response;
};

export const signup = async ({
  names,
  firstname,
  lastname,
  email,
  password,
}: IRegister) => {
  const response = await axiosClient().post("/auth/signup", {
    names,
    firstname,
    lastname,
    email,
    password,
  });

  return response;
};
