import { useEffect, useState } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [cost, setCost] = useState(28278.32870432217);
  const [need, setNeed] = useState(1);

  const onChangeSelect  = (event) => {
    setCost(event.target.value);
  }

  const onChange = (event) => {
    setNeed(event.target.value);
  }

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <h1>The Coins! {loading ? "" : `(${coins.length})`}</h1>
      {loading ? <strong>Loading....</strong> :
        (
          <select onChange={onChangeSelect}>
            {coins.map((coin, index) =>
              <option
                key={index}
                value={coin.quotes.USD.price}
                id={coin.symbol}
                symbol={coin.symbol}
              >
                {coin.name} ({coin.symbol}): {coin.quotes.USD.price} USD
              </option>
            )}
          </select>
        )}
    <h2>Please enter money you have!</h2>
    <div>
      <input type="number" value={need} onChange={onChange} placeholder="dollor"/>$
    </div>
    <h3>You can get {need/cost}</h3>
    </div>
  );
}

export default App;
