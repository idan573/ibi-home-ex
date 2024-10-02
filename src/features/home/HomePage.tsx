import React from "react";
import "./HomePage.scss";
import Player from "./components/Player/Player";
import Dice from "./components/Dice/Dice";
import CenterPanel from "./components/CenterPanel/CenterPanel";
import Button from "../../library/Button/Button";
import Input from "../../library/Input/Input";
import Popup from "./components/Popup/Popup";

/*
flow: 
1. first Player roll the Dices - using random function
2. Take dices result - pass condition - 
   if condition is true - run function end turn, change current player 
     store player result 
   false - 
   increment current dice 
   user click on shift / dice
   dice - back to 2
   shift - change current player - round + 1
   store round result
*/
const Players = [
  { title: "Player 1", id: "1", isActive: true },
  { title: "Player 2", id: "2", isActive: true },
];
const scores = new Map<string,number>();

//Default consts
const BAD_LUCK_NUMBER = 6;
const DICE_COUNT = 6;
const WINNING = 20;

const HomePage: React.FC = () => {

  const PlayersRef = React.useRef(Players);
  const playersCount = Players.length;
  const scoresRef = React.useRef(scores);
  const [isGameEnd, setIsGameEnd] = React.useState<boolean>(false);
  const [currentScore, setCurrentScore] = React.useState<number>(0);
  const [dice1Value, setDice1Value] = React.useState<number>();
  const [dice2Value, setDice2Value] = React.useState<number>();
  const [count, setCount] = React.useState<number>(0);
  const [showPopup, setShowPopup] = React.useState<boolean>(false);

  //settings
  const [limit, setLimit] = React.useState<number>(WINNING);
  const [scoreInitiator, setScoreInitiator] =
    React.useState<number>(BAD_LUCK_NUMBER);
  
  // Track game number
  const [gameNumber, setGameNumber] = React.useState<number>(1);

  React.useEffect(() => {
    // Load game number and previous scores from localStorage
    const storedGameNumber = localStorage.getItem("gameNumber");
    if (storedGameNumber) {
      setGameNumber(parseInt(storedGameNumber, 10));
    }
  }, []);

  const endGame = React.useCallback(() => {
    // Store the results in localStorage
    const gameScores = PlayersRef.current.map((player) => ({
      player: player.title,
      score: scoresRef.current.get(player.id) ?? 0,
    }));
    const gameData = {
      gameNumber,
      scores: gameScores,
    };

    localStorage.setItem(`game-${gameNumber}`, JSON.stringify(gameData));

    // Increment and store the next game number
    setGameNumber((prevGameNumber) => {
      const nextGameNumber = prevGameNumber + 1;
      localStorage.setItem("gameNumber", nextGameNumber.toString());
      return nextGameNumber;
    });

    // Reset the players for the new game
    PlayersRef.current.map((player) => (player.isActive = true));
    setIsGameEnd(true);
  }, [gameNumber]);

  const diceOnClick = React.useCallback(() => {
    // Genrate random number
    const number = Math.floor(Math.random() * DICE_COUNT) + 1;
    setDice1Value(number);
    const number2 = Math.floor(Math.random() * DICE_COUNT) + 1;
    setDice2Value(number2);

    const activePlayer = PlayersRef.current[count % playersCount];
    if (number === scoreInitiator && number2 === scoreInitiator) {
      setShowPopup(true);
      activePlayer.isActive = false;
      scoresRef.current.set(activePlayer.id, 0);
      setCurrentScore(0);
      if (!PlayersRef.current[(count + 1) % playersCount].isActive) {
        setIsGameEnd(true);
        //activate the players for a new game
        PlayersRef.current.map((player) => (player.isActive = true));
        endGame();
        return;
      }

      setCount(count + 1);
      return;
    }

    setCurrentScore(currentScore + number + number2);
  }, [count, playersCount, scoreInitiator, currentScore, endGame]);

  const holdOnClick = React.useCallback(() => {
    const activePlayer = PlayersRef.current[count % playersCount];
    const activePlayerScore = scoresRef.current.get(activePlayer.id) ?? 0;
    const accumulatedScore = currentScore + activePlayerScore;
    scoresRef.current.set(activePlayer.id, accumulatedScore);
    if (accumulatedScore > limit) {
      setIsGameEnd(true);
      activePlayer.isActive = false;
      endGame();
    }

    let newCount = count + 1;

    if (!PlayersRef.current[newCount % playersCount].isActive) {
      newCount += 1;
    }
    setCurrentScore(0);
    setCount(newCount);
  }, [count, currentScore, endGame, limit, playersCount]);

  const onResetClick = React.useCallback(() => {
    PlayersRef.current.forEach((p) => p.isActive == true);
    scoresRef.current = new Map<string, number>()    
    setCount(0);
    setIsGameEnd(false);
  }, []);

  
  return (
    <div className="page-container">
      {showPopup && <Popup text={"OMG your score is 0!"} onClose={function (): void {
          setShowPopup(false);
        } } />}
      <div>Game Number: {gameNumber}</div>
      {PlayersRef.current.map((p, key) => (
        <Player key={key} playerTitle={p.title} playerScore={scoresRef.current.get(p.id) ?? 0} />
      ))}
      <div className='dice-container'>

       <Dice value={dice1Value ?? 0} />
       <Dice value={dice2Value ?? 0} />
      </div>
      <CenterPanel
        currentScore={currentScore}
        isGameEnd={isGameEnd}
        holdOnClick={holdOnClick}
        diceOnClick={diceOnClick}
        activePlayer={PlayersRef.current[count % Players.length].title}
      />
      <div
        style={{
          marginTop: "10px",
          display: "flex",
          gap: "5px",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Button onClick={onResetClick} fill="primary" size="medium">
          Reset
        </Button>
        <div style={{ position: "relative" }}>Winning:</div>
        <Input
          size="medium"
          value={limit.toString()}
          onChange={(e) => setLimit(+e.target.value)}
        />
        <div style={{ position: "relative" }}>Score initiator (Double):</div>
        <Input
          size="medium"
          value={scoreInitiator.toString()}
          onChange={(e) => setScoreInitiator(+e.target.value)}
        />
        {isGameEnd && "  Game over!"}
        
        {isGameEnd &&
          PlayersRef.current.map((player) => {
            return scoresRef.current.get(player.id) ?? 0 > limit ? (
              <div> {`Player ${player.title} has won!`} </div>
            ) : (
              <></>
            );
          })}
      </div>
    </div>
  );
};

export default HomePage;
