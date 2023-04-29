const usernameInput = document.querySelector('#username-input')
const searchButton = document.querySelector('.search-button')
const githubProfileImg = document.querySelector('.github-profile-image img')
const fullName = document.querySelector('.full-name h3')
const githubUsername = document.querySelector('.github-username a')
const githubProfileDescription = document.querySelector(
  '.github-profile-description p'
)
const mediaLocation = document.querySelector('.media-value:nth-child(1)')
const mediaBlog = document.querySelector('.media-value:nth-child(2)')
const mediaTwitterUserName = document.querySelector('.media-value:nth-child(3)')
const mediaCompany = document.querySelector('.media-value:nth-child(4)')
const publicRepos = document.querySelector('.public-repos span')
const followers = document.querySelector('.followers span')
const following = document.querySelector('.following span')
const githubProfileDiv = document.querySelector('.github-profile-container')
const buttonText = document.querySelector('.button-text')
const loader = document.querySelector('.loader')
const URL = `https://api.github.com/users/`

async function getUserData(username) {
  const FULL_URL = `${URL}${username}`
  const githubUserPromise = await fetch(FULL_URL)
  if (!githubUserPromise.ok) {
    return false
  }
  const response = await githubUserPromise.json()
  const data = await response
  return data
}

function addDataToPage(userData) {
  githubProfileImg.src = userData.avatar_url
  fullName.textContent = userData.name || `Account doesn't have a a full name`
  followers.textContent = userData.followers
  following.textContent = userData.following
  publicRepos.textContent = userData.public_repos
  githubUsername.textContent = userData.login
  githubProfileDescription.textContent =
    userData.bio || `Account doesn't have a bio`
  mediaLocation.textContent = userData.location || `Not Available`
  mediaTwitterUserName.textContent =
    userData.twitter_username || `Not Available`
  mediaBlog.textContent = userData.blog || `Not Available`
  mediaCompany.textContent = userData.company || `Not Available`
}

searchButton.addEventListener('click', async () => {
  buttonText.classList.remove('active')
  loader.classList.add('active')
  if (usernameInput.value == '') {
    alert('Input cannot be empty')
    return
  }
  const userData = await getUserData(usernameInput.value)
  if (!userData) {
    alert('Username not found')
    return
  }
  addDataToPage(userData)
  githubProfileDiv.classList.add('active')
  buttonText.classList.add('active')
  loader.classList.remove('active')
})
