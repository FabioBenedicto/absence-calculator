import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, UserCheck, UserPlus } from "lucide-react";

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/95 to-primary/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-accent/20 shadow-elegant">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center">
            <Lock className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold text-foreground">
            Acesso Restrito
          </CardTitle>
          <p className="text-muted-foreground">
            Esta página requer autenticação. Faça login ou crie uma conta para continuar.
          </p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Button asChild className="w-full" size="lg">
            <Link to="/login" className="flex items-center gap-2">
              <UserCheck className="h-4 w-4" />
              Fazer Login
            </Link>
          </Button>
          
          <Button asChild variant="outline" className="w-full" size="lg">
            <Link to="/register" className="flex items-center gap-2">
              <UserPlus className="h-4 w-4" />
              Criar Conta
            </Link>
          </Button>
          
          <div className="text-center pt-4">
            <Link 
              to="/" 
              className="text-sm text-muted-foreground hover:text-primary transition-colors underline-offset-4 hover:underline"
            >
              Voltar ao início
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Unauthorized;