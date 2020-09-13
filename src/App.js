import React from "react";

function App() {
  let [randomNum, setRandomNum] = React.useState(null);
  let [quantity, setQuantity] = React.useState(4);
  let [delay, setDelay] = React.useState(30);
  let [isRunning, setIsRunning] = React.useState(false);
  let [counter, setCounter] = React.useState(0);
  let [alert, setAlert] = React.useState("Everything is fine");

  function useInterval(callback, delay) {
    const savedCallback = React.useRef();

    // Remember the latest callback.
    React.useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    // Set up the interval.
    React.useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  useInterval(
    function () {
      setCounter(function () {
        return counter + 1;
      });
      console.log(`counter: ${counter}`);
      setRandomNum(function () {
        return Math.floor(Math.random() * 99);
      });
    },
    isRunning ? delay * 100 : null
  );

  const setChange = (event) => {
    console.log(event.target);
    setDelay(event.target.value);
  };

  const startFn = () => {
    // bisognerà aggiungere controlli qui e utilizzare setAlert
    setIsRunning(true);
  };

  return (
    <div className="App">
      <header>
        <h1>Spoken words</h1>
      </header>
      <main>
        <div style={{ height: 100 }}>
          {!isRunning ? (
            <>
              <p>Settings</p>
              <input
                type="text"
                value={delay}
                onChange={setChange}
                maxLength="2"
                style={{ width: "50px" }}
              />
            </>
          ) : null}
        </div>

        <div>
          {!isRunning ? <button onClick={startFn}>start</button> : null}
          {isRunning ? (
            <button onClick={() => setIsRunning(false)}>stop</button>
          ) : null}
        </div>
        <div style={{ height: "50", marginTop: "30px" }}>
          {alert ? <p>{alert}</p> : null}
        </div>
        {isRunning ? <Display randomNum={randomNum} /> : null}
      </main>
    </div>
  );
}

export default App;

function Display({ randomNum }) {
  return (
    <React.Fragment>
      <h2>{randomNum}</h2>
    </React.Fragment>
  );
}
