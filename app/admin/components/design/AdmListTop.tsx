import { basicThemeColors } from "@/app/admin/assets/theme"
import React from "react"

const styles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        border: `1px solid ${basicThemeColors.gray300}`,
        marginBottom: '40px'
    },
    item: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: "column",
        fontSize: '15px',
        width: '100%',
    },
    itemLine: {
        width: '1px',
        height: '11px',
        backgroundColor: basicThemeColors.gray300,
    },
    valuebox: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: "row",
        gap: '0px',
        fontSize: '15px',
    },
    label: {
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        fontSize: '15px',
        fontWeight: 600,
        backgroundColor: basicThemeColors.gray100,
        marginBottom: '4px',
        width: '100%',
        height: '48px',
    },
    value: {
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        fontSize: '14px',
        color: '#333',
        width: '100%',
        minHeight: '48px',
        gap: '16px',
        flexWrap: 'wrap',
    },
    bold: {
        fontWeight: 'bold',
        fontSize: '16px',
    }
}
export const AdmListTopSemibold = ({ children }: { children: string | React.ReactNode | React.ReactNode[] }) => {
    return (
        <div style={{ fontWeight: 600, fontSize: '16px' }}>
            {children}
        </div>
    )
}
export const AdmListTopPurple = ({ children }: { children: string | React.ReactNode | React.ReactNode[] }) => {
    return (
        <div style={{ marginLeft: '4px', fontWeight: 'bold', color: basicThemeColors.primary.primary }}>
            {children}
        </div>
    )
}
export const AdmListTopNormal = ({ children }: { children: string | React.ReactNode | React.ReactNode[] }) => {
    return (
        <div>
            {children}
        </div>
    )
}

export const AdmListTopItem = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={styles.item}>{children}</div>
    )
}
export const AdmListTopItemLine = () => {
    return (
        <div style={styles.itemLine}></div>
    )
}
export const AdmListTopItemValueBox = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={styles.valuebox}>{children}</div>
    )
}
export const AdmListTopItemLabel = ({ children }: { children: React.ReactNode }) => {
    return (
        <div style={styles.label}>{children}</div>
    )
}
export const AdmListTopItemValue = ({ children }: { children: string | React.ReactNode | React.ReactNode[] }) => {
    return (
        <div style={styles.value}>{children}</div>
    )
}
export const AdmListTop = ({ children }: { children: React.ReactNode[] | React.ReactNode }) => {
    return (
        <div style={styles.container}>{children}</div>
    )
}