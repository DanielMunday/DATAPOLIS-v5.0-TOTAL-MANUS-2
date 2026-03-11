import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useSearch } from '@/contexts/SearchContext';
import { useLocation } from 'wouter';

export default function SearchBar() {
  const { query, setQuery, results, isOpen, setIsOpen } = useSearch();
  const [, navigate] = useLocation();
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(!isOpen);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  const handleResultClick = (href: string) => {
    navigate(href);
    setIsOpen(false);
    setQuery('');
  };

  return (
    <>
      {/* Search Button in Navigation */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors text-gray-600 text-sm"
      >
        <Search size={16} />
        <span>Buscar...</span>
        <kbd className="text-xs text-gray-500 ml-auto">⌘K</kbd>
      </button>

      {/* Search Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center pt-20">
          <div className="w-full max-w-2xl mx-4">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden">
              {/* Search Input */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
                <Search size={20} className="text-gray-400" />
                <input
                  autoFocus
                  type="text"
                  placeholder="Buscar módulos, arquitectura, PAE, instalación..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  className="flex-1 outline-none text-lg"
                />
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setQuery('');
                  }}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              {/* Results */}
              <div className="max-h-96 overflow-y-auto">
                {query.trim() === '' ? (
                  <div className="px-4 py-8 text-center text-gray-500">
                    <p className="text-sm">Escribe para buscar en DATAPOLIS</p>
                    <p className="text-xs mt-2">Puedes buscar módulos, componentes, temas técnicos...</p>
                  </div>
                ) : results.length === 0 ? (
                  <div className="px-4 py-8 text-center text-gray-500">
                    <p className="text-sm">No se encontraron resultados para "{query}"</p>
                  </div>
                ) : (
                  <div className="divide-y">
                    {results.map((result) => (
                      <button
                        key={result.id}
                        onClick={() => handleResultClick(result.href)}
                        className="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{result.title}</h4>
                            <p className="text-sm text-gray-600 mt-1">{result.description}</p>
                          </div>
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded ml-3 flex-shrink-0">
                            {result.category}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
                <span>Presiona ESC para cerrar</span>
                <span>↵ para seleccionar</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
