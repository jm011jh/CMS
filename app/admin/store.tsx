import { create } from 'zustand'

interface AdmLayoutSwitch {
    admLeftSwitch: string
}

interface AdmLayoutSwitchState {
  admLayoutSwitch: AdmLayoutSwitch
}

interface admLayoutSwitchActions {
  setAdmLayoutSwitch: (admLayoutSwitch: AdmLayoutSwitch) => void
}

const defaultState = { 
    admLeftSwitch: "open" 
}

const useAdmLayoutSwitch  = create<AdmLayoutSwitchState & admLayoutSwitchActions>((set) => ({
  admLayoutSwitch: defaultState,
  setAdmLayoutSwitch: (admLayoutSwitch: AdmLayoutSwitch) => {set({ admLayoutSwitch })},
  ResetAdmLayoutSwitch: () => {set({admLayoutSwitch: defaultState})}
}))

export default useAdmLayoutSwitch
