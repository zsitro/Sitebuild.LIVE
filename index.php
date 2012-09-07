<?php

//	====================================================
//	= Sitebuild.live proto | Zsitro.com | Gabor Zsoter =
//	= Nice framework to ease your sitebuild workflow   =
//	= v1.1: with LESS support                          =
//	= todo: DIRECTORY SEPARATOR for Linux/Win env      =
//  ====================================================

		ini_set('display_errors', '0');

//  ======================
//  = HERE YOU CAN TROLL =
//  ======================

		// Project settings
		define(THIS_FOLDER,	dirname(__FILE__));
		define(CSS_FOLDER, 	'styles/');
		define(PROTO_FOLDER, 'sitebuild.proto');
		define(PROJECTNAME,	'projectname');

		//Debug ON/OFF
		define(DEBUG_MODE, 1);


//  ===================
//  = END OF TROLLING =
//  ===================

		header('Content-Type: text/html; charset=utf-8');
		header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
		header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");

//  ========================
//  = Complie LESS file(s) =
//  ========================

	function collectLessFiles($rootPath) {
		$pathStack=array($rootPath);
		while($path=array_pop($pathStack)){
			foreach(scandir($path) as $filename){
				if('.'!=substr($filename,0,1)){
					$newPath = $path.'/'.$filename;
					if (is_dir($newPath)){
						array_push($pathStack,$newPath);
					}else{
						if(end(explode(".",$newPath))=="less")
							$contents[basename($filename)] = $newPath;
					}
				}
			}
		}
		return $contents;
	}


	function OnlyFilename($strName){
	     $ext = strrchr($strName, '.');
	     if($ext !== false){
	         $strName = substr($strName, 0, -strlen($ext));
	     }
	     return $strName;
	}

	function processLESSfiles(){
		// read files to an array
		$files = collectLessFiles( THIS_FOLDER.'/'.CSS_FOLDER );

		require realpath(dirname(__FILE__)).'/'.PROTO_FOLDER.'/lessc.inc.php';

		foreach ($files as $lessFile) {
			try {
			    $cssFile = OnlyFilename($lessFile).".css";
			    lessc::ccompile( $lessFile, $cssFile );
				//echo "***".$value." is CONVERTED!<br>";

			} catch (exception $ex) {
				//echo "***".$value." is NOT CONVERTED!<br>";
			    exit($ex->getMessage());
			}
			//echo "***".$value."<br>";
		} // end of foreach

	}

/* DEPRECATED from v1.1
		// @todo:  Needs a for loop for each in case > 1

		require realpath(dirname(__FILE__)).'/sitebuild.proto/lessc.inc.php';
		try {
		    lessc::ccompile(CSS_FOLDER.PROJECTNAME.'.less', CSS_FOLDER.PROJECTNAME.'.css');
		} catch (exception $ex) {
		    exit($ex->getMessage());
		}
*/


//  =================================
//  = Load sitebuild.live framework =
//  =================================

		require_once('sitebuild.proto/live.functions.php');
		processLESSfiles();
		handleDebugMode(); // set PHP vars
		render(); // collect & render content

?>