// This script could make requests to the API to get the task and comments and display them on the page
fetch('/api/tasks/1')
    .then((response) => response.json())
    .then((task) => {
        const taskTitle = document.querySelector('.task h2');
        taskTitle.textContent = task.name;
        const taskDescription = document.querySelector('.task p');
        taskDescription.textContent = task.description;
        const commentList = document.querySelector('.comments');
        task.comments.forEach((comment) => {
            const commentItem = document.createElement('li');
            commentItem.textContent = comment.text;
            commentList.appendChild(commentItem);
        });
    });

// This script could listen for the form submission and make a request to add the comment
const addCommentForm = document.createElement('form');
addCommentForm.setAttribute('class', 'add-comment-form');
addCommentForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const commentText = formData.get('comment-text');
    const cardId = formData.get('card-id');
    const authorId = getCurrentUserId(); // assumes there is a getCurrentUserId function
    const comment = { text: commentText, cardId: cardId, authorId: authorId };
    createComment(comment); // assumes there is a createComment function
    addCommentToDOM(comment); // assumes there is a addCommentToDOM function
    event.target.reset();
});
const commentInput = document.createElement('textarea');
commentInput.setAttribute('name', 'comment-text');
commentInput.setAttribute('placeholder', 'Add a comment...');
const cardIdInput = document.createElement('input');
cardIdInput.setAttribute('type', 'hidden');
cardIdInput.setAttribute('name', 'card-id');
addCommentForm.appendChild(commentInput);
addCommentForm.appendChild(cardIdInput);
const submitButton = document.createElement('button');
submitButton.setAttribute('type', 'submit');
submitButton.textContent = 'Add Comment';
addCommentForm.appendChild(submitButton);

// Load the task data
function loadTask(taskId) {
    // Make a request to the server for the task data
    $.ajax({
        url: '/api/tasks/' + taskId,
        type: 'GET',
        success: function (data) {
            // Populate the task details form with the data
            $('#task-title').val(data.title);
            $('#task-description').val(data.description);
            $('#task-duedate').val(data.dueDate);
            $('#task-priority').val(data.priority);

            // Display the comments for the task
            loadComments(taskId);
        },
        error: function (xhr, status, error) {
            // Handle error
            console.error('Error loading task data:', error);
        },
    });
}

// Load the comments for a task
function loadComments(taskId) {
    // Make a request to the server for the comments
    $.ajax({
        url: '/api/tasks/' + taskId + '/comments',
        type: 'GET',
        success: function (data) {
            // Clear the existing comments
            $('#comments-list').empty();

            // Add each comment to the list
            data.forEach(function (comment) {
                var commentHtml = '<li>' + comment.text + '</li>';
                $('#comments-list').append(commentHtml);
            });
        },
        error: function (xhr, status, error) {
            // Handle error
            console.error('Error loading comments:', error);
        },
    });
}

// Add a new comment to a task
function addComment(taskId, commentText) {
    // Create the new comment object
    var newComment = { text: commentText };

    // Make a request to the server to add the comment
    $.ajax({
        url: '/api/tasks/' + taskId + '/comments',
        type: 'POST',
        data: newComment,
        success: function (data) {
            // Clear the comment text input
            $('#comment-text').val('');

            // Reload the comments list to display the new comment
            loadComments(taskId);
        },
        error: function (xhr, status, error) {
            // Handle error
            console.error('Error adding comment:', error);
        },
    });
}
