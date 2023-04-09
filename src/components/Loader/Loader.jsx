import { Spinner } from '@chakra-ui/react';

const Loader = () => {
    return (
        <Spinner
            thickness='.3rem'
            speed='0.65s'
            emptyColor='gray.200'
            color='orange'
            size='xl'
        />
    );
};
export default Loader;