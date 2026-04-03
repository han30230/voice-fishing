import { EmergencyPage } from "@/components/emergency/emergency-page";

export const metadata = {
  title: "기기 점검(사고 후)",
  description: "의심 앱 설치·링크 클릭 이후 스마트폰을 점검하는 실무 체크리스트.",
};

export default function EmergencyDeviceCheckPage() {
  return (
    <EmergencyPage
      title="기기 점검(사고 후)"
      subtitle="완벽한 진단을 약속할 수는 없지만, 흔한 위험 지점을 빠르게 닫는 데 도움이 됩니다."
      next5Min={[
        "최근 설치 앱을 확인하고, 모르는 앱은 삭제하세요.",
        "설정에서 접근성/알림 접근/기기 관리자(있는 OS) 권한을 점검하세요.",
        "의심되는 앱에 부여된 권한을 해제한 뒤 삭제를 다시 시도하세요.",
        "금융 앱 알림/문자 인증이 비정상적으로 많지 않은지 확인하세요.",
        "가능하면 Wi‑Fi를 잠시 끊고(비행기 모드) 외부 조작 가능성을 줄이세요.",
      ]}
      neverDo={[
        "‘백신 앱’ 이름의 출처 불명 앱을 추가 설치하지 마세요.",
        "검색 결과 상단 광고의 ‘고객센터’ 번호를 맹신하지 마세요.",
      ]}
      whoToContact={[
        {
          title: "제조사/통신사 보안 안내(공식)",
          details:
            "기기 초기화/계정 복구 등은 공식 가이드를 따르는 것이 안전합니다. (운영자가 링크를 검증해 연결)",
        },
        {
          title: "은행/카드사",
          details:
            "금융 앱을 실행했거나 인증이 있었다면 우선 상담을 고려하세요.",
        },
      ]}
      evidence={[
        "설치 앱 이름/아이콘 캡처",
        "권한 화면 캡처",
        "의심 링크/문자",
      ]}
      extraChecks={[
        "OS 업데이트",
        "중요 계정의 비밀번호 변경(가능하면 다른 기기에서)",
        "2단계 인증 켜기",
      ]}
    />
  );
}
