<?php
include 'name_list.php';
include 'englishname_list.php';
include 'photo_list.php';

// 生成导出的 HTML 内容
$html = <<<HTML
<html>
<head>
    <title>LYEVE IDOLS</title>
    <link rel="stylesheet" type="text/css" href="css/idolstyle.css">
    <link rel="stylesheet" type="text/css" href="css/style.css">
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.1/css/all.css"
    integrity="sha384-vp86vTRFVJgpjF9jiIGPEEqYqlDwgyBgEF109VFjmqGmIY/Y4HV4d3Gp2irVfcrp" crossorigin="anonymous">
    <script src="js/star.js"></script>

</head>
<body>
<div class="draggable-button" draggable="true">MORE</div>
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

<div class="sidebar">
  <h3 class="sidebar-title">MORE</h3>
  <ul class="sidebar-list">
    <li class="sidebar-list-item"><a class="sidebar-link" href="html/idol/idoldiary.html" target="_blank">追星日记 DIARY</a></li>
    <li class="sidebar-list-item"><a class="sidebar-link" href="html/idol/kpop.html" target="_blank">KPOP博士</a></li>
    <li class="sidebar-list-item"><a class="sidebar-link" href="html/idol/cpop.html" target="_blank">内娱博士</a></li>
    <li class="sidebar-list-item"><a class="sidebar-link" href="html/idol/cpop.html" target="_blank">自制</a></li>
  </ul>
</div>

<div class="card-container" style="background-image: url(img/svt.jpg);">
    <p class="text"><a href="https://www.pledis.co.kr/html/artist/seventeen/CHN">Seventeen</a>
	</br>and</br><a href="html/idol/svt.html">Carat</a></p>
    <div class="card-row">
HTML;

// seventeen


$counter = 0;
foreach ($nameList as $index => $name) {
    $photo = isset($photoList[$index]) ? $photoList[$index] : '';
    $englishname = isset($englishnameList[$index]) ? $englishnameList[$index] : '';

    if ($index < 13) {
        $html .= <<<CARD
        <div class="card" onclick="toggleCard(this)">
            <div class="card-front">
                <img src="{$photo}" alt="Card">
                <p class="card-text">{$englishname}</p>
            </div>
            <div class="card-back">
                <img src="{$photo}" alt="Card">
                <p class="card-text">{$name}</p>
            </div>
        </div>
CARD;
    } elseif ($index == 13) {
        $html .= <<<HTML
    </div>
</div>





<div class="card-container" style="background-image: url(img/idol/blockb.jpg);">
    <p class="text"><a href="https://www.pledis.co.kr/html/artist/seventeen/CHN">BlockB</a>
	</br>and</br><a href="html/idol/blockb.html">BBC</a></p>
    <div class="card-row">
HTML;

// blockb

        $html .= <<<CARD
        <div class="card" onclick="toggleCard(this)">
            <div class="card-front">
                <img src="{$photo}" alt="Card">
                <p class="card-text">{$englishname}</p>
            </div>
            <div class="card-back">
                <img src="{$photo}" alt="Card">
                <p class="card-text">{$name}</p>
            </div>
        </div>
CARD;
    } elseif ($index > 13 && $index < 20) {
        $html .= <<<CARD
        <div class="card" onclick="toggleCard(this)">
            <div class="card-front">
                <img src="{$photo}" alt="Card">
                <p class="card-text">{$englishname}</p>
            </div>
            <div class="card-back">
                <img src="{$photo}" alt="Card">
                <p class="card-text">{$name}</p>
            </div>
        </div>
CARD;
    } 
	
	elseif ($index == 20) {
        $html .= <<<HTML
    </div>
</div>




<div class="card-container" style="background-image: url(img/idol/got7.jpg);">
    <p class="text"><a href="https://www.pledis.co.kr/html/artist/seventeen/CHN">GOT7</a>
	</br>and</br><a href="html/idol/got7.html">I GOT7</a></p>
    <div class="card-row">
HTML;
// got7
        $html .= <<<CARD
        <div class="card" onclick="toggleCard(this)">
            <div class="card-front">
                <img src="{$photo}" alt="Card">
                <p class="card-text">{$englishname}</p>
            </div>
            <div class="card-back">
                <img src="{$photo}" alt="Card">
                <p class="card-text">{$name}</p>
            </div>
        </div>
CARD;
    }elseif ($index > 20&& $index < 27) {
        $html .= <<<CARD
        <div class="card" onclick="toggleCard(this)">
            <div class="card-front">
                <img src="{$photo}" alt="Card">
                <p class="card-text">{$englishname}</p>
            </div>
            <div class="card-back">
                <img src="{$photo}" alt="Card">
                <p class="card-text">{$name}</p>
            </div>
        </div>
CARD;
    }	
	
	elseif ($index == 27) {
        $html .= <<<HTML
    </div>
</div>



<div class="card-container" style="background-image: url(img/idol/pick.jpg);">
    <p class="text">PICK</p>
    <div class="card-row">
HTML;
// pick
        $html .= <<<CARD
        <div class="card" onclick="toggleCard(this)">
            <div class="card-front">
                <img src="{$photo}" alt="Card">
                <p class="card-text">{$englishname}</p>
            </div>
            <div class="card-back">
                <img src="{$photo}" alt="Card">
                <p class="card-text">{$name}</p>
            </div>
        </div>
CARD;
    }elseif ($index > 27&& $index < 50) {
        $html .= <<<CARD
        <div class="card" onclick="toggleCard(this)">
            <div class="card-front">
                <img src="{$photo}" alt="Card">
                <p class="card-text">{$englishname}</p>
            </div>
            <div class="card-back">
                <img src="{$photo}" alt="Card">
                <p class="card-text">{$name}</p>
            </div>
        </div>
CARD;
    }
	
	
}

$html .= <<<HTML
    </div>
</div>





<script src="js/side.js"></script>
</body>
</html>
HTML;
/*
230515
历经几天终于知道怎么运用php了
php-XAMPP-apache
中途真的好多坑
比如port的修改（82/4433）找了半天apche怎么打开php 点admin就行
此次php的运用主要工作流是输入信息的php-存储处理信息成list的php-导出html格式用来展示的php
追星博客的建立十分满意
by lyeve
*/
// 将 HTML 内容保存为文件
file_put_contents('exported_names.html', $html);

echo 'Names exported successfully to exported_names.html.';
?>





