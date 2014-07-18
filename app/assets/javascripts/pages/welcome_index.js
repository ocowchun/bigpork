(function($) {
	var handler = null,
		page = 1,
		isLoading = false,
		apiURL = 'feeds.json',
		$select_school = $('#select_school'),
		$tiles = $('#tiles'),
		current_school = "beautyinmcu",
		$school_menu = $('#school_menu'),
		$alertSuccess = $('#alertSuccess'),
		$alertError = $('#alertError');

	$school_menu.show();

	$('.menu').click(function(e) {
		$('.drawer').toggleClass('active');
		e.preventDefault();
	});

	$('.menu').click(function(e) {
		$('.menu').toggleClass('pink');
		e.preventDefault();
	});

	// Prepare layout options.
	var options = {
		autoResize: true, // This will auto-update the layout when the browser window is resized.
		container: $('#tiles'), // Optional, used for some extra CSS styling
		offset: 2, // Optional, the distance between grid items
		itemWidth: 210 // Optional, the width of a grid item
	};


	$select_school.on("click", "a", function(e) {
		current_school = $(this).attr("href").replace("#", "");
		console.log(current_school);
		page = 1;
		$tiles.html("");
		loadData();
		closeMenu();
		NProgress.start();
	});

	$tiles.on("click", "i.fa-heart", function() {
		var object_id = $(this).attr("oid");
		var feed_id = $(this).attr("fid");
		likeImage(object_id, feed_id)
		// console.log("this");
	});



	/**
	 * When scrolled all the way to the bottom, add more tiles.
	 */
	function onScroll(event) {
		// Only check when we're not still waiting for data.
		if (!isLoading) {
			// Check if we're within 100 pixels of the bottom edge of the broser window.
			var closeToBottom = ($(window).scrollTop() + $(window).height() > $(document).height() - 100);
			if (closeToBottom) {
				loadData();
			}
		}
	};



	function closeMenu() {
		$school_menu.click();
	}

	function likeImage(object_id, feed_id) {
		$.post("/stars", {
			object_id: object_id,
			feed_id: feed_id
		}).done(lekeImageSucceed)
	}

	function lekeImageSucceed(result) {
		var message = result.message;
		if (result.state == "success") {
			showSuccessMessage(message)

		} else {
			showErrorMessage(message)
		}
	}

	function showSuccessMessage(message) {
		$alertSuccess.show();
		$alertSuccess.text("成功加入收藏!");
		setTimeout(function() {
			$alertSuccess.hide();
		}, 3000)
	}

	function showErrorMessage(message) {
		$alertError.show();
		$alertError.text("噢!你要先登入才能收藏");
		setTimeout(function() {
			$alertError.hide();
		}, 3000)
	}


	/**
	 * Refreshes the layout.
	 */
	function applyLayout() {
		options.container.imagesLoaded(function() {
			// Create a new layout handler when images have loaded.
			handler = $('#tiles li');
			handler.wookmark(options);
		});
		NProgress.done();
	};


	/**
	 * Loads data from the API.
	 */
	function loadData() {
		isLoading = true;
		$('#loaderCircle').show();

		$.ajax({
			url: apiURL,
			data: {
				page: page,
				school: current_school
			}, // Page parameter to make sure we load new data
			success: onLoadData
		});
		NProgress.start();
	};

	/**
	 * Receives data from the API, creates HTML for images and updates the layout
	 */
	function onLoadData(result) {

		isLoading = false;
		$('#loaderCircle').hide();

		// Increment page index for future calls.
		page = result.next_page;

		var data = result.feeds;
		// Create HTML for the images.
		var html = '';
		var i = 0,
			length = data.length,
			image;
		for (; i < length; i++) {
			image = data[i];
			html += '<li>'
			// Image tag (preview in Wookmark are 200px wide, so we calculate the height based on that).
			html += '<a  data-lightbox="image-1" href=' + image.preview + ' >'
			html += '<img  src="' + image.preview + '" width="200" height="' + Math.round(image.height / image.width * 200) + '"></a>';

			var socialMeta = getSocialMeta(image);
			// Image title.
			html += '<div class="imgcontent">' + '<p>' + image.title + '</p>' + socialMeta + '</div>';
			// html+=;
			html += '</li>';

		}

		// Add image HTML to the page.
		$('#tiles').append(html);

		// Apply layout.
		applyLayout();
	};


	function getSocialMeta(image) {
		var fid = image.id,
			object_id = image.object_id,
			feedUrl = "https://www.facebook.com/" + fid;
		var socialMeta = '<p><i class="fa fa-heart fa-like" oid="#oid" fid="#fid"></i>'.replace('#oid', object_id).replace('#fid', fid);
		socialMeta += '<a href="' + feedUrl + '" target="_blank"><i class="fa fa-facebook-square fa-fb"></i></a></p>';
		return socialMeta;
	}


	// Capture scroll event.
	$(document).bind('scroll', onScroll);

	// Load first data from the API.
	loadData();


})(jQuery);