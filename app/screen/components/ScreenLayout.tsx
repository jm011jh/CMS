import dynamic from "next/dynamic";
interface IScreenLayout {
    children: React.ReactNode | React.ReactNode[];
    logoType?: any;
}

const ScreenHeader = dynamic(() => import('./ScreenHeader'), { ssr: false });

const ScreenLayout: React.FC<IScreenLayout> = ({ children, logoType }) => {
    return (
        <div className="screenLayout">
            <ScreenHeader logoType={logoType} />
            {children}
        </div>
    )
}

export default ScreenLayout;