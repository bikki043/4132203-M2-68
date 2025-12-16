<html>

<body>
    <div id="title">Hello PHP</div>
    <div id="blog"> </div>

    <body>
        <script src="https://cdn.jsdelivr.net/npm/jquery@3.7.1/dist/jquery.min.js"></script>
        <script>
            document.getElementById("title").innerHTML = "welcome PHP";
            $(function() {});//Jquery handler

            $(document).ready(function(){
                $("#title").html("Ready Bikky !!")
                $("#blog").load("/page/blog.php");

            }); 
            
            
        </script>
    

                
                
</html>