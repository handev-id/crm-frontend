import { GiPadlock } from "react-icons/gi";
import {
  MdDateRange,
  MdDeleteOutline,
  MdInsertEmoticon,
  MdLocationPin,
  MdNightlightRound,
  MdOutlineEmail,
  MdOutlineNightlight,
  MdOutlineWbSunny,
  MdSignpost,
} from "react-icons/md";
import {
  FaBirthdayCake,
  FaBuilding,
  FaCalendarDay,
  FaDownload,
  FaFacebook,
  FaGlobe,
  FaLinkedinIn,
  FaPhoneAlt,
  FaRegCalendar,
  FaRegClock,
  FaRegEye,
  FaRegFlag,
  FaRegUser,
  FaRocketchat,
  FaUser,
  FaUserFriends,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa";
import {
  IoChatboxEllipses,
  IoChatboxEllipsesOutline,
  IoCheckmarkCircleOutline,
  IoCheckmarkDone,
  IoCloseCircleOutline,
  IoSearchOutline,
  IoSettingsOutline,
  IoSettingsSharp,
} from "react-icons/io5";
import { RiSpeakFill, RiSpeakLine } from "react-icons/ri";
import {
  BsBarChartLine,
  BsBarChartLineFill,
  BsCloudDownload,
} from "react-icons/bs";
import { VscSettings } from "react-icons/vsc";
import {
  IoIosArrowBack,
  IoMdCheckmark,
  IoMdClose,
  IoMdSend,
} from "react-icons/io";
import {
  LuImagePlus,
  LuPanelLeftOpen,
  LuPanelRightOpen,
  LuReply,
} from "react-icons/lu";
import { GoPencil, GoPlus, GoReply } from "react-icons/go";
import { AiOutlineExclamationCircle } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";

export const GLOBAL_ICONS = {
  email: <MdOutlineEmail />,
  gembok: <GiPadlock />,
  eye: <FaRegEye />,
  eyeSlash: <FaRegEyeSlash />,
  sun: <MdOutlineWbSunny />,
  month: <MdOutlineNightlight />,
  search: <IoSearchOutline />,
  filter: <VscSettings />,
  close: <IoCloseCircleOutline />,
  closeX: <IoMdClose />,
  check: <IoMdCheckmark />,
  checkOutline: <IoCheckmarkCircleOutline />,
  archived: <IoCheckmarkDone />,
  download: <BsCloudDownload />,
  back: <LuPanelLeftOpen />,
  detail: <LuPanelRightOpen />,
  imagePlus: <LuImagePlus />,
  quickReply: <FaRocketchat />,
  emoticon: <MdInsertEmoticon />,
  reply: <GoReply />,
  delete: <MdDeleteOutline />,
  send: <IoMdSend />,
  exclamation: <AiOutlineExclamationCircle />,
  clock: <FaRegClock />,
  broadcast: <RiSpeakLine />,
  userType: <FaUserFriends />,
  calender: <FaRegCalendar />,
  lastActivity: <FaCalendarDay />,
  company: <FaBuilding />,
  country: <FaRegFlag />,
  location: <MdLocationPin />,
  postalCode: <MdSignpost />,
  phone: <FaPhoneAlt />,
  facebook: <FaFacebook />,
  twitter: <FaXTwitter />,
  linkedIn: <FaLinkedinIn />,
  web: <FaGlobe />,
  timezone: <FaRegClock />,
  pencil: <GoPencil />,
  user: <FaRegUser />,
  birth: <FaBirthdayCake />,
  plus: <GoPlus />,
  downloadContact: <FiDownload />,
  date: <MdDateRange />,
};

export const NavigationMenu = [
  {
    id: 1,
    title: "Chats",
    icon: <IoChatboxEllipses />,
    outlineIcon: <IoChatboxEllipsesOutline />,
    location: "/conversations",
  },
  {
    id: 2,
    title: "Contacts",
    icon: <FaUser />,
    outlineIcon: <FaRegUser />,
    location: "/contacts",
  },

  {
    id: 3,
    title: "Settings",
    icon: <IoSettingsSharp />,
    outlineIcon: <IoSettingsOutline />,
    // location: "/settings",
  },
  {
    id: 4,
    title: "Broadcast",
    icon: <RiSpeakFill />,
    outlineIcon: <RiSpeakLine />,
    // location: "/brodcast",
  },
  {
    id: 5,
    title: "Reporting",
    icon: <BsBarChartLineFill />,
    outlineIcon: <BsBarChartLine />,
    // location: "/reporting",
  },
];
