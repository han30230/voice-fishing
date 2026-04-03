import { MaliciousAppEmergencyPage } from "@/components/emergency/malicious-app-checklist";

export const metadata = {
  title: "악성앱·원격제어 설치 대응",
  description:
    "의심 앱 설치 직후 1분 행동, 오늘 할 일, 금지 사항, 다른 기기에서 할 일을 체크리스트로 안내합니다.",
  alternates: { canonical: "/emergency/app-installed" },
};

export default function EmergencyAppInstalledPage() {
  return <MaliciousAppEmergencyPage />;
}
