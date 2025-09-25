"use client";
import React, { useState } from "react";
import { Eye, EyeOff, Palette, Mail, Lock } from "lucide-react";

// Simulando los componentes de shadcn/ui
const Button = ({
  children,
  type = "button",
  disabled = false,
  className = "",
  onClick,
  ...props
}) => (
  <button
    type={type}
    disabled={disabled}
    onClick={onClick}
    className={`w-full bg-amber-600 hover:bg-amber-700 disabled:bg-amber-300 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200 ${className}`}
    {...props}
  >
    {children}
  </button>
);

const Input = ({ className = "", error, value, onChange, ...props }) => (
  <input
    value={value}
    onChange={onChange}
    className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-200 ${
      error ? "border-red-500" : "border-gray-300"
    } ${className}`}
    {...props}
  />
);

const Label = ({ children, className = "", ...props }) => (
  <label
    className={`block text-sm font-medium text-gray-700 mb-1 ${className}`}
    {...props}
  >
    {children}
  </label>
);

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-lg ${className}`}>{children}</div>
);

const CardHeader = ({ children }) => (
  <div className="px-6 py-6 border-b border-gray-200">{children}</div>
);

const CardContent = ({ children }) => (
  <div className="px-6 py-6">{children}</div>
);

// Funciones de validación personalizadas
const validateEmail = (email) => {
  if (!email) return "El email es requerido";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return "Debe ser un email válido";
  return "";
};

const validatePassword = (password) => {
  if (!password) return "La contraseña es requerida";
  if (password.length < 6)
    return "La contraseña debe tener al menos 6 caracteres";
  if (password.length > 50)
    return "La contraseña no puede exceder 50 caracteres";
  return "";
};

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleInputChange = (field) => (e) => {
    const value = e.target.value;
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Limpiar error cuando el usuario empiece a escribir
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };

    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Simulación de llamada a API
      await new Promise((resolve) => setTimeout(resolve, 2000));

      console.log("Datos de login:", {
        email: formData.email,
        password: formData.password,
        rememberMe,
      });

      alert(`¡Bienvenido a Artesanía Conecta!\nEmail: ${formData.email}`);

      // Aquí iría la lógica real de autenticación
      // router.push('/dashboard');
    } catch (error) {
      console.error("Error en el login:", error);
      alert("Error al iniciar sesión. Por favor, inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
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

      <Card className="w-full max-w-md relative z-10">
        <CardHeader>
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
        </CardHeader>

        <CardContent>
          <div className="space-y-6">
            {/* Campo Email */}
            <div className="space-y-2">
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
                value={formData.email}
                onChange={handleInputChange("email")}
                onKeyPress={handleKeyPress}
                error={errors.email}
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center animate-fade-in">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  {errors.email}
                </p>
              )}
            </div>

            {/* Campo Contraseña */}
            <div className="space-y-2">
              <Label htmlFor="password">
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4 text-amber-600" />
                  <span>Contraseña</span>
                </div>
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange("password")}
                  onKeyPress={handleKeyPress}
                  error={errors.password}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  tabIndex="-1"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1 flex items-center animate-fade-in">
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                  {errors.password}
                </p>
              )}
            </div>

            {/* Opciones adicionales */}
            <div className="flex items-center justify-between">
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
            </div>

            {/* Botón de envío */}
            <Button
              type="button"
              disabled={isLoading}
              className="relative"
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
            </Button>

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
        </CardContent>
      </Card>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LoginForm;
