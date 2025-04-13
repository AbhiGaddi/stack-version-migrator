import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Building, CheckCircle, AlertTriangle } from "lucide-react";

interface CaseStudyCardProps {
  company: string;
  projectDescription: string;
  challenges: string[];
  solution: string;
  outcome: string;
  imageUrl?: string;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  company = "Example Company",
  projectDescription = "Migration project description",
  challenges = ["Challenge 1", "Challenge 2"],
  solution = "Solution description",
  outcome = "Outcome description",
  imageUrl,
}) => {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg">
      <div className="relative">
        {imageUrl && (
          <div className="h-48 w-full overflow-hidden">
            <img
              src={imageUrl}
              alt={`${company} case study`}
              className="h-full w-full object-cover transition-transform hover:scale-105"
            />
          </div>
        )}
        <div className="absolute right-3 top-3">
          <Badge className="bg-primary text-primary-foreground">
            <Building className="mr-1 h-3 w-3" />
            {company}
          </Badge>
        </div>
      </div>

      <CardHeader>
        <CardTitle className="text-xl">{company}</CardTitle>
        <CardDescription>{projectDescription}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <div>
          <h4 className="mb-2 font-semibold flex items-center">
            <AlertTriangle className="mr-2 h-4 w-4 text-amber-500" />
            Challenges
          </h4>
          <ul className="ml-6 list-disc space-y-1 text-sm text-muted-foreground">
            {challenges.map((challenge, index) => (
              <li key={index}>{challenge}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-2 font-semibold">Solution</h4>
          <p className="text-sm text-muted-foreground">{solution}</p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold flex items-center">
            <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
            Outcome
          </h4>
          <p className="text-sm text-muted-foreground">{outcome}</p>
        </div>
      </CardContent>

      <CardFooter className="border-t bg-muted/50 px-6 py-3">
        <p className="text-xs text-muted-foreground">
          Real-world migration case study
        </p>
      </CardFooter>
    </Card>
  );
};

export default CaseStudyCard;
