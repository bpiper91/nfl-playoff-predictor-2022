// // compare function for win percentages
// const compareWinPct = (a, b) => {
//     if (a < b) {
//         return -1;
//     } else if (a > b) {
//         return 1;
//     } else {
//         return 0;
//     };
// };



// Expected ObjectmFormat

// teamsArr = [ { Team }, { Team } ]

// team = {
//     name: 'DAL',
//     _id: ...,
//     opponents: [
//         {
//              _id: ...,
//              name: ...,     // include divisional opponents twice,
//              record: ...    // populate at least some data
//         },
//         ...
//     ]
//     games: [
//         {
//             _id: ...,
//             week: 1,
//             homeTeam: DAL._id,
//             awayTeam: TB._id,
//             tie: false,
//             winner: TB._id
//         },
//         ...
//     ],
//     conf: NFC._id,
//     div: NFCE._id,
//     record: .700, // virtual
//     divRecord: .500, // virtual
//     confRecord: .850, // virtual
// }

// commonGames = {
//     games: [
//         {
//             ...
//         },
//         ...
//     ]
// }

// NFL Tie-breaking procedures

// WITHIN A DIVISION

// Two Teams

// 1. Head to Head Record
// 2. Division Record
// 3. Common Games Record
// 4. Conference Record
// 5. Strength of Victory
// 6. Strenth of Schedule
// 7. Combined Conference Ranking in PF and PA
// 8. Combined Leage Ranking in PF and PA
// 9. Net Points in Common Games
// 10. Net Points in All Games
// 11. Net TDs in All Games
// 12. Coin Flip 

// BREAK TWO-TEAM TIE FOR DIVISION WINNER 
// expects two arguments: 1. array of two team objects and 2. current season object
const divisionTieBreaker2 = (teamsArr, season) => {
    if (teamsArr.length === 2) {
        // create an array of head-to-head games
        const headToHeadGames = season.games.filter(game => 
            game.homeTeam === teamsArr[0] && game.awayTeam === teamsArr[1] || 
            game.homeTeam === teamsArr[1] && game.awayTeam === teamsArr[0] 
        );

        // if the teams played each other
        if (headToHeadGames) {
            if (headToHeadGames.length === 1) {
                // if they played each other once, return the winner first
                const teamOne = teamsArr.filter(team => team._id === headToHeadGames[0].winner);
                const teamTwo = teamsArr.filter(team => team._id !== headToHeadGames[0].winner);

                return teamOne.concat(teamTwo);
            } else if (headToHeadGames.length === 2) {
                // if they played each other twice and one team swept, return the winner first
                if (headToHeadGames[0].winner === headToHeadGames[1].winner) {
                    const teamOne = teamsArr.filter(team => team._id === headToHeadGames[0].winner);
                    const teamTwo = teamsArr.filter(team => team._id !== headToHeadGames[0].winner);

                    return teamOne.concat(teamTwo);
                };

                // if they played each other twice and one game was a tie, return the winner first
                if (headToHeadGames[0].tie && !headToHeadGames[1].tie || !headToHeadGames[0].tie && headToHeadGames[1].tie) {
                    const tiebreakerGame = headToHeadGames.filter(game => game.tie === false);

                    const teamOne = teamsArr.filter(team => team._id === tiebreakerGame.winner);
                    const teamTwo = teamsArr.filter(team => team._id !== tiebreakerGame.winner);

                    return teamOne.concat(teamTwo);
                };
            };
            // otherwise, go to next step
        };

        // if they have different divisional records, return the better record first
        if (teamsArr[0].divRecord !== teamsArr[1].divRecord) {
            teamsArr.sort((a, b) => (a.divRecord > b.divRecord) ? -1 : 1);
            return teamsArr;
        };
        // otherwise, go to next step

        // find the opponents they both played and save the data from those games to a variable in case it's needed later
        var commonOpponents = [];

        for ( i=0; i<teamsArr[0].opponents.length; i++ ) {
            if (teamsArr[1].opponents.find(opponent => opponent === teamsArr[0].opponents[i])) {
                if (!commonOpponents.find(teamsArr[0].opponents[i])) {
                    commonOpponents.push(teamsArr[0].opponents[i]);
                };
            };
        };

        // determine first team's record in those games
        var teamZeroCommonGames = [];

        for ( i=0; i<commonOpponents; i++ ) {
            const games = season.games.filter(game => 
                game.homeTeam === teamsArr[0]._id && game.awayTeam === commonOpponents[i] ||
                game.awayTeam === teamsArr[0]._id && game.homeTeam === commonOpponents[i]
            );

            teamZeroCommonGames.push(games);
        };

        const teamZeroTies = teamZeroCommonGames.filter(game => game.tie === true);
        const teamZeroWins = teamZeroCommonGames.filter(game => game.winner === teamsArr[0]._id);
        const teamZeroWinPct = teamZeroWins.length / ( teamZeroCommonGames.length - teamZeroTies.length );

        // determine second team's record in those games
        var teamOneCommonGames = [];

        for ( i=0; i<commonOpponents; i++ ) {
            const games = season.games.filter(game => 
                game.homeTeam === teamsArr[1]._id && game.awayTeam === commonOpponents[i] ||
                game.awayTeam === teamsArr[1]._id && game.homeTeam === commonOpponents[i]
            );

            teamOneCommonGames.push(games);
        };

        const teamOneTies = teamOneCommonGames.filter(game => game.tie === true);
        const teamOneWins = teamOneCommonGames.filter(game => game.winner === teamsArr[1]._id);
        const teamOneWinPct = teamOneWins.length / ( teamOneCommonGames.length - teamOneTies.length );

        // if they have different records in those games, return the better record first
        if (teamZeroWinPct > teamOneWinPct) {
            return teamsArr;
        } else if (teamZeroWinPct < teamOneWinPct) {
            const arr = [ teamsArr[1], teamsArr[0] ];
            return arr;
        }
        // otherwise, go to next step    

        // if they have different conference records, return the better record first
        if (teamsArr[0].confRecord !== teamsArr[1].confRecord) {
            teamsArr.sort((a, b) => (a.confRecord > b.confRecord) ? -1 : 1);
            return teamsArr;
        };
        // otherwise, go to next step

        // for each team, find the opponent from every game they won
        // add the records of all opponents
        // if they have different combined records, return the better record first
        // otherwise, go to next step
        
        // add the records of every opponent first team played that season
        var teamZeroOppCombinedWinPct = 0;

        for ( i=0; i<teamsArr[0].opponents; i++) {
            // add each opponent and calculate combined win percentage
        };
        // add the records of every opponent second team played that season

        // if they have differenct combined records, return the better record first
        // otherwise, go to next step

        // skip combined points raknings, net points, and net TDs tie-breakers (#7-#12 in NFL tie-breakers list) since we don't record scores
        
        // if tie not broken, return array with TIE as first item
        return [ "TIE", teamsArr[0], teamsArr[1] ];

    };
};

// Three Or More Teams

// If two teams are tied after one or more are eliminated, use 2-team format above

// 1. Head to Head Record
// 2. Division Record
// 3. Common Games Record
// 4. Conference Record
// 5. Strength of Victory
// 6. Strenth of Schedule
// 7. Combined Conference Ranking in PF and PA
// 8. Combined League Ranking in PF and PA
// 9. Net Points in Common Games
// 10. Net Points in All Games
// 11. Net TDs in All Games
// 12. Coin Flip 

const divisionTieBreaker3 = (teamsArr) => {
    // if a team is eliminated to leave two, store eliminated team in new array and run divTieBreaker2
    // after divTieBreaker2 runs, combine the arrays and return all teams in order

    // get all games the teams played against each other
        // if one or more teams had a better record in those games, return that/those teams first
            // otherwise, go to next step

    // if they have different divisional records, return the better record first
            // otherwise, go to next step

    // find the opponents that all of the teams played and save the data from those games to a variable in case it's needed later
        // determine each team's record in those games
        // if they have different records in those games, return the teams in order of record
            // otherwise, go to next step

    // if they have different conference records, return them in order
        // otherwise, go to next step

    // strength of victory

    // strength of schedule

    // skip combined points raknings, net points, and net TDs tie-breakers (#7-#12 in NFL tie-breakers list) since we don't record scores

    // if tie not broken, return multiple teams in each slot
};

// ---------------------------------------------------------------------------------------------------


// FOR THE WILDCARD

// Two Teams

// 1. Head to Head Record (if applicable)
// 2. Conference Record
// 3. Common Games Record (minimum of 4 games)
// 4. Strength of Victory
// 5. Strength of Schedule
// 6. Combined Conference Ranking in PF and PA
// 7. Combined League Ranking in PF and PA
// 8. Net Points in Conference Games
// 9. Net Points in All Games
// 10. Net TDs in All Games
// 11. Coin Flip

// Three or More Teams

// If two teams remain tied, restart at step 1 of the 2-team format above
// If three remain after a 4th is eliminated, restart at step 2 below.

// 1. Division tiebreaker to eliminate all but the highest ranked team in each division
// 2. Head to Head Sweep (if applicable - beat or lost to all others)
// 3. Conference Record
// 4. Common Games Record (minimum 4 games)
// 5. Strength of Victory
// 6. Strength of Schedule
// 7. Combined Conference Ranking in PF and PA
// 8. Combined League Ranking in PF and PA
// 9. Net Points in Conference Games
// 10. Net Points in All Games
// 11. Net TDs in All Games
// 12. Coin Flip

const wilcardTieBreaker2 = (teamsArr) => {
    // tie-breaker logic
};

const wildcardTieBreaker3 = (teamsArr) => {
    // tie-breaker logic

    // if a team is eliminated to leave two, store eliminated team in new array and run divTieBreaker2
    // after divTieBreaker2 runs, combine the arrays and return all teams in order
};