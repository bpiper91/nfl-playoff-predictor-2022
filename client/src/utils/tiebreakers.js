// Expected ObjectmFormat

// teamsArr = [ { Team }, { Team } ]

// team = {
//     name: 'DAL',
//     _id: ...
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

const divisionTieBreaker2 = (teamsArr) => {
    if (teamsArr.length = 2) {
        // if the teams played each other
            // if they played each other once, return the winner first
            // if they played each other twice and one team swept, return the winner first
            // if they played each other twice and one game was a tie, return the winner first
            // otherwise, go to next step

        // if they have different divisional records, return the better record first
            // otherwise, go to next step

        // find the opponents they both played and save the data from those games to a variable in case it's needed later
        // determine each team's record in those games
        // if they have different records in those games, return the better record first
            // otherwise, go to next step

        // if they have different conference records, return the better record first
            // otherwise, go to next step

        // for each team, find the opponent from every game they won
        // add the records of all opponents
        // if they have different combined records, return the better record first
            // otherwise, go to next step
        
        // add the records of every opponent each team played that season
        // if they have differenct combined records, return the better record first
            // otherwise, go to next step

        // calculate each team's ranking in points for and against in the conference
        // add both rankings
        // if the combined ranking numbers are different, return the smaller one first
            // otherwise, go to next step
        
        // calculate each team's ranking in points for and against in the league
        // add both rankings
        // if the combined ranking numbers are different, return the smaller one first
            // otherwise, go to next step

        // using saved common games data, calculate net points scored for each team
        // if their net points values are different, return the higher one first
            // otherwise, go to next step

        // skip combined points raknings, net points, and net TDs tie-breakers (#7-#12 in NFL tie-breakers list) since we don't record scores
        
        // if tie not broken, return both teams in each slot
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