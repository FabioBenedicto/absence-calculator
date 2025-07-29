import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Header from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { CalendarDays, Clock, Plus, RotateCcw, X } from "lucide-react";
import { Input } from "@/components/ui/input";

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

interface Class {
  id: string;
  subject: string;
  startTime: string;
  endTime: string;
  dayOfWeek: number;
  room?: string;
  professor?: string;
}

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
  

  const mockClasses: Class[] = [
  { id: "1", subject: "Matemática", startTime: "08:00", endTime: "09:40", dayOfWeek: 1, room: "A101", professor: "Prof. Silva" },
  { id: "2", subject: "Português", startTime: "09:50", endTime: "11:30", dayOfWeek: 1, room: "B205", professor: "Prof. Santos" },
  { id: "3", subject: "História", startTime: "13:30", endTime: "15:10", dayOfWeek: 1, room: "C301" },
  { id: "4", subject: "Inglês", startTime: "08:00", endTime: "09:40", dayOfWeek: 2, room: "A102", professor: "Prof. Johnson" },
  { id: "5", subject: "Ciências", startTime: "09:50", endTime: "11:30", dayOfWeek: 2, room: "Lab1", professor: "Prof. Costa" },
  { id: "6", subject: "Geografia", startTime: "08:00", endTime: "09:40", dayOfWeek: 3, room: "B201" },
  { id: "7", subject: "Educação Física", startTime: "09:50", endTime: "11:30", dayOfWeek: 3, room: "Quadra", professor: "Prof. Lima" },
  { id: "8", subject: "Artes", startTime: "13:30", endTime: "15:10", dayOfWeek: 3, room: "Ateliê" },
  { id: "9", subject: "Matemática", startTime: "08:00", endTime: "09:40", dayOfWeek: 4, room: "A101", professor: "Prof. Silva" },
  { id: "10", subject: "Português", startTime: "09:50", endTime: "11:30", dayOfWeek: 4, room: "B205", professor: "Prof. Santos" },
  { id: "11", subject: "História", startTime: "08:00", endTime: "09:40", dayOfWeek: 5, room: "C301" },
  { id: "12", subject: "Inglês", startTime: "09:50", endTime: "11:30", dayOfWeek: 5, room: "A102", professor: "Prof. Johnson" },
];


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

  const formatTime = (time: string) => {
    return time.substring(0, 5);
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
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Datas selecionadas:</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedDates([])}
                      className="h-8 px-2"
                    >
                      <X className="h-4 w-4 mr-1" />
                      Limpar todas
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedDates.map((date, index) => (
                      <Badge key={index}>
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
                  {mockClasses.map((classItem) => (
                    <div key={classItem.id} className="flex items-center space-x-2">

                        <div className="flex flex-col w-full">
                          <div className="flex items-center space-x-2">
                                                                          <Checkbox
                          id={classItem.id}
                          checked={selectedSubjects.includes(classItem.id)}
                          onCheckedChange={() => handleSubjectToggle(classItem.id)}
                        />
                      <div className="flex items-center space-x-2 justify-between items-center border rounded p-2 w-full">
                         <div className="flex items-center gap-4">
                            <div className="flex flex-col items-center text-sm text-muted-foreground min-w-[60px]">
                              <span className="font-medium">{formatTime(classItem.startTime)}</span>
                              <span className="font-medium">{formatTime(classItem.endTime)}</span>
                            </div>
                            
                            <div className="border-l h-12 mx-2"></div>
                            
                            <div className="flex-1">
                              <div className="font-semibold text-lg text-left">{classItem.subject}</div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                                {classItem.room && (
                                  <Badge variant="outline" className="text-xs">
                                    📍 {classItem.room}
                                  </Badge>
                                )}
                                {classItem.professor && (
                                  <Badge variant="outline" className="text-xs">
                                    👨‍🏫 {classItem.professor}
                                  </Badge>
                                )}
                              </div>
                            </div>
                          </div>
                      </div>
                      </div>
                       <div className="ml-6 text-left">
                          <label htmlFor="hours">Horas faltas</label>
                          <Input
                            id="hours"
                            type="time"
                            placeholder="seu@email.com"
                            // value={email}
                            // onChange={(e) => setEmail(e.target.value)}
                          />
                      </div>
                      </div>
                     
                      
                    </div>
                  ))}
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
    </div >
  );
}