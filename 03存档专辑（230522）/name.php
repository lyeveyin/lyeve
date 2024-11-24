<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Name Input</title>
</head>
<body>
    <h1>Name Input</h1>

<form method="POST" action="display_name.php">
    <label for="name">name:</label>
    <input type="text" id="name" name="name" required>
	
	<label for="tag">tag:</label>
    <input type="text" id="tag" name="tag" required>
	
	<label for="describe">describe:</label>
    <input type="text" id="describe" name="describe" required>
    
    <label for="photo">Photo URL:</label>
    <input type="text" id="photo" name="photo" required>
    
    <button type="submit">Submit</button>
</form>


</body>
</html>
