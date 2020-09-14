import React from "react";

function App() {
  let [randomNum, setRandomNum] = React.useState(null);
  let [minNumIncluded, setMinNumIncluded] = React.useState(0);
  let [maxNumIncluded, setMaxNumIncluded] = React.useState(99);
  // let [quantity, setQuantity] = React.useState(4);
  let [delay, setDelay] = React.useState(30);
  let [isRunning, setIsRunning] = React.useState(false);
  let [counter, setCounter] = React.useState(0);
  let [alert, setAlert] = React.useState("Everything is fine");
  let [colorIndex, setColorIndex] = React.useState(0);

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
      setColorIndex(function () {
        if (colorIndex === 9) {
          return 0;
        } else {
          return colorIndex + 1;
        }
      });
      setRandomNum(function () {
        return (
          Math.floor(Math.random() * (maxNumIncluded + 1 - minNumIncluded)) +
          minNumIncluded
        );
      });
    },
    isRunning ? delay * 100 : null
  );

  const delayChange = (event) => {
    setDelay(event.target.value);
  };

  const minNumIncludedChange = (event) => {
    setMinNumIncluded(Number(event.target.value));
  };

  const maxNumIncludedChange = (event) => {
    setMaxNumIncluded(Number(event.target.value));
  };

  const startFn = () => {
    // bisognerà aggiungere controlli qui e utilizzare setAlert
    setIsRunning(true);
    if (false) {
      setAlert("finto per non avere warning");
    }
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
              delay
              <input
                type="text"
                value={delay}
                onChange={delayChange}
                maxLength="2"
                style={{ width: "50px" }}
              />
              &nbsp;&nbsp;&nbsp;&nbsp; Numero minimo (incluso)&nbsp;
              <input
                type="text"
                value={minNumIncluded}
                onChange={minNumIncludedChange}
                maxLength="2"
                style={{ width: "50px" }}
              />
              &nbsp;&nbsp;&nbsp;&nbsp; Numero massimo (incluso)&nbsp;
              <input
                type="text"
                value={maxNumIncluded}
                onChange={maxNumIncludedChange}
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
        {isRunning ? (
          <Display randomNum={randomNum} colorIndex={colorIndex} />
        ) : null}
      </main>
    </div>
  );
}

export default App;

function Display({ randomNum, colorIndex }) {
  let colors = [
    "brown",
    "darkblue",
    "darkgreen",
    "darkorange",
    "darkorchid",
    "darkred",
    "darkslateblue",
    "darkviolet",
    "forestgreen",
    "darkmagenta",
  ];

  return (
    <React.Fragment>
      <h2 style={{ fontSize: "100px", color: colors[colorIndex] }}>
        {randomNum}
      </h2>
    </React.Fragment>
  );
}
