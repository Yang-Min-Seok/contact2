import axios from 'axios';

const serverApi = axios.create({
    headers: {
      'Content-Type': 'application/json',
    },
});

// 단축 URL 받아오기
export const getShortenUrl = async (navigate, numberOfTeam, authCode) => {
    
    // .then 전까지가 쏘는 구간
    // response부터가 응답 값을 받아오는 것1
    await serverApi.post('http://www.buly.kr/api/shoturl.siso', { numberOfTeam, authCode }).then((response) => {
      
    });
};