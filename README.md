# 안심콜 (voice-fishing)

한국 사용자 우선의 **보이스피싱·스미싱 대응 운영 플랫폼(MVP)** 입니다. 블로그가 아니라 **긴급 행동(5분) → 회복 → 증거정리 → 공식 도움 연결** 흐름을 제품으로 구현합니다.

## 로컬 실행

```bash
npm install
npm run dev
```

## 환경 변수

`.env.example` 참고.

- `NEXT_PUBLIC_SITE_URL`: canonical/OG/sitemap 기준 URL  
  - 운영 예: [https://voice-fishing-rtwi.vercel.app](https://voice-fishing-rtwi.vercel.app/)

## 배포

### GitHub

원격 저장소: [`han30230/voice-fishing`](https://github.com/han30230/voice-fishing)

### Vercel(권장)

1. GitHub 저장소를 Vercel에 Import
2. Framework Preset: Next.js
3. Environment Variables에 `NEXT_PUBLIC_SITE_URL` 설정
4. Deploy

## 운영 주의(신뢰/법무)

- 이 프로젝트는 **정부/경찰/금융기관 사이트가 아닙니다.**
- **공식 연락처/절차는 운영자가 검증 후** `src/data/help.ts` 등에 반영하는 방식을 권장합니다.
- 금전 회복/수사 결과를 보장하는 표현은 사용하지 마세요.

## 문서

- `docs/PLATFORM.md`: 제품 전략/IA/SEO/로드맵(Phase 2) 요약
- `docs/BRAND_NAMES.md`: 브랜드 네이밍 후보
- `src/lib/analytics.ts`: 분석 이벤트 설계(플레이스홀더)

## 스크립트

- `npm run dev` — 개발
- `npm run build` — 프로덕션 빌드
- `npm run start` — 프로덕션 실행
- `npm run lint` — ESLint

