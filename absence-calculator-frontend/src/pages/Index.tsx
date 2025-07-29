import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Calendar, Clock, BookOpen, Settings } from "lucide-react";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const Index = () => {
  const steps = [
    {
      icon: Settings,
      title: "Configurações",
      description: "Configure a frequência acadêmica mínima e o período letivo",
      href: "/configuracoes"
    },
     {
      icon: BookOpen,
      title: "Aulas",
      description: "Adicione as aulas da semana com IA",
      href: "/aulas"
    },
    {
      icon: Clock,
      title: "Feriados",
      description: "Adicione os feriados do período letivo com IA",
      href: "/feriados"
    },
    {
      icon: Calendar,
      title: "Falte",
      description: "Agende suas faltas sem exceder o seu limite",
      href: "/faltas"
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-pastel-red mb-6">
              MeuLimite
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Um calculador de faltas inteligente para estudantes garantirem a 
              frequência acadêmica mínima de forma simples e eficiente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/registro">
                  Criar conta
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/login">Entrar</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Como Funciona?</h2>
            <p className="text-lg text-muted-foreground">
              Tudo que você precisa para garantir a frequência acadêmica mínima
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow group">
                <CardContent className="p-6 text-center">
                  <step.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground mb-4">{step.description}</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={step.href}>Acessar</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
