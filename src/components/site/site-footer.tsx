import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto w-full max-w-6xl px-4 py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <div>
            <div className="text-[15px] font-semibold">안심콜</div>
            <p className="mt-2 text-[13px] leading-6 text-muted-foreground">
              이 사이트는 독립적인 실용 안내 서비스입니다. 정부/경찰/금융기관을
              사칭하지 않습니다. 생명·신체 위험 또는 즉시 조치가 필요한 경우에는
              공식 기관에 먼저 연락하세요.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 text-[14px]">
            <Link className="text-muted-foreground hover:text-foreground" href="/check">
              1분 자가진단
            </Link>
            <Link className="text-muted-foreground hover:text-foreground" href="/emergency">
              긴급 대응
            </Link>
            <Link className="text-muted-foreground hover:text-foreground" href="/scams">
              사기 유형
            </Link>
            <Link className="text-muted-foreground hover:text-foreground" href="/recovery">
              피해 회복
            </Link>
            <Link className="text-muted-foreground hover:text-foreground" href="/evidence">
              증거 정리
            </Link>
            <Link className="text-muted-foreground hover:text-foreground" href="/family">
              가족/어르신
            </Link>
          </div>
          <div>
            <div className="text-[14px] font-semibold">안전 안내</div>
            <ul className="mt-2 space-y-2 text-[13px] leading-6 text-muted-foreground">
              <li>- 의심되면 통화를 끊고, 내가 아는 번호로 다시 확인하세요.</li>
              <li>- 앱 설치/원격제어/송금/OTP 공유 요청은 매우 위험 신호입니다.</li>
              <li>- 증거(문자, 링크, 계좌, 앱 목록, 통화기록)를 남기면 도움이 됩니다.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-[12px] text-muted-foreground">
          © {new Date().getFullYear()} AnsymCall. 실서비스에서는 운영 주체/정책/공식
          연락처를 명확히 기재하세요.
        </div>
      </div>
    </footer>
  );
}

