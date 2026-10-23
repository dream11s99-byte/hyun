/**
 * 「행정정보 통합관리 기본법」(본칙 14조) 조항 뷰어 엔진
 * 주요 기능:
 * 1. 본칙 14개 조항 데이터 관리 및 렌더링 (장, 조, 항, 호, 목 구조화)
 * 2. 실시간 조문 번호, 제목, 본문 키워드 다중 검색 및 <mark> 하이라이트
 * 3. 기안문용 원클릭 조문 복사 (조 번호 + 제목 + 본문 클립보드 서식 복사)
 * 4. 좌측 목차(TOC) 생성 및 스크롤스파이
 * 5. 폰트 크기 변경 (A- / A / A+), 다크/라이트 모드, 전체 접기/펼치기
 */

// 본칙 14개 조항 데이터셋
const LAW_DATA = [
  {
    chapterId: "ch1",
    chapterNum: "제1장",
    chapterTitle: "총칙",
    articles: [
      {
        id: "art1",
        num: "제1조",
        title: "목적",
        keywords: ["목적", "행정효율", "국민편익", "연계공유"],
        clauses: [
          {
            type: "para",
            text: "이 법은 행정기관이 보유·관리하는 행정정보의 통합적인 연계·공유 및 안전한 활용에 관한 기본적 사항을 규정함으로써 행정의 효율성을 제고하고 국민의 편익 증진에 이바지함을 목적으로 한다."
          }
        ]
      },
      {
        id: "art2",
        num: "제2조",
        title: "정의",
        keywords: ["용어정의", "행정기관", "공동이용", "데이터품질"],
        clauses: [
          {
            type: "para",
            text: "이 법에서 사용하는 용어의 뜻은 다음과 같다.",
            subclauses: [
              { num: "1.", text: "“행정기관”이란 중앙행정기관 및 그 소속 기관, 지방자치단체 및 그 소속 기관을 말한다." },
              { num: "2.", text: "“행정정보”란 행정기관이 직무상 작성·취득하여 관리하고 있는 문서·도면·사진·필름·테이프·슬라이드 및 컴퓨터 등에 의하여 전자적으로 처리되는 모든 형태의 정보를 말한다." },
              { num: "3.", text: "“행정정보 통합관리체계”란 행정정보를 체계적으로 연계·수집·저장·분류 및 제공하기 위하여 구축된 전자적 정보처리시스템을 말한다." },
              { num: "4.", text: "“공동이용”이란 행정기관 상호 간 또는 행정기관과 공공기관 간에 행정정보를 전자적 방식으로 연계하여 열람·활용하는 것을 말한다." },
              { num: "5.", text: "“데이터품질”이란 행정정보가 이용자의 목적에 부합하고 최신성·정확성·완전성 및 상호운용성을 갖춘 정도를 말한다." }
            ]
          }
        ]
      },
      {
        id: "art3",
        num: "제3조",
        title: "기본원칙",
        keywords: ["기본원칙", "최소수집", "데이터최신성", "상호협력"],
        clauses: [
          {
            type: "para",
            text: "행정기관은 행정정보를 관리하고 활용함에 있어 다음 각 호의 원칙을 준수하여야 한다.",
            subclauses: [
              { num: "1.", text: "국민 편익 최우선의 원칙: 행정정보의 연계 및 공동이용은 국민의 구비서류 제출 부담을 최소화하고 원스톱 행정서비스를 구현하는 방향으로 추진되어야 한다." },
              { num: "2.", text: "최소 수집 및 안전 관리의 원칙: 행정정보는 법령이 정한 목적 달성에 필요한 최소한의 범위에서 수집되어야 하며, 불법적인 유출·변조가 없도록 엄격히 관리되어야 한다." },
              { num: "3.", text: "데이터 품질 확보의 원칙: 행정정보는 상시 정제되어 최신성과 정확성이 유지되어야 한다." },
              { num: "4.", text: "상호협력 및 연계의 원칙: 각 행정기관은 부처 이기주의를 지양하고 국가적 차원의 정보 연계와 공동이용에 적극 협력하여야 한다." }
            ]
          }
        ]
      },
      {
        id: "art4",
        num: "제4조",
        title: "다른 법률과의 관계",
        keywords: ["법률관계", "특별법우선", "적용범위"],
        clauses: [
          {
            type: "para",
            text: "행정정보의 통합관리 및 전자적 공동이용에 관하여 다른 법률에 특별한 규정이 있는 경우를 제외하고는 이 법에서 정하는 바에 따른다."
          }
        ]
      }
    ]
  },
  {
    chapterId: "ch2",
    chapterNum: "제2장",
    chapterTitle: "행정정보 통합관리 추진체계",
    articles: [
      {
        id: "art5",
        num: "제5조",
        title: "기본계획의 수립 등",
        keywords: ["기본계획", "행정안전부장관", "3년주기", "중장기정책"],
        clauses: [
          {
            type: "clause",
            clauseNum: "①",
            text: "행정안전부장관은 관계 중앙행정기관의 장과 협의하여 행정정보의 체계적 통합관리를 위한 기본계획(이하 “기본계획”이라 한다)을 3년마다 수립·시행하여야 한다."
          },
          {
            type: "clause",
            clauseNum: "②",
            text: "기본계획에는 다음 각 호의 사항이 포함되어야 한다.",
            subclauses: [
              { num: "1.", text: "행정정보 통합관리의 정책 목표 및 중장기 추진 방향" },
              { num: "2.", text: "행정기관 간 행정정보의 연계 및 공동이용 촉진에 관한 사항" },
              { num: "3.", text: "행정정보 표준화 및 데이터 품질관리에 관한 사항" },
              { num: "4.", text: "행정정보의 안전성 확보 및 개인정보보호 대책" },
              { num: "5.", text: "그 밖에 행정정보 통합관리를 위하여 필요한 사항" }
            ]
          },
          {
            type: "clause",
            clauseNum: "③",
            text: "행정안전부장관은 기본계획을 수립하거나 변경하려는 때에는 제6조에 따른 행정정보통합관리위원회의 심의를 거쳐야 한다."
          }
        ]
      },
      {
        id: "art6",
        num: "제6조",
        title: "행정정보통합관리위원회",
        keywords: ["위원회", "국무총리소속", "이견조정", "정책심의"],
        clauses: [
          {
            type: "clause",
            clauseNum: "①",
            text: "행정정보의 통합관리 및 공동이용에 관한 주요 정책 사항을 심의·조정하기 위하여 국무총리 소속으로 행정정보통합관리위원회(이하 “위원회”라 한다)를 둔다."
          },
          {
            type: "clause",
            clauseNum: "②",
            text: "위원회는 다음 각 호의 사항을 심의·조정한다.",
            subclauses: [
              { num: "1.", text: "기본계획의 수립 및 변경에 관한 사항" },
              { num: "2.", text: "행정기관 간 정보 연계 및 공동이용에 관한 이견의 조정" },
              { num: "3.", text: "행정정보의 국가 표준 제정 및 품질 기준에 관한 사항" },
              { num: "4.", text: "그 밖에 위원장이 심의에 부치는 중요 사항" }
            ]
          },
          {
            type: "clause",
            clauseNum: "③",
            text: "위원회의 구성·조직 및 운영에 필요한 사항은 대통령령으로 정한다."
          }
        ]
      },
      {
        id: "art7",
        num: "제7조",
        title: "전담기관의 지정 및 운영",
        keywords: ["전담기관", "연계망운영", "예산지원", "품질지원"],
        clauses: [
          {
            type: "clause",
            clauseNum: "①",
            text: "행정안전부장관은 행정정보 통합관리체계의 안정적 운영, 연계망 관리 및 데이터 품질 지원 업무를 전담하는 기관(이하 “전담기관”이라 한다)을 지정할 수 있다."
          },
          {
            type: "clause",
            clauseNum: "②",
            text: "정부는 전담기관이 제1항의 업무를 수행하는 데 필요한 경비의 전부 또는 일부를 예산의 범위에서 지원할 수 있다."
          }
        ]
      }
    ]
  },
  {
    chapterId: "ch3",
    chapterNum: "제3장",
    chapterTitle: "행정정보의 연계 및 공동이용",
    articles: [
      {
        id: "art8",
        num: "제8조",
        title: "행정정보의 표준화",
        keywords: ["표준화", "데이터코드", "서식고시", "준수의무"],
        clauses: [
          {
            type: "clause",
            clauseNum: "①",
            text: "행정안전부장관은 행정기관 간 원활한 행정정보 연계와 공동이용을 위하여 정보 항목, 코드, 데이터베이스 구조 및 연계 서식의 표준을 정하여 고시하여야 한다."
          },
          {
            type: "clause",
            clauseNum: "②",
            text: "행정기관의 장은 새로운 정보시스템을 구축하거나 기존 정보시스템을 개선·고도화할 때 제1항의 표준을 준수하여야 한다."
          }
        ]
      },
      {
        id: "art9",
        num: "제9조",
        title: "공동이용의 신청 및 승인",
        keywords: ["공동이용신청", "승인요건", "제공거부사유", "국가안전보장"],
        clauses: [
          {
            type: "clause",
            clauseNum: "①",
            text: "소관 법령에 따른 업무 수행을 위하여 다른 행정기관이 보유한 행정정보를 공동이용하려는 행정기관의 장은 행정안전부장관 및 해당 정보보유기관의 장에게 공동이용을 신청하여야 한다."
          },
          {
            type: "clause",
            clauseNum: "②",
            text: "정보보유기관의 장은 다음 각 호의 어느 하나에 해당하는 경우를 제외하고는 제1항에 따른 신청을 정당한 사유 없이 거부하여서는 아니 된다.",
            subclauses: [
              { num: "1.", text: "국가안전보장, 국방, 통일 등 국가의 중대한 이익을 현저히 해칠 우려가 명백한 경우" },
              { num: "2.", text: "다른 법률에 따라 비밀로 유지되거나 정보 제공이 엄격히 금지된 경우" },
              { num: "3.", text: "신청 기관의 법적 업무 목적과 무관하거나 과도한 정보를 요구하는 경우" }
            ]
          }
        ]
      },
      {
        id: "art10",
        num: "제10조",
        title: "행정정보 통합플랫폼의 구축 및 운영",
        keywords: ["통합플랫폼", "단일창구", "실시간교환", "인프라"],
        clauses: [
          {
            type: "clause",
            clauseNum: "①",
            text: "행정안전부장관은 행정기관 간의 신속하고 안전한 행정정보 공동이용을 중계·지원하기 위하여 단일화된 연계 창구로서 “국가행정정보 통합플랫폼”을 구축·운영하여야 한다."
          },
          {
            type: "clause",
            clauseNum: "②",
            text: "행정기관의 장은 특별한 사유가 없으면 제1항의 통합플랫폼을 통하여 행정정보를 연계·제공하여야 한다."
          }
        ]
      },
      {
        id: "art11",
        num: "제11조",
        title: "데이터 품질관리 및 평가",
        keywords: ["품질관리", "정기진단", "연1회", "실태평가"],
        clauses: [
          {
            type: "clause",
            clauseNum: "①",
            text: "행정기관의 장은 소관 행정정보의 최신성과 정확성을 확보하기 위하여 연 1회 이상 데이터 품질 진단 및 오류 정제를 실시하여야 한다."
          },
          {
            type: "clause",
            clauseNum: "②",
            text: "행정안전부장관은 행정기관의 데이터 품질관리 실태를 정기적으로 점검·평가하고, 필요한 경우 시정 및 개선을 권고할 수 있다."
          }
        ]
      }
    ]
  },
  {
    chapterId: "ch4",
    chapterNum: "제4장",
    chapterTitle: "정보 보호 및 사후관리",
    articles: [
      {
        id: "art12",
        num: "제12조",
        title: "안전성 확보 조치 및 접근 통제",
        keywords: ["안전성확보", "암호화", "접근통제", "침해사고"],
        clauses: [
          {
            type: "clause",
            clauseNum: "①",
            text: "행정정보를 보유하거나 공동이용하는 행정기관의 장은 정보의 분실·도난·유출·위조·변조 또는 훼손을 방지하기 위하여 다음 각 호의 기술적·관리적 및 물리적 조치를 하여야 한다.",
            subclauses: [
              { num: "1.", text: "고유식별정보 및 민감정보의 안전한 암호화 저장 및 전송 구간 암호화" },
              { num: "2.", text: "업무 담당자별 접근 권한의 최소화 차등 부여 및 분기별 점검" },
              { num: "3.", text: "접속기록의 위·변조 방지 및 비인가 접속 차단시스템의 상시 가동" }
            ]
          },
          {
            type: "clause",
            clauseNum: "②",
            text: "행정기관의 장은 행정정보 통합관리체계에 침해사고가 발생하거나 발생할 우려가 있는 때에는 즉시 관계 기관에 통보하고 긴급 대응조치를 취하여야 한다."
          }
        ]
      },
      {
        id: "art13",
        num: "제13조",
        title: "이용기록의 보관 및 점검",
        keywords: ["이용기록", "3년보관", "로그점검", "오남용방지"],
        clauses: [
          {
            type: "clause",
            clauseNum: "①",
            text: "행정기관의 장은 소속 직원이 행정정보를 열람·출력·다운로드 또는 전송한 기록(이하 “이용기록”이라 한다)을 3년 이상 안전하게 보관하여야 한다."
          },
          {
            type: "clause",
            clauseNum: "②",
            text: "행정기관의 장은 분기별 1회 이상 이용기록을 주기적으로 점검하여 목적 외 조회 또는 사적 남용 여부를 확인하여야 한다."
          }
        ]
      },
      {
        id: "art14",
        num: "제14조",
        title: "비밀유지의 의무 및 벌칙 적용",
        keywords: ["비밀유지", "직무상취득", "벌칙", "5년이하징역", "10년이하징역"],
        clauses: [
          {
            type: "clause",
            clauseNum: "①",
            text: "이 법에 따라 행정정보의 통합관리 및 공동이용 업무에 종사하거나 종사하였던 자는 직무상 알게 된 행정정보 또는 비밀을 타인에게 누설하거나 권한 없이 이용하여서는 아니 된다."
          },
          {
            type: "clause",
            clauseNum: "②",
            text: "제1항을 위반하여 행정정보를 누설하거나 정당한 권한 없이 타인에게 제공한 자는 5년 이하의 징역 또는 5천만원 이하의 벌금에 처한다."
          },
          {
            type: "clause",
            clauseNum: "③",
            text: "행정정보 통합관리체계에 저장된 데이터를 부정한 방법으로 위조·변조하거나 말소한 자는 10년 이하의 징역에 처한다."
          }
        ]
      }
    ]
  }
];

// 상태 변수
let currentKeyword = "";
let isAllCollapsed = false;

// DOM 요소
const searchInput = document.getElementById("lawSearchInput");
const searchClearBtn = document.getElementById("searchClearBtn");
const searchStats = document.getElementById("searchStats");
const tocNav = document.getElementById("tocNav");
const articlesContainer = document.getElementById("articlesContainer");
const copyToast = document.getElementById("copyToast");
const copyToastMsg = document.getElementById("copyToastMsg");
const toggleAllBtn = document.getElementById("toggleAllBtn");
const themeToggleBtn = document.getElementById("themeToggleBtn");
const printBtn = document.getElementById("printBtn");
const fontSizeBtns = document.querySelectorAll(".font-size-btn");
const kwChips = document.querySelectorAll(".kw-chip");

/**
 * 1. 텍스트 하이라이트 함수 (HTML 이스케이프 후 <mark> 태그 적용)
 */
function highlightText(text, keyword) {
  if (!keyword || !keyword.trim()) {
    return escapeHtml(text);
  }
  const cleanKeyword = keyword.trim();
  const escapedText = escapeHtml(text);
  
  // 특수문자 정규식 이스케이프
  const regexPattern = cleanKeyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${regexPattern})`, 'gi');
  
  return escapedText.replace(regex, '<mark class="law-highlight">$1</mark>');
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * 2. 목차(TOC) 렌더링
 */
function renderTOC(data) {
  tocNav.innerHTML = "";
  
  data.forEach(chap => {
    const groupDiv = document.createElement("div");
    groupDiv.className = "toc-chapter-group";
    
    const chapTitle = document.createElement("div");
    chapTitle.className = "toc-chapter-title";
    chapTitle.textContent = `${chap.chapterNum} ${chap.chapterTitle}`;
    groupDiv.appendChild(chapTitle);

    const ul = document.createElement("ul");
    ul.className = "toc-list";

    chap.articles.forEach(art => {
      const li = document.createElement("li");
      li.className = "toc-item";
      
      const a = document.createElement("a");
      a.href = `#${art.id}`;
      a.className = "toc-link";
      a.dataset.targetId = art.id;
      a.innerHTML = `<span style="font-weight:700; color:var(--primary); margin-right:4px;">${art.num}</span> ${escapeHtml(art.title)}`;
      
      a.addEventListener("click", (e) => {
        e.preventDefault();
        scrollToArticle(art.id);
      });

      li.appendChild(a);
      ul.appendChild(li);
    });

    groupDiv.appendChild(ul);
    tocNav.appendChild(groupDiv);
  });
}

/**
 * 3. 조문 본문 렌더링
 */
function renderArticles(data, filterKeyword = "") {
  articlesContainer.innerHTML = "";
  const kw = filterKeyword.trim().toLowerCase();
  let matchedArticleCount = 0;

  data.forEach(chap => {
    // 챕터 내에 매칭되는 조문이 있는지 확인
    const matchedArticles = chap.articles.filter(art => {
      if (!kw) return true;
      
      // 조문 번호(예: 제5조, 5조, 5), 제목, 키워드 검색
      const numMatch = art.num.toLowerCase().includes(kw) || art.num.replace(/[^0-9]/g, '') === kw.replace(/[^0-9]/g, '') && kw.length <= 3;
      const titleMatch = art.title.toLowerCase().includes(kw);
      const kwMatch = art.keywords.some(k => k.toLowerCase().includes(kw));
      
      // 본문 검색
      const bodyMatch = art.clauses.some(cl => {
        if (cl.text.toLowerCase().includes(kw)) return true;
        if (cl.subclauses && cl.subclauses.some(sc => sc.text.toLowerCase().includes(kw))) return true;
        return false;
      });

      return numMatch || titleMatch || kwMatch || bodyMatch;
    });

    if (matchedArticles.length === 0) return;

    matchedArticleCount += matchedArticles.length;

    // 장 구분자 생성
    const chapDivider = document.createElement("div");
    chapDivider.className = "chapter-divider";
    chapDivider.innerHTML = `
      <div>
        <div class="chapter-badge">${escapeHtml(chap.chapterNum)}</div>
        <div class="chapter-title">${escapeHtml(chap.chapterTitle)}</div>
      </div>
      <div style="font-size:0.85rem; opacity:0.8;">${matchedArticles.length}개 조항</div>
    `;
    articlesContainer.appendChild(chapDivider);

    // 각 조문 카드 생성
    matchedArticles.forEach(art => {
      const card = createArticleCard(art, kw);
      articlesContainer.appendChild(card);
    });
  });

  // 검색 결과 통계 업데이트
  updateSearchStats(matchedArticleCount, kw);

  // 검색 결과 없을 때
  if (matchedArticleCount === 0) {
    const emptyCard = document.createElement("div");
    emptyCard.className = "no-results-card";
    emptyCard.innerHTML = `
      <div class="no-results-icon">🔎</div>
      <h3 style="font-size:1.15rem; color:var(--text-primary); margin-bottom:0.5rem;">일치하는 조문이 없습니다</h3>
      <p>검색어 <strong>"${escapeHtml(kw)}"</strong>에 해당하는 조항을 찾을 수 없습니다.<br>다른 조 번호나 검색 키워드를 입력해 보세요.</p>
    `;
    articlesContainer.appendChild(emptyCard);
  }
}

/**
 * 조문 카드 엘리먼트 생성
 */
function createArticleCard(art, kw) {
  const card = document.createElement("section");
  card.className = "article-card";
  card.id = art.id;

  // 조 헤더
  const header = document.createElement("div");
  header.className = "article-header";

  const highlightedNum = highlightText(art.num, kw);
  const highlightedTitle = highlightText(art.title, kw);
  const keywordTags = art.keywords.map(k => `#${k}`).slice(0, 3).join(" ");

  header.innerHTML = `
    <div class="article-header-left">
      <span class="article-number">${highlightedNum}</span>
      <span class="article-subject">(${highlightedTitle})</span>
      <span class="article-keywords-badge">${escapeHtml(keywordTags)}</span>
    </div>
    <div class="article-actions">
      <button type="button" class="action-btn copy-btn" title="기안문 작성용 조문 복사">
        <span>📋</span> <span>복사</span>
      </button>
      <span class="collapse-indicator">▼</span>
    </div>
  `;

  // 조문 본문
  const body = document.createElement("div");
  body.className = "article-body";

  art.clauses.forEach(cl => {
    const clauseItem = document.createElement("div");
    clauseItem.className = "clause-item";

    const clauseNumHtml = cl.clauseNum ? `<span class="clause-num">${escapeHtml(cl.clauseNum)}</span>` : '';
    const clauseTextHtml = highlightText(cl.text, kw);

    let subclauseHtml = "";
    if (cl.subclauses && cl.subclauses.length > 0) {
      subclauseHtml = `<ul class="subclause-list">` + 
        cl.subclauses.map(sc => `
          <li class="subclause-item">
            <span class="subclause-num">${escapeHtml(sc.num)}</span>
            <div class="subclause-content">${highlightText(sc.text, kw)}</div>
          </li>
        `).join('') + `</ul>`;
    }

    clauseItem.innerHTML = `
      ${clauseNumHtml}
      <div class="clause-content">
        ${clauseTextHtml}
        ${subclauseHtml}
      </div>
    `;

    body.appendChild(clauseItem);
  });

  // 복사 버튼 이벤트 바인딩
  const copyBtn = header.querySelector(".copy-btn");
  copyBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    copyArticleText(art);
  });

  // 카드 헤더 클릭 시 접기/펼치기
  header.addEventListener("click", () => {
    card.classList.toggle("collapsed");
  });

  card.appendChild(header);
  card.appendChild(body);
  return card;
}

/**
 * 조문 텍스트 클립보드 복사 (기안문/보고서 최적화 포맷)
 */
function copyArticleText(art) {
  let formatted = `「행정정보 통합관리 기본법」 ${art.num}(${art.title})\n`;

  art.clauses.forEach(cl => {
    if (cl.clauseNum) {
      formatted += `${cl.clauseNum} ${cl.text}\n`;
    } else {
      formatted += `${cl.text}\n`;
    }

    if (cl.subclauses) {
      cl.subclauses.forEach(sc => {
        formatted += `  ${sc.num} ${sc.text}\n`;
      });
    }
  });

  navigator.clipboard.writeText(formatted.trim()).then(() => {
    showToast(`「행정정보 통합관리 기본법」 ${art.num}(${art.title})이 클립보드에 복사되었습니다.`);
  }).catch(err => {
    console.error("복사 실패:", err);
    showToast("클립보드 복사에 실패했습니다.");
  });
}

/**
 * 토스트 메시지 띄우기
 */
function showToast(msg) {
  copyToastMsg.textContent = msg;
  copyToast.classList.add("show");
  setTimeout(() => {
    copyToast.classList.remove("show");
  }, 2800);
}

/**
 * 검색 통계 바 업데이트
 */
function updateSearchStats(count, kw) {
  if (!kw) {
    searchStats.innerHTML = `<span>총 <strong id="totalArticleCount">14</strong>개 조항 열람 가능</span>`;
  } else {
    searchStats.innerHTML = `<span>검색어 "<strong>${escapeHtml(kw)}</strong>" 일치 조항: <strong>${count}</strong>건</span>`;
  }
}

/**
 * 조문으로 부드러운 스크롤 & 타겟 하이라이트 애니메이션
 */
function scrollToArticle(id) {
  const targetCard = document.getElementById(id);
  if (!targetCard) return;

  // 만약 접혀있다면 펼치기
  if (targetCard.classList.contains("collapsed")) {
    targetCard.classList.remove("collapsed");
  }

  targetCard.scrollIntoView({ behavior: "smooth", block: "start" });

  targetCard.classList.remove("highlight-target");
  void targetCard.offsetWidth; // Reflow 트리거
  targetCard.classList.add("highlight-target");

  // 목차 링크 활성화 상태 변경
  document.querySelectorAll(".toc-link").forEach(link => {
    if (link.dataset.targetId === id) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

/**
 * 스크롤스파이 (ScrollSpy): 스크롤 위치에 따라 좌측 목차 자동 활성화
 */
function setupScrollSpy() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        document.querySelectorAll(".toc-link").forEach(link => {
          if (link.dataset.targetId === id) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }, {
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0
  });

  document.querySelectorAll(".article-card").forEach(card => {
    observer.observe(card);
  });
}

/**
 * 이벤트 리스너 바인딩
 */
function setupEvents() {
  // 실시간 검색
  let debounceTimeout = null;
  searchInput.addEventListener("input", (e) => {
    const val = e.target.value;
    searchClearBtn.style.display = val.length > 0 ? "flex" : "none";

    clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
      currentKeyword = val;
      renderArticles(LAW_DATA, currentKeyword);
      setupScrollSpy();
    }, 150);
  });

  // 검색어 클리어 버튼
  searchClearBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchClearBtn.style.display = "none";
    currentKeyword = "";
    renderArticles(LAW_DATA, "");
    setupScrollSpy();
    searchInput.focus();
  });

  // 추천 키워드 칩 클릭
  kwChips.forEach(chip => {
    chip.addEventListener("click", () => {
      const kw = chip.dataset.kw;
      searchInput.value = kw;
      searchClearBtn.style.display = "flex";
      currentKeyword = kw;
      renderArticles(LAW_DATA, kw);
      setupScrollSpy();
    });
  });

  // 폰트 크기 변경
  fontSizeBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      fontSizeBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      document.body.classList.remove("font-sm", "font-md", "font-lg");
      const size = btn.dataset.size;
      document.body.classList.add(`font-${size}`);
    });
  });

  // 다크/라이트 모드 토글
  themeToggleBtn.addEventListener("click", () => {
    const isDark = document.body.classList.toggle("theme-dark");
    const themeIcon = themeToggleBtn.querySelector(".theme-icon");
    const btnText = themeToggleBtn.querySelector(".btn-text");

    if (isDark) {
      themeIcon.textContent = "☀️";
      btnText.textContent = "라이트모드";
    } else {
      themeIcon.textContent = "🌙";
      btnText.textContent = "다크모드";
    }
  });

  // 전체 접기 / 펼치기 토글
  toggleAllBtn.addEventListener("click", () => {
    isAllCollapsed = !isAllCollapsed;
    const cards = document.querySelectorAll(".article-card");
    const toggleIcon = toggleAllBtn.querySelector(".toggle-icon");
    const btnText = toggleAllBtn.querySelector(".btn-text");

    cards.forEach(card => {
      if (isAllCollapsed) {
        card.classList.add("collapsed");
      } else {
        card.classList.remove("collapsed");
      }
    });

    if (isAllCollapsed) {
      toggleIcon.textContent = "📁";
      btnText.textContent = "모두 펼치기";
    } else {
      toggleIcon.textContent = "📂";
      btnText.textContent = "모두 접기";
    }
  });

  // 인쇄 버튼
  printBtn.addEventListener("click", () => {
    // 모든 카드 일시적으로 펼친 후 인쇄
    const cards = document.querySelectorAll(".article-card");
    cards.forEach(card => card.classList.remove("collapsed"));
    window.print();
  });
}

/**
 * 초기화 실행
 */
document.addEventListener("DOMContentLoaded", () => {
  // 1. 목차 렌더링
  renderTOC(LAW_DATA);

  // 2. 조문 본문 렌더링
  renderArticles(LAW_DATA);

  // 3. 이벤트 바인딩
  setupEvents();

  // 4. 스크롤스파이 활성화
  setupScrollSpy();
});
