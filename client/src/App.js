import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Standings />
        <PlayoffPicture />
        <SingleWeek week="13" />
        <SingleWeek week="14" />
        <SingleWeek week="15" />
        <SingleWeek week="16" />
        <SingleWeek week="17" />
        <SingleWeek week="18" />
      </main>
      <footer>
        &copy; Brett Piper, 2022
      </footer>
    </div>
  );
};

export default App;