import {
  Badge,
  Box,
  Button,
  HStack,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import LoaderComponent from "@common/loader.component";
import DefaultLayout from "@layouts/default-layout.component";
import { AppRoutes } from "configs/routes";
import { getString } from "configs/strings";
import {
  useDeleteUserMutation,
  useGetUserByIdQuery,
  User,
} from "gql/generated/graphql";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function UserById() {
  const router = useRouter();
  const [user, setUser] = useState<User>();

  const { id } = router.query;

  const { loading, refetch } = useGetUserByIdQuery({
    variables: {
      id: Number(id),
    },
    onCompleted: (data) => {
      setUser(data.userById as User);
    },
  });

  const [deleteUser, { loading: isDeletingUser }] = useDeleteUserMutation({
    variables: {
      id: Number(id),
    },
  });

  useEffect(() => {
    refetch({ id: Number(id) });
  }, [id, refetch]);

  if (id === undefined){
    return <LoaderComponent />;
  }

  if (loading) {
    return <LoaderComponent />;
  }
  return (
    <DefaultLayout isBackable={true} heading={`${getString("user")} ${id}`}>
      <SimpleGrid columns={[1]} spacing={8}>
        <Box>
          <Text as={"b"}>{getString("names").toUpperCase()}</Text>
          <Text>{user?.names}</Text>
        </Box>

        <Box>
          <Text as={"b"}>{getString("firstname_lastname").toUpperCase()}</Text>
          <Text>
            {user?.firstname} {user?.lastname}
          </Text>
        </Box>

        <Box>
          <Text as={"b"}>{getString("email").toUpperCase()}</Text>
          <Text>{user?.email}</Text>
        </Box>

        <Box>
          <Text as={"b"}>{getString("about_user").toUpperCase()}</Text>
          <Text>{user?.about_user ?? "Sin descripcion"}</Text>
        </Box>

        <Box>
          <Text as={"b"}>{getString("status").toUpperCase()}</Text>
          <div>
            {user?.is_active ? (
              <Badge colorScheme={"green"}>ACTIVO</Badge>
            ) : (
              <Badge colorScheme={"red"}>INACTIVO</Badge>
            )}
          </div>
        </Box>
        <VStack alignItems={"flex-start"}>
          <Text as={"b"}>{getString("role").toUpperCase()}</Text>
          {user?.Role?.name ? (
            <Badge
              colorScheme={"blue"}
              onClick={() =>
                router.push({
                  pathname: AppRoutes.ROLES.roleShow,
                  query: { id: user?.Role?.id },
                })
              }
            >
              {user?.Role?.name}
            </Badge>
          ) : (
            <Badge colorScheme={"red"}>Sin rol</Badge>
          )}
        </VStack>
      </SimpleGrid>
      <HStack mt={8}>
        <Button
          colorScheme={"red"}
          onClick={() => {
            confirm("¿Estas seguro de eliminar este usuario?")
              ? deleteUser()
              : null;
          }}
        >
          Eliminar
        </Button>

        <Button
          colorScheme={"blue"}
          onClick={() =>
            router.push({
              pathname: AppRoutes.USERS.userEdit,
              query: { id },
            })
          }
        >
          Editar
        </Button>
      </HStack>
    </DefaultLayout>
  );
}

export default UserById;
