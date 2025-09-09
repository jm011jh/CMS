'use client'

import useAdmLayoutSwitch from "@/app/admin/store"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Logout } from "../../lib/Logout"

export default function AdminTopBar() {

    const router = useRouter();

    const userInfo = "";


    const [notiList, setNotiList] = useState<any>([])
    const [notiSwitch, setNotiSwitch] = useState<boolean>(false)
    const [srchSwitch, setSrchSwitch] = useState<boolean>(false)
    const admLayoutSwitch = useAdmLayoutSwitch((state) => state.admLayoutSwitch)
    const setAdmLayoutSwitch = useAdmLayoutSwitch((state) => state.setAdmLayoutSwitch)

    const clearNotiFn = () => {
        setNotiList([])
        setNotiSwitch(false)
    }
    const setAdmLeftSwitch = (is: string) => {
        setAdmLayoutSwitch({ admLeftSwitch: is })
    }
    useEffect(() => {
        // axios.get('https://pokeapi.co/api/v2/pokemon').then((r) => setNotiList(r.data.results))
        setNotiList([
            { name: "알람1", "url": "test1", date: "2024-04-01 11:10:10" },
            { name: "알람2", "url": "test2", date: "2024-04-01 10:10:10" },
            { name: "알람3", "url": "test3", date: "2024-04-01 00:10:10" },
            { name: "알람4", "url": "test4", date: "2024-03-31 11:10:10" },
            { name: "알람5", "url": "test5", date: "2024-03-31 09:10:10" },
            { name: "알람6", "url": "test6", date: "2024-03-01 11:10:10" },
            { name: "알람7", "url": "test7", date: "2023-06-01 11:10:10" },
        ]);
        document.addEventListener('click', (e: any) => {
            if (e.target.closest('.adm--topbar-btnItem.noti') === null) {
                setNotiSwitch(false)
            }
            if (e.target.closest('.adm--topbar-btnItem.srch') === null) {
                setSrchSwitch(false)
            }
        })
    }, [])

    const adminOut = () => {
        if (confirm("로그아웃 하시겠습니까?")) {
            // removeToken();
            // router.push("/");
            Logout();
        }
    }

    return (
        <div className="adm--topbar">
            <div className="adm--topbar-l">
                <div className="adm--topbar-toggleLeftBar"><button onClick={e => setAdmLeftSwitch(admLayoutSwitch.admLeftSwitch == 'closed' ? 'open' : 'closed')} className="btn adm--topbar-toggleLeftBar-btn"><span></span><span></span><span></span></button></div>
                <div className="adm--topbar-logo">
                    <div className="btn" style={{ cursor: 'default' }}>
                        <img className="logo-light" src="/image/logo_jisoo_purple.png" alt="" />
                        <img className="logo-dark" src="/image/logo_jisoo_purple.png" alt="" />
                    </div>
                    {/* <Link href="/" className="btn">
                        <img className="logo-light" src="/image/logo_jisoo_purple.png" alt="" />
                        <img className="logo-dark" src="/image/logo_jisoo_purple.png" alt="" />
                    </Link> */}
                </div>
                {/* <div className="adm--topbar-search">
                    <form>
                        <label htmlFor="srch" className="search-input-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 17" fill="none">
                                <rect width="16" height="16" transform="translate(0 0.917969)"/>
                                <path d="M14.5 14.7109L10.7239 10.9349C11.6313 9.84555 12.0838 8.44835 11.9872 7.03392C11.8907 5.6195 11.2525 4.29675 10.2055 3.34085C9.15855 2.38495 7.78335 1.86948 6.366 1.90169C4.94865 1.9339 3.59828 2.5113 2.59581 3.51377C1.59333 4.51625 1.01593 5.86662 0.983723 7.28397C0.951515 8.70132 1.46698 10.0765 2.42288 11.1235C3.37879 12.1705 4.70153 12.8086 6.11596 12.9052C7.53038 13.0017 8.92758 12.5493 10.0169 11.6419L13.7929 15.418L14.5 14.7109ZM2 7.41796C2 6.52795 2.26392 5.65792 2.75838 4.9179C3.25285 4.17788 3.95565 3.6011 4.77792 3.26051C5.60019 2.91991 6.50499 2.8308 7.3779 3.00443C8.25082 3.17806 9.05264 3.60665 9.68198 4.23598C10.3113 4.86532 10.7399 5.66714 10.9135 6.54006C11.0872 7.41297 10.998 8.31777 10.6575 9.14004C10.3169 9.96231 9.74008 10.6651 9.00006 11.1596C8.26004 11.654 7.39001 11.918 6.5 11.918C5.30693 11.9166 4.1631 11.4421 3.31948 10.5985C2.47585 9.75486 2.00132 8.61103 2 7.41796Z" fill="#161616"/>
                            </svg>
                        </label>
                        <div className="search-input-box">
                            <input id="srch" name="srch" type="search" className="adm--topbar-search-input" placeholder="검색어를 입력하세요"/>
                            <button type="submit" className="adm--topbar-search-submit btn primary">검색</button>
                        </div>
                    </form>
                </div> */}
            </div>
            <div className="adm--topbar-r">
                <div className="adm--topbar-btnList">
                    <div className={srchSwitch ? "adm--topbar-btnItem srch" : "adm--topbar-btnItem srch off"}>
                        {/* <button className="adm--topbar-btnItem-btn btn" onClick={e => setSrchSwitch(!srchSwitch)}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 17" fill="none">
                                <rect width="16" height="16" transform="translate(0 0.917969)"/>
                                <path d="M14.5 14.7109L10.7239 10.9349C11.6313 9.84555 12.0838 8.44835 11.9872 7.03392C11.8907 5.6195 11.2525 4.29675 10.2055 3.34085C9.15855 2.38495 7.78335 1.86948 6.366 1.90169C4.94865 1.9339 3.59828 2.5113 2.59581 3.51377C1.59333 4.51625 1.01593 5.86662 0.983723 7.28397C0.951515 8.70132 1.46698 10.0765 2.42288 11.1235C3.37879 12.1705 4.70153 12.8086 6.11596 12.9052C7.53038 13.0017 8.92758 12.5493 10.0169 11.6419L13.7929 15.418L14.5 14.7109ZM2 7.41796C2 6.52795 2.26392 5.65792 2.75838 4.9179C3.25285 4.17788 3.95565 3.6011 4.77792 3.26051C5.60019 2.91991 6.50499 2.8308 7.3779 3.00443C8.25082 3.17806 9.05264 3.60665 9.68198 4.23598C10.3113 4.86532 10.7399 5.66714 10.9135 6.54006C11.0872 7.41297 10.998 8.31777 10.6575 9.14004C10.3169 9.96231 9.74008 10.6651 9.00006 11.1596C8.26004 11.654 7.39001 11.918 6.5 11.918C5.30693 11.9166 4.1631 11.4421 3.31948 10.5985C2.47585 9.75486 2.00132 8.61103 2 7.41796Z" fill="#161616"/>
                            </svg>
                        </button>
                        <div className="adm--topbar-btnItem-dropdown adm--dropdown-box">
                            <form>
                                <div className="search-input-box">
                                    <input type="search" className="adm--topbar-search-input" placeholder="검색어를 입력하세요"/>
                                    <button type="submit" className="adm--topbar-search-submit btn">검색</button>
                                </div>
                            </form>
                        </div> */}
                    </div>
                </div>
                {/* <Link href="" className="adm--topbar-user btn">
                    <div className="adm--topbar-user-box">
                        <div className="adm--topbar-user-img"><img src={"/img.png"} alt="" /></div>
                        <div className="adm--topbar-user-txt">
                            <div className="adm--topbar-user-name">{"user name here"}</div>
                            <div className="adm--topbar-user-type">{"user id here"}</div>
                        </div>
                    </div>
                </Link> */}
                <button className="adm--topbar-logout btn" onClick={adminOut}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="17" viewBox="0 0 16 17" fill="none">
                        <rect width="16" height="16" transform="translate(0 0.917969)" />
                        <path d="M3 15.918H9C9.26512 15.9177 9.5193 15.8122 9.70677 15.6247C9.89424 15.4373 9.9997 15.1831 10 14.918V13.418H9V14.918H3V2.91797H9V4.41797H10V2.91797C9.9997 2.65285 9.89424 2.39867 9.70677 2.2112C9.5193 2.02373 9.26512 1.91827 9 1.91797H3C2.73488 1.91827 2.4807 2.02373 2.29323 2.2112C2.10576 2.39867 2.0003 2.65285 2 2.91797V14.918C2.0003 15.1831 2.10576 15.4373 2.29323 15.6247C2.4807 15.8122 2.73488 15.9177 3 15.918Z" fill="#fff" />
                        <path d="M10.293 11.211L12.086 9.41797H5V8.41797H12.086L10.293 6.62497L11 5.91797L14 8.91797L11 11.918L10.293 11.211Z" fill="#fff" />
                    </svg>
                </button>
            </div>
        </div>
    )
}