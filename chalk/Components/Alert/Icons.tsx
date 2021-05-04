import {
   IoIosCloseCircle,
   IoIosCheckmarkCircle,
   IoMdAlert,
   IoMdInformationCircle,
} from 'react-icons/io'

const icons = {
   info: { icon: IoMdInformationCircle, colorScheme: 'messenger.500' },
   warning: { icon: IoMdAlert, colorScheme: 'warning' },
   success: { icon: IoIosCheckmarkCircle, colorScheme: 'success' },
   error: { icon: IoIosCloseCircle, colorScheme: 'danger' },
}

export default icons
