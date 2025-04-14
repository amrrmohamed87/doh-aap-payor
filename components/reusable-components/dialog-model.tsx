import { motion } from "framer-motion";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { cn } from "@/lib/utils";
import { Loader } from "lucide-react";
import React from "react";

const DialogModel = ({
  tritggerBtnClassName,
  triggerBtnText = "Open",
  triggerBtnFn,
  isConfirming,
  loaderIconCn,
  dialogTitle = "Are you sure?",
  dialogDescription = "This action cannot be undone. This will permanently delete your account and remove your data from our servers.",
  dialogCancelBtnText = "Cancel",
  dialogConfirmBtnText = "Continue",
  onCancel,
  onConfirm,
  showConfirmBtn = true,
  children,
}: DialogModelProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {React.createElement(
          typeof triggerBtnText === "string" ? "button" : "div",
          {
            className: cn(
              "max-w-[120px] w-[120px] font-medium bg-white shadow-sm px-4 py-2 rounded-md transition-all duration-300 hover:bg-slate-100",
              tritggerBtnClassName
            ),
            onClick: triggerBtnFn,
          },
          isConfirming ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                repeat: Infinity,
                duration: 1,
                ease: "linear",
              }}
              style={{ display: "inline-block" }}
            >
              <Loader className={cn("text-white", loaderIconCn)} />
            </motion.div>
          ) : (
            triggerBtnText
          )
        )}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{dialogTitle}</AlertDialogTitle>
          <AlertDialogDescription>{dialogDescription}</AlertDialogDescription>
          {children}
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onCancel}>
            {dialogCancelBtnText}
          </AlertDialogCancel>
          {showConfirmBtn && (
            <AlertDialogAction onClick={onConfirm}>
              {dialogConfirmBtnText}
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DialogModel;
