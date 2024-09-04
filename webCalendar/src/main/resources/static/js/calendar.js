const week = ["日", "月", "火", "水", "木", "金", "土"];
let today = new Date();
let showDate = new Date(today.getFullYear(), today.getMonth(), 1);

window.onload = function () {
    showCalendar(showDate);
    loadTodos();
};

// 日付をフォーマットする関数
function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('ja-JP', options).format(date);
}

function showCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const showDateStr = `${year}年 ${month}月`;
    document.querySelector('#year_month_label').innerHTML = showDateStr;
    const calendarTable = createCalendarTable(year, month);
    document.querySelector('#calendar_body').innerHTML = calendarTable;
}

function createCalendarTable(year, month) {
    let _html = '<table class="table table-bordered">';
    _html += '<tr>';
    week.forEach(day => {
        _html += `<th>${day}</th>`;
    });
    _html += '</tr>';

    const startDayOfWeek = new Date(year, month - 1, 1).getDay();
    let countDay = 0;
    const monthOfEndDay = new Date(year, month, 0).getDate();

    for (let i = 0; i < 6; i++) {
        _html += '<tr>';
        for (let j = 0; j < week.length; j++) {
            if (i === 0 && j === startDayOfWeek) {
                countDay++;
                _html += createTodoCell(countDay);
            } else if (countDay !== 0 && countDay < monthOfEndDay) {
                countDay++;
                _html += createTodoCell(countDay);
            } else {
                _html += '<td></td>';
            }
        }
        _html += '</tr>';
    }
    _html += '</table>';
    return _html;
}

function createTodoCell(day) {
    const date = new Date(showDate.getFullYear(), showDate.getMonth(), day);
    const formattedDate = formatDate(date);
    return `<td class="with_date" id="date_${day}">
                ${formattedDate}
                <textarea id="todo_${day}" class="form-control"></textarea>
                <button class="btn btn-primary" onClick="saveTodo(${day})">保存</button>
            </td>`;
}

function loadTodos() {
    fetch('/HomeController/getTodos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load todos: ' + response.statusText);
            }
            return response.json();
        })
        .then(todos => {
            todos.forEach(todo => {
                const date = new Date(todo.date);
                const day = date.getDate();
                document.getElementById(`todo_${day}`).value = todo.todo;
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('エラーが発生しました: ' + error.message);
        });
}

function saveTodo(day) {
    const todoText = document.getElementById(`todo_${day}`).value;

    if (!todoText.trim()) {
        alert('記入されていません');
        return;
    }

    const date = new Date(showDate.getFullYear(), showDate.getMonth(), day);
    const event = {
        date: date.toISOString().split('T')[0],
        todo: todoText
    };

    fetch('/HomeController/saveEvents', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to save todo: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert('TODOが保存されました！');
        console.log('Saved TODO:', data);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('エラーが発生しました: ' + error.message);
    });
}

function prev_year() {
    showDate.setFullYear(showDate.getFullYear() - 1);
    showCalendar(showDate);
}

function prev_month() {
    showDate.setMonth(showDate.getMonth() - 1);
    showCalendar(showDate);
}

function now_month() {
    showDate = new Date(today.getFullYear(), today.getMonth(), 1);
    showCalendar(showDate);
}

function next_month() {
    showDate.setMonth(showDate.getMonth() + 1);
    showCalendar(showDate);
}

function next_year() {
    showDate.setFullYear(showDate.getFullYear() + 1);
    showCalendar(showDate);
}
