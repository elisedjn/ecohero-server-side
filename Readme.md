# EcoHero

<br>

## Description

In EcoHero, you can fix yourself eco-friendly goals and share your achievements in social media. The more challenges you do, the more points you get, you also go higher in the ranking and unlock new features on the app. 

## User Stories

-  **404:** As an anon/user I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault
-  **Signup:** As an anon I can sign up in the platform so that I can start choosing challenges to achieve and share my achievements
-  **Login:** As a user I can login to the platform so that I can start start choosing challenges to achieve and share my achievements
-  **Logout:** As a user I can logout from the platform so no one else can modify my information
-  **Home Page** As a anon/user I can see a piece of information about the app, see the users latest achievements in a carousel and learn more about the team who develops the app
-  **Hall of Heroes** As an anon/user I can see the leaderboard which displays the users with the highest ranking and I am able to see the details of their profiles and their achievements by clicking on their names.
- **Ranks** As an anon/user I can see the different rankings reachable in the app and the bonuses you can get
-  **Profile Details** As a user I can see my own profile or the other ones profiles with name, picture, rank and achievements displayed
-  **Edit profile** As a user I can change my profile details (name, email, password, image)
-  **User Home Page** As a user I can check my profile and my current challenges quickly and see the other users latest achievement to get inspired
-  **Goals & Achievements** As a user I can see the list of all my challenges and achievements
- **Challenge/Achievement details** As a user I can see the details of my challenge and edit or delete it. I can also see the details of my achievements and share them on Facebook or Twitter or see the other ones achievement details to fix this challenge as one of mine. As an anon I can see the details of the challenge/achievement.
-**Challenges List** As an anon/user I can see the list of all the created challenges, filter them or make some research from the title or description keyword. I can click on one of them to see the detail page of it.
-**Create a Challenge** As a user with a rank equal or higher to Smart Hero, I can create a challenge which will be added to the database


## Backlog

- Groups
	- Finding groups in a map
	- Join a group and have access to a chat
	- Create a group if the rank is Chill Hero or higher


<br>

# Client/Frontend
## React Router Routes (React App)

| Path                      | Component                      | Permissions | Behavior                                                     |
| ------------------------- | --------------------           | ----------- | ------------------------------------------------------------ |
| `/`                       | NavBar, HomePage, Carousel, (if user : DashBoard) | public   | Home page                                        |
| `/signup`                 | SignupPage                     | anon only                   | Signup form, link to login, navigate to user-home after signup |
| `/login`                  | LoginPage                      | anon only                   | Login form, link to signup, navigate to user-home after login  |
| `/logout`                 | n/a                            | user only                   | Navigate to homepage after logout, expire session             |
| `/hall-of-heroes`         | NavBar, RankingList, (if user: DashBoard) | public           | Show the users with the highest ranking                       |
| `/ranks`                  | NavBar, Ranking, (if user: DashBoard) | public               | Show the different ranks, limit points and bonus available                                |
| `/user-home`              | NavBar, Profile, ChallengesList, Carousel, DashBoard | user only | Show the user picture, username, ranking and points, as well as the 2 ongoing challenges he has and the carousel of other users latest achievements                                   |
| `/profile`                | NavBar, Profile, AchievementsList, RankingBar, DashBoard | user only  | Show the username, picture, ranking, points, ranking progression and achievements from one user. If it’s the loggedInUser, then there is an Edit button |
| `/profile/edit`           | NavBar, EditProfileForm DashBoard | user only |Form which allows the user to change his username, email, password and profile picture|
| `/challenges`  | NavBar, ChallengesList, SearchBar (if user: Dashboard), CreateChallengeBtn | public | Displays the list with all the challenges available in the database, with a search bar to filter it|
|`/my-challenges` | NavBar, ChallengesList, AchievementsList,  RankingBar, Dashboard | user only | Shows the ranking progression, the list of challenges and achievements of the user. He can complete or delete the challenges and share the achievement on social media |
| `/challenges/:id` | Nav, ChallengeDetails (if user: DashBoard, depending on the scenario : SharingLogos, EditBtn and DeleteBtn or AddToMyChallenges) | public |Shows the detail of a Challenge or an Achievement. If it’s his challenge, there is a delete and edit button .If it’s his achievement, the user can share it on social media. If it’s somebody else achievement or a challenge from the database, the user can add the challenge to his own ones. If the user is not login, he can only see the details|
| `/challenges/create` | NavBar, CreateChallengeForm, DashBoard |user only with 25.000pts + | Form where the authorized users can create a new challenge for the DB|
| `/challenges/:id/edit` | NavBar, EditChallengeForm, Dashboard | user only |Form where the user can edit the image, completed and finishing date of an ongoing challenge to achieve it|

## Components
- LoginPage
- SignupPage
- NavBar
- DashBoard
- HomePage
- Carousel
- RankingList
- Ranking
- Profile
- ChallengesList
- SearchBar
- AchievementsList
- RankingBar
- ChallengeDetails
- SharingLogo
- EditBtn
- DeleteBtn
- AddToMyChallenges
- CreateChallengeForm
- EditChallengeForm


## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()

- Backlog Service
  - backlog.filter(type, status)
  - backlog.detail(id)
  - backlog.add(id)
  - backlog.delete(id)
  - backlog.update(id)
  
- External API
  - API for images storage


#Server / Backend

## Models

### User Model
```javascript
{
	username: {
		type: String,
		required: true,
		unique: true ???
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	image: {
type: String,  //URL to Cloudinary
default: ‘https:// ’ //A default picture image already in Cloudinary
},
points: {
	type: Number,
	default: 0
},
rank: {
	type: String,
	default: ‘New Hero’,
},
achievements: [{
	type: mongoose.Schema.Types.ObjectId,
	ref: “Achievement”
}]
}
```




### Challenge model
This model will be seeded first and then the user will be able to add more challenges but it will never be edited.
```javascript
{
	title: {
		type: String,
		required: true,
		unique: true
	},
	description: String,
	points: {
		type: Number,
		required: true
	},
	creator: {
		type: mongoose.Schema.Types.ObjectId,
		ref: “User”
	}
```

### Achievement model
In this model, the challenge will be linked to a user, and there will be the possibility to change its status (and make a challenge become an achievement in the profile of the user) and add an image to show the achievement.
```javascript
{
	challenge: {
		type: mongoose.Schema.Types.ObjectId,
	ref: “Challenge”
},
completed: {
	type: Boolean,
	required: true
},
image: String  //URL to Cloudinary
user :{
		type: mongoose.Schema.Types.ObjectId,
	ref: “User”
},
starting-date:{
	type: Date,
	default: Date.now()
},
finishing-date: Date
}
```

## API Endpoint (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET   | /auth/profile | Saved session |200 |404  | Check if user is logged in and return profile page|
| POST  | /auth/signup  | {username, email, password}| 201| 404 | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST  | /auth/login   | {email, password}| 200| 401 | Checks if fields not empty (422) and user exists (404), and if password matches (404), then stores user in session |
| GET   | achievements/latest | | | |Shows the completed latest achievements of all users |
| GET   | /users/leaderboard | | | | Shows the users with the highest amount of points |
| GET   | /users/:id | | | | Shows the details of a specific user |
| PATCH | /users/:id/edit | {name, image, email, password} | | | Edits the infos of a specific user |
| GET   | /users/:id/achievements | | | | Shows all the achievements (completed or not) of a specific user |
| PATCH | /achievements/:achievID | {completed, image, finishing-date} | | |Edits a specific achievement |
| DELETE | /achievements/:achievID | | | | Deletes a specific achievement |
| GET   | /achievements/:achievID | | | | Shows a specific achievement|
| GET   | /challenges | | | | Shows all the challenges |
| GET   | /challenges/:challengeID | | | | Shows the details of a specific challenge |
| POST  | /challenges/create | {name, description, points} | | | Creates a new challenge |


## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/S1Cd15QC/ecohero) 
or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/elisedjn/ecohero-client-side)

[Server repository Link](https://github.com/elisedjn/ecohero-server-side)

[Deployed App Link](https://)

### Slides

The url to your presentation slides

[Slides Link](https://docs.google.com/)

