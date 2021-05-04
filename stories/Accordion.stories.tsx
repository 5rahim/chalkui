import {
   Accordion,
   AccordionButton,
   AccordionIcon,
   AccordionItem,
   AccordionPanel,
}                  from "../chalk/Components/Accordion"
import { Box }     from "../chalk/Components/Layout/Box"
import { Stack }   from "../chalk/Components/Layout/Stack"
import { Text }    from "../chalk/Components/Typography/Text"
import React       from "react"
import { BiMinus } from 'react-icons/bi'
import { BiPlus }  from 'react-icons/bi'

export default {
   title: 'Collections/Accordion',
   components: [Accordion],
   subcomponents: { Accordion },
}

export const Base = () => (
   <>
      <Accordion>
         <AccordionItem>
            <h2>
               <AccordionButton>
                  <Box flex="1" textAlign="left">
                     Section 1 title
                  </Box>
                  <AccordionIcon />
               </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
               tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
               veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
               commodo consequat.
            </AccordionPanel>
         </AccordionItem>
      
         <AccordionItem>
            <h2>
               <AccordionButton>
                  <Box flex="1" textAlign="left">
                     Section 2 title
                  </Box>
                  <AccordionIcon />
               </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
               Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
               tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
               veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
               commodo consequat.
            </AccordionPanel>
         </AccordionItem>
      </Accordion>
   </>
)

export const AllowMultiple = () => (
   <Accordion defaultIndex={[0]} allowMultiple>
      <AccordionItem>
         <h2>
            <AccordionButton>
               <Box flex="1" textAlign="left">
                  Section 1 title
               </Box>
               <AccordionIcon />
            </AccordionButton>
         </h2>
         <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
         </AccordionPanel>
      </AccordionItem>
      
      <AccordionItem>
         <h2>
            <AccordionButton>
               <Box flex="1" textAlign="left">
                  Section 2 title
               </Box>
               <AccordionIcon />
            </AccordionButton>
         </h2>
         <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
         </AccordionPanel>
      </AccordionItem>
   </Accordion>
)


export const AllowToggle = () => (
   <Accordion allowToggle>
      <AccordionItem>
         <h2>
            <AccordionButton>
               <Box flex="1" textAlign="left">
                  Section 1 title
               </Box>
               <AccordionIcon />
            </AccordionButton>
         </h2>
         <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
         </AccordionPanel>
      </AccordionItem>
      
      <AccordionItem>
         <h2>
            <AccordionButton>
               <Box flex="1" textAlign="left">
                  Section 2 title
               </Box>
               <AccordionIcon />
            </AccordionButton>
         </h2>
         <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
         </AccordionPanel>
      </AccordionItem>
   </Accordion>
)

export const InternalState = () => (
   <Accordion allowMultiple>
      <AccordionItem>
         <h2>
            <AccordionButton>
               <Box flex="1" textAlign="left">
                  Section 1 title
               </Box>
               <AccordionIcon />
            </AccordionButton>
         </h2>
         <AccordionPanel pb={4}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
         </AccordionPanel>
      </AccordionItem>
      
      <AccordionItem>
         {({ isExpanded }) => (
            <>
               <h2>
                  <AccordionButton>
                     <Box flex="1" textAlign="left">
                        Section 2 title
                     </Box>
                     <Box fontSize="18px">
   
                        {isExpanded ? (
                           <BiMinus />
                        ) : (
                           <BiPlus />
                        )}
                     </Box>
                  </AccordionButton>
               </h2>
               <AccordionPanel pb={4}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat.
               </AccordionPanel>
            </>
         )}
      </AccordionItem>
   </Accordion>
)
