import { useState } from 'react';
import { computeRandomSecret, isValidGuess, computeResult } from './game-functions';
import 'milligram';
import './App.css';

function Input(props) {
  const [inputString, setInputString] = useState("");
  let {makeGuess} = props;
  let {reset} = props;

  //Update input field
  function updateText(ev) {
    let currInput = ev.target.value;
    
    //Not allowing inputs of greater than 4
    if (currInput.length > 4) {
      return;
    }

    setInputString(currInput);
  }

  return (
    <div className="container">
      <div className="row">
        <div className = "column column-20">
          <p>Input Guess: </p>
        </div>
        <div className="column column-40">
          {/* Input test field logic inspired by hangman class notes */}
          <input 
            type="text"
            value={inputString}
            onChange={updateText}
          >
          </input>
        </div>
        <div className="column column-20">
          <button onClick={() => makeGuess(inputString)}>Guess</button>
        </div>
        <div className="column column-20">
          <button onClick={() => {reset(); setInputString("");}}>Reset</button>
        </div>
      </div>
    </div>
  );
}

function Header() {
  return (
    <div className="container">
      <div className="row">
        <div className="column column-10 center">
          #
        </div>
        <div className="column column-45 center">
          Guess
        </div>
        <div className="column column-45 center">
          Result
        </div>
      </div>
    </div>
  );
}

function Guess(props) {
  let {idx} = props;
  let {guess} = props;
  let {secret} = props;
  let result = computeResult(secret, guess);

  return (
    <div className="container">
      <div className="row">
        <div className="column column-10 center">
          {idx}
        </div>
        <div className="column column-45 center">
          {guess}
        </div>
        <div className="column column-45 center">
          {result}
        </div>
      </div>
    </div>
  );
}

function GuessTable(props) {
  let {secret} = props;
  let {guesses} = props;

  return (
    <div className="container">
      <Header />
      <div className="row">
        <div className="column">
          <Guess idx={1} guess={guesses[0]} secret={secret}/>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <Guess idx={2} guess={guesses[1]} secret={secret}/>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <Guess idx={3} guess={guesses[2]} secret={secret}/>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <Guess idx={4} guess={guesses[3]} secret={secret}/>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <Guess idx={5} guess={guesses[4]} secret={secret}/>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <Guess idx={6} guess={guesses[5]} secret={secret}/>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <Guess idx={7} guess={guesses[6]} secret={secret}/>
        </div>
      </div>
      <div className="row">
        <div className="column">
          <Guess idx={8} guess={guesses[7]} secret={secret}/>
        </div>
      </div>
    </div>
  );
}

function GameOver(props) {
  let {reset} = props;
  let {secret} = props;
  return (
    <div>
      <h1>Bulls and Cows</h1>
      <h4>Game Over!</h4>
      <p className="center">The secret was: {secret}</p>
      <button id="new-game" onClick={() => reset()}>New Game</button>
    </div>
  );
}

function App({secret}) {
  const [state, setState] = useState({
    secret: computeRandomSecret(),
    guesses: [],
  });

  //Function to handle making a guess
  function makeGuess(guess) {
    //Validating guess
    if (!isValidGuess(guess)) {
      return;
    }

    let prevGuesses = state.guesses;
    let newGuesses = prevGuesses.concat([guess]);
    setState({
      secret: state.secret,
      guesses: newGuesses,
    });
  }

  //Function to handle resetting
  function reset() {
    setState({
      secret: computeRandomSecret(),
      guesses: [],
    });
  }

  if(state.guesses.length <= 8) {
    //Game not over
    return (<div>
      <h1>Bulls and Cows</h1>
      <p className="center">Secret: {state.secret}</p>
      <Input makeGuess={makeGuess} reset={reset}/>
      <GuessTable secret={state.secret} guesses={state.guesses}/>
    </div>);
  } else {
    //Game over
    return (<div>
      <GameOver reset={reset} secret={state.secret}/>
    </div>)
  }
}

export default App;
