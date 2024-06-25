function getUsers() {
  let request = new XMLHttpRequest()
  request.open('GET', 'https://jsonplaceholder.typicode.com/users')
  request.send()

  request.onload = function () {
    if (request.status >= 200 && request.status < 300) {
      let users = JSON.parse(request.responseText)
      let usersList = document.querySelector('.users-list')
      let loading = document.querySelector('.users-loader')
      loading.style.display = 'none'

      users.map((user, idx) => {
        if (idx === 0) {
          // Add active class to the first user
          usersList.innerHTML += `
          <li class="user active" data-user-id="${user.userId}">
            <h3 class="username">${user.name}</h3>
            <p class="email">${user.email}</p>
          </li>
        `
          return
        }

        usersList.innerHTML += `
          <li class="user" data-user-id="${user.userId}">
            <h3 class="username">${user.name}</h3>
            <p class="email">${user.email}</p>
          </li>
        `
      })

      // Add event listeners to user items
      document.querySelectorAll('.user').forEach((userItem, idx) => {
        userItem.addEventListener('click', function () {
          // Remove active class from all users
          document
            .querySelectorAll('.user')
            .forEach((item) => item.classList.remove('active'))
          // Add active class to the clicked user
          this.classList.add('active')

          getUserPosts(idx + 1)
        })
      })
    } else {
      console.error('Failed to fetch data')
      return
    }
  }
}

function getUserPosts(userId = 1) {
  let request = new XMLHttpRequest()
  request.open(
    'GET',
    `https://jsonplaceholder.typicode.com/posts?userId=${userId}`,
  )
  request.send()

  request.onload = function () {
    if (request.status >= 200 && request.status < 300) {
      let posts = JSON.parse(request.responseText)
      let postsList = document.querySelector('.posts-list')
      let loading = document.querySelector('.loader')
      loading.style.display = 'none'

      // Clear previous posts
      postsList.innerHTML = ''

      posts.map((post) => {
        postsList.innerHTML += `
        <li class="post">
        <h3 class="title">${post.title}</h3>
        <p class="body">${post.body}</p>
        </li>
        `
      })
    } else {
      console.error('Failed to fetch data')
      return
    }
  }
}

getUsers()
getUserPosts()
