<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name = $_POST['name'];
	$tag = $_POST['tag'];
	$describe = $_POST['describe'];
    $photo = $_POST['photo'];

    // 从文件中读取已有的名字列表和照片列表
    include 'list/name_list.php';
	include 'list/tag_list.php';
	include 'list/describe_list.php';
    include 'list/photo_list.php';


    // 将名字追加到名字列表数组
    $nameList[] = $name;
	
	 // 将标签追加到名字列表数组
    $tagList[] = $tag;
	
    // 将名字追加到名字列表数组
    $describeList[] = $describe;

    // 将照片链接追加到照片列表数组
    $photoList[] = $photo;

    // 将名字列表数组保存到文件（name_list.php）
    file_put_contents('list/name_list.php', '<?php $nameList = ' . var_export($nameList, true) . ';', LOCK_EX);

	// 将名字列表数组保存到文件（name_list.php）
    file_put_contents('list/tag_list.php', '<?php $tagList = ' . var_export($tagList, true) . ';', LOCK_EX);

    // 将秒速列表数组保存到文件（describe_list.php）
    file_put_contents('list/describe_list.php', '<?php $describeList = ' . var_export($describeList, true) . ';', LOCK_EX);
	
    // 将照片列表数组保存到文件（photo_list.php）
    file_put_contents('list/photo_list.php', '<?php $photoList = ' . var_export($photoList, true) . ';', LOCK_EX);

    // 重定向回 name.php
    header('Location: name.php');
    exit;
}
?>
