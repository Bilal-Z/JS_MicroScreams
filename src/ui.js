class UI {
	constructor() {
		this.posts = document.querySelector('#posts');
		this.titleInput = document.querySelector('#title');
		this.bodyInput = document.querySelector('#body');
		this.idInput = document.querySelector('#id');
		this.postSubmit = document.querySelector('.post-submit');
		this.formState = 'add';
	}

	showPosts(posts) {
		let output = '';
		posts.forEach((post) => {
			output += `
				<div class="card mb-3">
					<div class="card-body">
						<h4 class="card-title">${post.title}</h4>
						<p class="card-text">${post.body}</p>
						<a href="#" class="edit card-link" data-id="${post.id}">
							<i class="fa fa-pencil"></i>
						</a>
						<a href="#" class="delete card-link" data-id="${post.id}">
							<i class="fa fa-remove"></i>
						</a>
					</div>
				</div>`;
		});

		this.posts.innerHTML = output;
	}

	showAlert(message, className) {
		this.clearAlert();

		// create div
		const div = document.createElement('div');
		div.className = className;
		div.appendChild(document.createTextNode(message));
		// get parent
		const container = document.querySelector('.postsContainer');
		// insert alert div
		container.insertBefore(div, this.posts);

		// time out
		setTimeout(() => this.clearAlert(), 2000);
	}

	clearAlert() {
		const currentAlert = document.querySelector('.alert');

		if (currentAlert) {
			currentAlert.remove();
		}
	}

	clearFields() {
		this.titleInput.value = '';
		this.bodyInput.value = '';
	}

	fillForm(data) {
		this.titleInput.value = data.title;
		this.bodyInput.value = data.body;
		this.idInput.value = data.id;

		this.changeFormState('edit');
	}

	clearIdInput() {
		this.idInput.value = '';
	}

	changeFormState(type) {
		if (type === 'edit') {
			this.postSubmit.textContent = 'Update Scream';
			this.postSubmit.className = 'post-submit btn btn-block btn-info';

			// crate cancel button
			const button = document.createElement('button');
			button.className = 'post-cancel btn btn-danger btn-block';
			button.appendChild(document.createTextNode('Cancel Edit'));
			// get parent
			const cardForm = document.querySelector('.card-form');
			// element to insert before
			const formEnd = document.querySelector('.form-end');
			// insert cancel button
			cardForm.insertBefore(button, formEnd);
		} else {
			this.postSubmit.textContent = 'Scream';
			this.postSubmit.className = 'post-submit btn btn-block btn-primary';

			// remove cancel button
			const cancelBtn = document.querySelector('.post-cancel');
			if (cancelBtn) {
				cancelBtn.remove();
			}

			// clear id from hidden field
			this.clearIdInput();

			// clear feilds
			this.clearFields();
		}
	}
}

export const ui = new UI();
