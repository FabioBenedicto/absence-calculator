import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { Calendar, Upload, Plus, Trash2, FileImage, Sparkles } from "lucide-react";

interface Holiday {
  id: string;
  name: string;
  date: string;
  month: number;
  type: "nacional" | "regional" | "escolar";
}

const mockHolidays: Holiday[] = [
  { id: "1", name: "Ano Novo", date: "2024-01-01", month: 1, type: "nacional" },
  { id: "2", name: "Carnaval", date: "2024-02-12", month: 2, type: "nacional" },
  { id: "3", name: "Páscoa", date: "2024-03-31", month: 3, type: "nacional" },
  { id: "4", name: "Tiradentes", date: "2024-04-21", month: 4, type: "nacional" },
  { id: "5", name: "Dia do Trabalhador", date: "2024-05-01", month: 5, type: "nacional" },
  { id: "6", name: "Festa Junina", date: "2024-06-24", month: 6, type: "escolar" },
  { id: "7", name: "Independência", date: "2024-09-07", month: 9, type: "nacional" },
  { id: "8", name: "Nossa Senhora Aparecida", date: "2024-10-12", month: 10, type: "nacional" },
  { id: "9", name: "Finados", date: "2024-11-02", month: 11, type: "nacional" },
  { id: "10", name: "Proclamação da República", date: "2024-11-15", month: 11, type: "nacional" },
  { id: "11", name: "Natal", date: "2024-12-25", month: 12, type: "nacional" },
];

const months = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export default function Feriados() {
  const [holidays, setHolidays] = useState<Holiday[]>(mockHolidays);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [newHoliday, setNewHoliday] = useState<{ name: string; date: string; type: Holiday['type'] }>({ name: "", date: "", type: "escolar" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const { toast } = useToast();

  const filteredHolidays = holidays.filter(holiday => holiday.month === selectedMonth);

  const handleAddHoliday = () => {
    if (!newHoliday.name || !newHoliday.date) {
      toast({
        title: "Erro",
        description: "Preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    const holiday: Holiday = {
      id: Date.now().toString(),
      name: newHoliday.name,
      date: newHoliday.date,
      month: new Date(newHoliday.date).getMonth() + 1,
      type: newHoliday.type,
    };

    setHolidays([...holidays, holiday]);
    setNewHoliday({ name: "", date: "", type: "escolar" });
    setIsDialogOpen(false);
    
    toast({
      title: "Feriado adicionado!",
      description: `${holiday.name} foi adicionado com sucesso.`,
    });
  };

  const handleDeleteHoliday = (id: string) => {
    setHolidays(holidays.filter(h => h.id !== id));
    toast({
      title: "Feriado removido",
      description: "O feriado foi removido com sucesso.",
    });
  };

  const handleExtractFromDocument = () => {
    setIsExtracting(true);
    
    // Simular extração com IA
    setTimeout(() => {
      const extractedHolidays: Holiday[] = [
        {
          id: Date.now().toString(),
          name: "Feriado Extraído 1",
          date: "2024-08-15",
          month: 8,
          type: "escolar"
        },
        {
          id: (Date.now() + 1).toString(), 
          name: "Feriado Extraído 2",
          date: "2024-08-30",
          month: 8,
          type: "escolar"
        }
      ];

      setHolidays([...holidays, ...extractedHolidays]);
      setIsExtracting(false);
      
      toast({
        title: "Extração concluída!",
        description: `${extractedHolidays.length} feriados foram extraídos e adicionados.`,
      });
    }, 3000);
  };

  const getTypeColor = (type: Holiday['type']) => {
    switch (type) {
      case "nacional": return "bg-destructive/20 text-destructive border-destructive/30";
      case "regional": return "bg-primary/20 text-primary border-primary/30";
      case "escolar": return "bg-secondary/20 text-secondary-foreground border-secondary/30";
      default: return "bg-muted/20 text-muted-foreground border-muted/30";
    }
  };

  const getTypeLabel = (type: Holiday['type']) => {
    switch (type) {
      case "nacional": return "Nacional";
      case "regional": return "Regional";
      case "escolar": return "Escolar";
      default: return "Outro";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Feriados</h1>
              <p className="text-muted-foreground">Gerencie os feriados do calendário acadêmico</p>
            </div>
            
            <div className="flex gap-2">
              <Button onClick={() => document.getElementById('file-upload')?.click()} variant="secondary">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
              <input 
                id="file-upload" 
                type="file" 
                accept="image/*,.pdf" 
                className="hidden"
                onChange={handleExtractFromDocument}
              />
              
              <Button onClick={handleExtractFromDocument} disabled={isExtracting}>
                <Sparkles className="h-4 w-4 mr-2" />
                {isExtracting ? "Extraindo..." : "Extrair com IA"}
              </Button>

              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Adicionar Novo Feriado</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Nome do feriado</Label>
                      <Input
                        id="name"
                        value={newHoliday.name}
                        onChange={(e) => setNewHoliday({...newHoliday, name: e.target.value})}
                        placeholder="Ex: Dia do Professor"
                      />
                    </div>
                    <div>
                      <Label htmlFor="date">Data</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newHoliday.date}
                        onChange={(e) => setNewHoliday({...newHoliday, date: e.target.value})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="type">Tipo</Label>
                      <select
                        id="type"
                        value={newHoliday.type}
                        onChange={(e) => setNewHoliday({...newHoliday, type: e.target.value as "nacional" | "regional" | "escolar"})}
                        className="w-full p-2 border rounded-md"
                      >
                        <option value="escolar">Escolar</option>
                        <option value="regional">Regional</option>
                        <option value="nacional">Nacional</option>
                      </select>
                    </div>
                    <Button onClick={handleAddHoliday} className="w-full">
                      Adicionar Feriado
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <Tabs value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
          <TabsList className="grid grid-cols-6 lg:grid-cols-12 w-full mb-6">
            {months.map((month, index) => (
              <TabsTrigger 
                key={index} 
                value={(index + 1).toString()}
                className="text-xs sm:text-sm"
              >
                {month.slice(0, 3)}
              </TabsTrigger>
            ))}
          </TabsList>

          {months.map((month, index) => (
            <TabsContent key={index} value={(index + 1).toString()}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Feriados de {month}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredHolidays.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <FileImage className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhum feriado cadastrado para este mês</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredHolidays.map((holiday) => (
                        <div 
                          key={holiday.id}
                          className="group flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-sm text-muted-foreground">
                              {new Date(holiday.date).toLocaleDateString('pt-BR')}
                            </div>
                            <div className="font-medium">{holiday.name}</div>
                            <Badge className={getTypeColor(holiday.type)}>
                              {getTypeLabel(holiday.type)}
                            </Badge>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteHoliday(holiday.id)}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  );
}