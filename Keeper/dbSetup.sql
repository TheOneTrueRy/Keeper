-- Active: 1682721609011@@SG-vine-marlin-4985-7518-mysql-master.servers.mongodirector.com@3306@marlin
CREATE TABLE IF NOT EXISTS accounts(
  id VARCHAR(255) NOT NULL primary key COMMENT 'primary key',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP COMMENT 'Time Created',
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT 'Last Update',
  name varchar(255) COMMENT 'User Name',
  email varchar(255) COMMENT 'User Email',
  picture varchar(255) COMMENT 'User Profile Picture',
  coverImage VARCHAR(255) COMMENT 'User Cover Picture'
) default charset utf8mb4 COMMENT '';


-- SECTION -- *Keeps*
CREATE TABLE IF NOT EXISTS keeps(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  creatorId VARCHAR(255) NOT NULL,
  name VARCHAR(50) NOT NULL,
  description VARCHAR(500) NOT NULL DEFAULT 'No Description Given',
  img VARCHAR(700) NOT NULL,
  views INT NOT NULL DEFAULT 0,

  FOREIGN KEY (creatorId) REFERENCES accounts(id) ON DELETE CASCADE
) default charset utf8mb4 COMMENT '';


-- SECTION -- *Vaults*
CREATE TABLE IF NOT EXISTS vaults(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  creatorId VARCHAR(255) NOT NULL,
  name VARCHAR(60) NOT NULL,
  description VARCHAR(1000) NOT NULL DEFAULT 'No Description Given',
  img VARCHAR(700) NOT NULL,
  isPrivate BOOLEAN NOT NULL DEFAULT false,

  FOREIGN KEY (creatorId) REFERENCES accounts(id) ON DELETE CASCADE
) default charset utf8mb4 COMMENT '';


-- SECTION -- *VaultKeeps*
CREATE TABLE IF NOT EXISTS vaultkeeps(
  id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  creatorId VARCHAR(255) NOT NULL,
  vaultId INT NOT NULL,
  keepId INT NOT NULL,

  FOREIGN KEY (creatorID) REFERENCES accounts(id) ON DELETE CASCADE,
  FOREIGN KEY (vaultId) REFERENCES vaults(id) ON DELETE CASCADE,
  FOREIGN KEY (keepId) REFERENCES keeps(id) ON DELETE CASCADE
) default charset utf8mb4 COMMENT '';