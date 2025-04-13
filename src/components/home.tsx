import React from "react";
import { motion } from "framer-motion";
import StackSelectionPanel from "./StackSelectionPanel";
import MigrationGuideDisplay from "./MigrationGuideDisplay";
import { Separator } from "./ui/separator";

const Home = () => {
  const [migrationGuide, setMigrationGuide] = React.useState<{
    technology: string;
    currentVersion: string;
    targetVersion: string;
    breakingChanges: Array<{ title: string; description: string }>;
    deprecatedFeatures: Array<{ feature: string; alternative: string }>;
    codeExamples: Array<{
      title: string;
      before: string;
      after: string;
      language: string;
    }>;
    configUpdates: Array<{ title: string; description: string; code?: string }>;
    documentationLinks: Array<{
      title: string;
      url: string;
      description: string;
    }>;
  } | null>(null);

  const versionOptions: Record<string, string[]> = {
    react: ["17", "18", "latest"],
    typescript: ["4", "5", "latest"],
    angular: ["15", "16", "latest"],
    vue: ["2", "3", "latest"],
    node: ["16", "18", "latest"],
    springboot: ["2.7", "3.0", "latest"],
    elasticsearch: ["7.17", "8.0", "latest"],
    keycloak: ["15.0", "16.0", "latest"],
    druid: ["0.22", "24.0", "latest"],
    redis: ["6.2", "7.0", "latest"],
    kafka: ["2.8", "3.0", "latest"]
  };

  const handleGenerateGuide = (
    technology: string,
    currentVersion: string,
    targetVersion: string
  ) => {
    // Import the migration data from our data source
    import("@/lib/migrationData")
      .then(({ getMigrationData }) => {
        const techKey = technology.toLowerCase();
        
        // If target version is 'latest', get all available versions
        if (targetVersion === "latest") {
          const versions = versionOptions[techKey].filter(v => v !== "latest");
          const latestVersion = versions[versions.length - 1];
          
          const migrationData = getMigrationData(
            technology,
            currentVersion,
            latestVersion
          );

          if (migrationData) {
            setMigrationGuide({
              technology,
              currentVersion,
              targetVersion: latestVersion,
              breakingChanges: migrationData.breakingChanges.map((item) => ({
                title: item.title,
                description: item.description,
              })),
              deprecatedFeatures: migrationData.deprecatedFeatures.map(
                (item) => ({
                  feature: item.feature,
                  alternative: item.alternative,
                }),
              ),
              codeExamples: migrationData.codeExamples.map((item) => ({
                title: item.title,
                before: item.before,
                after: item.after,
                language: item.language,
              })),
              configUpdates: migrationData.configUpdates.map((item) => ({
                title: item.title,
                description: item.description,
                code: item.code,
              })),
              documentationLinks: migrationData.documentationLinks.map(
                (item) => ({
                  title: item.title,
                  url: item.url,
                  description: item.description,
                }),
              ),
            });
          } else {
            setMigrationGuide({
              technology,
              currentVersion,
              targetVersion: latestVersion,
              breakingChanges: [
                {
                  title: "No Migration Data Available",
                  description: `Migration guide from ${currentVersion} to ${latestVersion} is not available yet. Please check back later or consult the official documentation.`,
                },
              ],
              deprecatedFeatures: [],
              codeExamples: [],
              configUpdates: [],
              documentationLinks: [],
            });
          }
        } else {
          // Handle normal version selection
          const mappedCurrentVersion = versionOptions[techKey]?.includes(currentVersion) 
            ? currentVersion 
            : versionOptions[techKey]?.[0] || currentVersion;
          const mappedTargetVersion = versionOptions[techKey]?.includes(targetVersion) 
            ? targetVersion 
            : versionOptions[techKey]?.[0] || targetVersion;

          const migrationData = getMigrationData(
            technology,
            mappedCurrentVersion,
            mappedTargetVersion
          );

          if (migrationData) {
            setMigrationGuide({
              technology,
              currentVersion: mappedCurrentVersion,
              targetVersion: mappedTargetVersion,
              breakingChanges: migrationData.breakingChanges.map((item) => ({
                title: item.title,
                description: item.description,
              })),
              deprecatedFeatures: migrationData.deprecatedFeatures.map(
                (item) => ({
                  feature: item.feature,
                  alternative: item.alternative,
                }),
              ),
              codeExamples: migrationData.codeExamples.map((item) => ({
                title: item.title,
                before: item.before,
                after: item.after,
                language: item.language,
              })),
              configUpdates: migrationData.configUpdates.map((item) => ({
                title: item.title,
                description: item.description,
                code: item.code,
              })),
              documentationLinks: migrationData.documentationLinks.map(
                (item) => ({
                  title: item.title,
                  url: item.url,
                  description: item.description,
                }),
              ),
            });
          } else {
            setMigrationGuide({
              technology,
              currentVersion: mappedCurrentVersion,
              targetVersion: mappedTargetVersion,
              breakingChanges: [
                {
                  title: "No Migration Data Available",
                  description: `Migration guide from ${mappedCurrentVersion} to ${mappedTargetVersion} is not available yet. Please check back later or consult the official documentation.`,
                },
              ],
              deprecatedFeatures: [],
              codeExamples: [],
              configUpdates: [],
              documentationLinks: [],
            });
          }
        }
      })
      .catch((error) => {
        console.error("Error loading migration data:", error);
        setMigrationGuide({
          technology,
          currentVersion,
          targetVersion,
          breakingChanges: [
            {
              title: "Error Loading Data",
              description:
                "There was an error loading migration data. Please try again later.",
            },
          ],
          deprecatedFeatures: [],
          codeExamples: [],
          configUpdates: [],
          documentationLinks: [],
        });
      });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Technology Migration Guide
          </h1>
          <p className="text-xl text-gray-600">
            Select your technology stack and versions to generate a detailed migration guide
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <StackSelectionPanel onGenerateGuide={handleGenerateGuide} />
        </div>

        {migrationGuide && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Migration Guide: {migrationGuide.technology} {migrationGuide.currentVersion} → {migrationGuide.targetVersion}
              </h2>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <span className="flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Last updated: {new Date().toLocaleDateString()}
                </span>
              </div>
            </div>

            <MigrationGuideDisplay
              technology={migrationGuide.technology}
              currentVersion={migrationGuide.currentVersion}
              targetVersion={migrationGuide.targetVersion}
              guideData={{
                breakingChanges: migrationGuide.breakingChanges.map((item) => ({
                  id: crypto.randomUUID(),
                  title: item.title,
                  description: item.description,
                  severity: "high",
                })),
                deprecatedFeatures: migrationGuide.deprecatedFeatures.map((item) => ({
                  id: crypto.randomUUID(),
                  feature: item.feature,
                  description: "",
                  alternative: item.alternative,
                })),
                codeExamples: migrationGuide.codeExamples.map((item) => ({
                  id: crypto.randomUUID(),
                  title: item.title,
                  description: "",
                  beforeCode: item.before,
                  afterCode: item.after,
                  language: item.language,
                })),
                configUpdates: migrationGuide.configUpdates.map((item) => ({
                  id: crypto.randomUUID(),
                  title: item.title,
                  description: item.description,
                  configChanges: item.code || "",
                })),
                documentationLinks: migrationGuide.documentationLinks.map((item) => ({
                  id: crypto.randomUUID(),
                  title: item.title,
                  url: item.url,
                  description: item.description,
                })),
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
