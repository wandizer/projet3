INSERT INTO service(name) VALUES ("Admin");
INSERT INTO service(name) VALUES ("Gestionnaires");
INSERT INTO service(name) VALUES ("Cuisine");
INSERT INTO service(name) VALUES ("Salle");
INSERT INTO service(name) VALUES ("Réception");
INSERT INTO service(name) VALUES ("Etages");
INSERT INTO service(name) VALUES ("Maintenance");
INSERT INTO service(name) VALUES ("Direction");
INSERT INTO service(name) VALUES ("Loisirs");

INSERT INTO role(name,id_service) VALUES ("Directeur de l’hôtel",1);
INSERT INTO role(name,id_service) VALUES ("Directeur du restaurant",2);
INSERT INTO role(name,id_service) VALUES ("Directeur d’hébergement",2);
INSERT INTO role(name,id_service) VALUES ("Chef de réception",2);
INSERT INTO role(name,id_service) VALUES ("Gouvernante générale",2);
INSERT INTO role(name,id_service) VALUES ("Chef de maintenance",2);
INSERT INTO role(name,id_service) VALUES ("Spa manager",2);
INSERT INTO role(name,id_service) VALUES ("chef de cuisine",3);
INSERT INTO role(name,id_service) VALUES ("seconde de cuisine",3);
INSERT INTO role(name,id_service) VALUES ("chef de partie",3);
INSERT INTO role(name,id_service) VALUES ("pâtissier",3);
INSERT INTO role(name,id_service) VALUES ("boulanger",3);
INSERT INTO role(name,id_service) VALUES ("cuisinier",3);
INSERT INTO role(name,id_service) VALUES ("commis de cuisine",3);
INSERT INTO role(name,id_service) VALUES ("pizzaïolo",3);
INSERT INTO role(name,id_service) VALUES ("crêpier",3);
INSERT INTO role(name,id_service) VALUES ("écailler",3);
INSERT INTO role(name,id_service) VALUES ("plongeur",3);
INSERT INTO role(name,id_service) VALUES ("chef econome",3);
INSERT INTO role(name,id_service) VALUES ("économes",3);
INSERT INTO role(name,id_service) VALUES ("responsable de salle",4);
INSERT INTO role(name,id_service) VALUES ("maître d’hôtel",4);
INSERT INTO role(name,id_service) VALUES ("chef de range",4);
INSERT INTO role(name,id_service) VALUES ("serveur",4);
INSERT INTO role(name,id_service) VALUES ("commis de salle",4);
INSERT INTO role(name,id_service) VALUES ("chef sommelier",4);
INSERT INTO role(name,id_service) VALUES ("sommelier",4);
INSERT INTO role(name,id_service) VALUES ("barman",4);
INSERT INTO role(name,id_service) VALUES ("garçon de café",4);
INSERT INTO role(name,id_service) VALUES ("chef de réception",5);
INSERT INTO role(name,id_service) VALUES ("réceptionniste",5);
INSERT INTO role(name,id_service) VALUES ("night auditor",5);
INSERT INTO role(name,id_service) VALUES ("veilleur de nuit",5);
INSERT INTO role(name,id_service) VALUES ("concierge",5);
INSERT INTO role(name,id_service) VALUES ("voiturier",5);
INSERT INTO role(name,id_service) VALUES ("portier",5);
INSERT INTO role(name,id_service) VALUES ("bagagiste",5);
INSERT INTO role(name,id_service) VALUES ("groom",5);
INSERT INTO role(name,id_service) VALUES ("room service",5);
INSERT INTO role(name,id_service) VALUES ("Gouvernante Générale",6);
INSERT INTO role(name,id_service) VALUES ("gouvernante",6);
INSERT INTO role(name,id_service) VALUES ("femme de chambre",6);
INSERT INTO role(name,id_service) VALUES ("lingère",6);
INSERT INTO role(name,id_service) VALUES ("chef de maintenance",7);
INSERT INTO role(name,id_service) VALUES ("techniciens de maintenance",7);
INSERT INTO role(name,id_service) VALUES ("directeur d’hôtel",8);
INSERT INTO role(name,id_service) VALUES ("directeur du restaurant",8);
INSERT INTO role(name,id_service) VALUES ("directeur de l’hébergement",8);
INSERT INTO role(name,id_service) VALUES ("Spa Manager",9);

INSERT INTO employe(name,surname,birthday,salary,id_role) VALUES ("testNam0", "testSur0", "2019-04-01", "1000", 0);
INSERT INTO employe(name,surname,birthday,salary,id_role) VALUES ("testNam1", "testSur1", "2019-04-01", "1000", 1);
INSERT INTO employe(name,surname,birthday,salary,id_role) VALUES ("testNam2", "testSur2", "2019-04-01", "1000", 2);
INSERT INTO employe(name,surname,birthday,salary,id_role) VALUES ("testNam3", "testSur3", "2019-04-01", "1000", 3);
INSERT INTO employe(name,surname,birthday,salary,id_role) VALUES ("testNam4", "testSur4", "2019-04-01", "1000", 4);
INSERT INTO employe(name,surname,birthday,salary,id_role) VALUES ("testNam5", "testSur5", "2019-04-01", "1000", 5);
INSERT INTO employe(name,surname,birthday,salary,id_role) VALUES ("testNam6", "testSur6", "2019-04-01", "1000", 6);
INSERT INTO employe(name,surname,birthday,salary,id_role) VALUES ("testNam7", "testSur7", "2019-04-01", "1000", 7);
INSERT INTO employe(name,surname,birthday,salary,id_role) VALUES ("testNam8", "testSur8", "2019-04-01", "1000", 8);

INSERT INTO user(email,username,password,id_employe) VALUES ("testEmail0@yopmail.com", "test0", "123", 0);
INSERT INTO user(email,username,password,id_employe) VALUES ("testEmail1@yopmail.com", "test1", "123", 1);
INSERT INTO user(email,username,password,id_employe) VALUES ("testEmail2@yopmail.com", "test2", "123", 2);
INSERT INTO user(email,username,password,id_employe) VALUES ("testEmail3@yopmail.com", "test3", "123", 3);
INSERT INTO user(email,username,password,id_employe) VALUES ("testEmail4@yopmail.com", "test4", "123", 4);
INSERT INTO user(email,username,password,id_employe) VALUES ("testEmail5@yopmail.com", "test5", "123", 5);
INSERT INTO user(email,username,password,id_employe) VALUES ("testEmail6@yopmail.com", "test6", "123", 6);
INSERT INTO user(email,username,password,id_employe) VALUES ("testEmail7@yopmail.com", "test7", "123", 7);
INSERT INTO user(email,username,password,id_employe) VALUES ("testEmail8@yopmail.com", "test8", "123", 8);

INSERT INTO room(number,floor,price,type) VALUES ("A0", "1", "100", "Single");
INSERT INTO room(number,floor,price,type) VALUES ("A1", "1", "100", "Single");
INSERT INTO room(number,floor,price,type) VALUES ("A2", "1", "100", "Single");
INSERT INTO room(number,floor,price,type) VALUES ("A3", "1", "100", "Single");
INSERT INTO room(number,floor,price,type) VALUES ("A4", "1", "100", "Single");
INSERT INTO room(number,floor,price,type) VALUES ("A5", "1", "100", "Single");
INSERT INTO room(number,floor,price,type) VALUES ("A6", "1", "100", "Single");
INSERT INTO room(number,floor,price,type) VALUES ("A7", "1", "100", "Single");
INSERT INTO room(number,floor,price,type) VALUES ("A8", "1", "100", "Single");
INSERT INTO room(number,floor,price,type) VALUES ("A9", "1", "100", "Single");
INSERT INTO room(number,floor,price,type) VALUES ("A10", "1", "100", "Single");
INSERT INTO room(number,floor,price,type) VALUES ("A11", "1", "100", "Single");
INSERT INTO room(number,floor,price,type) VALUES ("A12", "1", "100", "Single");

INSERT INTO room(number,floor,price,type) VALUES ("B0", "2", "200", "Double");
INSERT INTO room(number,floor,price,type) VALUES ("B1", "2", "200", "Double");
INSERT INTO room(number,floor,price,type) VALUES ("B2", "2", "200", "Double");
INSERT INTO room(number,floor,price,type) VALUES ("B3", "2", "200", "Double");
INSERT INTO room(number,floor,price,type) VALUES ("B4", "2", "200", "Double");
INSERT INTO room(number,floor,price,type) VALUES ("B5", "2", "200", "Double");
INSERT INTO room(number,floor,price,type) VALUES ("B6", "2", "200", "Double");
INSERT INTO room(number,floor,price,type) VALUES ("B7", "2", "200", "Double");
INSERT INTO room(number,floor,price,type) VALUES ("B8", "2", "200", "Double");
INSERT INTO room(number,floor,price,type) VALUES ("B9", "2", "200", "Double");
INSERT INTO room(number,floor,price,type) VALUES ("B10", "2", "200", "Double");
INSERT INTO room(number,floor,price,type) VALUES ("B11", "2", "200", "Double");
INSERT INTO room(number,floor,price,type) VALUES ("B12", "2", "200", "Double");

INSERT INTO room(number,floor,price,type) VALUES ("C0", "3", "300", "Suite");
INSERT INTO room(number,floor,price,type) VALUES ("C1", "3", "300", "Suite");
INSERT INTO room(number,floor,price,type) VALUES ("C2", "3", "300", "Suite");
INSERT INTO room(number,floor,price,type) VALUES ("C3", "3", "300", "Suite");
INSERT INTO room(number,floor,price,type) VALUES ("C4", "3", "300", "Suite");
INSERT INTO room(number,floor,price,type) VALUES ("C5", "3", "300", "Suite");
INSERT INTO room(number,floor,price,type) VALUES ("C6", "3", "300", "Suite");
INSERT INTO room(number,floor,price,type) VALUES ("C7", "3", "300", "Suite");
INSERT INTO room(number,floor,price,type) VALUES ("C8", "3", "300", "Suite");
INSERT INTO room(number,floor,price,type) VALUES ("C9", "3", "300", "Suite");
INSERT INTO room(number,floor,price,type) VALUES ("C10", "3", "300", "Suite");
INSERT INTO room(number,floor,price,type) VALUES ("C11", "3", "300", "Suite");
INSERT INTO room(number,floor,price,type) VALUES ("C12", "3", "300", "Suite");


