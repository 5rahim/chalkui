import React       from 'react'
import { Heading } from '../chalk/Components/Typography/Heading'

export default {
   title: 'Typography/Heading',
   component: Heading,
}

const Template = (args: any) => <Heading {...args} />

export const Base: any = Template.bind({})
Base.args = {
   children: "This is a heading",
}

export const FontSizes: any = (args: any) => {
   const sizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl']
   return (
      sizes.map((size: string) => {
         return <div><Heading key={size} size={size}>({size}) This is a text</Heading></div>
      })
   )
}
