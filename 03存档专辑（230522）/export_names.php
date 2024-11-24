<?php
include 'list/name_list.php';
include 'list/tag_list.php';
include 'list/describe_list.php';
include 'list/photo_list.php';

// 生成导出的 HTML 内容
$html = <<<HTML
<html>
<head>
    <meta charset="utf-8">
    <title>LYEVE | Gallery</title>
    <link rel="stylesheet" type="text/css" href="css/style0.css">
    <link rel="stylesheet" type="text/css" href="css/gallerystyle.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
          integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous">
</head>

<body>

<header>
    <div class="logo"></div>
    <div id="title-lyeve" class="title" _msthash="176254" _msttexthash="25261886">LYEVE | IDOLS AND FANS</div>
    <div class="social-media-icons">
        <a href="https://github.com/lyeveyin">
            <i class="fab fa-github"></i>
        </a>
        <a href="https://lyeveyin.github.io/lyeve/">
            <i class="fab fa-blogger-b"></i>
        </a>
        <a href="https://www.instagram.com/lyeve1998/?hl=zh-cn">
            <i class="fab fa-instagram"></i>
        </a>
    </div>
</header>



 <div class="menu">
        <button class="menu-button" data-filter="all"> All </button>
			</div>
 <div class="menu">
 
        <button class="menu-button" data-filter="BlockB">BlockB</button>
		<button class="menu-button" data-filter="P.O">P.O</button>
		<button class="menu-button" data-filter="Seventeen">Seventeen</button>
        <button class="menu-button" data-filter="Got7">Got7</button>
		<button class="menu-button" data-filter="Winner">Winner</button>
</div>
 <div class="menu">		
		<button class="menu-button" data-filter="男团">男团</button>
        <button class="menu-button" data-filter="女团">女团</button>        
		<button class="menu-button" data-filter="单人">单人</button>
	</div>

<div class="draggable-button" draggable="true">MORE</div>
<div class="sidebar">
    <h3 class="sidebar-title">MORE</h3>
    <ul class="sidebar-list">
        <li class="sidebar-list-item"><a class="sidebar-link" href="html/idol/idoldiary.html" target="_blank">追星日记 DIARY</a></li>
        <li class="sidebar-list-item"><a class="sidebar-link" href="html/idol/kpop.html" target="_blank">KPOP博士</a></li>
        <li class="sidebar-list-item"><a class="sidebar-link" href="html/idol/cpop.html" target="_blank">内娱博士</a></li>
        <li class="sidebar-list-item"><a class="sidebar-link" href="html/idol/cpop.html" target="_blank">自制</a></li>
    </ul>
</div>
<div class="gallery">
HTML;

// gallery

foreach ($nameList as $index => $name) {
    $photo = isset($photoList[$index]) ? $photoList[$index] : '';
    $describe = isset($describeList[$index]) ? $describeList[$index] : '';
	$tag = isset($tagList[$index]) ? $tagList[$index] : '';

    if ($index < 9999) {
        $html .= <<<CARD
        <div class="card" data-tags="{$tag}" onclick="toggleCard(this)">
                <img src="img/idol2/{$photo}" alt="Card">
                <h3>{$name}</h3>
                <p>{$tag}</p>
				<p>{$describe}</p>
        </div>
           
CARD;
    }
}

$html .= <<<HTML
    </div>
	</div>
 <script src="js/star.js"></script>
<script src="js/side.js"></script>
<script src="js/script.js"></script>
<script src="js/menu.js"></script>
</body>
</html>
HTML;


/*
created by lyeve with chatgpt 20230212
*/
// 将 HTML 内容保存为文件
file_put_contents('exported.html', $html);

echo 'Names exported successfully to exported.html.';
?>