import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
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
    breakingChanges: [
      {
        id: "bc1",
        title: "Automatic Batching",
        description:
          "React 18 introduces automatic batching for all state updates, not just those inside React event handlers.",
        severity: "medium",
      },
      {
        id: "bc2",
        title: "Strict Mode Changes",
        description:
          "Components will be mounted, unmounted, and remounted to simulate effects cleanup.",
        severity: "high",
      },
      {
        id: "bc3",
        title: "New Root API",
        description:
          "ReactDOM.render has been replaced with ReactDOM.createRoot.",
        severity: "high",
      },
    ],
    deprecatedFeatures: [
      {
        id: "df1",
        feature: "findDOMNode",
        description:
          "This method is deprecated and will be removed in a future major version.",
        alternative: "Use ref forwarding or useRef hook instead.",
      },
      {
        id: "df2",
        feature: "String Refs",
        description:
          "String refs have been deprecated and will be removed in a future version.",
        alternative: "Use createRef() or the ref callback pattern instead.",
      },
    ],
    codeExamples: [
      {
        id: "ce1",
        title: "Migrating from ReactDOM.render to createRoot",
        description:
          "Update your application entry point to use the new root API.",
        beforeCode:
          "import ReactDOM from 'react-dom';\nReactDOM.render(<App />, document.getElementById('root'));",
        afterCode:
          "import ReactDOM from 'react-dom/client';\nconst root = ReactDOM.createRoot(document.getElementById('root'));\nroot.render(<App />);",
        language: "javascript",
      },
      {
        id: "ce2",
        title: "Updating useEffect for Strict Mode",
        description:
          "Ensure your effects clean up properly to handle the new strict mode behavior.",
        beforeCode:
          "useEffect(() => {\n  const subscription = subscribe();\n  // Missing cleanup\n}, []);",
        afterCode:
          "useEffect(() => {\n  const subscription = subscribe();\n  return () => {\n    subscription.unsubscribe();\n  };\n}, []);",
        language: "javascript",
      },
    ],
    configUpdates: [
      {
        id: "cu1",
        title: "Package.json Updates",
        description: "Update React dependencies to version 18.",
        configChanges: `{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}`,
      },
      {
        id: "cu2",
        title: "Babel Configuration",
        description:
          "Ensure your Babel configuration supports React 18 features.",
        configChanges: `{
  "presets": [
    ["@babel/preset-react", {
      "runtime": "automatic"
    }]
  ]
}`,
      },
    ],
    documentationLinks: [
      {
        id: "dl1",
        title: "React 18 Release Notes",
        url: "https://reactjs.org/blog/2022/03/29/react-v18.html",
        description:
          "Official React 18 release announcement with migration information.",
      },
      {
        id: "dl2",
        title: "New Root API Documentation",
        url: "https://reactjs.org/docs/react-dom-client.html",
        description: "Documentation for the new createRoot API in React 18.",
      },
      {
        id: "dl3",
        title: "Automatic Batching Deep Dive",
        url: "https://github.com/reactwg/react-18/discussions/21",
        description: "Detailed explanation of automatic batching in React 18.",
      },
    ],
  },
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("breaking-changes");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleExportPDF = () => {
    // Placeholder for PDF export functionality
    console.log("Exporting as PDF...");
  };

  const handleExportMarkdown = () => {
    // Placeholder for Markdown export functionality
    console.log("Exporting as Markdown...");
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive";
      case "medium":
        return "secondary";
      case "low":
        return "outline";
      default:
        return "default";
    }
  };

  const filterItems = (items: any[], fields: string[]) => {
    if (!searchQuery) return items;

    return items.filter((item) => {
      return fields.some((field) => {
        const value = item[field];
        return value && value.toLowerCase().includes(searchQuery.toLowerCase());
      });
    });
  };

  const filteredBreakingChanges = filterItems(guideData.breakingChanges || [], [
    "title",
    "description",
  ]);
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
    <div className="w-full bg-background p-4 rounded-lg border">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Migration Guide: {technology} {currentVersion} → {targetVersion}
          </h2>
          <p className="text-muted-foreground">
            Comprehensive guide to help you migrate your {technology}{" "}
            application from version {currentVersion} to {targetVersion}.
          </p>
        </div>
        <div className="flex space-x-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={handleExportPDF}>
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" onClick={handleExportMarkdown}>
            <FileDown className="mr-2 h-4 w-4" />
            Export Markdown
          </Button>
        </div>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search migration guide..."
          value={searchQuery}
          onChange={handleSearch}
          className="pl-8"
        />
      </div>

      <Tabs
        defaultValue="breaking-changes"
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-6">
          <TabsTrigger value="breaking-changes">Breaking Changes</TabsTrigger>
          <TabsTrigger value="deprecated-features">Deprecated</TabsTrigger>
          <TabsTrigger value="code-examples">Code Examples</TabsTrigger>
          <TabsTrigger value="config-updates">Config Updates</TabsTrigger>
          <TabsTrigger value="documentation">Documentation</TabsTrigger>
        </TabsList>

        <TabsContent value="breaking-changes" className="space-y-4">
          {filteredBreakingChanges.length > 0 ? (
            filteredBreakingChanges.map((change) => (
              <Card key={change.id}>
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle>{change.title}</CardTitle>
                    <Badge variant={getSeverityColor(change.severity)}>
                      {change.severity.charAt(0).toUpperCase() +
                        change.severity.slice(1)}{" "}
                      Impact
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>{change.description}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                {searchQuery
                  ? "No breaking changes match your search."
                  : "No breaking changes found."}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="deprecated-features" className="space-y-4">
          {filteredDeprecatedFeatures.length > 0 ? (
            filteredDeprecatedFeatures.map((feature) => (
              <Card key={feature.id}>
                <CardHeader>
                  <CardTitle>{feature.feature}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <p>{feature.description}</p>
                  <div className="mt-4">
                    <h4 className="font-semibold">Recommended Alternative:</h4>
                    <p className="text-muted-foreground">
                      {feature.alternative}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                {searchQuery
                  ? "No deprecated features match your search."
                  : "No deprecated features found."}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="code-examples" className="space-y-6">
          {filteredCodeExamples.length > 0 ? (
            filteredCodeExamples.map((example) => (
              <Card key={example.id}>
                <CardHeader>
                  <CardTitle>{example.title}</CardTitle>
                  <CardDescription>{example.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm font-medium mb-2">Before:</h4>
                      <CodeExampleBlock
                        code={example.beforeCode}
                        language={example.language}
                        title="Before Migration"
                      />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium mb-2">After:</h4>
                      <CodeExampleBlock
                        code={example.afterCode}
                        language={example.language}
                        title="After Migration"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                {searchQuery
                  ? "No code examples match your search."
                  : "No code examples found."}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="config-updates" className="space-y-4">
          {filteredConfigUpdates.length > 0 ? (
            <Accordion type="single" collapsible className="w-full">
              {filteredConfigUpdates.map((update) => (
                <AccordionItem key={update.id} value={update.id}>
                  <AccordionTrigger>{update.title}</AccordionTrigger>
                  <AccordionContent>
                    <p className="mb-4">{update.description}</p>
                    <CodeExampleBlock
                      code={update.configChanges}
                      language="json"
                      title="Configuration Changes"
                    />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                {searchQuery
                  ? "No configuration updates match your search."
                  : "No configuration updates found."}
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="documentation" className="space-y-4">
          {filteredDocLinks.length > 0 ? (
            <Card>
              <CardHeader>
                <CardTitle>Official Documentation & Resources</CardTitle>
                <CardDescription>
                  Helpful links to official documentation and community
                  resources for this migration.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {filteredDocLinks.map((link) => (
                    <li
                      key={link.id}
                      className="p-4 border rounded-md hover:bg-accent transition-colors"
                    >
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start"
                      >
                        <ExternalLink className="h-5 w-5 mr-2 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium">{link.title}</h3>
                          <p className="text-sm text-muted-foreground">
                            {link.description}
                          </p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center text-muted-foreground">
                {searchQuery
                  ? "No documentation links match your search."
                  : "No documentation links found."}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MigrationGuideDisplay;
