import React, { useState , useEffect } from 'react';
import Header from './components/Header';
import Figure from './components/Figure';
import WrongLetters from './components/WrongLetters';
import Word from './components/Word';
import Notification from './components/Notification';
import Popup from './components/Popup';
import {showNotification as show} from './helpers/helpers';
import './App.css';

const words = [{question: 'The _____ function returns a list of all the formal arguments of a function', answer:'formals'},
{question: 'Numbers in R are generally treated as _____ precision real numbers', answer:'double'},
{question: 'The four most frequently used types of data objects in R are vectors, matrices, data frames and ____', answer:'lists'},
{question: 'A _____ is a set of elements appearing in rows and columns where the elements are of the same mode whether they are logical, numeric (integer or double), complex or character', answer:'matrix'},
{question: 'Which function replicates elements of vectors', answer:'rep'}];

let selectedWord = words[Math.floor(Math.random() * words.length)];

function App() {
  const [playable, setPlayable] = useState(true);
  const [correctLetters, setCorrectLetters] = useState([]);
  const [wrongLetters, setWrongLetters] = useState([]);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    console.log("handleKeyDown");
    const handleKeyDown = event => {
      const { key, keyCode } = event;
          if (playable && keyCode >= 65 && keyCode <= 90) {
            const letter = key.toLowerCase();
      
            if (selectedWord.answer.includes(letter)) {
              if (!correctLetters.includes(letter)) {
                setCorrectLetters(currentLetters => [...currentLetters, letter]);
              } else {
                show(setShowNotification);
              }
            } else {
              if (!wrongLetters.includes(letter)) {
                setWrongLetters(wrongLetters => [...wrongLetters, letter]);
              } else {
                show(setShowNotification);
              }
            }
          }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
  }, [correctLetters, wrongLetters, playable]);
  
  function playAgain() {
    setPlayable(true);
    setCorrectLetters([]);
    setWrongLetters([]);

    const random = Math.floor(Math.random() * words.length);
    selectedWord = words[random];
  }
  
  return (
    <>
     <Header question={selectedWord.question}/>
     <div className="game-container">
       <Figure wrongLetters={wrongLetters}/>
       <WrongLetters wrongLetters={wrongLetters}/>
       <Word selectedWord={selectedWord} correctLetters={correctLetters}/>
     </div>
     <Popup correctLetters={correctLetters} wrongLetters={wrongLetters} selectedWord={selectedWord} setPlayable={setPlayable} playAgain={playAgain}/>
       <Notification showNotification={showNotification}/>
    </>
  );
}

export default App;
