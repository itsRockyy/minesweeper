document.querySelector("#app").innerHTML='\n  <h1>Hello Vite!</h1>\n  <a href="https://vitejs.dev/guide/features.html" target="_blank">Documentation</a>\n';const t=new class{constructor(t,i,e){this.ROWS=t,this.COLUMNS=i,this.board=[],this.mines=e,this.mineLocations=new Set}init(){for(;this.mineLocations.size!==this.mines;)this.mineLocations.add(Math.floor(Math.random()*this.ROWS*this.COLUMNS));for(let t=0;t<this.ROWS;t++){const i=[];for(let e=0;e<this.COLUMNS;e++)i.push({x:t,y:e,isMine:this.mineLocations.has(this.ROWS*t+e),isRevealed:!1,value:0});this.board.push(i)}for(let t=0;t<this.ROWS;t++)for(let i=0;i<this.COLUMNS;i++)this.board[t][i].value=this.getValueAtCell(t,i)}printBoard(){for(let t=0;t<this.ROWS;t++){let i="";for(let e=0;e<this.COLUMNS;e++)i+=`  ${this.board[t][e].isMine?"X":this.board[t][e].value}  `;console.log(`${i}\n`)}}getValueAtCell(t,i){let e=0;for(let s=-1;s<2;s++){const o=this.board[t+s];o&&(o[i-1]&&o[i-1].isMine&&(e+=1),o[i]&&o[i].isMine&&(e+=1),o[i+1]&&o[i+1].isMine&&(e+=1))}return e}}(3,3,2);t.init(),t.printBoard(),console.log(t.board);