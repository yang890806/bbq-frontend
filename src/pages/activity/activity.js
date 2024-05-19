import Head from "next/head";
import React, { useState } from "react";
import NavBar from "@/components/navbar";
import { Container } from "react-bootstrap";
import styles from "@/styles/activity-activity.module.css";

function activity() {
  // 使用物件來追蹤每個章節的展開狀態
  const [chapterStates, setChapterStates] = useState({
    0: false,
    1: false,
    2: false,
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
        <script src="https://cdn.tailwindcss.com"></script>
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
          {/* 簡介部分開始 */}
          <div className="flex items-center space-x-6 mb-10">
            <div className="bg-gray-300 shadow-sm h-40 w-32 rounded-[10px] min-h-[10rem] min-w-[8rem] max-h-[10rem] max-w-[8rem]"></div>{" "}
            <div>
              <h1 className="text-lg font-semibold">Book Name</h1>
              <p className="text-gray-500">author (目前所有的作者)</p>
              <p className="text-sm text-gray-600 mt-2">
                A student template for teachers to use introduce Book Creator to
                middle school students. This is part of the Teach your first
                Lesson library.
              </p>
            </div>
          </div>
          {/* 簡介部分結束 */}

          {/* 章節部分開始 */}
          <div className="space-y-6 my-4">
            {/* 子元素之間有垂直間距 3 單位 */}
            {[...Array(5)].map((_, index) => (
              <div
                key={index}
                className={`${styles.block} ${
                  index === 4 ? styles.chaining : ""
                }`}
              >
                {" "}
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

                    {index === 0 && (
                      <>
                        <div className="flex justify-center items-start ">
                          <div className="flex flex-row space-x-6 p-2">
                            <div className="w-96 h-80 bg-gray-300 shadow-md rounded-[10px]"></div>
                            <div className="bg-white p-6 shadow-md">
                              <p className="text-gray-700 text-base mb-4 w-100">
                                Story text Story text Story text Story text
                                Story text Story text Story text Story text
                                Story text Story text
                              </p>
                              <p className="text-gray-700 text-base font-bold">
                                Author: Peter
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {index === 1 && (
                      <>
                        <div className="flex justify-center items-start ">
                          <div className="flex flex-row space-x-6 p-2">
                            <div className="w-96 h-80 bg-gray-300 shadow-md rounded-[10px]"></div>
                            <div className="bg-white p-6 shadow-md">
                              <p className="text-gray-700 text-base mb-4 w-100">
                                Story text Story text Story text Story text
                                Story text Story text Story text Story text
                                Story text Story text
                              </p>
                              <p className="text-gray-700 text-base font-bold">
                                Author: Peter
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {index === 2 && (
                      <>
                        <div className="flex justify-center items-start ">
                          <div className="flex flex-row space-x-6 p-2">
                            <div className="w-96 h-80 bg-gray-300 shadow-md rounded-[10px]"></div>
                            <div className="bg-white p-6 shadow-md">
                              <p className="text-gray-700 text-base mb-4 w-100">
                                Story text Story text Story text Story text
                                Story text Story text Story text Story text
                                Story text Story text
                              </p>
                              <p className="text-gray-700 text-base font-bold">
                                Author: Peter
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {index === 3 && (
                      <>
                        <div className="container mx-auto px-4">
                          <div
                            className="flex overflow-x-auto pt-8 pb-4 -mx-4"
                            style={{ scrollbarWidth: "thin" }}
                          >
                            {Array.from({ length: 8 }).map((_, index) => (
                              <div
                                className="flex-none w-full sm:w-auto md:w-1/4 px-4 "
                                key={index}
                                style={{ minWidth: "300px" }}
                              >
                                <div className="bg-white p-6 rounded-lg shadow-md card-container">
                                  <img
                                    src="https://i.pinimg.com/564x/d6/1e/13/d61e13f79b6dc217d4a20bc665701271.jpg"
                                    alt={`Placeholder image with grey background and dimension of 300x200 pixels for story ${
                                      index + 1
                                    }`}
                                    className="w-full h-48 mb-2 rounded"
                                  />
                                  <h5 className="text-gray-900 text-xl leading-tight mb-2">
                                    By. author
                                  </h5>
                                  <p className="text-gray-600">
                                    Story Content bla bla bla ....
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="flex justify-center mt-2">
                            <button className="bg-orange-300 text-white font-bold py-2 px-4 rounded-full">
                              投票
                            </button>
                          </div>
                        </div>
                      </>
                    )}
                    {index === 4 && (
                      <>
                        <div className="flex justify-center items-start p-2">
                          <div className="border-dashed border-4 border-gray-300 w-96 h-80 flex justify-center items-center mr-8">
                            {/* <img
                              src="https://placehold.co/200x200"
                              alt="Placeholder image with dashed border"
                              className="w-32 h-32"
                            /> */}
                          </div>
                          <div className="flex flex-col justify-between ml-4">
                            <div className="w-[400px]">
                              <h1 className="text-xl font-semibold mb-2">
                                創建者敘述
                              </h1>
                              <p>bla bla bla..........</p>
                            </div>
                          </div>
                          <button className="bg-orange-300 text-black font-semibold py-2 px-4 rounded-full self-start mt-auto">
                            我要接龍
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
          {/* 章節部分結束 */}

          {/* 投票進行中 block */}
          {/* <div className="space-y-6 my-4">
            <div className={styles.voting}>
              <span>4. Chapter Name</span>
              <span className="ml-8">By. author</span>
              <span className="ml-auto">投票進行中 | 9:25:33</span>
              <button className="text-gray-500 hover:text-gray-700 ml-6">
                <i className="fas fa-chevron-down"></i>
              </button>
            </div>
          </div> */}

          {/* 接龍中 block */}
          {/* <div className="space-y-6">
            <div className={styles.chaining}>
              <span>5. Chapter Name</span>
              <span className="ml-8">By. author</span>
              <span className="ml-auto">接龍中.... | 30:21</span>
              <button className="text-gray-500 hover:text-gray-700 ml-6">
                <i className="fas fa-chevron-down"></i>
              </button>
            </div>
          </div> */}
        </div>
      </Container>
    </>
  );
}

export default activity;
