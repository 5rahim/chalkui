import { IoCloseCircle, IoIosCheckmarkCircle, IoMdAlert, IoMdInformationCircle } from 'react-icons/all'

const icons = {
   info: { icon: IoMdInformationCircle, colorScheme: 'messenger.500' },
   warning: { icon: IoMdAlert, colorScheme: 'warning' },
   success: { icon: IoIosCheckmarkCircle, colorScheme: 'success' },
   error: { icon: IoCloseCircle, colorScheme: 'danger' },
}

export default icons
