import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { 
  Calendar, 
  Menu, 
  UserX, 
  CalendarX, 
  Clock, 
  Settings,
  LogIn,
  LogOut
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navigation = [
    { name: "Faltas", href: "/faltas", icon: UserX },
    { name: "Feriados", href: "/feriados", icon: CalendarX },
    { name: "Aulas", href: "/aulas", icon: Clock },
    { name: "Configurações", href: "/configuracoes", icon: Settings },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
    setIsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <Calendar className="h-8 w-8 text-primary" />
            <span className="text-xl font-bold text-primary">
              MeuLimite
            </span>
          </Link>

          {/* Desktop Navigation */}
          {user && (
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      isActive
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          )}

          {/* Desktop Auth Buttons */}
          {user && (
          <div className="hidden md:flex items-center space-x-2">
              <div className="flex items-center space-x-4">
                <span className="text-sm text-muted-foreground">
                  Olá, {user.name}
                </span>
                <Button variant="outline" onClick={handleLogout} className="flex items-center space-x-2">
                  <LogOut className="h-4 w-4" />
                  <span>Sair</span>
                </Button>
              </div>
          </div>
          )}

          {/* Mobile menu trigger */}
          {
            user && (
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            
            <SheetContent side="top" className="h-full p-0">
              <div className="flex flex-col h-full">
                {/* Header do menu mobile */}
                <div className="p-6 border-b border-border">
                  <Link 
                    to="/" 
                    className="flex items-center space-x-2"
                    onClick={() => setIsOpen(false)}
                  >
                    <Calendar className="h-6 w-6 text-primary" />
                    <span className="text-lg font-bold text-primary">
                      MeuLimite
                    </span>
                  </Link>
                </div>

                {/* User info mobile */}
                {user && (
                  <div className="p-6 border-b border-border">
                    Olá, <span className="font-medium">{user.name}</span>
                  </div>
                )}

                {/* Navegação mobile */}
                  <nav className="flex-1 p-6">
                    <div className="space-y-2">
                      {navigation.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.href;
                        return (
                          <Link
                            key={item.name}
                            to={item.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center space-x-3 px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                              isActive
                                ? "text-primary bg-primary/10 border border-primary/20"
                                : "text-muted-foreground hover:text-primary hover:bg-primary/5"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                            <span>{item.name}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </nav>

                {/* Botões de auth mobile */}
                <div className="p-6 border-t border-border">
                    <Button 
                      variant="outline" 
                      className="w-full" 
                      size="lg"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
            )
          }
        </div>
      </div>
    </header>
  );
};

export default Header;