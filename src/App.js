import { useState } from 'react';
import { computeRandomSecret, isValidGuess, computeResult, hasWon } from './game-functions';
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
            onKeyPress={(ev) => {if (ev.key === "Enter") {makeGuess(inputString)}}}
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
  let {won} = props;
  let message = "";

  if (won) {
    message = "You Won!"  
  } else {
    message = "Sorry, you lost!"
  }

  return (
    <div>
      <h1>Bulls and Cows</h1>
      <h4>{message}</h4>
      <p className="center">The secret was: {secret}</p>
      <button id="new-game" onClick={() => reset()}>New Game</button>
    </div>
  );
}

function Rules() {
  return (
    <div class="container rules">
      <h4>Rules and Gampeplay</h4>
      <ul>
        <li>Only numbers can be entered into the input box.</li>
        <li>No duplicate numbers can be entered into the input box.</li>
        <li>
          Each guess has a result indicating the number of cows and bulls in the guess.
          <ul>
            <li>A cow is a number present in the secret but in the wrong position.</li>
            <li>A bull is a number present in the secret and in the right position.</li>
          </ul>
        </li>
        <li>If the secret number isn't guessed in 8 trials, you loose.</li>
        <li>Press the reset button to reset the game(note the secret will also reset).</li>
      </ul>
    </div>
  );
}

function App() {
  const [state, setState] = useState({
    secret: computeRandomSecret(),
    guesses: [],
    revealSecret: false
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
      revealSecret: state.revealSecret,
    });
  }

  //Function to handle resetting
  function reset() {
    setState({
      secret: computeRandomSecret(),
      guesses: [],
      revealSecret: false,
    });
  }

  //Function to toggle reveal secret
  function toggleSecret() {
    setState({ 
      secret: state.secret,
      guesses: state.guesses,
      revealSecret: !state.revealSecret,
    })
  }

  //Game Won
  if (hasWon(state)) {
    return (<div>
      <GameOver reset={reset} secret={state.secret} won={true}/>
    </div>);
  }

  //Game Over
  if(state.guesses.length > 7) {
    return (<div>
      <GameOver reset={reset} secret={state.secret} won={false} />
    </div>)
  }

  //If game not over or won
  let secret = "";
  if (state.revealSecret) {
    secret = state.secret;
  }

  return (
    <div>
      <h1>Bulls and Cows</h1>
      <div class="container">
        <div class="row">
          <div class="column column-30">
            <Rules />
          </div>
          <div class="column column-70">
            <button id="reveal" onClick={() => toggleSecret()}>Reveal Secret</button>
            <p className="center">Secret: {secret}</p>
            <Input makeGuess={makeGuess} reset={reset} />
            <GuessTable secret={state.secret} guesses={state.guesses} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
