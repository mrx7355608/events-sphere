import { useToast } from "@chakra-ui/react";
import React from "react";

export default function useToastUtils() {
    const toast = useToast({
        duration: 5000,
        isClosable: true,
        position: "bottom",
        variant: "left-accent",
    });

    const showSuccessToast = (message) => {
        toast({
            description: message,
            status: "success",
        });
    };

    const showErrorToast = (message) => {
        toast({
            description: message,
            status: "error",
        });
    };

    return { showErrorToast, showSuccessToast };
}
