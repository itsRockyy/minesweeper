class e{constructor(e,t,n){this.startTime=Date.now(),this.ROWS=e,this.COLUMNS=t,this.board=[],this.mines=n,this.mineLocations=new Set}init(){for(;this.mineLocations.size!==this.mines;)this.mineLocations.add(Math.floor(Math.random()*this.ROWS*this.COLUMNS));for(let e=0;e<this.ROWS;e++){const t=[];for(let n=0;n<this.COLUMNS;n++)t.push({x:e,y:n,isMine:this.mineLocations.has(this.ROWS*e+n),isRevealed:!1,value:null});this.board.push(t)}for(let e=0;e<this.ROWS;e++)for(let t=0;t<this.COLUMNS;t++)this.board[e][t].isMine||(this.board[e][t].value=this.getValueAtCell(e,t))}printBoard(){for(let e=0;e<this.ROWS;e++){let t="";for(let n=0;n<this.COLUMNS;n++)t+=`  ${this.board[e][n].isMine?"X":this.board[e][n].value}  `;console.log(`${t}\n`)}}getValueAtCell(e,t){let n=0;for(let r=-1;r<2;r++){const s=this.board[e+r];s&&(s[t-1]&&s[t-1].isMine&&(n+=1),s[t]&&s[t].isMine&&(n+=1),s[t+1]&&s[t+1].isMine&&(n+=1))}return n}getAdjacentCells(e,t){const n=[];for(let r=-1;r<2;r++){const s=this.board[e+r];if(s){let e=s[t-1],i=s[t],l=s[t+1];e&&!e.isMine&&n.push(e),0!==r&&i&&!i.isMine&&n.push(i),l&&!l.isMine&&n.push(l)}}return n}recursivelyOpenCells(e,t){let n=[],r=[this.board[e][t]];for(;r.length;){const e=r.shift(),t=this.getAdjacentCells(e.x,e.y);for(let s of t)s.isRevealed||(n.push(s),0===s.value&&r.push(s),s.isRevealed=!0)}return n}openCell(e,t){const{isMine:n,value:r,x:s,y:i}=this.board[e][t];if(n)return{gameOver:!0,revealed:[...this.mineLocations]};if(0!==r)return this.board[e][t].isRevealed=!0,{gameOver:!1,revealed:[{value:r,x:s,y:i}]};return{gameOver:!1,revealed:[{value:r,x:s,y:i},...this.recursivelyOpenCells(e,t)]}}}const t={easy:{rows:10,columns:10,mines:15},medium:{rows:15,columns:15,mines:40},hard:{rows:20,columns:20,mines:99}};window.onload=function(){const n=document.querySelector("#difficulty"),r=document.querySelector("#board"),s=document.querySelector(".game-over"),i=document.querySelector("#timer"),l=s.querySelector("h1"),o=document.querySelector(".finish-time");let a=null,c=null;const d=()=>{const{rows:s,columns:d,mines:u}=t[n.value];c=new e(s,d,u),c.init(),l.style.display="block",i.innerHTML="<strong>⏰ Time </strong> 00:00",o.innerHTML="⏰ 00:00",((e,t)=>{r.innerHTML=e.reduce(((e,t)=>e+`<div class="cell" data-x="${t.x}" data-y="${t.y}"></div>`),""),r.style.width=`calc(${t*document.querySelector(".cell").clientWidth}px + ${2*(t-1)}px)`,a=setInterval((()=>{const e=Math.floor((Date.now()-c.startTime)/1e3),t=Math.floor(e/60).toString().padStart(2,"0"),n=Math.floor(e%60).toString().padStart(2,"0");i.innerHTML=`<strong>⏰ Time</strong> ${t}:${n}`,o.innerHTML=`⏰ ${t}:${n}`}),1e3),c.printBoard()})(c.board.flat(),d)};r.addEventListener("click",(({target:e})=>{if(!e.classList.contains("cell"))return;const{x:t,y:n}=e.dataset,{revealed:i,gameOver:o}=c.openCell(parseInt(t,10),parseInt(n,10));if(o)return clearInterval(a),e.innerHTML="💣",void i.forEach(((e,t)=>{const n=r.querySelector(`:nth-child(${e+1})`);setTimeout((()=>{n.dataset.val="💣",n.innerHTML="💣",t===i.length-1&&(l.innerHTML="You Lost !!! 👎",s.querySelector("#retry").innerHTML="Retry",s.style.top=0)}),200*t)}));c.board.flat().reduce(((e,t)=>e+(t.isRevealed?1:0)),0)+c.mines===c.ROWS*c.COLUMNS&&(clearInterval(a),l.innerHTML="You Win !!! ✌️",s.querySelector("#retry").innerHTML="New Game",s.style.top=0);for(let s of i){const e=r.querySelector(`:nth-child(${s.x*c.ROWS+s.y+1})`);e.dataset.val=s.value,e.innerHTML=s.value||""}})),n.addEventListener("change",(()=>{clearInterval(a),l.innerHTML="Start Game",l.style.display="none",o.style.display="none",s.style.top="0"})),document.querySelector("#retry").addEventListener("click",(()=>{d(),s.style.top="100%",o.style.display="block"}))};
