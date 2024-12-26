export const calculateScoresAndSort = (playersRecord: any) => {
  // // Convert the players object to an array for easier manipulation
  const playerArray = playersRecord.map((player) => {
    // Calculate total score for each player (ignore null scores)
    const totalScore = Object.values(player.scores).reduce((sum, score) => {
      return !Number.isNaN(score) ? sum + score : sum;
    }, 0);

    return { name: player.name, totalScore };
  });

  // // Sort the players by their total score from low to high
  playerArray.sort((a, b) => a.totalScore - b.totalScore);

  return playerArray;
};
