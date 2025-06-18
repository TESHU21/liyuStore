// CustomSelect.jsx
import * as React from "react";
import { CheckIcon, AlertCircle, ChevronDownIcon } from "lucide-react"; 
import {
  Select as ShadcnSelect, // Renamed to avoid conflict with local Select component
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; 
import { cn } from "@/lib/utils";

const CustomSelect = ({ field, options, placeholder, hasSuccess, error }) => {
  return (
    <ShadcnSelect
      value={ (field.value )|| ""} // Ensure value is controlled by react-hook-form
      onValueChange={(value) => {
                

        field.onChange(value);
        
      }}
      onOpenChange={(open) => {
        if (!open) {
        }
      }}
    >
      <SelectTrigger
        className={cn(
          "!h-[48px] px-3 py-4 w-full bg-gray-200", // Your primary height and base styles
          hasSuccess && "bg-input-sucess border-input-sucess", // Success styling
          error && "bg-red-200 border-red-500", // Error styling
          (hasSuccess || error) && "!pr-10" // This adds space for the validation icon
        )}
      >
        <SelectValue placeholder={placeholder || "Select"} />
        {(hasSuccess || error) && ( // Only show if there's success or error
            <span className="absolute right-4 top-1/2 transform -translate-y-1/2">
                {hasSuccess && <CheckIcon className=" size-4 text-green-500" />}
                {error && <AlertCircle className="size-4 text-red-500" />}
            </span>
        )}
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}
          className="hover:bg-gray-200"
          >
            {option.name}
          </SelectItem>
        ))}
      </SelectContent>
    </ShadcnSelect>
  );
};

export default CustomSelect;