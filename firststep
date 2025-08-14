import React, { useMemo, useState } from "react";

/**
 * Doran MVP Interactive Wireframe (React + Tailwind)
 * -------------------------------------------------
 * 포함 내용
 * 1) 포지셔닝 문장(One-liner, Elevator pitch)
 * 2) 3스크린 와이어: Feed(리스트) / Compose(글쓰기) / Thread(댓글)
 * 3) 핵심 철학 UI 반영: 팔로워 비가시화, 공명(Resonates) 버튼, 신고 사유 강제(모달)
 * 4) 실험 토글: 공감 라벨 A/B("공명함" vs "공감"), 탐색 슬롯 20% 노출
 *
 * 사용법: 상단 탭으로 화면 전환, 각 컴포넌트는 MVP 의도만 드러내는 경량 목업입니다.
 */

export default function DoranMVPWire() {
  const [screen, setScreen] = useState<"feed" | "compose" | "thread">("feed");
  const [labelVariant, setLabelVariant] = useState<"resonates" | "empathy">("resonates");
  const [exploreRatio, setExploreRatio] = useState(20); // % of explore slots on feed

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      <TopBar onNav={setScreen} active={screen} />
      <div className="max-w-6xl mx-auto p-4 lg:p-6 space-y-6">
        <Positioning />
        <LabControls
          labelVariant={labelVariant}
          onChangeLabel={setLabelVariant}
          exploreRatio={exploreRatio}
          onChangeExplore={setExploreRatio}
        />
        {screen === "feed" && (
          <FeedScreen labelVariant={labelVariant} exploreRatio={exploreRatio} />)
        }
        {screen === "compose" && <ComposeScreen />}
        {screen === "thread" && (
          <ThreadScreen labelVariant={labelVariant} />)
        }
      </div>
      <Footer />
    </div>
  );
}

function TopBar({ onNav, active }: { onNav: (s: any) => void; active: string }) {
  const tabs: { key: "feed" | "compose" | "thread"; label: string }[] = [
    { key: "feed", label: "피드" },
    { key: "compose", label: "글쓰기" },
    { key: "thread", label: "댓글" },
  ];
  return (
    <div className="sticky top-0 z-30 backdrop-blur bg-white/70 border-b">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="inline-block w-2.5 h-2.5 rounded-full bg-black" />
          <h1 className="text-lg font-bold tracking-tight">Doran — 공명 기반 공론장</h1>
        </div>
        <nav className="ml-auto flex items-center gap-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => onNav(t.key)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition ${
                active === t.key
                  ? "bg-neutral-900 text-white shadow"
                  : "hover:bg-neutral-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
}

function Positioning() {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="md:col-span-2 bg-white rounded-2xl p-5 shadow-sm border">
        <h2 className="text-base font-semibold">포지셔닝 문장</h2>
        <p className="mt-2 text-sm leading-relaxed">
          <span className="font-semibold">One-liner:</span> 우리는 팔로워 숫자가 아닌 <span className="font-semibold">공명(Resonance)</span>으로 글의 가치를 평가하는
          공화주의적 공론장입니다.
        </p>
        <p className="mt-2 text-sm leading-relaxed">
          <span className="font-semibold">Elevator pitch(30초):</span> 도란은 팔로워 비가시화·공명 기반 노출·투명한 운영정책으로
          ‘좋아요 경제’가 왜곡한 담론을 바로잡습니다. 가입 후 90초 만에 첫 글을 쓰고, 무차별적 밴 대신 항소 가능한
          모더레이션, 그리고 추천 알고리즘 요약을 공개합니다.
        </p>
        <ul className="mt-3 text-sm list-disc list-inside text-neutral-700">
          <li>NSM: 의미 있는 상호작용 비율(MIP) ↑</li>
          <li>핵심 기능: 공명 버튼, 익명 토글, 신고 사유 강제, 탐색 슬롯 20%</li>
        </ul>
      </div>
      <div className="bg-white rounded-2xl p-5 shadow-sm border">
        <h3 className="text-sm font-semibold">오늘의 의제</h3>
        <p className="mt-2 text-sm">“AI 규제: 혁신과 안전의 최적 균형은 어디인가?”</p>
        <div className="mt-3 flex gap-2">
          <Badge>정책</Badge>
          <Badge>철학</Badge>
          <Badge>토론</Badge>
        </div>
      </div>
    </div>
  );
}

function LabControls({
  labelVariant,
  onChangeLabel,
  exploreRatio,
  onChangeExplore,
}: {
  labelVariant: "resonates" | "empathy";
  onChangeLabel: (v: any) => void;
  exploreRatio: number;
  onChangeExplore: (n: number) => void;
}) {
  return (
    <div className="bg-white rounded-2xl p-4 border shadow-sm flex flex-col md:flex-row md:items-center gap-4">
      <div className="flex items-center gap-2">
        <span className="text-sm font-semibold">공감 라벨 A/B:</span>
        <ToggleGroup
          value={labelVariant}
          onChange={onChangeLabel}
          options={[
            { value: "resonates", label: "공명함(Resonates)" },
            { value: "empathy", label: "공감(Empathy)" },
          ]}
        />
      </div>
      <div className="flex items-center gap-2 md:ml-auto">
        <span className="text-sm font-semibold">탐색 슬롯 비율</span>
        <input
          type="range"
          min={0}
          max={60}
          value={exploreRatio}
          onChange={(e) => onChangeExplore(Number(e.target.value))}
          className="w-40"
        />
        <span className="text-sm w-10 text-right">{exploreRatio}%</span>
      </div>
    </div>
  );
}

function FeedScreen({
  labelVariant,
  exploreRatio,
}: {
  labelVariant: "resonates" | "empathy";
  exploreRatio: number;
}) {
  // 간이 피드: exploreRatio 비율만큼 신규/저노출 글을 섞음
  const posts = useMemo(() => mockPosts(), []);
  const exploreCount = Math.round((posts.length * exploreRatio) / 100);
  const sorted = [...posts]
    .sort((a, b) => b.score - a.score)
    .map((p, i) => ({ ...p, slot: i < exploreCount ? "explore" : "personal" }))
    .sort((a, b) => (a.slot === "explore" ? -1 : 1));

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="md:col-span-2 space-y-3">
        {sorted.map((p) => (
          <PostCard key={p.id} post={p} labelVariant={labelVariant} />
        ))}
      </div>
      <div className="space-y-3">
        <GuideCard />
        <SafetyCard />
      </div>
    </div>
  );
}

function ComposeScreen() {
  const [anonymous, setAnonymous] = useState(true);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const char = body.length;

  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="md:col-span-2 bg-white rounded-2xl p-5 border shadow-sm">
        <h2 className="text-base font-semibold">글쓰기</h2>
        <div className="mt-3 space-y-3">
          <input
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2"
          />
          <textarea
            placeholder="무례함 없이 단단하게. 800자 이내가 읽히기 좋아요."
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
            className="w-full rounded-xl border px-3 py-2 focus:outline-none focus:ring-2"
          />
          <div className="flex items-center justify-between text-sm text-neutral-600">
            <label className="inline-flex items-center gap-2">
              <input type="checkbox" checked={anonymous} onChange={() => setAnonymous(!anonymous)} />
              익명으로 올리기
            </label>
            <span>{char}자 / 1,200자</span>
          </div>
          <div className="flex items-center gap-2">
            <button className="px-3 py-2 rounded-xl bg-neutral-900 text-white text-sm">게시</button>
            <button className="px-3 py-2 rounded-xl border text-sm">임시저장</button>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <HintsCard />
        <PolicyCard />
      </div>
    </div>
  );
}

function ThreadScreen({ labelVariant }: { labelVariant: "resonates" | "empathy" }) {
  const [reportOpen, setReportOpen] = useState<null | { target: string }>(null);
  return (
    <div className="grid md:grid-cols-3 gap-4">
      <div className="md:col-span-2 space-y-3">
        <PostCard
          post={{ ...mockPosts()[0], detail: true }}
          labelVariant={labelVariant}
          onReport={(target) => setReportOpen({ target })}
        />
        <div className="bg-white rounded-2xl border shadow-sm">
          <div className="px-5 py-3 border-b flex items-center justify-between">
            <h3 className="text-sm font-semibold">댓글 3</h3>
            <span className="text-xs text-neutral-500">팔로워 수는 표시되지 않습니다</span>
          </div>
          <div className="p-5 space-y-4">
            {mockComments().map((c) => (
              <Comment key={c.id} c={c} onReport={(target) => setReportOpen({ target })} />
            ))}
            <div className="pt-2 border-t">
              <input className="w-full rounded-xl border px-3 py-2 text-sm" placeholder="품격을 지켜주세요(가이드 미리보기)." />
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <SafetyCard />
        <AppealCard />
      </div>

      {reportOpen && (
        <ReportModal target={reportOpen.target} onClose={() => setReportOpen(null)} />)
      }
    </div>
  );
}

function PostCard({
  post,
  labelVariant,
  onReport,
}: {
  post: any;
  labelVariant: "resonates" | "empathy";
  onReport?: (target: string) => void;
}) {
  const [count, setCount] = useState(post.resonates);
  const [pressed, setPressed] = useState(false);
  const label = labelVariant === "resonates" ? "공명함" : "공감";

  return (
    <div className={`bg-white rounded-2xl border shadow-sm ${post.detail ? "" : "hover:shadow"}`}>
      <div className="p-5 space-y-3">
        <div className="flex items-center gap-2 text-xs text-neutral-600">
          <Badge variant="soft">{post.slot === "explore" ? "탐색" : "개인화"}</Badge>
          <span>·</span>
          <span>{post.anonymous ? "익명" : post.author}</span>
          <span>·</span>
          <span>{post.time}</span>
        </div>
        <h3 className="text-base font-semibold">{post.title}</h3>
        <p className="text-sm leading-relaxed text-neutral-800">{post.body}</p>
        {post.detail && (
          <div className="text-xs text-neutral-500">태그: 정책, 철학, 기술</div>
        )}
        <div className="flex items-center gap-2 pt-1">
          <button
            title="좋아요가 아닙니다. 글의 ‘울림’을 표시합니다."
            onClick={() => {
              if (!pressed) setCount((c: number) => c + 1);
              setPressed(true);
            }}
            className={`px-3 py-1.5 rounded-full text-sm border transition ${
              pressed ? "bg-neutral-900 text-white" : "hover:bg-neutral-100"
            }`}
          >
            {label} · {count}
          </button>
          <button className="px-3 py-1.5 rounded-full text-sm border hover:bg-neutral-100">댓글 {post.comments}</button>
          <button
            onClick={() => onReport && onReport(`post:${post.id}`)}
            className="px-3 py-1.5 rounded-full text-sm border hover:bg-red-50"
          >
            신고
          </button>
        </div>
      </div>
    </div>
  );
}

function Comment({ c, onReport }: { c: any; onReport: (target: string) => void }) {
  const [pressed, setPressed] = useState(false);
  const [count, setCount] = useState(c.resonates);
  return (
    <div className="flex gap-3">
      <div className="w-8 h-8 rounded-full bg-neutral-200" />
      <div className="flex-1">
        <div className="flex items-center gap-2 text-xs text-neutral-600">
          <span>{c.anonymous ? "익명" : c.author}</span>
          <span>·</span>
          <span>{c.time}</span>
        </div>
        <div className="text-sm leading-relaxed">{c.body}</div>
        <div className="flex items-center gap-2 mt-1">
          <button
            title="좋아요가 아닙니다. 댓글의 ‘울림’을 표시합니다."
            onClick={() => {
              if (!pressed) setCount((x) => x + 1);
              setPressed(true);
            }}
            className={`px-2.5 py-1 rounded-full text-xs border transition ${
              pressed ? "bg-neutral-900 text-white" : "hover:bg-neutral-100"
            }`}
          >
            공명함 · {count}
          </button>
          <button onClick={() => onReport(`comment:${c.id}`)} className="px-2.5 py-1 rounded-full text-xs border hover:bg-red-50">
            신고
          </button>
        </div>
      </div>
    </div>
  );
}

function ReportModal({ target, onClose }: { target: string; onClose: () => void }) {
  const [reason, setReason] = useState("");
  const [note, setNote] = useState("");
  const canSubmit = reason.length > 0;
  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold">신고 사유 선택</h3>
          <button onClick={onClose} className="text-sm">닫기</button>
        </div>
        <p className="text-xs text-neutral-600">허위 신고는 제재될 수 있습니다.</p>
        <select
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="w-full rounded-xl border px-3 py-2 text-sm"
        >
          <option value="">사유를 선택하세요</option>
          <option value="abuse">욕설/혐오 표현</option>
          <option value="spam">도배/스팸</option>
          <option value="misinfo">허위 정보</option>
          <option value="privacy">개인정보 노출</option>
          <option value="other">기타</option>
        </select>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="추가 설명(선택)"
          rows={3}
          className="w-full rounded-xl border px-3 py-2 text-sm"
        />
        <button
          disabled={!canSubmit}
          className={`w-full py-2 rounded-xl text-sm font-medium ${
            canSubmit ? "bg-neutral-900 text-white" : "bg-neutral-200 text-neutral-500"
          }`}
          onClick={onClose}
        >
          제출
        </button>
      </div>
    </div>
  );
}

function GuideCard() {
  return (
    <div className="bg-white rounded-2xl p-5 border shadow-sm">
      <h4 className="text-sm font-semibold">읽히는 글 가이드</h4>
      <ul className="mt-2 text-sm list-disc list-inside text-neutral-700">
        <li>핵심 주장 1문장 + 근거 3줄</li>
        <li>인용은 25단어 이내 요약 권장</li>
        <li>개인 공격 금지, 주제 공격 OK</li>
      </ul>
    </div>
  );
}

function SafetyCard() {
  return (
    <div className="bg-white rounded-2xl p-5 border shadow-sm">
      <h4 className="text-sm font-semibold">안전·모더레이션</h4>
      <ul className="mt-2 text-sm list-disc list-inside text-neutral-700">
        <li>신고 사유 선택은 필수</li>
        <li>운영시간 내 SLA 4시간 이내 처리</li>
        <li>과잉 차단 지양, 항소 절차 안내</li>
      </ul>
    </div>
  );
}

function AppealCard() {
  return (
    <div className="bg-white rounded-2xl p-5 border shadow-sm">
      <h4 className="text-sm font-semibold">항소 큐(예고)</h4>
      <p className="mt-2 text-sm text-neutral-700">
        제재에 이의가 있으면 간단한 폼으로 항소하세요. 표본을 주 단위로 재검토합니다.
      </p>
    </div>
  );
}

function PolicyCard() {
  return (
    <div className="bg-white rounded-2xl p-5 border shadow-sm">
      <h4 className="text-sm font-semibold">게시 전 체크</h4>
      <ul className="mt-2 text-sm list-disc list-inside text-neutral-700">
        <li>사실/의견 구분 명확히</li>
        <li>개인정보·사적 대화 노출 금지</li>
        <li>상대 비난 대신 논점 비판</li>
      </ul>
    </div>
  );
}

function HintsCard() {
  return (
    <div className="bg-white rounded-2xl p-5 border shadow-sm">
      <h4 className="text-sm font-semibold">작성 힌트</h4>
      <p className="mt-2 text-sm text-neutral-700">
        공감을 구걸하지 마세요. <span className="font-medium">공명은 논리와 정직에서 나옵니다.</span>
      </p>
    </div>
  );
}

function ToggleGroup({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}) {
  return (
    <div className="inline-flex rounded-full border overflow-hidden">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={`px-3 py-1.5 text-sm ${
            value === o.value ? "bg-neutral-900 text-white" : "hover:bg-neutral-100"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Badge({ children, variant = "solid" }: { children: React.ReactNode; variant?: "solid" | "soft" }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${
        variant === "solid" ? "bg-neutral-900 text-white" : "bg-neutral-100 text-neutral-700"
      }`}
    >
      {children}
    </span>
  );
}

function Footer() {
  return (
    <div className="border-t mt-10">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-6 text-xs text-neutral-500 flex items-center justify-between">
        <span>© 2025 Doran (MVP Wireframe)</span>
        <span>팔로워 수 비가시화 · 공명 기반 노출 · 투명 정책</span>
      </div>
    </div>
  );
}

// --- Mock Data ---
function mockPosts() {
  return [
    {
      id: "p1",
      author: "philo-nerd",
      anonymous: true,
      time: "방금",
      title: "좋아요 경제를 넘어: 공명으로 다시 세팅하기",
      body: "팔로워 수가 토론의 질을 왜곡합니다. 노출의 기본 단위를 '공명'으로 바꾸면 초반부터 다양한 관점이 떠오를 여지가 생깁니다.",
      resonates: 12,
      comments: 3,
      score: 0.8,
    },
    {
      id: "p2",
      author: "civicdev",
      anonymous: false,
      time: "1시간 전",
      title: "신고 사유 강제의 역효과? 허위 신고 억제 설계",
      body: "허위 신고를 줄이려면 사유 선택 + 경고 카피 + 반복 신고 rate-limit가 세트로 필요합니다.",
      resonates: 7,
      comments: 1,
      score: 0.6,
    },
    {
      id: "p3",
      author: "ethics-lab",
      anonymous: true,
      time: "3시간 전",
      title: "익명 토글이 창의성에 미치는 영향",
      body: "초기에는 익명이 아이디어 발화를 돕지만, 평판 축적과의 균형이 중요합니다.",
      resonates: 5,
      comments: 0,
      score: 0.5,
    },
  ];
}

function mockComments() {
  return [
    { id: "c1", author: "civicdev", anonymous: false, time: "10분 전", body: "탐색 슬롯 20% 강제 동의합니다.", resonates: 2 },
    { id: "c2", author: "익명", anonymous: true, time: "8분 전", body: "공명 버튼 라벨 실험 필요.", resonates: 1 },
    { id: "c3", author: "policy", anonymous: false, time: "방금", body: "SLA 4시간, 항소 큐 표본검토 제안.", resonates: 0 },
  ];
}

/* =============================================
 * DB 이벤트 명세서 (Tracking Plan v0.2) — Doran MVP
 * =============================================
 * 목적: Phase 0 핵심 계측(가입→첫 글 90초, MIP, 신고 노이즈비, 공명 Gini)을 측정하기 위한 최소 이벤트 세트.
 * 저장: server-side 이벤트 수집 → PostgreSQL(events, reactions 등) + S3 불변 로그(원본 백업).
 */

export const DB_EVENT_SPEC = [
  {
    name: "session_start",
    when: "앱 진입/로그인 완료 시",
    props: ["user_id(uuid)", "session_id(uuid)", "referrer", "device", "app_version"],
    pii: "user_id(서버 보유)",
  },
  {
    name: "sign_up",
    when: "회원가입 완료 시",
    props: ["user_id", "method(email|google|apple)", "invitation(bool)", "ts"],
    notes: "TTFP 계산의 출발점",
  },
  {
    name: "view_feed",
    when: "피드 최초 로드/리프레시",
    props: ["user_id", "session_id", "explore_ratio(int)", "ts"],
  },
  {
    name: "feed_impression",
    when: "피드에 포스트가 화면에 노출될 때(50%+/800ms+)",
    props: ["post_id", "user_id", "slot(explore|personal)", "position(int)", "ts"],
    notes: "공명/댓글의 분모(impressions)로 사용",
  },
  {
    name: "post_create",
    when: "글 게시 성공 시",
    props: ["post_id", "user_id", "anonymous(bool)", "length(int)", "tags(list)", "ts"],
  },
  {
    name: "comment_create",
    when: "댓글 게시 성공 시",
    props: ["comment_id", "post_id", "user_id", "anonymous(bool)", "length(int)", "ts"],
  },
  {
    name: "reaction_add",
    when: "공명/업/다운 등 반응 추가 시",
    props: ["subject_type(post|comment)", "subject_id", "user_id", "reaction(RESONATE|UP|DOWN)", "ts"],
  },
  {
    name: "reaction_remove",
    when: "반응 취소 시",
    props: ["subject_type", "subject_id", "user_id", "reaction", "ts"],
  },
  {
    name: "dwell_update",
    when: "포스트 상세 화면 체류 업데이트(1s 단위 집계)",
    props: ["post_id", "user_id", "dwell_ms(int)", "ts"],
  },
  {
    name: "report_add",
    when: "신고 제출 시",
    props: ["subject(post|comment)", "subject_id", "user_id", "reason(enum)", "note_len(int)", "ts"],
  },
  {
    name: "mod_action",
    when: "운영 제재/해제 시",
    props: ["target(post|comment|user)", "target_id", "action(remove|warn|timeout|shadow_hide|restore)", "reason", "moderator_id", "ts"],
  },
  {
    name: "appeal_submit",
    when: "항소 접수 시",
    props: ["appeal_id", "target", "target_id", "user_id", "ts"],
  },
  {
    name: "appeal_resolve",
    when: "항소 결정 시",
    props: ["appeal_id", "outcome(uphold|reverse)", "acted_by", "ts"],
  },
] as const;

/* ---- 최소 SQL 스키마 (PostgreSQL) 요약 ----
-- events: 제네릭 이벤트 테이블(월별 파티셔닝)
CREATE TABLE events (
  event_id      UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_name    TEXT NOT NULL,
  user_id       UUID,
  session_id    UUID,
  ts            TIMESTAMPTZ NOT NULL DEFAULT now(),
  props         JSONB NOT NULL
) PARTITION BY RANGE (ts);
-- 파티션/인덱스 예시
-- CREATE TABLE events_2025_08 PARTITION OF events FOR VALUES FROM ('2025-08-01') TO ('2025-09-01');
CREATE INDEX ON events (event_name, ts);
CREATE INDEX ON events USING GIN (props);

-- 핵심 도메인 테이블(요약)
CREATE TABLE posts (
  id UUID PRIMARY KEY,
  author_id UUID NOT NULL,
  anonymous BOOLEAN DEFAULT true,
  title TEXT, body TEXT,
  visibility_score REAL DEFAULT 0,
  is_shadow_hidden BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE reactions (
  subject_type TEXT CHECK (subject_type IN ('post','comment')),
  subject_id UUID,
  user_id UUID,
  reaction TEXT CHECK (reaction IN ('RESONATE','UP','DOWN')),
  created_at TIMESTAMPTZ DEFAULT now(),
  PRIMARY KEY(subject_type, subject_id, user_id)
);
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  subject_type TEXT, subject_id UUID, user_id UUID,
  reason TEXT, note TEXT, created_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE moderation_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  target_type TEXT, target_id UUID,
  action TEXT, reason TEXT,
  moderator_id UUID, created_at TIMESTAMPTZ DEFAULT now()
);
CREATE TABLE appeals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  target_type TEXT, target_id UUID,
  user_id UUID, outcome TEXT, acted_by UUID,
  created_at TIMESTAMPTZ DEFAULT now(), acted_at TIMESTAMPTZ
);
CREATE TABLE rate_limits (
  user_id UUID, action TEXT, window_start TIMESTAMPTZ, window_end TIMESTAMPTZ, count INT,
  PRIMARY KEY(user_id, action, window_start)
);
CREATE TABLE abuse_scores (
  user_id UUID PRIMARY KEY, score REAL, reason TEXT, window_end TIMESTAMPTZ
);
*/

/* =====================================================
 * 피드 노출 로직 (Pseudocode v0.3)
 * =====================================================
 * 목표: 공명 기반 품질 + 신인 노출 보장(탐색 슬롯) + 안전/공정성 제약.
 */
export const FEED_RANK_PSEUDOCODE = `
function rankFeed(userId, k=30, explore_ratio=0.20) {
  // 1) 후보 수집
  P_recent = getRecentPosts(hours=48)
               .filter(p => !p.is_shadow_hidden && !blocked(userId, p.author))
               .filter(p => p.language in userAllowedLangs(userId));

  P_personal = topNbyEmbeddingSimilarity(P_recent, userProfile(userId), N=300);
  P_explore  = lowExposureSampler(P_recent, min_quality=Q0, N=150);

  // 2) 스코어 계산 (사전확률로 스무딩된 비율 사용)
  for p in (P_personal ∪ P_explore):
    q_res  = bayes_ratio(p.resonates, p.impressions, a=1, b=20);   // 공명율
    q_cmt  = bayes_ratio(p.comments,  p.impressions, a=1, b=30);   // 댓글율
    q_dwl  = zscore(p.avg_dwell_ms, by=topic);
    fresh  = exp(-hoursSince(p.created_at)/τ), τ=24;               // 신선도
    author = authorQuality(p.author);                               // 저자 품질(규범위반·기여)
    penal  = penalty(abuseSignals(p), negFeedback(p,userId));      // 안전/부정 피드백
    p.score = α*q_res + β*q_cmt + γ*q_dwl + δ*fresh + ε*author - η*penal;

  // 3) 공정성 제약
  P_personal = diversityCap(P_personal, by=[topic, author], caps={topic:6, author:2});
  P_explore  = diversityCap(P_explore,  by=[topic, author], caps={topic:4, author:1});

  // 4) 슬롯팅/인터리브
  n_exp = ceil(k * explore_ratio);
  S_exp = takeTopK(P_explore,  n_exp);
  S_per = takeTopK(P_personal, k - n_exp);
  feed  = roundRobinInterleave(S_exp, S_per);  // E P E P ...

  // 5) 후처리
  feed = ensureAtLeastOneNewAuthor(feed);
  feed = avoidBackToBackSameAuthor(feed);
  logRankings(userId, feed); // auditability
  return feed;
}

function bayes_ratio(x, n, a, b) { return (x + a) / (n + a + b); }
`;


/* =====================================================
 * ETL 집계 쿼리 모음 (SQL/Materialized Views) v0.1
 * -----------------------------------------------------
 * 목적: 일/주간 핵심 지표 자동 산출 — TTFP, MIP, 공명 Gini, 신고 노이즈비, SLA, 탐색 노출율.
 * 주기: 일일 02:00 KST 배치, 주간(월요일 시작) 롤업.
 * 주의: 타임존은 Asia/Seoul 고정. 이벤트 ts는 UTC 저장을 가정하고 변환.
 */

export const ETL_SQL = {
  daily_ttfp: `-- 1) Daily TTFP (가입→첫 글 소요시간)
WITH su AS (
  SELECT user_id, MIN(ts AT TIME ZONE 'Asia/Seoul') AS sign_ts
  FROM events
  WHERE event_name = 'sign_up'
  GROUP BY 1
), fp AS (
  SELECT p.author_id AS user_id, MIN(p.created_at AT TIME ZONE 'Asia/Seoul') AS first_post_ts
  FROM posts p
  GROUP BY 1
), j AS (
  SELECT su.user_id,
         date_trunc('day', sign_ts) AS d,
         EXTRACT(EPOCH FROM (fp.first_post_ts - su.sign_ts)) AS ttfp_sec
  FROM su LEFT JOIN fp USING(user_id)
)
SELECT d::date AS day,
       COUNT(*)                                          AS signups,
       COUNT(ttfp_sec)                                   AS have_post,
       PERCENTILE_DISC(0.5) WITHIN GROUP(ORDER BY ttfp_sec) AS ttfp_med_sec,
       AVG(ttfp_sec)                                     AS ttfp_avg_sec,
       AVG((ttfp_sec <= 90)::int)                        AS pct_under_90
FROM j
GROUP BY 1
ORDER BY 1;`,

  daily_mip: `-- 2) Daily MIP (Meaningful Interaction %)
-- 정의: 해당 일에 생성된 게시물 중 24h 내 공명>=1 또는 댓글>=1 비율
WITH day_posts AS (
  SELECT id, created_at AT TIME ZONE 'Asia/Seoul' AS ca
  FROM posts
  WHERE created_at >= date_trunc('day', (now() AT TIME ZONE 'Asia/Seoul') - interval '1 day') - interval '30 day'
), reacts AS (
  SELECT subject_id AS post_id,
         COUNT(*) FILTER (WHERE reaction = 'RESONATE') AS res_cnt
  FROM reactions r
  JOIN day_posts dp ON dp.id = r.subject_id
  WHERE r.subject_type='post'
    AND r.created_at <= dp.ca + interval '24 hour'
  GROUP BY 1
), cmts AS (
  SELECT post_id, COUNT(*) AS cmt_cnt
  FROM comment_create_view -- 없으면 events에서 comment_create로 대체
  GROUP BY 1
), agg AS (
  SELECT dp.id AS post_id,
         date_trunc('day', dp.ca) AS d,
         COALESCE(res_cnt,0) AS res_cnt,
         COALESCE(cmt_cnt,0) AS cmt_cnt
  FROM day_posts dp
  LEFT JOIN reacts USING(post_id)
  LEFT JOIN cmts   USING(post_id)
)
SELECT d::date AS day,
       COUNT(*) AS posts,
       AVG((res_cnt>0 OR cmt_cnt>0)::int) AS mip_rate,
       AVG((res_cnt>0)::int) AS resonate_hit_rate,
       AVG((cmt_cnt>0)::int) AS comment_hit_rate
FROM agg
GROUP BY 1
ORDER BY 1;`,

  daily_resonance_gini: `-- 3) Daily Resonance Gini (24h 공명 분포 집중도)
WITH res AS (
  SELECT p.id,
         date_trunc('day', p.created_at AT TIME ZONE 'Asia/Seoul') AS d,
         COUNT(r.*) FILTER (WHERE r.reaction='RESONATE') AS res_cnt
  FROM posts p
  LEFT JOIN reactions r ON r.subject_type='post' AND r.subject_id=p.id AND r.created_at <= p.created_at + interval '24 hour'
  GROUP BY 1,2
), s AS (
  SELECT d, res_cnt::numeric AS x,
         ROW_NUMBER() OVER (PARTITION BY d ORDER BY res_cnt) AS i,
         COUNT(*)    OVER (PARTITION BY d)                   AS n,
         SUM(res_cnt) OVER (PARTITION BY d)                  AS sumx
  FROM res
)
SELECT d::date AS day,
       CASE WHEN sumx=0 OR n=0 THEN NULL
            ELSE (2*SUM(i*x)/ (n*sumx) - (n+1.0)/n) END AS gini_resonance
FROM s
GROUP BY d, n, sumx
ORDER BY d;`,

  daily_reports_sla_noise: `-- 4) 신고 노이즈비 & SLA
-- 기준: report_add 이후 48h 내 mod_action이 remove|warn|timeout|shadow_hide면 '유효'.
-- appeal_resolve가 reverse면 무효로 간주.
WITH rpt AS (
  SELECT id AS report_id, subject_type, subject_id,
         (props->>'user_id')::uuid AS reporter_id,
         (props->>'reason')        AS reason,
         ts AT TIME ZONE 'Asia/Seoul' AS rts,
         date_trunc('day', ts AT TIME ZONE 'Asia/Seoul') AS d
  FROM events WHERE event_name='report_add'
), act AS (
  SELECT m.target_type, m.target_id,
         MIN(m.created_at AT TIME ZONE 'Asia/Seoul') AS first_action_ts,
         MIN(CASE WHEN action IN ('remove','warn','timeout','shadow_hide') THEN m.created_at AT TIME ZONE 'Asia/Seoul' END) AS enforce_ts
  FROM moderation_events m
  GROUP BY 1,2
), ap AS (
  SELECT appeal_id, target_type, target_id,
         MAX(outcome) AS outcome
  FROM appeals
  GROUP BY 1,2,3
)
SELECT d::date AS day,
       COUNT(*)                           AS reports,
       AVG(CASE WHEN a.enforce_ts IS NOT NULL THEN 1 ELSE 0 END)::float AS valid_rate,
       1-AVG(CASE WHEN a.enforce_ts IS NOT NULL THEN 1 ELSE 0 END)::float AS noise_rate,
       AVG(EXTRACT(EPOCH FROM (a.first_action_ts - r.rts))) AS avg_first_action_sec,
       AVG(EXTRACT(EPOCH FROM (a.enforce_ts - r.rts)))      AS avg_enforce_sec
FROM rpt r
LEFT JOIN act a ON a.target_type=r.subject_type AND a.target_id=r.subject_id
LEFT JOIN ap  p ON p.target_type=r.subject_type AND p.target_id=r.subject_id AND p.outcome='reverse'
WHERE (p.outcome IS NULL) -- reverse된 건 유효에서 제외
GROUP BY 1
ORDER BY 1;`,

  daily_explore_exposure: `-- 5) 탐색 슬롯 노출율
SELECT date_trunc('day', ts AT TIME ZONE 'Asia/Seoul') AS day,
       COUNT(*) FILTER (WHERE (props->>'slot')='explore')::float / COUNT(*) AS explore_impr_share
FROM events
WHERE event_name='feed_impression'
GROUP BY 1
ORDER BY 1;`,

  weekly_rollup: `-- 6) 주간 롤업 예시(월요일 시작)
SELECT date_trunc('week', day::timestamp) AS week,
       AVG(mip_rate)  AS mip_rate_avg,
       AVG(gini)      AS gini_avg,
       AVG(explore)   AS explore_share_avg,
       AVG(pct_u90)   AS ttfp_u90_avg
FROM (
  SELECT d1.day,
         m.mip_rate,
         g.gini_resonance AS gini,
         e.explore_impr_share AS explore,
         t.pct_under_90 AS pct_u90
  FROM (SELECT DISTINCT day FROM generate_series(now()-interval '90 day', now(), interval '1 day') g(day)) d1
  LEFT JOIN daily_mip_view         m ON m.day=d1.day
  LEFT JOIN daily_resonance_gini_v g ON g.day=d1.day
  LEFT JOIN daily_explore_view     e ON e.day=d1.day
  LEFT JOIN daily_ttfp_view        t ON t.day=d1.day
) x
GROUP BY 1
ORDER BY 1;`
};

/* ---- 머터리얼라이즈드 뷰(예시) ----
CREATE MATERIALIZED VIEW daily_ttfp_view AS <ETL_SQL.daily_ttfp> ;
CREATE MATERIALIZED VIEW daily_mip_view  AS <ETL_SQL.daily_mip>  ;
CREATE MATERIALIZED VIEW daily_resonance_gini_v AS <ETL_SQL.daily_resonance_gini> ;
CREATE MATERIALIZED VIEW daily_reports_view AS <ETL_SQL.daily_reports_sla_noise> ;
CREATE MATERIALIZED VIEW daily_explore_view AS <ETL_SQL.daily_explore_exposure> ;
-- 인덱스 권장
CREATE INDEX ON daily_ttfp_view(day);
CREATE INDEX ON daily_mip_view(day);
CREATE INDEX ON daily_resonance_gini_v(day);
CREATE INDEX ON daily_reports_view(day);
CREATE INDEX ON daily_explore_view(day);
*/

/* =====================================================
 * 운영 대시보드 스펙 (Spec JSON + Mock UI)
 * -----------------------------------------------------
 * 페이지: Overview / Quality & Fairness / Safety & Ops
 */
export const OPS_DASHBOARD_SPEC = {
  pages: [
    {
      id: 'overview',
      kpis: [
        { id: 'mip_rate',              label: 'MIP (의미 상호작용률)',      source: 'daily_mip_view.mip_rate',          target: '≥ 0.15' },
        { id: 'ttfp_u90',             label: 'TTFP 90초 이내 비율',       source: 'daily_ttfp_view.pct_under_90',     target: '≥ 0.50' },
        { id: 'gini_resonance',       label: '공명 Gini(낮을수록 양호)',    source: 'daily_resonance_gini_v.gini_resonance', target: '≤ 0.65' },
        { id: 'explore_impr_share',   label: '탐색 노출율',                source: 'daily_explore_view.explore_impr_share', target: '≈ 0.20' }
      ],
      charts: [
        { id: 'trend_mip',    type: 'line',  query: 'SELECT day, mip_rate FROM daily_mip_view ORDER BY day' },
        { id: 'trend_ttfp',   type: 'line',  query: 'SELECT day, pct_under_90 FROM daily_ttfp_view ORDER BY day' },
        { id: 'trend_gini',   type: 'line',  query: 'SELECT day, gini_resonance FROM daily_resonance_gini_v ORDER BY day' },
        { id: 'trend_expose', type: 'line',  query: 'SELECT day, explore_impr_share FROM daily_explore_view ORDER BY day' }
      ]
    },
    {
      id: 'quality_fairness',
      tables: [
        { id: 'by_topic',   label: '토픽별 품질', query: '-- 토픽/태그별 공명율·댓글율·평균체류' },
        { id: 'by_author',  label: '저자별 분산', query: '-- 저자 품질/규범위반/노출지분' }
      ],
      charts: [
        { id: 'cdf_resonance', type: 'area', query: '-- 공명 분포 CDF/Lorenz Curve' }
      ]
    },
    {
      id: 'safety_ops',
      kpis: [
        { id: 'reports',        label: '하루 신고 수',        source: 'daily_reports_view.reports' },
        { id: 'valid_rate',     label: '유효 신고율',          source: 'daily_reports_view.valid_rate' },
        { id: 'noise_rate',     label: '노이즈비(무효율)',     source: 'daily_reports_view.noise_rate' },
        { id: 'sla_first_sec',  label: '1차 응답 SLA(평균s)', source: 'daily_reports_view.avg_first_action_sec' },
        { id: 'sla_enforce_sec',label: '제재 완료 SLA(평균s)', source: 'daily_reports_view.avg_enforce_sec' }
      ],
      tables: [
        { id: 'appeals', label: '항소 현황', query: 'SELECT created_at::date AS day, COUNT(*) FILTER (WHERE outcome IS NULL) AS open, COUNT(*) FILTER (WHERE outcome=\'reverse\') AS reversed, COUNT(*) FILTER (WHERE outcome=\'uphold\') AS upheld FROM appeals GROUP BY 1 ORDER BY 1' }
      ]
    }
  ]
} as const;

// --- 간단 목업 컴포넌트 (카드 UI) ---
export function OpsDashboardMock() {
  const cards = [
    { title: 'MIP', value: '—', hint: '≥ 15% 목표' },
    { title: 'TTFP≤90s', value: '—', hint: '≥ 50% 목표' },
    { title: '공명 Gini', value: '—', hint: '≤ 0.65 권장' },
    { title: '탐색 노출율', value: '—', hint: '≈ 20% 유지' },
  ];
  return (
    <div className="bg-white rounded-2xl p-5 border shadow-sm mt-4">
      <h3 className="text-sm font-semibold">운영 대시보드 (목업)</h3>
      <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3">
        {cards.map((c) => (
          <div key={c.title} className="rounded-xl border p-3">
            <div className="text-xs text-neutral-500">{c.title}</div>
            <div className="text-xl font-semibold">{c.value}</div>
            <div className="text-xs text-neutral-500">{c.hint}</div>
          </div>
        ))}
      </div>
      <p className="mt-3 text-xs text-neutral-500">* 실제 값은 머터리얼라이즈드 뷰 연결 후 표시.</p>
    </div>
  );
}

