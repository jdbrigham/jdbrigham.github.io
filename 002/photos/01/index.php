<!DOCTYPE html>
<html lang="en" class="pen">
<head>

	<!-- php base code for retrieving the text file and setting variables to each line -->
	<?php
        $my_text_file = "01_metadata.txt";
        $all_lines = file($my_text_file);
    ?>
  	<meta charset="UTF-8">
<!-- php 0: original filename -->
  	<title>Image Details: <?php echo $all_lines[0]; ?>
  	</title>
  	<meta name="viewport" content="width=device-width, initial-scale=1">
  	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
	<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'>
	<script src="http://code.jquery.com/jquery-1.8.3.min.js"></script>
	<link rel="stylesheet" href="../css/style.css">

</head>
<body>

<nav class="navbar navbar-dark bg-dark text-center">
  	<a class="navbar-brand" href="javascript:history.back()">
<!-- php 1: wall map filename  -->
    <img src="../img/th/100/map_<?php echo $all_lines[1]; ?>.png" class="d-inline-block align-middle gridmap" alt="" loading="lazy">
  </a>
  <span class="navbar-text text-center header-text">
<!-- php 2: original filename -->
      Image Details:  <?php echo $all_lines[2]; ?>
	</span>
</nav>
<div class="text-center">
<!-- php 3: image filename -->

		<img src="../../img/IMG_6937.jpg" id="myImage" class="img-responsive image">
</div>
<div class="container">
<div class="row">
	<div class="col text-center">
		<p><label class="switch">
		<input id="toggleswitch" type="checkbox">
		<span class="slider round"></span>
		</label>
		<span  id="status">Show crop</span></p>
	</div>
</div>
</div>
<hr>
  <!-- ~~~~~~~~~~~~   WINTER  ~~~~~~~~~~~~- -->

<div class="container">
    <div id="services" class="page-header">
      <h1 class="category">Season</h1>
    </div>
     <hr class="shorter">
     <div class="row">
        <div class="col">
          <figure>
           		<img src="../img/icons/seasons/noun_Winter_348818_sel.png" class="mx-auto d-block iconselected" />
           		<figcaption class="figure-caption text-center selcaption">Winter</figcaption>
           	</figure>
        </div>
        <div class="col">
          <figure>
             <img src="../img/icons/seasons/noun_spring_348819.png" class="mx-auto d-block iconunselected" />
             <figcaption class="figure-caption text-center">Spring</figcaption>
           </figure>
        </div>
        <div class="col">
          <figure>
              <img src="../img/icons/seasons/noun_Summer tree_236253.png" class="mx-auto d-block iconunselected" />
              <figcaption class="figure-caption text-center">Summer</figcaption>
            </figure>
        </div>
        <div class="col">
          <figure>
              <img src="../img/icons/seasons/noun_Fall Tree_315008.png" class="mx-auto d-block iconunselected" />
              <figcaption class="figure-caption text-center">Fall</figcaption>
            </figure>
        </div>
      </div>

      <div id="services" class="page-header">
        <h1 class="category">Date & Time</h1>
      </div>
      <hr class="shorter">
      <div class="row">
    	   <div class="col mycolumn">
    	   		<span data-tooltip aria-haspopup="true" class="has-tip" title="Capture Day of Week">
							<div class="mycolheader">weekday</div>
								<div class="mycolmaincontent">
<!-- php 4: day of week for icon & php 5: name of day of week-->
									<h4><img class="icon" src="../img/icons/days/DaysOfWeek_<?php echo $all_lines[4]; ?>.png" alt="logo" /> <?php  echo $all_lines[5]; ?></h4>
								</div> <!-- end mycolmaincontent -->
						</span>
    	   </div>

    	<div class="col mycolumn">
            		<span data-tooltip aria-haspopup="true" class="has-tip" title="Capture Date">
									<div class="mycolheader">capture date</div>
										<div class="mycolmaincontent">
<!-- php 6: month name for icon & php 7: month name and date for display -->
											<h4><img class="icon" src="../img/icons/months	/month_<?php echo $all_lines[6]; ?>.png" alt="logo" /> <?php  echo $all_lines[7]; ?></h4>
										</div> <!-- end mycolmaincontent -->
								</span>
      	</div>
    </div> <!-- ends a two columns row -->



		<hr class="shorter">

    <div class="row">
    	<div class="col mycolumn">
        <span data-tooltip aria-haspopup="true" class="has-tip" title="Capture Year">
					<div class="mycolheader">year</div>
						<div class="mycolmaincontent">
<!-- php 8: year for display -->
            		<h4><img class="icon" src="../img/icons/noun_689869_cc.png" /><?php echo $all_lines[8]; ?></h4>
						</div> <!-- end mycolmaincontent -->
        </span>
    	</div> <!-- end mycolumn -->

    	<div class="col mycolumn">
        <span data-tooltip aria-haspopup="true" class="has-tip" title="Capture Time">
					<div class="mycolheader">time</div>
						<div class="mycolmaincontent">
<!-- php 9: capture time for icon path & php 10: capture time for display-->
            				<h4><img class="icon" src="../img/icons/times/<?php echo $all_lines[9]; ?>.png" /><?php echo $all_lines[10]; ?> </h4>
						</div> <!-- end mycolmaincontent -->
          </span>
    	</div> <!-- end mycolumn -->
    </div> <!-- ends a two columns row -->

<hr class="shorter">

   <div class="row">

    <div class="timeline">
    	<h1 class="media-heading timeline-title" id="design">relative time of day</h1>
<!-- php 11: capture time for relative time graphic -->
    	<h1 class="media-heading" id="develop"><img src="../img/icons/times/time-of-day_<?php echo $all_lines[11]; ?>.png" class="timeline" /></h1>
    </div>
	</div>

	 <div id="services" class="page-header">
      		<h1 class="category">Location Info</h1>
    </div>

 	<hr class="shorter">

    <div class="row">
    	<div class="col mycolumn">
        	<span data-tooltip aria-haspopup="true" class="has-tip" title="City">
        		<div class="mycolheader">city</div>
        			<div class="mycolmaincontent">
<!-- php 12: city name for display -->
            			<h4><img class="icon" src="../img/icons/noun_Map_3456977.png" /><?php echo $all_lines[12]; ?> </h4>
            		</div> <!-- end mycolmaincontent -->
            </span>
        </div> <!-- end mycolumn -->

    	<div class="col mycolumn">
        	<span data-tooltip aria-haspopup="true" class="has-tip" title="State">
        		<div class="mycolheader">state</div>
        			<div class="mycolmaincontent">
<!-- php 13: state name for display -->
            			<h4><img class="icon" src="../img/icons/states/noun_Florida_100454.png"/> <?php echo $all_lines[13]; ?> </h4>
            		</div> <!-- end mycolmaincontent -->
        	</span>
		</div> <!-- end mycolumn -->
    </div> <!-- ends a two columns row -->

    <hr class="shorter">

    <div class="row">
    	<div class="col mycolumn">
        		<span data-tooltip aria-haspopup="true" class="has-tip" title="GPS Coordinates">
        			<div class="mycolheader">gps coordinates</div>
        				<div class="mycolmaincontent">
<!-- php 14: GPS coordinates for display -->
            				<h4><img class="icon" src="../img/icons/noun_Map_3456977.png" /><?php echo $all_lines[14]; ?> </h4>
            			</div> <!-- end mycolmaincontent -->
            	</span>
        </div> <!-- end mycolumn -->

    	<div class="col mycolumn">
        	<span data-tooltip aria-haspopup="true" class="has-tip" title="Image Direction">
        		<div class="mycolheader">gps image direction</div>
        		<div class="mycolmaincontent">
<!-- php 15: GPS Image Direction -->
            		<h4><img class="icon" src="../img/icons/noun_Compass_659493.png" /> <?php echo $all_lines[15]; ?></h4>
            	</div> <!-- end mycolmaincontent -->
            </span>
        </div> <!-- end mycolumn -->
    </div> <!-- ends a two columns row -->

    <hr class="shorter">

    <div id="services" class="page-header">
      <h1 class="category">Camera Info</h1>
    </div>

 	<hr class="shorter">

    <div class="row">
    	<div class="col mycolumn">
        	<span data-tooltip aria-haspopup="true" class="has-tip" title="Camera">
        		<div class="mycolheader">camera model</div>
        		<div class="mycolmaincontent">
<!-- php 16: camera model -->
            		<h4><img class="icon" src="../img/icons/noun_Camera_70858.png" /><?php echo $all_lines[16]; ?></h4>
            	</div> <!-- end mycolmaincontent -->
            </span>
        </div> <!-- end mycolumn -->

    	<div class="col mycolumn">
        	<span data-tooltip aria-haspopup="true" class="has-tip" title="Lens Info">
        		<div class="mycolheader">lens info</div>
        		<div class="mycolmaincontent">
            		<h4><img class="icon" src="../img/icons/noun_Lens_477895.png" /> <?php echo $all_lines[17]; ?> </h4>
            	</div> <!-- end mycolmaincontent -->
            </span>
        </div> <!-- end mycolumn -->
    </div> <!-- ends a two columns row -->

    <hr class="shorter">

    <div class="row">
    	<div class="col mycolumn">
        	<span data-tooltip aria-haspopup="true" class="has-tip" title="Shutter Speed & Aperture">
        		<div class="mycolheader">shutter speed and aperture</div>
        		<div class="mycolmaincontent">
<!-- php 18: shutter speed and aperture -->
    				<h4><img class="icon" src="../img/icons/noun_576701_cc.png" /> <?php echo $all_lines[18]; ?> </h4>
    			</div> <!-- end mycolmaincontent -->
    			</span>
      </div> <!-- end mycolumn -->

    	<div class="col mycolumn">
        	<span data-tooltip aria-haspopup="true" class="has-tip" title="Focal Length">
        		<div class="mycolheader">focal length</div>
        		<div class="mycolmaincontent">
<!-- php 19: focal length -->
            		<h4><img class="icon" src="../img/icons/noun_Lens_119967.png" /> <?php echo $all_lines[19]; ?> </h4>
            	</div> <!-- end mycolmaincontent -->
            </span>
        </div> <!-- end mycolumn -->
    </div> <!-- ends a two columns row -->

    <hr class="shorter">

    <div class="row">
    	<div class="col mycolumn">
        	<span data-tooltip aria-haspopup="true" class="has-tip" title="Angle of View">
        		<div class="mycolheader">angle of view</div>
        		<div class="mycolmaincontent">
<!-- php 20: angle of view -->
            		<h4><img class="icon" src="../img/icons/noun_angles_330111.png" /> <?php echo $all_lines[20]; ?> </h4>
            	</div> <!-- end mycolmaincontent -->
            </span>
      </div> <!-- end mycolumn -->

    	<div class="col mycolumn">
        	<span data-tooltip aria-haspopup="true" class="has-tip" title="ISO">
        		<div class="mycolheader">ISO value</div>
        		<div class="mycolmaincontent">
<!-- php 21: ISO setting -->
            		<h4><img class="icon" src="../img/icons/noun_dial_2943396 copy.png" /> <?php echo $all_lines[21]; ?> </h4>
            	</div> <!-- end mycolmaincontent -->
          </span>
        </div> <!-- end mycolumn -->
    </div> <!-- ends a two columns row -->

    <hr class="shorter">

    <div class="row">
    	<div class="col mycolumn">
        	<span data-tooltip aria-haspopup="true" class="has-tip" title="Brightness">
        		<div class="mycolheader">brightness</div>
        		<div class="mycolmaincontent">
            		<h4><img class="icon" src="../img/icons/noun_brightness_2294697.png" /> <?php echo $all_lines[22]; ?> </h4>
            	</div> <!-- end mycolmaincontent -->
          </span>
      </div> <!-- end mycolumn -->

    	<div class="col mycolumn">
        	<span data-tooltip aria-haspopup="true" class="has-tip" title="Circle of Confusion">
        	<div class="mycolheader">circle of confusion</div>
        	<div class="mycolmaincontent">
<!-- php 23: circle of confusion value -->
            	<h4><img class="icon" src="../img/icons/noun_Circle_518408.png" /> <?php echo $all_lines[23]; ?> </h4>
            </div> <!-- end mycolmaincontent -->
            </span>
       </div> <!-- end mycolumn -->
    </div> <!-- ends a two columns row -->

    <hr class="shorter">

    <div class="row">
    	<div class="col mycolumn">
        	<span data-tooltip aria-haspopup="true" class="has-tip" title="Flash Info">
        		<div class="mycolheader">flash info</div>
        		<div class="mycolmaincontent">
<!-- php 24: flash info -->
            		<h4><img class="icon" src="../img/icons/noun_flash_1256653.png" /> <?php echo $all_lines[24]; ?> </h4>
            	</div> <!-- end mycolmaincontent -->
            </span>
        </div> <!-- end mycolumn -->

    	<div class="col mycolumn">
        	<span data-tooltip aria-haspopup="true" class="has-tip" title="Camera Orientation">
        		<div class="mycolheader">camera orientation</div>
        		<div class="mycolmaincontent">
<!-- php 25: camera orientation -->
            		<h4><img class="icon" src="../img/icons/noun_orientation_1106427.png" /> <?php echo $all_lines[25]; ?></h4>
            	</div> <!-- end mycolmaincontent -->
            </span>
        </div> <!-- end mycolumn -->
    </div> <!-- ends a two columns row -->

	<hr class="shorter">

        <div id="services" class="page-header">
      		<h1 class="category">Image Info</h1>
    		</div>

 	<hr class="shorter">

    <div class="row">
    	<div class="col mycolumn">
        	<span data-tooltip aria-haspopup="true" class="has-tip" title="Image Height">
        		<div class="mycolheader">image height</div>
        		<div class="mycolmaincontent">
<!-- php 26: image height value -->
            		<h4><img class="icon" src="../img/icons/noun_height_789049.png" /> <?php echo $all_lines[26]; ?> </h4>
            	</div> <!-- end mycolmaincontent -->
            </span>
      </div> <!-- end mycolumn -->

    	<div class="col mycolumn">
        	<span data-tooltip aria-haspopup="true" class="has-tip" title="Image Width">
        		<div class="mycolheader">image width</div>
        		<div class="mycolmaincontent">
<!-- php 27: iamge width value -->
            		<h4><img class="icon" src="../img/icons/noun_width_789049.png" /> <?php echo $all_lines[27]; ?> </h4>
            	</div> <!-- end mycolmaincontent -->
            </span>
      </div> <!-- end mycolumn -->
    </div> <!-- ends a two columns row -->

	<hr class="shorter">

		<div id="services" class="page-header">
      		<h1 class="category">Weather Info</h1>
    	</div>

	<hr class="shorter">

    	<div class="row">
    		<div class="weather">
    			<h3 style="text-align: center"><a href="<?php echo $all_lines[28]; ?>">Weather conditions that day (DarkSky link)</a></h3>
    		</div>
			</div>

	<hr class="shorter">

    <div class="row">
    	<div class="col mycolumn">
        	<span data-tooltip aria-haspopup="true" class="has-tip" title="High Temperature">
        		<div class="mycolheader">high temp</div>
        		<div class="mycolmaincontent">
<!-- php 28: high temperature -->
            		<h4><img class="icon" src="../img/icons/noun_hot weather_2272244.png" /> <?php echo $all_lines[29]; ?> </h4>
            	</div> <!-- end mycolmaincontent -->
            </span>
         </div> <!-- end mycolumn -->

    	<div class="col mycolumn">
        	<span data-tooltip aria-haspopup="true" class="has-tip" title="Low Temperature">
        		<div class="mycolheader">low temp</div>
        		<div class="mycolmaincontent">
<!-- php 29: low temperature -->
            	<h4><img class="icon" src="../img/icons/noun_cold weather_2272242.png" /> <?php echo $all_lines[30];?> </h4>
            </div> <!-- end mycolmaincontent -->
        	</span>
         </div> <!-- end mycolumn -->
    </div> <!-- ends a two columns row -->

      </div> <!-- this /div ends the column definition -->
    </div> <!-- this /div ends the row definition -->

    <div id="about" class="page-header">
      <h3>Background</h>
    </div>

<!--
    <blockquote>
      <p>Wake up with determination. Go to sleep with satisfaction.</p>
      <footer>Someone somewhere on the <cite>internet</cite>.</footer>
    </blockquote>
 -->

<!-- partial -->
  	<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.0/jquery.min.js'></script>
	<script src='https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.3.7/js/bootstrap.min.js'></script>
	<script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.4.1/jquery.min.js'></script>
	<script type='text/javascript' src="script.js"></script>
</body>
</html>
