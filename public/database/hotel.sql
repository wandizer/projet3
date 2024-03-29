--
-- File generated with SQLiteStudio v3.2.1 on qui jun 27 18:38:34 2019
--
-- Text encoding used: UTF-8
--
PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: Appetizers
DROP TABLE IF EXISTS Appetizers;
CREATE TABLE Appetizers (id_appetizer INTEGER PRIMARY KEY AUTOINCREMENT, name Varchar (50) NOT NULL, price DOUBLE NOT NULL);
INSERT INTO Appetizers (id_appetizer, name, price) VALUES (1, 'Tartare de carbe, petits legumes & coulis de tomates fraiche', 12.0);
INSERT INTO Appetizers (id_appetizer, name, price) VALUES (2, 'Nem croustillant aux légumes, salade & sauce soja', 7.0);
INSERT INTO Appetizers (id_appetizer, name, price) VALUES (3, 'Jambon au couteau creme au fromage d''Iraty', 18.0);
INSERT INTO Appetizers (id_appetizer, name, price) VALUES (4, 'Salade de caille royale, vinaigrette au mout de raison', 11.0);
INSERT INTO Appetizers (id_appetizer, name, price) VALUES (5, 'Foie gras de canard maison, brioche tiede & gelee au porto', 10.0);

-- Table: Centrales_Reservation
DROP TABLE IF EXISTS Centrales_Reservation;
CREATE TABLE Centrales_Reservation (id_centrales_reservation INTEGER PRIMARY KEY AUTOINCREMENT, nom VARCHAR (60) NOT NULL, website VARCHAR (255) NOT NULL, status VARCHAR (20), logo TEXT);
INSERT INTO Centrales_Reservation (id_centrales_reservation, nom, website, status, logo) VALUES (1, 'Trivago', 'https://www.trivago.fr/', 'Disponible', 'trivago_logo.png');
INSERT INTO Centrales_Reservation (id_centrales_reservation, nom, website, status, logo) VALUES (2, 'Kayak', 'https://www.kayak.fr/', 'Disponible', 'kayak_logo.png');
INSERT INTO Centrales_Reservation (id_centrales_reservation, nom, website, status, logo) VALUES (3, 'Expedia', 'https://www.expedia.fr/', 'Disponible', 'expedia_logo.png');
INSERT INTO Centrales_Reservation (id_centrales_reservation, nom, website, status, logo) VALUES (4, 'AllTheRooms', 'https://www.alltherooms.com/', 'Disponible', 'alltherooms_logo.jpg');
INSERT INTO Centrales_Reservation (id_centrales_reservation, nom, website, status, logo) VALUES (5, 'EventBlocks', 'http://www.eventblocks.com/', 'Indisponible', 'eventblocks_logo.png');
INSERT INTO Centrales_Reservation (id_centrales_reservation, nom, website, status, logo) VALUES (6, 'TripWolf', 'https://www.tripwolf.com/app/language/fr/', 'Disponible', 'tripwolf_logo.png');

-- Table: Cleaning
DROP TABLE IF EXISTS Cleaning;
CREATE TABLE Cleaning (id_cleaning INTEGER PRIMARY KEY AUTOINCREMENT, priority VARCHAR (100), date_creation TEXT NOT NULL, date_deadline TEXT NOT NULL, state BOOLEAN NOT NULL DEFAULT (false), id_employe INTEGER REFERENCES Employe (id_employe), id_room INTEGER REFERENCES Room (id_room), title VARCHAR (100), description TEXT);
INSERT INTO Cleaning (id_cleaning, priority, date_creation, date_deadline, state, id_employe, id_room, title, description) VALUES (1, 'high', '27/06/2019', '27/06/2019', 0, NULL, NULL, 'Menage 3ème étage', 'Il faut fair avant l''arrivé des nouveaux clients');

-- Table: Client
DROP TABLE IF EXISTS Client;
CREATE TABLE Client (id_client INTEGER PRIMARY KEY AUTOINCREMENT, name Varchar (50) NOT NULL, surname Varchar (50) NOT NULL, email Varchar (50) NOT NULL UNIQUE, number Varchar (50) NOT NULL UNIQUE);
INSERT INTO Client (id_client, name, surname, email, number) VALUES (1, 'Jean', 'Silva', 'jean.silva@exemple.fr', '0610000001');
INSERT INTO Client (id_client, name, surname, email, number) VALUES (2, 'Fréderic', 'Dupont', 'fred.dupont@exemple.fr', '0610000002');
INSERT INTO Client (id_client, name, surname, email, number) VALUES (3, 'Pierre', 'Martins', 'pierre.martins@exemple.fr', '0610000003');
INSERT INTO Client (id_client, name, surname, email, number) VALUES (4, 'Thomas', 'Delaporte', 'thomas.delaporte@exemple.fr', '0610000004');
INSERT INTO Client (id_client, name, surname, email, number) VALUES (5, 'Vitor', 'Oliveira', 'vitor.oliveira@exemple.fr', '0610000005');
INSERT INTO Client (id_client, name, surname, email, number) VALUES (6, 'Melvin', 'Aube', 'melvin.aube@exemple.fr', '0610000006');
INSERT INTO Client (id_client, name, surname, email, number) VALUES (7, 'Jacques', 'Dupont', 'jacques.dupont@exemple.fr', '0610000007');
INSERT INTO Client (id_client, name, surname, email, number) VALUES (8, 'Carlos', 'Silva', 'carlos.silva@exemple.fr', '0610000008');
INSERT INTO Client (id_client, name, surname, email, number) VALUES (9, 'Eugene', 'Zuckerberg', 'eugene.zuckerberg@exemple.fr', '0610000009');
INSERT INTO Client (id_client, name, surname, email, number) VALUES (10, 'Florent', 'Snow', 'florent.snow@exemple.fr', '0610000010');
INSERT INTO Client (id_client, name, surname, email, number) VALUES (11, 'Yunn', 'Lee', 'yunn.lee@exemple.fr', '0610000011');
INSERT INTO Client (id_client, name, surname, email, number) VALUES (12, 'John', 'Wick', 'john.wick@exemple.fr', '0610000012');
INSERT INTO Client (id_client, name, surname, email, number) VALUES (13, 'Donald', 'Trump', 'the.appocalipse@exemple.fr', '0610000013');
INSERT INTO Client (id_client, name, surname, email, number) VALUES (14, 'Keanu', 'Reeves', 'you.re.breathtaking@exemple.fr', '0610000014');
INSERT INTO Client (id_client, name, surname, email, number) VALUES (15, 'Alex', 'Gama', 'alex.gama@exemple.fr', '0610000015');
INSERT INTO Client (id_client, name, surname, email, number) VALUES (16, 'Daniel', 'Crieg', 'daniel.crieg@exemple.fr', '0610000016');
INSERT INTO Client (id_client, name, surname, email, number) VALUES (17, 'Joseph', 'Standard', 'joseph.standard@exemple.fr', '0610000017');
INSERT INTO Client (id_client, name, surname, email, number) VALUES (18, 'Mick', 'Williams', 'mick.williams@exemple.fr', '0610000018');
INSERT INTO Client (id_client, name, surname, email, number) VALUES (19, 'Albert', 'Mussot', 'albert.mussot@exemple.fr', '0610000019');
INSERT INTO Client (id_client, name, surname, email, number) VALUES (22, 'Sun', 'Moon', 'sun.moon@exemple.fr', '0610000020');
INSERT INTO Client (id_client, name, surname, email, number) VALUES (23, 'André', 'Santos', 'andre.santos@exemple.fr', '0610000021');

-- Table: Day_Menu
DROP TABLE IF EXISTS Day_Menu;
CREATE TABLE Day_Menu (id_day_menu INTEGER PRIMARY KEY AUTOINCREMENT, date_arrival TEXT, evening Bool NOT NULL, noon Bool NOT NULL, id_menu INTEGER NOT NULL, CONSTRAINT Menu_FK FOREIGN KEY (id_menu) REFERENCES Menu (id_menu));
INSERT INTO Day_Menu (id_day_menu, date_arrival, evening, noon, id_menu) VALUES (1, '10/05/2019', 0, 1, 1);
INSERT INTO Day_Menu (id_day_menu, date_arrival, evening, noon, id_menu) VALUES (2, '10/05/2019', 1, 0, 1);
INSERT INTO Day_Menu (id_day_menu, date_arrival, evening, noon, id_menu) VALUES (3, '11/05/2019', 0, 1, 1);
INSERT INTO Day_Menu (id_day_menu, date_arrival, evening, noon, id_menu) VALUES (4, '11/05/2019', 1, 0, 1);
INSERT INTO Day_Menu (id_day_menu, date_arrival, evening, noon, id_menu) VALUES (5, '12/05/2019', 0, 1, 2);
INSERT INTO Day_Menu (id_day_menu, date_arrival, evening, noon, id_menu) VALUES (6, '12/05/2019', 1, 0, 2);
INSERT INTO Day_Menu (id_day_menu, date_arrival, evening, noon, id_menu) VALUES (7, '13/05/2019', 0, 1, 2);
INSERT INTO Day_Menu (id_day_menu, date_arrival, evening, noon, id_menu) VALUES (8, '13/05/2019', 1, 0, 2);
INSERT INTO Day_Menu (id_day_menu, date_arrival, evening, noon, id_menu) VALUES (9, '14/05/2019', 0, 1, 3);
INSERT INTO Day_Menu (id_day_menu, date_arrival, evening, noon, id_menu) VALUES (10, '14/05/2019', 1, 0, 3);
INSERT INTO Day_Menu (id_day_menu, date_arrival, evening, noon, id_menu) VALUES (11, '15/05/2019', 0, 1, 3);
INSERT INTO Day_Menu (id_day_menu, date_arrival, evening, noon, id_menu) VALUES (12, '15/05/2019', 1, 0, 3);
INSERT INTO Day_Menu (id_day_menu, date_arrival, evening, noon, id_menu) VALUES (13, '16/05/2019', 0, 1, 4);
INSERT INTO Day_Menu (id_day_menu, date_arrival, evening, noon, id_menu) VALUES (14, '16/05/2019', 1, 0, 4);
INSERT INTO Day_Menu (id_day_menu, date_arrival, evening, noon, id_menu) VALUES (15, '17/05/2019', 0, 1, 4);
INSERT INTO Day_Menu (id_day_menu, date_arrival, evening, noon, id_menu) VALUES (16, '17/05/2019', 1, 0, 4);
INSERT INTO Day_Menu (id_day_menu, date_arrival, evening, noon, id_menu) VALUES (17, '18/05/2019', 0, 1, 5);
INSERT INTO Day_Menu (id_day_menu, date_arrival, evening, noon, id_menu) VALUES (18, '18/05/2019', 1, 0, 5);
INSERT INTO Day_Menu (id_day_menu, date_arrival, evening, noon, id_menu) VALUES (19, '19/05/2019', 0, 1, 5);
INSERT INTO Day_Menu (id_day_menu, date_arrival, evening, noon, id_menu) VALUES (20, '19/05/2019', 1, 0, 5);

-- Table: Dessert
DROP TABLE IF EXISTS Dessert;
CREATE TABLE Dessert (id_dessert INTEGER PRIMARY KEY AUTOINCREMENT, name Varchar (50) NOT NULL, Price DOUBLE NOT NULL);
INSERT INTO Dessert (id_dessert, name, Price) VALUES (1, 'Moelleux au chocolat & creme', 7.5);
INSERT INTO Dessert (id_dessert, name, Price) VALUES (2, 'Gateau framboise chantilly', 9.9);
INSERT INTO Dessert (id_dessert, name, Price) VALUES (3, 'Tartes aux pommes & creme', 11.0);
INSERT INTO Dessert (id_dessert, name, Price) VALUES (4, 'Sorbet citron d''Alsace', 7.5);
INSERT INTO Dessert (id_dessert, name, Price) VALUES (5, 'Le nougat glace & parfumé au miel', 6.5);
INSERT INTO Dessert (id_dessert, name, Price) VALUES (6, 'Coupes de glace melon melba', 7.5);
INSERT INTO Dessert (id_dessert, name, Price) VALUES (7, 'Crepe sucre', 3.9);
INSERT INTO Dessert (id_dessert, name, Price) VALUES (8, 'Crepe montoux', 5.9);
INSERT INTO Dessert (id_dessert, name, Price) VALUES (9, 'Crepe Chantilly', 3.9);
INSERT INTO Dessert (id_dessert, name, Price) VALUES (10, 'Crepe vanilla chocolat banane', 10.0);

-- Table: Employe
DROP TABLE IF EXISTS Employe;
CREATE TABLE Employe (id_employe INTEGER PRIMARY KEY AUTOINCREMENT, name Varchar (50) NOT NULL, surname Varchar (50) NOT NULL, birthday TEXT, salary INTEGER NOT NULL, id_role INTEGER NOT NULL, CONSTRAINT Employe_Role_FK FOREIGN KEY (id_role) REFERENCES Role (id_role));
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (1, 'Olivier', 'Rourre', NULL, 5000, 1);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (2, 'Alex', 'Terrieur', NULL, 3500, 2);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (3, 'Alain', 'Terrieur', NULL, 3500, 3);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (4, 'Jacques', 'Dupont', NULL, 3500, 4);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (5, 'Jean', 'Sauvage', NULL, 3500, 5);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (6, 'Michael', 'Gorges', NULL, 3500, 6);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (7, 'Johnny', 'Joestar', NULL, 3500, 7);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (8, 'Giorno', 'GIovanna', NULL, 2500, 8);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (9, 'Dio', 'Brando', NULL, 2500, 9);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (10, 'Anna', 'Montana', NULL, 2500, 10);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (11, 'Didier', 'Super', NULL, 2500, 11);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (12, 'Anael', 'Yahi', NULL, 2500, 12);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (13, 'Lea', 'Chesnau', NULL, 2500, 13);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (14, 'Laura', 'Sanchez', NULL, 2500, 14);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (15, 'Sandrine', 'Source', NULL, 2500, 15);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (16, 'Aurore', 'Vittel', NULL, 2500, 16);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (17, 'Victor', 'Presci', NULL, 2500, 17);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (18, 'Mario', 'Gucci', NULL, 2500, 18);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (19, 'Adrien', 'Delachiecca', NULL, 2500, 19);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (20, 'Thomas', 'Santier', NULL, 2500, 20);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (21, 'Thomas', 'Gautier', NULL, 2500, 21);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (22, 'Karim', 'Jaube', NULL, 2500, 22);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (23, 'Ilma', 'Toumi', NULL, 2500, 23);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (24, 'Joe', 'Pierlivet', NULL, 2500, 24);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (25, 'Romain', 'Deux', NULL, 2500, 25);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (26, 'Jack', 'Rolling', NULL, 2500, 26);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (27, 'Thomas', 'Aube', NULL, 2500, 27);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (28, 'Thomas', 'Manso', NULL, 2500, 28);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (29, 'Mario', 'Cavarlho', NULL, 2500, 29);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (31, 'Melvin', 'Velluet', NULL, 2500, 31);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (32, 'Julie', 'Moricard', NULL, 2500, 32);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (33, 'Sylvain', 'Pasquier', NULL, 2500, 33);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (34, 'Nelson', 'Martins', NULL, 2500, 34);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (35, 'Kevin', 'Gue', NULL, 2500, 35);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (36, 'Nicolas', 'Dudouit', NULL, 2500, 36);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (37, 'Andre', 'Dos Santos', NULL, 2500, 37);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (38, 'Maxime', 'Boulenaz', NULL, 2500, 38);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (39, 'Axel', 'Even', NULL, 2500, 39);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (41, 'Thomas', 'Manso', NULL, 2500, 41);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (42, 'Vitor', 'De Olivera', NULL, 2500, 42);
INSERT INTO Employe (id_employe, name, surname, birthday, salary, id_role) VALUES (43, 'Kilian', 'Rigot', NULL, 2500, 43);

-- Table: Food_Item
DROP TABLE IF EXISTS Food_Item;
CREATE TABLE Food_Item(id_food_item INTEGER  PRIMARY KEY AUTOINCREMENT,name         Varchar (50) NOT NULL ,id_type_food INTEGER NOT NULL ,CONSTRAINT Food_Item_Type_Food_FK FOREIGN KEY (id_type_food) REFERENCES Type_Food(id_type_food));
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (1, 'Poulet', 1);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (2, 'Boeuf', 1);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (3, 'Dinde', 1);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (4, 'Porc', 1);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (5, 'Veau', 1);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (6, 'Patate', 2);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (7, 'Carotte', 2);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (8, 'Salade', 2);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (9, 'Comcombre', 2);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (10, 'Fraise', 3);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (11, 'Orange', 3);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (12, 'Banane', 3);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (13, 'Pomme', 3);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (14, 'Poire', 3);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (15, 'Ananas', 3);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (16, 'Sardine', 4);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (17, 'Thon', 4);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (18, 'Morue', 4);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (19, 'Dorade', 4);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (20, 'Poivre', 5);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (21, 'Caril', 5);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (22, 'Oregans', 5);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (23, 'Curry', 5);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (24, 'Vin rouge', 6);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (25, 'Vin blanc', 6);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (26, 'Vin rosé', 6);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (27, 'Jus d''orange', 6);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (28, 'CocaCola', 6);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (29, 'Mayonnaise', 7);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (30, 'Ketchup', 7);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (31, 'Bechamel', 7);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (32, 'Samurai', 7);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (33, 'Lait', 8);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (34, 'Beurre', 8);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (35, 'Fromage', 8);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (36, 'Yaourt', 8);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (37, 'Tomate', 2);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (38, 'Oignon', 2);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (39, 'Brocoli', 2);
INSERT INTO Food_Item (id_food_item, name, id_type_food) VALUES (40, 'Aubergine', 2);

-- Table: Loisirs
DROP TABLE IF EXISTS Loisirs;
CREATE TABLE Loisirs (id_loisir INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR (100), description TEXT, price DOUBLE NOT NULL, active BOOLEAN NOT NULL DEFAULT (true));
INSERT INTO Loisirs (id_loisir, title, description, price, active) VALUES (1, 'Massage', NULL, 105.0, 1);
INSERT INTO Loisirs (id_loisir, title, description, price, active) VALUES (2, 'Piscine', 'Accès piscine', 83.0, 1);
INSERT INTO Loisirs (id_loisir, title, description, price, active) VALUES (3, 'Jacuzzi', 'Accès Jacuzzi', 83.0, 1);

-- Table: Loisirs_Reservations
DROP TABLE IF EXISTS Loisirs_Reservations;
CREATE TABLE Loisirs_Reservations (id_loisirs_reservations INTEGER PRIMARY KEY AUTOINCREMENT, date_reservation TEXT NOT NULL, date_seance TEXT NOT NULL, id_client INTEGER REFERENCES Client (id_client) NOT NULL, id_loisir INTEGER REFERENCES Loisirs (id_loisir));
INSERT INTO Loisirs_Reservations (id_loisirs_reservations, date_reservation, date_seance, id_client, id_loisir) VALUES (1, '12/06/2019', '16/06/2019', 1, 1);
INSERT INTO Loisirs_Reservations (id_loisirs_reservations, date_reservation, date_seance, id_client, id_loisir) VALUES (2, '12/06/2019', '16/06/2019', 1, 2);
INSERT INTO Loisirs_Reservations (id_loisirs_reservations, date_reservation, date_seance, id_client, id_loisir) VALUES (3, '12/06/2019', '16/06/2019', 3, 3);
INSERT INTO Loisirs_Reservations (id_loisirs_reservations, date_reservation, date_seance, id_client, id_loisir) VALUES (4, '17/06/2019', '19/06/2019', 7, 2);

-- Table: Main_Course
DROP TABLE IF EXISTS Main_Course;
CREATE TABLE Main_Course (id_main_course INTEGER PRIMARY KEY AUTOINCREMENT, name Varchar (50) NOT NULL, price DOUBLE);
INSERT INTO Main_Course (id_main_course, name, price) VALUES (1, 'Filet de boeuf de Gambourt, chanterelles, pommes coulis beamaise', 37.0);
INSERT INTO Main_Course (id_main_course, name, price) VALUES (2, 'Agneau de lait Axuria roti, legumes sautes, petits pois, ail rose confit', 28.0);
INSERT INTO Main_Course (id_main_course, name, price) VALUES (3, 'Poulet lait poelee, sauce soja, puree de celeri, legumes fondant', 32.0);
INSERT INTO Main_Course (id_main_course, name, price) VALUES (4, 'Baracouda sauvage de l''atlantique duo d''asperge au beurre blanc fait maison', 54.0);
INSERT INTO Main_Course (id_main_course, name, price) VALUES (5, 'Saumon de lait Axuria, legumes sautes, petits pois, ail rose confit', 28.0);
INSERT INTO Main_Course (id_main_course, name, price) VALUES (6, 'Sardines, sauce soja, puree de celeri, legumes fondants', 32.0);

-- Table: Maintenance
DROP TABLE IF EXISTS Maintenance;
CREATE TABLE Maintenance (id_maintenance INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR (100), description TEXT, date_creation TEXT NOT NULL, date_deadline TEXT NOT NULL, state BOOLEAN NOT NULL DEFAULT (false), priority VARCHAR (30) DEFAULT medium, id_employe INTEGER REFERENCES Employe (id_employe), id_service_externe INTEGER REFERENCES Services_Externes (id_service_externe));

-- Table: Meal_Reservation
DROP TABLE IF EXISTS Meal_Reservation;
CREATE TABLE Meal_Reservation(id_meal_reservation INTEGER  PRIMARY KEY AUTOINCREMENT,id_client     INTEGER NOT NULL ,id_day_menu    INTEGER NOT NULL,CONSTRAINT Client_FK FOREIGN KEY (id_client) REFERENCES Client(id_client),CONSTRAINT Day_Menu_FK FOREIGN KEY (id_day_menu) REFERENCES Day_Menu(id_day_menu));
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (1, 1, 1);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (2, 2, 1);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (3, 3, 1);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (4, 4, 1);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (5, 5, 1);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (6, 6, 1);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (7, 1, 3);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (8, 2, 3);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (9, 3, 3);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (10, 4, 3);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (11, 5, 3);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (12, 6, 3);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (13, 1, 5);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (14, 2, 5);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (15, 3, 5);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (16, 4, 5);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (17, 5, 5);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (18, 6, 5);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (19, 1, 7);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (20, 2, 7);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (21, 3, 7);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (22, 4, 7);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (23, 5, 7);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (24, 6, 7);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (25, 1, 9);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (26, 2, 9);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (27, 3, 9);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (28, 4, 9);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (29, 5, 9);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (30, 6, 9);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (31, 1, 11);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (32, 2, 11);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (33, 3, 11);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (34, 4, 11);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (35, 5, 11);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (36, 6, 11);
INSERT INTO Meal_Reservation (id_meal_reservation, id_client, id_day_menu) VALUES (37, 1, 2);

-- Table: Menu
DROP TABLE IF EXISTS Menu;
CREATE TABLE Menu (id_menu INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR (50) NOT NULL, price DOUBLE (50) NOT NULL, id_appetizer INTEGER (11) NOT NULL, id_main_course INTEGER (11) NOT NULL, id_dessert INTEGER (11) NOT NULL, CONSTRAINT Appetizer_FK FOREIGN KEY (id_appetizer) REFERENCES Appetizers (id_appetizer), CONSTRAINT Main_Course_FK FOREIGN KEY (id_main_course) REFERENCES Main_Course (id_main_course), CONSTRAINT Dessert_FK FOREIGN KEY (id_dessert) REFERENCES Dessert (id_dessert));
INSERT INTO Menu (id_menu, name, price, id_appetizer, id_main_course, id_dessert) VALUES (1, 'Menu du Roi', 26.0, 1, 3, 1);
INSERT INTO Menu (id_menu, name, price, id_appetizer, id_main_course, id_dessert) VALUES (2, 'Menu de la Reine', 18.0, 2, 2, 8);
INSERT INTO Menu (id_menu, name, price, id_appetizer, id_main_course, id_dessert) VALUES (3, 'Menu Flaubert', 25.0, 3, 3, 3);
INSERT INTO Menu (id_menu, name, price, id_appetizer, id_main_course, id_dessert) VALUES (4, 'Menu Sublime', 31.0, 4, 4, 4);
INSERT INTO Menu (id_menu, name, price, id_appetizer, id_main_course, id_dessert) VALUES (5, 'Menu Quintaine', 23.0, 5, 5, 5);

-- Table: Menu_Appetizer_Item
DROP TABLE IF EXISTS Menu_Appetizer_Item;
CREATE TABLE Menu_Appetizer_Item (id_menu_appetizer_item INTEGER PRIMARY KEY AUTOINCREMENT, id_appetizer INTEGER NOT NULL, id_food_item INTEGER NOT NULL, CONSTRAINT Appetizer_FK FOREIGN KEY (id_appetizer) REFERENCES Appetizers (id_appetizer), CONSTRAINT Food_Item_FK FOREIGN KEY (id_food_item) REFERENCES Food_Item (id_food_item));
INSERT INTO Menu_Appetizer_Item (id_menu_appetizer_item, id_appetizer, id_food_item) VALUES (1, 1, 8);
INSERT INTO Menu_Appetizer_Item (id_menu_appetizer_item, id_appetizer, id_food_item) VALUES (2, 1, 7);
INSERT INTO Menu_Appetizer_Item (id_menu_appetizer_item, id_appetizer, id_food_item) VALUES (3, 1, 9);
INSERT INTO Menu_Appetizer_Item (id_menu_appetizer_item, id_appetizer, id_food_item) VALUES (4, 2, 35);
INSERT INTO Menu_Appetizer_Item (id_menu_appetizer_item, id_appetizer, id_food_item) VALUES (5, 2, 37);
INSERT INTO Menu_Appetizer_Item (id_menu_appetizer_item, id_appetizer, id_food_item) VALUES (6, 3, 7);
INSERT INTO Menu_Appetizer_Item (id_menu_appetizer_item, id_appetizer, id_food_item) VALUES (7, 4, 6);
INSERT INTO Menu_Appetizer_Item (id_menu_appetizer_item, id_appetizer, id_food_item) VALUES (8, 5, 7);
INSERT INTO Menu_Appetizer_Item (id_menu_appetizer_item, id_appetizer, id_food_item) VALUES (9, 5, 6);

-- Table: Menu_Dessert_Item
DROP TABLE IF EXISTS Menu_Dessert_Item;
CREATE TABLE Menu_Dessert_Item (id_menu_appetizer_item INTEGER PRIMARY KEY AUTOINCREMENT, id_dessert INTEGER NOT NULL, id_food_item INTEGER NOT NULL, CONSTRAINT Dessert_FK FOREIGN KEY (id_dessert) REFERENCES Dessert (id_dessert), CONSTRAINT Food_Item_FK FOREIGN KEY (id_food_item) REFERENCES Food_Item (id_food_item));
INSERT INTO Menu_Dessert_Item (id_menu_appetizer_item, id_dessert, id_food_item) VALUES (1, 1, 33);
INSERT INTO Menu_Dessert_Item (id_menu_appetizer_item, id_dessert, id_food_item) VALUES (2, 2, 33);
INSERT INTO Menu_Dessert_Item (id_menu_appetizer_item, id_dessert, id_food_item) VALUES (3, 3, 7);
INSERT INTO Menu_Dessert_Item (id_menu_appetizer_item, id_dessert, id_food_item) VALUES (4, 5, 35);
INSERT INTO Menu_Dessert_Item (id_menu_appetizer_item, id_dessert, id_food_item) VALUES (5, 4, 8);
INSERT INTO Menu_Dessert_Item (id_menu_appetizer_item, id_dessert, id_food_item) VALUES (6, 6, 35);

-- Table: Menu_Main_Course_Item
DROP TABLE IF EXISTS Menu_Main_Course_Item;
CREATE TABLE Menu_Main_Course_Item (id_menu_appetizer_item INTEGER PRIMARY KEY AUTOINCREMENT, id_main_course INTEGER NOT NULL, id_food_item INTEGER NOT NULL, CONSTRAINT Main_Course_FK FOREIGN KEY (id_main_course) REFERENCES Main_Course (id_main_course), CONSTRAINT Food_Item_FK FOREIGN KEY (id_food_item) REFERENCES Food_Item (id_food_item));
INSERT INTO Menu_Main_Course_Item (id_menu_appetizer_item, id_main_course, id_food_item) VALUES (1, 1, 5);
INSERT INTO Menu_Main_Course_Item (id_menu_appetizer_item, id_main_course, id_food_item) VALUES (2, 2, 2);
INSERT INTO Menu_Main_Course_Item (id_menu_appetizer_item, id_main_course, id_food_item) VALUES (3, 3, 2);
INSERT INTO Menu_Main_Course_Item (id_menu_appetizer_item, id_main_course, id_food_item) VALUES (4, 3, 35);
INSERT INTO Menu_Main_Course_Item (id_menu_appetizer_item, id_main_course, id_food_item) VALUES (5, 4, 5);
INSERT INTO Menu_Main_Course_Item (id_menu_appetizer_item, id_main_course, id_food_item) VALUES (6, 5, 3);
INSERT INTO Menu_Main_Course_Item (id_menu_appetizer_item, id_main_course, id_food_item) VALUES (7, 6, 2);

-- Table: Notoriete
DROP TABLE IF EXISTS Notoriete;
CREATE TABLE Notoriete (id_notoriete INTEGER PRIMARY KEY AUTOINCREMENT, rating_room DOUBLE, rating_services DOUBLE, rating_restaurant DOUBLE, rating_events DOUBLE, comments TEXT, id_client INTEGER REFERENCES Client (id_client));
INSERT INTO Notoriete (id_notoriete, rating_room, rating_services, rating_restaurant, rating_events, comments, id_client) VALUES (5, 4.0, 2.5, 4.5, 4.0, 'Domage. Pas de piscine!', 23);

-- Table: Role
DROP TABLE IF EXISTS Role;
CREATE TABLE Role (id_role INTEGER PRIMARY KEY AUTOINCREMENT, name Varchar (50) NOT NULL, id_service INTEGER NOT NULL, permission_level INTEGER, CONSTRAINT Role_Service_FK FOREIGN KEY (id_service) REFERENCES Service (id_service));
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (1, 'Directeur de l''hotel', 1, 1);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (2, 'Directeur du restaurant', 3, 2);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (3, 'Directeur d''hebergement', 4, 2);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (4, 'Chef de reception', 5, 2);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (5, 'Gouvernante generale', 6, 2);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (6, 'Chef de maintenance', 7, 2);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (7, 'Spa manager', 8, 2);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (8, 'Chef de cuisine', 3, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (9, 'Seconde de cuisine', 3, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (10, 'Chef de partie', 3, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (11, 'Patissier', 3, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (12, 'Boulanger', 3, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (13, 'Cuisinier', 3, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (14, 'Commis de cuisine', 3, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (15, 'Pizzaiolo', 3, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (16, 'Crepier', 3, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (17, 'Ecailler', 3, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (18, 'Plongeur', 3, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (19, 'Chef econome', 3, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (20, 'Econome', 3, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (21, 'Responsable de salle', 9, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (22, 'Maitre d''hotel', 9, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (23, 'Chef de range', 9, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (24, 'Serveur', 9, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (25, 'Commis de salle', 9, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (26, 'Chef sommelier', 9, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (27, 'Sommelier', 9, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (28, 'Barman', 9, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (29, 'Garçon de cafe', 9, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (31, 'Receptionniste', 5, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (32, 'Night auditor', 5, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (33, 'Veilleur de nuit', 5, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (34, 'Concierge', 5, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (35, 'Voiturier', 5, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (36, 'Portier', 5, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (37, 'Bagagiste', 5, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (38, 'Groom', 5, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (39, 'Room service', 5, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (41, 'Gouvernante', 6, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (42, 'Femme de chambre', 6, 3);
INSERT INTO Role (id_role, name, id_service, permission_level) VALUES (43, 'Lingere', 6, 3);

-- Table: Room
DROP TABLE IF EXISTS Room;
CREATE TABLE Room (id_room INTEGER  PRIMARY KEY AUTOINCREMENT,number  INTEGER NOT NULL ,floor   Varchar (50) NOT NULL ,price   INTEGER NOT NULL ,type    Varchar (50) NOT NULL );
INSERT INTO Room (id_room, number, floor, price, type) VALUES (1, 1, '1', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (2, 2, '1', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (3, 3, '1', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (4, 4, '1', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (5, 5, '1', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (6, 6, '1', 332, 'double');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (7, 7, '1', 332, 'double');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (8, 8, '1', 332, 'double');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (9, 9, '1', 446, 'suite');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (10, 10, '1', 446, 'suite');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (11, 11, '2', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (12, 12, '2', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (13, 13, '2', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (14, 14, '2', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (15, 15, '2', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (16, 16, '2', 332, 'double');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (17, 17, '2', 332, 'double');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (18, 18, '2', 332, 'double');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (19, 19, '2', 446, 'suite');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (20, 20, '2', 446, 'suite');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (21, 21, '3', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (22, 22, '3', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (23, 23, '3', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (24, 24, '3', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (25, 25, '3', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (26, 26, '3', 332, 'double');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (27, 27, '3', 332, 'double');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (28, 28, '3', 332, 'double');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (29, 29, '3', 446, 'suite');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (30, 30, '3', 446, 'suite');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (31, 31, '4', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (32, 32, '4', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (33, 33, '4', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (34, 34, '4', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (35, 35, '4', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (36, 36, '4', 332, 'double');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (37, 37, '4', 332, 'double');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (38, 38, '4', 332, 'double');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (39, 39, '4', 446, 'suite');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (40, 40, '4', 446, 'suite');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (41, 41, '5', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (42, 42, '5', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (43, 43, '5', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (44, 44, '5', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (45, 45, '5', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (46, 46, '5', 332, 'double');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (47, 47, '5', 332, 'double');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (48, 48, '5', 332, 'double');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (49, 49, '5', 446, 'suite');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (50, 50, '5', 446, 'suite');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (51, 51, '6', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (52, 52, '6', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (53, 53, '6', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (54, 54, '6', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (55, 55, '6', 246, 'simple');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (56, 56, '6', 332, 'double');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (57, 57, '6', 332, 'double');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (58, 58, '6', 332, 'double');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (59, 59, '6', 446, 'suite');
INSERT INTO Room (id_room, number, floor, price, type) VALUES (60, 60, '6', 446, 'suite');

-- Table: Room_Reservation
DROP TABLE IF EXISTS Room_Reservation;
CREATE TABLE Room_Reservation (id_room_reservation INTEGER PRIMARY KEY AUTOINCREMENT, date_arrival TEXT, date_depart TEXT, date_reservation TEXT, payment_type Varchar (50), payment_amount INTEGER, id_room INTEGER NOT NULL, id_client INTEGER NOT NULL, active BOOLEAN, CONSTRAINT Room_FK FOREIGN KEY (id_room) REFERENCES Room (id_room), CONSTRAINT Client_FK FOREIGN KEY (id_client) REFERENCES Client (id_client));
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (1, '10/06/2019', '20/06/2019', '10/06/2019', 'CB', 70, 1, 1, 0);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (2, '10/06/2019', '20/06/2019', '10/06/2019', 'CHEQUE', 95, 2, 2, 0);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (3, '10/06/2019', '20/06/2019', '10/06/2019', 'ESPECES', 200, 3, 3, 0);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (4, '10/06/2019', '20/06/2019', '10/06/2019', 'CB', 97, 4, 4, 0);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (5, '10/06/2019', '20/06/2019', '10/06/2019', 'CHEQUE', 76, 5, 5, 0);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (6, '10/06/2019', '20/06/2019', '10/06/2019', 'ESPECES', 75, 6, 6, 0);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (7, '15/06/2019', '26/06/2019', '15/06/2019', 'CB', 70, 7, 7, 1);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (8, '15/06/2019', '26/06/2019', '15/06/2019', 'CHEQUE', 95, 8, 8, 1);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (9, '15/06/2019', '26/06/2019', '15/06/2019', 'ESPECES', 200, 9, 9, 1);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (10, '15/06/2019', '26/06/2019', '15/06/2019', 'CB', 97, 10, 10, 1);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (11, '18/06/2019', '22/06/2019', '18/06/2019', 'CHEQUE', 76, 11, 11, 1);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (12, '18/06/2019', '22/06/2019', '18/06/2019', 'ESPECES', 75, 12, 12, 1);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (13, '18/06/2019', '22/06/2019', '18/06/2019', 'CB', 70, 13, 13, 1);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (14, '18/06/2019', '22/06/2019', '18/06/2019', 'CHEQUE', 95, 14, 14, 1);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (15, '22/06/2019', '01/07/2019', '22/06/2019', 'ESPECES', 200, 1, 15, 1);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (16, '22/06/2019', '01/07/2019', '22/06/2019', 'CB', 97, 2, 16, 1);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (17, '22/06/2019', '01/07/2019', '22/06/2019', 'CHEQUE', 76, 3, 17, 1);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (18, '22/06/2019', '01/07/2019', '22/06/2019', 'ESPECES', 75, 4, 18, 1);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (20, '22/6/2019', '22/6/2019', '22/6/2019', NULL, 70, 5, 22, 1);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (21, '23/06/2019', '23/06/2019', '23/06/2019', NULL, 70, 5, 23, 1);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (22, '23/06/2019', '23/06/2019', '23/06/2019', NULL, 95, 6, 23, 1);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (23, '23/06/2019', '23/06/2019', '23/06/2019', NULL, 70, 11, 23, 1);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (24, '27/06/2019', '27/06/2019', '27/06/2019', NULL, 70, 5, 23, 1);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (25, '27/06/2019', '27/06/2019', '27/06/2019', NULL, 160, 20, 23, 1);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (26, '27/06/2019', '27/06/2019', '27/06/2019', NULL, 95, 6, 23, 1);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (27, '27/06/2019', '27/06/2019', '27/06/2019', NULL, 95, 7, 23, 1);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (28, '27/06/2019', '27/06/2019', '27/06/2019', NULL, 95, 8, 23, 1);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (29, '27/06/2019', '27/06/2019', '27/06/2019', NULL, 160, 9, 23, 1);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (30, '27/06/2019', '27/06/2019', '27/06/2019', NULL, 160, 10, 23, 1);
INSERT INTO Room_Reservation (id_room_reservation, date_arrival, date_depart, date_reservation, payment_type, payment_amount, id_room, id_client, active) VALUES (31, '27/06/2019', '27/06/2019', '27/06/2019', NULL, 70, 11, 23, 1);

-- Table: Service
DROP TABLE IF EXISTS Service;
CREATE TABLE Service (id_service INTEGER PRIMARY KEY AUTOINCREMENT, name Varchar (50) NOT NULL);
INSERT INTO Service (id_service, name) VALUES (1, 'Admin');
INSERT INTO Service (id_service, name) VALUES (2, 'Direction');
INSERT INTO Service (id_service, name) VALUES (3, 'Restauration');
INSERT INTO Service (id_service, name) VALUES (4, 'Hebergement');
INSERT INTO Service (id_service, name) VALUES (5, 'Reception');
INSERT INTO Service (id_service, name) VALUES (6, 'Etages');
INSERT INTO Service (id_service, name) VALUES (7, 'Maintenance');
INSERT INTO Service (id_service, name) VALUES (8, 'Loisirs');
INSERT INTO Service (id_service, name) VALUES (9, 'Salle');

-- Table: Services_Externes
DROP TABLE IF EXISTS Services_Externes;
CREATE TABLE Services_Externes (id_service_externe INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR (100) NOT NULL, phone VARCHAR (100) NOT NULL, price DOUBLE NOT NULL);
INSERT INTO Services_Externes (id_service_externe, name, phone, price) VALUES (1, 'Taxi', '', 40.0);
INSERT INTO Services_Externes (id_service_externe, name, phone, price) VALUES (2, 'Medecin', '', 45.0);

-- Table: Services_Externes_Reservations
DROP TABLE IF EXISTS Services_Externes_Reservations;
CREATE TABLE Services_Externes_Reservations (id_service_externe_reservation INTEGER PRIMARY KEY AUTOINCREMENT, date_reservation TEXT NOT NULL, date_seance TEXT, id_client INTEGER REFERENCES Client (id_client), id_service_externe INTEGER REFERENCES Services_Externes (id_service_externe));
INSERT INTO Services_Externes_Reservations (id_service_externe_reservation, date_reservation, date_seance, id_client, id_service_externe) VALUES (1, '18/06/2019', '19/06/2019', 1, 1);

-- Table: Stock
DROP TABLE IF EXISTS Stock;
CREATE TABLE Stock (id_stock INTEGER PRIMARY KEY AUTOINCREMENT, date_arrival TEXT NOT NULL, date_expiration TEXT NOT NULL, quantity INTEGER NOT NULL, id_food_item INTEGER NOT NULL, CONSTRAINT Stock_Food_Item_FK FOREIGN KEY (id_food_item) REFERENCES Food_Item (id_food_item));
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (1, '10/05/2019', '10/06/2019', 100, 1);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (2, '10/05/2019', '10/06/2019', 100, 2);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (3, '10/05/2019', '10/06/2019', 100, 3);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (4, '10/05/2019', '10/06/2019', 100, 4);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (5, '10/05/2019', '10/06/2019', 100, 5);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (6, '10/05/2019', '01/02/2020', 100, 6);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (7, '10/05/2019', '01/02/2020', 100, 7);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (8, '10/05/2019', '01/02/2020', 100, 8);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (9, '10/05/2019', '01/02/2020', 100, 9);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (10, '10/05/2019', '01/02/2020', 100, 37);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (11, '10/05/2019', '01/02/2020', 100, 38);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (12, '10/05/2019', '01/02/2020', 100, 39);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (13, '10/05/2019', '01/02/2020', 100, 40);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (14, '10/05/2019', '21/05/2019', 100, 10);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (15, '10/05/2019', '21/05/2019', 100, 11);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (16, '10/05/2019', '21/05/2019', 100, 12);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (17, '10/05/2019', '21/05/2019', 100, 13);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (18, '10/05/2019', '21/05/2019', 100, 14);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (19, '10/05/2019', '21/05/2019', 100, 15);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (20, '10/05/2019', '10/06/2019', 100, 16);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (21, '10/05/2019', '10/06/2019', 100, 17);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (22, '10/05/2019', '10/06/2019', 100, 18);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (23, '10/05/2019', '10/06/2019', 100, 19);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (24, '10/05/2019', '10/12/2022', 100, 20);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (25, '10/05/2019', '10/12/2022', 100, 21);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (26, '10/05/2019', '10/12/2022', 100, 22);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (27, '10/05/2019', '10/12/2022', 100, 23);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (28, '10/05/2019', '10/12/2022', 100, 24);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (29, '10/05/2019', '10/12/2022', 100, 25);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (30, '10/05/2019', '10/12/2022', 100, 26);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (31, '10/05/2019', '10/12/2022', 100, 27);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (32, '10/05/2019', '10/12/2022', 100, 28);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (33, '10/05/2019', '10/12/2022', 100, 29);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (34, '10/05/2019', '10/12/2022', 100, 30);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (35, '10/05/2019', '10/12/2022', 100, 31);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (36, '10/05/2019', '10/12/2022', 100, 32);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (37, '10/05/2019', '21/05/2019', 100, 33);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (38, '10/05/2019', '21/05/2019', 100, 34);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (39, '10/05/2019', '21/05/2019', 100, 35);
INSERT INTO Stock (id_stock, date_arrival, date_expiration, quantity, id_food_item) VALUES (40, '10/05/2019', '21/05/2019', 100, 36);

-- Table: Transactions
DROP TABLE IF EXISTS Transactions;
CREATE TABLE Transactions (id_transaction INTEGER PRIMARY KEY AUTOINCREMENT, type VARCHAR (50) NOT NULL, amount DOUBLE (50) NOT NULL, date TEXT NOT NULL, payed BOOLEAN NOT NULL DEFAULT (false), id_client INTEGER REFERENCES Client (id_client), id_room_reservation INTEGER REFERENCES Room_Reservation (id_room_reservation), id_stock INTEGER REFERENCES Stock (id_stock), id_meal_reservation INTEGER REFERENCES Meal_Reservation (id_meal_reservation), id_loisir_reservation INTEGER REFERENCES Loisirs_Reservations (id_loisirs_reservations), id_service_externe_reservation INTEGER REFERENCES Services_Externes_Reservations (id_service_externe_reservation), id_maintenance INTEGER REFERENCES Maintenance (id_maintenance));
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (1, 'Room_Reservation', 70.0, '10/06/2019', 0, 1, 1, '', '', '', '', '');
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (2, 'Room_Reservation', 95.0, '10/06/2019', 0, 2, 2, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (3, 'Room_Reservation', 200.0, '10/06/2019', 0, 3, 3, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (4, 'Room_Reservation', 97.0, '10/06/2019', 0, 4, 4, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (5, 'Room_Reservation', 76.0, '10/06/2019', 0, 5, 5, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (6, 'Room_Reservation', 75.0, '10/06/2019', 0, 6, 6, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (7, 'Room_Reservation', 70.0, '15/06/2019', 0, 7, 7, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (8, 'Room_Reservation', 95.0, '15/06/2019', 0, 8, 8, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (9, 'Room_Reservation', 200.0, '15/06/2019', 0, 9, 9, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (10, 'Room_Reservation', 97.0, '15/06/2019', 0, 10, 10, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (11, 'Room_Reservation', 76.0, '18/06/2019', 0, 11, 11, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (12, 'Room_Reservation', 75.0, '18/06/2019', 0, 12, 12, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (13, 'Room_Reservation', 70.0, '18/06/2019', 0, 13, 13, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (14, 'Room_Reservation', 95.0, '18/06/2019', 0, 14, 14, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (15, 'Room_Reservation', 200.0, '22/06/2019', 0, 15, 15, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (16, 'Room_Reservation', 97.0, '22/06/2019', 0, 16, 16, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (17, 'Room_Reservation', 76.0, '22/06/2019', 0, 17, 17, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (18, 'Room_Reservation', 75.0, '22/06/2019', 0, 18, 18, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (20, 'Room_Reservation', 70.0, '22/6/2019', 0, 22, 20, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (21, 'Room_Reservation', 95.0, '23/06/2019', 0, 23, 21, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (22, 'Room_Reservation', 70.0, '23/06/2019', 0, 23, 22, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (23, 'Room_Reservation', 70.0, '23/06/2019', 0, 23, 23, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (24, 'Room_Reservation', 160.0, '27/06/2019', 0, 23, 24, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (25, 'Room_Reservation', 95.0, '27/06/2019', 0, 23, 25, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (26, 'Room_Reservation', 95.0, '27/06/2019', 0, 23, 26, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (27, 'Room_Reservation', 95.0, '27/06/2019', 0, 23, 27, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (28, 'Room_Reservation', 95.0, '27/06/2019', 0, 23, 28, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (29, 'Room_Reservation', 160.0, '27/06/2019', 0, 23, 29, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (30, 'Room_Reservation', 160.0, '27/06/2019', 0, 23, 30, NULL, NULL, NULL, NULL, NULL);
INSERT INTO Transactions (id_transaction, type, amount, date, payed, id_client, id_room_reservation, id_stock, id_meal_reservation, id_loisir_reservation, id_service_externe_reservation, id_maintenance) VALUES (31, 'Room_Reservation', 70.0, '27/06/2019', 0, 23, 31, NULL, NULL, NULL, NULL, NULL);

-- Table: Type_Food
DROP TABLE IF EXISTS Type_Food;
CREATE TABLE Type_Food(id_type_food INTEGER  PRIMARY KEY AUTOINCREMENT,name         Varchar (5) NOT NULL );
INSERT INTO Type_Food (id_type_food, name) VALUES (1, 'Viandes');
INSERT INTO Type_Food (id_type_food, name) VALUES (2, 'Legumes');
INSERT INTO Type_Food (id_type_food, name) VALUES (3, 'Fruits');
INSERT INTO Type_Food (id_type_food, name) VALUES (4, 'Poissons');
INSERT INTO Type_Food (id_type_food, name) VALUES (5, 'Epices');
INSERT INTO Type_Food (id_type_food, name) VALUES (6, 'Boissons');
INSERT INTO Type_Food (id_type_food, name) VALUES (7, 'Sauces');
INSERT INTO Type_Food (id_type_food, name) VALUES (8, 'Produits laitiers');

-- Table: User
DROP TABLE IF EXISTS User;
CREATE TABLE User (id_user    INTEGER  PRIMARY KEY AUTOINCREMENT,email      Varchar (50) NOT NULL ,username   Varchar (50) NOT NULL ,password   Varchar (50) NOT NULL ,id_employe INTEGER NOT NULL ,CONSTRAINT User_Employe_FK FOREIGN KEY (id_employe) REFERENCES Employe(id_employe) ,CONSTRAINT User_Employe_AK UNIQUE (id_employe));
INSERT INTO User (id_user, email, username, password, id_employe) VALUES (1, 'directeur.hotel@erpion.fr', 'directeur_hotel', 'admin', 1);
INSERT INTO User (id_user, email, username, password, id_employe) VALUES (2, 'directeur.restaurant@erpion.fr', 'directeur_restaurant', '1234', 2);
INSERT INTO User (id_user, email, username, password, id_employe) VALUES (3, 'directeur.hebergement@erpion.fr', 'directeur_hebergement', '1234', 3);
INSERT INTO User (id_user, email, username, password, id_employe) VALUES (4, 'chef.reception@erpion.fr', 'chef_reception', '1234', 4);
INSERT INTO User (id_user, email, username, password, id_employe) VALUES (5, 'gouvernante.generale@erpion.fr', 'gouvernante_generale', '1234', 5);
INSERT INTO User (id_user, email, username, password, id_employe) VALUES (6, 'chef.maintenance@erpion.fr', 'chef_maintenance', '1234', 6);
INSERT INTO User (id_user, email, username, password, id_employe) VALUES (7, 'spa.managert@erpion.fr', 'spa_manager', '1234', 7);

-- Table: Voyages
DROP TABLE IF EXISTS Voyages;
CREATE TABLE Voyages (id_voyage INTEGER PRIMARY KEY AUTOINCREMENT, title VARCHAR (100) NOT NULL, description TEXT, price DOUBLE, photo VARCHAR (100), rating DOUBLE, starting_date TEXT, duration TEXT, id_agence INTEGER REFERENCES Centrales_Reservation (id_centrales_reservation));
INSERT INTO Voyages (id_voyage, title, description, price, photo, rating, starting_date, duration, id_agence) VALUES (1, 'Minorque', 'Iamque non umbratis fallaciis res agebatur, sed qua palatium est extra muros, armatis omne circumdedit. ingressusque obscuro iam die, ablatis regiis indumentis Caesarem tunica texit et paludamento communi, eum post haec nihil passurum velut mandato principis iurandi crebritate confirmans et statim inquit exsurge et inopinum carpento privato inpositum ad Histriam duxit prope oppidum Polam, ubi quondam peremptum Constantini filium accepimus Crispum.', 874.0, 'minorque1.jpg', 4.5, '01/07/2019', '8d', 1);
INSERT INTO Voyages (id_voyage, title, description, price, photo, rating, starting_date, duration, id_agence) VALUES (2, 'Tunisie', 'Iamque non umbratis fallaciis res agebatur, sed qua palatium est extra muros, armatis omne circumdedit. ingressusque obscuro iam die, ablatis regiis indumentis Caesarem tunica texit et paludamento communi, eum post haec nihil passurum velut mandato principis iurandi crebritate confirmans et statim inquit exsurge et inopinum carpento privato inpositum ad Histriam duxit prope oppidum Polam, ubi quondam peremptum Constantini filium accepimus Crispum.', 622.0, 'tunisie1.jpg', 5.0, '01/07/2019', '11d', 3);
INSERT INTO Voyages (id_voyage, title, description, price, photo, rating, starting_date, duration, id_agence) VALUES (3, 'Crète', 'Iamque non umbratis fallaciis res agebatur, sed qua palatium est extra muros, armatis omne circumdedit. ingressusque obscuro iam die, ablatis regiis indumentis Caesarem tunica texit et paludamento communi, eum post haec nihil passurum velut mandato principis iurandi crebritate confirmans et statim inquit exsurge et inopinum carpento privato inpositum ad Histriam duxit prope oppidum Polam, ubi quondam peremptum Constantini filium accepimus Crispum.', 830.0, 'crete.jpg', 4.0, '01/07/2019', '10d', 2);
INSERT INTO Voyages (id_voyage, title, description, price, photo, rating, starting_date, duration, id_agence) VALUES (4, 'Majorque', 'Iamque non umbratis fallaciis res agebatur, sed qua palatium est extra muros, armatis omne circumdedit. ingressusque obscuro iam die, ablatis regiis indumentis Caesarem tunica texit et paludamento communi, eum post haec nihil passurum velut mandato principis iurandi crebritate confirmans et statim inquit exsurge et inopinum carpento privato inpositum ad Histriam duxit prope oppidum Polam, ubi quondam peremptum Constantini filium accepimus Crispum.', 667.0, 'majorque.jpg', 5.0, '05/07/2019', '15d', 6);
INSERT INTO Voyages (id_voyage, title, description, price, photo, rating, starting_date, duration, id_agence) VALUES (5, 'Egypte', 'Iamque non umbratis fallaciis res agebatur, sed qua palatium est extra muros, armatis omne circumdedit. ingressusque obscuro iam die, ablatis regiis indumentis Caesarem tunica texit et paludamento communi, eum post haec nihil passurum velut mandato principis iurandi crebritate confirmans et statim inquit exsurge et inopinum carpento privato inpositum ad Histriam duxit prope oppidum Polam, ubi quondam peremptum Constantini filium accepimus Crispum.', 699.0, 'egypte.jpg', 4.5, '13/07/2019', '8d', 4);

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;
