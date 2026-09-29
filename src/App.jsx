import { useMemo, useState } from "react";
import "./App.css";

import hermioneImage from "./assets/hermione.jpg";
import dracoImage from "./assets/Draco_Mal.jpg";

const CHARACTERS = [
  {
    id: 1,
    name: "Hermione Granger",
    actor: "Emma Watson",
    gender: "female",
    house: "Gryffindor",
    wandCore: "dragon heartstring",
    alive: true,
    image: hermioneImage,
  },
  {
    id: 2,
    name: "Draco Malfoy",
    actor: "Tom Felton",
    gender: "male",
    house: "Slytherin",
    wandCore: "unicorn tail-hair",
    alive: true,
    image: dracoImage,
  },
  {
    id: 3,
    name: "Harry Potter",
    actor: "Daniel Radcliffe",
    gender: "male",
    house: "Gryffindor",
    wandCore: "phoenix feather",
    alive: true,
    image: hermioneImage,
  },
];

const HOUSES = ["Gryffindor", "Slytherin", "Ravenclaw", "Hufflepuff"];

function CharacterCard({ character }) {
  return (
    <article className="character-card">
      <div className="character-card__image-wrap">
        <img
          className="character-card__image"
          src={character.image}
          alt={character.name}
        />
      </div>

      <div className="character-card__body">
        <h3 className="character-card__name">{character.name}</h3>
        <ul className="character-card__meta">
          <li><span>Actor</span>{character.actor}</li>
          <li><span>Gender</span>{character.gender}</li>
          <li><span>House</span>{character.house}</li>
          <li><span>Wand core</span>{character.wandCore}</li>
          <li><span>Status</span>{character.alive ? "Alive" : "Deceased"}</li>
        </ul>
      </div>
    </article>
  );
}

export default function HarryPotter() {
  const [name, setName] = useState("");
  const [house, setHouse] = useState("");

  const results = useMemo(() => {
    const search = name.trim().toLowerCase();

    return CHARACTERS.filter((character) => {
      const nameMatches =
        search.length === 0 ||
        character.name.toLowerCase().includes(search);

      const houseMatches = !house || character.house === house;

      return nameMatches && houseMatches;
    });
  }, [name, house]);

  const resetFilters = () => {
    setName("");
    setHouse("");
  };

  return (
    <main className="hp">
      <header className="hp__header">
        <div className="hp__heading">
          <span className="hp__eyebrow">Wizarding world</span>
          <h1 className="hp__title">Harry Potter</h1>
          <p className="hp__subtitle">
            Find characters, their houses and other details from the wizarding world.
          </p>
        </div>

        <div className="hp__filters">
          <div className="hp__field">
            <label className="hp__label" htmlFor="hp-name">Character name</label>
            <input
              id="hp-name"
              className="hp__input"
              type="text"
              placeholder="Try Hermione..."
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="hp__field">
            <label className="hp__label" htmlFor="hp-house">House</label>
            <select
              id="hp-house"
              className="hp__select"
              value={house}
              onChange={(event) => setHouse(event.target.value)}
            >
              <option value="">All houses</option>
              {HOUSES.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
          </div>

          {(name || house) && (
            <button className="hp__reset" type="button" onClick={resetFilters}>
              Clear
            </button>
          )}
        </div>
      </header>

      <section className="hp__content">
        <div className="hp__result-line">
          <span>Characters</span>
          <strong>{results.length}</strong>
        </div>

        <div className="hp__grid">
          {results.length > 0 ? (
            results.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))
          ) : (
            <div className="hp__empty">
              <h2>Nothing found</h2>
              <p>Try another name or choose a different house.</p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
