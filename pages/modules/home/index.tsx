import { Center, Container, SimpleGrid, Text } from "@chakra-ui/react";

import DefaultLayout from "@layouts/default-layout.component";
import Link from "next/link";

import { RiShieldUserFill, RiSettings3Fill } from "react-icons/ri";
import { MdSecurity } from "react-icons/md";

interface Route {
  title: string;
  icon: any;
  path: string;
  roles: string[];
}
function Home() {
  const routes: Route[] = [
    {
      title: "Usuarios",
      icon: <RiShieldUserFill size={35} />,
      path: "/modules/users",
      roles: ["ADMIN"],
    },
    {
      title: "Configuraciones",
      path: "/modules/config",
      icon: <RiSettings3Fill size={35} />,
      roles: ["ADMIN"],
    },
    {
      title: "Roles",
      path: "/modules/roles",
      icon: <MdSecurity size={35} />,
      roles: ["ADMIN"],
    },
  ];

  return (
    <DefaultLayout heading="ERP BUILDER" drawerTitle="Menu" showMenu={true} isBackable={false}>
      <Center>
        <SimpleGrid columns={[1, 2, 3, 4]} spacing={16}>
          {routes.map((route, index) => (
            <Link href={route.path} key={index}>
              <a>
                <Container
                  p={4}
                  shadow="md"
                  bgColor={"primary"}
                  _hover={{
                    backgroundColor: "black",
                    cursor: "pointer",
                    color: "white",
                    shadow: "lg",
                  }}
                >
                  {route.icon}
                  <Text fontSize={"lg"}>{route.title}</Text>
                </Container>
              </a>
            </Link>
          ))}
        </SimpleGrid>
      </Center>
    </DefaultLayout>
  );
}

export default Home;
