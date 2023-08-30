-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS category_id_seq;

-- Table Definition
CREATE TABLE "public"."category" (
    "name" varchar NOT NULL,
    "id" int4 NOT NULL DEFAULT nextval('category_id_seq'::regclass),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS clients_id_seq;

-- Table Definition
CREATE TABLE "public"."clients" (
    "id" int4 NOT NULL DEFAULT nextval('clients_id_seq'::regclass),
    "fullname" varchar(50) NOT NULL,
    "email" varchar(50) NOT NULL,
    "phone" varchar(15) NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "detail-purchase-order_id_seq";

-- Table Definition
CREATE TABLE "public"."detail-purchase-order" (
    "id" int4 NOT NULL DEFAULT nextval('"detail-purchase-order_id_seq"'::regclass),
    "inputQuantity" int4 NOT NULL,
    "productId" int4 NOT NULL,
    "purchaseOrderId" int4 NOT NULL,
    "unitPrice" numeric(10,2) NOT NULL,
    "purchasePrice" numeric(10,2) NOT NULL,
    CONSTRAINT "FK_23e7a87d7e6e385f261a97a7162" FOREIGN KEY ("productId") REFERENCES "public"."products"("id"),
    CONSTRAINT "FK_aaec229816baeb76b1e1c5a09ce" FOREIGN KEY ("purchaseOrderId") REFERENCES "public"."purchase-order"("id"),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "detail-sales-order_id_seq";

-- Table Definition
CREATE TABLE "public"."detail-sales-order" (
    "id" int4 NOT NULL DEFAULT nextval('"detail-sales-order_id_seq"'::regclass),
    "outputQuantity" int4 NOT NULL,
    "productId" int4 NOT NULL,
    "salesOrderId" int4 NOT NULL,
    "unitPrice" numeric(10,2) NOT NULL,
    "salePrice" numeric(10,2) NOT NULL,
    CONSTRAINT "FK_b9d1e9c6131c662fe7c86319ef7" FOREIGN KEY ("productId") REFERENCES "public"."products"("id"),
    CONSTRAINT "FK_a31e288d1607c20180a1f0ea3eb" FOREIGN KEY ("salesOrderId") REFERENCES "public"."sales-order"("id"),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS products_id_seq;

-- Table Definition
CREATE TABLE "public"."products" (
    "id" int4 NOT NULL DEFAULT nextval('products_id_seq'::regclass),
    "stock" int4 NOT NULL DEFAULT 0,
    "categoryId" int4 NOT NULL,
    "description" varchar(50) NOT NULL,
    "image" varchar(200) NOT NULL,
    "priceCost" numeric(10,2) NOT NULL DEFAULT '0'::numeric,
    "gain" numeric(10,2) NOT NULL DEFAULT '0'::numeric,
    "saleUnitPrice" numeric(10,2) NOT NULL DEFAULT '0'::numeric,
    CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "public"."category"("id"),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "purchase-order_id_seq";

-- Table Definition
CREATE TABLE "public"."purchase-order" (
    "id" int4 NOT NULL DEFAULT nextval('"purchase-order_id_seq"'::regclass),
    "date" date,
    "supplierId" int4 NOT NULL,
    "fullPurchasePrice" numeric(10,2) NOT NULL,
    CONSTRAINT "FK_feb597a59f92a52633f0b9a0ec3" FOREIGN KEY ("supplierId") REFERENCES "public"."supplier"("id"),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS "sales-order_id_seq";

-- Table Definition
CREATE TABLE "public"."sales-order" (
    "id" int4 NOT NULL DEFAULT nextval('"sales-order_id_seq"'::regclass),
    "date" date,
    "clientId" int4 NOT NULL,
    "fullSalePrice" numeric(10,2) NOT NULL,
    CONSTRAINT "FK_63a3568a057f8564846ec763211" FOREIGN KEY ("clientId") REFERENCES "public"."clients"("id"),
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS supplier_id_seq;

-- Table Definition
CREATE TABLE "public"."supplier" (
    "id" int4 NOT NULL DEFAULT nextval('supplier_id_seq'::regclass),
    "fullname" varchar(50) NOT NULL,
    "email" varchar(50) NOT NULL,
    "phone" varchar(15) NOT NULL,
    PRIMARY KEY ("id")
);

-- This script only contains the table creation statements and does not fully represent the table in the database. It's still missing: indices, triggers. Do not use it as a backup.

-- Sequence and defined type
CREATE SEQUENCE IF NOT EXISTS users_id_seq;

-- Table Definition
CREATE TABLE "public"."users" (
    "email" varchar NOT NULL,
    "password" varchar NOT NULL,
    "fullname" varchar NOT NULL,
    "phone" varchar NOT NULL,
    "rol" varchar NOT NULL,
    "isActive" bool NOT NULL DEFAULT true,
    "id" int4 NOT NULL DEFAULT nextval('users_id_seq'::regclass),
    "lastUpdateBy" int4,
    CONSTRAINT "FK_df00e7cf13b1ccac576f6e55583" FOREIGN KEY ("lastUpdateBy") REFERENCES "public"."users"("id"),
    PRIMARY KEY ("id")
);

INSERT INTO "public"."category" ("name", "id") VALUES
('Tableta', 1);
INSERT INTO "public"."category" ("name", "id") VALUES
('Jarabe', 2);


INSERT INTO "public"."clients" ("id", "fullname", "email", "phone") VALUES
(1, ' Mario Aguilar', 'mario@hotmail.com', '+51 987633221 ');
INSERT INTO "public"."clients" ("id", "fullname", "email", "phone") VALUES
(2, ' Juan Castillo', 'juan@gmail.com', '+51 987678980 ');
INSERT INTO "public"."clients" ("id", "fullname", "email", "phone") VALUES
(3, ' Marcia Chalco', 'marcia@gmail.com', '+51 987633221 ');

INSERT INTO "public"."detail-purchase-order" ("id", "inputQuantity", "productId", "purchaseOrderId", "unitPrice", "purchasePrice") VALUES
(43, 20, 20, 37, 14.00, 280.00);
INSERT INTO "public"."detail-purchase-order" ("id", "inputQuantity", "productId", "purchaseOrderId", "unitPrice", "purchasePrice") VALUES
(44, 22, 21, 37, 25.00, 550.00);
INSERT INTO "public"."detail-purchase-order" ("id", "inputQuantity", "productId", "purchaseOrderId", "unitPrice", "purchasePrice") VALUES
(45, 24, 22, 38, 18.00, 432.00);
INSERT INTO "public"."detail-purchase-order" ("id", "inputQuantity", "productId", "purchaseOrderId", "unitPrice", "purchasePrice") VALUES
(46, 30, 23, 38, 24.00, 720.00),
(59, 20, 24, 50, 15.00, 300.00),
(60, 14, 24, 51, 18.00, 252.00),
(61, 25, 26, 52, 20.00, 500.00),
(62, 16, 22, 53, 25.00, 400.00),
(63, 5, 20, 54, 14.00, 70.00),
(64, 8, 22, 54, 25.00, 200.00),
(65, 12, 20, 55, 20.00, 240.00),
(66, 15, 20, 56, 16.88, 253.20),
(67, 8, 22, 57, 25.00, 200.00);

INSERT INTO "public"."detail-sales-order" ("id", "outputQuantity", "productId", "salesOrderId", "unitPrice", "salePrice") VALUES
(31, 6, 20, 29, 22.40, 134.40);
INSERT INTO "public"."detail-sales-order" ("id", "outputQuantity", "productId", "salesOrderId", "unitPrice", "salePrice") VALUES
(32, 8, 22, 30, 26.10, 208.80);
INSERT INTO "public"."detail-sales-order" ("id", "outputQuantity", "productId", "salesOrderId", "unitPrice", "salePrice") VALUES
(33, 6, 22, 31, 26.10, 156.60);
INSERT INTO "public"."detail-sales-order" ("id", "outputQuantity", "productId", "salesOrderId", "unitPrice", "salePrice") VALUES
(34, 4, 22, 32, 26.10, 104.40),
(35, 6, 22, 33, 26.10, 156.60),
(44, 8, 24, 42, 24.00, 192.00),
(45, 6, 22, 43, 36.25, 217.50),
(46, 6, 20, 44, 22.40, 134.40),
(47, 4, 22, 44, 36.25, 145.00),
(48, 10, 20, 45, 27.01, 270.10),
(49, 14, 22, 46, 36.25, 507.50),
(50, 30, 23, 47, 39.97, 1199.10);

INSERT INTO "public"."products" ("id", "stock", "categoryId", "description", "image", "priceCost", "gain", "saleUnitPrice") VALUES
(20, 30, 1, 'Vitamina C', 'b14fb1b771104dd874dcb9feb503c1bd.jpg', 16.88, 1.60, 27.01);
INSERT INTO "public"."products" ("id", "stock", "categoryId", "description", "image", "priceCost", "gain", "saleUnitPrice") VALUES
(21, 22, 1, 'Gingisona', '118f12473d589c45238c6aa31ad34046.jpg', 25.00, 1.55, 38.75);
INSERT INTO "public"."products" ("id", "stock", "categoryId", "description", "image", "priceCost", "gain", "saleUnitPrice") VALUES
(22, 8, 1, 'Panadol', '5e0f7574caab63171225949aa43b65f0.jpg', 25.00, 1.45, 36.25);
INSERT INTO "public"."products" ("id", "stock", "categoryId", "description", "image", "priceCost", "gain", "saleUnitPrice") VALUES
(23, 0, 2, 'Vitamina A', '3a3ab6f10c7a2d938cb9e8d3dba185b6.jpg', 24.67, 1.62, 39.97),
(24, 26, 2, 'Paracetamol', 'bddb6daa44da40f052687a41020281c8.jpg', 16.62, 1.55, 25.76),
(26, 25, 2, ' Amoxicilina', 'b747ee3e0e1dcacf1ec6f8c0878fa869.jpg', 20.00, 1.60, 32.00);

INSERT INTO "public"."purchase-order" ("id", "date", "supplierId", "fullPurchasePrice") VALUES
(37, '2023-06-14', 2, 830.00);
INSERT INTO "public"."purchase-order" ("id", "date", "supplierId", "fullPurchasePrice") VALUES
(38, '2023-06-12', 2, 1152.00);
INSERT INTO "public"."purchase-order" ("id", "date", "supplierId", "fullPurchasePrice") VALUES
(50, '2023-06-20', 2, 300.00);
INSERT INTO "public"."purchase-order" ("id", "date", "supplierId", "fullPurchasePrice") VALUES
(51, '2023-06-20', 2, 252.00),
(52, '2023-06-20', 1, 500.00),
(53, '2023-06-20', 1, 400.00),
(54, '2023-07-24', 1, 270.00),
(55, '2023-07-24', 1, 240.00),
(56, '2023-07-25', 2, 253.20),
(57, '2023-07-25', 1, 200.00);

INSERT INTO "public"."sales-order" ("id", "date", "clientId", "fullSalePrice") VALUES
(29, '2023-06-14', 2, 134.40);
INSERT INTO "public"."sales-order" ("id", "date", "clientId", "fullSalePrice") VALUES
(30, '2023-06-12', 1, 208.80);
INSERT INTO "public"."sales-order" ("id", "date", "clientId", "fullSalePrice") VALUES
(31, '2023-06-13', 2, 156.60);
INSERT INTO "public"."sales-order" ("id", "date", "clientId", "fullSalePrice") VALUES
(32, '2023-06-14', 2, 104.40),
(33, '2023-06-14', 2, 156.60),
(42, '2023-06-20', 1, 192.00),
(43, '2023-06-20', 2, 217.50),
(44, '2023-07-24', 2, 279.40),
(45, '2023-07-24', 2, 270.10),
(46, '2023-07-25', 2, 507.50),
(47, '2023-07-25', 1, 1199.10);

INSERT INTO "public"."supplier" ("id", "fullname", "email", "phone") VALUES
(1, 'Importadero S.A.C. 123', 'importadero@correo.com', '+51 923756888 ');
INSERT INTO "public"."supplier" ("id", "fullname", "email", "phone") VALUES
(2, 'Heltf SAC322', 'medic@correo.com', '+51 999888777 ');
INSERT INTO "public"."supplier" ("id", "fullname", "email", "phone") VALUES
(3, 'Importadero SAC', 'hola@correo.com', '+51 963852741 ');

INSERT INTO "public"."users" ("email", "password", "fullname", "phone", "rol", "isActive", "id", "lastUpdateBy") VALUES
('admin@correo.com', '$2b$10$6wKwF4u5I/8/lZkfRw/7nO7MG6b6FMO334KLnP4a8yqazp9X5g102', 'Admin poderoso', '987654321', 'administrador', 't', 1, NULL);
INSERT INTO "public"."users" ("email", "password", "fullname", "phone", "rol", "isActive", "id", "lastUpdateBy") VALUES
('prueba@correo.com', '$2b$10$/S7KrYU3NHu4ldIZRWdjVe2/Cc6ipL1lJjirf5wlIrrKMwreOQ9nW', 'Juan Pablo', '987654321', 'trabajador', 't', 2, NULL);
INSERT INTO "public"."users" ("email", "password", "fullname", "phone", "rol", "isActive", "id", "lastUpdateBy") VALUES
('prueba3@correo.com', '$2b$10$Jb.d5OcOfGhzmgNoqLTlKOLN6q4SgPMXRBF4HeURP7Rz8.j5pLlfa', 'Alfonso Ugarte', '987654321', 'trabajador', 't', 3, NULL);
INSERT INTO "public"."users" ("email", "password", "fullname", "phone", "rol", "isActive", "id", "lastUpdateBy") VALUES
('prueba5@correo.com', '$2b$10$A9InkAuxhBGX3l1WZ/kYfOrkrNqzfag9a74eqpjRmW9FmNFV9v/oK', 'Manuel Ugarte', '987654321', 'trabajador', 't', 4, NULL),
('prueba2@correo.com', '$2b$10$bf0VI/QbP5BQqvFZIIRn6eOPcubIeY9DvvMQlx9.Efey6RKV3QkhS', 'Felix Caneda', '987654321', 'trabajador', 't', 5, NULL),
('prueba4@correo.com', '$2b$10$hijrthxl6wxIB0rqUTq0LuTqxTOOenpR/NUuouLJ7rFs0DT0L9UbO', 'Manuel Ugarte', '987654321', 'trabajador', 'f', 6, NULL);
