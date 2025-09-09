"use client"

import { useState } from "react"
// import GuideModal from "./GuideModal";

export default function AdminPgTop ( props : any ) {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div className="adm--pg-top">
            <div className="adm--pg-top-tit">
                {props.tit}
                {props.fileUrl!=null && <div className="adm--pg-top-info-btn" onClick={e=>setModalIsOpen(true)}><img src="/image/icon_info.png" alt=""/></div>}
                
            </div>
            {/* <div className="adm--pg-top-map">
                {
                    props.depth1 ? <><p>{props.depth1}</p><span></span></> : ''
                }
                {
                    props.depth2 ? <><p>{props.depth2}</p></> : ''
                }
                {
                    props.depth3 ? <><span></span><p>{props.depth3}</p></> : ''
                }
            </div> */}
            <div className="adm--pg-top-mail">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none"><rect width="16" height="16" fill="white" /><path d="M5.5 8.5C5.91422 8.5 6.25 8.16421 6.25 7.75C6.25 7.33579 5.91422 7 5.5 7C5.08579 7 4.75 7.33579 4.75 7.75C4.75 8.16421 5.08579 8.5 5.5 8.5Z" fill="#8C959F"/><path d="M6 6H5V4H6C6.26522 4 6.51957 3.89464 6.70711 3.70711C6.89464 3.51957 7 3.26522 7 3C7 2.73478 6.89464 2.48043 6.70711 2.29289C6.51957 2.10536 6.26522 2 6 2H5C4.73488 2.0003 4.4807 2.10576 4.29323 2.29323C4.10576 2.4807 4.00031 2.73488 4 3V3.25H3V3C3.0006 2.46975 3.2115 1.96139 3.58645 1.58644C3.96139 1.2115 4.46975 1.0006 5 1H6C6.53043 1 7.03914 1.21071 7.41422 1.58579C7.78929 1.96086 8 2.46957 8 3C8 3.53043 7.78929 4.03914 7.41422 4.41421C7.03914 4.78929 6.53043 5 6 5V6Z" fill="#8C959F"/><path d="M11.224 10.5168C11.7241 9.91829 12.0908 9.21995 12.2997 8.46843C12.5086 7.71691 12.5547 6.92948 12.4352 6.1587C12.3156 5.38791 12.033 4.65148 11.6063 3.99855C11.1796 3.34563 10.6185 2.79121 9.96055 2.3723L9.46105 3.2373C10.113 3.66382 10.643 4.25234 10.9991 4.94524C11.3553 5.63813 11.5254 6.41165 11.4928 7.19004C11.4601 7.96842 11.2259 8.72499 10.813 9.38565C10.4001 10.0463 9.82273 10.5884 9.13738 10.9589C8.45203 11.3293 7.68221 11.5154 6.90331 11.499C6.12442 11.4825 5.36315 11.2641 4.69406 10.865C4.02497 10.4659 3.47099 9.89989 3.08638 9.22237C2.70177 8.54486 2.49972 7.77907 2.5 7H1.5C1.4992 8.04523 1.79648 9.06902 2.35697 9.95127C2.91746 10.8335 3.71792 11.5376 4.66445 11.981C5.61098 12.4244 6.66432 12.5887 7.70092 12.4546C8.73751 12.3205 9.71437 11.8936 10.5169 11.2239L14.293 15L15 14.2929L11.224 10.5168Z" fill="#8C959F"/></svg>
                <p>오류 문의 : dev@slash.builders</p>
            </div>
            {/* {props.fileUrl!=null && <GuideModal modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} fileUrl={props.fileUrl} />} */}
        </div>
    )
}