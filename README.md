
# untrending

### Purpose:

#### Untrending aims to expand readers' perspectives when consuming the news by offering related articles across the bias spectrum.

### MOTIVATION: 

Intentionally or not, we often get pulled into a media bias when reading the news. Wether it's because we are actively seeking reinforcing and therefore comforting perspectives or we are simply the victims of algorithms running news aggregators. These algorithms are designed, as they are in many tech platforms, to maximize our attention for ad revenue generation. Keeping these users is typically done by appealing to their interests, which when applied to news means suggesting articles that reinforce a user's point of view. 

Untrending is built to reverse exactly that effect. Here, users will be offered differing views on the same topic. This is in an effort to expand the user's perspective and gently nudge them out of their bias or in the very least not strengthen it. Productive conersations and public discourse is diffucult to conduct without each side at least being informed of the other.

### TEAM:

**Sherrie Lin** Front-end development, UIUX design<br/>
**Ado Moshe** Back-end development<br/>

### HOW *untrending* WORKS:

User enters by logging in via Google Authorization. 
If first-time user, user will be prompted with list of categories to select to curate personal homepage newsfeed. 
Once logged in, by default user will see top trending news at the time in which they enter. User can use search query and categories navigation bar to self-filter news articles.
Once user selects a news article, *untrending* suggests a list of articles of the same topic from different news outlets. News outlets are ranked on a political spectrum and marked according to how similar or different the perspective is to the selected article.
To read full article, *untrending* redirects user to original source in new tab.

### HOW *untrending* IS BUILT: 

#### `FLOW`

![Flow 1](public/assets/rmflow1.png)
![Flow 2](public/assets/rmflow2.png)
![Flow 3](public/assets/rmflow3.png)
![Flow 4](public/assets/rmflow4.png)

#### `TECHNOLOGY`

-Written in HTML, CSS, & Javascript<br/>
-Utilizes News API & REST Countries API<br/>
-Uses Express, mySQL2, Sequelize, & Passport Google Authorization

###### DEPLOYED VIA HEROKU ON JANUARY 11, 2019. Link: https://untrending.herokuapp.com






