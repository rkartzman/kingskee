<?php 
    $footer_image = get_field('footer_logo_image', 'option');
    $ig = get_field('instagram_url', 'option');
    $twitter = get_field('twitter_url', 'option');
    $fb = get_field('facebook_url', 'option');
    $hours = get_field('operating_hours', 'option');
    $contact = get_field('contact', 'option');
    $socialLinks = get_field('')
 ?>
        <div class="footer-section dark-bg">
            <div class="footer__wrapper">
            <?php /* 
            <div class="background" style="background-image: url(<?= $footer_image['url']; ?>);"></div>
            */ ?>
                <div class="footer--custom">
                    
                    
                  
                   




                    </div><!-- .contain -->
                </div>
            </div>
        </div><!-- .footer-section -->


        <script src="<?php bloginfo('template_url'); ?>/js/vendor.js<?php echo '?ver=' . filemtime( get_stylesheet_directory() . '/js/vendor.js'); ?>"></script>
        <script src="<?php bloginfo('template_url'); ?>/js/app.js<?php echo '?ver=' . filemtime( get_stylesheet_directory() . '/js/app.js'); ?>"></script>

    <?php wp_footer(); ?>
    </body>
</html>