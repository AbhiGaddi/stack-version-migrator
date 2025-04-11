import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface Technology {
  id: string;
  name: string;
  versions: string[];
}

interface StackSelectionPanelProps {
  onGenerateGuide: (
    tech: string,
    currentVersion: string,
    targetVersion: string,
  ) => void;
}

const StackSelectionPanel = ({
  onGenerateGuide = () => {},
}: StackSelectionPanelProps) => {
  const [selectedTech, setSelectedTech] = useState<string>("");
  const [currentVersion, setCurrentVersion] = useState<string>("");
  const [targetVersion, setTargetVersion] = useState<string>("");

  // Mock data for technologies and their versions
  const technologies: Technology[] = [
    {
      id: "react",
      name: "React",
      versions: ["16.0", "16.8", "17.0", "18.0", "18.2"],
    },
    {
      id: "angular",
      name: "Angular",
      versions: ["8.0", "9.0", "10.0", "11.0", "12.0", "13.0", "14.0", "15.0"],
    },
    {
      id: "nodejs",
      name: "Node.js",
      versions: ["10.0", "12.0", "14.0", "16.0", "18.0", "20.0"],
    },
    {
      id: "python",
      name: "Python",
      versions: ["2.7", "3.6", "3.7", "3.8", "3.9", "3.10", "3.11"],
    },
    {
      id: "django",
      name: "Django",
      versions: ["2.0", "2.2", "3.0", "3.2", "4.0", "4.2"],
    },
  ];

  const selectedTechnology = technologies.find(
    (tech) => tech.id === selectedTech,
  );

  // Filter out versions that are already selected or are less than current version for target selection
  const availableTargetVersions =
    selectedTechnology?.versions.filter((version) => {
      if (version === currentVersion) return false;
      if (!currentVersion) return true;

      // Simple version comparison (assumes semantic versioning format)
      return parseFloat(version) > parseFloat(currentVersion);
    }) || [];

  const handleGenerateGuide = () => {
    if (selectedTech && currentVersion && targetVersion) {
      onGenerateGuide(selectedTech, currentVersion, targetVersion);
    }
  };

  const isGenerateDisabled = !selectedTech || !currentVersion || !targetVersion;

  return (
    <Card className="w-full bg-white shadow-md">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
          <div className="space-y-2">
            <label
              htmlFor="technology"
              className="block text-sm font-medium text-gray-700"
            >
              Technology Stack
            </label>
            <Select
              value={selectedTech}
              onValueChange={(value) => {
                setSelectedTech(value);
                setCurrentVersion("");
                setTargetVersion("");
              }}
            >
              <SelectTrigger id="technology" className="w-full">
                <SelectValue placeholder="Select technology" />
              </SelectTrigger>
              <SelectContent>
                {technologies.map((tech) => (
                  <SelectItem key={tech.id} value={tech.id}>
                    {tech.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="current-version"
              className="block text-sm font-medium text-gray-700"
            >
              Current Version
            </label>
            <Select
              value={currentVersion}
              onValueChange={(value) => {
                setCurrentVersion(value);
                setTargetVersion("");
              }}
              disabled={!selectedTech}
            >
              <SelectTrigger id="current-version" className="w-full">
                <SelectValue placeholder="Select version" />
              </SelectTrigger>
              <SelectContent>
                {selectedTechnology?.versions.map((version) => (
                  <SelectItem key={version} value={version}>
                    {version}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="target-version"
              className="block text-sm font-medium text-gray-700"
            >
              Target Version
            </label>
            <Select
              value={targetVersion}
              onValueChange={setTargetVersion}
              disabled={!currentVersion}
            >
              <SelectTrigger id="target-version" className="w-full">
                <SelectValue placeholder="Select version" />
              </SelectTrigger>
              <SelectContent>
                {availableTargetVersions.map((version) => (
                  <SelectItem key={version} value={version}>
                    {version}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Button
              onClick={handleGenerateGuide}
              disabled={isGenerateDisabled}
              className="w-full bg-primary hover:bg-primary/90"
            >
              Generate Migration Guide
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StackSelectionPanel;
