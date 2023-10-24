import { useEffect, useState } from "react";
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import "./App.css";

function App() {
  const [person, setPerson] = useState([]);
  useEffect(() => {
    setPerson([
      {
        id: 0,
        name: "凯瑟琳·约翰逊",
        profession: "数学家",
      },
      {
        id: 1,
        name: "马里奥·莫利纳",
        profession: "化学家",
      },
      {
        id: 2,
        name: "穆罕默德·阿卜杜勒·萨拉姆",
        profession: "物理学家",
      },
      {
        name: "珀西·莱温·朱利亚",
        profession: "化学家",
      },
      {
        name: "苏布拉马尼扬·钱德拉塞卡",
        profession: "天体物理学家",
      },
    ]);
  }, []);
  return (
    <>
      {person
        .filter((item) => item.profession == "数学家")
        .map((item) => (
          <p key={item.id}>{item.name}</p>
        ))}
    </>
  );
}

export default App;
