# Data used for testing

Follow steps bellow in order

### [1] drop db

```
dropdb dream_onward
```

### [2] create db & connect to db

```
createdb dream_onward
psql dream_onward
```

### [3] create tables

* community_board:

  * id

  * image (url, control type with html form input)

  * description (used for <img/> alt text, max 32 chars)

```
CREATE TABLE community_board (id SERIAL, image TEXT, description VARCHAR(32));
```

* users

  * id

  * first name (max chars 24)

  * last name (max chars 24)

  * email (max chars 64)

  * username (max chars 32)

  * password (control max length with html form input)

```
CREATE TABLE users (id SERIAL, first_name VARCHAR(24), last_name VARCHAR(24), email VARCHAR(64), username VARCHAR(32), password TEXT);
```

* user_boards

  * id

  * user_id (int, used for users/user_boards relationship)

  * image (url, control type with html form input)

  * description (used for <img/> alt text, max 32 chars)

```
CREATE TABLE user_boards (id SERIAL, user_id INT, image TEXT, description VARCHAR(32));
```

### [4] add data to tables

* community_board

```
INSERT INTO community_board (image, description) VALUES
('https://www.skydivenewengland.com/wp-content/uploads/2017/03/Swoopware-0045-1200x900.jpg', 'Sky diving'),
('https://static1.squarespace.com/static/577eb4326b8f5b6d779757a6/t/5a3ab737e2c483677794dcc9/1513797480996/art+class+2.jpg', 'Art class'),
('https://static.comicvine.com/uploads/scale_medium/11/117763/2491344-av1.png', 'Avengers comic book'),
('https://www.wikihow.com/images/thumb/d/db/Learn-How-to-Play-the-Tchaikovsky-Piano-Concerto-Step-9.jpg/aid50989-v4-900px-Learn-How-to-Play-the-Tchaikovsky-Piano-Concerto-Step-9.jpg', 'Piano Lessons'),
('https://linustechtips.com/main/uploads/monthly_2016_06/VKM_7729.jpg.e1b6eb6362e85112ff62e715f2da4692.jpg', 'Custom water cooling loop'),
('https://d2e111jq13me73.cloudfront.net/sites/default/files/styles/amp_blog_image_large/public/blog/csm-blog/best-family-movies-2017-blog.jpg?itok=wO1o3mgG', 'Watch more movies'),
('https://www.imore.com/sites/imore.com/files/styles/xlarge/public/field/image/2017/11/iphone-x-roller-derby-hero-03.JPG?itok=Ka-YgX4Z', 'Train for roller derby'),
('https://forestsuites.com/wp-content/uploads/2014/08/hero-family.jpg', 'Roasting marshmallows'),
('https://www.insidehighered.com/sites/default/server_files/media/Portrait-of-adult-students-at-class-000081693415_Small.jpg', 'Go back to school'),
('https://img.grouponcdn.com/deal/gorHELDRta2fK8EqLKSw/T7-2048x1229/v1/c700x420.jpg', 'Take bartending class'),
('http://basketballvictoria.com.au/wp-content/uploads/2016/03/skin-healthy-food.jpg', 'Eat healthy'),
('https://st2.depositphotos.com/1001877/6491/i/950/depositphotos_64913087-stock-photo-travel-concept-suitcases-and-signpost.jpg', 'Travel around the world'),
('https://www.x-cart.com/wp-content/uploads/2017/09/how-to-become-a-web-developer.png', 'Become a web developer'),
('http://www.insajderi.com/wp-content/uploads/2017/11/1488535338Learning-Foreign-Language.jpg', 'Learn a new language'),
('http://www.rafting.com/wp-content/gallery/penn/DSC_5761.JPG', 'Go river rafting'),
('http://www.sdps.wa.edu.au/sites/default/files/styles/hero/public/blog.jpg?itok=3zoEgWOs', 'Start a blog'),
('http://crossfitfirewall.com/wp-content/uploads/2017/01/crossfit-open-partner.jpg', 'Try crossfit'),
('https://res.cloudinary.com/simpleview/image/upload/crm/oklahoma/HD-Wine-Tasting_1920x10800_36d8c1bf-5056-a36a-06ea60088ce7f7c9.jpg', 'Go to a wine tasting'),
('https://www.mauiticketsforless.com/wp-content/uploads/2016/03/PWF_breach-2.jpg', 'Whale watching'),
('http://www.sanantoniopetsalive.org/wp-content/uploads/2016/12/adopt-1.png', 'Adopt a pet'),
('http://goodsamaritanfs.com/wp-content/uploads/2014/03/volunteer-logo-sized-to-6.9x3-1024x350.jpg', 'Volunteer'),
('https://massmutualcenter.s3.amazonaws.com/img/red-cross-blood-drive-4151ba276d.jpg', 'Donate blood'),
('https://unityofboulder.com/wp-content/uploads/2016/08/facebook_event_1807870619447023.jpg', 'Organize a community yard sale'),
('https://www.gwrymca.org/sites/default/files/styles/program_header/public/DSCF4769%20small.jpg?itok=zq23hUY5', 'Volunteer as a lifeguard');
```

* users

```
INSERT INTO users (first_name, last_name, email, username, password) VALUES
('LastSamurai', 'John', 'Smith', 'john.smith@noemail.com', 'LastSamurai'),
('PetalPrincess', 'Mary', 'Jones', 'mary.jones@noemail.com', 'PetalPrincess'),
('CapnBloodBeard', 'Oliver', 'Williams', 'oliver.williams@noemail.com', 'CapnBloodBeard'),
('FallenAngel', 'Elizabeth', 'Taylor', 'elizabeth.taylor@noemail.com', 'FallenAngel'),
('SavageHorseman', 'William', 'Brown', 'william.brown@noemail.com', 'SavageHorseman'),
('IMTooPrettyToDie', 'Olivia', 'Davies', 'olivia.davies@noemail.com', 'IMTooPrettyToDie'),
('LoneWalker', 'Jack', 'Evans', 'jack.evans@noemail.com', 'LoneWalker'),
('CatWoman', 'Sarah', 'Thomas', 'sarah.thomas@noemail.com', 'CatWoman'),
('BeoWulf', 'Thomas', 'Johnson', 'thomas.johnson@noemail.com', 'BeoWulf'),
('SniperFemme', 'Isla', 'Wilson', 'isla.wilson@noemail.com', 'SniperFemme'),
('DexterzProtege', 'Harry', 'Roberts', 'harry.roberts@noemail.com', 'DexterzProtege'),
('CursedWings', 'Margaret', 'Robinson', 'margaret.robinson@noemail.com', 'CursedWings'),
('NoTolerance', 'George', 'Wright', 'george.wright@noemail.com', 'NoTolerance'),
('IceQueen', 'Emily', 'Thompson', 'emily.thompson@noemail.com', 'IceQueen'),
('DarkLord', 'Jacob', 'White', 'jacob.white@noemail.com', 'DarkLord'),
('SongbirdFatale', 'Ann', 'Hall', 'ann.hall@noemail.com', 'SongbirdFatale'),
('InfernalHeir', 'James', 'Walker', 'james.walker@noemail.com', 'InfernalHeir'),
('LadyPhantom', 'Jane', 'Green', 'jane.green@noemail.com', 'LadyPhantom'),
('RuthlessSlayer', 'Robert', 'Edwards', 'robert.edwards@noemail.com', 'RuthlessSlayer'),
('WarriorPriestess', 'Ava', 'Woods', 'ava.woods@noemail.com', 'WarriorPriestess'),
('JackSparrow', 'Charles', 'Hughes', 'charles.hughes@noemail.com', 'JackSparrow'),
('Hraefn', 'Alice', 'Jackson', 'alice.jackson@noemail.com', 'Hraefn'),
('Kladenstien', 'George', 'Turner', 'george.turner@noemail.com', 'Kladenstien'),
('Zeldarian', 'Isabella', 'Lewis', 'isabella.lewis@noemail.com', 'Zeldarian');
```

* user_boards

```
INSERT INTO user_boards (user_id, image, description) VALUES
(1, 'https://list25.com/wp-content/uploads/2013/02/Slide11061.jpg', 'Legend of Zelda'),
(2, 'https://list25.com/wp-content/uploads/2013/02/Slide2681.jpg', 'Pokemon'),
(3, 'https://list25.com/wp-content/uploads/2013/02/Slide3221.jpg', 'Super Mario 64'),
(4, 'https://list25.com/wp-content/uploads/2013/02/Slide4211.jpg', 'The Sims'),
(5, 'https://list25.com/wp-content/uploads/2013/02/Slide5201.jpg', 'Tetris'),
(6, 'https://list25.com/wp-content/uploads/2013/02/Slide6191.jpg', 'Nintendogs'),
(7, 'https://list25.com/wp-content/uploads/2013/02/Slide7191.jpg', 'Final Fantasy VII'),
(8, 'https://list25.com/wp-content/uploads/2013/02/Slide8191.jpg', 'Grand Theft Auto'),
(9, 'https://list25.com/wp-content/uploads/2013/02/Slide9191.jpg', 'Half-Life 2'),
(10, 'https://list25.com/wp-content/uploads/2013/02/Slide10201.jpg', 'Starcraft'),
(11, 'https://list25.com/wp-content/uploads/2013/02/Slide11251.jpg', 'Resident Evil IV'),
(12, 'https://list25.com/wp-content/uploads/2013/02/Slide12221.jpg', 'Halo 2'),
(13, 'https://list25.com/wp-content/uploads/2013/02/Slide13201.jpg', 'Chrono Trigger'),
(14, 'https://list25.com/wp-content/uploads/2013/02/Slide14191.jpg', 'GoldenEye 007'),
(15, 'https://list25.com/wp-content/uploads/2013/02/Slide15191.jpg', 'World of Warcraft'),
(16, 'https://list25.com/wp-content/uploads/2013/02/Slide16191.jpg', 'Doom'),
(17, 'https://list25.com/wp-content/uploads/2013/02/Slide17191.jpg', 'Super Metroid'),
(18, 'https://list25.com/wp-content/uploads/2013/02/Slide18191.jpg', 'Metal Gear Solid'),
(19, 'https://list25.com/wp-content/uploads/2013/02/Slide19201.jpg', 'Street Fighter II'),
(20, 'https://list25.com/wp-content/uploads/2013/02/Slide20191.jpg', 'Call of Duty 4: MW'),
(21, 'https://list25.com/wp-content/uploads/2013/02/Slide21211.jpg', 'Sid Meiers Civilization'),
(22, 'https://list25.com/wp-content/uploads/2013/02/Slide23201.jpg', 'Need for Speed'),
(23, 'https://list25.com/wp-content/uploads/2013/02/Slide24201.jpg', 'Donkey Kong Country'),
(24, 'https://list25.com/wp-content/uploads/2013/02/Slide25191.jpg', 'Pac-Man');
```
