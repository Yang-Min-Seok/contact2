import { BodyDiv } from "./style";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
function Body() {
    
    const location = useLocation();
    const courtNum = location.state.court_num;
    const pplNum = location.state.ppl_num;
    const gameNum = Number(location.state.game_num);
    const gameCnt = location.state.gameCnt;
    const games = location.state.games;

    const [ currGame, setCurrGame ] = useState(0);
    const [ popUp, setPopUp ] = useState(false);

    // point current game
    const pointCurrGame = () => {
        for (let i = 0; i < gameNum; i++) {
            const gameTr = document.getElementById(`game${i}`);
            gameTr.style.backgroundColor = '#fff';
            gameTr.style.color = '#000';
        }

        const currGameTr = document.getElementById(`game${currGame}`);
        currGameTr.style.backgroundColor = '#AE905E';
        currGameTr.style.color = '#fff';
    }

    // make frame
    const makeTableFrame = () => {
        const tableHead = document.getElementById('tableHead');
        tableHead.innerHTML = ``;
        for (let i = 1; i <= courtNum; i++) {
            const prevHead = tableHead.innerHTML;
            tableHead.innerHTML = prevHead + `
                <td>コート ${i}</td>
            `
        }

        const tableBody = document.getElementById(`tableBody`);
        tableBody.innerHTML = ``;
        for (let i = 0; i < gameNum; i++) {
            const prevBody = tableBody.innerHTML;
            tableBody.innerHTML = prevBody + `
                <tr id="game${i}"></tr>
            `
        }

        for (let i = 0; i < gameNum; i++) {
            const tableBody = document.getElementById(`game${i}`);
            tableBody.innerHTML = ``;
            for (let j = 0; j < courtNum; j++) {
                const prevBody = tableBody.innerHTML;
                tableBody.innerHTML = prevBody + `
                    <td id="game${i}court${j}"></td>
                `
            }
        }
    }

    // fill up table
    const fillUpTable = () => {
        for (let i = 0;  i < gameNum; i++) {
            for (let j = 0; j < courtNum; j++) {
                const targetTd = document.getElementById(`game${i}court${j}`);
                printOut(targetTd, games[i][j]);
            }
        }
    }

    const printOut = (targetTd, participants) => {
        for (let i = 0; i < 4; i++) {
            const prevContent = targetTd.innerHTML;
            targetTd.innerHTML = ``;
            targetTd.innerHTML = prevContent + `
                ${participants[0][i]}
            `;
        }

    }
    
    // handle Btn Clicks
    const handleOnClickBtns = (e) => {
        const order = e.target.id;
        if (order === 'prevBtn') {
            if (currGame !== 0) {
                setCurrGame(currGame - 1);
            }
        } else if (order === 'nextBtn') {
            if(currGame !== gameNum - 1) {
                setCurrGame(currGame + 1);
            }
        } else if (order === 'shareBtn') {
            // games 배열을 JSON으로 변환한 후, URL 인코딩 처리
            const gamesParam = encodeURIComponent(JSON.stringify(games));

            // dynamicUrl
            const dynamicUrl = `https://social-plugins.line.me/lineit/share?url=https://https://contact2-red.vercel.app/share/${gameNum}/${courtNum}/${gamesParam}`;
            
            // 새 창에서 URL 열기
            window.open(dynamicUrl, "_blank", "oopener,noreferrer");
        }
    }

    // handling pop up event
    const handleOnClickPopUpBtn = (e) => {
        const target = e.target.id;
        if (target === 'popUpBtn' || target === 'popUpOverlay'){
            setPopUp(!popUp);
        }
    }
    
    // make pop up Frame
    const makePopUpFrame = () => {
        if (popUp) {
            const popUpTableBody = document.getElementById('popUpTableBody');
            popUpTableBody.innerHTML = ``;
            for (let i = 0; i < pplNum; i++) {
                const prevBody = popUpTableBody.innerHTML;
                popUpTableBody.innerHTML = prevBody + `
                    <tr>
                        <td id="ppl${i}">${i+1}</td>
                        <td id="ppl${i}game"></td>
                    </tr>
                `
            }
        }
    }
    
    // fill pop up table
    const fillPopUpTable = () => {
        if (popUp) {
            for (let i = 0; i < pplNum; i++) {
                const target = document.getElementById(`ppl${i}game`);
                target.innerHTML = `${gameCnt[i]}`;
            }
        }
    }

    // updates
    useEffect(() => {
        makeTableFrame();
        fillUpTable();
    }, [])

    // pointing currGame
    useEffect(() => {
        pointCurrGame();
    }, [currGame])

    // popUp
    useEffect(() => {
        makePopUpFrame();
        fillPopUpTable();
    }, [popUp])

    return (
        <BodyDiv>
            <p id="popUpBtn" onClick={handleOnClickPopUpBtn}>一人当たりのゲーム数を見る</p>
            <table>
                <thead>
                    <tr id="tableHead">
                    </tr>
                </thead>
                <tbody id="tableBody">
                </tbody>
            </table>
            <div>
                <p id="prevBtn" onClick={handleOnClickBtns}>先</p>
                <p id="shareBtn" onClick={handleOnClickBtns}></p>
                <p id="nextBtn" onClick={handleOnClickBtns}>次</p>
            </div>
            {popUp && (
                <div id="popUpOverlay" onClick={handleOnClickPopUpBtn}>
                    <div id="popUp">
                        <table>
                            <thead>
                                <tr>
                                    <td>番号</td>
                                    <td>ゲーム数</td>
                                </tr>
                            </thead>
                            <tbody id="popUpTableBody">

                            </tbody>
                        </table>
                        <p id="popUpBtn" onClick={handleOnClickPopUpBtn}>閉じる</p>
                    </div>
                </div>
            )}
        </BodyDiv>
    )
}

export default Body