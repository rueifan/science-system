function renderStepper() {
  const current = pageStepIndex();

  let html = `<header class="progress-header"><div class="stepper">`;

  steps.forEach((label, index) => {
    const status = index === current ? "active" : index < current ? "done" : "";
    html += `
      <div class="step ${status}">
        <div class="step-circle">${index < current ? "✓" : index + 1}</div>
        <div class="step-label">${label}</div>
      </div>
    `;

    if (index !== steps.length - 1) {
      html += `<div class="step-line ${index < current ? "done" : ""}"></div>`;
    }
  });

  html += `</div></header>`;
  return html;
}

function renderStudentModal() {
  return `
    <div class="modal-backdrop">
      <div class="student-modal">
        <h2>學生資訊</h2>

        <div class="modal-code-box">
          <div class="modal-label">學生代碼</div>
          <div class="modal-code">${state.studentCode}</div>
        </div>

        <div class="modal-actions">
          <button class="secondary-btn" data-close-student-modal>取消</button>
          <button class="logout-confirm-btn" data-logout>登出</button>
        </div>
      </div>
    </div>
  `;
}

function getPretestResultMessage(correctCount) {
  if (correctCount <= 4) {
    return {
      title: "還有很多進步空間！",
      message: "這次前測顯示你還有一些內容不太熟悉，接下來的學習活動會帶你認識重要觀念，請依照步驟完成學習。",
      className: "pretest-low",
    };
  }

  if (correctCount <= 7) {
    return {
      title: "已經有基本概念了！",
      message: "你已經掌握部分內容，接下來可以透過學習活動補強還不熟悉的地方。",
      className: "pretest-middle",
    };
  }

  return {
    title: "表現很不錯！",
    message: "你對生殖單元已有良好基礎，接下來可以進一步加深理解。",
    className: "pretest-high",
  };
}

function renderPretestResultModal() {
  const correctCount = getQuizScore(pretestQuestions, state.pretestAnswers);
  const totalCount = pretestQuestions.length;
  const result = getPretestResultMessage(correctCount);

  return `
    <div class="modal-backdrop">
      <div class="pretest-result-modal">
        <div class="pretest-result-icon">🌱</div>

        <h2>前測完成！</h2>

        <div class="pretest-score-box ${result.className}">
          <span>答對題數</span>
          <strong>${correctCount} / ${totalCount}</strong>
        </div>

        <h3>${result.title}</h3>

        <p>
          ${result.message}
        </p>

        <button class="primary-btn full" data-close-pretest-result>
          繼續學習
        </button>
      </div>
    </div>
  `;
}