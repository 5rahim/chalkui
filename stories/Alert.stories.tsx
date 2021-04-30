import { Alert, AlertCloseButton, AlertDescription, AlertIcon, AlertTitle } from "../chalk/Components/Alert"
import React                                                                from "react"
import { VStack }                                                           from '../chalk/Components/Layout/Stack'

export default {
   title: 'Feedback/Alert',
   components: [Alert],
   subcomponents: { Alert },
}

export const Base = () => (
   <Alert status="error">
      <AlertIcon />
      <AlertTitle mr={2}>This is an alert!</AlertTitle>
      <AlertDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit?</AlertDescription>
      <AlertCloseButton />
   </Alert>
)


export const variantSecondary = () => (
   <VStack>
      <Alert variant="secondary" status="info">
         <AlertIcon />
         <AlertTitle mr={2}>This is an alert!</AlertTitle>
         <AlertDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit?</AlertDescription>
         <AlertCloseButton />
      </Alert>
      <Alert variant="secondary" status="success">
         <AlertIcon />
         <AlertTitle mr={2}>This is an alert!</AlertTitle>
         <AlertDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit?</AlertDescription>
         <AlertCloseButton />
      </Alert>
      <Alert variant="secondary" status="error">
         <AlertIcon />
         <AlertTitle mr={2}>This is an alert!</AlertTitle>
         <AlertDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit?</AlertDescription>
         <AlertCloseButton />
      </Alert>
   </VStack>
)



export const variantLeftAccent = () => (
   <VStack>
      <Alert variant="left-accent" status="info">
         <AlertIcon />
         <AlertTitle mr={2}>This is an alert!</AlertTitle>
         <AlertDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit?</AlertDescription>
         <AlertCloseButton />
      </Alert>
      <Alert variant="left-accent" status="success">
         <AlertIcon />
         <AlertTitle mr={2}>This is an alert!</AlertTitle>
         <AlertDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit?</AlertDescription>
         <AlertCloseButton />
      </Alert>
      <Alert variant="left-accent" status="error">
         <AlertIcon />
         <AlertTitle mr={2}>This is an alert!</AlertTitle>
         <AlertDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit?</AlertDescription>
         <AlertCloseButton />
      </Alert>
   </VStack>
)


export const variantTopAccent = () => (
   <VStack>
      <Alert variant="top-accent" status="info">
         <AlertIcon />
         <AlertTitle mr={2}>This is an alert!</AlertTitle>
         <AlertDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit?</AlertDescription>
         <AlertCloseButton />
      </Alert>
      <Alert variant="top-accent" status="success">
         <AlertIcon />
         <AlertTitle mr={2}>This is an alert!</AlertTitle>
         <AlertDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit?</AlertDescription>
         <AlertCloseButton />
      </Alert>
      <Alert variant="top-accent" status="error">
         <AlertIcon />
         <AlertTitle mr={2}>This is an alert!</AlertTitle>
         <AlertDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit?</AlertDescription>
         <AlertCloseButton />
      </Alert>
   </VStack>
)


export const variantGhost = () => (
   <VStack>
      <Alert variant="ghost" status="info">
         <AlertIcon />
         <AlertTitle mr={2}>This is an alert!</AlertTitle>
         <AlertDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit?</AlertDescription>
         <AlertCloseButton />
      </Alert>
      <Alert variant="ghost" status="success">
         <AlertIcon />
         <AlertTitle mr={2}>This is an alert!</AlertTitle>
         <AlertDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit?</AlertDescription>
         <AlertCloseButton />
      </Alert>
      <Alert variant="ghost" status="error">
         <AlertIcon />
         <AlertTitle mr={2}>This is an alert!</AlertTitle>
         <AlertDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit?</AlertDescription>
         <AlertCloseButton />
      </Alert>
   </VStack>
)


export const withColors = () => (
   <VStack>
      <Alert variant="secondary" status="info" colorScheme={'purple.500'}>
         <AlertIcon />
         <AlertTitle mr={2}>This is an alert!</AlertTitle>
         <AlertDescription>Lorem ipsum dolor sit amet, consectetur adipisicing elit?</AlertDescription>
         <AlertCloseButton />
      </Alert>
   </VStack>
)

export const Large = () => (
   <Alert variant="secondary" status={"success"} isLarge>
      <AlertIcon />
      <AlertTitle mt={4} mb={1} fontSize="lg">
         Application submitted!
      </AlertTitle>
      <AlertDescription maxWidth="sm">
         Thanks for submitting your application. Our team will get back to you soon.
      </AlertDescription>
      <AlertCloseButton />
   </Alert>
)
