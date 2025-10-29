ALTER TABLE `comments` DROP FOREIGN KEY `comments_ibfk_1`;
--> statement-breakpoint
ALTER TABLE `orders` DROP FOREIGN KEY `FK_orders_users`;
--> statement-breakpoint
ALTER TABLE `order_details` DROP FOREIGN KEY `order_details_ibfk_1`;
--> statement-breakpoint
ALTER TABLE `order_details` DROP FOREIGN KEY `order_details_ibfk_2`;
--> statement-breakpoint
ALTER TABLE `order_details` DROP FOREIGN KEY `order_details_ibfk_3`;
--> statement-breakpoint
ALTER TABLE `users` DROP FOREIGN KEY `users_ibfk_1`;
--> statement-breakpoint
ALTER TABLE `user_details` DROP FOREIGN KEY `user_details_ibfk_1`;
--> statement-breakpoint
ALTER TABLE `comments` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `comments` MODIFY COLUMN `id_order` int NOT NULL;--> statement-breakpoint
ALTER TABLE `orders` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `orders` MODIFY COLUMN `id_user` int NOT NULL;--> statement-breakpoint
ALTER TABLE `orders` MODIFY COLUMN `message` text DEFAULT ('NULL');--> statement-breakpoint
ALTER TABLE `orders` MODIFY COLUMN `rating` int NOT NULL;--> statement-breakpoint
ALTER TABLE `orders` MODIFY COLUMN `status_confirmed` enum('confirmed','pending','rejected') NOT NULL;--> statement-breakpoint
ALTER TABLE `order_details` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `order_details` MODIFY COLUMN `id_order` int NOT NULL;--> statement-breakpoint
ALTER TABLE `order_details` MODIFY COLUMN `id_tasks` int NOT NULL;--> statement-breakpoint
ALTER TABLE `order_details` MODIFY COLUMN `id_user` int NOT NULL;--> statement-breakpoint
ALTER TABLE `roles` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `task_lists` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `task_lists` MODIFY COLUMN `price` int NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `id_role` int NOT NULL;--> statement-breakpoint
ALTER TABLE `user_details` MODIFY COLUMN `id` int AUTO_INCREMENT NOT NULL;--> statement-breakpoint
ALTER TABLE `user_details` MODIFY COLUMN `user_id` int NOT NULL;--> statement-breakpoint
ALTER TABLE `comments` ADD CONSTRAINT `comments_id_order_orders_id_fk` FOREIGN KEY (`id_order`) REFERENCES `orders`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `orders` ADD CONSTRAINT `orders_id_user_users_id_fk` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_id_order_orders_id_fk` FOREIGN KEY (`id_order`) REFERENCES `orders`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_id_tasks_task_lists_id_fk` FOREIGN KEY (`id_tasks`) REFERENCES `task_lists`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `order_details` ADD CONSTRAINT `order_details_id_user_users_id_fk` FOREIGN KEY (`id_user`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_id_role_roles_id_fk` FOREIGN KEY (`id_role`) REFERENCES `roles`(`id`) ON DELETE cascade ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `user_details` ADD CONSTRAINT `user_details_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE cascade ON UPDATE cascade;