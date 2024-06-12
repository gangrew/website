document.addEventListener('DOMContentLoaded', function () {
    const addLaneBtn = document.getElementById('add-lane-btn');
    const lanesContainer = document.getElementById('lanes');
    const laneModal = document.getElementById('lane-modal');
    const closeLaneModal = document.getElementById('close-lane-modal');
    const laneForm = document.getElementById('lane-form');
    const laneTitleInput = document.getElementById('lane-title');
    const laneIdInput = document.getElementById('lane-id');
    const deleteLaneBtn = document.getElementById('delete-lane-btn');
    let currentLane = null;

    addLaneBtn.addEventListener('click', function () {
        currentLane = null;
        laneIdInput.value = '';
        laneTitleInput.value = '';
        laneModal.style.display = 'block';
    });

    closeLaneModal.addEventListener('click', function () {
        laneModal.style.display = 'none';
    });

    laneForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const laneTitle = laneTitleInput.value.trim();
        if (laneTitle) {
            if (currentLane) {
                const laneHeading = currentLane.querySelector('.heading');
                laneHeading.textContent = laneTitle;
            } else {
                const lane = document.createElement('div');
                lane.className = 'swim-lane';
                lane.innerHTML = `
                    <div class="heading">${laneTitle}</div>
                    <button class="add-task-btn">Add Task +</button>
                    <div class="cards"></div>
                `;

                lane.querySelector('.heading').addEventListener('click', function () {
                    currentLane = lane;
                    laneIdInput.value = lane.dataset.id;
                    laneTitleInput.value = laneTitle;
                    laneModal.style.display = 'block';
                });

                lane.querySelector('.add-task-btn').addEventListener('click', function () {
                    openTaskModal(lane);
                });

                lanesContainer.appendChild(lane);
            }
            laneModal.style.display = 'none';
        }
    });

    deleteLaneBtn.addEventListener('click', function () {
        if (currentLane) {
            lanesContainer.removeChild(currentLane);
            currentLane = null;
            laneModal.style.display = 'none';
        }
    });

    window.onclick = function (event) {
        if (event.target === laneModal) {
            laneModal.style.display = 'none';
        }
    };

    const taskModal = document.getElementById('task-modal');
    const closeTaskModal = document.getElementById('close-task-modal');
    const taskForm = document.getElementById('task-form');
    const taskIdInput = document.getElementById('task-id');
    const taskTitleInput = document.getElementById('task-title');
    const taskDescInput = document.getElementById('task-desc');
    const taskLaneSelect = document.getElementById('task-lane');
    const deleteTaskBtn = document.getElementById('delete-task-btn');
    let currentTask = null;

    function openTaskModal(lane, task = null) {
        currentTask = task;
        taskIdInput.value = task ? task.dataset.id : '';
        taskTitleInput.value = task ? task.querySelector('h3').textContent : '';
        taskDescInput.value = task ? task.querySelector('p').textContent : '';
        taskLaneSelect.innerHTML = '';
        const lanes = document.querySelectorAll('.swim-lane');
        lanes.forEach(l => {
            const option = document.createElement('option');
            option.value = l.querySelector('.heading').textContent;
            option.textContent = l.querySelector('.heading').textContent;
            taskLaneSelect.appendChild(option);
        });
        taskLaneSelect.value = lane.querySelector('.heading').textContent;
        taskModal.style.display = 'block';
    }

    closeTaskModal.addEventListener('click', function () {
        taskModal.style.display = 'none';
    });

    taskForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const taskTitle = taskTitleInput.value.trim();
        const taskDesc = taskDescInput.value.trim();
        const taskLane = taskLaneSelect.value;
        if (taskTitle) {
            if (currentTask) {
                currentTask.querySelector('h3').textContent = taskTitle;
                currentTask.querySelector('p').textContent = taskDesc;
            } else {
                const taskCard = document.createElement('div');
                taskCard.className = 'card';
                taskCard.style.position = 'relative';  // Ensure the card is the positioning context for the button
                taskCard.innerHTML = `
                    <h3>${taskTitle}</h3>
                    <p>${taskDesc}</p>
                    <button class="edit-task-btn">Edit</button>
                `;

                taskCard.querySelector('.edit-task-btn').addEventListener('click', function () {
                    openTaskModal(taskCard.closest('.swim-lane'), taskCard);
                });

                const targetLane = Array.from(document.querySelectorAll('.swim-lane')).find(l => l.querySelector('.heading').textContent === taskLane);
                targetLane.querySelector('.cards').appendChild(taskCard);
            }
            taskModal.style.display = 'none';
        }
    });

    deleteTaskBtn.addEventListener('click', function () {
        if (currentTask) {
            currentTask.parentNode.removeChild(currentTask);
            currentTask = null;
            taskModal.style.display = 'none';
        }
    });

    window.onclick = function (event) {
        if (event.target === taskModal) {
            taskModal.style.display = 'none';
        }
    };
});