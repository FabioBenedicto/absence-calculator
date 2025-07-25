import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Header } from "@/components/Header";
import { useToast } from "@/hooks/use-toast";
import { BookOpen, Upload, Plus, Trash2, Clock, Sparkles } from "lucide-react"; 

interface Class {
  id: string;
  subject: string;
  startTime: string; 
  endTime: string;
  dayOfWeek: number;
  room?: string;
  professor?: string;
}

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

const daysOfWeek = [
  { value: 1, label: "Segunda-feira", short: "SEG" },
  { value: 2, label: "Terça-feira", short: "TER" },
  { value: 3, label: "Quarta-feira", short: "QUA" },
  { value: 4, label: "Quinta-feira", short: "QUI" },
  { value: 5, label: "Sexta-feira", short: "SEX" },
  { value: 6, label: "Sábado", short: "SAB" },
  { value: 0, label: "Domingo", short: "DOM" },
];

export default function Aulas() {
  const [classes, setClasses] = useState<Class[]>(mockClasses);
  const [selectedDay, setSelectedDay] = useState(1);
  const [newClass, setNewClass] = useState<Omit<Class, 'id'>>({
    subject: "",
    startTime: "",
    endTime: "",
    dayOfWeek: 1,
    room: "",
    professor: ""
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const { toast } = useToast();

  const filteredClasses = classes
    .filter(cls => cls.dayOfWeek === selectedDay)
    .sort((a, b) => a.startTime.localeCompare(b.startTime));

  const handleAddClass = () => {
    if (!newClass.subject || !newClass.startTime || !newClass.endTime) {
      toast({
        title: "Erro",
        description: "Preencha os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    const classData: Class = {
      id: Date.now().toString(),
      ...newClass,
    };

    setClasses([...classes, classData]);
    setNewClass({
      subject: "",
      startTime: "",
      endTime: "",
      dayOfWeek: selectedDay,
      room: "",
      professor: ""
    });
    setIsDialogOpen(false);
    
    toast({
      title: "Aula adicionada!",
      description: `${classData.subject} foi adicionada com sucesso.`,
    });
  };

  const handleDeleteClass = (id: string) => {
    setClasses(classes.filter(c => c.id !== id));
    toast({
      title: "Aula removida",
      description: "A aula foi removida com sucesso.",
    });
  };

  const handleExtractFromDocument = () => {
    setIsExtracting(true);
    
    // Simular extração com IA
    setTimeout(() => {
      const extractedClasses: Class[] = [
        {
          id: Date.now().toString(),
          subject: "Aula Extraída 1",
          startTime: "14:00",
          endTime: "15:40",
          dayOfWeek: selectedDay,
          room: "Sala X",
          professor: "Prof. IA"
        },
        {
          id: (Date.now() + 1).toString(),
          subject: "Aula Extraída 2", 
          startTime: "15:50",
          endTime: "17:30",
          dayOfWeek: selectedDay,
          room: "Sala Y",
          professor: "Prof. Auto"
        }
      ];

      setClasses([...classes, ...extractedClasses]);
      setIsExtracting(false);
      
      toast({
        title: "Extração concluída!",
        description: `${extractedClasses.length} aulas foram extraídas e adicionadas.`,
      });
    }, 3000);
  };

  const formatTime = (time: string) => {
    return time.substring(0, 5);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Aulas</h1>
              <p className="text-muted-foreground">Gerencie sua grade de horários semanal</p>
            </div>
            
            <div className="flex gap-2">
              {/* <Button onClick={() => document.getElementById('file-upload')?.click()} variant="secondary">
                <Upload className="h-4 w-4 mr-2" />
                Upload
              </Button>
              <input 
                id="file-upload" 
                type="file" 
                accept="image/*,.pdf" 
                className="hidden"
                onChange={handleExtractFromDocument}
              /> */}
              
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
                <DialogContent className="max-w-md">
                  <DialogHeader>
                    <DialogTitle>Adicionar Nova Aula</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="subject">Matéria *</Label>
                      <Input
                        id="subject"
                        value={newClass.subject}
                        onChange={(e) => setNewClass({...newClass, subject: e.target.value})}
                        placeholder="Ex: Matemática"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startTime">Início *</Label>
                        <Input
                          id="startTime"
                          type="time"
                          value={newClass.startTime}
                          onChange={(e) => setNewClass({...newClass, startTime: e.target.value})}
                        />
                      </div>
                      <div>
                        <Label htmlFor="endTime">Fim *</Label>
                        <Input
                          id="endTime"
                          type="time"
                          value={newClass.endTime}
                          onChange={(e) => setNewClass({...newClass, endTime: e.target.value})}
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="dayOfWeek">Dia da Semana</Label>
                      <select
                        id="dayOfWeek"
                        value={newClass.dayOfWeek}
                        onChange={(e) => setNewClass({...newClass, dayOfWeek: parseInt(e.target.value)})}
                        className="w-full p-2 border rounded-md"
                      >
                        {daysOfWeek.map((day) => (
                          <option key={day.value} value={day.value}>
                            {day.label}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <Label htmlFor="room">Sala</Label>
                      <Input
                        id="room"
                        value={newClass.room}
                        onChange={(e) => setNewClass({...newClass, room: e.target.value})}
                        placeholder="Ex: A101"
                      />
                    </div>

                    <div>
                      <Label htmlFor="professor">Professor</Label>
                      <Input
                        id="professor"
                        value={newClass.professor}
                        onChange={(e) => setNewClass({...newClass, professor: e.target.value})}
                        placeholder="Ex: Prof. Silva"
                      />
                    </div>

                    <Button onClick={handleAddClass} className="w-full">
                      Adicionar Aula
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>

        <Tabs value={selectedDay.toString()} onValueChange={(value) => setSelectedDay(parseInt(value))}>
          <TabsList className="grid grid-cols-7 w-full mb-6">
            {daysOfWeek.map((day) => (
              <TabsTrigger 
                key={day.value} 
                value={day.value.toString()}
                className="text-xs sm:text-sm"
              >
                {day.short}
              </TabsTrigger>
            ))}
          </TabsList>

          {daysOfWeek.map((day) => (
            <TabsContent key={day.value} value={day.value.toString()}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Aulas de {day.label}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {filteredClasses.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      <Clock className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Nenhuma aula cadastrada para este dia</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {filteredClasses.map((classItem) => (
                        <div 
                          key={classItem.id}
                          className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col items-center text-sm text-muted-foreground min-w-[60px]">
                              <span className="font-medium">{formatTime(classItem.startTime)}</span>
                              <span className="text-xs">até</span>
                              <span className="font-medium">{formatTime(classItem.endTime)}</span>
                            </div>
                            
                            <div className="border-l h-12 mx-2"></div>
                            
                            <div className="flex-1">
                              <div className="font-semibold text-lg">{classItem.subject}</div>
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
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteClass(classItem.id)}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
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