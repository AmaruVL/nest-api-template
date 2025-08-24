-- CreateTable
CREATE TABLE "public"."Usuario" (
    "idUsuario" SERIAL NOT NULL,
    "estado" CHAR(1) NOT NULL DEFAULT 'A',
    "fechaCreacion" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("idUsuario")
);
