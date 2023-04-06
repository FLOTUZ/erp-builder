import Link from "next/link";
import { useContext } from "react";
import {
  Box,
  Center,
  Drawer,
  Text,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";

import { AuthContext } from "context/auth.provider";
import DrawerButtonComponent from "./drawer-button.component";

interface Route {
  title: string;
  path: string;
  roles: string[];
}

export const routes: Route[] = [
  {
    title: "Usuarios",
    path: "/modules/users",
    roles: ["DEVELOPER", "ADMIN"],
  },
  {
    title: "Permisos",
    path: "/modules/permisos",
    roles: ["DEVELOPER", "ADMIN"],
  },
  {
    title: "Configuraciones",
    path: "/modules/config",
    roles: ["DEVELOPER", "ADMIN"],
  },
];

interface DrawerComponentProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
}

const DrawerComponent = ({ onClose, isOpen, title }: DrawerComponentProps) => {
  const { role, user } = useContext(AuthContext);

  return (
    <Drawer isOpen={isOpen} onClose={onClose} placement="right">
      <DrawerOverlay />
      <DrawerContent>
        <DrawerHeader borderBottomWidth="1px">{title}</DrawerHeader>
        <DrawerBody>
          {routes.map((route, index) =>
            route.roles.includes(role?.name!) ? (
              <Link
                key={index}
                href={route.path}
                style={{
                  listStyle: "none",
                }}
              >
                <a>
                  <Box
                    mt={"0.5rem"}
                    w={"100%"}
                    h={"3rem"}
                    textAlign="center"
                    _hover={{
                      bgColor: "white",
                      color: "black",
                      shadow: "2xl",
                      cursor: "pointer",
                    }}
                  >
                    <Center h="100%">
                      <Text fontWeight={"bold"}>{route.title}</Text>
                    </Center>
                  </Box>
                </a>
              </Link>
            ) : null
          )}
          <Link href={"/modules/about"}>
            <a>
              <DrawerButtonComponent title="Sobre nosotros" />
            </a>
          </Link>
          <Link href={"/modules/solutions"}>
            <a>
              <DrawerButtonComponent title="Soluciones" />
            </a>
          </Link>

          {user != null ? (
            <DrawerButtonComponent
              title="Logout"
              onClick={() => {
                localStorage.clear();
                window.location.href = "/auth/login";
              }}
            />
          ) : (
            <>
              <DrawerButtonComponent
                title="Iniciar sesion"
                onClick={() => {
                  window.location.href = "/auth/login";
                }}
              />
            </>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default DrawerComponent;
