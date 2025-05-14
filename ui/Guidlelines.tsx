import Image from "next/image";
import { cn } from "./utils";

interface GuidlelinesProps {
  doImage: string;
  dontImage: string;
  doAlt?: string;
  dontAlt?: string;
  doText: string;
  dontText: string;
  className?: string;
}

export const Guidlelines = ({
  doImage,
  dontImage,
  doAlt = "Do example",
  dontAlt = "Don't example",
  doText,
  dontText,
  className,
}: GuidlelinesProps) => {
  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-4", className)}>
      {/* Do Example */}
      <div className="flex flex-col">
        <div className="bg-green-50 p-4 rounded-lg mb-3">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <Image
              src={doImage || "/placeholder.svg"}
              alt={doAlt}
              width={500}
              height={300}
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="px-2">
          <h3 className="text-[#008236] font-medium text-xs bg-[#F0FDF4] px-2 py-0.5 rounded-full inline-block !mb-2">
            Do
          </h3>
          <p className="text-fd-foreground text-sm">{doText}</p>
        </div>
      </div>

      {/* Don't Example */}
      <div className="flex flex-col">
        <div className="bg-red-50 p-4 rounded-lg mb-3">
          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <Image
              src={dontImage || "/placeholder.svg"}
              alt={dontAlt}
              width={500}
              height={300}
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="px-2">
          <h3 className="text-[#C10007] font-medium text-xs bg-[#FEF2F2] px-2 py-0.5 rounded-full inline-block !mb-2">
            Don't
          </h3>
          <p className="text-fd-foreground text-sm">{dontText}</p>
        </div>
      </div>
    </div>
  );
}

export default Guidlelines;