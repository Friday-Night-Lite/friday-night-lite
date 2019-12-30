import React from 'react'

export const returnText = play => {
  const {
    kickType,
    playType,
    gainLoss,
    playDist,
    player1,
    player2,
    kicker,
    afterTD,
    result,
    min,
    sec,
    penTeam,
    penalty,
    yards
  } = play
  
  if (playType === 'Run') {
    return (<p>{`${playType} by ${player1} with a ${gainLoss} of ${playDist} 
      yards, resulting in a ${result}.(${min.length === 1 ? `0${min}` : `${min}`}: ${sec.length === 1 ? `0${sec})` : `${sec})`}`}</p>)
  } else if (playType === 'Pass') {
    return (
      <p>{`${playType} by ${player1} to ${player2} with a ${gainLoss} of ${playDist} yards, resulting 
      in a ${result}.(${min.length === 1 ? `0${min}` : `${min}`}:${sec.length === 1 ? `0${sec})` : `${sec})`}`}</p>
    )
  } else if (kickType === 'field goal attempt')
    {return <p>{`${result} ${playDist} yard ${kickType} by ${player1}`}</p>
  } else if (afterTD === 'pat') {
  return <p>{`${result} attempt by ${kicker}.`}</p>
  }else if (playType === 'penalty') {
  return <p>{`Penalty on the ${penTeam} team, ${penalty} by ${player1} for ${yards.toString()} yards.`}</p>
  }
}
