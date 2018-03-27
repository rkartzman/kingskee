<?php 
$fields = get_fields();
// var_dump($fields['hero_carousel']);
?>

<?php global $module; ?>
<div class="home-block hero__block media-block mobile-detect "><!-- ADD .VIDEO-BLOCK CLASS if YOU NEED TO -->
	<?php foreach($fields['hero_module'] as $slide ) : ?>
		
	
    <div class="block-content">
        <div class="background" style="background-image: url(<?= $slide['hero_image']['url']; ?>)">
            <?php

            if ( !empty($slide['hero_mobile_image']) ) :
              
                $mobile_img = $slide['hero_mobile_image']['url'];
            ?>
            <div class="mobile-bg" style="background-image: url(<?=$mobile_img?>);"></div><!-- .mobile-bg -->
            <?php endif; ?>
            
        
            
        </div><!-- .background -->


        <div class="contain">
        
            <div class="inner">
                <div class="heading-wrap revealer">
                    <h1 class="h1"><?= $slide['heading']; ?></h1>
                    <p class="primary"><?= $slide['subheading']; ?></p>
                    <div class="button__wrapper">
                    	<?php $cta = $slide['cta_url'] ?>
																
						<?php if(!empty($cta)) : ?>
							<a href="<?= $slide['cta_url']; ?>"><button class="a-btn a-btn--secondary"><?= $slide['cta_text']; ?></button><svg class="icon icon-arrow"><use xlink:href="#icon-arrow"></use></svg></a>

						<?php endif; ?>
					</div>
                    
                    
                      
                    
                </div><!-- .heading-wrap -->
            </div><!-- .inner -->
        </div><!-- .contain -->
        
    </div><!-- .block-content -->
<?php endforeach; ?>
</div><!-- .home-block -->

<div class="how-it-works ">
	<?php foreach($fields['how_it_works'] as $item): ?>
		<?php $bg = $item['how_it_works_background']; ?>
		<?php $heading = $item['how_it_works_heading']; ?>
		<h1><?= $bg; ?></h1>
		<h1><?= $heading; ?></h1>
		<?php foreach($item['how_it_works_text_module'] as $text) : ?>
			<h1><?= $text['text_module_heading']; ?></h1>
			<h1><?= $text['text_module_description']; ?></h1>
		<?php endforeach; ?>
	<?php endforeach; ?>
	

</div><!-- .how-it-works -->







