import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Download, FileDown, Search, ExternalLink } from "lucide-react";
import CodeExampleBlock from "./CodeExampleBlock";

interface MigrationGuideDisplayProps {
  technology?: string;
  currentVersion?: string;
  targetVersion?: string;
  guideData?: {
    breakingChanges?: Array<{
      id: string;
      title: string;
      description: string;
      severity: "high" | "medium" | "low";
    }>;
    deprecatedFeatures?: Array<{
      id: string;
      feature: string;
      description: string;
      alternative: string;
    }>;
    codeExamples?: Array<{
      id: string;
      title: string;
      description: string;
      beforeCode: string;
      afterCode: string;
      language: string;
    }>;
    configUpdates?: Array<{
      id: string;
      title: string;
      description: string;
      configChanges: string;
    }>;
    documentationLinks?: Array<{
      id: string;
      title: string;
      url: string;
      description: string;
    }>;
  };
}

const MigrationGuideDisplay: React.FC<MigrationGuideDisplayProps> = ({
  technology = "React",
  currentVersion = "16.8",
  targetVersion = "18.0",
  guideData = {
    breakingChanges: [],
    deprecatedFeatures: [],
    codeExamples: [],
    configUpdates: [],
    documentationLinks: [],
  },
}) => {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [activeTab, setActiveTab] = React.useState("breaking-changes");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleExportPDF = () => {
    // Implementation for PDF export
    console.log("Exporting to PDF...");
  };

  const handleExportMarkdown = () => {
    // Implementation for Markdown export
    console.log("Exporting to Markdown...");
  };

  const filterItems = <T extends { [key: string]: any }>(
    items: T[],
    searchFields: (keyof T)[],
  ) => {
    if (!searchQuery) return items;
    return items.filter((item) =>
      searchFields.some((field) =>
        String(item[field]).toLowerCase().includes(searchQuery.toLowerCase()),
      ),
    );
  };

  const filteredBreakingChanges = filterItems(
    guideData.breakingChanges || [],
    ["title", "description"],
  );
  const filteredDeprecatedFeatures = filterItems(
    guideData.deprecatedFeatures || [],
    ["feature", "description", "alternative"],
  );
  const filteredCodeExamples = filterItems(guideData.codeExamples || [], [
    "title",
    "description",
  ]);
  const filteredConfigUpdates = filterItems(guideData.configUpdates || [], [
    "title",
    "description",
    "configChanges",
  ]);
  const filteredDocLinks = filterItems(guideData.documentationLinks || [], [
    "title",
    "description",
  ]);

  return (
    <div className="w-full bg-background p-6 rounded-lg border shadow-sm">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-foreground bg-clip-text text-transparent">
            Migration Guide: {technology} {currentVersion} → {targetVersion}
          </h2>
          <p className="text-muted-foreground text-lg">
            Comprehensive guide to help you migrate your {technology} application from version {currentVersion} to {targetVersion}.
          </p>
        </div>
        <div className="flex space-x-3 mt-4 md:mt-0">
          <Button variant="outline" onClick={handleExportPDF} className="hover:bg-primary hover:text-primary-foreground transition-colors">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={handleExportMarkdown} className="hover:bg-primary hover:text-primary-foreground transition-colors">
            <FileDown className="mr-2 h-4 w-4" />
            Export Markdown
          </Button>
        </div>
      </div>

      <div className="relative mb-8">
        <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
        <Input
          placeholder="Search migration guide..."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-10 h-12 text-lg"
        />
      </div>

      <Tabs defaultValue="breaking-changes" className="w-full">
        <TabsList className="grid w-full grid-cols-5 mb-6">
          <TabsTrigger value="breaking-changes" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Breaking Changes
          </TabsTrigger>
          <TabsTrigger value="deprecated" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Deprecated
          </TabsTrigger>
          <TabsTrigger value="code-examples" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Code Examples
          </TabsTrigger>
          <TabsTrigger value="config" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Configuration
          </TabsTrigger>
          <TabsTrigger value="docs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Documentation
          </TabsTrigger>
        </TabsList>

        <TabsContent value="breaking-changes" className="space-y-4">
          {filteredBreakingChanges.map((change) => (
            <Card key={change.id} className="border-l-4 border-red-500 hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge variant={change.severity === "high" ? "destructive" : change.severity === "medium" ? "secondary" : "default"}>
                    {change.severity}
                  </Badge>
                  {change.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{change.description}</p>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="deprecated" className="space-y-4">
          {filteredDeprecatedFeatures.map((feature) => (
            <Card key={feature.id} className="border-l-4 border-yellow-500 hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{feature.feature}</CardTitle>
                <CardDescription>{feature.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Alternative:</span>
                  <span className="text-muted-foreground">{feature.alternative}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="code-examples" className="space-y-6">
          {filteredCodeExamples.map((example) => (
            <Card key={example.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{example.title}</CardTitle>
                <CardDescription>{example.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeExampleBlock
                  title="Code Example"
                  description={example.description}
                  beforeCode={example.beforeCode}
                  afterCode={example.afterCode}
                  language={example.language}
                />
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="config" className="space-y-4">
          {filteredConfigUpdates.map((update) => (
            <Card key={update.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{update.title}</CardTitle>
                <CardDescription>{update.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <CodeExampleBlock
                  title="Configuration Changes"
                  description={update.description}
                  beforeCode={update.configChanges}
                  language="properties"
                />
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="docs" className="space-y-4">
          {filteredDocLinks.map((link) => (
            <Card key={link.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <CardTitle>{link.title}</CardTitle>
                <CardDescription>{link.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="link" className="p-0 h-auto" asChild>
                  <a href={link.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" />
                    {link.url}
                  </a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MigrationGuideDisplay;
