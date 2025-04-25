
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { TaskForm } from "./TaskForm";
import { TaskDetail } from "./TaskDetail";

interface TaskDialogProps {
  mode: "create" | "edit" | "view";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  taskId?: string;
  initialData?: any;
  onSubmit?: (data: any) => void;
}

export function TaskDialog({
  mode,
  open,
  onOpenChange,
  taskId,
  initialData,
  onSubmit,
}: TaskDialogProps) {
  const titles = {
    create: "Create New Task",
    edit: "Edit Task",
    view: "Task Details",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{titles[mode]}</DialogTitle>
        </DialogHeader>
        {mode === "view" ? (
          <TaskDetail task={initialData} />
        ) : (
          <TaskForm
            initialData={initialData}
            onSubmit={(data) => {
              onSubmit?.(data);
              onOpenChange(false);
            }}
            isEditing={mode === "edit"}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
