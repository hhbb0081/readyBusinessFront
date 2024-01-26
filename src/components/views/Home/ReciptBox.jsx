import React, { useContext, useState } from "react";
import X from "../../../assets/icons/X.svg";
import cherry from "../../../assets/icons/cherry.svg";
import { HomeContext } from "../../../pages/OrderManage/Home";
import "../../../pages/OrderManage/Receipt.css";

export default function ReceiptBox ({children}) {
    const context = useContext(HomeContext);
    const [ReceiveModal, setReceiveModal] = useState(false);
    const [RefuseModal, setRefuseModal] = useState(false);
  
    const cancelOrder = (e) => {
      console.log(e);
      // const config = {
      //   withCredentials: true,
      // };
  
      // const body = {
      //   orderId: orderProps.orderId,
      //   status: "CANCEL",
      //   rejectReason: e.target.innerText,
      // };
      // console.log(body);
  
      // axios
      //   .post(`${apiUrl}/api/v1/order/cancel`, body, config)
      //   .then((res) => {
      //     console.log(res);
      //     if (res.status === 200) {
      //       message.info("취소되었습니다.");
      //       setRefuseModal((prev) => !prev);
      //       // 데이터 다시 fetch
      //       fetchData();
      //       // select된 데이터 변경
      //       setStatus("null");
      //       setOrder(null);
      //     }
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //     setRefuseModal((prev) => !prev);
      //     // 데이터 다시 fetch
      //     fetchData();
      //     // select된 데이터 변경
      //     setStatus("null");
      //     setOrder(null);
      //   });
    };
  
    const handleMake = async (e) => {
      console.log(e);
      // const config = {
      //   withCredentials: true,
      // };
  
      // const body = {
      //   orderId: orderProps.orderId,
      //   status: "MAKE",
      //   time: e.target.innerText === "즉시완료" ? 0 : parseInt(e.target.innerText.split("분")[0]),
      // };
      // console.log(body.time);
  
      // try {
      //   const res = await axios.post(
      //     `${apiUrl}/api/v1/order/complete`,
      //     body,
      //     config
      //   );
      //   console.log(res);
      //   if (res.status === 200) {
      //     message.success("접수되었습니다.");
      //     setReceiveModal((prev) => !prev);
      //     // 데이터 다시 fetch
      //     await fetchData();
      //     // select된 데이터 변경
      //     // 클릭 시 스타일 변화
      //     setStatus("null");
      //     setOrder(null);
      //   }
      // } catch (err) {
      //   console.log(err);
      // }
    };

    const selectedInfo = context.selectedMenu;
    console.log(selectedInfo);


    return(
      <div className="receiptWrapper">
        {
          selectedInfo?.length ? (
            <>
              <div className="receiptHeader">
                <span className="receipt-header"> 주문번호 {selectedInfo[0]?.idx}</span>
                {children}
            </div>
            <div className="receiptTextBox">
                <span className="receipt-text">주문시간</span>
                <span className="receipt-text">
                    {selectedInfo[0]?.time?.split("T")[0].replaceAll("-", "/")}
                    {" "}
                    {selectedInfo[0]?.time?.split("T")[1]?.split(".")[0]}
                </span>
            </div>
            <div className="receiptTextBox">
                <span className="receipt-text">고객연락처</span>
                <span className="receipt-text">
                    {/* {orderProps?.phone?.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3")} */}
                    {selectedInfo[0]?.phone}
                </span>
            </div>
            <div className="receipt-divider" />
            <div className="receiptTextBox">
              <span className="receipt-text">주문내역</span>
            </div>
            {selectedInfo[0]?.foodies?.map((food, i) => (
              <React.Fragment key={i}>
                <div className="receiptTextBox">
                  <span className="receipt-FoodName">• {food?.name}</span>
                  <span className="receipt-FoodName count">{food?.count}</span>
                </div>
                <div className="receiptOption">
                  {food?.options?.map((option) => (
                    <span
                      className="receipt-optiontext"
                      style={{
                        color: (option?.price !== 0 || option?.category === "HOT/ICE"
                        || option?.category === "ICE/HOT") ? "#D82356" : undefined,
                        fontWeight: "500",
                      }}
                    >
                      └ ({option.category}) {option.name}
                    </span>
                  ))}
                </div>
              </React.Fragment>
            ))}
            <div className="receipt-divider" />
            <div className="receiptTextBox">
              <span className="receipt-text">상품금액</span>
              <span className="receipt-text">
                {/* {orderProps?.couponUsed ? orderProps?.price && (orderProps?.price + 500).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : orderProps?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 */}
                {selectedInfo[0]?.price}원
              </span>
            </div>
            <div className="receiptTextBox">
              <span className="receipt-text">할인금액</span>
              <span className="receipt-text">
                {/* {orderProps?.couponUsed ? "(-) 500원" : "0원"} */}
                (-)500원
              </span>
            </div>
            <div className="receiptTextBox">
              <span className="receipt-text">결제금액</span>
              <span className="receipt-text">
                {/* {orderProps?.price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}원 */}
                {selectedInfo[0]?.price}원
              </span>
            </div>

            {/* 주문거부모달창 */}
            {!ReceiveModal && RefuseModal && (
              <div className="modal-wrapper">
                <div className="modal-box">
                  <div
                    className="modal-close__wrapper"
                    onClick={() => setRefuseModal((prev) => !prev)}
                  >
                    <img src={X} alt="close" />
                  </div>
                  <div className="modal-box-txt__wrapper">
                    <div className="modal-box-txt">접수 거부 사유를 선택해주세요</div>
                  </div>
                  <div className="modal-box-choose-btn__wrapper">
                    <div
                      className="modal-box-choose-btn"
                      onClick={(e) => cancelOrder(e)}
                    >
                      재료소진
                    </div>
                    <div
                      className="modal-box-choose-btn"
                      onClick={(e) => cancelOrder(e)}
                    >
                      가게사정
                    </div>
                    <div
                      className="modal-box-choose-btn"
                      onClick={(e) => cancelOrder(e)}
                    >
                      기타
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 주문수락모달창 */}
            {!RefuseModal && ReceiveModal && (
              <div className="modal-wrapper">
                <div className="modal-box">
                  <div className="modal-close__wrapper" onClick={() => setReceiveModal((prev) => !prev)}>
                    <img src={X} alt="close" />
                  </div>
                  <div className="modal-box-txt__wrapper">
                    <div className="modal-box-txt">제조 시간을 선택해주세요</div>
                  </div>
                  <div className="modal-box-choose-btn__wrapper">
                    <div className="modal-box-choose-btn__row">
                      <div className="modal-box-choose-btn__col">
                        <div
                          className="modal-box-chooseTime-btn now"
                          onClick={handleMake}
                        >
                          즉시완료
                        </div>
                      </div>
                    </div>
                    <div className="modal-box-choose-btn__row">
                      <div className="modal-box-choose-btn__col">
                        <div
                          className="modal-box-chooseTime-btn"
                          onClick={handleMake}
                        >
                          5분
                        </div>
                      </div>
                      <div className="modal-box-choose-btn__col">
                        <div
                          className="modal-box-chooseTime-btn"
                          onClick={handleMake}
                        >
                          10분
                        </div>
                      </div>
                    </div>
                    <div className="modal-box-choose-btn__row">
                      <div className="modal-box-choose-btn__col">
                        <div
                          className="modal-box-chooseTime-btn"
                          onClick={handleMake}
                        >
                          15분
                        </div>
                      </div>
                      <div className="modal-box-choose-btn__col">
                        <div
                          className="modal-box-chooseTime-btn"
                          onClick={handleMake}
                        >
                          20분
                        </div>
                      </div>
                    </div>
                    <div className="modal-box-choose-btn__row">
                      <div className="modal-box-choose-btn__col">
                        <div
                          className="modal-box-chooseTime-btn"
                          onClick={handleMake}
                        >
                          25분
                        </div>
                      </div>
                      <div className="modal-box-choose-btn__col">
                        <div
                          className="modal-box-chooseTime-btn"
                          onClick={handleMake}
                        >
                          30분
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            </>
          ) : (
            <div className="noMenuImgWrapper">
              <img src={cherry} alt="berry" className="noMenuImg"/>
            </div>
          )
        }
      </div>
    );
}