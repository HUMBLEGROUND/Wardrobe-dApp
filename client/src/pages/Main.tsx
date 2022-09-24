import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Main.css";
import Swal from "sweetalert2";

function Main() {
  const id = "admin";
  const password = "adminpw";

  const onClickAdminCert = async () => {
    let body = {
      id,
      password,
    };

    let adminCert = await axios.post("http://localhost:8080/admin/", body);
    if (adminCert.data.result === "failed") {
      Swal.fire({
        title: "이미 등록되어있습니다 !",
        text: "옷장을 등록하세요 ! 🚪",
        icon: "warning",
        confirmButtonText: "확인",
        confirmButtonColor: "#910",
      });
    } else {
      Swal.fire({
        title: "권한 등록 완료 !",
        text: "옷장을 등록하세요 ! 🚪",
        icon: "success",
        confirmButtonText: "확인",
        confirmButtonColor: "#198754",
      });
    }
    // ⭐ Promise<pending> Error 해결
    // 👉 async/await 나 then 둘중에 하나만 사용해야한다!
  };

  return (
    <div className="main_wrapper">
      <div className="main_container">
        <div className="main_text">
          <div className="main_title">
            나의 옷장에서 옷을 꺼내서 등록 해보세요 !
          </div>
          <div className="main_description">
            블록체인을 이용하여 옷 정보를 기록해보세요 !
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
