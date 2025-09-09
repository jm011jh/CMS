'use client'
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// import { App as CapacitorApp } from "@capacitor/app";
// import { Toast } from "@capacitor/toast";
// import MobileFooter from "./components/layout/MobileFooter";
// import MobileCheckerSingleton from "@/lib/util/MobileCheckerSingleton";
// import { version } from "../package.json"

export default function PublicFunction() {

    //version
    // console.log("now : " + version);

    // // const userInfo = useAppSelector((state: any) => state.userInfo);
    // const pathName = usePathname()
    // const searchParam = useSearchParams()

    // function checkAdminType () {

    //     const local_COSS_UID : any = localStorage.getItem('COSS_UI')
    //     const data_COSS_UID = JSON.parse(local_COSS_UID)

    //     if(pathName.includes('/admin')) {
    //         if(!data_COSS_UID) {
    //             alert('잘못된 접근입니다.')
    //             window.location.href = '/login'
    //         }
    //         if(data_COSS_UID.type1 !== 'A') {
    //             alert('관리자만 접근 가능합니다.')
    //             window.location.href = '/'
    //         }
    //     }

    // }

    // // path가 바뀔 때 마다 실행
    // useEffect(()=>{

    //     checkAdminType()

    // },[pathName])

    //back button handle
    //Registration of push in Android and Windows Phone
    // let lastTimeBackPress: number = 0;
    // const timePeriodToExit: number = 2000;

    // const showHelloToast = async () => {
    //     await Toast.show({
    //         text: '한번 더 누르시면 종료됩니다.',
    //         duration: 'short',
    //         position: 'bottom'
    //     });
    // };

    // //app에서 뒤로가기
    // useEffect(() => {
    //     console.log("backButton reg")
    //     CapacitorApp.removeAllListeners();
    //     CapacitorApp.addListener('backButton', ({ canGoBack }) => {
    //         // if (!canGoBack) {
    //         //   //Double check to exit app
    //         //   if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
    //         //     //this.platform.exitApp(); //Exit from app

    //         //     CapacitorApp.exitApp();
    //         //   } else {

    //         //     showHelloToast();

    //         //     lastTimeBackPress = new Date().getTime();
    //         //   }
    //         // } else {
    //         //   // window.history.back();
    //         //   router.back();
    //         // }

    //         //Double check to exit app
    //         if (new Date().getTime() - lastTimeBackPress < timePeriodToExit) {
    //             //this.platform.exitApp(); //Exit from app

    //             CapacitorApp.exitApp();
    //         } else {

    //             showHelloToast();

    //             lastTimeBackPress = new Date().getTime();
    //         }
    //     })

    //     // return () => CapacitorApp.removeAllListeners();
    // }, [])

    // const [isMobile, setIsMobile] = useState(false);

    // useEffect(() => {
    //     //mobile
    //     const initMobile = async () => {
    //         const mobileChecker = await MobileCheckerSingleton.getInstance();
    //         setIsMobile(mobileChecker.getIsMobile());
    //     }

    //     initMobile();
    // }, [])

    return (
        <>
            {/* {
                isMobile &&
                    <MobileFooter />
            } */}
        </>
    )
}