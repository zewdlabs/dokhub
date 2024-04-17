import { cn } from "@/lib/utils";
import {
  ActivityIcon,
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  Copy,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  Image,
  Laptop,
  Loader2,
  LucideProps,
  Moon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  SunMedium,
  Trash,
  User,
  X,
  XIcon,
} from "lucide-react";

export const Icons = {
  quote: ({ className, ...otherProps }: LucideProps) => (
    <svg
      className={cn("w-6 h-6", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 475.082 475.081"
      {...otherProps}
    >
      <g>
        <g>
          <path d="M 164.45 219.27 h -63.954 c -7.614 0 -14.087 -2.664 -19.417 -7.994 c -5.327 -5.33 -7.994 -11.801 -7.994 -19.417 v -9.132 c 0 -20.177 7.139 -37.401 21.416 -51.678 c 14.276 -14.272 31.503 -21.411 51.678 -21.411 h 18.271 c 4.948 0 9.229 -1.809 12.847 -5.424 c 3.616 -3.617 5.424 -7.898 5.424 -12.847 V 54.819 c 0 -4.948 -1.809 -9.233 -5.424 -12.85 c -3.617 -3.612 -7.898 -5.424 -12.847 -5.424 h -18.271 c -19.797 0 -38.684 3.858 -56.673 11.563 c -17.987 7.71 -33.545 18.132 -46.68 31.267 c -13.134 13.129 -23.553 28.688 -31.262 46.677 C 3.855 144.039 0 162.931 0 182.726 v 200.991 c 0 15.235 5.327 28.171 15.986 38.834 c 10.66 10.657 23.606 15.985 38.832 15.985 h 109.639 c 15.225 0 28.167 -5.328 38.828 -15.985 c 10.657 -10.663 15.987 -23.599 15.987 -38.834 V 274.088 c 0 -15.232 -5.33 -28.168 -15.994 -38.832 C 192.622 224.6 179.675 219.27 164.45 219.27 Z" />
          <path d="M 459.103 235.256 c -10.656 -10.656 -23.599 -15.986 -38.828 -15.986 h -63.953 c -7.61 0 -14.089 -2.664 -19.41 -7.994 c -5.332 -5.33 -7.994 -11.801 -7.994 -19.417 v -9.132 c 0 -20.177 7.139 -37.401 21.409 -51.678 c 14.271 -14.272 31.497 -21.411 51.682 -21.411 h 18.267 c 4.949 0 9.233 -1.809 12.848 -5.424 c 3.613 -3.617 5.428 -7.898 5.428 -12.847 V 54.819 c 0 -4.948 -1.814 -9.233 -5.428 -12.85 c -3.614 -3.612 -7.898 -5.424 -12.848 -5.424 h -18.267 c -19.808 0 -38.691 3.858 -56.685 11.563 c -17.984 7.71 -33.537 18.132 -46.672 31.267 c -13.135 13.129 -23.559 28.688 -31.265 46.677 c -7.707 17.987 -11.567 36.879 -11.567 56.674 v 200.991 c 0 15.235 5.332 28.171 15.988 38.834 c 10.657 10.657 23.6 15.985 38.828 15.985 h 109.633 c 15.229 0 28.171 -5.328 38.827 -15.985 c 10.664 -10.663 15.985 -23.599 15.985 -38.834 V 274.088 C 475.082 258.855 469.76 245.92 459.103 235.256 Z" />
        </g>
      </g>
    </svg>
  ),
  activity: ActivityIcon,
  share: ({ className, ...otherProps }: LucideProps) => (
    <svg
      className={cn("", className)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <g id="Share_1" data-name="Share 1">
        <g>
          <path d="M12.223,11.075a.5.5,0,0,0,.7.71l7-7v3.58a.508.508,0,0,0,.5.5.5.5,0,0,0,.5-.5V3.575a.5.5,0,0,0-.5-.5h-4.79a.5.5,0,0,0,0,1h3.58Z" />
          <path d="M17.876,20.926H6.124a3.053,3.053,0,0,1-3.05-3.05V6.124a3.053,3.053,0,0,1,3.05-3.05h6.028a.5.5,0,0,1,0,1H6.124a2.053,2.053,0,0,0-2.05,2.05V17.876a2.053,2.053,0,0,0,2.05,2.05H17.876a2.053,2.053,0,0,0,2.05-2.05V11.849a.5.5,0,0,1,1,0v6.027A3.053,3.053,0,0,1,17.876,20.926Z" />
        </g>
      </g>
    </svg>
  ),
  chat: ({ className, ...otherProps }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={cn("", className)}
      {...otherProps}
    >
      <g>
        <path
          d="M416,21.333H96c-52.928,0-96,43.072-96,96V288c0,52.949,43.072,96,96,96h52.011c17.408,0,33.728,8.491,43.691,22.741
			l55.552,79.36c2.005,2.837,5.269,4.565,8.747,4.565s6.741-1.707,8.747-4.544l55.552-79.36
			C330.261,392.491,346.603,384,363.989,384H416c52.928,0,96-43.072,96-96V117.333C512,64.405,468.928,21.333,416,21.333z
			 M490.667,288c0,41.173-33.493,74.667-74.667,74.667h-52.011c-24.363,0-47.211,11.904-61.163,31.851L256,461.397l-46.827-66.88
			c-13.952-19.968-36.8-31.851-61.163-31.851H96c-41.173,0-74.667-33.493-74.667-74.667V117.333
			c0-41.173,33.493-74.667,74.667-74.667h320c41.173,0,74.667,33.493,74.667,74.667V288z"
        />
      </g>
    </svg>
  ),
  teamwork: ({ className, ...otherProps }: LucideProps) => (
    <svg
      className={cn("", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      {...otherProps}
    >
      <g>
        <g>
          <g>
            <path
              d="M314.752,348.629l-58.773-14.677l-4.352-17.429c15.573-15.915,26.325-37.248,29.909-59.264
				c9.152-3.285,16.085-11.499,17.365-21.632l3.947-31.531c0.939-7.467-1.365-14.976-6.293-20.629
				c-2.432-2.795-5.397-5.013-8.683-6.549l1.323-26.667l5.184-5.205c9.579-10.176,17.536-27.563,1.152-52.565
				C283.157,73.579,262.293,64,233.472,64c-11.115,0-36.608,0-60.629,15.829c-69.248,1.728-78.229,35.968-78.229,65.792
				c0,6.784,1.493,20.992,2.624,30.784c-3.669,1.536-6.976,3.861-9.664,6.912c-5.035,5.675-7.36,13.248-6.421,20.779l3.947,31.531
				c1.344,10.837,9.173,19.477,19.264,22.229c3.563,21.099,13.76,41.685,28.373,57.237l-4.715,18.859l-58.773,14.677
				C28.459,358.805,0,395.285,0,437.333c0,2.837,1.109,5.568,3.115,7.552C5.12,446.869,7.851,448,10.667,448l362.667-0.043
				c5.888,0,10.667-4.779,10.667-10.667C384,395.285,355.541,358.805,314.752,348.629z M22.144,426.624
				c4.203-27.563,24.512-50.368,52.288-57.301l64.981-16.235c3.819-0.96,6.827-3.947,7.765-7.765l7.723-30.933
				c0.96-3.755-0.235-7.723-3.051-10.368c-15.424-14.464-25.643-35.691-27.328-56.747c-0.448-5.547-5.077-9.813-10.645-9.813h-2.56
				c-2.56,0-4.736-1.92-5.056-4.459l-3.947-31.531c-0.256-1.984,0.661-3.371,1.237-4.011c0.576-0.64,1.835-1.728,5.461-1.728
				c3.072,0,5.973-1.301,8-3.605c2.027-2.283,2.965-5.355,2.581-8.384c-1.003-8.021-3.648-30.528-3.648-38.08
				c0-19.584,0-43.925,60.395-44.523c2.176-0.021,4.331-0.704,6.101-1.984c16.981-12.139,35.328-13.781,51.051-13.781
				c21.163,0,36.032,6.336,44.203,18.837c9.344,14.272,5.824,21.291,1.365,26.027l-7.872,7.893
				c-1.877,1.877-2.987,4.373-3.115,7.019l-1.92,39.467c-0.128,2.901,0.917,5.717,2.901,7.829c1.963,2.112,4.736,3.328,7.637,3.349
				c2.005,0.021,3.243,1.109,3.797,1.749s1.451,1.984,1.216,3.947l-3.947,31.531c-0.32,2.539-2.496,4.459-5.824,4.459
				c-5.568,0-10.197,4.267-10.645,9.813c-1.728,21.717-12.416,43.349-28.629,57.877c-2.944,2.624-4.181,6.677-3.221,10.517
				l7.403,29.632c0.96,3.819,3.947,6.827,7.765,7.765l64.981,16.235c27.733,6.933,48.043,29.76,52.267,57.344L22.144,426.624z"
            />
            <path
              d="M442.773,348.608L384,333.931l-2.389-9.429c40.235-7.211,61.12-19.349,62.059-19.904
				c3.008-1.771,4.885-4.971,5.141-8.448c0.256-3.477-1.301-6.933-4.011-9.131c-0.277-0.213-27.413-23.083-27.413-101.952
				c0-69.867-16.853-105.28-50.091-105.28h-3.563c-11.435-10.773-20.779-15.403-41.451-15.701h-0.149
				c-3.968,0-7.531,2.304-9.365,5.824c-1.856,3.563-1.493,8,0.853,11.264c2.389,3.371,6.357,4.885,10.112,4.267
				c15.253,0.427,19.093,3.52,28.117,12.544c2.005,1.984,4.715,3.115,7.552,3.115h7.893c18.283,0,28.757,30.613,28.757,83.947
				c0,59.52,14.208,91.264,24.811,106.645c-10.795,4.267-28.864,10.027-53.888,13.547c-2.987,0.405-5.675,2.091-7.36,4.587
				c-1.685,2.517-2.24,5.611-1.493,8.555l6.72,26.944c0.96,3.819,3.947,6.827,7.765,7.765l64.981,16.235
				c27.733,6.933,48.043,29.76,52.267,57.344H416V448l85.333-0.043c5.888,0,10.667-4.779,10.667-10.667
				C512,395.285,483.541,358.805,442.773,348.608z"
            />
          </g>
        </g>
      </g>
    </svg>
  ),
  logo: ({ className, ...otherProps }: LucideProps) => (
    <svg
      className={cn("w-12 h-12 fill-none", className)}
      viewBox="0 0 174 36"
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <path
        className="fill-primary"
        d="M18.219 0H26.2449V35.1207H18.219V33.1875C16.2933 34.9041 13.8172 35.937 11.1161 35.937C4.97666 35.937 0 30.6063 0 24.0304C0 17.4544 4.97666 12.1237 11.1161 12.1237C13.8172 12.1237 16.2933 13.1571 18.219 14.8727V0ZM18.219 24.0304C18.219 21.2003 16.1387 18.9057 13.3297 18.9057C10.5206 18.9057 8.24369 21.2003 8.24369 24.0304C8.24369 26.8608 10.5206 29.1555 13.3297 29.1555C16.1387 29.1555 18.219 26.8604 18.219 24.0304Z"
      />
      <path
        className="fill-primary"
        d="M57.0355 23.963C57.0355 30.5777 51.6997 36 43.5294 36C35.3594 36 30.024 30.5777 30.024 23.963C30.024 17.3482 35.3593 11.9862 43.5294 11.9862C51.6997 11.9862 57.0355 17.3482 57.0355 23.963ZM48.6583 23.9928C48.6583 21.1316 46.362 18.8118 43.5294 18.8118C40.6971 18.8118 38.4008 21.1316 38.4008 23.9928C38.4008 26.8546 40.6971 29.1743 43.5294 29.1743C46.362 29.1743 48.6583 26.8546 48.6583 23.9928Z"
      />
      <path
        d="M88.5915 35.1212H77.2613L71.1616 28.4846L68.8181 25.9384V35.1207H60.7925V0H68.8181V20.926L71.7472 17.9804L76.8842 12.8173H87.7422L76.8175 23.1391L88.5915 35.1212Z"
        className="fill-primary"
      />
      <path
        d="M115.067 20.5683V35.1207H107.041V23.4746C107.041 19.8827 105.753 18.601 103.447 18.601C100.108 18.601 99.37 21.1543 99.37 22.9899V35.1207H91.3445V0H99.37V15.5384C99.37 15.5384 101.327 12.3412 106.473 12.3412C111.054 12.3412 115.067 14.8651 115.067 20.5683Z"
        className="fill-primary"
      />
      <path
        d="M143.245 12.7916V27.189C143.245 35.465 134.44 35.9194 131.274 35.9194C128.109 35.9194 119.303 35.465 119.303 27.189V12.7916H127.329V25.8387C127.329 26.9801 127.781 29.485 131.274 29.485C134.767 29.485 135.22 26.9801 135.22 25.8387V12.7916H143.245Z"
        className="fill-primary"
      />
      <path
        d="M174 24.0299C174 30.6058 169.023 35.9366 162.884 35.9366C160.183 35.9366 157.707 34.9037 155.781 33.1876V35.1207H147.755V0H155.781V14.8722C157.707 13.1561 160.183 12.1232 162.884 12.1232C169.023 12.1232 174 17.454 174 24.0299ZM165.756 24.0299C165.756 21.1999 163.479 18.9052 160.67 18.9052C157.861 18.9052 155.781 21.1999 155.781 24.0299C155.781 26.8604 157.861 29.1551 160.67 29.1551C163.479 29.1551 165.756 26.8599 165.756 24.0299Z"
        className="fill-primary"
      />
    </svg>
  ),
  logoLarge: ({ className, ...otherProps }: LucideProps) => (
    <svg
      className={cn("w-48", className)}
      viewBox="0 0 112 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <path
        d="M11.7272 0H16.8933V23.4138H11.7272V22.125C10.4876 23.2694 8.89382 23.958 7.15517 23.958C3.20336 23.958 0 20.4042 0 16.0202C0 11.6363 3.20336 8.08244 7.15517 8.08244C8.89382 8.08244 10.4876 8.7714 11.7272 9.91514V0ZM11.7272 16.0202C11.7272 14.1336 10.3881 12.6038 8.58001 12.6038C6.7719 12.6038 5.30628 14.1336 5.30628 16.0202C5.30628 17.9072 6.7719 19.437 8.58001 19.437C10.3881 19.437 11.7272 17.9069 11.7272 16.0202Z"
        fill="#0284C7"
      />
      <path
        d="M36.7125 15.9753C36.7125 20.3852 33.278 24 28.0189 24C22.76 24 19.3257 20.3852 19.3257 15.9753C19.3257 11.5655 22.76 7.99078 28.0189 7.99078C33.278 7.99078 36.7125 11.5655 36.7125 15.9753ZM31.3202 15.9952C31.3202 14.0877 29.8422 12.5412 28.0189 12.5412C26.1958 12.5412 24.7178 14.0877 24.7178 15.9952C24.7178 17.9031 26.1958 19.4496 28.0189 19.4496C29.8422 19.4496 31.3202 17.9031 31.3202 15.9952Z"
        fill="#0284C7"
      />
      <path
        d="M57.0244 23.4141H49.7314L45.8051 18.9897L44.2967 17.2922V23.4138H39.1308V0H44.2967V13.9507L46.182 11.9869L49.4886 8.54489H56.4777L49.4457 15.4261L57.0244 23.4141Z"
        fill="#0284C7"
      />
      <path
        d="M74.0659 13.7122V23.4138H68.9001V15.6497C68.9001 13.2551 68.0709 12.4007 66.5867 12.4007C64.4376 12.4007 63.9622 14.1029 63.9622 15.3266V23.4138H58.7964V0H63.9622V10.3589C63.9622 10.3589 65.2221 8.22745 68.534 8.22745C71.4829 8.22745 74.0659 9.91005 74.0659 13.7122Z"
        fill="#0284C7"
      />
      <path
        d="M92.2038 8.52771V18.126C92.2038 23.6433 86.5361 23.9462 84.4983 23.9462C82.4607 23.9462 76.793 23.6433 76.793 18.126V8.52771H81.9587V17.2258C81.9587 17.9867 82.2501 19.6567 84.4983 19.6567C86.7467 19.6567 87.0378 17.9867 87.0378 17.2258V8.52771H92.2038Z"
        fill="#0284C7"
      />
      <path
        d="M112 16.0199C112 20.4039 108.796 23.9577 104.845 23.9577C103.106 23.9577 101.513 23.2691 100.273 22.125V23.4138H95.1068V0H100.273V9.91481C101.513 8.77075 103.106 8.08212 104.845 8.08212C108.796 8.08212 112 11.636 112 16.0199ZM106.694 16.0199C106.694 14.1333 105.228 12.6035 103.42 12.6035C101.612 12.6035 100.273 14.1332 100.273 16.0199C100.273 17.9069 101.612 19.4367 103.42 19.4367C105.228 19.4367 106.694 17.9066 106.694 16.0199Z"
        fill="#0284C7"
      />
    </svg>
  ),
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  X: XIcon,
  check: Check,
  copy: Copy,
  copyDone: ClipboardCheck,
  sun: SunMedium,
  moon: Moon,
  laptop: Laptop,
  gitHub: (props: LucideProps) => (
    <svg viewBox="0 0 438.549 438.549" {...props}>
      <path
        fill="currentColor"
        d="M409.132 114.573c-19.608-33.596-46.205-60.194-79.798-79.8-33.598-19.607-70.277-29.408-110.063-29.408-39.781 0-76.472 9.804-110.063 29.408-33.596 19.605-60.192 46.204-79.8 79.8C9.803 148.168 0 184.854 0 224.63c0 47.78 13.94 90.745 41.827 128.906 27.884 38.164 63.906 64.572 108.063 79.227 5.14.954 8.945.283 11.419-1.996 2.475-2.282 3.711-5.14 3.711-8.562 0-.571-.049-5.708-.144-15.417a2549.81 2549.81 0 01-.144-25.406l-6.567 1.136c-4.187.767-9.469 1.092-15.846 1-6.374-.089-12.991-.757-19.842-1.999-6.854-1.231-13.229-4.086-19.13-8.559-5.898-4.473-10.085-10.328-12.56-17.556l-2.855-6.57c-1.903-4.374-4.899-9.233-8.992-14.559-4.093-5.331-8.232-8.945-12.419-10.848l-1.999-1.431c-1.332-.951-2.568-2.098-3.711-3.429-1.142-1.331-1.997-2.663-2.568-3.997-.572-1.335-.098-2.43 1.427-3.289 1.525-.859 4.281-1.276 8.28-1.276l5.708.853c3.807.763 8.516 3.042 14.133 6.851 5.614 3.806 10.229 8.754 13.846 14.842 4.38 7.806 9.657 13.754 15.846 17.847 6.184 4.093 12.419 6.136 18.699 6.136 6.28 0 11.704-.476 16.274-1.423 4.565-.952 8.848-2.383 12.847-4.285 1.713-12.758 6.377-22.559 13.988-29.41-10.848-1.14-20.601-2.857-29.264-5.14-8.658-2.286-17.605-5.996-26.835-11.14-9.235-5.137-16.896-11.516-22.985-19.126-6.09-7.614-11.088-17.61-14.987-29.979-3.901-12.374-5.852-26.648-5.852-42.826 0-23.035 7.52-42.637 22.557-58.817-7.044-17.318-6.379-36.732 1.997-58.24 5.52-1.715 13.706-.428 24.554 3.853 10.85 4.283 18.794 7.952 23.84 10.994 5.046 3.041 9.089 5.618 12.135 7.708 17.705-4.947 35.976-7.421 54.818-7.421s37.117 2.474 54.823 7.421l10.849-6.849c7.419-4.57 16.18-8.758 26.262-12.565 10.088-3.805 17.802-4.853 23.134-3.138 8.562 21.509 9.325 40.922 2.279 58.24 15.036 16.18 22.559 35.787 22.559 58.817 0 16.178-1.958 30.497-5.853 42.966-3.9 12.471-8.941 22.457-15.125 29.979-6.191 7.521-13.901 13.85-23.131 18.986-9.232 5.14-18.182 8.85-26.84 11.136-8.662 2.286-18.415 4.004-29.263 5.146 9.894 8.562 14.842 22.077 14.842 40.539v60.237c0 3.422 1.19 6.279 3.572 8.562 2.379 2.279 6.136 2.95 11.276 1.995 44.163-14.653 80.185-41.062 108.068-79.226 27.88-38.161 41.825-81.126 41.825-128.906-.01-39.771-9.818-76.454-29.414-110.049z"
      ></path>
    </svg>
  ),

  linkArrow: ({ className, ...otherProps }: LucideProps) => (
    <svg
      className={cn("fill-none", className)}
      viewBox="0 0 20 20"
      {...otherProps}
    >
      <path
        d="M5.83301 14.1663L14.1663 5.83301"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.83301 5.83301H14.1663V14.1663"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  radix: (props: LucideProps) => (
    <svg viewBox="0 0 25 25" fill="none" {...props}>
      <path
        d="M12 25C7.58173 25 4 21.4183 4 17C4 12.5817 7.58173 9 12 9V25Z"
        fill="currentcolor"
      ></path>
      <path d="M12 0H4V8H12V0Z" fill="currentcolor"></path>
      <path
        d="M17 8C19.2091 8 21 6.20914 21 4C21 1.79086 19.2091 0 17 0C14.7909 0 13 1.79086 13 4C13 6.20914 14.7909 8 17 8Z"
        fill="currentcolor"
      ></path>
    </svg>
  ),
  aria: (props: LucideProps) => (
    <svg role="img" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.966 22.624l-1.69-4.281H8.122l3.892-9.144 5.662 13.425zM8.884 1.376H0v21.248zm15.116 0h-8.884L24 22.624Z" />
    </svg>
  ),
  npm: (props: LucideProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M1.763 0C.786 0 0 .786 0 1.763v20.474C0 23.214.786 24 1.763 24h20.474c.977 0 1.763-.786 1.763-1.763V1.763C24 .786 23.214 0 22.237 0zM5.13 5.323l13.837.019-.009 13.836h-3.464l.01-10.382h-3.456L12.04 19.17H5.113z"
        fill="currentColor"
      />
    </svg>
  ),
  yarn: (props: LucideProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M12 0C5.375 0 0 5.375 0 12s5.375 12 12 12 12-5.375 12-12S18.625 0 12 0zm.768 4.105c.183 0 .363.053.525.157.125.083.287.185.755 1.154.31-.088.468-.042.551-.019.204.056.366.19.463.375.477.917.542 2.553.334 3.605-.241 1.232-.755 2.029-1.131 2.576.324.329.778.899 1.117 1.825.278.774.31 1.478.273 2.015a5.51 5.51 0 0 0 .602-.329c.593-.366 1.487-.917 2.553-.931.714-.009 1.269.445 1.353 1.103a1.23 1.23 0 0 1-.945 1.362c-.649.158-.95.278-1.821.843-1.232.797-2.539 1.242-3.012 1.39a1.686 1.686 0 0 1-.704.343c-.737.181-3.266.315-3.466.315h-.046c-.783 0-1.214-.241-1.45-.491-.658.329-1.51.19-2.122-.134a1.078 1.078 0 0 1-.58-1.153 1.243 1.243 0 0 1-.153-.195c-.162-.25-.528-.936-.454-1.946.056-.723.556-1.367.88-1.71a5.522 5.522 0 0 1 .408-2.256c.306-.727.885-1.348 1.32-1.737-.32-.537-.644-1.367-.329-2.21.227-.602.412-.936.82-1.08h-.005c.199-.074.389-.153.486-.259a3.418 3.418 0 0 1 2.298-1.103c.037-.093.079-.185.125-.283.31-.658.639-1.029 1.024-1.168a.94.94 0 0 1 .328-.06zm.006.7c-.507.016-1.001 1.519-1.001 1.519s-1.27-.204-2.266.871c-.199.218-.468.334-.746.44-.079.028-.176.023-.417.672-.371.991.625 2.094.625 2.094s-1.186.839-1.626 1.881c-.486 1.144-.338 2.261-.338 2.261s-.843.732-.899 1.487c-.051.663.139 1.2.343 1.515.227.343.51.176.51.176s-.561.653-.037.931c.477.25 1.283.394 1.71-.037.31-.31.371-1.001.486-1.283.028-.065.12.111.209.199.097.093.264.195.264.195s-.755.324-.445 1.066c.102.246.468.403 1.066.398.222-.005 2.664-.139 3.313-.296.375-.088.505-.283.505-.283s1.566-.431 2.998-1.357c.917-.598 1.293-.76 2.034-.936.612-.148.57-1.098-.241-1.084-.839.009-1.575.44-2.196.825-1.163.718-1.742.672-1.742.672l-.018-.032c-.079-.13.371-1.293-.134-2.678-.547-1.515-1.413-1.881-1.344-1.997.297-.5 1.038-1.297 1.334-2.78.176-.899.13-2.377-.269-3.151-.074-.144-.732.241-.732.241s-.616-1.371-.788-1.483a.271.271 0 0 0-.157-.046z"
        fill="currentColor"
      />
    </svg>
  ),
  pnpm: (props: LucideProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M0 0v7.5h7.5V0zm8.25 0v7.5h7.498V0zm8.25 0v7.5H24V0zM8.25 8.25v7.5h7.498v-7.5zm8.25 0v7.5H24v-7.5zM0 16.5V24h7.5v-7.5zm8.25 0V24h7.498v-7.5zm8.25 0V24H24v-7.5z"
        fill="currentColor"
      />
    </svg>
  ),
  react: (props: LucideProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"
        fill="currentColor"
      />
    </svg>
  ),
  tailwind: (props: LucideProps) => (
    <svg viewBox="0 0 24 24" {...props}>
      <path
        d="M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"
        fill="currentColor"
      />
    </svg>
  ),
  google: ({ className, ...otherProps }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 48 48"
      className={cn("w-8 h-8", className)}
      {...otherProps}
    >
      <path
        fill="#FFC107"
        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
      />
      <path
        fill="#FF3D00"
        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
      />
      <path
        fill="#4CAF50"
        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
      />
      <path
        fill="#1976D2"
        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
      />
    </svg>
  ),
  telegram: ({ className, ...otherProps }: LucideProps) => (
    <svg
      className={cn("", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 300 300"
      {...otherProps}
    >
      <g>
        <path
          d="M5.299,144.645l69.126,25.8l26.756,86.047c1.712,5.511,8.451,7.548,12.924,3.891l38.532-31.412
		c4.039-3.291,9.792-3.455,14.013-0.391l69.498,50.457c4.785,3.478,11.564,0.856,12.764-4.926L299.823,29.22
		c1.31-6.316-4.896-11.585-10.91-9.259L5.218,129.402C-1.783,132.102-1.722,142.014,5.299,144.645z M96.869,156.711l135.098-83.207
		c2.428-1.491,4.926,1.792,2.841,3.726L123.313,180.87c-3.919,3.648-6.447,8.53-7.163,13.829l-3.798,28.146
		c-0.503,3.758-5.782,4.131-6.819,0.494l-14.607-51.325C89.253,166.16,91.691,159.907,96.869,156.711z"
        />
      </g>
    </svg>
  ),
  twitterX: ({ className, ...otherProps }: LucideProps) => (
    <svg
      className={cn("w-10 h-10", className)}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      {...otherProps}
    >
      <path d="M 2.3671875 3 L 9.4628906 13.140625 L 2.7402344 21 L 5.3808594 21 L 10.644531 14.830078 L 14.960938 21 L 21.871094 21 L 14.449219 10.375 L 20.740234 3 L 18.140625 3 L 13.271484 8.6875 L 9.2988281 3 L 2.3671875 3 z M 6.2070312 5 L 8.2558594 5 L 18.033203 19 L 16.001953 19 L 6.2070312 5 z" />
    </svg>
  ),
  linkedIn: ({ className, ...otherProps }: LucideProps) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 30 30"
      className={cn(
        "w-8 h-8 hover:fill-primary/70 ease-in-out duration-100",
        className,
      )}
      {...otherProps}
    >
      <path d="M9,25H4V10h5V25z M6.501,8C5.118,8,4,6.879,4,5.499S5.12,3,6.501,3C7.879,3,9,4.121,9,5.499C9,6.879,7.879,8,6.501,8z M27,25h-4.807v-7.3c0-1.741-0.033-3.98-2.499-3.98c-2.503,0-2.888,1.896-2.888,3.854V25H12V9.989h4.614v2.051h0.065 c0.642-1.18,2.211-2.424,4.551-2.424c4.87,0,5.77,3.109,5.77,7.151C27,16.767,27,25,27,25z" />
    </svg>
  ),
  apple: (props: LucideProps) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701"
        fill="currentColor"
      />
    </svg>
  ),
  paypal: (props: LucideProps) => (
    <svg role="img" viewBox="0 0 24 24" {...props}>
      <path
        d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 0 0-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 0 0-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 0 0 .554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 0 1 .923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"
        fill="currentColor"
      />
    </svg>
  ),
};
