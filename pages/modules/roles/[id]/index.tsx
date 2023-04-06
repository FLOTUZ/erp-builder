import {getString} from "configs/strings";
import DefaultLayout from "@layouts/default-layout.component";
import {useRouter} from "next/router";
import {Role, useDeleteRoleMutation, useGetRoleByIdQuery} from "gql/generated/graphql";
import LoaderComponent from "@common/loader.component";
import {useState} from "react";
import {Box, Button, HStack, SimpleGrid, Text} from "@chakra-ui/react";
import {AppRoutes} from "configs/routes";

function RoleById() {
    const router = useRouter();
    const {id} = router.query;

    const [role, setRole] = useState<Role>();

    const {loading} = useGetRoleByIdQuery({
        variables: {
            id: Number(id)
        },
        onCompleted: (data) => {
            setRole(data.roleById as Role);
        }
    });

    const [ deleteRole, { loading: isDeletingRole }] = useDeleteRoleMutation({
        variables: {
            id: Number(id)
        },
        onCompleted: () => {
            router.back();
        }
    });

    if (loading || isDeletingRole) {
        return <LoaderComponent/>;
    }

    return (
        <DefaultLayout isBackable={true} heading={getString(`Role ${id}`)}>
            <SimpleGrid columns={[1]} spacing={8}>
                <Box>
                    <Text as={"b"}>{getString("role_name").toUpperCase()}</Text>
                    <Text>{role?.name}</Text>
                </Box>

                <Box>
                    <Text as={"b"}>{getString("role_description").toUpperCase()}</Text>
                    <Text>{role?.description}</Text>
                </Box>

                <Box>
                    <Text as={"b"}>{getString("role_is_deleted").toUpperCase()}</Text>
                    <Text>{role?.is_deleted ? "Si" : "No"}</Text>
                </Box>

                <Box>
                    <Text as={"b"}>{getString("created_at").toUpperCase()}</Text>
                    <Text>{role?.createdAt}</Text>
                </Box>

                <Box>
                    <Text as={"b"}>{getString("created_at").toUpperCase()}</Text>
                    <Text>{role?.updatedAt ? role.updatedAt : "No hay fecha"}</Text>
                </Box>


            </SimpleGrid>

            <HStack mt={8}>
                <Button
                    colorScheme={"red"}
                    onClick={() => {
                        confirm("¿Estas seguro de eliminar este rol?")
                            ? deleteRole()
                            : null;
                    }}
                >
                    Eliminar
                </Button>

                <Button
                    colorScheme={"blue"}
                    onClick={() =>
                        router.push({
                            pathname: AppRoutes.ROLES.roleEdit,
                            query: {id},
                        })
                    }
                >
                    Editar
                </Button>
            </HStack>
        </DefaultLayout>
    )
}

export default RoleById