<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
	$englishname = $_POST['englishname'];
    $photo = $_POST['photo'];

    // 从文件中读取已有的名字列表和照片列表
    include 'name_list.php';
	include 'englishname_list.php';
    include 'photo_list.php';

    // 将名字追加到名字列表数组
    $nameList[] = $name;
	
	
    // 将名字追加到名字列表数组
    $englishnameList[] = $englishname;

    // 将照片链接追加到照片列表数组
    $photoList[] = $photo;

    // 将名字列表数组保存到文件（name_list.php）
    file_put_contents('name_list.php', '<?php $nameList = ' . var_export($nameList, true) . ';', LOCK_EX);

    // 将名字列表数组保存到文件（englishname_list.php）
    file_put_contents('englishname_list.php', '<?php $englishnameList = ' . var_export($englishnameList, true) . ';', LOCK_EX);
	
    // 将照片列表数组保存到文件（photo_list.php）
    file_put_contents('photo_list.php', '<?php $photoList = ' . var_export($photoList, true) . ';', LOCK_EX);

    // 重定向回 name.php
    header('Location: name.php');
    exit;
}
?>
