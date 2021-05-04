import {
   Dropdown,
   DropdownButton,
   DropdownDivider,
   DropdownGroup,
   DropdownItem,
   DropdownItemOption,
   DropdownList,
   DropdownOptionGroup,
}                 from "../chalk/Components/Dropdown"
import React      from "react"
import {
   Button,
   IconButton,
}                 from '../chalk/Components/Button'
import {
   BiChevronDown,
   BiDownArrow,
   BiEdit,
   BiLink,
   BiMenu,
   BiRepeat,
}                 from 'react-icons/bi'
import {
   Image,
   Img,
}                 from "../chalk/Components/Image"
import { BiPlus } from 'react-icons/bi'


export default {
   title: 'Overlays/Dropdown',
   components: [Dropdown],
   subcomponents: { Dropdown },
}

export const Base = () => (
   <Dropdown>
      <DropdownButton as={Button} rightIcon={<BiChevronDown />} colorScheme={'gray.100'}>
         Actions
      </DropdownButton>
      <DropdownList>
         <DropdownItem>Download</DropdownItem>
         <DropdownItem>Create a Copy</DropdownItem>
         <DropdownItem>Mark as Draft</DropdownItem>
         <DropdownItem>Delete</DropdownItem>
         <DropdownItem>Attend a Workshop</DropdownItem>
      </DropdownList>
   </Dropdown>
)


export const InternalState = () => (
   <Dropdown>
      {({ isOpen }) => (
         <>
            <DropdownButton isActive={isOpen} as={Button} rightIcon={<BiChevronDown />}>
               {isOpen ? "Close" : "Open"}
            </DropdownButton>
            <DropdownList>
               <DropdownItem>Download</DropdownItem>
               <DropdownItem onClick={() => alert("Kagebunshin")}>Create a Copy</DropdownItem>
            </DropdownList>
         </>
      )}
   </Dropdown>
)


export const LetterNavigation = () => (
   <Dropdown>
      <DropdownButton
         px={4}
         py={2}
         transition="all 0.2s"
         borderRadius="md"
         borderWidth="1px"
         _expanded={{ bg: "primary", color: 'white' }}
         _focus={{ boxShadow: "outline" }}
      >
         File <BiChevronDown />
      </DropdownButton>
      <DropdownList>
         <DropdownItem>New File</DropdownItem>
         <DropdownItem>New Window</DropdownItem>
         <DropdownDivider />
         <DropdownItem>Open...</DropdownItem>
         <DropdownItem>Save File</DropdownItem>
      </DropdownList>
   </Dropdown>
)


export const WithImage = () => (
   <Dropdown>
      <DropdownButton as={Button} rightIcon={<BiChevronDown />}>
         Your Cats
      </DropdownButton>
      <DropdownList>
         <DropdownItem minH="48px">
            <Image
               boxSize="2rem"
               borderRadius="full"
               src="https://placekitten.com/100/100"
               alt="Fluffybuns the destroyer"
               mr="12px"
            />
            <span>Fluffybuns the Destroyer</span>
         </DropdownItem>
         <DropdownItem minH="40px">
            <Image
               boxSize="2rem"
               borderRadius="full"
               src="https://placekitten.com/120/120"
               alt="Simon the pensive"
               mr="12px"
            />
            <span>Simon the pensive</span>
         </DropdownItem>
      </DropdownList>
   </Dropdown>
)


export const WithIconsAndCommands = () => (
   <Dropdown>
      <DropdownButton
         as={IconButton}
         aria-label="Options"
         icon={<BiMenu />}
         size="lg"
         variant="outline"
      />
      <DropdownList>
         <DropdownItem icon={<BiPlus />} command="⌘T">
            New Tab
         </DropdownItem>
         <DropdownItem icon={<BiLink />} command="⌘N">
            New Window
         </DropdownItem>
         <DropdownItem icon={<BiRepeat />} command="⌘⇧N">
            Open Closed Tab
         </DropdownItem>
         <DropdownItem icon={<BiEdit />} command="⌘O">
            Open File...
         </DropdownItem>
      </DropdownList>
   </Dropdown>
)


export const Group = () => (
   <Dropdown>
      <DropdownButton as={Button} colorScheme="pink.500">
         Profile
      </DropdownButton>
      <DropdownList>
         <DropdownGroup title="Profile">
            <DropdownItem>My Account</DropdownItem>
            <DropdownItem>Payments </DropdownItem>
         </DropdownGroup>
         <DropdownDivider />
         <DropdownGroup title="Help">
            <DropdownItem>Docs</DropdownItem>
            <DropdownItem>FAQ</DropdownItem>
         </DropdownGroup>
      </DropdownList>
   </Dropdown>
)


export const WithOptions = () => (
   <Dropdown closeOnSelect={false}>
      <DropdownButton as={Button} colorScheme="primary">
         DropdownItem
      </DropdownButton>
      <DropdownList minWidth="240px">
         <DropdownOptionGroup defaultValue="asc" title="Order" type="radio">
            <DropdownItemOption value="asc">Ascending</DropdownItemOption>
            <DropdownItemOption value="desc">Descending</DropdownItemOption>
         </DropdownOptionGroup>
         <DropdownDivider />
         <DropdownOptionGroup title="Country" type="checkbox">
            <DropdownItemOption value="email">Email</DropdownItemOption>
            <DropdownItemOption value="phone">Phone</DropdownItemOption>
            <DropdownItemOption value="country">Country</DropdownItemOption>
         </DropdownOptionGroup>
      </DropdownList>
   </Dropdown>
)
