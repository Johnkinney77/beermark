var pg = require('pg');
var conString = "pg://johnkinney:2037083pratt@localhost/beermark_development";
var bcrypt = require('bcrypt');


var client = new pg.Client(conString);
client.connect();

// client.query("CREATE TABLE IF NOT EXISTS emps(firstname varchar(64), lastname varchar(64))");
// client.query("INSERT INTO emps(firstname, lastname) values($1, $2)", ['Ronald', 'McDonald']);
// client.query("INSERT INTO emps(firstname, lastname) values($1, $2)", ['Mayor', 'McCheese']);

//clearing tables
client.query("DROP TABLE IF EXISTS users");
client.query("DROP TABLE IF EXISTS breweries");
client.query("DROP TABLE IF EXISTS venues");
client.query("DROP TABLE IF EXISTS beers");
client.query("DROP TABLE IF EXISTS venueBeerJoin");


//main tables
client.query("CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, firstname varchar(64), lastname varchar(64), dob date, email varchar(64), password_digest varchar(64), default_address varchar(128), role_id integer);");

client.query("CREATE TABLE IF NOT EXISTS breweries (id SERIAL PRIMARY KEY, name varchar(128), logo text, user_id integer);");

client.query("CREATE TABLE IF NOT EXISTS venues (id SERIAL PRIMARY KEY, user_id varchar, name varchar(64), address varchar(128), phone_number varchar(64), email varchar(64), website varchar(128), cover_photo text, description text, pos point);");

client.query("CREATE TABLE IF NOT EXISTS beers (id SERIAL PRIMARY KEY, user_id integer, brewery_id integer, name varchar(128), abv float, style varchar(128), season varchar(64), ebc integer, ibu integer, aged varchar(64), description text, yeast varchar(64) );");

//join tables
client.query("CREATE TABLE IF NOT EXISTS venueBeerJoin(id SERIAL PRIMARY KEY, venue_id integer, brewery_id integer, beer_id integer, container varchar(64), price float, stock boolean);");


//data 
client.query("INSERT INTO users (firstname, lastname, dob, email, password_digest, default_address, role_id) values ('John', 'Kinney', '1989-07-11', 'johnkinney77@gmail.com', '" + bcrypt.hashSync('password', 10) + "', '2410 28th Street Astoria NY', 1);");
client.query("INSERT INTO users (firstname, lastname, dob, email, password_digest, default_address, role_id) values ('Ted', 'Kinney', '1989-07-11', 'tedkinney77@gmail.com', '" + bcrypt.hashSync('password', 10) + "', 'NULL', 2);");
client.query("INSERT INTO users (firstname, lastname, dob, email, password_digest, default_address, role_id) values ('Frank', 'Kinney', '1989-07-11', 'frankkinney77@gmail.com', '" + bcrypt.hashSync('password', 10) + "', 'NULL', 3);");


client.query("INSERT INTO breweries (name, logo, user_id) values ('21st Amendment', 'http://brewbound-images.s3.amazonaws.com/wp-content/uploads/2013/04/21A-logo.jpg', 3);");

client.query("INSERT INTO venues (user_id, name, address, phone_number, email, website, cover_photo, description, pos) values (2, 'Union Pool', '484 Union Ave, Brooklyn, NY 11211', '(718) 609-0484', 'info@union-pool.com', 'http://www.union-pool.com/', 'http://cdn.vfolder.net/original/EObIX7wo6PI/front-bar-from-dj-booth-2.jpg', 'Now that we know who you are, I know who I am. Im not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villains going to be? Hes the exact opposite of the hero. And most times theyre friends, like you and me! I shouldve known way back when... You know why, David? Because of the kids. They called me Mr Glass.', POINT(40.714964, -73.9515554));");

client.query("INSERT INTO venues (user_id, name, address, phone_number, email, website, cover_photo, description, pos) values (4, 'Bohemian Hall and Beer Garden', '484 Union Ave, Brooklyn, NY 11211', '(718) 609-0484', 'info@union-pool.com', 'http://www.union-pool.com/', 'http://cdn.vfolder.net/original/EObIX7wo6PI/front-bar-from-dj-booth-2.jpg', 'Now that we know who you are, I know who I am. Im not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villains going to be? Hes the exact opposite of the hero. And most times theyre friends, like you and me! I shouldve known way back when... You know why, David? Because of the kids. They called me Mr Glass.', POINT(40.772838, -73.915595));");

client.query("INSERT INTO venues (user_id, name, address, phone_number, email, website, cover_photo, description, pos) values (5, 'The Bench Bar & Grill', '484 Union Ave, Brooklyn, NY 11211', '(718) 609-0484', 'info@union-pool.com', 'http://www.union-pool.com/', 'http://cdn.vfolder.net/original/EObIX7wo6PI/front-bar-from-dj-booth-2.jpg', 'Now that we know who you are, I know who I am. Im not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villains going to be? Hes the exact opposite of the hero. And most times theyre friends, like you and me! I shouldve known way back when... You know why, David? Because of the kids. They called me Mr Glass.', POINT(40.920318, -73.129219));");

client.query("INSERT INTO beers (user_id, brewery_id, name, abv, style, season, ebc, ibu, aged, description, yeast) values (3, 1, 'Hell Or High Watermellon', 6, 'Pale Ale', 'Summer', 10, 10, null, 'Now that we know who you are, I know who I am. Im not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villains going to be? Hes the exact opposite of the hero. And most times theyre friends, like you and me! I shouldve known way back when... You know why, David? Because of the kids. They called me Mr Glass.', 'SO-4');");

client.query("INSERT INTO beers (user_id, brewery_id, name, abv, style, season, ebc, ibu, aged, description, yeast) values (3, 1, 'Hell Or High Watermellon', 6, 'Pale Ale', 'Summer', 10, 10, null, 'Now that we know who you are, I know who I am. Im not a mistake! It all makes sense! In a comic, you know how you can tell who the arch-villains going to be? Hes the exact opposite of the hero. And most times theyre friends, like you and me! I shouldve known way back when... You know why, David? Because of the kids. They called me Mr Glass.', 'SO-4');");

client.query("INSERT INTO beers (user_id, brewery_id, name, abv, style, season, ebc, ibu, aged, description, yeast) values (3, 1, 'Fireside Chat', '7.9', 'Winter Spiced Ale', 'Winter', '60', '45', 'Barrel Aged', 'Like FDR’s Depression-era radio addresses, which were like a kick in the butt and a hug at the same time, our Fireside Chat is a subtle twist on the traditional seasonal brew. We begin with a rich, dark, English-style ale and then we improvise with spices until we know we have a beer worth sharing with the nation. Fireside Chat is our early winter seasonal brew available from October through December in six pack cans and on draft. Brewed like a classic, warming Strong Ale but with a subtle blend of hand-selected spices for just the right festive flair.', 'Top Fermenting Ale Yeast');");

client.query("INSERT INTO venueBeerJoin (venue_id, brewery_id, beer_id, container, price, stock) VALUES (1, 1, 1, 'bottle', 8.00, true);");

client.query("INSERT INTO venueBeerJoin (venue_id, brewery_id, beer_id, container, price, stock) VALUES (2, 1, 1, 'bottle', 6.00, true);");

client.query("INSERT INTO venueBeerJoin (venue_id, brewery_id, beer_id, container, price, stock) VALUES (3, 1, 1, 'bottle', 6.00, true);");



