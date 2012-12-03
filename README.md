Sitebuild.LIVE
==============

Idiot-proof PHP framework to ease multipage sitebuilding process

## Usage
1. call root directory (for example: `localhost/`) to load `page.index.html`
2. for new subpage create `page.PAGENAME.html` then call `/?page=PAGENAME`
3. for header and footer use `section.header.html` and `section.footer.html` then add `<?php getHeader() ?>` or `<?php getFooter() ?>`
4. for using other snippets in multiple pages create `section.SECTIONNAME.html` then add `<?php getSection('menu') ?>` into your html code

###Sample `page.index.html`

```html
<?php getHeader() ?>

<!--  =============  -->
<!--  = page.Home =  -->
<!--  =============  -->

    <div class="container">

        <?php getSection('sample') ?>

        <?php getSection('menu') ?>
    
    <div class="main">
        // main
    </div><!--! end of #main -->

<?php getFooter() ?>
```


###Sample menu with addActiveClass helper
```html
<nav class="mainmenu">
	<a class="<?php addActiveClass('') ?> inline home current" href="?page=">Home</a>
	<a class="<?php addActiveClass('works') ?> inline works" href="?page=works">Work</a>
	<a class="<?php addActiveClass('contact') ?> inline contact" href="?page=contact">Contact</a>
</nav>
```

See it in action: [http://www.levizadori.com/?page=works](http://www.levizadori.com/?page=works)
