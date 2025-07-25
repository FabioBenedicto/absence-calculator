import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays, Clock, Plus, RotateCcw } from "lucide-react";

const subjects = [
  "Matemática",
  "Português", 
  "História",
  "Geografia",
  "Ciências",
  "Inglês",
  "Educação Física",
  "Artes"
];

const recurrenceOptions = [
  { value: "none", label: "Sem recorrência" },
  { value: "daily", label: "Diário" },
  { value: "weekly", label: "Semanal" },
  { value: "monthly", label: "Mensal" }
];

export default function Faltas() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [recurrence, setRecurrence] = useState("none");
  const [viewMode, setViewMode] = useState<"day" | "week" | "month" | "year">("month");
  const { toast } = useToast();

  const today = new Date();
  const currentWeek = getWeekDates(today);
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  function getWeekDates(date: Date) {
    const week = [];
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    
    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      week.push(day);
    }
    return week;
  }

  const handleDateSelect = (dates: Date[] | undefined) => {
    if (dates) {
      setSelectedDates(dates);
    }
  };

  const handleSubjectToggle = (subject: string) => {
    setSelectedSubjects(prev => 
      prev.includes(subject) 
        ? prev.filter(s => s !== subject)
        : [...prev, subject]
    );
  };

  const handleScheduleAbsence = () => {
    if (selectedDates.length === 0) {
      toast({
        title: "Erro",
        description: "Selecione pelo menos uma data.",
        variant: "destructive",
      });
      return;
    }

    if (selectedDates.length === 1 && selectedSubjects.length === 0) {
      toast({
        title: "Erro", 
        description: "Para um dia específico, selecione as matérias.",
        variant: "destructive",
      });
      return;
    }

    const message = selectedDates.length === 1 
      ? `Falta agendada para ${selectedDates[0].toLocaleDateString()} nas matérias: ${selectedSubjects.join(", ")}`
      : `Faltas agendadas para ${selectedDates.length} dias (todas as aulas do dia)`;

    toast({
      title: "Falta agendada com sucesso!",
      description: message,
    });

    // Reset form
    setSelectedDates([]);
    setSelectedSubjects([]);
    setRecurrence("none");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Agendamento de Faltas</h1>
          <p className="text-muted-foreground">Gerencie suas faltas de forma inteligente</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendário */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <CalendarDays className="h-5 w-5" />
                  Selecionar Datas
                </CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "day" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("day")}
                  >
                    Hoje
                  </Button>
                  <Button
                    variant={viewMode === "week" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("week")}
                  >
                    Semana
                  </Button>
                  <Button
                    variant={viewMode === "month" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("month")}
                  >
                    Mês
                  </Button>
                  <Button
                    variant={viewMode === "year" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("year")}
                  >
                    Ano
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {viewMode === "day" && (
                <div className="text-center p-8">
                  <div className="text-4xl font-bold text-primary mb-2">
                    {today.getDate()}
                  </div>
                  <div className="text-lg text-muted-foreground mb-4">
                    {today.toLocaleDateString('pt-BR', { 
                      weekday: 'long', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </div>
                  <Button 
                    onClick={() => setSelectedDates([today])}
                    className="w-full"
                  >
                    Selecionar Hoje
                  </Button>
                </div>
              )}

              {viewMode === "week" && (
                <div className="grid grid-cols-7 gap-2">
                  {currentWeek.map((date, index) => (
                    <div key={index} className="text-center">
                      <div className="text-sm text-muted-foreground mb-1">
                        {date.toLocaleDateString('pt-BR', { weekday: 'short' })}
                      </div>
                      <Button
                        variant={selectedDates.some(d => d.toDateString() === date.toDateString()) ? "default" : "outline"}
                        className="w-full"
                        onClick={() => {
                          const isSelected = selectedDates.some(d => d.toDateString() === date.toDateString());
                          if (isSelected) {
                            setSelectedDates(prev => prev.filter(d => d.toDateString() !== date.toDateString()));
                          } else {
                            setSelectedDates(prev => [...prev, date]);
                          }
                        }}
                      >
                        {date.getDate()}
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              {(viewMode === "month" || viewMode === "year") && (
                <Calendar
                  mode="multiple"
                  selected={selectedDates}
                  onSelect={handleDateSelect}
                  className="rounded-md border"
                />
              )}

              {selectedDates.length > 0 && (
                <div className="mt-4 p-4 bg-muted rounded-lg">
                  <h4 className="font-medium mb-2">Datas selecionadas:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedDates.map((date, index) => (
                      <Badge key={index} variant="secondary">
                        {date.toLocaleDateString('pt-BR')}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Configurações */}
          <div className="space-y-6">
            {/* Seleção de Matérias */}
            {selectedDates.length === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Matérias
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {subjects.map((subject) => (
                    <div key={subject} className="flex items-center space-x-2">
                      <Checkbox
                        id={subject}
                        checked={selectedSubjects.includes(subject)}
                        onCheckedChange={() => handleSubjectToggle(subject)}
                      />
                      <label
                        htmlFor={subject}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {subject}
                      </label>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Recorrência */}
            {selectedDates.length === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <RotateCcw className="h-5 w-5" />
                    Recorrência
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={recurrence} onValueChange={setRecurrence}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar recorrência" />
                    </SelectTrigger>
                    <SelectContent>
                      {recurrenceOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>
            )}

            {/* Resumo e Ação */}
            <Card>
              <CardHeader>
                <CardTitle>Resumo</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm text-muted-foreground">
                  {selectedDates.length === 0 && "Nenhuma data selecionada"}
                  {selectedDates.length === 1 && "Falta para um dia específico"}
                  {selectedDates.length > 1 && `Faltas para ${selectedDates.length} dias (todas as aulas)`}
                </div>

                <Button 
                  onClick={handleScheduleAbsence}
                  className="w-full"
                  disabled={selectedDates.length === 0}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Agendar Falta
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}