export const generateState = (oldState) => {
    let [numberOfRows,
        numberOfColumns] = [oldState.length, oldState[0].length];

    let newState = oldState.map((boardRow, indexRow) => {
        return boardRow.map((cell, indexColumn) => {
            let neighbours = 0;
            let row,
                column;
            for (let r = -1; r <= 1; r++) {
                for (let c = -1; c <= 1; c++) {
                    if (r !== 0 || c !== 0) {
                        row = indexRow + r;
                        column = indexColumn + c;
                        if (row < 0) 
                            row = numberOfRows - 1;
                        else if (row === numberOfRows) 
                            row = 0;
                        if (column < 0) 
                            column = numberOfColumns - 1;
                        else if (column === numberOfColumns) 
                            column = 0;
                        if (oldState[row][column] === 1) 
                            neighbours++;
                    }
                }
            }

            if (cell === 1) {
                switch (neighbours) {
                    case 2:
                    case 3:
                        return 1;
                    default:
                        return 0;
                }
            } else if (neighbours === 3) 
                return 1;
            else 
                return 0;
        });
    });

    for (let i = 0; i < newState.length; i++) 
        if (newState[i].includes(1)) 
            return newState;
    return null;
}