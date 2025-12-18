import { IconLoader3 } from "@tabler/icons-react";

export default function LoadingScreen() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4">
      <IconLoader3 className="animate-spin h-14 w-14 text-primary" />
    </div>
  );
}
