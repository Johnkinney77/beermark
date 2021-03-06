#Beermark

####Description
An application that allows users to search for beer with in our database. The database is populated by breweries and venues (e.g bars, supermarkets, watering holes, etc).
####Stack
* NodeJS
* Express
* Backbone/Marionette
* Skeleton (once I get to it)

####Database
* Postgresql

##Current Application State
* Create a login/profile in for all roles, Brewery, Venue, Consumer
* The Application can see what role the user has and serve them up the correct HTML
* Read and Update their personal information.
* User can CRUD both venue and brewery beers.
* A user can conduct a search to find the beer they want with in a certain radius from their current location.


##Schema
####User

| id  | firstname | lastname  | dob | email  | password_digest | default_address | rold_id |
| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
| 1 | John  | kidny  | 1922-11-12  | exmaple@gmail.com | password | 7 Whatever Lane, FakeTown NY, 1189 | 2 |

####Brewery

| id  | user_id | name  | logo |
| ------------- | ------------- | ------------- | ------------- |
| 1 | 1 | 21st Amendment | logo url|

####Venue
|id|user_id|name|address|phone_number|email|website|cover_photo|description|pos|
| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
| 1 | 1 | Union Pool | 21 Whatever Street | 555-555-5555 | www.unionpool.com | unionpool@gmail.com | photo url | description | (40.12312,-70.21313) |

####Beer
|id|user_id|brewery_id|name|abv|style|season|ebc|ibu|aged|description|yeast|
| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
| 1 | 1 | 1 | Hell Or High Watermelon | 6 | ale | summer | 10 | 20 | false | description | SO-4 |

####venueBeerJoin
|id|venue_id|brewery_id|beer_id|container|price|stock|
| ------------- | ------------- | ------------- | ------------- | ------------- | ------------- | ------------- |
| 1 | 1 | 1 | 1 | 6 pack | 12.99 | t |


##Wireframes
####Landing Page
![alt text][1]
[1]: ./wireframes/wireframe1-01.jpg

####User Index When They Log In
![alt text][2]
[2]: ./wireframes/wireframe1-02.jpg

####User Search
![alt text][3]
[3]: ./wireframes/wireframe1-03.jpg

####Venue Page
![alt text][4]
[4]: ./wireframes/wireframe1-04.jpg

####Beer Page
![alt text][5]
[5]: ./wireframes/wireframe1-05.jpg
