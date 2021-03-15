// import { putCross } from './index';

class Matrix {
    _db = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0],  
    ]
    
    tdsArray = []

    getTds() {
        tds = document.getElementsByTagName ('td');
        this.tdsArray = Array.from(tds);
    }

    getTableView() {
        let table = '';
        let tableStart = "<table class='play-chart-table' > ";
        let tableRow = "<tr class='chart-row'>";
        let tableRowEnd = "</tr>";
        let tableEnd =  "</table> ";
        let i = 0;

        this._db.forEach(row => { 
            let cells = '';
            row.forEach(cell => {
                let sign = '';
                
                let tableCell = `<td class='chart-cell' id=${i} data-sign=${sign}></td>`;
                cells = cells + tableCell;
                i++;
            })
            table = table + tableRow + cells + tableRowEnd;
        });  
        return table = tableStart + table + tableEnd;
    }
   
    updateTableView() {
    this._db.forEach(row => { 
        row.forEach(cell => {
            let sign = '';
            if (cell === 1) {sign = 'cross'} 
            if (cell === 2) {sign = 'nought'}
        })
    })
   }

    renderTable() {
        let playChart = document.getElementById('chart-table');
        playChart.innerHTML = this.getTableView();
    }

    on(eventName, handler) {
        this._handler = handler;
    }

    addEventListeners() {
        this.tdsArray.forEach(e => e.addEventListener('click', putCross));
    }

   
    
    

}

let matrix = new Matrix();
matrix.renderTable();
matrix.getTds();
matrix.addEventListeners();

