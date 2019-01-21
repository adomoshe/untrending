
# untrending

### MISSION STATEMENT:

#### To re-filter the news in order to encourage users to consume stories from multiple perspectives.

### MOTIVATION: 

Considering the ever-growing quantity of media outlets in addition to our undeniable addiction to the internet, it's no longer an option to ignore the news. Based on our environment and community, it is easy to get saturated by news from a single perspective. Thus, unless with an active intention to consume otherwise, our personal views on the world inevitably narrow and mold according to what we are fed. *Untrending* is built to reverse this common algorithm and reopen users' world views.

### TEAM:

**Sherrie Lin** Front-end development, UIUX design<br/>
**Ado Moshe** Back-end development<br/>
**Swechchha Parajuli** Algorithmic concept<br/>

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






