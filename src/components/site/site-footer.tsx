import Link from "next/link";
import { Shield } from "lucide-react";

const quick = [
  { href: "/check", label: "자가진단" },
  { href: "/emergency", label: "긴급" },
  { href: "/scams", label: "유형" },
  { href: "/recovery", label: "회복" },
  { href: "/evidence", label: "증거" },
  { href: "/family", label: "가족" },
  { href: "/help", label: "도움" },
  { href: "/guide", label: "상황별 가이드" },
  { href: "/help/contacts", label: "공식 연락처" },
  { href: "/help/institutions", label: "전문기관·법률참고" },
  { href: "/help/law-firms", label: "법률 디렉터리" },
  { href: "/emergency/app-installed", label: "악성앱 대응" },
  { href: "/identity", label: "명의·2차 피해" },
  { href: "/legal", label: "법률 도움" },
  { href: "/tools/suspicious-text", label: "문자 의심 체크" },
];

export function SiteFooter() {
  return (
    <footer className="no-print border-t border-border/80">
      <div className="bg-[#0b1426] text-white">
        <div className="mx-auto w-full max-w-6xl px-4 py-12">
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-2xl bg-white/10 ring-1 ring-white/15">
                  <Shield className="h-5 w-5 text-white" aria-hidden />
                </span>
                <div>
                  <div className="text-[16px] font-semibold tracking-tight">안심콜</div>
                  <div className="text-[13px] text-white/65">보이스피싱·스미싱 대응 안내</div>
                </div>
              </div>
              <p className="mt-4 max-w-md text-[14px] leading-7 text-white/70">
                이 사이트는 독립적인 실용 안내 서비스입니다. 정부·경찰·금융기관을 사칭하지
                않습니다. 생명·신체 위험이 있거나 즉시 조치가 필요하면 공식 기관에 먼저
                연락하세요.
              </p>
            </div>

            <div className="md:col-span-4">
              <div className="text-[12px] font-semibold uppercase tracking-wider text-white/50">
                바로가기
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                {quick.map((q) => (
                  <Link
                    key={q.href}
                    href={q.href}
                    className="rounded-xl px-3 py-2 text-[14px] font-medium text-white/75 transition hover:bg-white/10 hover:text-white"
                  >
                    {q.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="md:col-span-3">
              <div className="text-[12px] font-semibold uppercase tracking-wider text-white/50">
                기억할 한 줄
              </div>
              <ul className="mt-3 space-y-2 text-[13px] leading-6 text-white/70">
                <li>의심되면 통화를 끊고, 내가 아는 공식 번호로 확인</li>
                <li>앱·원격·송금·OTP 요청은 고위험 신호</li>
                <li>문자·링크·계좌·통화기록은 증거로 남기기</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6 text-[12px] text-white/45">
            © {new Date().getFullYear()} 안심콜. 운영 시 운영 주체·정책·공식 연락처를 명확히
            기재하세요.
            <div className="mt-3 space-y-1 text-white/55">
              <div>대표자: Voice Phishing Guard 한상훈</div>
              <div>통신판매업: 2022-수원영통-1373</div>
              <div>사업자번호: 610-35-52874</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
