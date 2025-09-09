'use client'
import LoadingScreen from "../admin/components/card/LoadingScreen"

export default function Layout({
    children,
}: {
    children: React.ReactElement
}) {
    return (
        <div>
            {children}
            <LoadingScreen />
        </div>
    )
}