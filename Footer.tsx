import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-100 mt-16">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold">D</span>
              </div>
              DATAPOLIS
            </h3>
            <p className="text-gray-400 text-sm">
              Plataforma integral de gestión de activos inmobiliarios con análisis precesional avanzado.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-bold mb-4">Producto</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/modules" className="hover:text-white transition-colors">Módulos</a></li>
              <li><a href="/architecture" className="hover:text-white transition-colors">Arquitectura</a></li>
              <li><a href="/pae" className="hover:text-white transition-colors">PAE M11</a></li>
              <li><a href="/api" className="hover:text-white transition-colors">API</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4">Recursos</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="/installation" className="hover:text-white transition-colors">Instalación</a></li>
              <li><a href="/analysis" className="hover:text-white transition-colors">Análisis</a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1">
                Documentación <ExternalLink size={12} />
              </a></li>
              <li><a href="#" className="hover:text-white transition-colors flex items-center gap-1">
                Blog <ExternalLink size={12} />
              </a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:info@datapolis.io" className="hover:text-white transition-colors">
                  info@datapolis.io
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Github size={16} />
                <a href="#" className="hover:text-white transition-colors">GitHub</a>
              </li>
              <li className="flex items-center gap-2">
                <Linkedin size={16} />
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Bottom Footer */}
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <p>
            © {currentYear} DATAPOLIS. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">Privacidad</a>
            <a href="#" className="hover:text-white transition-colors">Términos</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>

        {/* Version Info */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>DATAPOLIS v3.0 | Última actualización: Febrero 2026</p>
        </div>
      </div>
    </footer>
  );
}
