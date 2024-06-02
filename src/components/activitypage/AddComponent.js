import React, { useState } from "react";
import styles from "@/styles/activity-activity.module.css";

function AddComponent() {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
  };

  const handleCancel = () => {
    setClicked(false);
  };

  return (
    <div>
      {clicked ? (
        <div className={`${styles.newChapter}`}>
          <div className="flex justify-center items-start px-10 py-1">
            {" "}
            {/* 1 */}
            <div className="flex flex-col mr-10 w-1/3">
              <div className="flex items-center mb-2">
                <span className="text-lg font-semibold">章節名稱：</span>
                <input
                  type="text"
                  placeholder="請輸入章節名稱"
                  className="ml-2 p-2 border border-gray-300 rounded"
                />
              </div>
              <textarea
                placeholder="描述⋯⋯"
                className="mt-2 bg-white p-3 rounded h-48 resize-none border border-gray-300"
              ></textarea>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center mb-2">
                <span className="text-md font-bold">投稿時間</span>
                <input
                  type="datetime-local"
                  className="ml-4 border border-gray-300 rounded p-1 text-sm"
                  defaultValue="2024-04-17T23:59:59"
                />
                <i className="fas fa-clock ml-1"></i>
              </div>
              <div className="flex items-center mb-4">
                <span className="text-md font-bold">投票時間</span>
                <input
                  type="datetime-local"
                  className="ml-4 border border-gray-300 rounded p-1 text-sm"
                  defaultValue="2024-04-20T23:59:59"
                />
                <i className="fas fa-clock ml-1"></i>
              </div>
              <div className="flex">
                <button
                  className="bg-orange-300 text-white font-bold py-2 px-4 rounded-full"
                  onClick={handleCancel}
                >
                  取消
                </button>
                <button className="bg-orange-300 text-white font-bold py-2 px-4 rounded-full ml-2">
                  創建
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <button className={`${styles.add}`} onClick={handleClick}>
          <p>+ 新增段落</p>
        </button>
      )}
    </div>
  );
}

export default AddComponent;
