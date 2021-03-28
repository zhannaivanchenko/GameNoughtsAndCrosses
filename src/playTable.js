import { matrix }from "./matrix.js";

class PlayTable {

    getTableView() {
        let table = '';
        const tableStart = "<table class='play-chart-table' > ";
        const tableRow = "<tr class='chart-row'>";
        const tableRowEnd = "</tr>";
        const tableEnd =  "</table> ";
        let i = 0;

        matrix.getDb().forEach(row => { 
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

    renderTable() {
        const playChart = document.getElementById('chart-table');
        playChart.innerHTML = this.getTableView();
        
    }
    
   updateTableView() {
       const cellsTable = [...document.getElementsByTagName('td')];
       let j = 0;
       matrix.getDb().forEach(row => { 
            row.forEach(cell => {
               if (cell === 1) { cellsTable[j].dataset.sign = 'cross'}
               else if (cell === 2) { cellsTable[j].dataset.sign = 'nought'}
               else {cellsTable[j].dataset.sign = ''}
               j++;
        })
    })   
   }

}

export const playTable = new PlayTable();