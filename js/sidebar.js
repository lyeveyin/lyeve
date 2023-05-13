    // 获取按钮和分栏元素
    const toggleButton = document.getElementById('toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');

    // 给按钮添加点击事件监听器
    toggleButton.addEventListener('click', () => {
      // 切换 show-sidebar 类的存在来控制分栏的显示和隐藏
      sidebar.classList.toggle('show-sidebar');
    }