import type { RiskCategory, SelfCheckQuestion, SelfCheckResult } from "@/schemas/domain";

type Answers = Record<string, string>;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function categoryFromScore(score: number, flags: Set<string>): RiskCategory {
  if (flags.has("money_sent") || flags.has("app_or_remote_done")) return "likely_active_scam";
  if (flags.has("active_call") && (flags.has("money_requested") || flags.has("app_or_remote_asked")))
    return "likely_active_scam";
  if (score >= 80) return "likely_active_scam";
  if (score >= 60) return "immediate_action_required";
  if (score >= 40) return "high_risk";
  if (score >= 20) return "suspicious";
  return "low_concern";
}

function labelCategory(ko: RiskCategory) {
  switch (ko) {
    case "low_concern":
      return "낮은 우려";
    case "suspicious":
      return "의심";
    case "high_risk":
      return "고위험";
    case "immediate_action_required":
      return "즉시 조치 필요";
    case "likely_active_scam":
      return "진행형 사기 가능성 매우 큼";
  }
}

function primaryType(flags: Set<string>) {
  if (flags.has("app_or_remote_done") || flags.has("app_or_remote_asked"))
    return "원격제어/앱 설치 유도형";
  if (flags.has("money_sent") || flags.has("money_requested")) return "송금·이체 유도형";
  if (flags.has("authority_impersonation")) return "기관(권위) 사칭형";
  if (flags.has("link_clicked") || flags.has("credential_entry")) return "스미싱/피싱 링크형";
  return "혼합/불명확(확인 필요)";
}

function buildExplanation(score: number, riskCategory: RiskCategory, flags: Set<string>) {
  const reasons: string[] = [];
  if (flags.has("authority_impersonation")) reasons.push("공적 기관/금융기관을 사칭했습니다");
  if (flags.has("urgency")) reasons.push("강한 시간 압박이 있었습니다");
  if (flags.has("secrecy_isolation")) reasons.push("주변에 알리지 말라고 했습니다(고립 유도)");
  if (flags.has("app_or_remote_done")) reasons.push("원격제어/앱 설치가 실제로 진행됐습니다");
  else if (flags.has("app_or_remote_asked")) reasons.push("앱 설치/원격제어를 요구했습니다");
  if (flags.has("credential_entry")) reasons.push("링크/화면에서 정보 입력이 있었습니다");
  else if (flags.has("link_clicked")) reasons.push("의심 링크를 눌렀습니다");
  if (flags.has("sensitive_shared")) reasons.push("민감정보를 실제로 공유했습니다");
  else if (flags.has("sensitive_asked")) reasons.push("민감정보를 요구했습니다");
  if (flags.has("money_sent")) reasons.push("송금/이체 등 자금 이동이 발생했습니다");
  else if (flags.has("money_requested")) reasons.push("돈을 보내라고 요구했습니다");
  if (flags.has("active_call")) reasons.push("지금도 통화가 이어지는 상황입니다");

  const head = `위험도 점수는 ${score}점이며, 분류는 ‘${labelCategory(riskCategory)}’입니다.`;
  const why =
    reasons.length > 0
      ? `이렇게 판단한 이유는 다음 신호 때문입니다: ${reasons.join(", ")}.`
      : "현재 응답만으로는 강한 신호가 적게 잡혔습니다. 그래도 불안하면 공식 채널로 확인하세요.";

  return `${head} ${why}`;
}

function actionsFor(flags: Set<string>) {
  const plan: string[] = [];
  plan.push("지금은 추가 정보 공유·추가 송금·추가 설치를 멈추세요.");
  if (flags.has("active_call")) plan.push("가능하면 통화를 끊고, 잠시 숨 고르기부터 하세요.");
  if (flags.has("app_or_remote_done") || flags.has("app_or_remote_asked")) {
    plan.push("원격제어/앱 설치가 관련되면 /emergency/app-installed 흐름을 우선 따르세요.");
  }
  if (flags.has("link_clicked") || flags.has("credential_entry")) {
    plan.push("링크/로그인이 관련되면 /emergency/link-clicked 흐름을 확인하세요.");
  }
  if (flags.has("money_sent")) plan.push("송금이 있었다면 /recovery/money-sent 와 /emergency/money-sent 를 함께 보세요.");
  plan.push("증거(문자/통화/계좌/앱)를 /evidence 에서 정리해 두면 상담이 빨라집니다.");
  plan.push("공식 번호는 상대가 알려준 번호가 아니라, 내가 찾은 공식 앱/홈페이지 기준으로 확인하세요.");
  return plan;
}

function officialHelp(flags: Set<string>) {
  const rec: string[] = [];
  rec.push("/help 의 ‘금융기관 문의 전 체크리스트’로 준비물을 정리하세요.");
  if (flags.has("money_sent")) rec.push("은행/카드사 고객센터(공식)로 사기 의심 거래 상담을 우선 고려하세요.");
  if (flags.has("link_clicked")) rec.push("스미싱/보안 상담 채널(공식) 연결이 필요할 수 있습니다.");
  rec.push("정확한 전화번호는 지역/기관 정책에 따라 달라질 수 있어, 운영자가 검증해 게시하는 방식을 권장합니다.");
  return rec;
}

function evidence(flags: Set<string>) {
  const e = ["통화번호/시간", "문자 원문", "링크(URL)", "상대가 준 계좌(있으면)"];
  if (flags.has("app_or_remote_done")) e.push("설치 앱 이름/권한 화면 캡처");
  if (flags.has("credential_entry")) e.push("입력한 정보의 범위(비밀번호/OTP 등) 기록");
  return e;
}

export function runSelfCheck(questions: SelfCheckQuestion[], answers: Answers): SelfCheckResult {
  const flags = new Set<string>();
  let score = 0;

  for (const q of questions) {
    const selected = answers[q.id];
    const opt = q.options.find((o) => o.id === selected);
    if (!opt) continue;
    score += opt.score;
    for (const f of opt.flags) flags.add(f);
  }

  score = clamp(score, 0, 100);
  const riskCategory = categoryFromScore(score, flags);

  return {
    riskScore: score,
    riskCategory,
    primarySuspectedType: primaryType(flags),
    explanation: buildExplanation(score, riskCategory, flags),
    immediateActionPlan: actionsFor(flags),
    officialHelpRecommendation: officialHelp(flags),
    evidenceChecklist: evidence(flags),
    triggeredFlags: Array.from(flags),
  };
}
