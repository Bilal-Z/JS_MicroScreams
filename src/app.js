import { http } from './http';
import { ui } from './ui';

// get posts on DOM load
document.addEventListener('DOMContentLoaded', getPosts);

function getPosts() {
	http
		.get('http://localhost:3000/posts')
		.then((data) => ui.showPosts(data))
		.catch((err) => console.log(err));
}

// listen for add post button
document.querySelector('.post-submit').addEventListener('click', submitPost);

function submitPost() {
	const title = document.querySelector('#title').value;
	const body = document.querySelector('#body').value;
	const id = document.querySelector('#id').value;

	const data = {
		title,
		body,
	};

	if (title === '' || body === '') {
		ui.showAlert(
			'Take your time, you can scream when you are ready.',
			'alert alert-warning'
		);
	} else if (title == title.toLowerCase() || body == body.toLowerCase()) {
		ui.showAlert('SCREAM LOUDER', 'alert alert-danger');
	} else {
		if (id === '') {
			// create post
			// post request
			http
				.post('http://localhost:3000/posts', data)
				.then((data) => {
					ui.showAlert('Scream Added', 'alert alert-success');
					ui.clearFields();
					getPosts();
				})
				.catch((err) => console.log(err));
		} else {
			// update post
			// put request
			http
				.put(`http://localhost:3000/posts/${id}`, data)
				.then((data) => {
					ui.showAlert('Scream Updated', 'alert alert-success');
					ui.changeFormState();
					getPosts();
				})
				.catch((err) => console.log(err));
		}
	}
}

// listen for delete
document.querySelector('#posts').addEventListener('click', deletePost);

function deletePost(e) {
	if (e.target.parentElement.classList.contains('delete')) {
		const id = e.target.parentElement.dataset.id;
		if (confirm('Are you sure?')) {
			http
				.delete(`http://localhost:3000/posts/${id}`)
				.then((data) => {
					ui.showAlert('Scream Removed', 'alert alert-success');
					getPosts();
				})
				.catch((err) => console.log(err));
		}
	}
	e.preventDefault();
}

// listen for edit state
document.querySelector('#posts').addEventListener('click', enableEdit);

function enableEdit(e) {
	if (e.target.parentElement.classList.contains('edit')) {
		const id = e.target.parentElement.dataset.id;
		const title =
			e.target.parentElement.previousElementSibling.previousElementSibling
				.textContent;
		const body = e.target.parentElement.previousElementSibling.textContent;

		const data = { id, title, body };

		// fill form with current post
		ui.fillForm(data);
	}
	e.preventDefault();
}

// listen for cancel edit
document.querySelector('.card-form').addEventListener('click', cancelEdit);

function cancelEdit(e) {
	if (e.target.classList.contains('post-cancel')) {
		ui.changeFormState('add');
	}
	e.preventDefault();
}
