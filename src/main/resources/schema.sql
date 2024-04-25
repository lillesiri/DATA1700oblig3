CREATE TABLE IF NOT EXISTS Bestilling (
    id INTEGER AUTO_INCREMENT,
    film VARCHAR(255),
    antall VARCHAR(255),
    fornavn VARCHAR(255),
    etternavn VARCHAR(255),
    telefonnr INTEGER,
    epost VARCHAR(255),
    PRIMARY KEY (id)
);