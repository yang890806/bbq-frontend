import React, { useState } from "react";

function ChainComponent() {
  const [showOriginalContent, setShowOriginalContent] = useState(true);

  const handleButtonClick = () => {
    setShowOriginalContent(false);
    // 在這裡你可以執行其他的邏輯，例如切換到新的空白 div
  };

  const handleCancelClick = () => {
    setShowOriginalContent(true); // 將狀態設置為 true，顯示原始內容
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0]; // 取得第一個選擇的文件
    // 在這裡你可以處理所選擇的文件，例如上傳至伺服器或顯示預覽
  };

  return (
    <div style={{ position: "relative" }}>
      {showOriginalContent ? (
        <div className="flex justify-center items-start p-2">
          <div className="border-dashed border-4 border-gray-300 w-96 h-80 flex justify-center items-center mr-8">
            {/* 空白框框 */}
          </div>
          <div className="flex flex-col justify-between ml-4">
            <div className="w-[400px]">
              <h1 className="text-xl font-semibold mb-2">創建者敘述</h1>
              <p>bla bla bla..........</p>
            </div>
            <div className="flex justify-end">
              {/* 我要接龍按鈕 */}
              <button
                className="bg-orange-300 text-black font-semibold py-2 px-4 rounded-full"
                style={{ position: "absolute", bottom: "10px", right: "20px" }}
                onClick={handleButtonClick}
              >
                我要接龍
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-start p-2">
          {/* 新的空白內容 */}
          <div className="border-dashed border-4 border-gray-300 w-96 h-80 flex justify-center items-center mr-8">
            <input
              type="file"
              id="fileInput"
              accept="image/*" // 只接受圖片文件
              style={{ display: "none" }} // 隱藏原生的文件選擇元素
              onChange={handleFileInputChange} // 當文件改變時執行的處理函式
            />
            <label
              htmlFor="fileInput"
              className="bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center cursor-pointer"
            >
              <span>選擇檔案</span>
            </label>
          </div>
          <div className="flex flex-col justify-between ml-4">
            <div className="w-[400px]">
              <h1 className="text-xl font-semibold mb-2">創建者敘述</h1>
              <p>bla bla bla..........</p>
              <textarea
                className="border border-gray-300 rounded w-full py-2 px-3 mt-4 mb-2"
                rows="6"
                placeholder="輸入文字..."
              ></textarea>
            </div>
            <div
              className="flex justify-end"
              style={{ position: "absolute", bottom: "10px", right: "20px" }}
            >
              <button
                className="bg-orange-300 text-black font-semibold py-2 px-4 rounded-full self-start mt-auto mr-2"
                onClick={handleCancelClick} // 將取消按鈕的點擊事件設定為 handleCancelClick
              >
                取消
              </button>
              <button className="bg-orange-300 text-black font-semibold py-2 px-4 rounded-full self-start mt-auto">
                投稿
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChainComponent;
