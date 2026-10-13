'use strict';
// HTML form: demonstrate browser validity checks without collecting personal data.
const form = document.querySelector('#contactForm');
form.addEventListener('submit', event => {
  event.preventDefault();
  const result = document.querySelector('#contactResult');
  if (!form.checkValidity()) {
    result.textContent = 'Please complete every field with a valid name and email address.';
    result.className = 'mt-3 mb-0 text-danger';
    form.reportValidity();
    return;
  }
  result.textContent = 'Form is valid! Demo only: no message was sent or saved.';
  result.className = 'mt-3 mb-0 text-success';
});
// CSS theme example: toggle a class and accessible pressed state.
const themeButton = document.querySelector('#themeButton');
themeButton.addEventListener('click', () => {
  const dark = document.querySelector('#themeDemo').classList.toggle('dark');
  themeButton.textContent = dark ? 'Switch to light theme' : 'Switch to dark theme';
  themeButton.setAttribute('aria-pressed', String(dark));
});
// JavaScript example: array, functions, DOM manipulation, events and score state.
const questions = [
  {question:'Which technology defines the structure of a webpage?', options:['CSS','HTML','SQL'], answer:1},
  {question:'Which CSS feature adapts layouts to screen sizes?', options:['Media queries','Console logs','HTTP headers'], answer:0},
  {question:'What does Bootstrap col-md-4 mean?', options:['Four rows on mobile','A four-column span from medium screens','Four pixels of padding'], answer:1},
  {question:'Which method registers a click handler?', options:['querySelectorAll()','JSON.stringify()','addEventListener()'], answer:2}
];
let index = 0;
let score = 0;
let answered = false;
const questionEl = document.querySelector('#quizQuestion');
const optionsEl = document.querySelector('#quizOptions');
const feedbackEl = document.querySelector('#quizFeedback');
const nextButton = document.querySelector('#quizNext');
const restartButton = document.querySelector('#quizRestart');
function renderQuestion() {
  answered = false;
  const item = questions[index];
  document.querySelector('#questionCount').textContent = `Question ${index + 1} of ${questions.length}`;
  document.querySelector('#quizProgress').style.width = `${(index + 1) / questions.length * 100}%`;
  questionEl.textContent = item.question;
  optionsEl.replaceChildren();
  feedbackEl.textContent = '';
  nextButton.disabled = true;
  nextButton.textContent = index === questions.length - 1 ? 'View results' : 'Next question';
  item.options.forEach((option, choice) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-outline-secondary quiz-option';
    button.textContent = option;
    button.addEventListener('click', () => selectAnswer(choice));
    optionsEl.append(button);
  });
}
function selectAnswer(choice) {
  if (answered) return;
  answered = true;
  const correct = questions[index].answer;
  if (choice === correct) score++;
  [...optionsEl.children].forEach((button, i) => {
    button.disabled = true;
    if (i === correct) button.classList.add('correct');
    else if (i === choice) button.classList.add('incorrect');
  });
  feedbackEl.textContent = choice === correct ? 'Correct! Well done.' : `Not quite. Correct answer: ${questions[index].options[correct]}.`;
  nextButton.disabled = false;
}
nextButton.addEventListener('click', () => {
  if (!answered) return;
  index++;
  if (index < questions.length) return renderQuestion();
  questionEl.textContent = `You scored ${score} out of ${questions.length}!`;
  document.querySelector('#questionCount').textContent = 'Completed';
  optionsEl.replaceChildren();
  feedbackEl.textContent = 'Restart to practice the concepts again.';
  nextButton.classList.add('d-none');
  restartButton.classList.remove('d-none');
});
restartButton.addEventListener('click', () => {
  index = 0; score = 0;
  nextButton.classList.remove('d-none');
  restartButton.classList.add('d-none');
  renderQuestion();
});
document.querySelector('#year').textContent = new Date().getFullYear();
renderQuestion();
