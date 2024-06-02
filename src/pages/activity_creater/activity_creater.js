import Head from "next/head";
import React, { useState } from "react";
import NavBar from "@/components/navbar";
import { Container } from "react-bootstrap";
import styles from "@/styles/activity-activity.module.css";
import Introduction from "../../components/activitypage/introduction";
import CompleteComponent from "../../components/activitypage/completeComponent";
import VotingComponent from "../../components/activitypage/votingComponent";
import ChainComponent from "../../components/activitypage/chainComponent";
import AddComponent from "../../components/activitypage/AddComponent";

function activity() {
  // 使用物件來追蹤每個章節的展開狀態
  const [chapterStates, setChapterStates] = useState({
    0: false,
    1: false,
    2: false,
    3: false,
    4: false,
  });

  // 切換特定章節的展開狀態
  const toggleChapter = (index) => {
    setChapterStates((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  return (
    <>
      <Head>
        <title>BBQ</title>
        <meta property="og:description" content="BBQ - BoundlessBrushQuill" />

        {/* 將所需的 <script> 和 <link> 標籤添加到這裡 */}
        <script src="https://unpkg.com/react/umd/react.development.js"></script>
        <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
        <script src="https://unpkg.com/@babel/standalone/babel.js"></script>
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
        ></link>
      </Head>
      <NavBar />
      <Container>
        <div className="pt-16 pb-20">
          {/* 簡介 */}
          <div className="flex">
            <Introduction />
            <div className="text-right">
              <button className="bg-orange-300 text-white font-bold py-3 px-6 rounded-full ml-12">
                發布故事！
              </button>
            </div>
          </div>

          {/* 章節部分開始 */}
          <div className="space-y-6 my-4">
            {/* 子元素之間有垂直間距 6 單位 */}
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className={`${styles.block} ${
                  index === 4 ? styles.chaining : ""
                }`}
              >
                {/* 章節名稱及其他信息 */}
                <div className="flex items-center">
                  <span>{index + 1}. Chapter Name</span>
                  <span className="ml-8">By. author</span>
                  {index === 3 ? (
                    <span className={styles.vote}>投票進行中 | 9:25:33</span>
                  ) : index === 4 ? (
                    <span className={styles.chain}>接龍中 | 9:25:33</span>
                  ) : (
                    <span className="ml-auto">已完成</span>
                  )}
                  <button
                    className="text-gray-500 hover:text-gray-700 ml-6"
                    onClick={() => toggleChapter(index)} // 點擊按鈕時切換章節狀態
                  >
                    <i className="fas fa-chevron-down"></i>
                  </button>
                </div>

                {/* 展開後的內容 */}
                {chapterStates[index] && (
                  <div className="bg-gray-100 p-3 rounded mt-2">
                    {/* 這裡放置展開後的內容 */}
                    {/* <p>這是第 {index + 1} 章的展開後內容</p> */}
                    {index === 0 && <CompleteComponent />}
                    {index === 1 && <CompleteComponent />}
                    {index === 2 && <CompleteComponent />}
                    {index === 3 && <VotingComponent />}
                    {index === 4 && <ChainComponent />}
                  </div>
                )}
              </div>
            ))}
            <AddComponent />
          </div>
        </div>
      </Container>
    </>
  );
}

export default activity;
