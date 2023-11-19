import { useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import '../styles/Endgame.css'

function Endgame({ seconds, minutes, hours }) {
    const navigate = useNavigate();

    const usernameRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const username = usernameRef.current.value;

        try {
            const reqResponse = await fetch("http://localhost:3000/api/leaderboard", {
                method: "post",
                credentials: "include",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    time: time,
                    seconds: seconds,
                    minutes: minutes,
                    hours: hours,
                }),
            });
            const response = await reqResponse.json();
            
            if (response.message === "received") {
                navigate("/");
            } else {
                alert("Connection error detected, please try again");
            }
        } catch(err) {
            alert("Connection error detected: " + err);
        }

        return;
    }

    const cancelSubmit = () => {
        navigate("/");
    }

    const returnTime = (seconds, minutes, hours) => {
        const secondsStr = (seconds.toString().length == "1" ? "0" : "") + seconds;
        const  minutesStr = (minutes.toString().length == "1" ? "0" : "") + minutes;
        const hoursStr = (hours.toString().length == "1" ? "0" : "") + hours;

        return hoursStr + ":" + minutesStr + ":" + secondsStr;
    }

    const time = returnTime(seconds, minutes, hours);

    return (
        <div className='endgame'>
            <form onSubmit={handleSubmit}>
                <legend>
                    Congratulations, you have found all characters within: 
                    {/* Makes sure time is always displayed as XX:XX:XX and not X:X:XX or similar */}
                    {hours.toString().length == "1" ? " 0" : " "}{hours}:
                    {minutes.toString().length == "1" ? "0" : ""}{minutes}:
                    {seconds.toString().length == "1" ? "0" : ""}{seconds}.
                    Let's submit your time to the leaderboard!
                </legend>
                <label htmlFor="username">Leaderboard name: </label>
                <input type="text" name='username' placeholder='Name' ref={usernameRef} required />
                <div className='formButtons'>
                    <button onClick={cancelSubmit} className='noButton'>No thanks</button>
                    <button type='submit' className='submitButton'>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Endgame;