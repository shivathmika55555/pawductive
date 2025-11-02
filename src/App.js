import { useState } from "react";
import CatImg from "./assets/cat.png";        // happy cat
import CatSadImg from "./assets/cat_sad.png"; // sad cat
import DogImg from "./assets/dog.png";        // new pet
import BirdImg from "./assets/bird.png";      // new pet
import SpiderImg from "./assets/spider.png";  // new pet

function App() {
  // Pet state
  const [pet, setPet] = useState({
    name: "Mochi",
    species: "Cat",
    food: 100,
    love: 100,
    care: 100,
    shower: 100,
    play: 100,
    xp: 0
  });

  // List of unlockable pets
  const petsList = [
    { name: "Mochi", species: "Cat", img: CatImg, unlockXP: 0 },
    { name: "Bobby", species: "Dog", img: DogImg, unlockXP: 50 },
    { name: "Tweety", species: "Bird", img: BirdImg, unlockXP: 100 },
    { name: "Spidy", species: "Spider", img: SpiderImg, unlockXP: 150 }
  ];

  // Determine which pet is unlocked based on XP
  const currentPet = petsList
    .filter(p => pet.xp >= p.unlockXP)
    .slice(-1)[0]; // last pet unlocked

  // Increase bars + XP
  const completeTask = () => {
    setPet((p) => {
      const newXP = p.xp + 10; // +10 XP per task
      return {
        ...p,
        food: Math.min(100, p.food + 10),
        love: Math.min(100, p.love + 10),
        care: Math.min(100, p.care + 10),
        shower: Math.min(100, p.shower + 10),
        play: Math.min(100, p.play + 10),
        xp: newXP
      };
    });
  };

  // Decrease bars
  const decayBars = () => {
    setPet((p) => ({
      ...p,
      food: Math.max(0, p.food - 5),
      love: Math.max(0, p.love - 5),
      care: Math.max(0, p.care - 5),
      shower: Math.max(0, p.shower - 5),
      play: Math.max(0, p.play - 5)
    }));
  };

  // Render gradient bar
  const renderBar = (label, value, color) => (
    <div style={{ margin: "8px 0" }}>
      <strong>{label}:</strong>
      <div style={{
        background: "#eee",
        height: "20px",
        borderRadius: "10px",
        overflow: "hidden",
        marginTop: "4px"
      }}>
        <div style={{
          width: `${value}%`,
          height: "100%",
          borderRadius: "10px",
          background: color,
          transition: "width 0.3s"
        }} />
      </div>
    </div>
  );

  // Card & button styles
  const containerStyle = {
    textAlign: "center",
    padding: "2rem",
    maxWidth: "400px",
    margin: "2rem auto",
    backgroundColor: "#FFF8F0",
    borderRadius: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    fontFamily: "'Poppins', sans-serif"
  };

  const buttonStyle = {
    margin: "8px",
    padding: "12px 24px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#FFAAA5",
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    transition: "0.2s all"
  };

  // Decide which cat image to show (for current pet)
  const currentPetImg =
    pet.food < 20 || pet.love < 20 || pet.care < 20 || pet.shower < 20 || pet.play < 20
      ? CatSadImg
      : currentPet.img;

  return (
    <div style={containerStyle}>
      <h1>Pawductive 🐾</h1>
      <p>Keep your pet healthy by completing tasks!</p>

      <h2>{currentPet.name} the {currentPet.species}</h2>

      <img src={currentPetImg} alt={currentPet.name} style={{ width: "150px", margin: "1rem 0" }} />

      {currentPetImg === CatSadImg && (
        <p style={{ color: "#FF6B6B", fontWeight: "600" }}>{currentPet.name} is sad! Take care!</p>
      )}

      {renderBar("Food", pet.food, "linear-gradient(90deg, #FFB6B9, #FF8C94)")}
      {renderBar("Love", pet.love, "linear-gradient(90deg, #FFD3B6, #FFAAA5)")}
      {renderBar("Care", pet.care, "linear-gradient(90deg, #B5EAD7, #C7F9CC)")}
      {renderBar("Shower", pet.shower, "linear-gradient(90deg, #C7CEEA, #A8C0E4)")}
      {renderBar("Play", pet.play, "linear-gradient(90deg, #FFEAA7, #FFD180)")}

      {/* XP bar */}
      <div style={{ margin: "10px 0" }}>
        <strong>XP:</strong>
        <div style={{
          background: "#eee",
          height: "20px",
          borderRadius: "10px",
          overflow: "hidden",
          marginTop: "4px"
        }}>
          <div style={{
            width: `${Math.min(pet.xp, 150)/150 * 100}%`,
            height: "100%",
            borderRadius: "10px",
            background: "linear-gradient(90deg, #F6D365, #FDA085)",
            transition: "width 0.3s"
          }} />
        </div>
        <p>XP: {pet.xp}</p>
      </div>

      <button
        style={buttonStyle}
        onClick={completeTask}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#FF8C94")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#FFAAA5")}
      >
        Complete a task (+10 bars)
      </button>
      <button
        style={buttonStyle}
        onClick={decayBars}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#FF8C94")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#FFAAA5")}
      >
        Miss a day (-5 bars)
      </button>
    </div>
  );
}

export default App;
