
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { NotepadText, X, Save, Minimize2, Maximize2 } from "lucide-react";

export const FloatingNotepad = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [notes, setNotes] = useState("");

  const handleSave = () => {
    // Save notes to localStorage for persistence
    localStorage.setItem("doctorNotes", notes);
    console.log("Notes saved successfully");
  };

  const handleLoad = () => {
    const savedNotes = localStorage.getItem("doctorNotes");
    if (savedNotes) {
      setNotes(savedNotes);
    }
  };

  // Load saved notes when opening the notepad
  const handleOpen = () => {
    setIsOpen(true);
    handleLoad();
  };

  if (!isOpen) {
    return (
      <Button
        onClick={handleOpen}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-healthcare-primary hover:bg-healthcare-accent z-50"
        size="icon"
      >
        <NotepadText className="h-6 w-6" />
      </Button>
    );
  }

  return (
    <Card className={`fixed bottom-6 right-6 z-50 shadow-lg transition-all duration-200 ${
      isMinimized ? "w-80 h-12" : "w-80 h-96"
    }`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 cursor-pointer" 
                  onClick={() => setIsMinimized(!isMinimized)}>
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <NotepadText className="h-4 w-4" />
          Doctor Notes
        </CardTitle>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(!isMinimized);
            }}
          >
            {isMinimized ? <Maximize2 className="h-3 w-3" /> : <Minimize2 className="h-3 w-3" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      
      {!isMinimized && (
        <CardContent className="space-y-3">
          <Textarea
            placeholder="Take quick notes here..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="min-h-[200px] resize-none"
          />
          <div className="flex justify-between">
            <Button variant="outline" size="sm" onClick={handleLoad}>
              Load
            </Button>
            <Button size="sm" onClick={handleSave}>
              <Save className="h-3 w-3 mr-1" />
              Save
            </Button>
          </div>
        </CardContent>
      )}
    </Card>
  );
};
