// IE console polyfill
if (typeof console == "undefined"){this.console = {log: function(){}}};

// Init view
$(function() {FCS.view.init()});

//  ===============
//  = FCS library =
//  ===============

var FCS = {
	social : {

		fb : {
			share : function (){
				console.log(this+" called")
				$("#facebookNativeShareButton").click();				
			}
		},

		tw : {
			share : function(){
				window.open ("https://twitter.com/share?url="+window.location.href,"shareWindow","status=0,toolbar=0,menubar=0,resizable=1,width=500,height=300");			
			}
		},
		gp : {
			share : function(){
				var title = "";
				window.open ("https://plusone.google.com/_/+1/confirm?hl=ru&url="+window.location.href+"&title="+title,"shareWindow","status=0,toolbar=0,menubar=0,resizable=1,width=450,height=400");
			}
		}


	},

	view : {
		videoOverlay : function () {
			$('#overlay, #popup').fadeIn().click(function(){ $('#overlay, #popup').fadeOut(); });        
		},
		init: function (){
			// Bind share buttons
			$("#buttonShareFacebook").click(FCS.social.fb.share);
			$("#buttonShareTwitter").click(FCS.social.tw.share);
			$("#buttonShareGoogle").click(FCS.social.gp.share);			
			
			// Bind video overlay button
			$(".firmPlayVid").click(FCS.view.videoOverlay);

			// Extra lines for lovely IE6 -> hover effect
			$('.shareButton, .firmPlayVid').each(function(){
				$(this).hover (function () {
					  $(this).addClass ("hover");
					}, function () {
					  $(this).removeClass ("hover");
				});
			});
		} // end of init()
	},
	controller : {
		validate : {
			min : function (input,min){
				return input.length >= min;
			},
			minmax : function (input,range){
				return input.length <= range.max && input.length >= range.min;
			},
			required : function (input){
				return this.min(input,1);
			},
			email : function (input){
				//var pattern = /^[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&\'*+\\/=?^_`{|}~-]+)*@(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?$/;
				var pattern = /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{1,4}$/;
				return new RegExp (pattern).test(input);
			},
			checked : function (input){
				return input.is(":checked");
			}
		}
	}
}

FIRM = {
	validateForm : function (){
		console.log('Validating:');
		/*
			FIELD LIST
			contestant-firstName
			contestant-lastName
			contestant-phone DONT VALIDATE
			contestant-dateOfBirth-year
			contestant-dateOfBirth-month
			contestant-dateOfBirth-day
			contestant-city
			contestant-address
			contestant-email
			contestant-answer-value
			recaptcha_response_field
		*/

		var $error = {};

		// Ranges

		var year = {
			min : $('#contestant-dateOfBirth-year option:first').val(),
			max : $('#contestant-dateOfBirth-year option:last').val()
		};

		var month = {
			min : 1,
			max : 12
		};

		var day = {
			min : 1,
			max : 31
		};

		if (!FCS.controller.validator.required( $('#contestant-firstName') ))
			$error.push("firstname fail"); 

		if (!FCS.controller.validator.required( $('#contestant-lastName') ))
			$error.push("lastName fail"); 

		if (
			!FCS.controller.validator.minmax( $('#contestant-dateOfBirth-year'), age ) ||
			!FCS.controller.validator.minmax( $('#contestant-dateOfBirth-month'), month ) ||
			!FCS.controller.validator.minmax( $('#contestant-dateOfBirth-day'), day ) ){
			
			$error.push("birthdate fail"); 
		}

		if (!FCS.controller.validator.required( $('#contestant-city') ))
			$error.push("city fail");

		if (!FCS.controller.validator.required( $('#contestant-address') ))
			$error.push("address fail"); 

		if (!FCS.controller.validator.email( $('#contestant-email') ))
			$error.push("email fail");		
	}
}



















