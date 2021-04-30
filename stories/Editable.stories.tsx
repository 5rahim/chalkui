import {
   Editable,
   EditableInput,
   EditablePreview,
   useEditableControls,
}                  from "../chalk/Components/Editable"
import { Box }     from "../chalk/Components/Layout/Box"
import { Stack }   from "../chalk/Components/Layout/Stack"
import { Text }    from "../chalk/Components/Typography/Text"
import React       from "react"
import {
   ButtonGroup,
   IconButton,
}                  from '../chalk/Components/Button'
import { Flex }    from '../chalk/Components/Layout/Flex'
import { BiCheck } from 'react-icons/bi'
import {
   BiEdit,
   BiX,
} from 'react-icons/all'

export default {
   title: 'Forms/Editable',
   components: [Editable],
   subcomponents: { Editable },
}

export const Base = () => (
   // Click the text to edit
   <Editable defaultValue="Take some chalk">
      <EditablePreview />
      <EditableInput />
   </Editable>
)


export const CustomControls = () => {
   /* Here's a custom control */
   function EditableControls() {
      const {
         isEditing,
         getSubmitButtonProps,
         getCancelButtonProps,
         getEditButtonProps,
      } = useEditableControls()
      
      return isEditing ? (
         <ButtonGroup justifyContent="center">
            <IconButton size="sm" icon={<BiCheck />} {...getSubmitButtonProps()} />
            <IconButton size="sm" icon={<BiX />} {...getCancelButtonProps()} />
         </ButtonGroup>
      ) : (
         <Flex justifyContent="center">
            <IconButton size="sm" icon={<BiEdit />} {...getEditButtonProps()} />
         </Flex>
      )
   }
   
   return (
      <Editable
         textAlign="center"
         defaultValue="Chalk UI"
         fontSize="2xl"
         isPreviewFocusable={false}
      >
         <EditablePreview />
         <EditableInput />
         <EditableControls />
      </Editable>
   )
}
