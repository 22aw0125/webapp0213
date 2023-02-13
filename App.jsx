import "./App.css";
import { useEffect, useState, useCallback } from "react"; //useEffctとuseStateを使うための設定
// import App from '../../testapp_1122/src/App';

const App = () => {
  return <Weather></Weather>;
};

const Weather = () => {
  const [data, setData] = useState([]); //JSONで返ってきたデータを保存するためのもの
  const [loading, setLoading] = useState(true); //ローディング中か否かのフラグを設定する
  const [city, setcityCode] = useState(130000); //都市コード用、初期値は東京エリア
  const queryWeather = useCallback(async () => {
    const url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${city}.json`;
    const response = await fetch(url);
    const jsondata = await response.json();
    //console.log(JSON.stringify(jsondata));
    // console.log(jsondata[0].timeSeries[0].areas[0].weathers);

    //必要なデータだけをsetData()で抜き出してステートに保存する
    setData(jsondata[0].timeSeries[0].areas[0]);
    setLoading(false);
  }, [city]);

  const handleChange = (event) => {
    setcityCode(event.target.value);
    setLoading(true);
  };

  // function handleChange() {
  //   queryWeather();
  // }

  useEffect(() => {
    //コンポーネントが描画されてから実行するためuseEffectを使用する
    queryWeather();
  }, [city, queryWeather]);

  let weatherInfo;
  if (loading) {
    weatherInfo = <p>loading</p>;
  } else {
    weatherInfo = (
      <p>
        {data.area.name}の明日の天気は{data.weathers[0]}
      </p>
    );
  }

  return (
    <>
      <h1>明日の天気は？</h1>
      <img src="/image/rain.png" width={115} />
      <img src="/image/sunny.png" width={115} />
      <img src="/image/cloudy.png" width={115} />
      <div class="selectwrap">
        <select onChange={handleChange}>
          <option value="130000">東京</option>
          <option value="270000">大阪</option>
          <option value="016000">札幌</option>
        </select>
      </div>
      {weatherInfo}
    </>
  );
};

// function App() {
//   const[city,setCity] = useState("tokyo")
//   const handleChange = () =>{
//     alert(city)
//   }
//   useEffect(()=>{
//     handleChange("東京")
//   },[city]);
//   return (
//     <>
//       <h1>weather</h1>
//       <p>今日の天気</p>
//       <select onChange={(e) => setCity(e.target.value)}>
//         <option value="tokyo">東京</option>
//         <option value="osaka">大阪</option>
//         <option value="saporo">札幌</option>
//       </select>
//     </>
//   );
// }
export default App;
