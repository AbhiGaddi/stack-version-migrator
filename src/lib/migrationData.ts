// This file contains migration data scraped from official documentation

import ReactData from '../data/migration-guides/react.json';
import TypeScriptData from '../data/migration-guides/typescript.json';
import AngularData from '../data/migration-guides/angular.json';
import VueData from '../data/migration-guides/vue.json';
import NodeData from '../data/migration-guides/node.json';
import SpringBootData from '../data/migration-guides/springboot.json';
import ElasticsearchData from '../data/migration-guides/elasticsearch.json';
import KeycloakData from '../data/migration-guides/keycloak.json';
import DruidData from '../data/migration-guides/druid.json';
import RedisData from '../data/migration-guides/redis.json';

interface MigrationData {
  technology: string;
  migrations: Array<{
    fromVersion: string;
    toVersion: string;
    breakingChanges: Array<{
      title: string;
      description: string;
    }>;
    deprecatedFeatures: Array<{
      feature: string;
      alternative: string;
    }>;
    codeExamples: Array<{
      title: string;
      before: string;
      after: string;
      language: string;
    }>;
    configUpdates: Array<{
      title: string;
      description: string;
      code?: string;
    }>;
    documentationLinks: Array<{
      title: string;
      url: string;
      description: string;
    }>;
  }>;
}

const migrationData: Record<string, MigrationData> = {
  react: ReactData,
  typescript: TypeScriptData,
  angular: AngularData,
  vue: VueData,
  node: NodeData,
  springboot: SpringBootData,
  elasticsearch: ElasticsearchData,
  keycloak: KeycloakData,
  druid: DruidData,
  redis: RedisData,
  kafka: {
    "2.8": {
      "3.0": async () => {
        const data = await import("@/data/migration-guides/kafka.json");
        return data.default;
      },
    },
  },
  // Add more tech stacks here as we create their migration guides
};

export function getMigrationData(
  technology: string,
  currentVersion: string,
  targetVersion: string
) {
  const techData = migrationData[technology.toLowerCase()];
  if (!techData) {
    return null;
  }

  const migration = techData.migrations.find(
    (m) => m.fromVersion === currentVersion && m.toVersion === targetVersion
  );

  if (!migration) {
    return null;
  }

  return {
    technology: techData.technology,
    currentVersion: migration.fromVersion,
    targetVersion: migration.toVersion,
    breakingChanges: migration.breakingChanges,
    deprecatedFeatures: migration.deprecatedFeatures,
    codeExamples: migration.codeExamples,
    configUpdates: migration.configUpdates,
    documentationLinks: migration.documentationLinks,
  };
}
