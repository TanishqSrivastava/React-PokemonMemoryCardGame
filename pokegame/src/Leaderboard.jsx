import { useEffect, useState } from 'react';
import axios from 'axios';
import './leaderboard.css';

export default function Leaderboard() {
  const [rows, setRows] = useState([]);

  useEffect(()=>{
    axios.get('http://localhost:8000/leaderboard')
         .then(r=>setRows(r.data))
         .catch(console.error);
  },[]);

  return (
    <div className="board-wrapper">
      <h1>Leaderboard</h1>
      <ol className="board">
        {rows.map((r,i)=>(
          <li key={i}>
            <span className="rank">{i+1}</span>
            <span className="name">{r.username}</span>
            <span className="score">{r.highScore}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}