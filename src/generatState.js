export const generateState = (oldState) => {
    let [rows,
        columns] = [oldState.length, oldState[0].length];
    
    return oldState.map((row, indexRow) => {
        return row.map((cell, indecColumn) => {
            let neighbours = 0;
            let r,c;
            //console.log("CELL: ", cell);
            for(let i = -1; i <= 1; i++) {
                for(let j = -1; j <= 1; j++){
                    if(i !== 0 || j !== 0) {
                        r = indexRow + i;
                        c = indecColumn + j;
                        if(r < 0) r = rows - 1;
                        else if(r === rows) r = 0;
                        if(c < 0) c = columns - 1;
                        else if(c === columns) c = 0;
                        if(oldState[r][c] === 1) neighbours++;
                        //console.log(r, c, ":",oldState[r][c])
                    }
                }
            }
            //console.log("NEIGHBOURS: ", neighbours);
            if(cell === 1) {
                switch(neighbours) {
                    case 2:
                    case 3:
                        return 1;
                    default:
                        return 0;                     
                }
            } else if(cell === 0 && neighbours === 3) 
                return 1;
            else return 0;
        });
    })
}