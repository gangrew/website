document.addEventListener('DOMContentLoaded', function () {
    const addProjectButton = document.getElementById('addProjectButton');
    const projectNameTextBox = document.getElementById('projectNameTextBox');
    const projectsList = document.getElementById('projectsList');
    const projectModal = document.getElementById('projectModal');
    const closeProjectModal = document.getElementById('closeProjectModal');
    const editProjectName = document.getElementById('editProjectName');
    const editProjectDescription = document.getElementById('editProjectDescription');
    const saveChangesButton = document.getElementById('saveChangesButton');
    const backToProjectsButton = document.getElementById('backToProjectsButton');
    const kanbanWindow = document.getElementById('kanbanWindow');

    let currentProject = null;

    addProjectButton.addEventListener('click', function () {
        const projectName = projectNameTextBox.value.trim();
        if (projectName) {
            const projectItem = document.createElement('div');
            projectItem.className = 'project-item';
            projectItem.innerHTML = `
                <span class="project-title">${projectName}</span>
                <span class="project-actions">
                    <button class="button edit-project">Редактировать</button>
                    <span class="delete-project">&times;</span>
                </span>
            `;
            

            projectItem.querySelector('.edit-project').addEventListener('click', function () {
                currentProject = projectItem;
                editProjectName.value = projectItem.querySelector('.project-title').textContent; // Обновляем значение поля ввода
                projectModal.style.display = 'block';
            });
            

            projectItem.querySelector('.project-title').addEventListener('click', function () {
                projectNameTextBox.value = projectName;
                document.querySelector('#mainWindow').style.display = 'none';
                kanbanWindow.style.display = 'block';
            });

            projectItem.querySelector('.delete-project').addEventListener('click', function () {
                const confirmation = confirm("Вы уверены, что хотите удалить проект?");
                if (confirmation) {
                    projectsList.removeChild(projectItem);
                }
            });
            
            projectItem.querySelector('.edit-project').insertAdjacentHTML('beforebegin', '<button class="button open-project">Открыть</button>');

            projectItem.querySelector('.open-project').addEventListener('click', function () {
                projectNameTextBox.value = projectName;
                document.querySelector('#mainWindow').style.display = 'none';
                kanbanWindow.style.display = 'block';
            });
            


            projectsList.appendChild(projectItem);
            projectNameTextBox.value = '';
        }
    });

    closeProjectModal.addEventListener('click', function () {
        projectModal.style.display = 'none';
    });

    saveChangesButton.addEventListener('click', function () {
        if (currentProject) {
            const projectTitle = currentProject.querySelector('.project-title');
            projectTitle.textContent = editProjectName.value;
            currentProject = null;
            projectModal.style.display = 'none';
        }
    });

    backToProjectsButton.addEventListener('click', function () {
        kanbanWindow.style.display = 'none';
        document.querySelector('#mainWindow').style.display = 'block';
    });

    window.onclick = function (event) {
        if (event.target === projectModal) {
            projectModal.style.display = 'none';
        }
    };
});