"use client";
import React, { useState } from "react";
import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import { FormLogin } from "@/components/login/FormLogin";

export default function LoginForm() {
  // const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async () => {
    console.log("Submitting form with data:");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
      {/* Fondo decorativo */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-40 left-40 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="bg-white rounded-lg shadow-lg w-full max-w-md relative z-10">
        <div className="px-6 py-6 border-b border-gray-200">
          <div className="flex flex-col items-center space-y-4">
            {/* Logo */}
            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
              <Palette className="w-8 h-8 text-white" />
            </div>

            {/* Título */}
            <div className="text-center">
              <h1 className="text-2xl font-bold text-gray-900">
                Artesanía Conecta
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                Conectando tradición y creatividad
              </p>
            </div>
          </div>
        </div>

        <div className="px-6 py-6">
          <div className="space-y-6">
            {/* Campo Email */}
            <FormLogin></FormLogin>
            {/* <div className="space-y-2">
              <Label htmlFor="email">
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-amber-600" />
                  <span>Correo Electrónico</span>
                </div>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="artesano@ejemplo.com"
              />
            </div> */}

            {/* Campo Contraseña */}
            {/* <div className="">
              <Label htmlFor="password">
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-amber-600" />
                  <span>Contraseña</span>
                </div>
              </Label>
              <div className="relative">
                <Input id="password" type="password" placeholder="••••••••" />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  // tabIndex="-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div> */}

            {/* Opciones adicionales */}
            {/* <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-amber-600 border-gray-300 rounded focus:ring-amber-500 focus:ring-2"
                />
                <span className="text-sm text-gray-600">Recordarme</span>
              </label>

              <button
                type="button"
                className="text-sm text-amber-600 hover:text-amber-700 hover:underline transition-colors"
                onClick={() =>
                  alert(
                    "Funcionalidad de recuperación de contraseña próximamente"
                  )
                }
              >
                ¿Olvidaste tu contraseña?
              </button>
            </div> */}

            {/* Botón de envío
            <Button
              // type="button"
              disabled={isLoading}
              // className="relative"
              className="w-full bg-amber-600 hover:bg-amber-700 cursor-pointer"
              onClick={handleSubmit}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Iniciando sesión...</span>
                </div>
              ) : (
                "Iniciar Sesión"
              )}
            </Button> */}

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  ¿No tienes cuenta?
                </span>
              </div>
            </div>

            {/* Enlace de registro */}
            <div className="text-center">
              <button
                type="button"
                className="text-amber-600 hover:text-amber-700 font-medium hover:underline transition-colors"
                onClick={() => alert("Funcionalidad de registro próximamente")}
              >
                Únete a nuestra comunidad de artesanos
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default LoginForm;
