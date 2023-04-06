import DatatableAlternative from "@common/datatable.alternative";
import LoaderComponent from "@common/loader.component";
import DefaultLayout from "@layouts/default-layout.component";

import {getString} from "configs/strings";
import {useGetUsersQuery, User} from "gql/generated/graphql";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";

function Users(props) {
    const router = useRouter();

    const [usersList, setUsersList] = useState<User[]>();

    const {loading, refetch} = useGetUsersQuery({
        onCompleted: (data) => {
            setUsersList(data.allUsers as User[]);
        },
    });

    useEffect(() => {
        refetch();
    }, [refetch]);


    if (loading) {
        return <LoaderComponent/>;
    }
    return (
        <DefaultLayout isBackable={true} heading={getString("users")}>

            <DatatableAlternative
                onRowClicked={(row) => {
                    router.push(`/modules/users/${row.id}`);
                }}
                data={usersList?.map((user) => {
                    return {
                        id: user.id,
                        name: user.names,
                        email: user.email,
                        role: user.Role?.name,
                    };
                })}
            />

        </DefaultLayout>
    )
}


export default Users;
