import {
  AlertCircleIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
  BadgeIcon,
  BarChart3Icon,
  BarChartIcon,
  CheckCircle2Icon,
  CheckCircleIcon,
  ChevronsDownIcon,
  CircleIcon,
  CopyIcon,
  DeleteIcon,
  ExternalLinkIcon,
  GlobeIcon,
  LayoutDashboardIcon,
  LayoutGridIcon,
  LayoutTemplateIcon,
  LinkIcon,
  LogOutIcon,
  LucideProps,
  MailIcon,
  Maximize2Icon,
  MenuIcon,
  Minimize2Icon,
  MonitorIcon,
  MoonIcon,
  PaletteIcon,
  PenIcon,
  RefreshCcwIcon,
  SearchIcon,
  SettingsIcon,
  SmartphoneIcon,
  SunIcon,
  User2Icon,
  XCircleIcon,
  XIcon,
} from "lucide-react";
import { cn } from "../lib/utils";

const Icon = {
  X: XIcon,
  Badge: BadgeIcon,
  CheckCircle: CheckCircleIcon,
  ArrowRight: ArrowRightIcon,
  Mail: MailIcon,
  Menu: MenuIcon,
  Copy: CopyIcon,
  Moon: MoonIcon,
  Sun: SunIcon,
  ChevronsDown: ChevronsDownIcon,
  Search: SearchIcon,
  Link: LinkIcon,
  AlertCircle: AlertCircleIcon,
  RefreshCcw: RefreshCcwIcon,
  ArrowLeft: ArrowLeftIcon,
  Globe: GlobeIcon,
  LayoutDashboard: LayoutDashboardIcon,
  LayoutGrid: LayoutGridIcon,
  LayoutTemplate: LayoutTemplateIcon,
  Pen: PenIcon,
  Settings: SettingsIcon,
  User2: User2Icon,
  BarChart3: BarChart3Icon,
  ExternalLink: ExternalLinkIcon,
  LogOut: LogOutIcon,
  XCircle: XCircleIcon,
  CheckCircle2: CheckCircle2Icon,
  BarChart: BarChartIcon,
  Circle: CircleIcon,
  Smartphone: SmartphoneIcon,
  Monitor: MonitorIcon,
  Minimize2: Minimize2Icon,
  Maximize2: Maximize2Icon,
  Palette: PaletteIcon,
  Trash2: DeleteIcon,
  Upload: ({ className, ...otherProps }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("w-6 h-6", className)}
      {...otherProps}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
      />
    </svg>
  ),
  LinkArrow: ({ className, ...otherProps }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("w-6 h-6", className)}
      {...otherProps}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
      />
    </svg>
  ),
};

export { Icon };
