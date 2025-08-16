
        let tasks = [];
        let taskId = 0;

        function addTask() {
            const input = document.getElementById('taskInput');
            const text = input.value.trim();
            
            if (text === '') return;

            const task = {
                id: taskId++,
                text: text,
                completed: false,
                timestamp: Date.now()
            };

            tasks.unshift(task);
            input.value = '';
            
            // Add shake animation to input
            input.style.animation = 'none';
            setTimeout(() => {
                input.style.animation = 'checkBounce 0.3s ease';
            }, 10);
            
            renderTasks();
            updateStats();
        }

        function toggleTask(id) {
            const task = tasks.find(t => t.id === id);
            if (task) {
                task.completed = !task.completed;
                renderTasks();
                updateStats();
            }
        }

        function deleteTask(id) {
            const taskElement = document.querySelector(`[data-id="${id}"]`);
            taskElement.classList.add('removing');
            
            setTimeout(() => {
                tasks = tasks.filter(t => t.id !== id);
                renderTasks();
                updateStats();
            }, 500);
        }

        function clearCompleted() {
            const completedElements = document.querySelectorAll('.todo-item.completed');
            completedElements.forEach(el => el.classList.add('removing'));
            
            setTimeout(() => {
                tasks = tasks.filter(t => !t.completed);
                renderTasks();
                updateStats();
            }, 500);
        }

        function renderTasks() {
            const todoList = document.getElementById('todoList');
            
            if (tasks.length === 0) {
                todoList.innerHTML = '<div class="empty-state">🎯 No tasks yet. Add one above!</div>';
                return;
            }

            todoList.innerHTML = tasks.map(task => `
                <div class="todo-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                    <div class="checkbox ${task.completed ? 'checked' : ''}" onclick="toggleTask(${task.id})"></div>
                    <div class="todo-text">${escapeHtml(task.text)}</div>
                    <button class="delete-btn" onclick="deleteTask(${task.id})">×</button>
                </div>
            `).join('');
        }

        function updateStats() {
            const total = tasks.length;
            const completed = tasks.filter(t => t.completed).length;
            const active = total - completed;
            
            document.getElementById('totalTasks').textContent = total;
            document.getElementById('activeTasks').textContent = active;
            document.getElementById('completedTasks').textContent = completed;
            
            const clearBtn = document.getElementById('clearBtn');
            clearBtn.style.display = completed > 0 ? 'block' : 'none';
        }

        function escapeHtml(text) {
            const div = document.createElement('div');
            div.textContent = text;
            return div.innerHTML;
        }
        
        

        // Event listeners
        document.getElementById('taskInput').addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTask();
            }
        });

        // Add some sample tasks for demonstration
        setTimeout(() => {
            const sampleTasks = [
                'Welcome to your awesome todo list! 🎉',
                'Click the checkbox to mark tasks as completed',
                'Hover over tasks to see the delete button'
            ];
            
            sampleTasks.forEach(text => {
                tasks.push({
                    id: taskId++,
                    text: text,
                    completed: false,
                    timestamp: Date.now()
                });
            });
            
            renderTasks();
            updateStats();
        }, 1000);

        // Initial render
        renderTasks();
        updateStats();
