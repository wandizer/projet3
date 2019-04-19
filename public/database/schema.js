const createTable = {
  Sercive: 'CREATE TABLE Service ('
    + 'id_service INTEGER  PRIMARY KEY AUTOINCREMENT,'
    + 'name       Varchar (50) NOT NULL);',
  Role: 'CREATE TABLE Role ('
    + 'id_role    INTEGER  PRIMARY KEY AUTOINCREMENT,'
    + 'name       Varchar (50) NOT NULL ,'
    + 'id_service INTEGER NOT NULL ,'
    + 'CONSTRAINT Role_Service_FK FOREIGN KEY (id_service) REFERENCES Service(id_service));',
  Employe: 'CREATE TABLE Employe ('
    + 'id_employe INTEGER PRIMARY KEY AUTOINCREMENT,'
    + 'name       Varchar (50) NOT NULL ,'
    + 'surname    Varchar (50) NOT NULL ,'
    + 'birthday   Date ,'
    + 'salary     INTEGER NOT NULL ,'
    + 'id_role    INTEGER NOT NULL,'
    + 'CONSTRAINT Employe_Role_FK FOREIGN KEY (id_role) REFERENCES Role(id_role));',
  User: 'CREATE TABLE User ('
    + 'id_user    INTEGER  PRIMARY KEY AUTOINCREMENT,'
    + 'email      Varchar (50) NOT NULL ,'
    + 'username   Varchar (50) NOT NULL ,'
    + 'password   Varchar (50) NOT NULL ,'
    + 'id_employe INTEGER NOT NULL ,'
    + 'CONSTRAINT User_Employe_FK FOREIGN KEY (id_employe) REFERENCES Employe(id_employe) ,'
    + 'CONSTRAINT User_Employe_AK UNIQUE (id_employe));',
  Room: 'CREATE TABLE Room ('
    + 'id_room INTEGER  PRIMARY KEY AUTOINCREMENT,'
    + 'number  INTEGER NOT NULL ,'
    + 'floor   Varchar (50) NOT NULL ,'
    + 'price   INTEGER NOT NULL ,'
    + 'type    Varchar (50) NOT NULL );',
  Client: 'CREATE TABLE Client ('
    + 'id_client INTEGER  PRIMARY KEY AUTOINCREMENT,'
    + 'name      Varchar (50) NOT NULL ,'
    + 'surname   Varchar (50) NOT NULL ,'
    + 'email     Varchar (50) NOT NULL ,'
    + 'number    Varchar (50) NOT NULL );',
  Room_Reservation: 'CREATE TABLE Room_Reservation ('
    + 'id_room_reservation INTEGER  PRIMARY KEY AUTOINCREMENT,'
    + 'date_arrival        Date NOT NULL ,'
    + 'date_depart         Date NOT NULL ,'
    + 'payment_type        Varchar (50) NOT NULL ,'
    + 'payment_amount      INTEGER NOT NULL ,'
    + 'id_room             INTEGER NOT NULL ,'
    + 'id_client           INTEGER NOT NULL ,'
    + 'CONSTRAINT Room_Reservation_Room_FK FOREIGN KEY (id_room) REFERENCES Room(id_room) ,'
    + 'CONSTRAINT Room_Reservation_Client0_FK FOREIGN KEY (id_client) REFERENCES Client(id_client));',
  Type_Food: 'CREATE TABLE Type_Food('
    + 'id_type_food INTEGER  PRIMARY KEY AUTOINCREMENT,'
    + 'name         Varchar (5) NOT NULL );',
  Food_Item: 'CREATE TABLE Food_Item('
    + 'id_food_item INTEGER  PRIMARY KEY AUTOINCREMENT,'
    + 'name         Varchar (50) NOT NULL ,'
    + 'id_type_food INTEGER NOT NULL ,'
    + 'CONSTRAINT Food_Item_Type_Food_FK FOREIGN KEY (id_type_food) REFERENCES Type_Food(id_type_food));',
  Stock: 'CREATE TABLE Stock('
    + 'id_stock        INTEGER  PRIMARY KEY AUTOINCREMENT,'
    + 'date_arrival    Date NOT NULL ,'
    + 'date_expiration Date NOT NULL ,'
    + 'quantity        INTEGER NOT NULL ,'
    + 'id_food_item    INTEGER NOT NULL ,'
    + 'CONSTRAINT Stock_Food_Item_FK FOREIGN KEY (id_food_item) REFERENCES Food_Item(id_food_item));',
  Appetizers: 'CREATE TABLE Appetizers('
    + 'id_appetizer INTEGER  PRIMARY KEY AUTOINCREMENT,'
    + 'name         Varchar (50) NOT NULL );',
};

module.exports = createTable;
