export type EmergencyQuickActionId = "call112" | "bank-order" | "malicious-app" | "family-mode";

export type EmergencyQuickAction = {
  id: EmergencyQuickActionId;
  label: string;
  shortHint: string;
  href: string;
  external?: boolean;
  /** 클라이언트 컴포넌트에서 아이콘 매핑용 */
  iconName: "phone" | "shield" | "smartphone" | "users";
};

export const emergencyQuickActions: EmergencyQuickAction[] = [
  {
    id: "call112",
    label: "112 신고",
    shortHint: "범죄·긴급 위험 시 국번 112",
    href: "tel:112",
    external: true,
    iconName: "phone",
  },
  {
    id: "bank-order",
    label: "지급정지·은행 순서",
    shortHint: "먼저 거래 기관 공식 번호로",
    href: "/emergency/money-sent",
    iconName: "shield",
  },
  {
    id: "malicious-app",
    label: "악성앱·격리",
    shortHint: "연결 끊고 권한 해제",
    href: "/emergency/app-installed",
    iconName: "smartphone",
  },
  {
    id: "family-mode",
    label: "가족에게 보여주기",
    shortHint: "큰 글씨·짧은 안내",
    href: "/family",
    iconName: "users",
  },
];
