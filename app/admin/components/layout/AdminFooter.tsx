export default function AdminFooter() {

    const branch = process.env.CURRENT_BRANCH;
    const version = process.env.VERSION;

    return (
        <div className="adm--ft adm-ft-font">
            <div>
                2025 © SLASH Environment : {branch} | {version}
            </div>
            <div className="adm-ft-right">
                <div onClick={() => window.open("https://www.slash.builders", "_blank")}>About</div>
                {/* <div>Support</div> */}
                {/* <div>Contact Us</div> */}
            </div>
        </div>
    )
}