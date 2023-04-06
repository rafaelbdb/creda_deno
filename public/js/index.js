// This script could make requests to the API to get the boards and display them on the page
fetch('/api/boards')
    .then((response) => response.json())
    .then((boards) => {
        const boardList = document.querySelector('.boards ul');
        boards.forEach((board) => {
            const boardLink = document.createElement('a');
            boardLink.href = `/boards/${board.id}`;
            boardLink.textContent = board.name;
            const boardItem = document.createElement('li');
            boardItem.appendChild(boardLink);
            boardList.appendChild(boardItem);
        });
    });
