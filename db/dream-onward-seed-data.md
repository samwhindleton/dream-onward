# Data used for testing

Follow steps bellow in order

### [1] drop db

```
dropdb dream_onward
```

### [2] create db & connect to db

```
createdb dream_onward && psql dream_onward
```

### [3] create tables

* community_boards:

  * id

  * image (url, control type with html form input)

  * description (used for <img/> alt text, max 32 chars)

```
CREATE TABLE community_boards (id SERIAL, image TEXT, description VARCHAR(32), created TIMESTAMP, updated TIMESTAMP);
```

* users

  * id

  * first name (max chars 24)

  * last name (max chars 24)

  * email (max chars 64)

  * username (max chars 32)

  * password (control max length with html form input)

```
CREATE TABLE users (id SERIAL, first_name VARCHAR(24), last_name VARCHAR(24), email VARCHAR(64), username VARCHAR(32), password TEXT, created TIMESTAMP, updated TIMESTAMP);
```

* user_boards

  * id

  * user_id (int, used for users/user_boards relationship)

  * image (url, control type with html form input)

  * description (used for <img/> alt text, max 32 chars)

```
CREATE TABLE user_boards (id SERIAL, user_id INT, image TEXT, description VARCHAR(32), created TIMESTAMP, updated TIMESTAMP);
```

### [4] add data to tables

* community_boards

```
INSERT INTO community_boards (image, description, created, updated) VALUES
('https://www.skydivenewengland.com/wp-content/uploads/2017/03/Swoopware-0045-1200x900.jpg', 'Sky diving', now(), now()),
('https://static1.squarespace.com/static/577eb4326b8f5b6d779757a6/t/5a3ab737e2c483677794dcc9/1513797480996/art+class+2.jpg', 'Art class', now(), now()),
('https://static.comicvine.com/uploads/scale_medium/11/117763/2491344-av1.png', 'Avengers comic book', now(), now()),
('https://www.wikihow.com/images/thumb/d/db/Learn-How-to-Play-the-Tchaikovsky-Piano-Concerto-Step-9.jpg/aid50989-v4-900px-Learn-How-to-Play-the-Tchaikovsky-Piano-Concerto-Step-9.jpg', 'Piano Lessons', now(), now()),
('https://linustechtips.com/main/uploads/monthly_2016_06/VKM_7729.jpg.e1b6eb6362e85112ff62e715f2da4692.jpg', 'Custom water cooling loop', now(), now()),
('https://d2e111jq13me73.cloudfront.net/sites/default/files/styles/amp_blog_image_large/public/blog/csm-blog/best-family-movies-2017-blog.jpg?itok=wO1o3mgG', 'Watch more movies', now(), now()),
('https://www.imore.com/sites/imore.com/files/styles/xlarge/public/field/image/2017/11/iphone-x-roller-derby-hero-03.JPG?itok=Ka-YgX4Z', 'Train for roller derby', now(), now()),
('https://forestsuites.com/wp-content/uploads/2014/08/hero-family.jpg', 'Roasting marshmallows', now(), now()),
('https://www.insidehighered.com/sites/default/server_files/media/Portrait-of-adult-students-at-class-000081693415_Small.jpg', 'Go back to school', now(), now()),
('https://img.grouponcdn.com/deal/gorHELDRta2fK8EqLKSw/T7-2048x1229/v1/c700x420.jpg', 'Take bartending class', now(), now()),
('http://basketballvictoria.com.au/wp-content/uploads/2016/03/skin-healthy-food.jpg', 'Eat healthy', now(), now()),
('https://st2.depositphotos.com/1001877/6491/i/950/depositphotos_64913087-stock-photo-travel-concept-suitcases-and-signpost.jpg', 'Travel around the world', now(), now()),
('https://www.x-cart.com/wp-content/uploads/2017/09/how-to-become-a-web-developer.png', 'Become a web developer', now(), now()),
('http://www.insajderi.com/wp-content/uploads/2017/11/1488535338Learning-Foreign-Language.jpg', 'Learn a new language', now(), now()),
('http://www.rafting.com/wp-content/gallery/penn/DSC_5761.JPG', 'Go river rafting', now(), now()),
('http://www.sdps.wa.edu.au/sites/default/files/styles/hero/public/blog.jpg?itok=3zoEgWOs', 'Start a blog', now(), now()),
('http://crossfitfirewall.com/wp-content/uploads/2017/01/crossfit-open-partner.jpg', 'Try crossfit', now(), now()),
('https://res.cloudinary.com/simpleview/image/upload/crm/oklahoma/HD-Wine-Tasting_1920x10800_36d8c1bf-5056-a36a-06ea60088ce7f7c9.jpg', 'Go to a wine tasting', now(), now()),
('https://www.mauiticketsforless.com/wp-content/uploads/2016/03/PWF_breach-2.jpg', 'Whale watching', now(), now()),
('http://www.sanantoniopetsalive.org/wp-content/uploads/2016/12/adopt-1.png', 'Adopt a pet', now(), now()),
('http://goodsamaritanfs.com/wp-content/uploads/2014/03/volunteer-logo-sized-to-6.9x3-1024x350.jpg', 'Volunteer', now(), now()),
('https://massmutualcenter.s3.amazonaws.com/img/red-cross-blood-drive-4151ba276d.jpg', 'Donate blood', now(), now()),
('https://unityofboulder.com/wp-content/uploads/2016/08/facebook_event_1807870619447023.jpg', 'Organize a community yard sale', now(), now()),
('https://www.gwrymca.org/sites/default/files/styles/program_header/public/DSCF4769%20small.jpg?itok=zq23hUY5', 'Volunteer as a lifeguard', now(), now());
```

* users

```
INSERT INTO users (first_name, last_name, email, username, password, created, updated) VALUES
('John', 'Smith', 'john.smith@noemail.com', 'LastSamurai', 'LastSamurai', now(), now()),
('Mary', 'Jones', 'mary.jones@noemail.com', 'PetalPrincess', 'PetalPrincess', now(), now()),
('Oliver', 'Williams', 'oliver.williams@noemail.com', 'CapnBloodBeard', 'CapnBloodBeard', now(), now()),
('Elizabeth', 'Taylor', 'elizabeth.taylor@noemail.com', 'FallenAngel', 'FallenAngel', now(), now()),
('William', 'Brown', 'william.brown@noemail.com', 'SavageHorseman', 'SavageHorseman', now(), now()),
('Olivia', 'Davies', 'olivia.davies@noemail.com', 'IMTooPrettyToDie', 'IMTooPrettyToDie', now(), now()),
('Jack', 'Evans', 'jack.evans@noemail.com', 'LoneWalker', 'LoneWalker', now(), now()),
('Sarah', 'Thomas', 'sarah.thomas@noemail.com', 'CatWoman', 'CatWoman', now(), now()),
('Thomas', 'Johnson', 'thomas.johnson@noemail.com', 'BeoWulf', 'BeoWulf', now(), now()),
('Isla', 'Wilson', 'isla.wilson@noemail.com', 'SniperFemme', 'SniperFemme', now(), now()),
('Harry', 'Roberts', 'harry.roberts@noemail.com', 'DexterzProtege', 'DexterzProtege', now(), now()),
('Margaret', 'Robinson', 'margaret.robinson@noemail.com', 'CursedWings', 'CursedWings', now(), now()),
('George', 'Wright', 'george.wright@noemail.com', 'NoTolerance', 'NoTolerance', now(), now()),
('Emily', 'Thompson', 'emily.thompson@noemail.com', 'IceQueen', 'IceQueen', now(), now()),
('Jacob', 'White', 'jacob.white@noemail.com', 'DarkLord', 'DarkLord', now(), now()),
('Ann', 'Hall', 'ann.hall@noemail.com', 'SongbirdFatale', 'SongbirdFatale', now(), now()),
('James', 'Walker', 'james.walker@noemail.com', 'InfernalHeir', 'InfernalHeir', now(), now()),
('Jane', 'Green', 'jane.green@noemail.com', 'LadyPhantom', 'LadyPhantom', now(), now()),
('Robert', 'Edwards', 'robert.edwards@noemail.com', 'RuthlessSlayer', 'RuthlessSlayer', now(), now()),
('Ava', 'Woods', 'ava.woods@noemail.com', 'WarriorPriestess', 'WarriorPriestess', now(), now()),
('Charles', 'Hughes', 'charles.hughes@noemail.com', 'JackSparrow', 'JackSparrow', now(), now()),
('Alice', 'Jackson', 'alice.jackson@noemail.com', 'Hraefn', 'Hraefn', now(), now()),
('George', 'Turner', 'george.turner@noemail.com', 'Kladenstien', 'Kladenstien', now(), now()),
('Isabella', 'Lewis', 'isabella.lewis@noemail.com', 'Zeldarian', 'Zeldarian', now(), now());
```

* user_boards

```
INSERT INTO user_boards (user_id, image, description, created, updated) VALUES
(1, 'https://picsum.photos/600/600?image=4', 'Take more notes', now(), now()),
(1, 'https://picsum.photos/600/600?image=10', 'Go outdoors more', now(), now()),
(1, 'https://picsum.photos/600/600?image=22', 'Walk to work', now(), now()),
(2, 'https://picsum.photos/600/600?image=24', 'Read a good book', now(), now()),
(2, 'https://picsum.photos/600/600?image=27', 'Go to the beach', now(), now()),
(2, 'https://picsum.photos/600/600?image=377', 'Mountain', now(), now()),
(3, 'https://picsum.photos/600/600?image=34', 'Mow the lawn', now(), now()),
(3, 'https://picsum.photos/600/600?image=383', 'Air show', now(), now()),
(3, 'https://picsum.photos/600/600?image=390', 'Friends', now(), now()),
(4, 'https://picsum.photos/600/600?image=39', 'Find the record player', now(), now()),
(4, 'https://picsum.photos/600/600?image=42', 'Coffee date', now(), now()),
(4, 'https://picsum.photos/600/600?image=82', 'Plant a tree', now(), now()),
(4, 'https://picsum.photos/600/600?image=85', 'Visit the farm', now(), now()),
(4, 'https://picsum.photos/600/600?image=91', 'Take photo class', now(), now()),
(5, 'https://picsum.photos/600/600?image=92', 'Collect shells', now(), now()),
(5, 'https://picsum.photos/600/600?image=96', 'New controller', now(), now()),
(5, 'https://picsum.photos/600/600?image=403', 'Typewritter', now(), now()),
(6, 'https://picsum.photos/600/600?image=301', 'Fall', now(), now()),
(6, 'https://picsum.photos/600/600?image=304', 'Record', now(), now()),
(6, 'https://picsum.photos/600/600?image=306', 'Pond', now(), now()),
(7, 'https://picsum.photos/600/600?image=294', 'Peace', now(), now()),
(7, 'https://picsum.photos/600/600?image=308', 'Laundry', now(), now()),
(7, 'https://picsum.photos/600/600?image=412', 'Forest', now(), now()),
(8, 'https://picsum.photos/600/600?image=292', 'Veggies', now(), now()),
(8, 'https://picsum.photos/600/600?image=314', 'Road ahead', now(), now()),
(8, 'https://picsum.photos/600/600?image=328', 'Ski lift', now(), now()),
(9, 'https://picsum.photos/600/600?image=284', 'Clean the shed', now(), now()),
(9, 'https://picsum.photos/600/600?image=336', 'Locks', now(), now()),
(10, 'https://picsum.photos/600/600?image=274', 'Move to the city', now(), now()),
(10, 'https://picsum.photos/600/600?image=360', 'Flowers', now(), now()),
(11, 'https://picsum.photos/600/600?image=237', 'New dog', now(), now()),
(11, 'https://picsum.photos/600/600?image=276', 'Stairs', now(), now()),
(11, 'https://picsum.photos/600/600?image=397', 'Beach house', now(), now()),
(12, 'https://picsum.photos/600/600?image=219', 'Cute but dangerous', now(), now()),
(12, 'https://picsum.photos/600/600?image=225', 'Tea time', now(), now()),
(13, 'https://picsum.photos/600/600?image=195', 'Outdoor mall', now(), now()),
(13, 'https://picsum.photos/600/600?image=217', 'Fix the dock', now(), now()),
(13, 'https://picsum.photos/600/600?image=201', 'Take a break', now(), now()),
(14, 'https://picsum.photos/600/600?image=191', 'Road trip', now(), now()),
(14, 'https://picsum.photos/600/600?image=372', 'Watch tower', now(), now()),
(15, 'https://picsum.photos/600/600?image=177', 'Hiking', now(), now()),
(15, 'https://picsum.photos/600/600?image=182', 'Wind farm', now(), now()),
(16, 'https://picsum.photos/600/600?image=171', 'Go out in the rain', now(), now()),
(16, 'https://picsum.photos/600/600?image=174', 'Hot air balloon', now(), now()),
(16, 'https://picsum.photos/600/600?image=175', 'Set reminders', now(), now()),
(17, 'https://picsum.photos/600/600?image=155', 'Train tracks', now(), now()),
(17, 'https://picsum.photos/600/600?image=157', 'Skateboard', now(), now()),
(18, 'https://picsum.photos/600/600?image=152', 'Go to the garden', now(), now()),
(18, 'https://picsum.photos/600/600?image=158', 'Party!!!', now(), now()),
(18, 'https://picsum.photos/600/600?image=154', 'Go to the beach', now(), now()),
(19, 'https://picsum.photos/600/600?image=145', 'Music lessons', now(), now()),
(19, 'https://picsum.photos/600/600?image=146', 'Nephew present', now(), now()),
(19, 'https://picsum.photos/600/600?image=149', 'Storm watch', now(), now()),
(20, 'https://picsum.photos/600/600?image=130', 'Bird watch', now(), now()),
(20, 'https://picsum.photos/600/600?image=136', 'Rock climbing', now(), now()),
(20, 'https://picsum.photos/600/600?image=137', 'Tunnel vision', now(), now()),
(21, 'https://picsum.photos/600/600?image=122', 'Visit the capital', now(), now()),
(21, 'https://picsum.photos/600/600?image=124', 'I see a boat!', now(), now()),
(22, 'https://picsum.photos/600/600?image=117', 'Go to concert', now(), now()),
(22, 'https://picsum.photos/600/600?image=120', 'Star gaze', now(), now()),
(23, 'https://picsum.photos/600/600?image=111', 'Restore car', now(), now()),
(23, 'https://picsum.photos/600/600?image=364', 'Fly', now(), now()),
(23, 'https://picsum.photos/600/600?image=361', 'Walk', now(), now()),
(24, 'https://picsum.photos/600/600?image=108', 'L.A.', now(), now()),
(24, 'https://picsum.photos/600/600?image=104', 'Dreamcatcher', now(), now());
```
