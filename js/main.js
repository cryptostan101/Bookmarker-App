

// target form and listen for submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);


function saveBookmark(event) {
	// body...

	// get forms values

	var siteName = document.getElementById('siteName').value;
	var siteUrl = document.getElementById('siteUrl').value;

	//console.log(siteName);
	//console.log(siteUrl);


	if(!validateForm(siteName, siteUrl)){
		return false;
	}


	// create bookmark object
	var bookmark = {

		name: siteName,
		url:  siteUrl
	}

	// store bookmark in local storage

	if (localStorage.getItem('bookmarkArry') === null){

		// initialize an array
		var bookmarkArry = [];

		// add bookmark to array
		bookmarkArry.push(bookmark);

		// set localstorage
		localStorage.setItem('bookmarkArry', JSON.stringify(bookmarkArry));


	}

	else{

		// get bookmark from localstorage
		var bookmarkArry = JSON.parse(localStorage.getItem('bookmarkArry'));

		// add bookmark to array
		bookmarkArry.push(bookmark);

		// reset back to localstorage
		localStorage.setItem('bookmarkArry', JSON.stringify(bookmarkArry));
	}


			// Clear form
		document.getElementById('myForm').reset();

		// Re-fetch bookmarks
		fetchBookmarks();

		// prevent form from submitting
		event.preventDefault();


}


// Delete bookmark
function deleteBookmark(url){
  // Get bookmarks from localStorage
  var bookmarkArry = JSON.parse(localStorage.getItem('bookmarkArry'));
  // Loop through the bookmarks
  for(var i =0;i < bookmarkArry.length;i++){
    if(bookmarkArry[i].url == url){
      // Remove from array
      bookmarkArry.splice(i, 1);
    }
  }
  // Re-set back to localStorage
  localStorage.setItem('bookmarkArry', JSON.stringify(bookmarkArry));

  // Re-fetch bookmarks
  fetchBookmarks();
}


// fetch bookmark

function fetchBookmarks() {

			// get bookmark from localstorage
		var bookmarkArry = JSON.parse(localStorage.getItem('bookmarkArry'));

		// Get output id
 		var bookmarksResults = document.getElementById('bookmarksResults');

		// Build output
  	bookmarksResults.innerHTML = '';

		for(var i = 0; i < bookmarkArry.length; i++){

	    var name = bookmarkArry[i].name;
	    var url = bookmarkArry[i].url;

			bookmarksResults.innerHTML += '<div class="card card-body bg-light">'+
															'<h3>'+ name +
															' <a class="btn btn-success" target="_blank" href="'+url+'">Visit</a> ' +
															' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +
															'</h3>'+
															'</div>';



	  }



}


// Validate Form
function validateForm(siteName, siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if(!siteUrl.match(regex)){
    alert('Please use a valid URL');
    return false;
  }

  return true;
}
