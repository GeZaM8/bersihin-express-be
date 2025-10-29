-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
CREATE TABLE `comments` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`id_order` int(11) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` varchar(255) NOT NULL,
	`photo` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `orders` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`id_user` int(11) NOT NULL,
	`name` varchar(255) NOT NULL,
	`message` text DEFAULT 'NULL',
	`weight` float NOT NULL,
	`estimated_time` datetime NOT NULL,
	`rating` int(11) NOT NULL,
	`status_confirmed` enum('confirmed','pending','rejected','') NOT NULL,
	`is_completed` tinytext NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `order_details` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`id_order` int(11) NOT NULL,
	`id_tasks` int(11) NOT NULL,
	`id_user` int(11) NOT NULL,
	`is_completed` tinytext NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `roles` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(10) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `task_lists` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`name` varchar(100) NOT NULL,
	`description` varchar(255) NOT NULL,
	`price` int(11) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`email` varchar(100) NOT NULL,
	`username` varchar(50) NOT NULL,
	`password` varchar(255) NOT NULL,
	`id_role` int(11) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
CREATE TABLE `user_details` (
	`id` int(11) AUTO_INCREMENT NOT NULL,
	`user_id` int(11) NOT NULL,
	`name` varchar(100) NOT NULL,
	`address` text NOT NULL,
	`phone` varchar(16) NOT NULL,
	`birth` date NOT NULL,
	`photo` varchar(255) NOT NULL,
	`created_at` timestamp NOT NULL DEFAULT 'current_timestamp()',
	`updated_at` timestamp NOT NULL DEFAULT 'current_timestamp()'
);
--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `orders`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `FK_orders_users` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`id_order`) REFERENCES `orders`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`id_tasks`) REFERENCES `task_lists`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_ibfk_3` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`id_role`) REFERENCES `roles`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `user_details` ADD CONSTRAINT `user_details_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
CREATE INDEX `id_order` ON `comments` (`id_order`);--> statement-breakpoint
CREATE INDEX `id_order` ON `order_details` (`id_order`);--> statement-breakpoint
CREATE INDEX `id_tasks` ON `order_details` (`id_tasks`);--> statement-breakpoint
CREATE INDEX `id_role` ON `users` (`id_role`);
*/