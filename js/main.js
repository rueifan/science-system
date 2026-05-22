function render() {
  if (state.currentPage === "login") {
    renderLogin();
    return;
  }

  app.innerHTML = `
    <div class="app-layout">
      ${renderStepper()}
      <section class="page-body">
        ${renderCurrentPage()}
        <button class="student-badge" data-open-student-modal>
          ${studentBadgeText()}
        </button>

        ${state.showStudentModal ? renderStudentModal() : ""}
      </section>
    </div>
  `;

  bindPageEvents();
}

function login() {
  const code = document.getElementById("studentCode").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("loginError");

  if (!code || !password) {
    error.textContent = "請輸入學生代碼與密碼";
    return;
  }

  if (password !== "1234") {
    error.textContent = "密碼錯誤，測試密碼為 1234";
    return;
  }

  state.studentCode = code;
  state.password = password;
  state.groupType = getGroupByStudentCode(code);
  state.currentPage = "flow";
  render();
}

function bindPageEvents() {
  document.querySelectorAll("[data-go]").forEach(button => {
    button.addEventListener("click", () => {
      go(button.dataset.go);
    });
  });

  document.querySelectorAll("[data-option]").forEach(button => {
    button.addEventListener("click", () => {
      state.selectedQuizOption = Number(button.dataset.option);

      if (state.currentPage === "pretest" || state.currentPage === "posttest") {
        const answers = getCurrentQuizAnswers(state.currentPage);
        answers[state.quizIndex] = state.selectedQuizOption;
      }

      render();
    });
  });

  document.querySelectorAll("[data-quiz-next]").forEach(button => {
    button.addEventListener("click", () => {
      const testType = button.dataset.testType;
      const questions = testType === "pretest" ? pretestQuestions : posttestQuestions;
      const answers = getCurrentQuizAnswers(testType);

      if (answers[state.quizIndex] === undefined) {
        alert("請先選擇一個答案");
        return;
      }

      if (state.quizIndex < questions.length - 1) {
        state.quizIndex++;
        state.selectedQuizOption = answers[state.quizIndex] ?? null;
        render();
        return;
      }

      go(button.dataset.quizNext);
    });
  });

  document.querySelectorAll("[data-quiz-back]").forEach(button => {
    button.addEventListener("click", () => {
      if (state.quizIndex > 0) {
        const testType = button.dataset.quizBack;
        const answers = getCurrentQuizAnswers(testType);
        state.quizIndex--;
        state.selectedQuizOption = answers[state.quizIndex] ?? null;
        render();
        return;
      }

      historyBackByPage();
    });
  });

  document.querySelectorAll("[data-survey]").forEach(button => {
    button.addEventListener("click", () => {
      const questionIndex = Number(button.dataset.survey);
      const score = Number(button.dataset.score);
      state.surveyAnswers[questionIndex] = score;
      render();
    });
  });

  const surveySubmit = document.querySelector("[data-submit-survey]");
  if (surveySubmit) {
    surveySubmit.addEventListener("click", () => {
      if (Object.keys(state.surveyAnswers).length < 3) {
        alert("請完成所有問卷題目");
        return;
      }
      go("complete");
    });
  }

  const backButton = document.querySelector("[data-back]");
  if (backButton) {
    backButton.addEventListener("click", () => {
      historyBackByPage();
    });
  }

  const logoutButton = document.querySelector("[data-logout]");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      const confirmLogout = confirm("確定要登出嗎？目前的作答進度可能不會保留。");

      if (!confirmLogout) {
        return;
      }

      state.studentCode = "";
      state.password = "";
      state.groupType = "";
      state.currentPage = "login";
      state.selectedQuizOption = null;
      state.quizIndex = 0;
      state.pretestAnswers = {};
      state.posttestAnswers = {};
      state.surveyAnswers = {};
      state.showStudentModal = false;
      render();
    });
  }

  const openStudentModalButton = document.querySelector("[data-open-student-modal]");
  if (openStudentModalButton) {
    openStudentModalButton.addEventListener("click", () => {
      state.showStudentModal = true;
      render();
    });
  }

  const closeStudentModalButton = document.querySelector("[data-close-student-modal]");
  if (closeStudentModalButton) {
    closeStudentModalButton.addEventListener("click", () => {
      state.showStudentModal = false;
      render();
    });
  }

  const modalBackdrop = document.querySelector(".modal-backdrop");
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", event => {
      if (event.target === modalBackdrop) {
        state.showStudentModal = false;
        render();
      }
    });
  }
}

function historyBackByPage() {
  const backMap = {
    pretest: "pretestIntro",
    posttest: "posttestIntro",
  };

  if (backMap[state.currentPage]) {
    go(backMap[state.currentPage]);
  }
}

render();
