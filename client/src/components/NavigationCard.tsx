import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface NavigationCardProps {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  path: string;
  index: number;
}

export default function NavigationCard({ id, title, description, icon: IconComponent, path, index }: NavigationCardProps) {
  const [, setLocation] = useLocation();

  const handleClick = () => {
    console.log(`Navigating from NavigationCard to: ${path}`);
    setLocation(path);
  };

  return (
    <div 
      className="h-full cursor-pointer"
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Navigate to ${title}`}
    >
      <Card 
        className="relative bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 hover:border-slate-600 hover:shadow-2xl hover:shadow-blue-500/10 active:scale-95 transition-all duration-300 cursor-pointer h-full backdrop-blur-sm overflow-hidden touch-manipulation group focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-slate-900"
        style={{
          animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
        }}
      >
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 via-blue-600/0 to-purple-600/0 group-hover:from-blue-600/5 group-hover:via-blue-600/5 group-hover:to-purple-600/5 transition-all duration-300"></div>
        
        <CardHeader className="relative z-10">
          <div className="flex items-center space-x-3 mb-3">
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 transition-all duration-300">
              <IconComponent className="h-6 w-6 text-blue-300 group-hover:text-blue-200 group-hover:scale-110 transition-all duration-300" />
            </div>
          </div>
          <CardTitle className="text-xl font-bold text-white group-hover:text-blue-100 transition-colors duration-300">
            {title}
          </CardTitle>
          <CardDescription className="text-slate-300 group-hover:text-slate-200 transition-colors duration-300 leading-relaxed">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-0 relative z-10">
          <div className="w-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 group-hover:from-blue-500/30 group-hover:to-purple-500/30 group-active:from-blue-500/40 group-active:to-purple-500/40 text-white border border-blue-500/30 group-hover:border-blue-400/50 rounded-md px-4 py-3 text-center text-sm sm:text-base font-semibold shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300 relative overflow-hidden">
            <span className="relative z-10">Començar</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/20 to-purple-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}