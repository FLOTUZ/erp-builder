import TextFieldComponent from "@forms/text-field.component";
import * as Yup from "yup";
import { Center, Container, Heading, Button, useToast } from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { signup } from "services/auth.service";
import Head from "next/head";

function Singup() {
  const toast = useToast();

  const router = useRouter();

  const { handleChange, handleSubmit, errors, touched } = useFormik({
    initialValues: {
      names: null,
      firstname: null,
      lastname: null,
      email: null,
      password: null,
    },
    validationSchema: Yup.object({
      names: Yup.string().required("El nombre es requerido").nullable(),
      firstname: Yup.string().required("El apellido es requerido").nullable(),
      lastname: Yup.string().required("El apellido es requerido").nullable(),
      email: Yup.string().required("El correo es requerido").nullable(),
      password: Yup.string().required("La contraseña es requerida").nullable(),
    }),
    onSubmit: async (values) => {
      console.log({ a: values });

      try {
        const response = await signup({
          names: values.names!,
          firstname: values.firstname!,
          lastname: values.lastname!,
          email: values.email!,
          password: values.password!,
        });

        if (response.status === 201) {
          toast({
            title: "Usuario creado",
            description: "Se ha creado el usuario correctamente",
            status: "success",
            isClosable: true,
            duration: 7000,
          });
          router.push("/");
        }
      } catch (error: any) {
        toast({
          title: "Error",
          description: error.response.data.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      }
    },
  });
  return (
    <>
      <Head>
        <title> Registro </title>
      </Head>
      <Center height={"100vh"}>
        <Container>
          <Heading>Registro</Heading>
          <form onSubmit={handleSubmit} autoSave={"on"}>
            <TextFieldComponent
              name={"names"}
              type="text"
              label="Nombres"
              isRequired={true}
              handleChange={handleChange}
              errors={errors.names}
              touched={touched.names}
            />

            <TextFieldComponent
              name={"firstname"}
              type="text"
              label="Apellido Paterno"
              isRequired={true}
              handleChange={handleChange}
              errors={errors.firstname}
              touched={touched.firstname}
            />

            <TextFieldComponent
              name={"lastname"}
              type="text"
              label="Apellido Materno"
              isRequired={true}
              handleChange={handleChange}
              errors={errors.lastname}
              touched={touched.lastname}
            />

            <TextFieldComponent
              name={"email"}
              type="email"
              label="Email"
              isRequired={true}
              handleChange={handleChange}
              errors={errors.email}
              touched={touched.email}
            />

            <TextFieldComponent
              name={"password"}
              type="password"
              label="Password"
              isRequired={true}
              handleChange={handleChange}
              errors={errors.password}
              touched={touched.password}
            />

            <Button
              mt={8}
              w={"100%"}
              h={"4rem"}
              type="submit"
              colorScheme={"blue"}
            >
              Registrar usuario
            </Button>
          </form>
        </Container>
      </Center>
    </>
  );
}

export default Singup;
