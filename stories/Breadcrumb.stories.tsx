import {
   Breadcrumb,
   BreadcrumbItem,
   BreadcrumbLink,
}                         from "../chalk/Components/Breadcrumb"
import { Box }            from "../chalk/Components/Layout/Box"
import { Stack }          from "../chalk/Components/Layout/Stack"
import { Text }           from "../chalk/Components/Typography/Text"
import React              from "react"
import { BiChevronRight } from 'react-icons/bi'

export default {
   title: 'Navigation/Breadcrumb',
   components: [Breadcrumb],
   subcomponents: { Breadcrumb },
}

export const Base = () => (
   <Breadcrumb>
      <BreadcrumbItem>
         <BreadcrumbLink>Home</BreadcrumbLink>
      </BreadcrumbItem>
      
      <BreadcrumbItem>
         <BreadcrumbLink>Docs</BreadcrumbLink>
      </BreadcrumbItem>
      
      <BreadcrumbItem isCurrentPage>
         <BreadcrumbLink>Breadcrumb</BreadcrumbLink>
      </BreadcrumbItem>
   </Breadcrumb>
)


export const Separator = () => (
   <Breadcrumb separator="-">
      <BreadcrumbItem>
         <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      
      <BreadcrumbItem>
         <BreadcrumbLink href="#">About</BreadcrumbLink>
      </BreadcrumbItem>
      
      <BreadcrumbItem isCurrentPage>
         <BreadcrumbLink href="#">Contact</BreadcrumbLink>
      </BreadcrumbItem>
   </Breadcrumb>
)


export const withIcon = () => (
   <Breadcrumb spacing="8px" separator={<BiChevronRight color="gray.500" />}>
      <BreadcrumbItem>
         <BreadcrumbLink href="#">Home</BreadcrumbLink>
      </BreadcrumbItem>
      
      <BreadcrumbItem>
         <BreadcrumbLink href="#">About</BreadcrumbLink>
      </BreadcrumbItem>
      
      <BreadcrumbItem isCurrentPage>
         <BreadcrumbLink href="#">Contact</BreadcrumbLink>
      </BreadcrumbItem>
   </Breadcrumb>
)


export const withReactRouter = () => (
   <>
      <span children={"// import { Link } from \"@reach/router\""}/>
      <Breadcrumb>
         <BreadcrumbItem>
            <BreadcrumbLink to="#">
               Home
            </BreadcrumbLink>
         </BreadcrumbItem>
         <BreadcrumbItem>
            <BreadcrumbLink to="#">
               About
            </BreadcrumbLink>
         </BreadcrumbItem>
         <BreadcrumbItem isCurrentPage>
            <BreadcrumbLink>Contact</BreadcrumbLink>
         </BreadcrumbItem>
      </Breadcrumb>
   </>
)
