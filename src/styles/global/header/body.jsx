import { BodyDiv } from "./style";
import { useNavigate, useLocation } from "react-router-dom";

function Body() {
    const navigate = useNavigate();
    const location = useLocation(); // 현재 위치 가져오기

    const handleOnclickBtn = (e) => {
        const order = e.target.id;
        if (order === 'logo' && location.pathname !== '/') { // 메인 페이지가 아닐 때만 실행
            const ans = window.confirm('本当に戻りますか？');
            if (ans) {
                navigate('/');
            }
        }
    }

    return (
        <BodyDiv>
            <div id="logo" onClick={handleOnclickBtn}></div>
        </BodyDiv>
    );
}

export default Body;
