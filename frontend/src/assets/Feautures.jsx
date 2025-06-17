import React from "react";
import {Target, Brain,BookOpen,Pin,Zap,Award} from "lucide-react"
export const features = [
    {
      icon: <Target className="w-6 h-6" />,
      title: "Role-Specific Sessions",
      description: "Create customized interview sessions based on your target role, experience level, and industry."
    },
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Generated Questions",
      description: "Get intelligent, relevant questions powered by advanced AI that adapts to your chosen topic."
    },
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Detailed Explanations",
      description: "Click any question to get comprehensive explanations and insights to deepen your understanding."
    },
    {
      icon: <Pin className="w-6 h-6" />,
      title: "Pin Important Questions",
      description: "Save crucial questions for later review and build your personalized study collection."
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Generate More Questions",
      description: "Need more practice? Generate additional questions on-demand to expand your preparation."
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Track Progress",
      description: "Monitor your improvement and identify areas that need more focus with built-in analytics."
    }
  ];