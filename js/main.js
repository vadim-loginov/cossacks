(function () {
	var app = new Vue({
		el: '#app',
		data: {
			balance: 'Waiting for data...',
			players: []
		},
		created: function () {
			for (let i = 0; i < 11; i++) {
				this.players.push({ id: i, name: `Player ${i + 1}`, wins: null, team: null })
			}
		},
		mounted: function () {
			document.querySelector('input.list__item').focus();
		},
		methods: {
			calcBalance: function () {
				const self = this;
				const sortedPlayers = sortDesc(copyPlayers(this.players));
				const team1 = [sortedPlayers.splice(0, 1)[0]];
				const team2 = [sortedPlayers.splice(0, 1)[0]];

				sortedPlayers.forEach(function(player) {
					if (getTotalWins(team1) > getTotalWins(team2)) {
						team2.push(player);
					} else {
						team1.push(player);
					}
				});

				team1.forEach(function(player) {
					if (player.wins !== null && player.wins !== '') {
						player.modelPlayerLink.team = 1;
					}
				});
				team2.forEach(function(player) {
					if (player.wins !== null && player.wins !== '') {
						player.modelPlayerLink.team = 2;
					}
				});
				outputBalanceString();

				function copyPlayers(players) {
					const arr = [];
					for (let i = 0; i < players.length; i++) {
						arr.push({
							id: players[i].id,
							wins: players[i].wins,
							modelPlayerLink: players[i]
						});
					}
					return arr;
				}

				function sortDesc(arr) {
					return arr.sort(function (a, b) {
						return +(a.wins ||0) > +(b.wins || 0) ? -1 : 1;
					});
				}

				function getTotalWins(arr) {
					return arr.reduce(function(a, b) {
						return a + +(b.wins || 0);
					}, 0);
				}

				function outputBalanceString() {
					self.balance = `Teams: ${getNumbers()} (${getTotalWins(team1)} wins / ${getTotalWins(team2)} wins)`;

					function getNumbers() {
						return self.players.map(p => p.team).join('');
					}
				}
			}
		}
	})
})();