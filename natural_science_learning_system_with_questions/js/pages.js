function renderCurrentPage() {
  switch (state.currentPage) {
    case "flow":
      return renderFlowPage();
    case "pretestIntro":
      return renderTestIntro("前測說明", "本測驗主要了解你在學習前對「生殖」單元的理解程度，請依照自己的想法作答。", "開始前測", "pretest");
    case "pretest":
      return renderQuizPage("前測", pretestQuestions, "stage1Intro", "pretest");
    case "stage1Intro":
      return renderStageIntro("第一階段：正式學習", firstMethod(), "此階段將作為前後測學習成效分析依據，請依照畫面指示完成學習。", "開始學習", "stage1Learning");
    case "stage1Learning":
      return firstMethod() === "互動模擬器" ? renderSimulatorPage("第一階段：互動模擬器", "posttestIntro") : renderTextLearningPage("第一階段：文字教學", "posttestIntro");
    case "posttestIntro":
      return renderTestIntro("後測說明", "你已完成第一階段正式學習，接下來請完成後測，以了解學習後的理解情形。", "開始後測", "posttest");
    case "posttest":
      return renderQuizPage("後測", posttestQuestions, "analysis", "posttest");
    case "analysis":
      return renderAnalysisPage();
    case "exchangeIntro":
      return renderStageIntro("交換體驗", secondMethod(), "你已完成正式學習與後測。接下來將體驗另一種教學方式，體驗後請填寫問卷。", "開始交換體驗", "exchangeLearning");
    case "exchangeLearning":
      return secondMethod() === "互動模擬器" ? renderSimulatorPage("交換體驗：互動模擬器", "survey") : renderTextLearningPage("交換體驗：文字教學", "survey");
    case "survey":
      return renderSurveyPage();
    case "complete":
      return renderCompletePage();
    case "reviewSimulator":
      return renderReviewSimulatorPage();
    case "reviewText":
      return renderReviewTextPage();
    default:
      return "";
  }
}

function renderLogin() {
  app.innerHTML = `
    <section class="login-page">
      <div class="login-card">
        <div class="logo-icon">🌱</div>
        <h1 class="system-title">生命探索模擬學習系統</h1>
        <p class="system-unit">以生殖單元為例</p>

        <div class="form-title">請輸入個人資訊</div>

        <div class="field">
          <label for="studentCode">學生代碼</label>
          <input id="studentCode" type="text" placeholder="輸入代碼" />
        </div>

        <div class="field">
          <label for="password">密碼</label>
          <input id="password" type="password" placeholder="輸入密碼" />
        </div>

        <div id="loginError" class="error-text"></div>

        <button id="loginBtn" class="primary-btn full">開始學習</button>

        <p class="hint">
          本測驗結果僅供學術研究使用<br>
          請依照指示完成前測、學習、後測與問卷
        </p>
      </div>
    </section>
  `;

  document.getElementById("loginBtn").addEventListener("click", login);
}

function renderFlowPage() {
  return `
    <div class="center">
      <div class="card">
        <h2 class="page-title">目前任務：學習流程說明</h2>
        <p class="page-desc">
          你好，${state.studentCode}。請依照系統流程完成學習任務。
        </p>

        <div class="info-list">
          <div class="info-item">
            <div class="info-icon">📋</div>
            <div>
              <h3>正式實驗階段</h3>
              <p>前測 → 第一階段正式學習 → 後測</p>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon">🔁</div>
            <div>
              <h3>交換體驗階段</h3>
              <p>體驗另一種教學方式 → 填寫學習感受問卷</p>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon">🔒</div>
            <div>
              <h3>流程限制</h3>
              <p>請依序完成各階段，避免跳題或漏填造成資料不完整。</p>
            </div>
          </div>
        </div>

        <div class="method-box">
          你的第一階段學習方式為：${firstMethod()}
        </div>

        <div class="actions">
          <span></span>
          <button class="primary-btn" data-go="pretestIntro">下一步</button>
        </div>
      </div>
    </div>
  `;
}

function renderTestIntro(title, description, buttonText, nextPage) {
  return `
    <div class="center">
      <div class="card small">
        <div class="logo-icon">🌿</div>
        <h2 class="page-title">${title}</h2>
        <p class="page-desc">${description}</p>

        <div class="stat-grid">
          <div class="stat-card">
            <span>測驗題數</span>
            <strong>10 題</strong>
          </div>
          <div class="stat-card">
            <span>預估時間</span>
            <strong>3 分鐘</strong>
          </div>
        </div>

        <button class="primary-btn full" data-go="${nextPage}">${buttonText}</button>
      </div>
    </div>
  `;
}

function renderImage(imagePath, altText) {
  if (!imagePath) return "";

  return `
    <div class="question-image-wrap">
      <img
        class="question-image"
        src="${imagePath}"
        alt="${altText || "題目圖片"}"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='block';"
      />
      <div class="image-missing">圖片尚未放入：${imagePath}</div>
    </div>
  `;
}

function getOptionText(option) {
  return typeof option === "string" ? option : option.text;
}

function getOptionImage(option) {
  return typeof option === "string" ? null : option.image;
}

function renderQuizPage(title, questions, nextPage, testType) {
  const currentQuestion = questions[state.quizIndex];
  const answers = getCurrentQuizAnswers(testType);
  state.selectedQuizOption = answers[state.quizIndex] ?? null;

  const optionsHtml = currentQuestion.options.map((option, index) => `
    <button class="option ${state.selectedQuizOption === index ? "selected" : ""}" data-option="${index}">
      <span class="radio"></span>
      <span class="option-content">
        <span>${getOptionText(option)}</span>
        ${renderImage(getOptionImage(option), `${title}第 ${state.quizIndex + 1} 題選項 ${index + 1}`)}
      </span>
    </button>
  `).join("");

  const isLastQuestion = state.quizIndex === questions.length - 1;
  const backLabel = state.quizIndex === 0 ? "回說明頁" : "上一題";
  const nextLabel = isLastQuestion ? "完成測驗" : "下一題";

  return `
    <div class="center">
      <div class="card quiz-card">
        <div class="quiz-top">
          <h2 class="page-title">${title}</h2>
          <div class="quiz-count">第 ${state.quizIndex + 1} / ${questions.length} 題</div>
        </div>

        <div class="question">${currentQuestion.question}</div>
        ${renderImage(currentQuestion.image, `${title}第 ${state.quizIndex + 1} 題圖片`)}
        ${optionsHtml}

        <div class="actions">
          <button class="secondary-btn" data-quiz-back="${testType}">${backLabel}</button>
          <button class="primary-btn" data-quiz-next="${nextPage}" data-test-type="${testType}">${nextLabel}</button>
        </div>
      </div>
    </div>
  `;
}

function renderStageIntro(title, methodName, description, buttonText, nextPage) {
  return `
    <div class="center">
      <div class="card small">
        <div class="logo-icon">📖</div>
        <h2 class="page-title">${title}</h2>
        <p class="page-desc">你的學習方式為：<strong style="color: var(--primary-dark);">${methodName}</strong></p>

        <div class="method-box" style="text-align:left; font-weight:400;">
          ${description}
        </div>

        <div class="actions">
          <span></span>
          <button class="primary-btn full" data-go="${nextPage}">${buttonText}</button>
        </div>
      </div>
    </div>
  `;
}

function renderSimulatorPage(title, nextPage) {
  return `
    <div class="learning-grid">
      <div class="learning-title-row">
        <h2>${title}</h2>
        <button class="secondary-btn" data-go="${nextPage === "posttestIntro" ? "posttestIntro" : "survey"}">
          完成學習
        </button>
      </div>

      <div class="simulator-layout">
        <section class="simulator-stage">
          <div class="flower-placeholder">
            <div class="pollen"></div>
            <div class="tube"></div>
            <div class="ovule">胚珠</div>
          </div>
          <div class="placeholder-note">此區為互動模擬器預留位置</div>
        </section>

        <aside class="side-panel">
          <div class="side-card">
            <h3>觀察任務</h3>
            <p>觀察花粉落到柱頭後，花粉管如何往胚珠方向延伸。</p>
          </div>

          <div class="side-card">
            <h3>操作提示</h3>
            <p>之後可放置「開始模擬」、「重播動畫」、「下一步觀察」等按鈕。</p>
          </div>

          <div class="side-card">
            <h3>學習重點</h3>
            <p>授粉、花粉管、受精、種子形成。</p>
          </div>

          <button class="primary-btn full" data-go="${nextPage}">完成學習</button>
        </aside>
      </div>
    </div>
  `;
}

function renderReviewSimulatorPage() {
  return `
    <div class="learning-grid review-page">
      <div class="learning-title-row compact-title">
        <h2>互動式模擬器</h2>
        <div class="review-switch">
          <button class="secondary-btn" data-go="reviewText">文字教學</button>
          <button class="primary-btn" data-go="complete">回到完成頁</button>
        </div>
      </div>

      <div class="simulator-layout compact-simulator-layout">
        <section class="simulator-stage compact-simulator-stage">
          <div class="flower-placeholder compact-flower">
            <div class="pollen"></div>
            <div class="tube"></div>
            <div class="ovule">胚珠</div>
          </div>
          <div class="placeholder-note">互動模擬器回看區</div>
        </section>

        <aside class="side-panel compact-side-panel">
          <div class="side-card">
            <h3>觀察任務</h3>
            <p>觀察花粉落到柱頭後，花粉管如何往胚珠方向延伸。</p>
          </div>

          <div class="side-card">
            <h3>學習重點</h3>
            <p>授粉 → 花粉管 → 受精 → 種子形成。</p>
          </div>
        </aside>
      </div>
    </div>
  `;
}

function renderTextLearningPage(title, nextPage) {
  return `
    <div class="text-learning-card">
      <h2 class="page-title">${title}</h2>
      <div class="progress-bar">
        <div class="progress-fill"></div>
      </div>

      <h3>生殖的意義</h3>
      <p class="page-desc">
        生殖是生物產生下一代的過程，可以使物種延續。生殖方式大致可分為無性生殖與有性生殖。
        無性生殖通常只需要一個親代，而有性生殖通常需要雌雄配子結合，能增加後代的遺傳變異。
      </p>

      <div class="key-box">
        <h3>重點整理</h3>
        <ul>
          <li>無性生殖通常只需要一個親代。</li>
          <li>有性生殖需要配子結合。</li>
          <li>有性生殖能增加後代遺傳變異。</li>
        </ul>
      </div>

      <div class="actions">
        <button class="secondary-btn" disabled>上一頁</button>
        <button class="primary-btn" data-go="${nextPage}">完成學習</button>
      </div>
    </div>
  `;
}

function renderReviewTextPage() {
  return `
    <div class="learning-grid review-page">
      <div class="learning-title-row compact-title">
        <h2>文字教學</h2>
        <div class="review-switch">
          <button class="secondary-btn" data-go="reviewSimulator">互動式模擬器</button>
          <button class="primary-btn" data-go="complete">回到完成頁</button>
        </div>
      </div>

      <div class="text-learning-card compact-text-card">
        <h2 class="page-title">生殖的意義</h2>

        <p class="page-desc">
          生殖是生物產生下一代的過程，可分為無性生殖與有性生殖。
          有性生殖需要配子結合，能增加後代的遺傳變異。
        </p>

        <div class="key-box">
          <h3>重點整理</h3>
          <ul>
            <li>無性生殖通常只需要一個親代。</li>
            <li>有性生殖需要雌雄配子結合。</li>
            <li>授粉與受精是植物有性生殖的重要過程。</li>
          </ul>
        </div>
      </div>
    </div>
  `;
}

function renderAnalysisPage() {
  const pretestScore = getQuizScore(pretestQuestions, state.pretestAnswers);
  const posttestScore = getQuizScore(posttestQuestions, state.posttestAnswers);

  return `
    <div class="center">
      <div class="card">
        <h2 class="page-title">學習分析報告</h2>
        <p class="page-desc">此頁目前先顯示前後測答題結果，之後可再加入更完整的錯題詳解。</p>

        <div class="stat-grid">
          <div class="stat-card">
            <span>前測分數</span>
            <strong>${pretestScore} / ${pretestQuestions.length}</strong>
          </div>
          <div class="stat-card">
            <span>後測分數</span>
            <strong>${posttestScore} / ${posttestQuestions.length}</strong>
          </div>
        </div>

        <div class="key-box">
          <h3>錯題詳解預留區</h3>
          <p>
            之後可以在這裡顯示學生答錯的題目、正確答案與詳解內容。
          </p>
        </div>

        <div class="actions">
          <span></span>
          <button class="primary-btn" data-go="exchangeIntro">進入交換體驗</button>
        </div>
      </div>
    </div>
  `;
}

function renderSurveyPage() {
  const questions = [
    "我覺得互動模擬器能幫助我理解生殖概念。",
    "我覺得文字教學能幫助我整理生殖概念。",
    "整體而言，我願意使用互動式系統學習自然科學。",
  ];

  const questionHtml = questions.map((question, qIndex) => {
    const buttons = [1, 2, 3, 4, 5].map(score => `
      <button class="${state.surveyAnswers[qIndex] === score ? "selected" : ""}" data-survey="${qIndex}" data-score="${score}">
        ${score}
      </button>
    `).join("");

    return `
      <div class="survey-question">
        <h3>${qIndex + 1}. ${question}</h3>
        <div class="scale">${buttons}</div>
      </div>
    `;
  }).join("");

  return `
    <div class="center">
      <div class="card wide">
        <h2 class="page-title" style="text-align:center;">學習感受問卷</h2>
        <p class="page-desc" style="text-align:center;">請依照你對兩種教學方式的實際感受作答。</p>

        ${questionHtml}

        <div class="actions">
          <span></span>
          <button class="primary-btn" data-submit-survey>送出問卷</button>
        </div>
      </div>
    </div>
  `;
}

function renderCompletePage() {
  return `
    <div class="center">
      <div class="card small complete-card-compact">
        <div class="logo-icon">🏆</div>
        <h2 class="page-title">挑戰完成！</h2>

        <p class="page-desc compact-desc">
          恭喜你已完成所有學習任務，感謝你參與本次研究。
        </p>

        <div class="complete-list compact-complete-list">
          ✓ 前測　✓ 第一階段學習　✓ 後測<br>
          ✓ 交換體驗　✓ 問卷填寫
        </div>

        <div class="actions complete-actions">
          <button class="secondary-btn full" data-go="reviewSimulator">
            返回互動模擬器 / 文字教學
          </button>

          <button class="primary-btn full" onclick="location.reload()">
            回到登入頁
          </button>
        </div>
      </div>
    </div>
  `;
}
