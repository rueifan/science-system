const app = document.getElementById("app");

const steps = [
  "學習流程說明",
  "前測",
  "第一階段學習",
  "後測",
  "交換體驗",
  "問卷填寫",
];

const state = {
  studentCode: "",
  password: "",
  groupType: "",
  currentPage: "login",
  selectedQuizOption: null,
  quizIndex: 0,
  pretestAnswers: {},
  posttestAnswers: {},
  surveyAnswers: {},
  showStudentModal: false,
};

function getGroupByStudentCode(code) {
  const matches = code.match(/\d+/g);

  if (!matches) {
    return "experimental";
  }

  const lastNumber = matches[matches.length - 1];
  const lastDigit = Number(lastNumber[lastNumber.length - 1]);

  return lastDigit % 2 === 1 ? "experimental" : "control";
}

function groupName() {
  return state.groupType === "experimental" ? "實驗組" : "對照組";
}

function firstMethod() {
  return state.groupType === "experimental" ? "互動模擬器" : "文字教學";
}

function secondMethod() {
  return state.groupType === "experimental" ? "文字教學" : "互動模擬器";
}

function studentBadgeText() {
  return state.studentCode ? state.studentCode[0].toUpperCase() : "?";
}

function pageStepIndex() {
  const page = state.currentPage;

  if (page === "flow") return 0;
  if (page === "pretestIntro" || page === "pretest") return 1;
  if (page === "stage1Intro" || page === "stage1Learning") return 2;
  if (page === "posttestIntro" || page === "posttest" || page === "analysis") return 3;
  if (page === "exchangeIntro" || page === "exchangeLearning") return 4;
  if (
    page === "survey" ||
    page === "complete" ||
    page === "reviewSimulator" ||
    page === "reviewText"
  ) return 5;

  return 0;
}

function go(page) {
  state.currentPage = page;

  if (page === "pretest" || page === "posttest") {
    state.quizIndex = 0;
    const answers = page === "pretest" ? state.pretestAnswers : state.posttestAnswers;
    state.selectedQuizOption = answers[0] ?? null;
  } else {
    state.selectedQuizOption = null;
  }

  render();
}

function getCurrentQuizAnswers(testType) {
  return testType === "pretest" ? state.pretestAnswers : state.posttestAnswers;
}

function getQuizScore(questions, answers) {
  return questions.reduce((score, question, index) => {
    return answers[index] === question.answerIndex ? score + 1 : score;
  }, 0);
}
