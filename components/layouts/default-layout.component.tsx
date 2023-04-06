import ButtonIconComponent from "@common/button-icon.component";
import DrawerComponent from "@common/drawer/drawer.component";
import { ArrowBackIcon, MoonIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Heading,
  HStack,
  IconButton,
  Spacer,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { FiMenu, FiSun } from "react-icons/fi";
import { AiOutlineMenu } from "react-icons/ai";

interface DefaultLayoutProps {
  heading: string;
  showMenu?: boolean;
  isBackable?: boolean;
  drawerTitle?: string;
  children?: React.ReactNode;
}

const DefaultLayout = ({
  heading,
  isBackable = false,
  showMenu = true,
  drawerTitle,
  children,
}: DefaultLayoutProps) => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { colorMode, toggleColorMode } = useColorMode();
  const router = useRouter();
  return (
    <Box m={0} p={4} h={"100vh"}>
      <HStack pb={5}>
        {isBackable ? (
          <Button onClick={() => router.back()}>
            <ArrowBackIcon />
          </Button>
        ) : (
          <Heading>{heading}</Heading>
        )}
        <Spacer />
        <IconButton
          aria-label="theme"
          onClick={toggleColorMode}
          icon={colorMode === "light" ? <MoonIcon /> : <FiSun />}
        />

        {showMenu == true ? (
          <Button onClick={onOpen}>
            <AiOutlineMenu />
          </Button>
        ) : null}
      </HStack>
      <Head>
        <title>{heading}</title>
      </Head>
      <HStack>
        {isBackable ? <Heading>{heading}</Heading> : null}
        <Spacer />
      </HStack>
      <DrawerComponent
        title={drawerTitle ? drawerTitle : "Menu"}
        isOpen={isOpen}
        onClose={onClose}
      />

      <Spacer h={5} />
      <Box p={4}>{children}</Box>
    </Box>
  );
};

export default DefaultLayout;
