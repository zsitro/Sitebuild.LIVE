<?php 

function render(){
	if (!empty($_GET['page'])) {
		@require_once('page.'.$_GET['page'].'.html');
	} else{
		@require_once('page.index.html');
	}
}

function handleDebugMode(){
	if (DEBUG_MODE == 1){
		error_reporting(E_ERROR);
		ini_set('display_errors', '1');
	}
	else{
		error_reporting(E_NONE);
		ini_set('display_errors', '0');
	}
}

function getHeader(){
	@require_once('section.header.html');
}


function getFooter(){
	@require_once('section.footer.html');
}

function getFile($file){
	@require_once($file.'.html');
}

function getSection($section){
	@require_once('section.'.$section.'.html');	
}

function getPage($page){
	@require_once('page.'.$page.'.html');	
}

function addActiveClass($case){
	if ($case == $_GET['page'])
		echo 'active';
}



?>