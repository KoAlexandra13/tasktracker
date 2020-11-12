import axios from 'axios'

export function createNewBoardRequest(boardColumns, boardTitle, boardBackgroundURL){
    const config = {
        url: 'http://127.0.0.1:8000/api/tables/', 
        method: 'POST',
        data: {
            columns: boardColumns,
            name: boardTitle,
            backgroundImage: boardBackgroundURL
        }
    };
    return axios(config);
}
