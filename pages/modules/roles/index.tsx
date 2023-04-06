import DefaultLayout from "@layouts/default-layout.component";
import LoaderComponent from "@common/loader.component";
import DatatableAlternative from "@common/datatable.alternative";
import {useEffect, useState} from "react";
import {getString} from "configs/strings";
import {Role, useGetRolesQuery} from "gql/generated/graphql";
import {useRouter} from "next/router";

function Roles() {

    const router = useRouter();
    const [rolesList, setRolesList] = useState<Role[]>();

    const {loading, refetch} = useGetRolesQuery({
        onCompleted: (data) => {
            setRolesList(data.allRoles as Role[]);
        }
    });

    useEffect(() => {
        refetch();
    }, [rolesList]);

    if (loading) {
        return <LoaderComponent/>;
    }

    return (
        <DefaultLayout isBackable={true} heading={getString("Roles")}>
            <DatatableAlternative
                onRowClicked={(row) => {
                    router.push(`/modules/roles/${row.id}`);
                }}
                data={rolesList?.map((role) => {
                    return {
                        id: role.id,
                        name: role.name,
                        description: role.description,
                        is_Deleted: role.is_deleted ? "Si" : "No",
                        created_At: role.createdAt,
                        updated_At: role.updatedAt,
                    };
                })}
            />
        </DefaultLayout>
    )
}

export default Roles