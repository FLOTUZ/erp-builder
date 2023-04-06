import {
    Box,
    Button,
    Container, FormControl, FormLabel,
    Switch,
    Text, Textarea,
    useToast,
} from "@chakra-ui/react";
import LoaderComponent from "@common/loader.component";
import SelectComponent from "@forms/select.component";
import TextFieldComponent from "@forms/text-field.component";
import DefaultLayout from "@layouts/default-layout.component";
import {getString} from "configs/strings";
import {useFormik} from "formik";
import {
    Role,
    useGetRoleByIdQuery,
    useGetRolesQuery, useUpdateRoleMutation,
    useUpdateUserMutation,
} from "gql/generated/graphql";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import TextAreaComponent from "@forms/text-area.component";

function EditRole() {
    const toast = useToast();
    const router = useRouter();
    const {id} = router.query;

    const [role, setRole] = useState<Role>();

    const {refetch, loading: roleLoading} = useGetRoleByIdQuery({
        variables: {
            id: Number(id),
        },
        onCompleted: (data) => {
            setRole(data.roleById as Role);
        },
    });


    const [updateUser] = useUpdateRoleMutation({
        onCompleted: (data) => {
            if (data.updateRole) {
                toast({
                    title: "Rol actualizado",
                    description: "El rol se actualizó correctamente",
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
            name: undefined,
            description: undefined,
        },
        onSubmit: (values) => {
            updateUser({
                variables: {
                    id: Number(id),
                    name: values.name,
                    description: values.description,
                },
            });
        },
    });

    useEffect(() => {
        refetch({id: Number(id)});
    }, [id, refetch]);

    if (roleLoading) {
        return <LoaderComponent/>;
    }

    return (
        <DefaultLayout isBackable={true} heading={getString("edit_role")}>
            <Container>
                <form onSubmit={formController.handleSubmit}>
                    <TextFieldComponent
                        label={getString("name")}
                        name="name"
                        type={"text"}
                        defaultValue={role?.name!}
                        handleChange={(e) => formController.handleChange(e)}
                    />

                    <TextAreaComponent
                        name={"description"}
                        label={getString("role_description")}
                        defaultValue={role?.description!}
                        handleChange={
                            (e) => formController.handleChange(e)
                        }/>

                    <Button type="submit" colorScheme={"green"} mt={4} mb={4}>
                        {getString("save")}
                    </Button>
                </form>
            </Container>
        </DefaultLayout>
    );
}

export default EditRole;
