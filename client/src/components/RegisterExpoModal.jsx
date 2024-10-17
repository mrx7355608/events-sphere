import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    InputGroup,
    Stack,
    Button,
} from "@chakra-ui/react";

const RegisterExpoModal = (props) => {
    return (
        <Modal isOpen={props.isOpen} onClose={props.onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Register Expo</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <Stack spacing={4} minW="20rem">
                        <FormControl id="company" isRequired>
                            <FormLabel>Company</FormLabel>
                            <Input type="text" />
                        </FormControl>
                        <FormControl id="services" isRequired>
                            <FormLabel>Services</FormLabel>
                            <Input type="text" />
                        </FormControl>
                        <FormControl id="documents" isRequired>
                            <FormLabel>Documents</FormLabel>
                            <InputGroup>
                                <Input type="file" />
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={"blue.400"}
                                color={"white"}
                                _hover={{
                                    bg: "blue.500",
                                }}
                            >
                                Submit
                            </Button>
                        </Stack>
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default RegisterExpoModal;
