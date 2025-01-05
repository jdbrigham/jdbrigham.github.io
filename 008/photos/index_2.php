<!DOCTYPE html>
<html>
<head>
  <meta http-equiv="content-type" content="text/html; charset=UTF-8">

  <!-- Enable responsive view on mobile devices -->
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
  <title>Responsive Tiled Photo Gallery in Pure CSS</title>
  
  <style type="text/css">
  
   /* JesterBox 
     * Author: Schizohatter/Soanvig (http://schizohatter.tk)
     * More information in readme (https://github.com/soanvig/JesterBox)
     */
    
    .JesterBox div 
    { 
        visibility: hidden;
        position: fixed;
        top: 5%; right: 5%; bottom: 5%; left: 5%;
        z-index: 75;
        text-align: center;

        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .JesterBox div:before
    {
        content: '';
        position: fixed;
        top: 0; right: 0; bottom: 0; left: 0;
        z-index: 74;
        
        background-color: rgba(0, 0, 0, 0);
        transition: all 0.5s ease-out;
    }
    
    .JesterBox div img
    {
        position: relative;
        z-index: 77;
        max-width: 100%;
        max-height: 100%;
        
        margin-left: -9999px;
        opacity: 0;
        transition-property: all, opacity;
        transition-duration: 0.5s, 0.2s;
        transition-timing-function: ease-in-out, ease-out;
    }
    
    .JesterBox div:target { visibility: visible; }
    
    .JesterBox div:target:before { background-color: rgba(0, 0, 0, 0.7); }
    
    .JesterBox div:target img
    {
        margin-left: 0px;
        opacity: 1;
    }
    body {
      margin: 0;
      padding: 0;
      /* background: #EEE; */
      background-image:url('texturetastic_gray.png');
      font: 10px/13px 'Lucida Sans',sans-serif;
    }
    .wrap {
      overflow: hidden;
      margin: 10px;
    }
    .box {
      float: left;
      position: relative;
      width: 20%;
      padding-bottom: 20%;
      background-image:url('ios-linen.jpg');
    }
    .boxInner {
     position: absolute;
      left: 10px;
      right: 10px;
      top: 10px;
      bottom: 10px;
      overflow: hidden;
      background: #66cc99;
      text-align: center;
      font-size: 2em;
    }
    

    

    .boxInner img {
      width: 100%;
    }
    .boxInner .titleBox {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin-bottom: -50px;
      background: #000;
      background: rgba(0, 0, 0, 0.5);
      color: #FFF;
      padding: 10px;
      text-align: center;
      -webkit-transition: all 0.3s ease-out;
      -moz-transition: all 0.3s ease-out;
      -o-transition: all 0.3s ease-out;
      transition: all 0.3s ease-out;
    }
    body.no-touch .boxInner:hover .titleBox, body.touch .boxInner.touchFocus .titleBox {
      margin-bottom: 0;
    }
    @media only screen and (max-width : 480px) {
      /* Smartphone view: 1 tile */
      .box {
        width: 100%;
        padding-bottom: 100%;
      }
    }
    @media only screen and (max-width : 650px) and (min-width : 481px) {
      /* Tablet view: 2 tiles */
      .box {
        width: 50%;
        padding-bottom: 50%;
      }
    }
    @media only screen and (max-width : 1050px) and (min-width : 651px) {
      /* Small desktop / ipad view: 3 tiles */
      .box {
        width: 33.3%;
        padding-bottom: 33.3%;
      }
    }
    @media only screen and (max-width : 1290px) and (min-width : 1051px) {
      /* Medium desktop: 4 tiles */
      .box {
        width: 25%;
        padding-bottom: 25%;
      }
    }
    
#demo div { 
	width: 400px;
	height: 60px;
	line-height: 50px;
	font-family: "Century Gothic", "Helvetica", sans-serif;
	font-size: 50px;
	font-weight: bold;
	text-align: center;
	margin-left: 30px; 
} 
.demo1 { 
	/* Darker text on medium background */
	color: #555;
	/* background-color: #666; */
	/* text-shadow: 0px 1px 0px rgba(255,255,255,.5); */ /* 50% white from bottom */
	text-shadow: 0px 1px 0px #333;
}
    
    /* Medium text on lighter background */
		color: #666;
		background-color: #aaa;
		text-shadow: 0px -1px 0px rgba(0,0,0,.5); /* 50% black coming from the top */
  </style>
  <!-- Enable media queries for old IE -->
  <!--[if lt IE 9]>
	<script src="http://css3-mediaqueries-js.googlecode.com/svn/trunk/css3-mediaqueries.js"></script>
  <![endif]-->

</head>

<body class="no-touch">

  <div class="wrap">
    
    <!-- Define all of the tiles: -->
    
<?php include 'list2.html'; ?>
  <!-- /#wrap -->

  
  <!-- Add some JavaScript to enable toggling the descriptions when an image is tapped on a touchscreen device -->
  <script type="text/javascript" src="http://code.jquery.com/jquery-1.8.3.js"></script>
  <script type="text/javascript">
    $(function(){
      // See if this is a touch device
      if ('ontouchstart' in window)
      {
        // Set the correct body class
        $('body').removeClass('no-touch').addClass('touch');
        
        // Add the touch toggle to show text
        $('div.boxInner img').click(function(){
          $(this).closest('.boxInner').toggleClass('touchFocus');
        });
      }
    });
  </script>
  
</body>
</html>