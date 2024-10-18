const week = ["日", "月", "火", "水", "木", "金", "土"];
let today = new Date();
let showDate = new Date(today.getFullYear(), today.getMonth(), 1);
let todos = [];

window.onload = function () {
    
    loadTodos();
	
};

function formatDate(date) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return new Intl.DateTimeFormat('ja-JP', options).format(date);
}

function showCalendar(todos,date) {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const showDateStr = `${year}年 ${month}月`;
    document.querySelector('#year_month_label').innerHTML = showDateStr;
    const calendarTable = createCalendarTable(year, month);
    document.querySelector('#calendar_body').innerHTML = calendarTable;
//TODOリストを日付に基づいてtextareaに挿入
	insertTodosIntoTextareas(todos,year,month);
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
    fetch('/getTodos')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to load todos: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
			todos = data;
			console.log(todos);
			showCalendar(todos,showDate);
            })
        .catch(error => {
            console.error('Error:', error);
            alert('エラーが発生しました: ' + error.message);
        });
}

function insertTodosIntoTextareas(todos, year, month) {
    todos.forEach(todo => {
        const todoDate = new Date(todo.date);
        if (todoDate.getFullYear() === year && todoDate.getMonth() + 1 === month) {
            const day = todoDate.getDate();
            const textarea = document.getElementById(`todo_${day}`);
            if (textarea) {
                textarea.value = todo.todo; // TODOの内容をtextareaに挿入
            }
        }
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
        date: date.toISOString().split('T')[0],//YYYY-MM-DDの形
        title: todoText
    };

    fetch('/saveEvents', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })
    .then(response => {
		alert("save.response");
		console.log(data);
        if (!response.ok) {
            throw new Error('Failed to save todo: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        alert('TODOが保存されました！');
        console.log('Saved TODO:', data);
		loadTodos();//データを再読み込みそて更新
    })
    .catch(error => {
        console.error('Error:', error);
        alert('エラーが発生しました: ' + error.message);
    });
}

// 月と年の移動
function prev_year() {
    showDate.setFullYear(showDate.getFullYear() - 1);
    showCalendar(todos,showDate);
}

function prev_month() {
    showDate.setMonth(showDate.getMonth() - 1);
    showCalendar(todos,showDate);
}

function now_month() {
    showDate = new Date(today.getFullYear(), today.getMonth(), 1);
    showCalendar(todos,showDate);
}

function next_month() {
    showDate.setMonth(showDate.getMonth() + 1);
    showCalendar(todos,showDate);
}

function next_year() {
    showDate.setFullYear(showDate.getFullYear() + 1);
    showCalendar(todos,showDate);
}
