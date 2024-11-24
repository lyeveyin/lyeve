document.addEventListener('DOMContentLoaded', () => {
    const folders = [
        { 
            name: "专辑", 
            left: '30%', 
            top: '30%', 
            content: [
                { title: "专辑1", image: "img/file/mini12.jpg", description: "专辑1的说明", tags: ["vernon"] },
                { title: "专辑2", image: "img/file/mini12.jpg", description: "专辑2的说明", tags: ["tag1"] },
                { title: "专辑3", image: "img/file/mini12.jpg", description: "专辑3的说明", tags: ["tag3"] },
                { title: "专辑4", image: "img/file/mini12.jpg", description: "专辑4的说明", tags: ["tag2"] },
                { title: "专辑5", image: "img/file/mini12.jpg", description: "专辑5的说明", tags: ["vernon"] }
            ]
        },
        { 
            name: "线下应援", 
            left: '40%', 
            top: '30%', 
            content: [] 
        },
        { 
            name: "演唱会", 
            left: '50%', 
            top: '30%', 
            content: [
                { title: "240121澳门演唱会", image: "img/file/mini12.jpg", description: "240121澳门演唱会的说明", tags: ["macau", "2021"] },
                { title: "240525澳门演唱会", image: "img/file/mini12.jpg", description: "240525澳门演唱会的说明", tags: ["macau", "2025"] }
            ]
        },
        { 
            name: "其它", 
            left: '60%', 
            top: '30%', 
            content: [] 
        },
        { 
            name: "全部", 
            left: '70%', 
            top: '30%', 
            content: [] 
        }
    ];

    const container = document.querySelector('.container');
    const modal = document.getElementById('modal');
    const closeButton = document.querySelector('.close-button');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const tagButtonsContainer = document.getElementById('tag-buttons');

    // 渲染文件夹
    folders.forEach(folder => {
        const folderDiv = document.createElement('div');
        folderDiv.className = 'folder';
        folderDiv.style.left = folder.left;
        folderDiv.style.top = folder.top;

        folderDiv.innerHTML = `
            <div class="folder-icon"></div>
            <div class="folder-name">${folder.name}</div>
        `;

        container.appendChild(folderDiv);

        // 让文件夹可拖动
        let isDragging = false;
        let offset = { x: 0, y: 0 };

        folderDiv.addEventListener('mousedown', function(e) {
            isDragging = true;
            offset.x = e.clientX - folderDiv.getBoundingClientRect().left;
            offset.y = e.clientY - folderDiv.getBoundingClientRect().top;
            folderDiv.classList.add('dragging');
            folderDiv.style.cursor = 'grabbing';
            e.stopPropagation();
        });

        document.addEventListener('mouseup', function() {
            if (isDragging) {
                folderDiv.classList.remove('dragging');
                folderDiv.style.cursor = 'grab';
            }
            isDragging = false;
        });

        document.addEventListener('mousemove', function(e) {
            if (isDragging) {
                requestAnimationFrame(() => {
                    const newX = e.clientX - offset.x;
                    const newY = e.clientY - offset.y;
                    folderDiv.style.left = `${newX}px`;
                    folderDiv.style.top = `${newY}px`;
                });
            }
        });

        // 双击事件
        folderDiv.addEventListener('dblclick', function() {
            showModal(folder);
        });
    });

    // 显示模态框的函数和其他功能保持不变
    function showModal(folder) {
        modalTitle.textContent = folder.name === "全部" ? "所有内容" : "内容信息";
        modalBody.innerHTML = ''; // 清空现有内容

        // 自动整合其他文件夹的内容
        let content = folder.name === "全部" 
            ? folders.slice(0, 4).flatMap(f => f.content.map(item => ({
                ...item,
                tags: [...item.tags, f.name] // 在这里保留原标签并添加文件夹名称
            }))) // 除“全部”外的所有内容
            : folder.content;

        content.forEach(item => {
            const tags = [...item.tags]; // 保留每个项目的原有标签
            const itemDiv = document.createElement('div');
            itemDiv.className = 'album-item';
            itemDiv.innerHTML = `
                <h3>${item.title}</h3>
                <img src="${item.image}" alt="${item.title}">
                <p>${item.description}</p>
                <p>标签: ${tags.join('; ')}</p>
            `;
            itemDiv.dataset.tags = tags.join(' '); // 用于筛选
            modalBody.appendChild(itemDiv);
        });

        // 添加标签按钮
        addTagButtons(content);

        modal.style.display = 'block'; // 显示模态框
    }

    // 添加标签按钮
    function addTagButtons(content) {
        const tags = new Set();
        content.forEach(item => {
            item.tags.forEach(tag => tags.add(tag)); // 获取唯一标签
        });

        tagButtonsContainer.innerHTML = ''; // 清空现有按钮
        tags.forEach(tag => {
            const button = document.createElement('button');
            button.textContent = tag;
            button.className = 'tag-button';
            button.addEventListener('click', () => filterItems(tag));
            tagButtonsContainer.appendChild(button);
        });

        // 清除筛选按钮
        const clearButton = document.createElement('button');
        clearButton.textContent = '清除筛选';
        clearButton.className = 'clear-button';
        clearButton.addEventListener('click', clearFilters);
        tagButtonsContainer.appendChild(clearButton);
    }

    // 筛选功能
    function filterItems(tag) {
        const items = modalBody.querySelectorAll('.album-item');
        items.forEach(item => {
            const tags = item.dataset.tags.toLowerCase();
            if (tags.includes(tag.toLowerCase())) {
                item.style.display = '';
            } else {
                item.style.display = 'none';
            }
        });
    }

    // 清除筛选功能
    function clearFilters() {
        const items = modalBody.querySelectorAll('.album-item');
        items.forEach(item => {
            item.style.display = ''; // 显示所有项目
        });
    }

    // 关闭模态框
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // 点击模态框外部关闭
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
});
