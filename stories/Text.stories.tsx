import React    from 'react'
import { Text } from '../chalk/Components/Typography/Text'

export default {
   title: 'Typography/Text',
   component: Text,
}

const Template = (args: any) => <Text {...args} />

export const Paragraph: any = Template.bind({})
Paragraph.args = {
   children: "This is a text"
}

export const Decoration: any = Template.bind({})
Decoration.args = {
   decoration: 'underline',
   children: "This is a text"
}

export const As_Prop: any = Template.bind({})
As_Prop.args = {
   as: 'mark',
   children: "This is a text"
}

export const Truncated: any = (args: any) => <div style={{ width: '600px' }}><Text {...args} /></div>
Truncated.args = {
   isTruncated: true,
   children: "Extra super duper long naruto heading in the village hidden in the leaves by the first Hokage who used to be friedns with Madara Uchiha but they went their separate ways because they could find a common understing around the definition of peace in the ninja world.t"
}

export const FontSizes: any = (args: any) => {
   const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl']
   return (
      sizes.map((size: string) => {
         return <Text key={size} fontSize={size} >This is a text</Text>
      })
   )
}


export const Color: any = Template.bind({})
Color.args = {
   children: "This is a text",
   color: 'red.500'
}
