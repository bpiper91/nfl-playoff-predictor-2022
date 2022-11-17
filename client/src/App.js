import './App.css';

function App() {
  return (
    <div className="App">
      <header>
        <div className="site-info">
          <h1>Playoff Predictor</h1>
        </div>
        <nav>
          <ul>
            <li className="nav-active">
              Standings
            </li>
            <li>
              Playoff Picture
            </li>
            <li>
              Wk 13
            </li>
            <li>
              Wk 14
            </li>
            <li>
              Wk 15
            </li>
            <li>
              Wk 16
            </li>
            <li>
              Wk 17
            </li>
            <li>
              Wk 18
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section>
          <h2>Standings</h2>
        </section>
        <section>
          <h2>Playoff Picture</h2>
        </section>
        <section>
          <h2>Week 13</h2>
          <WeekGames week="13" />
        </section>
        <section>
          <h2>Week 14</h2>
          <WeekGames week="14" />
        </section>
        <section>
          <h2>Week 15</h2>
          <WeekGames week="15" />
        </section>
        <section>
          <h2>Week 16</h2>
          <WeekGames week="16" />
        </section>
        <section>
          <h2>Week 17</h2>
          <WeekGames week="17" />
        </section>
        <section>
          <h2>Week 18</h2>
          <WeekGames week="18" />
        </section>
      </main>
      <footer>
        &copy; Brett Piper, 2022
      </footer>
    </div>
  );
};

export default App;