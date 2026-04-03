import { EmergencyPage } from "@/components/emergency/emergency-page";

export const metadata = {
  title: "기관 사칭 긴급 대응",
  description: "검찰·경찰·금감원·은행·택배 등 기관 사칭이 의심될 때 즉시 조치.",
};

export default function EmergencyImpersonationPage() {
  return (
    <EmergencyPage
      title="기관 사칭(권위 사칭) 긴급 대응"
      subtitle="권위는 ‘확인 방법’이 있습니다. 통화를 이어가며 민감정보를 주지 마세요."
      next5Min={[
        "통화를 끊으세요. ‘확인 후 다시 연락’이라고 말해도 됩니다.",
        "상대가 알려준 번호로 다시 전화하지 마세요.",
        "공식 앱/공식 홈페이지에 안내된 고객센터 번호로 문의하세요.",
        "OTP/비밀번호/보안카드/신분증 사진 요구가 있었다면 유출로 가정하고 조치 준비를 하세요.",
        "문자에 URL이 있었다면 추가 클릭을 멈추세요.",
      ]}
      neverDo={[
        "‘수사 협조’라는 말에 앱 설치/원격제어를 허용하지 마세요.",
        "‘안전계좌’ ‘검증 이체’ 등 어떤 명목이든 송금하지 마세요.",
        "가족에게 말하지 말라는 요구를 따르지 마세요.",
      ]}
      whoToContact={[
        {
          title: "해당 기관/회사(공식 채널)",
          details:
            "은행이면 은행 앱, 택배면 구매 쇼핑몰/택배 앱에서 공식 안내로 확인하세요.",
        },
        {
          title: "가족/보호자",
          details:
            "혼자 판단이 어렵다면 짧게 상황을 공유하고 함께 확인하세요.",
        },
      ]}
      evidence={[
        "통화기록(번호/시간)",
        "문자 원문",
        "요구한 정보/송금 계좌",
      ]}
      extraChecks={[
        "/scams/prosecutor-police-impersonation 같은 유형 페이지를 함께 읽기",
        "추가 연락(2차 사기) 대비",
      ]}
    />
  );
}
