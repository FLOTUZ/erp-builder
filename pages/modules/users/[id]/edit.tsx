import {
  Box,
  Button,
  Container,
  HStack,
  SimpleGrid,
  Switch,
  Text,
  useToast,
} from "@chakra-ui/react";
import LoaderComponent from "@common/loader.component";
import SelectComponent from "@forms/select.component";
import TextFieldComponent from "@forms/text-field.component";
import DefaultLayout from "@layouts/default-layout.component";
import { getString } from "configs/strings";
import { useFormik } from "formik";
import {
  Role,
  useGetRolesQuery,
  useGetUserByIdQuery,
  User,
  useUpdateUserMutation,
} from "gql/generated/graphql";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function EditUser() {
  const toast = useToast();
  const router = useRouter();
  const { id } = router.query;

  const [user, setUser] = useState<User>();
  const [roleList, setRoleList] = useState<Role[]>([]);

  const { refetch, loading: userLoading } = useGetUserByIdQuery({
    variables: {
      id: Number(id),
    },
    onCompleted: (data) => {
      setUser(data.userById as User);
    },
  });

  const { loading: roleLoading } = useGetRolesQuery({
    onCompleted: (data) => {
      setRoleList(data.allRoles as Role[]);
    },
  });

  const [updateUser] = useUpdateUserMutation({
    onCompleted: (data) => {
      if (data.updateUser) {
        toast({
          title: "Usuario actualizado",
          description: "El usuario se actualizó correctamente",
          status: "success",
          duration: 9000,
          isClosable: true,
        });
        router.back();
      }
    },
  });

  const formController = useFormik({
    initialValues: {
      names: undefined,
      firstname: undefined,
      lastname: undefined,
      email: undefined,
      password: undefined,
      about_user: undefined,
      is_active: undefined,
      roleId: undefined,
    },
    onSubmit: (values) => {
      updateUser({
        variables: {
          idUser: user?.id!,
          names: values.names,
          firstname: values.firstname,
          lastname: values.lastname,
          email: values.email,
          password: values.password,
          is_active: values.is_active,
          about_user: values.about_user,
          roleId: values.roleId ?? Number(values.roleId),
        },
      });
    },
  });

  useEffect(() => {
    refetch({ id: Number(id) });
  }, [id, refetch]);

  if (userLoading || roleLoading) {
    return <LoaderComponent />;
  }

  return (
    <DefaultLayout isBackable={true} heading={getString("edit_user")}>
      <Container>
        <form onSubmit={formController.handleSubmit}>
          <TextFieldComponent
            label={getString("names")}
            name="names"
            type={"text"}
            defaultValue={user?.names!}
            handleChange={(e) => formController.handleChange(e)}
          />

          <TextFieldComponent
            label={getString("firstname")}
            name="firstname"
            type={"text"}
            defaultValue={user?.firstname!}
            handleChange={(e) => formController.handleChange(e)}
          />

          <TextFieldComponent
            label={getString("lastname")}
            name="lastname"
            type={"text"}
            defaultValue={user?.lastname!}
            handleChange={(e) => formController.handleChange(e)}
          />

          <TextFieldComponent
            label={getString("email")}
            name="email"
            type={"email"}
            defaultValue={user?.email!}
            handleChange={(e) => formController.handleChange(e)}
          />

          <TextFieldComponent
            label={getString("password")}
            name="password"
            type={"password"}
            handleChange={(e) => formController.handleChange(e)}
          />

          <TextFieldComponent
            label={getString("about_user")}
            name="about_user"
            type={"text"}
            defaultValue={user?.about_user! || "Sin descripción"}
            handleChange={(e) => formController.handleChange(e)}
          />

          <SelectComponent
            label={getString("role")}
            name={"roleId"}
            placeholder={"Selecciona un rol"}
            defaultValue={user?.Role?.id!.toString()}
            handleChange={(e) => formController.handleChange(e)}
          >
            {roleList?.map((role) => (
              <option key={role.id} value={role.id!}>
                {role.name}
              </option>
            ))}
          </SelectComponent>

          <Box>
            <Text fontWeight={"bold"}>{getString("is_active")}</Text>
            <Switch
              name="is_active"
              size={"lg"}
              defaultChecked={user?.is_active!}
              onChange={(e) => formController.handleChange(e)}
            />
          </Box>

          <Button type="submit" colorScheme={"green"} mt={4} mb={4}>
            {getString("save")}
          </Button>
        </form>
      </Container>
    </DefaultLayout>
  );
}

export default EditUser;
