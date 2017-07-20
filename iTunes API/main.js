/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play

let content = document.querySelector('.content')
let search = document.querySelector('#search_box')
let submit = document.querySelector('button')
let url = 'https://itunes.apple.com/search?term='


submit.addEventListener('click',function(e){
	e.preventDefault()

	let term = search.value
	find(term)

})



function find (term){
	console.log (term)
	fetch(url + term)
	.then (
		function (response){
			if(response.status!== 200) {
				console.log(response.status)
				return;
			} 
		response.json().then(function(details){
			let htmlStr = ''
			let sr = document.querySelector('#sr')
			sr.innerHTML = "Search Results:"

			details.results.map(function(data){
				console.log (data)
				htmlStr += `
					<div class="result_box">
						<a href="${data.previewUrl}"><img src="${data.artworkUrl100}" id="pic"/></a>
						<li id="song"> ${data.trackName} </li>
						<li id="band"> ${data.artistName} </li>
					</div>
					`
				})
			content.innerHTML = htmlStr
				let preview = document.querySelectorAll('.result_box a')

				preview.forEach(function(e){
					e.addEventListener('click',function(event){
						event.preventDefault();
						let url = e.getAttribute('href')
						document.querySelector('audio').setAttribute('src',url);
					})
				})
			})
		})
	}
	