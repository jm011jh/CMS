'use client'
  
import AdminLeft from './AdminLeft'
import AdminFooter from './AdminFooter'
import AdminTopBar from './AdminTopBar'
import useAdmLayoutSwitch from '../../store'
import { useEffect } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactElement
}) {

  const admLayoutSwitch = useAdmLayoutSwitch((state) => state.admLayoutSwitch)
  const setAdmLayoutSwitch = useAdmLayoutSwitch((state) => state.setAdmLayoutSwitch)
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleResize = () => {
      clearTimeout(timeoutId);
      
      timeoutId = setTimeout(() => {
        const layoutElement = document.querySelector('.admin-layout');
        const currentState = layoutElement?.getAttribute('data-left-open');
        
        if (window.innerWidth < 980 && currentState === "open") {
          setAdmLayoutSwitch({admLeftSwitch: "closed"});
        } else if (window.innerWidth >= 980 && currentState === "closed") {
          setAdmLayoutSwitch({admLeftSwitch: "open"});
        }
      }, 100);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, [setAdmLayoutSwitch]);

  return (
    <div className='admin-layout' data-left-open={admLayoutSwitch.admLeftSwitch}>
      <AdminTopBar />
      <AdminLeft />
      <div className="adm--pg">
        <div className="adm">
          {children}
          <AdminFooter />
        </div>
      </div>
      {/* <ShortPopup03></ShortPopup03> */}
    </div>
  )
}