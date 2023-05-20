// 获取菜单按钮和卡片元素
var menuButtons = document.querySelectorAll('.menu-button');
var cards = document.querySelectorAll('.card');

// 菜单按钮点击事件处理程序
menuButtons.forEach(function(button) {
  button.addEventListener('click', function() {
    var filter = button.dataset.filter;
    filterCards(filter); // 调用过滤卡片函数
  });
});

// 过滤卡片函数
function filterCards(filter) {
  cards.forEach(function(card) {
    var tags = card.dataset.tags.split(' ');
    if (filter === 'all' || tags.includes(filter)) {
      card.style.display = 'block'; // 显示卡片
    } else {
      card.style.display = 'none'; // 隐藏卡片
    }
  });
}
