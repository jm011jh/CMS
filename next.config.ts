import type { NextConfig } from "next";

/* GIT_BRANCH 환경 변수는 배포 환경에 따라 설정되어야 합니다.
   * 예: prod, qa, dev 등
   * 이 변수는 CI/CD 파이프라인에서 설정할 수 있습니다.
   * 만약 설정되지 않았다면 'unknown'으로 기본값을 사용합니다.
   * 
   * amplify에서는 호스팅 > 환경 변수 에서 GIT_BRANCH를 설정 하였습니다.
   */
const branch = process.env.GIT_BRANCH || 'unknown';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  reactStrictMode: false, // Strict Mode 끄기
  env: {
    // API_URL: branch === 'prod' ? 'https://api.fan-platform.click' : 'https://api-qa.fan-platform.click',
    API_URL: branch === 'prod' ? 'https://api.blissoolmt.com' : branch === 'slash_prod' ? 'https://api.fan-platform.click' : branch === 'slash_dev' ? 'https://api-qa.fan-platform.click' : 'https://api-qa.blissoolmt.com',
    CURRENT_BRANCH: branch,
    VERSION: "1.0.1"
  }
};

export default nextConfig;
