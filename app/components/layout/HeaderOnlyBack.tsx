'use client'

import { useRouter } from "next/navigation";

const HeaderOnlyBack = (props: {title: React.ReactNode, color: string}) => {

    const router = useRouter();
    const goBack = () => {
        router.back();
    }
    return (
        <div className={`header__sub ${props.color}`}>
            <div className="header__sub_wrap">
                <div className="header__sub_l">
                    {/* <div className="header__sub_back" onClick={goBack}><span></span></div> */}
                </div>
                <div className="header__sub_tit">{props.title}</div>
                <div className="header__sub_r">
                    <div className="header__sub_close" onClick={goBack}><span></span><span></span></div>
                </div>
            </div>
        </div>
    )
}

export default HeaderOnlyBack;