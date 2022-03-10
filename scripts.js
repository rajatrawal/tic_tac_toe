let music = new Audio('music.mp3');
let turnMusic = new Audio('ting.mp3');
let gameoverMusic = new Audio('gameover.mp3');
let turn = 'X';
let gameOver = false
let isFull = false;
// function to change turn 
const changeTurn = ()=> {return turn === 'X' ?'O':'X'};
// function to check win 
const checkWin = ()=>{
    boxText = document.getElementsByClassName('boxText');
    let wins = [
        [0,1,2,0,5,0,0,15,0],
        [3,4,5,0,15,0,0,45,0],
        [6,7,8,0,25,0,0,75,0],
        [0,3,6,-10,15,90,-30,45,90],
        [1,4,7,0,15,90,0,45,90],
        [2,5,8,10,15,90,30,45,90],
        [0,4,8,0,15,45,0,45,45],
        [6,4,2,0,15,135,0,45,135]
    ];
    wins.forEach((e,i)=>{
        if((boxText[e[0]].innerText === boxText[e[1]].innerText)&&(boxText[e[1]].innerText === boxText[e[2]].innerText)&&(boxText[e[0]].innerText !=='')){
            gameOver =true;
            document.getElementsByClassName('infoDiv')[0].innerHTML = `
            <span class="info">
                         <span class='win-gif'>${boxText[e[1]].innerText} Win The Game </span>
            </span>
            `;
            document.querySelector('.line').style.width = '100%';
            if (window.innerWidth > 600) {

                document.querySelector('.line').style.transform = `translate(${e[3]}rem, ${e[4]}rem) rotate(${e[5]}deg)`;
            }
            else{
                document.querySelector('.line').style.transform = `translate(${e[6]}vw, ${e[7]}vw) rotate(${e[8]}deg)`;
            }
            gameoverMusic.play();
       
        }

        
        
    });
    if (gameOver===false) {
        Array.from(boxText).forEach((e,i )=>{
        if (e.innerText == ''){
            isFull = false;
        }
    });

    if (isFull !== false){
        document.getElementsByClassName('infoDiv')[0].innerHTML = `
        <span class="info">
                     <span class=''>Game Tie</span>
        </span>
        `;
    }
    }
    
}

// game logic start
spanTag =document.getElementsByClassName('info')[0].getElementsByTagName('span')[0];

let boxes = document.getElementsByClassName('box');
Array.from(boxes).forEach(element=>{
    let boxText = element.querySelector('.boxText');
    if (gameOver === false) {
        
        
    element.addEventListener('click',()=>{
       
        if (boxText.innerText === ''){
            boxText.innerText = turn;
            boxText.style.color = getColor(turn);
            
            turn = changeTurn();
            turnMusic.play();
            isFull = true;
            checkWin();
            if (!gameOver){
                spanTag.innerText=  turn;
            }
        }
    }
    )   
}
})
let getColor = (turn)=>{
    if (turn === 'X'){
       
        return 'red';
    }
    else{
        return 'green';


    }
}

reset.addEventListener('click',()=>{
    boxText = document.getElementsByClassName('boxText');
    Array.from(boxText).forEach(element=>{
        element.innerText = '';
    })
    gameOver = false;
    turn = 'X';
    document.getElementsByClassName('infoDiv')[0].innerHTML = `
    <span class="info">
                        Turn For <span>X</span> 
    </span>
    `;
    document.querySelector('.line').style.width = '0';
})
