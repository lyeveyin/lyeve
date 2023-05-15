    // 获取拖动按钮元素和分栏元素
    const draggableButton = document.querySelector('.draggable-button');
    const sidebar = document.querySelector('.sidebar');

    // 鼠标按下时记录初始位置
    let startX, startY;
    draggableButton.addEventListener('mousedown', (e) => {
      startX = e.clientX - draggableButton.offsetLeft;
      startY = e.clientY - draggableButton.offsetTop;
    });

    // 拖动按钮
    document.addEventListener('mousemove', (e) => {
      e.preventDefault();
      if (startX && startY) {
        draggableButton.style.left = `${e.clientX - startX}px`;
        draggableButton.style.top = `${e.clientY - startY}px`;
      }
    });

    // 释放鼠标时停止拖动
    document.addEventListener('mouseup', () => {
      startX = null;
      startY = null;
    });

    // 点击按钮时切换分栏的显示状态
    draggableButton.addEventListener('click', () => {
      sidebar.classList.toggle('show');
    });