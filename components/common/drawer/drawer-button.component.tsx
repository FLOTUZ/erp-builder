import { Box, Center, Text } from "@chakra-ui/react";

interface DrawerButtonComponentProps {
  title: string;
  onClick?: () => void;
}

function DrawerButtonComponent({ title, onClick }: DrawerButtonComponentProps) {
  return (
    <Box
      onClick={onClick}
      style={{
        listStyle: "none",
      }}
      mt={"0.5rem"}
      w={"100%"}
      h={"3rem"}
      textAlign="center"
      _hover={{
        bgColor: "white",
        color: "black",
        shadow: "2xl",
        cursor: "pointer",
        border: "1px",
      }}
    >
      <Center h="100%">
        <Text fontWeight={"bold"}>{title}</Text>
      </Center>
    </Box>
  );
}

export default DrawerButtonComponent;
