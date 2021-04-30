import { Box }               from "../chalk/Components/Layout/Box"
import {
   HStack,
   Stack,
}                            from "../chalk/Components/Layout/Stack"
import { Text }              from "../chalk/Components/Typography/Text"
import React                 from "react"
import { useColorModeValue } from '../chalk/ColorMode'
import { BiBell }            from 'react-icons/bi'
import { Icon }              from '../chalk/Components/Icon'
import {
   chalk,
   HTMLChalkProps,
}                            from '../chalk/System'
import { useTheme }          from '@emotion/react'
import { Flex }              from '../chalk/Components/Layout/Flex'

export default {
   title: 'A_Examples/Banners',
   components: [Stack],
   subcomponents: { Stack },
}

export const Banner = () => {
   
   const BannerLink = (props: HTMLChalkProps<'a'>) => {
      const theme = useTheme()
      return <chalk.a
         theme={theme}
         {...
            props
         }
         href="#"
         px="4"
         py="1.5"
         textAlign="center"
         borderWidth="1px"
         borderColor="whiteAlpha.400"
         fontWeight="medium"
         rounded="base"
         _hover={
            {
               bg: 'whiteAlpha.200',
            }
         }
      />
   }
   
   return <Box as="section" pt="8" pb="12">
      <Stack
         direction={{ base: 'column', sm: 'row' }}
         justifyContent="center"
         alignItems="center"
         py="3"
         px={{ base: '3', md: '6', lg: '8' }}
         color="white"
         bg="blue.600"
      >
         <HStack spacing="3">
            <Flex alignItems="center" fontSize="2xl" h="10"><Icon as={BiBell} /></Flex>
            <Text fontWeight="medium" marginLeft="2">
               Confirm your email. Check your email. We&apos;ve send a message to <b>sample@gmail.com</b>
            </Text>
         </HStack>
         <BannerLink w={{ base: 'full', sm: 'auto' }} flexShrink={0}>
            Resend email
         </BannerLink>
      </Stack>
   </Box>
}
