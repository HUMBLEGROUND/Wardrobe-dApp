import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Main.css";

function Main() {
  const id = "admin";
  const password = "adminpw";

  const onClickAdminCert = () => {
    let body = {
      id,
      password,
    };
    console.log(body);
    axios
      .post("http://localhost:8080/admin/", body)
      .then(res => console.log(res));
  };

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
            <div className="main_admin_btn" onClick={onClickAdminCert}>
              권한등록
            </div>
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
          />
        </div>
      </div>
    </div>
  );
}

export default Main;
