let boxes = document.querySelectorAll(".box");
let rstButton = document.querySelector(".reset-button")
let statusUpdate = document.querySelector(".status");
let player1Name = document.querySelector(".Player1");
let player2Name = document.querySelector(".Player2");
let button1 = document.querySelector(".btn1");
let button2 = document.querySelector(".btn2");
let name1="";
let name2="";
let cnt1=0;
let cnt2=0;
let cntd=0;
let hitCount=0;
let Scores = document.querySelector(".score");
const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,4,6],
    [2,5,8],
    [3,4,5],
    [6,7,8],
];
let turn = true;
// console.log(boxes);
boxes.forEach((box) => 
    box.addEventListener("click", () =>
    {
        if(name1==="" && name2==="")
        {
            statusUpdate.classList.add("invalid-move");
            statusUpdate.innerText="Insert Player Names...";
        }
        else
        {
            statusUpdate.classList.remove("invalid-move");
            if(turn)
            {
            if(box.innerText==="")
            {
                hitCount+=1;
                box.innerText = "X";
                turn = false;
                statusUpdate.classList.remove("invalid-move");
                statusUpdate.innerText = "";
            }
            else
            {
                statusUpdate.classList.add("invalid-move");
                statusUpdate.innerText = "Invalid Move";
            }           
            }
            else
            {
            if(box.innerText==="")
            {
                hitCount+=1;
                box.innerText = "O";
                turn = true;
                statusUpdate.classList.remove("invalid-move");
                statusUpdate.innerText = "";
            }
            else
            {
                statusUpdate.classList.add("invalid-move");
                statusUpdate.innerText = "Invalid Move";
            }            
            }
            checkWinner();
            }
        
    }

    )
)


function player1Btn()
{
    name1 = player1Name.value;
    Scores.innerText=`Score : ${name1}   |`;
}

function player2Btn()
{
    name2 = player2Name.value;
    Scores.innerText=`Score : ${name1}   | ${name2}`;
}


function checkWinner()
{
    let win = false;
    let winner = "";
    for(pattern of winPatterns){
        // console.log((boxes[pattern[0]].innerText, boxes[pattern[1]].innerText, boxes[pattern[2]].innerText));

        if ((boxes[pattern[0]].innerText==="O") && (boxes[pattern[1]].innerText==="O") && (boxes[pattern[2]].innerText === "O"))
        {
            win = true;
            winner = "O";
            cnt2+=1;
            winner = boxes[pattern[0]].innerText;
            boxes.forEach((box) => {
                setTimeout(() => {
                    box.innerText="";
                  }, "500");
            }
            
        )
        turn = true;
            
        }
        if ((boxes[pattern[0]].innerText==="X") && (boxes[pattern[1]].innerText==="X") && (boxes[pattern[2]].innerText === "X"))
        {
            win = true;
            winner = "X";
            cnt1+=1;
            winner = boxes[pattern[0]].innerText;
            boxes.forEach((box) => {
                setTimeout(() => {
                    box.innerText="";
                  }, "500");
            }
        )
        turn = true;
        }
        
        
    }
    if(win === true)
    {
        if(winner === "X")
        {
            statusUpdate.innerText = `${name1} wins`;
            setTimeout(() => {
                statusUpdate.innerText = "";
              }, "1500");
            // statusUpdate.innerText = `${name1} wins`;
        }            
        else
        {
            statusUpdate.innerText = `${name2} wins`;
            setTimeout(() => {
                statusUpdate.innerText = "";
              }, "1500");
        }
        hitCount=0;
            
    }
    else
    {
        if(hitCount===9)
        {
            cntd+=1;
            statusUpdate.innerText="Match Draw";
            setTimeout(() => {
                statusUpdate.innerText = "";
              }, "1500");
            console.log(hitCount);
            boxes.forEach((box) => {
                setTimeout(() => {
                    box.innerText="";
                  }, "1000");
            }
        )
        hitCount=0;
        }
            
    }
    score();
}
function resetAll(){
    boxes.forEach((box) =>
    {
        box.innerText = ""
    }
    );
    //console.log(boxes.innerText);
    turn = true;
    // statusUpdate.innerText = "Status :";
    player1Name.value="";
    player2Name.value="";
    name1="";
    name2="";
    Scores.innerText="Scores : "
}
function score()
{
    Scores.innerText = `Score : ${name1} = ${cnt1} || ${name2} = ${cnt2} || Draw = ${cntd}`
}