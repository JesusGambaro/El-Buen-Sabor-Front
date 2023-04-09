import { useRef } from 'react';
import { useDisclosure, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { setAttempt } from '@redux/reducers/mainReducer';
import { useAuth0 } from '@auth0/auth0-react';
const InvalidAuthDialog = () => {
    const distpatch = useDispatch();
    const { attempt } = useSelector((state) => state.auth);
    const { onOpen, onClose } = useDisclosure();
    const cancelRef = useRef();
    const { loginWithRedirect } = useAuth0();

    const handleOpen = () => {
        onOpen();
        distpatch(setAttempt(false));
    };

    return (
        <AlertDialog
            isOpen={attempt}
            leastDestructiveRef={cancelRef}
            onClose={onClose}
        >
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        Iniciar sesión
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        Para poder acceder a esta sección es necesario que inicies sesión.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={handleOpen}>
                            Cancelar
                        </Button>
                        <Button colorScheme='orange' onClick={loginWithRedirect} ml={3}>
                            Iniciar sesión
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>
        </AlertDialog>
    );
};
export default InvalidAuthDialog;