// --- Константы ---
const MONTHS_DATA = [
    { name: 'Январь', season: 'winter' },
    { name: 'Февраль', season: 'winter' },
    { name: 'Март', season: 'spring' },
    { name: 'Апрель', season: 'spring' },
    { name: 'Май', season: 'spring' },
    { name: 'Июнь', season: 'summer' },
    { name: 'Июль', season: 'summer' },
    { name: 'Август', season: 'summer' },
    { name: 'Сентябрь', season: 'autumn' },
    { name: 'Октябрь', season: 'autumn' },
    { name: 'Ноябрь', season: 'autumn' },
    { name: 'Декабрь', season: 'winter' },
];

const SEASONS = ['winter', 'spring', 'summer', 'autumn'];

const monthsContainer = document.getElementById('months-container');
const seasonMatcherForm = document.getElementById('season-matcher-form');

/**
 * Генерирует случайное целое число в диапазоне от min до max (включительно).
 * @param {number} min Минимальное значение.
 * @param {number} max Максимальное значение.
 * @returns {number} Случайное целое число.
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Перемешивает массив на месте.
 * @param {Array<any>} array Массив, содержащий элементы.
 */
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

/**
 * Генерирует строки задач в таблице.
 */
function generateTask() {
    const numberOfRows = getRandomInt(3, 5);
    const shuffledMonths = [...MONTHS_DATA];
    shuffleArray(shuffledMonths);
    const selectedMonths = shuffledMonths.slice(0, numberOfRows);

    selectedMonths.forEach((monthData, rowIndex) => {
        const row = document.createElement('tr');
        row.dataset.correctSeason = monthData.season;

        const monthCell = document.createElement('td');
        monthCell.className = 'month-cell';
        monthCell.textContent = monthData.name;
        row.appendChild(monthCell);

        SEASONS.forEach(season => {
            const optionCell = document.createElement('td');
            optionCell.className = 'option-cell';

            const radioInput = document.createElement('input');
            radioInput.type = 'radio';
            radioInput.name = `month-choice-${rowIndex}`;
            radioInput.value = season;
            radioInput.tabindex = rowIndex;
            radioInput.required = true;

            optionCell.appendChild(radioInput);
            row.appendChild(optionCell);
        });

        monthsContainer.appendChild(row);
    });
}

/**
 * Проверяет ответы пользователя и записывает результат в консоль.
 * @param {Event} event Событие отправки формы.
 */
function checkAnswers(event) {
    event.preventDefault();

    const taskRows = monthsContainer.querySelectorAll('tr');
    let correctAnswersCount = 0;
    const totalQuestions = taskRows.length;

    taskRows.forEach(row => {
        const correctSeason = row.dataset.correctSeason;
        const selectedRadio = row.querySelector('input[type="radio"]:checked');

        if (selectedRadio && selectedRadio.value === correctSeason) {
            correctAnswersCount++;
        }
    });

    console.log(`${correctAnswersCount} из ${totalQuestions}`);
}

// --- Слушатели событий ---
document.addEventListener('DOMContentLoaded', generateTask);
seasonMatcherForm.addEventListener('submit', checkAnswers);
