import { useNavigate } from 'react-router-dom';
import '../styles/App.css'

function App() {
  const navigate = useNavigate();

  const startHandler = () => {
    navigate("/game");
  }

  const leaderboardHandler = () => {
    navigate("/leaderboard");
  }

  return (
    <>
      <header>
        <h1>Where's Waldo?</h1>
      </header>
      <div className='introContent'>
        <h2>Find all the hidden characters in the shortest time possible!</h2>
        <div className='introButtons'>
          <button onClick={startHandler} className='startGame'>Start Game</button>
          <button onClick={leaderboardHandler} className='leaderboardButton'>Leaderboard</button>
        </div>
        
      </div>
    </>
  );
}

export default App
