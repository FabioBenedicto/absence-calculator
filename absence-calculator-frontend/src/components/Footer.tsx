import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 text-left">
            <h3 className="text-lg font-bold text-primary mb-4">MeuLimite</h3>
            <p className="text-muted-foreground mb-4">
              O calculador de faltas inteligente para estudantes garantirem a frequência acadêmica mínima de forma simples e eficiente.
            </p>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 MeuLimite. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-1 text-muted-foreground text-sm mt-4 md:mt-0">
            Feito com <Heart className="h-4 w-4 text-red-500" /> para Sophia de Souza
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;