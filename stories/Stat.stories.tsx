import { Stat, StatArrow, StatHelpText, StatIndicator, StatLabel, StatNumber } from "../chalk/Components/Stat"
import { Box }                                                  from "../chalk/Components/Layout/Box"
import { Stack }                                                from "../chalk/Components/Layout/Stack"
import { Text }                                                 from "../chalk/Components/Typography/Text"
import React                                                    from "react"
import { Wrap, WrapItem }                                       from '../chalk/Components/Layout/Wrap'

export default {
   title: 'DataDisplay/Stat',
   components: [Stat],
   subcomponents: { Stat },
}

export const Base = () => (
   <Stat>
      <StatLabel>Collected Fees</StatLabel>
      <StatNumber>$0.00</StatNumber>
      <StatHelpText>Feb 12 - Feb 28</StatHelpText>
   </Stat>
)


export const Basic = () => (
   <Stat>
      <StatNumber>27K</StatNumber>
      <StatHelpText>Users</StatHelpText>
   </Stat>
)

export const withIndicator = () => (
   <Wrap>
      <WrapItem>
         <Box boxShadow="sm" p={3} borderRadius="md">
            <Stat>
               <StatNumber>$328</StatNumber>
               <StatHelpText>Spent this month <StatArrow type="increase" />33.05%</StatHelpText>
            </Stat>
         </Box>
      </WrapItem>
      <WrapItem>
         <Box boxShadow="sm" p={3} borderRadius="md">
            <Stat>
               <StatNumber>$328</StatNumber>
               <StatHelpText>Spent this month <StatArrow type="decrease" />33.05%</StatHelpText>
            </Stat>
         </Box>
      </WrapItem>
      <WrapItem>
         <Box boxShadow="sm" p={3} borderRadius="md">
            <Stat>
               <StatNumber>$328</StatNumber>
               <StatHelpText>Spent this month
               <StatIndicator type="decrease"><StatArrow/>33.05%</StatIndicator></StatHelpText>
            </Stat>
         </Box>
      </WrapItem>
      <WrapItem>
         <Box boxShadow="sm" p={3} borderRadius="md">
            <Stat>
               <StatNumber>$328</StatNumber>
               <StatHelpText>Spent this month
               <StatIndicator type="increase"><StatArrow/>33.05%</StatIndicator></StatHelpText>
            </Stat>
         </Box>
      </WrapItem>
   </Wrap>
)
