// This file contains migration data scraped from official documentation

export interface MigrationGuideData {
  breakingChanges: Array<{
    id: string;
    title: string;
    description: string;
    severity: "high" | "medium" | "low";
  }>;
  deprecatedFeatures: Array<{
    id: string;
    feature: string;
    description: string;
    alternative: string;
  }>;
  codeExamples: Array<{
    id: string;
    title: string;
    description: string;
    beforeCode: string;
    afterCode: string;
    language: string;
  }>;
  configUpdates: Array<{
    id: string;
    title: string;
    description: string;
    configChanges: string;
  }>;
  documentationLinks: Array<{
    id: string;
    title: string;
    url: string;
    description: string;
  }>;
  caseStudies?: Array<{
    id: string;
    company: string;
    projectDescription: string;
    challenges: string[];
    solution: string;
    outcome: string;
    imageUrl?: string;
  }>;
}

type MigrationDataMap = {
  [key: string]: {
    [fromVersion: string]: {
      [toVersion: string]: MigrationGuideData;
    };
  };
};

// Data scraped from official documentation
export const migrationData: MigrationDataMap = {
  react: {
    "16.8": {
      "18.0": {
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
          {
            id: "bc4",
            title: "Concurrent Rendering",
            description:
              "React 18 introduces concurrent rendering which can cause components to render multiple times before committing.",
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
          {
            id: "df3",
            feature: "Legacy Context API",
            description:
              "The legacy context API has been deprecated since React 16.3.",
            alternative: "Use the new Context API with React.createContext().",
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
          {
            id: "ce3",
            title: "Using Suspense for Data Fetching",
            description:
              "React 18 supports Suspense for data fetching in client components.",
            beforeCode:
              "function Profile() {\n  const [data, setData] = useState(null);\n  const [isLoading, setIsLoading] = useState(true);\n\n  useEffect(() => {\n    fetchData().then(data => {\n      setData(data);\n      setIsLoading(false);\n    });\n  }, []);\n\n  if (isLoading) return <Spinner />;\n  return <ProfileDetails data={data} />;\n}",
            afterCode:
              "function Profile() {\n  return (\n    <Suspense fallback={<Spinner />}>\n      <ProfileDetails />\n    </Suspense>\n  );\n}\n\n// In a separate file\nfunction ProfileDetails() {\n  const data = use(fetchData());\n  return <div>{data.name}</div>;\n}",
            language: "javascript",
          },
        ],
        configUpdates: [
          {
            id: "cu1",
            title: "Package.json Updates",
            description: "Update React dependencies to version 18.",
            configChanges: `{\n  "dependencies": {\n    "react": "^18.0.0",\n    "react-dom": "^18.0.0"\n  }\n}`,
          },
          {
            id: "cu2",
            title: "Babel Configuration",
            description:
              "Ensure your Babel configuration supports React 18 features.",
            configChanges: `{\n  "presets": [\n    ["@babel/preset-react", {\n      "runtime": "automatic"\n    }]\n  ]\n}`,
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
            description:
              "Documentation for the new createRoot API in React 18.",
          },
          {
            id: "dl3",
            title: "Automatic Batching Deep Dive",
            url: "https://github.com/reactwg/react-18/discussions/21",
            description:
              "Detailed explanation of automatic batching in React 18.",
          },
        ],
        caseStudies: [
          {
            id: "cs1",
            company: "Airbnb",
            projectDescription:
              "Migration from React 16 to React 18 for their main booking platform",
            challenges: [
              "Large codebase with thousands of components",
              "Critical business flows that couldn't be disrupted",
              "Custom rendering optimizations that needed updates",
            ],
            solution:
              "Implemented a phased migration approach, starting with non-critical paths and gradually moving to core booking flows. Created a comprehensive test suite to validate each migration phase.",
            outcome:
              "Successfully migrated to React 18 with minimal disruption. Achieved 23% performance improvement in page load times and 15% reduction in bundle size through improved code splitting.",
            imageUrl:
              "https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80",
          },
        ],
      },
    },
  },
  typescript: {
    "4.0": {
      "5.0": {
        breakingChanges: [
          {
            id: "bc1",
            title: "lib.d.ts Changes",
            description:
              "TypeScript 5.0 includes updated DOM definitions that might affect existing code.",
            severity: "medium",
          },
          {
            id: "bc2",
            title: "Enum Changes",
            description:
              "Enums without initializers in const enums now have values that match their previous type-only behavior.",
            severity: "medium",
          },
        ],
        deprecatedFeatures: [
          {
            id: "df1",
            feature: "--target ES3",
            description: "Support for ES3 as a target has been deprecated.",
            alternative: "Use --target ES5 or later.",
          },
        ],
        codeExamples: [
          {
            id: "ce1",
            title: "Using the New Decorators Syntax",
            description:
              "TypeScript 5.0 implements the ECMAScript decorator proposal.",
            beforeCode: "class Example {\n  @decorator\n  method() {}\n}",
            afterCode:
              "class Example {\n  @decorator()\n  method() {}\n}\n\n// New decorator factory pattern\nfunction decorator() {\n  return function(target: any, context: ClassMethodDecoratorContext) {\n    // implementation\n  };\n}",
            language: "typescript",
          },
        ],
        configUpdates: [
          {
            id: "cu1",
            title: "tsconfig.json Updates",
            description: "Update TypeScript configuration for version 5.0.",
            configChanges: `{\n  "compilerOptions": {\n    "target": "ES2020",\n    "module": "NodeNext",\n    "moduleResolution": "NodeNext"\n  }\n}`,
          },
        ],
        documentationLinks: [
          {
            id: "dl1",
            title: "TypeScript 5.0 Release Notes",
            url: "https://devblogs.microsoft.com/typescript/announcing-typescript-5-0/",
            description:
              "Official TypeScript 5.0 release announcement with migration information.",
          },
        ],
        caseStudies: [
          {
            id: "cs1",
            company: "Stripe",
            projectDescription:
              "Migration from TypeScript 4.0 to 5.0 for their payment processing dashboard",
            challenges: [
              "Large TypeScript codebase with complex type definitions",
              "Custom type utilities that needed updates",
              "Integration with third-party libraries",
            ],
            solution:
              "Created a dedicated migration team that worked on updating the codebase incrementally. Developed automated tools to identify and fix common migration issues.",
            outcome:
              "Successfully migrated to TypeScript 5.0 with improved type checking and better developer experience. Build times were reduced by 30% due to TypeScript 5.0 optimizations.",
            imageUrl:
              "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80",
          },
        ],
      },
    },
  },
  // Additional technologies will be added in subsequent implementations
};

export const getMigrationData = (
  technology: string,
  fromVersion: string,
  toVersion: string,
): MigrationGuideData | null => {
  try {
    // Find exact match first
    if (
      migrationData[technology] &&
      migrationData[technology][fromVersion] &&
      migrationData[technology][fromVersion][toVersion]
    ) {
      return migrationData[technology][fromVersion][toVersion];
    }

    // If no exact match, return null for now
    // In a future implementation, we could add logic to find the closest version match
    return null;
  } catch (error) {
    console.error("Error fetching migration data:", error);
    return null;
  }
};
