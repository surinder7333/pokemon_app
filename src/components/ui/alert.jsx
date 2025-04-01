import * as React from "react";
import { AlertCircle } from "lucide-react";

// eslint-disable-next-line prefer-arrow-callback
const Alert = React.forwardRef(function Alert({ title, children, className, ...props }, ref) {
  return (
    <div
      ref={ref}
      className={`border-l-4 border-red-500 bg-red-100 p-4 text-red-700 rounded-lg flex items-start space-x-2 ${className || ""}`}
      {...props}
    >
      <AlertCircle className="h-5 w-5 mt-1 text-red-700" />
      <div>
        <strong>{title}</strong>
        <p>{children}</p>
      </div>
    </div>
  );
});

Alert.displayName = "Alert";

export { Alert };
