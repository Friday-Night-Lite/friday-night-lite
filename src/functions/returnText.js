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

  if (playType === 'Run' || playType === 'Kick return') {
    return (
      <p>{` ${playType} by ${player1} with a ${gainLoss} of ${playDist} 
      yards, resulting in a ${result}.(${
        min.length === 1 ? `0${min}` : `${min}`
      }: ${sec.length === 1 ? `0${sec})` : `${sec})`}`}</p>
    )
  } else if (playType === 'Pass') {
    return (
      <p>{` ${playType} by ${player1} to ${player2} with a ${gainLoss} of ${playDist} yards, resulting 
      in a ${result}.(${min.length === 1 ? `0${min}` : `${min}`}:${
        sec.length === 1 ? `0${sec})` : `${sec})`
      }`}</p>
    )
  } else if (kickType === 'field goal attempt') {
    return <p>{` ${result} ${playDist} yard ${kickType} by ${player1}`}</p>
  } else if (afterTD === 'pat') {
    return <p>{` ${result} attempt by ${kicker}.`}</p>
  } else if (playType === 'penalty') {
    return (
      <p>{` Penalty on the ${penTeam} team, ${penalty} by ${player1} for ${yards.toString()} yards.(${
        min.length === 1 ? `0${min}` : `${min}`
      }: ${sec.length === 1 ? `0${sec})` : `${sec})`}`}</p>
    )
  }else if (kickType === 'punt') {
    return (
  <p>{` ${playDist} yard punt by ${player1}, resulting in a ${result}.(${
        min.length === 1 ? `0${min}` : `${min}`
      }: ${sec.length === 1 ? `0${sec})` : `${sec})`}`}</p>
    )
  }else if (playType === 'sack') {
    return (
  <p>{`${player1} tackled in the backfield for a loss of ${playDist}, resulting in a ${result}.(${
        min.length === 1 ? `0${min}` : `${min}`
      }: ${sec.length === 1 ? `0${sec})` : `${sec})`}`}</p>
    )
  }else if (playType === 'Incomplete pass') {
    return (
      <p>{` ${playType} by ${player1} to ${player2}, resulting 
      in a ${result}.(${min.length === 1 ? `0${min}` : `${min}`}:${
        sec.length === 1 ? `0${sec})` : `${sec})`
      }`}</p>
    )
  }
}
