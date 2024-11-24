// 切换地图模糊状态
function toggleMapBlur(shouldBlur) {
    var blurOverlay = document.getElementById('blur-overlay');
    blurOverlay.style.display = shouldBlur ? 'block' : 'none'; // 控制遮罩层的显示和隐藏
    
    if (shouldBlur) {
        mapboxLayer.getContainer().style.transition = 'filter 0.3s';  // 添加过渡效果
        mapboxLayer.getContainer().style.filter = "blur(5px)"; // 应用模糊效果
    } else {
        mapboxLayer.getContainer().style.filter = "none"; // 清除模糊效果
    }
}

// 点击遮罩层或弹窗外部时，隐藏遮罩层并恢复地图清晰
document.getElementById('blur-overlay').addEventListener('click', function() {
    toggleMapBlur(false); // 关闭模糊效果
    map.closePopup(); // 关闭地图上的弹窗
});

// 初始化地图
var map = L.map('map').setView([22, 126.9780], 2);

// 添加 Mapbox 图层
var mapboxLayer = L.tileLayer('https://api.mapbox.com/styles/v1/lyeve/cm31xfnzi003t01o25nxpbgm2/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibHlldmUiLCJhIjoiY2p6cWt5cXJoMGkxZzNscXNqZTBwZXh3NCJ9.2LMDkpNS-7_syUT8rSeQFw', {
    maxZoom: 17,
    minZoom: 3,
    tileSize: 512,
    zoomOffset: -1,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
}).addTo(map);

// 定义地点信息
var locations = [    
    { lat: 37.5021, lng: 127.0250, title: "itp", description: "打卡itp公司", photos: ["img/svtmap/itp.jpg"], label: "SVT", color: "blue" },
    { lat: 37.5247, lng: 126.9640, title: "HYBE", description: "HYBE", photos: ["img/svtmap/HYBE.jpg"], label: "SVT", color: "blue" },
    { lat: 22.15395, lng: 113.5587, title: "澳门嘉模斜巷", description: "小八跳舞", photos: ["img/svtmap/澳门嘉模斜巷.jpg"], label: "徐明浩", color: "green" },
    { lat: 37.5459, lng: 127.0401, title: "小八首尔林长椅", description: "小八首尔林椅子", photos: ["img/svtmap/小八首尔林长椅.jpg"], label: "徐明浩", color: "green" },
    { lat: 22.5295, lng: 114.0240, title: "圣地 1", description: "这是圣地 1 的描述", photos: ["img/svtmap/photo1.jpg"], label: "徐明浩", color: "green" },
    { lat: 22.5295, lng: 114.0240, title: "DK同款香水", description: "DK同款香水——granhand", photos: ["img/svtmap/DK同款香水.jpg"], label: "李硕珉", color: "black" },
    { lat: 37.5242, lng: 126.9643, title: "宇宙工厂", description: "宇宙工厂", photos: ["img/svtmap/宇宙工厂.jpg"], label: "李知勋", color: "white" },
    { lat: 22.1479, lng: 113.5641, title: "顺荣大马路", description: "顺荣大马路", photos: ["img/svtmap/顺荣大马路.jpg"], label: "权顺荣", color: "yellow" },
    { lat: 37.5470, lng: 127.0410, title: "胜宽布丁", description: "胜宽布丁", photos: ["img/svtmap/胜宽布丁.jpg"], label: "夫胜宽", color: "brown" },
    { lat: 37.5126, lng: 127.0588, title: "胜宽图书馆", description: "胜宽图书馆", photos: ["img/svtmap/胜宽图书馆.jpg"], label: "夫胜宽", color: "brown" },
    { lat: 37.5416, lng: 127.0484, title: "崔胜澈圣水洞同款面板", description: "崔胜澈圣水洞同款面板", photos: ["img/svtmap/崔胜澈圣水洞同款面板.JPG"], label: "崔胜澈", color: "red" },

 
];

// 存储所有的标记
var markers = [];

// 添加地点标记
locations.forEach(function(location) {
    var marker = L.circleMarker([location.lat, location.lng], { color: location.color, radius: 8 }).addTo(map);
    
    var popupContent = `
    <div class="info-card">
        <div class="popup-photo-container">
            ${location.photos.map(photo => `<img src="${photo}" alt="照片" class="popup-photo" />`).join('')}
        </div>
        <h3>${location.title}</h3>
        <p>${location.description}</p>
        <button class="navigate-btn" onclick="useNavigation(${location.lat}, ${location.lng})">导航</button>
    </div>`;

    
    // 绑定点击事件，显示弹窗并模糊地图
    marker.on('click', function(event) {
        map.closePopup(); // 关闭任何打开的弹窗
        showPopup(marker, popupContent);
        toggleMapBlur(true); // 点击时模糊地图
        event.preventDefault(); // 阻止事件冒泡，防止触发地图的点击事件
    });

    markers.push({ marker: marker, label: location.label });
});

// 显示弹窗并在地图上显示
function showPopup(marker, content) {
    var popup = L.popup({ closeButton: false, autoClose: false, className: 'custom-popup' })
        .setLatLng(marker.getLatLng())
        .setContent(content)
        .openOn(map);
    
    // 为弹窗添加点击事件，关闭弹窗并恢复地图清晰
    popup.getElement().addEventListener('click', function() {
        map.closePopup(); // 关闭弹窗
        toggleMapBlur(false); // 恢复地图清晰
    });
} 

// 监听地图点击事件，关闭弹窗并恢复地图清晰（如果点击区域不是标记）
map.on('click', function() {
    map.closePopup(); // 关闭弹窗
    toggleMapBlur(false); // 恢复地图清晰
});

// 导航功能
function useNavigation(lat, lng) {
    var googleMapsUrl = `https://www.google.com/maps?q=${lat},${lng}`;
    window.open(googleMapsUrl, '_blank'); // 在新标签页打开谷歌地图
}

// 筛选功能：显示/隐藏筛选面板
document.getElementById('filter-circle').addEventListener('click', function() {
    const filterPanel = document.getElementById('filter-panel');
    const isVisible = filterPanel.style.display === 'block';
    filterPanel.style.display = isVisible ? 'none' : 'block';
    this.style.display = isVisible ? 'block' : 'none'; // 圆形按钮显示/隐藏
});

// 清空筛选按钮功能
document.getElementById('clear-filters').addEventListener('click', function() {
    var checkboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
    checkboxes.forEach(function(checkbox) {
        checkbox.checked = false; // 清空所有复选框
    });
    markers.forEach(function(item) {
        map.addLayer(item.marker); // 显示所有标记
    });
});

// 复选框筛选功能
document.querySelectorAll('.filter-options input[type="checkbox"]').forEach(function(checkbox) {
    checkbox.addEventListener('change', function() {
        var selectedTags = Array.from(document.querySelectorAll('.filter-options input[type="checkbox"]:checked'))
            .map(checkbox => checkbox.value);
        markers.forEach(function(item) {
            if (selectedTags.length === 0 || selectedTags.includes(item.label)) {
                map.addLayer(item.marker); // 显示符合条件的标记
            } else {
                map.removeLayer(item.marker); // 隐藏不符合条件的标记
            }
        });
    });
});

// 关闭筛选面板功能
document.getElementById('close-filter-panel').addEventListener('click', function() {
    const filterPanel = document.getElementById('filter-panel');
    filterPanel.style.display = 'none';
    document.getElementById('filter-circle').style.display = 'block'; // 显示圆形按钮
});

// 拖动筛选面板
dragElement(document.getElementById("filter-panel"));

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.onmousedown = function(e) {
        e.preventDefault();
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        document.onmousemove = elementDrag;
    };

    function elementDrag(e) {
        e.preventDefault();
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        document.onmouseup = null;
        document.onmousemove = null;
    }
}



// 左下角圆形按钮（整合所有地点信息的面板）
// 点击左下角按钮，显示/隐藏地点信息面板
document.getElementById('info-circle').addEventListener('click', function() {
    const infoPanel = document.getElementById('info-panel');
    const isVisible = infoPanel.style.display === 'block';
    infoPanel.style.display = isVisible ? 'none' : 'block';
    this.style.display = isVisible ? 'block' : 'none'; // 圆形按钮显示/隐藏
});






   
    
   
function generateInfoPanel() {
    const infoPanel = document.getElementById('info-panel');
    // 在面板顶部添加关闭按钮
    infoPanel.innerHTML = `
        <div class="info-panel-header">
            <span class="close-btn" onclick="closeInfoPanel()">×</span>
        </div>

        <div class="filter-options">           
                <label><input type="checkbox" class="filter-checkbox" value="SVT"> SVT</label>
                <label><input type="checkbox" class="filter-checkbox" value="崔胜澈"> 崔胜澈</label>
                <label><input type="checkbox" class="filter-checkbox" value="尹净汉"> 尹净汉</label>
                <label><input type="checkbox" class="filter-checkbox" value="洪知秀"> 洪知秀</label>
                <label><input type="checkbox" class="filter-checkbox" value="文俊辉"> 文俊辉</label>
                <label><input type="checkbox" class="filter-checkbox" value="权顺荣"> 权顺荣</label>
                <label><input type="checkbox" class="filter-checkbox" value="全圆佑"> 全圆佑</label>
                <label><input type="checkbox" class="filter-checkbox" value="李知勋"> 李知勋</label>
                <label><input type="checkbox" class="filter-checkbox" value="徐明浩"> 徐明浩</label>
                <label><input type="checkbox" class="filter-checkbox" value="金珉奎"> 金珉奎</label>
                <label><input type="checkbox" class="filter-checkbox" value="李硕珉"> 李硕珉</label>
                <label><input type="checkbox" class="filter-checkbox" value="夫胜宽"> 夫胜宽</label>
                <label><input type="checkbox" class="filter-checkbox" value="崔瀚率"> 崔瀚率</label>
                <label><input type="checkbox" class="filter-checkbox" value="李灿"> 李灿</label>
            </div>  </div>
    `;

    // 生成地点信息卡片
    const infoCards = locations.map(function(location) {
        return `
            <div class="info-card" id="info-card-left" data-label="${location.label}">
                <div class="popup-photo-container">
                    ${location.photos.map(photo => `<img src="${photo}" alt="照片" class="popup-photo" />`).join('')}
                </div>
                <p class="info-title">${location.title}</p>
                <button class="navigate-btn" onclick="zoomToLocation(${location.lat}, ${location.lng})">查看地图</button>
            </div>
        `;
    }).join('');

    // 把筛选面板和卡片内容加入到信息面板中
    infoPanel.innerHTML += `<div class="info-card-container">${infoCards}</div>`;

    // 为筛选框添加事件
    document.querySelectorAll('.filter-checkbox').forEach(function(checkbox) {
        checkbox.addEventListener('change', filterInfoCards);
    });

    // 清空筛选按钮功能
    document.getElementById('clear-filters').addEventListener('click', function() {
        // 清空所有复选框
        var checkboxes = document.querySelectorAll('.filter-options input[type="checkbox"]');
        checkboxes.forEach(function(checkbox) {
            checkbox.checked = false;
        });
        // 恢复所有标记和卡片
        markers.forEach(function(item) {
            map.addLayer(item.marker); // 显示所有标记
        });
        filterInfoCards(); // 重新过滤，显示所有地点
    });
    // 生成筛选功能时，重新调用 `filterInfoCards`
    filterInfoCards();
// 关闭信息面板
}



function closeInfoPanel() {
    const infoPanel = document.getElementById('info-panel');
    infoPanel.style.display = 'none'; // 隐藏信息面板
    document.getElementById('info-circle').style.display = 'block'; // 重新显示左下角按钮
}

// 筛选地点信息卡片
function filterInfoCards() {
    const selectedLabels = Array.from(document.querySelectorAll('.filter-checkbox:checked'))
        .map(checkbox => checkbox.value); // 获取选中的标签

    document.querySelectorAll('.info-card').forEach(function(card) {
        const cardLabel = card.getAttribute('data-label');
        if (selectedLabels.length === 0 || selectedLabels.includes(cardLabel)) {
            card.style.display = 'block'; // 显示符合条件的卡片
        } else {
            card.style.display = 'none'; // 隐藏不符合条件的卡片
        }
    });
}

// 初始化面板内容
generateInfoPanel();

// 点击卡片时，放大地图并锁定点位
function zoomToLocation(lat, lng) {
    map.setView([lat, lng], 19); // 设置地图中心到指定位置，放大地图
    locations.forEach(function(location) {
        if (location.lat === lat && location.lng === lng) {
            var marker = markers.find(marker => marker.marker.getLatLng().lat === lat && marker.marker.getLatLng().lng === lng);
            if (marker) {
                map.openPopup(marker.popup); // 打开该位置的弹窗
                toggleMapBlur(true); // 点击卡片时模糊地图
            }
        }
    });
}
