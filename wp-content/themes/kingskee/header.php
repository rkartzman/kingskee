<!DOCTYPE html>
<html class="no-js">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#212121">
    <!-- <link href="https://fonts.googleapis.com/css?family=Lato:300,400|Roboto:100,100i" rel="stylesheet"> -->
    
    <meta name="google-site-verification" content="6eirgKo9QgTx6Spgyb3mEnzLdl0P4QJPT45RsqUVXC0" />    

    <link type="text/css" rel="stylesheet" href="<?php bloginfo('stylesheet_url'); echo '?ver=' . filemtime( get_stylesheet_directory() . '/style.css'); ?>">
    <?php global $og_description, $page_animate, $nav_animate; ?>
    <?php wp_head(); ?>


    <!-- Page animation class -->
    <?php
    $page_animate_class = $page_animate ? ' animate-page' : '';
    $nav_animate_class = $nav_animate ? ' animate-nav' : '';
    ?>

    <!-- Make sure overlay is hidden & pages with load-in animations should show, when theres no javascript -->
    <noscript>
        <style type="text/css">
            .glitch-overlay {
                display: none!important;
            }
            .animate-page .body-section,
            .animate-page.animate-nav .nav .inner {
                -moz-opacity: 1!important;
                -khtml-opacity: 1!important;
                opacity: 1!important;
                -webkit-transform: translate3D(0,0,0)!important;
                transform: translate3D(0,0,0)!important;
            }

            .animate-page .brand-page .scalein-onload,
            .animate-page .news-page .scalein-onload {
                transform: scale(1)!important;
                opacity: 1!important;
            }
        </style>
    </noscript>

</head>

<body class="scrolling-up<?=$page_animate_class . $nav_animate_class?>">

<?php include 'images/symbol-defs.svg'; ?>
    <div class="nav">
        <div class="inner">
            <a href="<?= home_url(); ?>" class="logo">
                <img class="icon" src="/wp-content/themes/kingskee/images/Kingskee_Logo_White.png" alt="">
                <!-- <svg class="icon icon-kg-logo"><use xlink:href="#icon-kg-logo"></use></svg> -->
                <!-- <svg class="icon icon-logo-combined"><use xlink:href="#icon-logo-combined"></use></svg> -->
            </a>
            <?php if ( has_nav_menu('header-menu') ) : ?>
            <div class="nav-wrap check-scroll">
            <?php /* 
            <?php wp_nav_menu(array(
                    'theme_location' => 'header-menu',
                    'container' => 'li',
                    'items_wrap' => '<ul>%3$s</ul>')
            ); ?>
            */ ?>
            <ul class="header__list">
                <li class="menu-item"><a href="" class="text__link">How it works</a></li>
                <li class="menu-item"><a href="" class="text__link">About Us</a></li>
                <li class="menu-item"><a href="" class="text__link">Find Your Trip</a></li>
                
            </ul>
            </div><!-- .nav-wrap -->
            <?php endif;?><!-- #main-nav -->
            
            
        

        </div><!-- .inner -->
    </div><!-- .nav -->

