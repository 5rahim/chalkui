import {
   MenuItem,
   MenuList,
   MenuPanel,
   MenuPanels,
   Menu,
   useTab,
   MenuHeader,
}                            from "../chalk/Components/Menu"
import { Box }               from "../chalk/Components/Layout/Box"
import { Stack }             from "../chalk/Components/Layout/Stack"
import { Text }              from "../chalk/Components/Typography/Text"
import React                 from "react"
import { Icon }              from '../chalk/Components/Icon'
import {
   BiArchive,
   BiBadge,
   BiBarChartSquare,
   BiBookmark,
   BiCalendar,
   BiCreditCard,
   BiFile,
   BiFolder,
   BiGroup,
   BiHome,
   BiUser,
}                            from 'react-icons/bi'
import { useColorModeValue } from '../chalk/ColorMode'
import { Badge }             from '../chalk/Components/Layout/Badge'
import {
   chalk,
   forwardRef,
   useStyles,
}                            from '../chalk/System'
import { useTheme }          from '@emotion/react'
import { Heading }           from '../chalk/Components/Typography/Heading'
import { List }              from '../chalk/Components/Layout/List'
import { Flex }              from '../chalk/Components/Layout/Flex'

export default {
   title: 'Collections/Menu',
   components: [MenuItem],
   subcomponents: { MenuItem },
}

export const Underline = () => (
   <Menu>
      <MenuList>
         <MenuItem>One</MenuItem>
         <MenuItem>Two</MenuItem>
         <MenuItem>Three</MenuItem>
      </MenuList>
      
      <MenuPanels>
         <MenuPanel>
            <p>one!</p>
         </MenuPanel>
         <MenuPanel>
            <p>two!</p>
         </MenuPanel>
         <MenuPanel>
            <p>three!</p>
         </MenuPanel>
      </MenuPanels>
   </Menu>
)


export const UnderlineFullWidth = () => (
   <Menu isFullWidth>
      <MenuList>
         <MenuItem>One</MenuItem>
         <MenuItem>Two</MenuItem>
         <MenuItem>Three</MenuItem>
      </MenuList>
      
      <MenuPanels>
         <MenuPanel>
            <p>one!</p>
         </MenuPanel>
         <MenuPanel>
            <p>two!</p>
         </MenuPanel>
         <MenuPanel>
            <p>three!</p>
         </MenuPanel>
      </MenuPanels>
   </Menu>
)


export const UnderlineWithIcons = () => (
   <Stack>
      <Menu>
         <MenuList>
            <MenuItem><Icon as={BiUser} mr={2} /> My account</MenuItem>
            <MenuItem><Icon as={BiCreditCard} mr={2} /> Billing</MenuItem>
            <MenuItem><Icon as={BiFolder} mr={2} /> My Documents</MenuItem>
         </MenuList>
         
         <MenuPanels>
            <MenuPanel>
               <p>one!</p>
            </MenuPanel>
            <MenuPanel>
               <p>two!</p>
            </MenuPanel>
            <MenuPanel>
               <p>three!</p>
            </MenuPanel>
         </MenuPanels>
      </Menu>
      <Menu colorScheme="gray.500">
         <MenuList>
            <MenuItem><Icon as={BiUser} mr={2} /> My account</MenuItem>
            <MenuItem><Icon as={BiCreditCard} mr={2} /> Billing</MenuItem>
            <MenuItem><Icon as={BiFolder} mr={2} /> My Documents</MenuItem>
         </MenuList>
         
         <MenuPanels>
            <MenuPanel>
               <p>one!</p>
            </MenuPanel>
            <MenuPanel>
               <p>two!</p>
            </MenuPanel>
            <MenuPanel>
               <p>three!</p>
            </MenuPanel>
         </MenuPanels>
      </Menu>
   </Stack>
)

// export const UnderlineWithBadges = () => (
//    <Menu>
//       <MenuList>
//          <MenuItem>My account <Badge ml={2}>54</Badge></MenuItem>
//          <MenuItem><Icon as={BiCreditCard} mr={2} /> Billing</MenuItem>
//          <MenuItem><Icon as={BiFolder} mr={2} /> My Documents</MenuItem>
//       </MenuList>
//
//       <MenuPanels>
//          <MenuPanel>
//             <p>one!</p>
//          </MenuPanel>
//          <MenuPanel>
//             <p>two!</p>
//          </MenuPanel>
//          <MenuPanel>
//             <p>three!</p>
//          </MenuPanel>
//       </MenuPanels>
//    </Menu>
// )

export const UnderlineWithBadges = () => {
   
   const StyledTab = chalk("a", { themeKey: "Menu.MenuItem" })
   
   const CustomMenuItem = forwardRef((props, ref) => {
      const tabProps = useTab(props)
      const theme = useTheme()
      const isSelected = !!tabProps["aria-selected"]
      
      const styles = useStyles()
      
      return (
         <StyledTab theme={theme} __css={styles.tab} {...tabProps}>
            {tabProps.children}
            {props.badge && <Badge ml={2} colorScheme={isSelected ? 'primary' : 'gray.500'} pill>{props.badge}</Badge>}
         </StyledTab>
      )
   })
   
   return (
      <Menu>
         <MenuList>
            <CustomMenuItem badge={54}>My account</CustomMenuItem>
            <CustomMenuItem><Icon as={BiCreditCard} mr={2} /> Billing</CustomMenuItem>
            <CustomMenuItem><Icon as={BiFolder} mr={2} /> My Documents</CustomMenuItem>
         </MenuList>
         
         <MenuPanels>
            <MenuPanel>
               <p>one!</p>
            </MenuPanel>
            <MenuPanel>
               <p>two!</p>
            </MenuPanel>
            <MenuPanel>
               <p>three!</p>
            </MenuPanel>
         </MenuPanels>
      </Menu>
   )
}


export const Enclosed = () => (
   <Menu variant="enclosed">
      <MenuList>
         <MenuItem>One</MenuItem>
         <MenuItem>Two</MenuItem>
      </MenuList>
      <MenuPanels>
         <MenuPanel>
            <p>one!</p>
         </MenuPanel>
         <MenuPanel>
            <p>two!</p>
         </MenuPanel>
      </MenuPanels>
   </Menu>
)


export const Pill = () => (
   <Menu variant="pill">
      <MenuList>
         <MenuItem>One</MenuItem>
         <MenuItem>Two</MenuItem>
         <MenuItem>Three</MenuItem>
      </MenuList>
      
      <MenuPanels>
         <MenuPanel>
            <p>one!</p>
         </MenuPanel>
         <MenuPanel>
            <p>two!</p>
         </MenuPanel>
         <MenuPanel>
            <p>three!</p>
         </MenuPanel>
      </MenuPanels>
   </Menu>
)

export const SolidPill = () => (
   <Menu variant="solid-pill">
      <MenuList>
         <MenuItem>One</MenuItem>
         <MenuItem>Two</MenuItem>
         <MenuItem>Three</MenuItem>
      </MenuList>
      
      <MenuPanels>
         <MenuPanel>
            <p>one!</p>
         </MenuPanel>
         <MenuPanel>
            <p>two!</p>
         </MenuPanel>
         <MenuPanel>
            <p>three!</p>
         </MenuPanel>
      </MenuPanels>
   </Menu>
)

export const Rounded = () => (
   <Stack>
      <Menu variant="rounded">
         <MenuList>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
         </MenuList>
         
         <MenuPanels>
            <MenuPanel>
               <p>one!</p>
            </MenuPanel>
            <MenuPanel>
               <p>two!</p>
            </MenuPanel>
            <MenuPanel>
               <p>three!</p>
            </MenuPanel>
         </MenuPanels>
      </Menu>
      <Menu variant="rounded" colorScheme="gray.500">
         <MenuList>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
         </MenuList>
         
         <MenuPanels>
            <MenuPanel>
               <p>one!</p>
            </MenuPanel>
            <MenuPanel>
               <p>two!</p>
            </MenuPanel>
            <MenuPanel>
               <p>three!</p>
            </MenuPanel>
         </MenuPanels>
      </Menu>
   </Stack>
)

export const SolidRounded = () => (
   <Stack>
      <Menu variant="solid-rounded">
         <MenuList>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
         </MenuList>
         
         <MenuPanels>
            <MenuPanel>
               <p>one!</p>
            </MenuPanel>
            <MenuPanel>
               <p>two!</p>
            </MenuPanel>
            <MenuPanel>
               <p>three!</p>
            </MenuPanel>
         </MenuPanels>
      </Menu>
      <Menu variant="solid-rounded" colorScheme="gray.500">
         <MenuList>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
         </MenuList>
         
         <MenuPanels>
            <MenuPanel>
               <p>one!</p>
            </MenuPanel>
            <MenuPanel>
               <p>two!</p>
            </MenuPanel>
            <MenuPanel>
               <p>three!</p>
            </MenuPanel>
         </MenuPanels>
      </Menu>
   </Stack>
)


export const Sizes = () => (
   <Stack>
      
      <Menu variant="rounded" size="sm">
         <MenuList>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
         </MenuList>
         
         <MenuPanels>
            <MenuPanel>
               <p>one!</p>
            </MenuPanel>
            <MenuPanel>
               <p>two!</p>
            </MenuPanel>
            <MenuPanel>
               <p>three!</p>
            </MenuPanel>
         </MenuPanels>
      </Menu>
      
      <Menu variant="rounded" size="lg">
         <MenuList>
            <MenuItem>One</MenuItem>
            <MenuItem>Two</MenuItem>
            <MenuItem>Three</MenuItem>
         </MenuList>
         
         <MenuPanels>
            <MenuPanel>
               <p>one!</p>
            </MenuPanel>
            <MenuPanel>
               <p>two!</p>
            </MenuPanel>
            <MenuPanel>
               <p>three!</p>
            </MenuPanel>
         </MenuPanels>
      </Menu>
   </Stack>
)


export const Spacing = () => (
   <Menu variant="rounded" spacing="1rem">
      <MenuList>
         <MenuItem>One</MenuItem>
         <MenuItem>Two</MenuItem>
         <MenuItem>Three</MenuItem>
      </MenuList>
   </Menu>
)


export const Basic = () => (
   <Stack>
      <Menu variant="basic" spacing="1rem">
         <MenuList>
            <Heading>Sort by:</Heading>
            <MenuItem>Closest</MenuItem>
            <MenuItem>Most comments</MenuItem>
            <MenuItem>Most popular</MenuItem>
         </MenuList>
      </Menu>
      <Menu variant="basic" spacing="1rem" colorScheme="gray.500">
         <MenuList>
            <Heading>Sort by:</Heading>
            <MenuItem>Closest</MenuItem>
            <MenuItem>Most comments</MenuItem>
            <MenuItem>Most popular</MenuItem>
         </MenuList>
      </Menu>
   
   </Stack>
)


export const VerticalBasic = () => (
   <Menu variant="basic" spacing=".5rem" orientation="vertical" index={1}>
      <MenuList>
         <Heading>Sort by:</Heading>
         <MenuItem>Closest</MenuItem>
         <MenuItem>Most comments</MenuItem>
         <MenuItem>Most popular</MenuItem>
      </MenuList>
   </Menu>
)


export const VerticalRounded = () => (
   <Menu variant="rounded" orientation="vertical" width="300px">
      <MenuList>
         <MenuItem>Dashboard</MenuItem>
         <MenuItem>Team</MenuItem>
         <MenuItem>Projects</MenuItem>
         <MenuItem>Calendar</MenuItem>
         <MenuItem>Documents</MenuItem>
         <MenuItem>Reports</MenuItem>
      </MenuList>
   </Menu>
)


export const VerticalRoundedWithColor = () => (
   <Menu variant="rounded" orientation="vertical" width="300px" colorScheme="gray.500">
      <MenuList>
         <MenuItem>Dashboard</MenuItem>
         <MenuItem>Team</MenuItem>
         <MenuItem>Projects</MenuItem>
         <MenuItem>Calendar</MenuItem>
         <MenuItem>Documents</MenuItem>
         <MenuItem>Reports</MenuItem>
      </MenuList>
   </Menu>
)

export const VerticalWithBadges = () => {
   
   const StyledMenuItem = chalk("a", { themeKey: "Menu.MenuItem" })
   
   const CustomMenuItem = forwardRef((props, ref) => {
      const tabProps = useTab(props)
      const theme = useTheme()
      const isSelected = !!tabProps["aria-selected"]
      
      const styles = useStyles()
      
      return (
         <StyledMenuItem theme={theme} __css={styles.tab} {...tabProps} justifyContent="space-between">
            <Flex>{tabProps.children}</Flex>
            {props.badge && <Badge ml={2} colorScheme={isSelected ? 'purple.500' : 'gray.500'} pill>{props.badge}</Badge>}
         </StyledMenuItem>
      )
   })
   
   return (
      <Menu variant="rounded" orientation="vertical" width="300px" colorScheme="purple.500">
         <MenuList>
            <CustomMenuItem badge={"+99"}><Box ml={-1} mr={3} fontSize="1.4rem"><BiHome /></Box>Dashboard</CustomMenuItem>
            <CustomMenuItem><Box ml={-1} mr={3} fontSize="1.4rem"><BiGroup /></Box>Team</CustomMenuItem>
            <CustomMenuItem><Box ml={-1} mr={3} fontSize="1.4rem"><BiFolder /></Box>Projects</CustomMenuItem>
            <MenuHeader>Header</MenuHeader>
            <CustomMenuItem><Box ml={-1} mr={3} fontSize="1.4rem"><BiCalendar /></Box>Calendar</CustomMenuItem>
            <CustomMenuItem><Box ml={-1} mr={3} fontSize="1.4rem"><BiFile /></Box>Documents</CustomMenuItem>
            <CustomMenuItem><Box ml={-1} mr={3} fontSize="1.4rem"><BiBarChartSquare /></Box>Reports</CustomMenuItem>
         </MenuList>
      </Menu>
   )
}


export const RightAccent = () => (
   <Menu variant="right-accent" orientation="vertical" width="300px">
      <MenuList>
         <MenuItem><Box ml={-1} mr={3} fontSize="1.4rem"><BiHome /></Box>Dashboard</MenuItem>
         <MenuItem><Box ml={-1} mr={3} fontSize="1.4rem"><BiGroup /></Box>Team</MenuItem>
         <MenuItem><Box ml={-1} mr={3} fontSize="1.4rem"><BiFolder /></Box>Projects</MenuItem>
         <MenuItem><Box ml={-1} mr={3} fontSize="1.4rem"><BiCalendar /></Box>Calendar</MenuItem>
         <MenuItem><Box ml={-1} mr={3} fontSize="1.4rem"><BiFile /></Box>Documents</MenuItem>
         <MenuItem><Box ml={-1} mr={3} fontSize="1.4rem"><BiBarChartSquare /></Box>Reports</MenuItem>
      </MenuList>
   </Menu>
)


export const Custom = () => (
   <Box bg="#508232">
      <Menu
         variant="custom"
         width="300px"
         colorScheme="#396520"
         defaultColor="white"
         hoverColor="white"
         hoverBg="#447328"
         selectedColor="white"
         selectedBg="#396520"
         size="lg"
      >
         <MenuList>
            <MenuItem><Box ml={-1} mr={3} fontSize="1.4rem"><BiHome /></Box>Dashboard</MenuItem>
            <MenuItem><Box ml={-1} mr={3} fontSize="1.4rem"><BiGroup /></Box>Team</MenuItem>
            <MenuItem><Box ml={-1} mr={3} fontSize="1.4rem"><BiFolder /></Box>Projects</MenuItem>
            <MenuItem><Box ml={-1} mr={3} fontSize="1.4rem"><BiCalendar /></Box>Calendar</MenuItem>
            <MenuItem><Box ml={-1} mr={3} fontSize="1.4rem"><BiFile /></Box>Documents</MenuItem>
            <MenuItem><Box ml={-1} mr={3} fontSize="1.4rem"><BiBarChartSquare /></Box>Reports</MenuItem>
         </MenuList>
      </Menu>
   </Box>
)


export const Custom2 = () => (
   <Box>
      <Menu
         variant="custom"
         borderRadius="md"
         width="300px"
         // colorScheme="primary"
         defaultColor="gray.800"
         hoverColor="gray.800"
         hoverBg="gray.100"
         selectedColor="white"
         selectedBg="primary"
         size="md"
         spacing=".5rem"
      >
         <MenuList>
            <MenuItem><Box ml={-1} mr={3} fontSize="1.4rem"><BiHome /></Box>Dashboard</MenuItem>
            <MenuItem><Box ml={-1} mr={3} fontSize="1.4rem"><BiGroup /></Box>Team</MenuItem>
            <MenuItem><Box ml={-1} mr={3} fontSize="1.4rem"><BiFolder /></Box>Projects</MenuItem>
            <MenuItem><Box ml={-1} mr={3} fontSize="1.4rem"><BiCalendar /></Box>Calendar</MenuItem>
            <MenuItem><Box ml={-1} mr={3} fontSize="1.4rem"><BiFile /></Box>Documents</MenuItem>
            <MenuItem><Box ml={-1} mr={3} fontSize="1.4rem"><BiBarChartSquare /></Box>Reports</MenuItem>
         </MenuList>
      </Menu>
   </Box>
)

export const Divided = () => (
   <Stack>
      <Menu variant="divided" orientation="vertical" width="300px" colorScheme="gray.500" borderWidth="1px" borderRadius="md" boxShadow="sm">
         <MenuList>
            <MenuItem>Dashboard</MenuItem>
            <MenuItem>Team</MenuItem>
            <MenuItem>Projects</MenuItem>
            <MenuItem>Calendar</MenuItem>
            <MenuItem>Documents</MenuItem>
            <MenuItem>Reports</MenuItem>
         </MenuList>
      </Menu>
      <Box>
         <Menu variant="divided" orientation="vertical" width="300px" size="sm">
            <MenuList>
               <MenuItem>Dashboard</MenuItem>
               <MenuItem>Team</MenuItem>
               <MenuItem>Projects</MenuItem>
               <MenuItem>Calendar</MenuItem>
               <MenuItem>Documents</MenuItem>
               <MenuItem>Reports</MenuItem>
            </MenuList>
         </Menu>
      </Box>
   </Stack>
)


export const Ghost = () => (
   <Stack>
      <Box py={2} borderWidth="1px" borderRadius="md" boxShadow="sm" width="200px">
         <Menu variant="ghost" orientation="vertical" colorScheme="gray.500" isManual={false}>
            <MenuList>
               <MenuItem>Download</MenuItem>
               <MenuItem>Create a Copy</MenuItem>
               <MenuItem>Mark as Draft</MenuItem>
               <MenuItem>Delete</MenuItem>
               <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
         </Menu>
      </Box>
      <Box>
         <Menu variant="ghost" orientation="vertical" width="200px" size="sm" borderWidth="1px" borderRadius="md" boxShadow="sm">
            <MenuList>
               <MenuItem>Download</MenuItem>
               <MenuItem>Create a Copy</MenuItem>
               <MenuItem>Mark as Draft</MenuItem>
               <MenuItem>Delete</MenuItem>
               <MenuItem>Attend a Workshop</MenuItem>
            </MenuList>
         </Menu>
      </Box>
   </Stack>
)

