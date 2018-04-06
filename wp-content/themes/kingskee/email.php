<?php 
/* Template Name: Email */
if($_SERVER['REQUEST_METHOD']=="POST"){
    $name = $_POST['name'];
    $visitor_email = $_POST['email'];
    $activity = $_POST['activity'];
    $budget = $_POST['budget'];
    $message = "I would like to go $activity. \n".
            "And my budget is: \n $budget".

    $email_from = 'yourname@yourwebsite.com';

    $email_subject = "New Form submission";

    $email_body = "You have received a new message from the user $name.\n".
                        "Here is the message:\n $message".

    $to = "remykartzman@gmail.com";
    $headers = "From: name@your-website.com";
    $headers .= "Reply-To: $visitor_email";    


    if(mail($to,$email_subject,$email_body, "From: $email_from")){
        echo "yes we sent it";
        echo "We have sent the password reset link to your  email address <b>"; 
    }

}
?>
<h1>Thanks for submitting</h1>