import { useRef } from "react";
import {
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Button,
} from "@chakra-ui/react";
import { useAuth0 } from "@auth0/auth0-react";

const InvalidAuthDialog = () => {
  const { onOpen, onClose } = useDisclosure();
  const cancelRef = useRef() as any;
  const { loginWithRedirect } = useAuth0() as any;
  const handleOpen = () => {
    onOpen();
  };
  const attempt = false;
  return (
    <AlertDialog
      isOpen={attempt}
      leastDestructiveRef={cancelRef}
      onClose={onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Iniciar sesión
          </AlertDialogHeader>
          <AlertDialogBody>
            Para poder acceder a esta sección es necesario que inicies sesión.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={handleOpen}>
              Cancelar
            </Button>
            <Button colorScheme="orange" onClick={loginWithRedirect} ml={3}>
              Iniciar sesión
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};
export default InvalidAuthDialog;
