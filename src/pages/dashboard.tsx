import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { TriangleAlertIcon } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <Alert className="text-primary-foreground bg-primary">
        <TriangleAlertIcon />
        <AlertTitle>Warning</AlertTitle>
        <AlertDescription className="text-primary-foreground">
          This ui is under construction.
        </AlertDescription>
      </Alert>
    </div>
  );
}
