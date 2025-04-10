import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { cn } from "@/lib/utils";

const ToolTipComponent = ({
  children,
  tooltipText,
  sideOffset = 25,
  side = "right",
  className,
}: ToolTipComponentProps) => {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button>{children}</button>
        </TooltipTrigger>
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          className={cn("bg-cyan-700 text-white", className)}
        >
          <p>{tooltipText}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToolTipComponent;
