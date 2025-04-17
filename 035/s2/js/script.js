    // create a new `Date` object
	const now = new Date();

	// create a new variable for the 'season line'
	let theSeason = document.getElementById('polyline1');

	// get the current date and time as a string, for use in an 'updated at' value
	const currentDateTime = now.toLocaleString();

	// console.log(currentDateTime);
	// document.getElementById('updatedAt').innerHTML = "updated at: " + currentDateTime;
	
	// Getting full month name (e.g. "June")
	var month = now.toLocaleString('default', { month: 'long' });
	// console.log(month);
	
	let day = now.getDate();
//	let month = now.getMonth() + 1;
	let year = now.getFullYear();

	// This arrangement can be altered based on how we want the date's format to appear.
	let currentDate = `${month} ${day} ${year}`;
	// console.log(currentDate); // "17-6-2022"
	// document.getElementById('theDate').innerHTML = "Info for " + currentDate;
	
	
	fetch('https://statsapi.mlb.com/api/v1/standings?leagueId=103')
     .then(response => response.json())
     .then(data => {
	const standings = data.records;
	const standingsBody = document.getElementById('standingsBody');

	standings.forEach(record => {
		const divisionName = record.division.name;
		record.teamRecords.forEach(teamRecord => {
			const team = teamRecord.team;
			const teamID = teamRecord.team.id;
			// console.log(teamID);

			let winningPercentage = teamRecord.winningPercentage;
			winningPercentage = Number(winningPercentage).toLocaleString(undefined,{style: 'percent', minimumFractionDigits:2}); 
//					console.log(winningPercentage);

			let gamesPlayed = teamRecord.gamesPlayed;
			let theWins = teamRecord.wins;

			let theLosses = teamRecord.losses;
			let theStreak = teamRecord.streak.streakCode;

			const row = document.createElement('tr');
			row.innerHTML = `
				<td>${team.name}</td>
				<td>${teamRecord.wins}</td>
				<td>${teamRecord.losses}</td>
				<td>${winningPercentage}</td>
				<td>${teamRecord.leagueGamesBack}</td>
				<td>${teamRecord.streak.streakCode}</td>
			`;
			// standingsBody.appendChild(row);
			if (teamID === 111) {
			  // console.log("BoSox");

			let teamSplit = teamRecord.records.splitRecords;
			// console.log(homeWins);
			// Initialize variables to store home and away records
			let homeWins = 0;
			let homeLosses = 0;
			let awayWins = 0;
			let awayLosses = 0;

			// Iterate through the array to find home and away records
			for (let i = 0; i < teamSplit.length; i++) {
				const record = teamSplit[i];
				if (record.type === 'home') {
					homeWins = record.wins;
					homeLosses = record.losses;
				} else if (record.type === 'away') {
					awayWins = record.wins;
					awayLosses = record.losses;
				}
			}

			// document.getElementById('hwins').innerHTML = homeWins;
			// document.getElementById('hlosses').innerHTML = homeLosses;

			// document.getElementById('awins').innerHTML = awayWins;
			// document.getElementById('alosses').innerHTML = awayLosses;
			 document.getElementById('numGames').innerHTML = gamesPlayed;
			// document.getElementById('season').value = gamesPlayed;
			 document.getElementById('wins').innerHTML = theWins + " wins";
			 document.getElementById('losses').innerHTML = theLosses + " losses";
			document.getElementById('streak').innerHTML = theStreak;

			}

		});
	});
})
.catch(error => console.error('Error fetching data:', error));

$(document).ready(function() {
	// Calculate yesterday's and today's date
	var yesterday = new Date();
	yesterday.setDate(yesterday.getDate() - 1);
	var yesterdayStr = yesterday.toISOString().split('T')[0];
	var todayStr = new Date().toISOString().split('T')[0];

	// API endpoints
	var yesterdayUrl = `https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=${yesterdayStr}&endDate=${yesterdayStr}`;
	var todayUrl = `https://statsapi.mlb.com/api/v1/schedule/games/?sportId=1&startDate=${todayStr}&endDate=${todayStr}`;

	// Function to fetch data from API for previous game score
	function fetchData(url) {
		$.getJSON(url, function(data) {
			var games = data.dates[0].games;
			var score = "No Boston Red Sox game found.";

			// Find the latest game involving Boston Red Sox
			games.forEach(function(game) {

				// first, focus only on Sox games
				if (game.teams.away.team.name === "Boston Red Sox" || game.teams.home.team.name === "Boston Red Sox") {
					
					let prevGameVenue = game.venue.name;
					let prevGameVenueID = game.venue.id;
					// console.log(prevGameVenue + "," + prevGameVenueID);
					// document.getElementById('lgvname').innerHTML = "Previous park: " + prevGameVenue;
					
					findPark(prevGameVenueID,prev);
				// determine if the game is away or home for Sox
				if (game.teams.away.team.name === "Boston Red Sox") {
				  // console.log('away game');
				//  $('.iconTest').css('background-image', 'url(css/(noun-plane-6689410.svg)');
//				document.getElementById('locationType').style.backgroundImage="url(css/noun-plane-6689410.svg)";
				} else if (game.teams.home.team.name === "Boston Red Sox") {
				   // console.log('home game');
//				   document.getElementById('locationType').style.backgroundImage="url(css/noun-home-6708524.svg)";
				} else {
				  // console.log('home game?');
				}
				score = game.teams.away.team.name + " " + game.teams.away.score + "<br />" + game.teams.home.team.name + " " + game.teams.home.score;
				}
				
			});

			$('#score').html(score);
		});
	}

// logic to check for previous game if an off-day
	// Fetch yesterday's games
	fetchData(yesterdayUrl);

	// If no game found yesterday, fetch today's games
	if ($('#score').text() === "No Boston Red Sox game found.") {
		fetchData(todayUrl);
	}
});






let theOneToErase = 'gen';
let prev = 'p_';
let next = 'n_';
// as an independent function instead
// this will take the venue ID or prevGameVenueID from (initially) line 129 and process it through the function 
function findPark(venueID,which) {
	// define myResult to find the index of checkID in the stadiumids array
	// the value of checkID is determined (returned from) the checkID function
	// let theStadiumIndex = stadiumid.findIndex(checkID);
	// console.log(which);

	// the checkID function will return a value, sid (short for stadium ID) based on its internal logic
	function checkID(sid) {
  	    // here the function looks for the index of the item that matches the passed venueID
		return sid == venueID;
	}
	
	// console.log(theStadiumIndex);
	// console.log(cssids[theStadiumIndex]);
	
	
	// erase the ones to be erased (initially, #gen)
	$('#' + which + theOneToErase).addClass("undraw");
	// $('#n_' + theOneToErase).addClass("undraw");
	// draw the park corresponding to the id that's been passed
	// $('#' + which + cssids[theStadiumIndex]).addClass("draw");
	// $('#n_' + cssids[theStadiumIndex]).addClass("draw");
	
};