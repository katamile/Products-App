USE [master]
GO
/****** Object:  Database [ProductsDB]    Script Date: 17/2/2025 0:02:21 ******/
CREATE DATABASE [ProductsDB]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'ProductsDB', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\ProductsDB.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'ProductsDB_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.SQLEXPRESS\MSSQL\DATA\ProductsDB_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE [ProductsDB] SET COMPATIBILITY_LEVEL = 160
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [ProductsDB].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [ProductsDB] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [ProductsDB] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [ProductsDB] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [ProductsDB] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [ProductsDB] SET ARITHABORT OFF 
GO
ALTER DATABASE [ProductsDB] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [ProductsDB] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [ProductsDB] SET AUTO_UPDATE_STATISTICS OFF 
GO
ALTER DATABASE [ProductsDB] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [ProductsDB] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [ProductsDB] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [ProductsDB] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [ProductsDB] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [ProductsDB] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [ProductsDB] SET  DISABLE_BROKER 
GO
ALTER DATABASE [ProductsDB] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [ProductsDB] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [ProductsDB] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [ProductsDB] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [ProductsDB] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [ProductsDB] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [ProductsDB] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [ProductsDB] SET RECOVERY SIMPLE 
GO
ALTER DATABASE [ProductsDB] SET  MULTI_USER 
GO
ALTER DATABASE [ProductsDB] SET PAGE_VERIFY TORN_PAGE_DETECTION  
GO
ALTER DATABASE [ProductsDB] SET DB_CHAINING OFF 
GO
ALTER DATABASE [ProductsDB] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [ProductsDB] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [ProductsDB] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [ProductsDB] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
ALTER DATABASE [ProductsDB] SET QUERY_STORE = ON
GO
ALTER DATABASE [ProductsDB] SET QUERY_STORE (OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE [ProductsDB]
GO
/****** Object:  User [admin]    Script Date: 17/2/2025 0:02:21 ******/
CREATE USER [admin] WITHOUT LOGIN WITH DEFAULT_SCHEMA=[dbo]
GO
/****** Object:  Table [dbo].[categorias]    Script Date: 17/2/2025 0:02:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[categorias](
	[id_categoria] [bigint] IDENTITY(1,1) NOT NULL,
	[created_at] [datetime2](6) NULL,
	[created_by] [uniqueidentifier] NULL,
	[updated_at] [datetime2](6) NULL,
	[updated_by] [uniqueidentifier] NULL,
	[nombre] [varchar](255) NOT NULL,
	[id_local] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_categoria] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[locales]    Script Date: 17/2/2025 0:02:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[locales](
	[id_local] [bigint] IDENTITY(1,1) NOT NULL,
	[created_at] [datetime2](6) NULL,
	[created_by] [uniqueidentifier] NULL,
	[updated_at] [datetime2](6) NULL,
	[updated_by] [uniqueidentifier] NULL,
	[ciudad] [varchar](255) NULL,
	[codigo] [varchar](255) NOT NULL,
	[direccion] [varchar](255) NULL,
	[nombre] [varchar](255) NOT NULL,
	[provincia] [varchar](255) NULL,
	[telefono] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_local] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[products]    Script Date: 17/2/2025 0:02:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[products](
	[id_producto] [bigint] IDENTITY(1,1) NOT NULL,
	[created_at] [datetime2](6) NULL,
	[created_by] [uniqueidentifier] NULL,
	[updated_at] [datetime2](6) NULL,
	[updated_by] [uniqueidentifier] NULL,
	[codigo_barra] [varchar](255) NOT NULL,
	[description] [varchar](255) NULL,
	[expiry_date] [datetime2](6) NULL,
	[image_url] [varchar](255) NULL,
	[nombre] [varchar](255) NOT NULL,
	[price] [numeric](38, 2) NULL,
	[stock] [int] NULL,
	[id_categoria] [bigint] NULL,
	[id_local] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_producto] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[transacciones]    Script Date: 17/2/2025 0:02:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[transacciones](
	[id_transaccion] [bigint] IDENTITY(1,1) NOT NULL,
	[created_at] [datetime2](6) NULL,
	[created_by] [uniqueidentifier] NULL,
	[updated_at] [datetime2](6) NULL,
	[updated_by] [uniqueidentifier] NULL,
	[description] [varchar](255) NULL,
	[status] [varchar](255) NULL,
	[tipo_transaccion] [varchar](255) NULL,
	[total_precio] [numeric](38, 2) NULL,
	[total_productos] [int] NULL,
	[id_local] [bigint] NULL,
	[id_producto] [bigint] NULL,
	[id_user] [bigint] NULL,
PRIMARY KEY CLUSTERED 
(
	[id_transaccion] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[users]    Script Date: 17/2/2025 0:02:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[users](
	[id_user] [bigint] IDENTITY(1,1) NOT NULL,
	[created_at] [datetime2](6) NULL,
	[created_by] [uniqueidentifier] NULL,
	[updated_at] [datetime2](6) NULL,
	[updated_by] [uniqueidentifier] NULL,
	[email] [varchar](255) NOT NULL,
	[nombre] [varchar](255) NOT NULL,
	[password] [varchar](255) NOT NULL,
	[phone_number] [varchar](255) NULL,
	[role] [varchar](255) NULL,
PRIMARY KEY CLUSTERED 
(
	[id_user] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[categorias] ON 

INSERT [dbo].[categorias] ([id_categoria], [created_at], [created_by], [updated_at], [updated_by], [nombre], [id_local]) VALUES (1, CAST(N'2025-02-16T10:16:28.5049120' AS DateTime2), NULL, CAST(N'2025-02-16T10:16:28.5049120' AS DateTime2), NULL, N'Frutas', 1)
SET IDENTITY_INSERT [dbo].[categorias] OFF
GO
SET IDENTITY_INSERT [dbo].[locales] ON 

INSERT [dbo].[locales] ([id_local], [created_at], [created_by], [updated_at], [updated_by], [ciudad], [codigo], [direccion], [nombre], [provincia], [telefono]) VALUES (1, CAST(N'2025-02-16T10:04:25.8460250' AS DateTime2), NULL, CAST(N'2025-02-16T10:04:25.8460250' AS DateTime2), NULL, N'GUAYAQUIL', N'MA', N'ESTEROS', N'MATRIZ', N'GUAYAS', N'0958702590')
SET IDENTITY_INSERT [dbo].[locales] OFF
GO
SET IDENTITY_INSERT [dbo].[products] ON 

INSERT [dbo].[products] ([id_producto], [created_at], [created_by], [updated_at], [updated_by], [codigo_barra], [description], [expiry_date], [image_url], [nombre], [price], [stock], [id_categoria], [id_local]) VALUES (1, CAST(N'2025-02-16T11:18:58.8863850' AS DateTime2), NULL, CAST(N'2025-02-16T11:18:58.8863850' AS DateTime2), NULL, N'978123456789712345', N'Manzana roja', NULL, NULL, N'Manzana', CAST(0.50 AS Numeric(38, 2)), 11, 1, 1)
SET IDENTITY_INSERT [dbo].[products] OFF
GO
SET IDENTITY_INSERT [dbo].[transacciones] ON 

INSERT [dbo].[transacciones] ([id_transaccion], [created_at], [created_by], [updated_at], [updated_by], [description], [status], [tipo_transaccion], [total_precio], [total_productos], [id_local], [id_producto], [id_user]) VALUES (1, CAST(N'2025-02-16T11:21:52.0664670' AS DateTime2), NULL, CAST(N'2025-02-16T11:21:52.0664670' AS DateTime2), NULL, N'Compra', N'COMPLETADO', N'COMPRA', CAST(5.00 AS Numeric(38, 2)), 10, 1, 1, 1)
INSERT [dbo].[transacciones] ([id_transaccion], [created_at], [created_by], [updated_at], [updated_by], [description], [status], [tipo_transaccion], [total_precio], [total_productos], [id_local], [id_producto], [id_user]) VALUES (2, CAST(N'2025-02-16T11:23:32.3507260' AS DateTime2), NULL, CAST(N'2025-02-16T11:23:32.3507260' AS DateTime2), NULL, N'Venta', N'COMPLETADO', N'VENTA', CAST(0.50 AS Numeric(38, 2)), 1, 1, 1, 1)
INSERT [dbo].[transacciones] ([id_transaccion], [created_at], [created_by], [updated_at], [updated_by], [description], [status], [tipo_transaccion], [total_precio], [total_productos], [id_local], [id_producto], [id_user]) VALUES (3, CAST(N'2025-02-16T21:32:24.7119910' AS DateTime2), NULL, CAST(N'2025-02-16T21:32:24.7119910' AS DateTime2), NULL, N'compra', N'COMPLETADO', N'COMPRA', CAST(0.50 AS Numeric(38, 2)), 1, 1, 1, 1)
SET IDENTITY_INSERT [dbo].[transacciones] OFF
GO
SET IDENTITY_INSERT [dbo].[users] ON 

INSERT [dbo].[users] ([id_user], [created_at], [created_by], [updated_at], [updated_by], [email], [nombre], [password], [phone_number], [role]) VALUES (1, CAST(N'2025-02-16T09:56:17.1333870' AS DateTime2), NULL, CAST(N'2025-02-16T09:56:17.1333870' AS DateTime2), NULL, N'mileore2011@hotmail.com', N'Milena Orellana', N'$2a$10$pAkFU.b13brV0tNabxn8deLTUgB0ggpYQuzZw4prDASr.gTk.ZRmS', N'0958702590', N'ADMIN')
SET IDENTITY_INSERT [dbo].[users] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UKqcog8b7hps1hioi9onqwjdt6y]    Script Date: 17/2/2025 0:02:21 ******/
ALTER TABLE [dbo].[categorias] ADD  CONSTRAINT [UKqcog8b7hps1hioi9onqwjdt6y] UNIQUE NONCLUSTERED 
(
	[nombre] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UK15oeyyk9c4x5sjttk6pk1h0se]    Script Date: 17/2/2025 0:02:21 ******/
ALTER TABLE [dbo].[products] ADD  CONSTRAINT [UK15oeyyk9c4x5sjttk6pk1h0se] UNIQUE NONCLUSTERED 
(
	[codigo_barra] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UK6dotkott2kjsp8vw4d0m25fb7]    Script Date: 17/2/2025 0:02:21 ******/
ALTER TABLE [dbo].[users] ADD  CONSTRAINT [UK6dotkott2kjsp8vw4d0m25fb7] UNIQUE NONCLUSTERED 
(
	[email] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[categorias]  WITH CHECK ADD  CONSTRAINT [FKpy4sl8gk461by4amdjva7ntkh] FOREIGN KEY([id_local])
REFERENCES [dbo].[locales] ([id_local])
GO
ALTER TABLE [dbo].[categorias] CHECK CONSTRAINT [FKpy4sl8gk461by4amdjva7ntkh]
GO
ALTER TABLE [dbo].[products]  WITH CHECK ADD  CONSTRAINT [FKed3cduim6swx1y0o5lqa300ln] FOREIGN KEY([id_local])
REFERENCES [dbo].[locales] ([id_local])
GO
ALTER TABLE [dbo].[products] CHECK CONSTRAINT [FKed3cduim6swx1y0o5lqa300ln]
GO
ALTER TABLE [dbo].[products]  WITH CHECK ADD  CONSTRAINT [FKo9196sa14age3y89lapd5ta1o] FOREIGN KEY([id_categoria])
REFERENCES [dbo].[categorias] ([id_categoria])
GO
ALTER TABLE [dbo].[products] CHECK CONSTRAINT [FKo9196sa14age3y89lapd5ta1o]
GO
ALTER TABLE [dbo].[transacciones]  WITH CHECK ADD  CONSTRAINT [FK88bugo3r3mfnr4spn9r89fp9b] FOREIGN KEY([id_user])
REFERENCES [dbo].[users] ([id_user])
GO
ALTER TABLE [dbo].[transacciones] CHECK CONSTRAINT [FK88bugo3r3mfnr4spn9r89fp9b]
GO
ALTER TABLE [dbo].[transacciones]  WITH CHECK ADD  CONSTRAINT [FKatt8w0dhnc5335stk6gqioq29] FOREIGN KEY([id_local])
REFERENCES [dbo].[locales] ([id_local])
GO
ALTER TABLE [dbo].[transacciones] CHECK CONSTRAINT [FKatt8w0dhnc5335stk6gqioq29]
GO
ALTER TABLE [dbo].[transacciones]  WITH CHECK ADD  CONSTRAINT [FKbselkllq3d5dcj0bu5jrqj6xr] FOREIGN KEY([id_producto])
REFERENCES [dbo].[products] ([id_producto])
GO
ALTER TABLE [dbo].[transacciones] CHECK CONSTRAINT [FKbselkllq3d5dcj0bu5jrqj6xr]
GO
ALTER TABLE [dbo].[products]  WITH CHECK ADD CHECK  (([stock]>=(0)))
GO
ALTER TABLE [dbo].[transacciones]  WITH CHECK ADD CHECK  (([status]='CANCELADO' OR [status]='COMPLETADO' OR [status]='PROCESANDO' OR [status]='PENDIENTE'))
GO
ALTER TABLE [dbo].[transacciones]  WITH CHECK ADD CHECK  (([tipo_transaccion]='DEVOLUCIONES' OR [tipo_transaccion]='VENTA' OR [tipo_transaccion]='COMPRA'))
GO
ALTER TABLE [dbo].[users]  WITH CHECK ADD CHECK  (([role]='VENDEDOR' OR [role]='ADMIN'))
GO
USE [master]
GO
ALTER DATABASE [ProductsDB] SET  READ_WRITE 
GO
