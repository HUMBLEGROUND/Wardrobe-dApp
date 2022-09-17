import { Link } from "react-router-dom";
import "../styles/Main.css";

function Main() {
  return (
    <div className="main_wrapper">
      <div className="main_container">
        <div className="main_text">
          <div className="main_title">
            나의 옷장에서 옷을 꺼내서 등록 해보세요!
          </div>
          <div className="main_description">
            블록체인을 이용하여 중고거래를 기록하세요!
          </div>
          <div className="main_content">
            <Link to="/admin">
              <div className="main_admin_btn">권한등록</div>
            </Link>
            <Link to="/users">
              <div className="main_user_btn">옷장등록</div>
            </Link>
          </div>
        </div>
        <div>
          <img
            className="main_bg"
            src="closet.jpg"
            width="550"
            height="550"
            alt=""
            // 👆 메인 페이지에 판매중인 이미지 띄우기
          />
        </div>
      </div>
    </div>
    // <div className="main_container">
    //   <div className="main_wrapper">
    //     <div className="main_text">
    //       <img src="closet.jpg" className="main_background-img" />
    //       <div className="title">Welcome to Simple Asset Transfer Basic !</div>
    //       <div className="description ">
    //         자산관리 사이트에 오신것을 환영합니다!
    //       </div>

    //       <Link to="/admin">
    //         <div className="btn btn-danger">관리자 지갑 생성</div>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  );
}

export default Main;
