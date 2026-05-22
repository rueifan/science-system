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
