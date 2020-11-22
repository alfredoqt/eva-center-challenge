import React, {useEffect, useState} from 'react';
import 'App.css';
import {getImage, downloadFile} from 'utils/images';

async function download() {
  const image = await getImage(
    'https://fake-img-endpoint.vercel.app/api/preview',
  );
  const url = URL.createObjectURL(image);
  const filename = `${Date.now()}.jpg`;
  downloadFile(filename, url);
}

function App() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          'https://fake-img-endpoint.vercel.app/api/data',
        );
        const data = await response.json();
        setStats(data);
      } catch (e) {
        console.log(e);
      }
    }
    let timer = setInterval(fetchData, 500);
    // fetchData();
    // Cleanup function
    return function () {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img
          src="https://fake-img-endpoint.vercel.app/api/preview"
          className="App-logo"
          alt="logo"
        />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={download}>Download</button>
        <p>{stats ? JSON.stringify(stats) : 'Loading stats'}</p>
      </header>
    </div>
  );
}

export default App;
