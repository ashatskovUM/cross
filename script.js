// Функция для перехода на нижний инпут при вводе буквы и обработка Backspace
document.querySelectorAll('.cell input').forEach(input => {
    input.addEventListener('input', (e) => {
        const value = e.target.value.toUpperCase();
        e.target.value = value; // Автоматически преобразуем букву в верхний регистр
        const currentInput = e.target;

        if (value.length > 0) {
            // Переход к инпуту ниже
            const currentRow = parseInt(currentInput.parentElement.style.gridRow);
            const currentColumn = parseInt(currentInput.parentElement.style.gridColumn);

            const nextCell = document.querySelector(
                `.cell[style*="grid-row: ${currentRow + 1};"][style*="grid-column: ${currentColumn};"]`
            );

            if (nextCell) {
                const nextInput = nextCell.querySelector('input');
                if (nextInput) {
                    nextInput.focus();
                }
            }
        }

        checkColumnCompletion(currentInput);
        checkAllWordsCompleted();
    });

    input.addEventListener('keydown', (e) => {
        // Логика для обработки Backspace
        if (e.key === 'Backspace' && e.target.value === '') {
            const currentInput = e.target;
            const currentRow = parseInt(currentInput.parentElement.style.gridRow);
            const currentColumn = parseInt(currentInput.parentElement.style.gridColumn);

            // Переход к инпуту выше
            const prevCell = document.querySelector(
                `.cell[style*="grid-row: ${currentRow - 1};"][style*="grid-column: ${currentColumn};"]`
            );

            if (prevCell) {
                const prevInput = prevCell.querySelector('input');
                if (prevInput && !prevInput.disabled) {
                    prevInput.focus();
                }
            }
        }
    });
});


// Функция проверки, правильно ли введено слово в колонке
function checkColumnCompletion(input) {
    const column = parseInt(input.parentElement.style.gridColumn);
    const inputsInColumn = Array.from(
        document.querySelectorAll(`.cell[style*="grid-column: ${column};"] input`)
    );

    // Проверяем, все ли буквы введены верно
    const allCorrect = inputsInColumn.every(cellInput => {
        return cellInput.value.toUpperCase() === cellInput.dataset.correct;
    });

    if (allCorrect) {
        // Блокируем все инпуты в колонке
        inputsInColumn.forEach(cellInput => {
            cellInput.disabled = true;
        });

        // Обновляем data-number на знак "+" зеленого цвета
        const numberCell = document.querySelector(
            `.cell[style*="grid-column: ${column};"] [data-number]`
        );
        if (numberCell) {
            numberCell.parentElement.style.color = "#289126"; // Зелёный цвет
            numberCell.parentElement.dataset.number = "+";
        }
    }
}

// Функция проверки, завершены ли все слова
function checkAllWordsCompleted() {
    const allInputs = Array.from(document.querySelectorAll('.cell input'));
    const allDisabled = allInputs.every(input => input.disabled);

    if (allDisabled) {
        // Показ пульсирующей картинки в левом верхнем углу
        const pulseImage = document.createElement('a');
        pulseImage.href = 'https://disk.yandex.ru/d/oAUxNU4iv9jjow'; // Ссылка, куда ведёт картинка
        pulseImage.target = '_blank';
        pulseImage.style.position = 'fixed';
        pulseImage.style.top = '20px';
        pulseImage.style.left = '20px';
        pulseImage.style.width = '120px';
        pulseImage.style.height = '103px';
        pulseImage.style.background = 'url("image/wf.png") no-repeat center center';
        pulseImage.style.backgroundSize = 'contain';
        pulseImage.style.animation = 'pulse 1.5s infinite';
        document.body.appendChild(pulseImage);

        // Окраска 8 строки с плавной задержкой
        const row8Cells = document.querySelectorAll('.cell[style*="grid-row: 8;"]');

        row8Cells.forEach((cell, index) => {
        setTimeout(() => {
        cell.style.transition = 'background-color 0.5s, color 0.5s'; // Плавный переход
        cell.style.backgroundColor = '#000'; // Чёрный фон

        const input = cell.querySelector('input');
        if (input) {
            input.style.transition = 'color 0.5s'; // Плавный переход для текста
            input.style.color = '#fff'; // Белый текст
        }
        }, index * 500); // Задержка в 0.5 секунды для каждой ячейки
    });
    }
}

// Анимация для пульсирующей картинки
const style = document.createElement('style');
style.innerHTML = `
@keyframes pulse {
    0% {
        transform: scale(1);
        opacity: 0.8;
    }
    50% {
        transform: scale(1.2);
        opacity: 1;
    }
    100% {
        transform: scale(1);
        opacity: 0.8;
    }
}`;
document.head.appendChild(style);


