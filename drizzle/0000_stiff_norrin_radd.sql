CREATE TABLE `Files` (
	`id` int AUTO_INCREMENT NOT NULL,
	`url` varchar(191) NOT NULL,
	`key` varchar(191) NOT NULL,
	`name` varchar(191) NOT NULL,
	`size` int NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	CONSTRAINT `Files_id_pk` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `Users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(191) NOT NULL,
	`createdAt` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updatedAt` datetime(3) DEFAULT CURRENT_TIMESTAMP(3),
	`role` enum('ADMIN','USER','READ') NOT NULL DEFAULT 'USER',
	CONSTRAINT `Users_id_pk` PRIMARY KEY(`id`),
	CONSTRAINT `Users_email_unique` UNIQUE(`email`),
	CONSTRAINT `Users_email_key` UNIQUE(`email`)
);

