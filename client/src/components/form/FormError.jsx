import { Alert } from "@chakra-ui/react"

export default function FormError({ error }) {
  return (
      <Alert status="error" rounded="md">
        {error}
      </Alert>
  )
}
