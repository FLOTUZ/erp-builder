import Head from "next/head";
import { useContext } from "react";

import { getString } from "configs/strings";
import { AuthContext } from "context/auth.provider";

import {
  Button,
  Heading,
  HStack,
  SimpleGrid,
  Spacer,
  useDisclosure,
} from "@chakra-ui/react";

import { AiOutlineMenu } from "react-icons/ai";
import DrawerComponent from "@common/drawer/drawer.component";

function Index() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { role, user } = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>{getString("pageTitle")}</title>
      </Head>

      <SimpleGrid p={8}>
        <HStack>
          <Heading>{getString("pageTitle")}</Heading>

          <Spacer />
          <Button onClick={onOpen}>
            <AiOutlineMenu />
          </Button>
        </HStack>
      </SimpleGrid>
      <DrawerComponent title={"Menu"} isOpen={isOpen} onClose={onClose} />
    </>
  );
}

export default Index;
