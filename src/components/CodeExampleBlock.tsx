import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface CodeExampleBlockProps {
  title?: string;
  description?: string;
  beforeCode?: string;
  afterCode?: string;
  language?: string;
}

const CodeExampleBlock = ({
  title = "Code Example",
  description = "This example shows the code changes required for migration.",
  beforeCode = "// Before migration\nconst Component = React.createClass({\n  render() {\n    return <div>{this.props.children}</div>;\n  }\n});",
  afterCode = "// After migration\nclass Component extends React.Component {\n  render() {\n    return <div>{this.props.children}</div>;\n  }\n}",
  language = "jsx",
}: CodeExampleBlockProps) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    // In a real implementation, you might want to show a toast notification here
  };

  return (
    <Card className="w-full mb-6 bg-white border-gray-200">
      <CardContent className="pt-6">
        <div className="mb-4">
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        <Tabs defaultValue="before" className="w-full">
          <TabsList className="mb-2">
            <TabsTrigger value="before">Before Migration</TabsTrigger>
            <TabsTrigger value="after">After Migration</TabsTrigger>
          </TabsList>

          <TabsContent value="before" className="relative">
            <div className="absolute top-2 right-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => copyToClipboard(beforeCode)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy code</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <pre className="p-4 rounded-md bg-gray-50 overflow-x-auto">
              <code className={`language-${language}`}>{beforeCode}</code>
            </pre>
          </TabsContent>

          <TabsContent value="after" className="relative">
            <div className="absolute top-2 right-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => copyToClipboard(afterCode)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Copy code</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <pre className="p-4 rounded-md bg-gray-50 overflow-x-auto">
              <code className={`language-${language}`}>{afterCode}</code>
            </pre>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default CodeExampleBlock;
