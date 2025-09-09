'use client'
import { basicThemeColors } from "@/app/admin/assets/theme";
import React, { useState } from "react";

type categoryType = {
    selected: boolean,
    val: string,
    label: string,
}
interface IAdmCategoryList {
    clickItem?: (item: categoryType) => void,
    categoryArray?: categoryType[]
}
const AdmCategoryList: React.FC<IAdmCategoryList> = ({ categoryArray, clickItem }) => {

    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    const styles: { [key: string]: React.CSSProperties } = {
        list: { display: 'flex', gap: '8px', padding: '8px', backgroundColor: basicThemeColors.gray100, borderRadius: '8px', marginBottom: '24px', overflow: 'auto' },
        listItem: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '48px', padding: '0 24px', color: basicThemeColors.gray400, fontWeight: 600, borderRadius: '5px', cursor: 'pointer', whiteSpace: 'nowrap', border: '0px solid #000', backgroundColor: basicThemeColors.gray100, },
        listItemHover: { backgroundColor: basicThemeColors.gray200, },
        listItemSelected: { backgroundColor: '#ffffff', color: basicThemeColors.primary.darken100, cursor: 'default', pointerEvents: 'none' }
    }
    return (
        <div style={styles.list}>
            {
                categoryArray && categoryArray.map((item, index) => {
                    return (
                        <button
                            key={item.val} // Using item.val as key for better performance and uniqueness
                            style={{
                                ...styles.listItem,
                                ...(hoveredItem === item.val ? styles.listItemHover : {}),
                                ...(item.selected ? styles.listItemSelected : {}),
                            }}
                            onMouseEnter={() => setHoveredItem(item.val)}
                            onMouseLeave={() => setHoveredItem(null)}
                            onClick={() => clickItem ? clickItem(item) : null}
                        >
                            {item.label}
                        </button>
                    )
                })
            }
        </div>
    )
}

export default AdmCategoryList