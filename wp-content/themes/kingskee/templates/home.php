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

<div class="how-it-works hero__block hero__block--relative ">
	<?php foreach($fields['how_it_works'] as $item): ?>
		<?php $bg = $item['how_it_works_background']; ?>
		<?php $heading = $item['how_it_works_heading']; ?>
        <div class="background" style="background-image: url(<?= $bg['url']; ?>)"></div>
        <div class="contain">
            <div class="inner">
                <h2 class="h2"><?= $heading; ?></h1>
                <div class="info__wrapper">
            		<?php foreach($item['how_it_works_text_module'] as $text) : ?>
                        <div class="info__stat">
                			<h4 class="h4"><?= $text['text_module_heading']; ?></h4>
                			<p class="primary"><?= $text['text_module_description']; ?></p>
                        </div>
            		<?php endforeach; ?>
                </div>
                
            </div>
        </div>
        
	<?php endforeach; ?>
	

</div><!-- .how-it-works -->


<?php /*

    <form action="/charge" method="post" id="payment-form">
      <div class="form-row">
        <label for="card-element">
          Credit or debit card
        </label>
        <div id="card-element">
          <!-- A Stripe Element will be inserted here. -->
        </div>

        <!-- Used to display form errors. -->
        <div id="card-errors" role="alert"></div>
      </div>

      <button>Submit Payment</button>
    </form>
     */  ?>
<div class="main__form hero__block hero__block--relative">
    <div class="contain">
        <div class="inner">
            <div class="form__wrapper">
                <div class="container madlibs-container">
                    <h2 class="h5 h5--white">Let's get started it only takes a few minutes</h2>
                    <div class="madlibs is-active">
                        <span class="h2 h2--sans">I'd like to go: </span>
                        <select class="site__dropdown">
                            <option value="hiking">Hiking</option>
                            <option value="skiing">Skiing</option>
                            
                        </select>
                    </div>
                    <div class="madlibs  is-active">
                        <span class="h2 h2--sans">My budget is</span>
                        <select class="site__dropdown">
                            <option value="500">$500</option>
                            <option value="1000">$1000</option>
                            
                        </select>
                        <div class="button__wrapper">
                            <a href="#"><button class="a-btn a-btn--secondary">Next Step</button><svg class="icon icon-arrow"><use xlink:href="#icon-arrow"></use></svg></a>
                        </div>
                    </div>
                    <div class="madlibs  is-invisible input">
                        <div class="input__wrapper">
                            <span class="label">Your Name</span>
                            <div class="input">
                                <input type="text" name="" class="site__input">
                                <span class="borders"></span>
                                
                            </div>
                        </div>
                        <div class="input__wrapper">
                            <span class="label">Email Address</span>
                            <div class="input">
                                <input type="email" name="" class="site__input email__input">
                                <span class="borders"></span>
                            </div>
                        </div>
                    </div>
                    <div class="madlibs is-invisible submit">
                        <div class="button__wrapper">
                            <a href="mailto:joe@example.com" ><button class="a-btn a-btn--secondary submit-form">Submit</button><svg class="icon icon-arrow"><use xlink:href="#icon-arrow"></use></svg></a>
                        </div>
                    </div>
                    
                </div>
                
                    
            </div>
            
        </div>
        
    </div>
</div><!-- .main__form -->

<div class="about__section hero__block hero__block--relative">
<?php foreach($fields['about_us'] as $section): ?>
    <?php $img = $section['about_us_image']; ?>
    <div class="contain">
        <div class="inner">
            <div class="img__wrapper">
                <img src="<?= $img['url']; ?>" alt="">
            </div>
            <div class="text__wrapper">
                <div class="heading">
                    <h5 class="h5 h5--white"><?= $section['about_us_label']; ?></h5>
                    <h2 class="h2 h2--sans"><?= $section['about_us_heading']; ?></h2>
                </div>
                <p class="primary "><?= $section['about_us_description']; ?></p>
            </div>    
        </div>
    </div>
<?php endforeach; ?>
</div><!--.about__section  -->







