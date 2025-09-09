'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import useAdmLayoutSwitch from '../../store';

interface IMenuItem {
  tit: string;
  icon?: React.ReactElement;
  list?: {
    tit: string;
    href: string;
  }[];
  checkPath?: string;
  href?: string;
  adminMenu: boolean;
  isOpen: boolean;
}

interface IMenuSection {
  tit: string;
  item: IMenuItem[];
}

export default function AdminLeft() {
  const router = useRouter();
  const [nowPathName, setNowPathName] = useState("");

  const [menuList, setMenuList] = useState<IMenuSection[]>([
    {
      tit: '서비스 관리',
      item: [
        // { //1depth만 있는 아이템 입니다.
        //     tit: '1depth title',
        //     icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
        //         <path className="fill" d="M14 2.5H2C1.73478 2.5 1.48043 2.60536 1.29289 2.79289C1.10536 2.98043 1 3.23478 1 3.5V11.5C1 11.7652 1.10536 12.0196 1.29289 12.2071C1.48043 12.3946 1.73478 12.5 2 12.5H6V14.5H4V15.5H12V14.5H10V12.5H14C14.2652 12.5 14.5196 12.3946 14.7071 12.2071C14.8946 12.0196 15 11.7652 15 11.5V3.5C15 3.23478 14.8946 2.98043 14.7071 2.79289C14.5196 2.60536 14.2652 2.5 14 2.5ZM9 14.5H7V12.5H9V14.5ZM14 11.5H2V3.5H14V11.5Z" fill="#8391A2" />
        //     </svg>,
        //     href: '/',
        //     adminMenu: false,
        //     isOpen: false,
        // },
        // { //2depth 있는 아이템 입니다.
        //     tit: 'pages',
        //     icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
        //         <path className="fill" d="M7.5 10.0002C7.77614 10.0002 8 9.77631 8 9.50017C8 9.22403 7.77614 9.00017 7.5 9.00017C7.22386 9.00017 7 9.22403 7 9.50017C7 9.77631 7.22386 10.0002 7.5 10.0002Z" fill="#8391A2" />
        //         <path className="fill" d="M13.85 4.65017L10.35 1.15017C10.306 1.10134 10.2519 1.06263 10.1915 1.03674C10.131 1.01084 10.0657 0.998364 10 1.00017H5C4.73502 1.00094 4.48111 1.10654 4.29374 1.29391C4.10637 1.48128 4.00077 1.73519 4 2.00017V7.00017H3C2.73488 7.00048 2.4807 7.10593 2.29323 7.2934C2.10576 7.48087 2.0003 7.73505 2 8.00017V11.0002C2.0003 11.2653 2.10576 11.5195 2.29323 11.7069C2.4807 11.8944 2.73488 11.9999 3 12.0002H4V14.0002C4.00077 14.2652 4.10637 14.5191 4.29374 14.7064C4.48111 14.8938 4.73502 14.9994 5 15.0002H13C13.265 14.9994 13.5189 14.8938 13.7063 14.7064C13.8936 14.5191 13.9992 14.2652 14 14.0002V5.00017C14.0018 4.93446 13.9893 4.86913 13.9634 4.80871C13.9375 4.74828 13.8988 4.6942 13.85 4.65017ZM10 2.20017L12.8 5.00017H10V2.20017ZM3 8.00017H7.7986L9.5 9.50017L7.8037 11.0002H3V8.00017ZM13 14.0002H5V12.0002H7.80445C8.04587 11.9997 8.27903 11.9122 8.4612 11.7538L10.1529 10.258C10.2614 10.1644 10.3485 10.0486 10.4084 9.91841C10.4683 9.78822 10.4996 9.64669 10.5001 9.50339C10.5005 9.36008 10.4702 9.21835 10.4112 9.08777C10.3522 8.95719 10.2658 8.84082 10.1579 8.74652L8.4562 7.24237C8.275 7.08613 8.04371 7.00017 7.80445 7.00017H5V2.00017H9V5.00017C9.00077 5.26515 9.10637 5.51906 9.29374 5.70643C9.48111 5.8938 9.73502 5.99941 10 6.00017H13V14.0002Z" fill="#8391A2" />
        //     </svg>,
        //     list: [
        //         {
        //             tit: 'main',
        //             href: '/admin/pages/main'
        //         },
        //         // {
        //         //     tit: 'video',
        //         //     href: '/admin/board/video'
        //         // }
        //     ],
        //     checkPath: '/admin/board', // url에 checkPath가 포함되어 있으면 열리는 아이템 입니다.
        //     adminMenu: false,
        //     isOpen: false,
        // },
        {
          tit: '회원 관리',
          icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M7.00087 12.5564C10.0691 12.5564 12.5564 10.0691 12.5564 7.00087C12.5564 3.93262 10.0691 1.44531 7.00087 1.44531C3.93262 1.44531 1.44531 3.93262 1.44531 7.00087C1.44531 10.0691 3.93262 12.5564 7.00087 12.5564Z" stroke="white" />
              <path d="M7.00065 7.55599C7.92113 7.55599 8.66732 6.8098 8.66732 5.88932C8.66732 4.96885 7.92113 4.22266 7.00065 4.22266C6.08018 4.22266 5.33398 4.96885 5.33398 5.88932C5.33398 6.8098 6.08018 7.55599 7.00065 7.55599Z" stroke="white" />
              <path d="M4.22266 11.8118V10.8885C4.22266 10.5938 4.33972 10.3112 4.54809 10.1028C4.75647 9.89441 5.03908 9.77734 5.33377 9.77734H8.6671C8.96179 9.77734 9.2444 9.89441 9.45277 10.1028C9.66115 10.3112 9.77821 10.5938 9.77821 10.8885V11.8118" stroke="white" />
            </g>
            <defs>
              <clipPath id="clip0_1954_3621">
                <rect width="13.3333" height="13.3333" fill="white" transform="translate(0.333984 0.332031)" />
              </clipPath>
            </defs>
          </svg>
          ,
          list: [
            {
              tit: '회원관리',
              href: '/admin/user/info'
            },
            {
              tit: '차단/신고 관리',
              href: '/admin/user/block'
            }
          ],
          checkPath: '/admin/user',
          adminMenu: false,
          isOpen: false,
        },
        {
          tit: '관리자/아티스트 관리',
          icon: <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.49878 3.83232C7.39699 3.93617 7.33997 4.07579 7.33997 4.22121C7.33997 4.36663 7.39699 4.50625 7.49878 4.6101L8.38767 5.49899C8.49152 5.60078 8.63114 5.65779 8.77656 5.65779C8.92198 5.65779 9.0616 5.60078 9.16545 5.49899L11.2599 3.40454C11.5392 4.02187 11.6238 4.70967 11.5024 5.37629C11.3809 6.04291 11.0592 6.65668 10.58 7.13581C10.1009 7.61494 9.48715 7.93667 8.82053 8.05813C8.15391 8.17959 7.46611 8.095 6.84878 7.81565L3.00989 11.6545C2.78888 11.8756 2.48912 11.9997 2.17656 11.9997C1.864 11.9997 1.56424 11.8756 1.34322 11.6545C1.12221 11.4335 0.998047 11.1338 0.998047 10.8212C0.998047 10.5086 1.12221 10.2089 1.34322 9.98787L5.18211 6.14899C4.90276 5.53166 4.81818 4.84385 4.93964 4.17724C5.0611 3.51062 5.38283 2.89685 5.86196 2.41772C6.34109 1.93859 6.95486 1.61686 7.62148 1.4954C8.28809 1.37394 8.9759 1.45852 9.59322 1.73787L7.50434 3.82676L7.49878 3.83232Z" stroke="white" />
          </svg>
          ,
          // list: [
          //   {
          //     tit: '관리자/아티스트 관리',
          //     href: '/admin/artist/info'
          //   },
          //   {
          //     tit: '관리자 로그 조회',
          //     href: '/admin/artist/log'
          //   },
          // ],
          // checkPath: '/artist/info', // url에 checkPath가 포함되어 있으면 열리는 아이템 입니다.
          href: '/admin/artist/info',
          adminMenu: false,
          isOpen: false,
        },
        {
          tit: '메신저 관리',
          icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.0231 12.2123C8.95203 12.7617 7.71998 12.9105 6.54892 12.6319C5.37787 12.3533 4.34483 11.6656 3.63596 10.6927C2.92709 9.71987 2.589 8.5258 2.68262 7.3257C2.77625 6.12561 3.29542 4.99842 4.14659 4.14725C4.99777 3.29607 6.12496 2.7769 7.32505 2.68328C8.52514 2.58965 9.71921 2.92774 10.6921 3.63661C11.665 4.34548 12.3527 5.37852 12.6313 6.54958C12.9099 7.72063 12.7611 8.95269 12.2116 10.0237L13.334 13.3346L10.0231 12.2123Z" stroke="white" />
          </svg>
          ,
          list: [
            {
              tit: '아티스트 발송 내역',
              href: '/admin/msg/artist'
            },
            {
              tit: '회원 발송 내역',
              href: '/admin/msg/user'
            },
          ],
          checkPath: '/admin/msg', // url에 checkPath가 포함되어 있으면 열리는 아이템 입니다.
          adminMenu: false,
          isOpen: false,
        },
        {
          tit: '아티스트 Letter',
          icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <g clipPath="url(#clip0_5808_24372)">
              <path d="M12.903 2.52014C13.0535 2.47832 13.2155 2.50957 13.3398 2.60412C13.4641 2.69868 13.5371 2.84576 13.5371 3.00191V11.0019C13.5371 11.1535 13.4684 11.297 13.3503 11.3919C13.232 11.4868 13.0764 11.5231 12.9284 11.4902L0.928385 8.82352C0.699725 8.77261 0.537109 8.56952 0.537109 8.33524V6.33524C0.537109 6.11073 0.68673 5.91367 0.902995 5.85347L12.903 2.52014ZM1.53711 6.7148V7.93355L12.5371 10.3782V3.65946L1.53711 6.7148Z" fill="white" />
              <path d="M2.6277 8.87313C2.69891 8.60639 2.9729 8.44781 3.23968 8.51896C3.50633 8.59024 3.66498 8.86422 3.59384 9.13094C3.53913 9.3361 3.52353 9.55091 3.54892 9.76245C3.57434 9.9739 3.64 10.1774 3.74098 10.3614C3.84199 10.5455 3.9767 10.7062 4.13616 10.8347C4.29551 10.9631 4.47673 11.0571 4.66936 11.1121C4.86208 11.167 5.06317 11.1824 5.26116 11.157C5.45918 11.1316 5.65132 11.0657 5.82627 10.963C6.00119 10.8603 6.15616 10.7223 6.28134 10.5561C6.40657 10.3898 6.49942 10.1987 6.55413 9.99357C6.62529 9.72676 6.89929 9.56824 7.16611 9.63941C7.43288 9.7106 7.59143 9.9846 7.52028 10.2514C7.43275 10.5795 7.28358 10.8876 7.08017 11.1576C6.87664 11.4278 6.62235 11.6552 6.33212 11.8256C6.04199 11.9959 5.72142 12.1058 5.38877 12.1485C5.05598 12.1913 4.71816 12.1657 4.39528 12.0737C4.07243 11.9815 3.77107 11.8249 3.50856 11.6134C3.24605 11.4018 3.02705 11.1396 2.86403 10.8425C2.70108 10.5456 2.59661 10.219 2.55608 9.88159C2.51557 9.5441 2.54017 9.20131 2.6277 8.87313Z" fill="white" />
            </g>
            <defs>
              <clipPath id="clip0_5808_24372">
                <rect width="13.3333" height="13.3333" fill="white" transform="translate(0.369141 0.333984)" />
              </clipPath>
            </defs>
          </svg>
          ,
          href: '/admin/letter',
          adminMenu: false,
          isOpen: false,
        },
        {
          tit: '게시글 관리',
          icon: <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
            <path d="M9.62435 1.16797H6.12435C5.80218 1.16797 5.54102 1.42914 5.54102 1.7513V2.91797C5.54102 3.24013 5.80218 3.5013 6.12435 3.5013H9.62435C9.94652 3.5013 10.2077 3.24013 10.2077 2.91797V1.7513C10.2077 1.42914 9.94652 1.16797 9.62435 1.16797Z" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M10.209 2.33203H11.3757C11.6851 2.33203 11.9818 2.45495 12.2006 2.67374C12.4194 2.89253 12.5423 3.18928 12.5423 3.4987V11.6654C12.5423 11.9748 12.4194 12.2715 12.2006 12.4903C11.9818 12.7091 11.6851 12.832 11.3757 12.832H4.37565C4.06623 12.832 3.76949 12.7091 3.55069 12.4903C3.3319 12.2715 3.20898 11.9748 3.20898 11.6654V3.4987C3.20898 3.18928 3.3319 2.89253 3.55069 2.67374C3.76949 2.45495 4.06623 2.33203 4.37565 2.33203H5.54232" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.875 6.41797H10.2083" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M7.875 9.33203H10.2083" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.54102 6.41797H5.54768" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M5.54102 9.33203H5.54768" stroke="white" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          ,
          list: [
            {
              tit: '공지사항 관리',
              href: '/admin/board/notice'
            },
            {
              tit: '미디어 관리',
              href: '/admin/board/media'
            },
            {
              tit: '스케줄 관리',
              href: '/admin/board/schedule'
            },
            {
              tit: '외부링크 관리',
              href: '/admin/board/link'
            },
            {
              tit: '다시보기 VOD 관리',
              href: '/admin/board/replay'
            },
          ],
          checkPath: '/admin/board', // url에 checkPath가 포함되어 있으면 열리는 아이템 입니다.
          adminMenu: false,
          isOpen: false,
        },
        {
          tit: '라이브 히스토리',
          icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <g clipPath="url(#clip0_5448_6673)">
              <path d="M12.7865 3.16862C12.9394 3.18246 13.0741 3.24624 13.1797 3.33333C13.2683 3.40636 13.3358 3.49439 13.3848 3.58594L13.4278 3.67839L13.4603 3.77279C13.4881 3.86869 13.5014 3.96788 13.5013 4.0651V10.6009L13.4968 10.7012C13.4873 10.8018 13.4631 10.9025 13.4232 10.998C13.3706 11.1242 13.2854 11.2515 13.1595 11.3483C13.03 11.4478 12.8614 11.5101 12.6758 11.4974C12.492 11.4847 12.3369 11.4021 12.224 11.2943V11.2936L9.3223 8.51693L9.28715 8.47982C9.12272 8.287 9.1277 7.99693 9.30668 7.8099C9.48573 7.62287 9.77546 7.60512 9.9753 7.76107L10.0137 7.79427L12.5013 10.1751V4.44076L9.98897 6.54557C9.77727 6.7228 9.46182 6.69475 9.28454 6.48307C9.10738 6.27137 9.13539 5.95591 9.34704 5.77865L12.2624 3.33724C12.3819 3.23711 12.5399 3.16692 12.7201 3.16602L12.7865 3.16862Z" fill="white" />
              <path d="M9.16667 4.44466C9.16667 3.84797 8.76649 3.5 8.42839 3.5H2.23828C1.90018 3.5 1.5 3.84797 1.5 4.44466V10.222C1.5 10.8187 1.90018 11.1667 2.23828 11.1667H8.42839C8.76649 11.1667 9.16667 10.8187 9.16667 10.222V4.44466ZM10.1667 10.222C10.1667 11.2208 9.45784 12.1667 8.42839 12.1667H2.23828C1.20882 12.1667 0.5 11.2208 0.5 10.222V4.44466C0.5 3.44586 1.20882 2.5 2.23828 2.5H8.42839C9.45784 2.5 10.1667 3.44586 10.1667 4.44466V10.222Z" fill="white" />
            </g>
            <defs>
              <clipPath id="clip0_5448_6673">
                <rect width="13.3333" height="13.3333" fill="white" transform="translate(0.332031 0.333984)" />
              </clipPath>
            </defs>
          </svg>
          ,
          // list: [
          //   {
          //     tit: '관리자/아티스트 관리',
          //     href: '/admin/artist/info'
          //   },
          //   {
          //     tit: '관리자 로그 조회',
          //     href: '/admin/artist/log'
          //   },
          // ],
          // checkPath: '/artist/info', // url에 checkPath가 포함되어 있으면 열리는 아이템 입니다.
          href: '/admin/live/history',
          adminMenu: false,
          isOpen: false,
        },
        // {
        //   tit: '스트리밍 관리',
        //   icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        //     <path d="M10 9.00941L12.9017 11.2813C12.9435 11.314 12.9921 11.3327 13.0423 11.3356C13.0925 11.3384 13.1424 11.3252 13.1867 11.2973C13.231 11.2695 13.268 11.228 13.2938 11.1774C13.3197 11.1268 13.3333 11.0689 13.3333 11.0099V5.66227C13.3333 5.60486 13.3205 5.54847 13.296 5.49879C13.2715 5.44911 13.2363 5.40789 13.1939 5.37929C13.1515 5.3507 13.1035 5.33574 13.0546 5.33594C13.0057 5.33613 12.9578 5.35147 12.9156 5.3804L10 7.37825" stroke="white" />
        //     <path d="M8.95173 4.66797H3.71363C3.13505 4.66797 2.66602 5.21518 2.66602 5.89019V10.7791C2.66602 11.4541 3.13505 12.0013 3.71363 12.0013H8.95173C9.53031 12.0013 9.99935 11.4541 9.99935 10.7791V5.89019C9.99935 5.21518 9.53031 4.66797 8.95173 4.66797Z" stroke="white" />
        //   </svg>
        //   ,
        //   href: '/admin/streaming',
        //   adminMenu: false,
        //   isOpen: false,
        // },
        // {
        //   tit: '다시보기 VOD 관리',
        //   icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        //     <path d="M6.88867 5.30651C6.88881 5.23251 6.90866 5.15987 6.94617 5.09608C6.98369 5.03229 7.03751 4.97964 7.10212 4.94354C7.16673 4.90745 7.23978 4.88921 7.31378 4.89071C7.38777 4.89221 7.46002 4.91339 7.52312 4.95207L9.55867 6.20151C9.61934 6.23879 9.66944 6.291 9.70419 6.35314C9.73895 6.41529 9.7572 6.48531 9.7572 6.55651C9.7572 6.62772 9.73895 6.69773 9.70419 6.75988C9.66944 6.82203 9.61934 6.87423 9.55867 6.91151L7.52312 8.16151C7.45994 8.20024 7.38758 8.22142 7.3135 8.22288C7.23941 8.22433 7.16628 8.20599 7.10164 8.16977C7.037 8.13354 6.98318 8.08073 6.94575 8.01678C6.90832 7.95283 6.88861 7.88006 6.88867 7.80596V5.30651Z" stroke="white" />
        //     <path d="M8 10.4453V12.6675" stroke="white" />
        //     <path d="M5.77734 12.666H10.2218" stroke="white" />
        //     <path d="M12.4434 2.66602H3.55447C2.94082 2.66602 2.44336 3.16348 2.44336 3.77713V9.33268C2.44336 9.94633 2.94082 10.4438 3.55447 10.4438H12.4434C13.057 10.4438 13.5545 9.94633 13.5545 9.33268V3.77713C13.5545 3.16348 13.057 2.66602 12.4434 2.66602Z" stroke="white" />
        //   </svg>

        //   ,
        //   list: [
        //     {
        //       tit: '다시보기 관리',
        //       href: '/admin/vod/replay'
        //     },
        //     {
        //       tit: '댓글 관리',
        //       href: '/admin/vod/comment'
        //     },
        //   ],
        //   checkPath: '/admin/vod', // url에 checkPath가 포함되어 있으면 열리는 아이템 입니다.
        //   adminMenu: false,
        //   isOpen: false,
        // },
        {
          tit: '구독 관리',
          icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className='noChange' d="M7.65073 1.41738C7.67918 1.23587 7.94189 1.23587 7.97034 1.41738C8.50101 4.80191 11.1224 7.48085 14.5036 8.09366L14.6891 8.12741C14.8583 8.15808 14.8475 8.40351 14.6764 8.41928C11.2654 8.72838 8.51402 11.3331 8.0296 14.713L7.96752 15.1455C7.94137 15.3265 7.6797 15.3265 7.65356 15.1455L7.59147 14.713C7.10705 11.3331 4.35567 8.72838 0.944633 8.41928C0.773581 8.40348 0.762762 8.15808 0.931934 8.12741L1.11749 8.09366C4.49866 7.48086 7.12006 4.80191 7.65073 1.41738Z" fill="white" />
          </svg>
          ,
          list: [
            {
              tit: '구독상품 관리',
              href: '/admin/subs/product'
            },
            {
              tit: '멤버십 구독자 관리',
              href: '/admin/subs/user'
            },
            {
              tit: '멤버십 구독 안내문구 관리',
              href: '/admin/subs/description'
            },
            {
              tit: '폰트 구독자 관리',
              href: '/admin/subs/font_user'
            },
            {
              tit: '폰트 구독 안내문구 관리',
              href: '/admin/subs/font_description'
            },
          ],
          checkPath: '/admin/subs',
          adminMenu: false,
          isOpen: false,
        },
        // {
        //   tit: '후원(하트) 관리',
        //   icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        //     <g>
        //       <path d="M11.8878 9.11306C12.7156 8.30195 13.5545 7.32973 13.5545 6.05751C13.5545 5.24713 13.2325 4.46993 12.6595 3.8969C12.0865 3.32388 11.3093 3.00195 10.4989 3.00195C9.52114 3.00195 8.83225 3.27973 7.99891 4.11306C7.16558 3.27973 6.47669 3.00195 5.49891 3.00195C4.68853 3.00195 3.91134 3.32388 3.33831 3.8969C2.76528 4.46993 2.44336 5.24713 2.44336 6.05751C2.44336 7.33529 3.27669 8.30751 4.11003 9.11306L7.99891 13.002L11.8878 9.11306Z" stroke="white" />
        //     </g>
        //     <defs>
        //       <clipPath id="clip0_1958_41457">
        //         <rect width="13.3333" height="13.3333" fill="white" transform="translate(1.33398 1.33398)" />
        //       </clipPath>
        //     </defs>
        //   </svg>
        //   ,
        //   href: '/admin/heart',
        //   adminMenu: false,
        //   isOpen: false,
        // },
        {
          tit: '설정 관리  ',
          icon: <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M7.12222 1.44727H6.87778C6.58309 1.44727 6.30048 1.56433 6.0921 1.7727C5.88373 1.98108 5.76667 2.26369 5.76667 2.55838V2.65838C5.76647 2.85322 5.71503 3.04459 5.61752 3.21329C5.52001 3.38198 5.37985 3.52206 5.21111 3.61949L4.97222 3.75838C4.80331 3.8559 4.61171 3.90724 4.41667 3.90724C4.22163 3.90724 4.03002 3.8559 3.86111 3.75838L3.77778 3.71393C3.52281 3.56686 3.21991 3.52696 2.93556 3.60299C2.6512 3.67903 2.40864 3.86479 2.26111 4.11949L2.13889 4.3306C1.99181 4.58556 1.95191 4.88847 2.02795 5.17282C2.10399 5.45717 2.28974 5.69974 2.54445 5.84727L2.62778 5.90282C2.79571 5.99977 2.93535 6.13898 3.03281 6.30662C3.13027 6.47425 3.18216 6.66447 3.18333 6.85838V7.14171C3.18411 7.3375 3.13314 7.53002 3.03558 7.69977C2.93802 7.86952 2.79734 8.01048 2.62778 8.10838L2.54445 8.15838C2.28974 8.3059 2.10399 8.54847 2.02795 8.83282C1.95191 9.11717 1.99181 9.42008 2.13889 9.67504L2.26111 9.88615C2.40864 10.1409 2.6512 10.3266 2.93556 10.4026C3.21991 10.4787 3.52281 10.4388 3.77778 10.2917L3.86111 10.2473C4.03002 10.1497 4.22163 10.0984 4.41667 10.0984C4.61171 10.0984 4.80331 10.1497 4.97222 10.2473L5.21111 10.3862C5.37985 10.4836 5.52001 10.6237 5.61752 10.7924C5.71503 10.961 5.76647 11.1524 5.76667 11.3473V11.4473C5.76667 11.742 5.88373 12.0246 6.0921 12.2329C6.30048 12.4413 6.58309 12.5584 6.87778 12.5584H7.12222C7.41691 12.5584 7.69952 12.4413 7.9079 12.2329C8.11627 12.0246 8.23333 11.742 8.23333 11.4473V11.3473C8.23353 11.1524 8.28497 10.961 8.38248 10.7924C8.47999 10.6237 8.62015 10.4836 8.78889 10.3862L9.02778 10.2473C9.19669 10.1497 9.38829 10.0984 9.58333 10.0984C9.77837 10.0984 9.96998 10.1497 10.1389 10.2473L10.2222 10.2917C10.4772 10.4388 10.7801 10.4787 11.0644 10.4026C11.3488 10.3266 11.5914 10.1409 11.7389 9.88615L11.8611 9.66949C12.0082 9.41452 12.0481 9.11162 11.9721 8.82727C11.896 8.54291 11.7103 8.30035 11.4556 8.15282L11.3722 8.10838C11.2027 8.01048 11.062 7.86952 10.9644 7.69977C10.8669 7.53002 10.8159 7.3375 10.8167 7.14171V6.86393C10.8159 6.66814 10.8669 6.47563 10.9644 6.30587C11.062 6.13612 11.2027 5.99516 11.3722 5.89727L11.4556 5.84727C11.7103 5.69974 11.896 5.45717 11.9721 5.17282C12.0481 4.88847 12.0082 4.58556 11.8611 4.3306L11.7389 4.11949C11.5914 3.86479 11.3488 3.67903 11.0644 3.60299C10.7801 3.52696 10.4772 3.56686 10.2222 3.71393L10.1389 3.75838C9.96998 3.8559 9.77837 3.90724 9.58333 3.90724C9.38829 3.90724 9.19669 3.8559 9.02778 3.75838L8.78889 3.61949C8.62015 3.52206 8.47999 3.38198 8.38248 3.21329C8.28497 3.04459 8.23353 2.85322 8.23333 2.65838V2.55838C8.23333 2.26369 8.11627 1.98108 7.9079 1.7727C7.69952 1.56433 7.41691 1.44727 7.12222 1.44727Z" stroke="white" />
              <path d="M7.00065 8.66927C7.92113 8.66927 8.66732 7.92308 8.66732 7.0026C8.66732 6.08213 7.92113 5.33594 7.00065 5.33594C6.08018 5.33594 5.33398 6.08213 5.33398 7.0026C5.33398 7.92308 6.08018 8.66927 7.00065 8.66927Z" stroke="white" />
            </g>
            <defs>
              <clipPath id="clip0_1958_16363">
                <rect width="13.3333" height="13.3333" fill="white" transform="translate(0.333984 0.333984)" />
              </clipPath>
            </defs>
          </svg>
          ,
          list: [
            {
              tit: '푸시 알림 관리',
              href: '/admin/setting/push'
            },
            {
              tit: '서비스 약관 관리',
              href: '/admin/setting/term'
            },
            {
              tit: '금지어 관리',
              href: '/admin/setting/forbiddenword'
            },
            {
              tit: '앱 업데이트 관리',
              href: '/admin/setting/update'
            },
            {
              tit: '메인 배너 관리',
              href: '/admin/setting/banner'
            },
          ],
          checkPath: '/admin/setting',
          adminMenu: true,
          isOpen: false,
        },
        // {
        //   tit: '이미지 관리',
        //   icon: <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        //     <path d="M4.11111 2.99902H11.8889C12.5025 2.99902 13 3.49648 13 4.11013V11.8879C13 12.5016 12.5025 12.999 11.8889 12.999H4.11111C3.49746 12.999 3 12.5016 3 11.8879V4.11013C3 3.49648 3.49746 2.99902 4.11111 2.99902Z" stroke="white" />
        //     <path d="M9.66623 7.4439C9.05258 7.4439 8.55512 6.94644 8.55512 6.33279C8.55512 5.71914 9.05258 5.22168 9.66623 5.22168C10.2799 5.22168 10.7773 5.71914 10.7773 6.33279C10.7773 6.94644 10.2799 7.4439 9.66623 7.4439Z" stroke="white" />
        //     <path d="M3.00065 9.66476L4.7151 7.95032C4.92346 7.74202 5.20602 7.625 5.50065 7.625C5.79528 7.625 6.07784 7.74202 6.28621 7.95032L11.334 12.9981" stroke="white" />
        //   </svg>
        //   ,
        //   list: [
        //     {
        //       tit: '스플래쉬 이미지',
        //       href: '/admin/image_setting/splash'
        //     },
        //     {
        //       tit: '로그인 이미지',
        //       href: '/admin/image_setting/login'
        //     },
        //     {
        //       tit: '메인 배너 관리',
        //       href: '/admin/image_setting/banner'
        //     },
        //     {
        //       tit: '팝업 관리',
        //       href: '/admin/image_setting/popup'
        //     },
        //     {
        //       tit: '온보딩 관리',
        //       href: '/admin/image_setting/onboarding'
        //     },
        //   ],
        //   checkPath: '/admin/image_setting',
        //   adminMenu: false,
        //   isOpen: false,
        // },
        {
          tit: '고객센터 관리',
          icon: <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="M3 7.44727H4.66667C4.96135 7.44727 5.24397 7.56433 5.45234 7.7727C5.66071 7.98108 5.77778 8.26369 5.77778 8.55838V10.225C5.77778 10.5197 5.66071 10.8023 5.45234 11.0107C5.24397 11.2191 4.96135 11.3362 4.66667 11.3362H4.11111C3.81643 11.3362 3.53381 11.2191 3.32544 11.0107C3.11706 10.8023 3 10.5197 3 10.225V7.44727ZM3 7.44727C3 6.79066 3.12933 6.14048 3.3806 5.53385C3.63188 4.92722 4.00017 4.37602 4.46447 3.91173C4.92876 3.44744 5.47996 3.07914 6.08658 2.82787C6.69321 2.57659 7.34339 2.44727 8 2.44727C8.65661 2.44727 9.30679 2.57659 9.91342 2.82787C10.52 3.07914 11.0712 3.44744 11.5355 3.91173C11.9998 4.37602 12.3681 4.92722 12.6194 5.53385C12.8707 6.14048 13 6.79066 13 7.44727M13 7.44727V10.225C13 10.5197 12.8829 10.8023 12.6746 11.0107C12.4662 11.2191 12.1836 11.3362 11.8889 11.3362H11.3333C11.0386 11.3362 10.756 11.2191 10.5477 11.0107C10.3393 10.8023 10.2222 10.5197 10.2222 10.225V8.55838C10.2222 8.26369 10.3393 7.98108 10.5477 7.7727C10.756 7.56433 11.0386 7.44727 11.3333 7.44727H13Z" stroke="white" />
              <path d="M13 10.2227V11.3338C13 11.9231 12.7659 12.4884 12.3491 12.9051C11.9324 13.3219 11.3671 13.556 10.7778 13.556H8" stroke="white" />
            </g>
            <defs>
              <clipPath id="clip0_1958_23635">
                <rect width="13.3333" height="13.3333" fill="white" transform="translate(1.33398 1.33398)" />
              </clipPath>
            </defs>
          </svg>
          ,
          list: [
            {
              tit: '앱 공지사항 관리',
              href: '/admin/customer_service/notice'
            },
            {
              tit: 'FAQ 관리',
              href: '/admin/customer_service/faq'
            },
            {
              tit: '문의사항 관리',
              href: '/admin/customer_service/inquiries'
            },
          ],
          checkPath: '/admin/customer_service',
          adminMenu: false,
          isOpen: false,
        },
      ]
    },

  ])
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const admLayoutSwitch = useAdmLayoutSwitch((state) => state.admLayoutSwitch)

  const closeAllMenu = () => {
    setMenuList(
      menuList.map(item => {
        item.item.map(item2 => {
          item2.isOpen = false;
        });
        return item;
      }),
    );
  };

  useEffect(() => {
    // document.querySelectorAll('.adm--l .link').forEach(el => {
    //   const href = el.getAttribute('href');
    //   if (href && location.pathname.includes(href)) {
    //     el.classList.add('active');

    //     //side list open
    //     closeAllMenu();
    //     setMenuList(
    //       menuList.map((item: any) => {
    //         item.item.map((item2: any) => {
    //           if (
    //             item2.list?.filter((item2: any) => item2.href == href).length >
    //             0
    //           ) {
    //             item2.isOpen = true;
    //           }
    //           return item2;
    //         });
    //         return item;
    //       }),
    //     );
    //   } else {
    //     el.classList.remove('active');
    //   }
    // });

    // const pathName = location.pathname;

    setNowPathName(pathname);


    const target: any[] = menuList[0].item.filter((item2: IMenuItem) => {
      if (item2.checkPath && pathname.startsWith(item2.checkPath)) {
        return true;
      }
    });

    if (target.length == 0) {
      return;
    }

    setMenuList(
      menuList.map(item2 => {
        item2.item.map(item3 => {
          if (item3 == target[0]) {
            item3.isOpen = true;
          }
        });
        return item2;
      }),
    );

  }, [pathname, searchParams]);

  useEffect(() => {
    // closeAllMenu()
  }, [admLayoutSwitch.admLeftSwitch]);

  const switchThisMenu = (item: any) => {
    if (!item.isOpen) {
      closeAllMenu();
      setMenuList(
        menuList.map(item2 => {
          item2.item.map(item3 => {
            if (item3 == item) {
              item3.isOpen = true;
            }
          });
          return item2;
        }),
      );
    } else {
      closeAllMenu();
    }
  }

  const handleRouter = async (href: string) => {

    // 실제로 해당 href가 존재하는지 서버에 요청하여 확인
    const isValidHref = async (href: string) => {
      // 외부 링크는 바로 true
      if (href.startsWith('http')) return true;
      try {
        const res = await fetch(href, { method: 'HEAD' });
        return res.ok;
      } catch (e) {
        return false;
      }
    };

    const valid = await isValidHref(href);
    if (!valid) {
      alert('아직 구현중인 페이지입니다.');
      return;
    }

    if (href.startsWith('http')) {
      window.open(href, '_blank');
    } else {
      router.push(href);
    }
  }

  return (
    <div className="adm--l">
      <div className="adm--l-top">
        {/* <Link href="/" className="adm--l-logo btn">
                    <div className="adm--l-logo-lg"><img src="/image/icon_admlogo_lg.svg" alt="" /></div>
                    <div className="adm--l-logo-sm"><img src="/image/icon_admlogo_sm.svg" alt="" /></div>
                </Link>
                <div className="adm--l-close"><span></span><span></span></div> */}
      </div>
      <div className="adm--l-body" style={{ display: 'flex', flexDirection: 'column' }}>
        {menuList.map((dep1: any) => {
          return (
            <Fragment key={dep1.tit}>
              <div className="adm--l-list-tit">
                {' '}
                {dep1.tit}{' '}
              </div>
              <div className="adm--l-list">
                {dep1.item.map((dep2: any) => {
                  return dep2.href ? (
                    <div
                      className={`adm--l-item link ${nowPathName.startsWith(dep2.href) ? 'active' : 'notActive'}`}
                      key={dep2.tit}
                      data-url={dep2.href}
                      onClick={() => handleRouter(dep2.href)}
                      style={{ display: 'flex', cursor: 'pointer' }}>
                      <div className="adm--l-tit adm--l-tit1">
                        <div className="adm--l-icon">
                          <div className="adm--l-icon-bg"></div>
                          {dep2.icon}
                        </div>
                        <div className="adm--l-tit-p">
                          <div className='adm--l-tit-icon-small'>{dep2.icon}</div>
                          <p>{dep2.tit}</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`adm--l-item ${dep2.isOpen ? '' : 'hide'} ${nowPathName.startsWith(dep2.checkPath) ? 'active' : 'notActive'}`}
                      key={dep2.tit}
                      data-url={dep2.checkPath}
                      style={{ display: 'flex' }}>
                      <div
                        className="adm--l-tit adm--l-tit1 adm--l-trigger"
                        onClick={e => switchThisMenu(dep2)}>
                        <div className="adm--l-icon">
                          <div className="adm--l-icon-bg"></div>
                          {dep2.icon}
                        </div>
                        <div className="adm--l-tit-p">
                          <div className='adm--l-tit-icon-small'>{dep2.icon}</div>
                          <p>{dep2.tit}</p>
                        </div>
                        <div className="adm--l-tit1-arr"></div>
                      </div>
                      <div className="adm--l-list2">
                        {dep2.list.map((dep3: any) => {
                          return (
                            <div
                              className={`adm--l-item2 link ${nowPathName.startsWith(dep3.href) ? 'sub_active' : 'sub_notActive'}`}
                              key={dep3.tit}
                              onClick={() => handleRouter(dep3.href)}
                              style={{ display: 'flex', cursor: 'pointer' }}>
                              <div className="adm--l-tit">
                                <div data-depth="3" className="adm--l-tit-p"><p>{dep3.tit}</p></div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </Fragment>
          );
        })}
        <div style={{ height: '100%' }}></div>
        <div className='l-footer'>
          오류 문의 : dev@slash.builders
        </div>
      </div>
    </div>
  );
}
