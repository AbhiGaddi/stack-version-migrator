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
      id: "springboot",
      name: "Spring Boot",
      versions: ["2.0", "2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "2.7", "3.0", "3.1", "3.2"],
    },
    {
      id: "kafka",
      name: "Apache Kafka",
      versions: ["2.0", "2.1", "2.2", "2.3", "2.4", "2.5", "2.6", "2.7", "2.8", "3.0", "3.1", "3.2", "3.3", "3.4", "3.5"],
    },
    {
      id: "flink",
      name: "Apache Flink",
      versions: ["1.10", "1.11", "1.12", "1.13", "1.14", "1.15", "1.16", "1.17", "1.18"],
    },
    {
      id: "druid",
      name: "Apache Druid",
      versions: ["0.15", "0.16", "0.17", "0.18", "0.19", "0.20", "0.21", "0.22", "0.23", "24.0"],
    },
    {
      id: "elasticsearch",
      name: "Elasticsearch",
      versions: ["6.0", "6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7", "6.8", "7.0", "7.1", "7.2", "7.3", "7.4", "7.5", "7.6", "7.7", "7.8", "7.9", "7.10", "7.11", "7.12", "7.13", "7.14", "7.15", "7.16", "7.17", "8.0", "8.1", "8.2", "8.3", "8.4", "8.5", "8.6", "8.7", "8.8", "8.9", "8.10", "8.11"],
    },
    {
      id: "keycloak",
      name: "Keycloak",
      versions: ["4.0", "4.1", "4.2", "4.3", "4.4", "4.5", "4.6", "4.7", "4.8", "5.0", "6.0", "7.0", "8.0", "9.0", "10.0", "11.0", "12.0", "13.0", "14.0", "15.0", "16.0", "17.0", "18.0", "19.0", "20.0", "21.0", "22.0"],
    },
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
    {
      id: "golang",
      name: "Go (Golang)",
      versions: [
        "1.11",
        "1.12",
        "1.13",
        "1.14",
        "1.15",
        "1.16",
        "1.17",
        "1.18",
        "1.19",
        "1.20",
        "1.21",
      ],
    },
    {
      id: "rust",
      name: "Rust",
      versions: ["1.0", "1.25", "1.30", "1.40", "1.50", "1.60", "1.70", "1.75"],
    },
    {
      id: "kotlin",
      name: "Kotlin",
      versions: [
        "1.0",
        "1.1",
        "1.2",
        "1.3",
        "1.4",
        "1.5",
        "1.6",
        "1.7",
        "1.8",
        "1.9",
      ],
    },
    {
      id: "typescript",
      name: "TypeScript",
      versions: ["2.0", "3.0", "4.0", "4.5", "4.9", "5.0", "5.1", "5.2", "5.3"],
    },
    {
      id: "swift",
      name: "Swift",
      versions: [
        "3.0",
        "4.0",
        "4.2",
        "5.0",
        "5.1",
        "5.2",
        "5.3",
        "5.4",
        "5.5",
        "5.6",
        "5.7",
        "5.8",
        "5.9",
      ],
    },
    {
      id: "ballerina",
      name: "Ballerina",
      versions: [
        "0.990",
        "1.0",
        "1.1",
        "1.2",
        "2.0",
        "2.1",
        "2.2",
        "2.3",
        "2.4",
        "2.5",
      ],
    },
    {
      id: "zig",
      name: "Zig",
      versions: ["0.4", "0.5", "0.6", "0.7", "0.8", "0.9", "0.10", "0.11"],
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
