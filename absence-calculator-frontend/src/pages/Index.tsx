import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Link } from "react-router-dom";
import { Calendar, Clock, BookOpen, Settings, ArrowRight } from "lucide-react";
// import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const features = [
    {
      icon: Calendar,
      title: "Gestão de Faltas",
      description: "Agende e controle suas faltas de forma inteligente",
      href: "/faltas"
    },
    {
      icon: Clock,
      title: "Feriados",
      description: "Gerencie feriados com extração automática por IA",
      href: "/feriados"
    },
    {
      icon: BookOpen,
      title: "Grade de Aulas",
      description: "Organize sua grade horária semanal",
      href: "/aulas"
    },
    {
      icon: Settings,
      title: "Configurações",
      description: "Configure presença mínima e período letivo",
      href: "/configuracoes"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          {/* <img 
            src={heroImage} 
            alt="FrequênciaFácil" 
            className="w-full h-full object-cover opacity-10"
          /> */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent mb-6">
              FrequênciaFácil
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              O calculador de faltas mais inteligente para estudantes. 
              Gerencie sua frequência acadêmica de forma simples e eficiente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8">
                <Link to="/registro">
                  Começar Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8">
                <Link to="/login">Fazer Login</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Funcionalidades</h2>
            <p className="text-lg text-muted-foreground">
              Tudo que você precisa para gerenciar sua frequência acadêmica
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow group">
                <CardContent className="p-6 text-center">
                  <feature.icon className="h-12 w-12 text-primary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground mb-4">{feature.description}</p>
                  <Button asChild variant="outline" className="w-full">
                    <Link to={feature.href}>Acessar</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
