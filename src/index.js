
const cells = document.getElementsByClassName('chart-cell');
console.log('cell1= ', cells);
console.log(Object.keys(cells));

cells.map(cell=>{
    cell.onclick = function(event) {
        console.log(event.target);
        // event.target.style.backgroundColor = 'yellow';
      
        // alert("target = " + event.target.tagName + ", this=" + this.tagName);
      
        // event.target.style.backgroundColor = '';
      };
});

// cell1.onclick = function(event) {
//     console.log(event.target);
//     // event.target.style.backgroundColor = 'yellow';
  
//     // alert("target = " + event.target.tagName + ", this=" + this.tagName);
  
//     // event.target.style.backgroundColor = '';
//   };

// function handleClick (e) {
//     e = e || window.event;
//     console.log(e.target);

// }