import { IconZoomQuestion } from "@tabler/icons-react";
import { Card, CardContent } from "../ui/card";

export default function NoElementFound() {
  return (
    <Card>
      <CardContent>
        <div className="flex flex-col items-center justify-center p-8 text-center gap-4">
          <IconZoomQuestion className="text-muted-foreground" size={48} />
          <p className="text-muted-foreground">
            Could not find any elements matching your criteria.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
