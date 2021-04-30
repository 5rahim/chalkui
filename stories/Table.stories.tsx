import { Table, TableCaption, Tbody, Td, Tfoot, Th, Thead, Tr } from "../chalk/Components/Table"
import { Box }                                                  from "../chalk/Components/Layout/Box"
import { Stack }                                                from "../chalk/Components/Layout/Stack"
import { Text }                                                 from "../chalk/Components/Typography/Text"
import React                                                    from "react"

export default {
   title: 'DataDisplay/Table',
   components: [Table],
   subcomponents: { Table },
}

export const Base = () => (
   <Table variant="simple">
      <TableCaption>Imperial to metric conversion factors</TableCaption>
      <Thead>
         <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
         </Tr>
      </Thead>
      <Tbody>
         <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
         </Tr>
         <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
         </Tr>
         <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
         </Tr>
      </Tbody>
      <Tfoot>
         <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
         </Tr>
      </Tfoot>
   </Table>
)


export const Striped = () => (
   <Table variant="striped" colorScheme="gray">
      <TableCaption>Imperial to metric conversion factors</TableCaption>
      <Thead>
         <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
         </Tr>
      </Thead>
      <Tbody>
         <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
         </Tr>
         <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
         </Tr>
         <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
         </Tr>
      </Tbody>
      <Tfoot>
         <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
         </Tr>
      </Tfoot>
   </Table>
)


export const Size = () => (
   <Table size="sm">
      <Thead>
         <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
         </Tr>
      </Thead>
      <Tbody>
         <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
         </Tr>
         <Tr>
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
         </Tr>
         <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
         </Tr>
      </Tbody>
      <Tfoot>
         <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
         </Tr>
      </Tfoot>
   </Table>
)
