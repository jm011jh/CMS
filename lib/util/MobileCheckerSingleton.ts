// import { App } from "@capacitor/app";

export default class MobileCheckerSingleton {
    private static instance: MobileCheckerSingleton;

    private isMobile: boolean = false;
    private showSplash: boolean = true;

    private constructor() {
        // private 생성자
        // 생성자 안에서는 await를 사용 할 수 없기 떄문에 instacne에서 처리
    }

    public static async getInstance(): Promise<MobileCheckerSingleton> {
        if (!this.instance) {
            this.instance = new MobileCheckerSingleton();
            try {
                // await App.getInfo();
                this.instance.isMobile = true;
            } catch (e: any) {
                this.instance.isMobile = false;
            }
        }
        return this.instance;
    }

    public getIsMobile() {
        // return true;
        return this.isMobile;
    }

    public getMobileUrl() {
        // return "http://3.35.96.166";
        return "https://www.cossnet.com";
    }

    public hideSplash() {
        sessionStorage.setItem("showSplash", "false")
        this.showSplash = false;
    }

    public getShowSplash() {
        const temp = sessionStorage.getItem("showSplash")
        if (temp) {
            if (temp == "true") {
                this.showSplash = true;
            } else {
                this.showSplash = false;
            }
        }

        return this.showSplash;
    }
}
