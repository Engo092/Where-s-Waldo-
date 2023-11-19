import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import '../styles/Leaderboard.css';

function Leaderboard() {
    const [leaderboardTimes, setLeaderboardTimes] = useState([]);

    useEffect(() => {
        async function getTimes() {
          try {
            const reqResponse = await fetch("http://localhost:3000/api/leaderboard");
            const response = await reqResponse.json();
            setLeaderboardTimes(response.times);
          } catch(err) {
            alert("Connection error detected: " + err);
          }
        }
    
        getTimes();
      }, []);


    return (
        <>
            <header>
                <h1>Where's Waldo?</h1>
            </header>
            <div className='leaderboardContent'>
                <Link className="goBack" to="/">BACK</Link>
                <h2>Times</h2>
                
                {leaderboardTimes.length > 0 ? (
                    <ol>
                        {leaderboardTimes.map((time) => {
                            return (
                                <li className="userTime" key={time._id}>
                                    <span>{time.username} - </span>
                                    <span>{time.time}</span>
                                </li>
                            );
                        })}
                    </ol>
                ) : (
                    <p className="noTimes">There are no times registered here yet, be the first!</p>
                )}
            </div>
        </>
    );
}

export default Leaderboard;