-- tables
-- Table: Boards
CREATE TABLE Boards (
    board_id serial  NOT NULL,
    board_name varchar(50)  NOT NULL,
    user_id int  NOT NULL,
    CONSTRAINT Boards_pk PRIMARY KEY (board_id)
);

-- Table: Cards
CREATE TABLE Cards (
    card_id serial  NOT NULL,
    board_id int  NOT NULL,
    status int  NOT NULL,
    body varchar(300)  NOT NULL,
    CONSTRAINT Cards_pk PRIMARY KEY (card_id)
);

-- Table: Users
CREATE TABLE Users (
    user_id serial  NOT NULL,
    username varchar(50)  NOT NULL,
    password varchar(50)  NOT NULL,
    first_name varchar(50)  NOT NULL,
    last_name varchar(50)  NOT NULL,
    CONSTRAINT user_id PRIMARY KEY (user_id)
);

-- foreign keys
-- Reference: Boards_Users (table: Boards)
ALTER TABLE Boards ADD CONSTRAINT Boards_Users
    FOREIGN KEY (user_id)
    REFERENCES Users (user_id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: Cards_Boards (table: Cards)
ALTER TABLE Cards ADD CONSTRAINT Cards_Boards
    FOREIGN KEY (board_id)
    REFERENCES Boards (board_id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;