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

  const handleGenerateGuide = (
    technology: string,
    currentVersion: string,
    targetVersion: string,
  ) => {
    // In a real application, this would fetch data from an API
    // For now, we'll use mock data
    setMigrationGuide({
      technology,
      currentVersion,
      targetVersion,
      breakingChanges: [
        {
          title: "Component Lifecycle Changes",
          description:
            "Several lifecycle methods are deprecated and will be removed in future versions.",
        },
        {
          title: "Context API Updates",
          description:
            "The legacy context API has been replaced with a new version that provides better performance.",
        },
        {
          title: "Strict Mode Behavior",
          description:
            "Strict mode now performs additional checks and warnings for deprecated patterns.",
        },
      ],
      deprecatedFeatures: [
        {
          feature: "componentWillMount",
          alternative: "Use componentDidMount or useEffect hook instead.",
        },
        {
          feature: "componentWillReceiveProps",
          alternative:
            "Use getDerivedStateFromProps or useEffect hook instead.",
        },
        {
          feature: "componentWillUpdate",
          alternative: "Use getSnapshotBeforeUpdate or useEffect hook instead.",
        },
      ],
      codeExamples: [
        {
          title: "Converting Class Components to Hooks",
          before: `class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.increment = this.increment.bind(this);
  }

  increment() {
    this.setState({ count: this.state.count + 1 });
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.increment}>Increment</button>
      </div>
    );
  }
}`,
          after: `function Counter() {
  const [count, setCount] = React.useState(0);

  const increment = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
}`,
          language: "jsx",
        },
        {
          title: "Using the New Context API",
          before: `// Legacy context API
class ThemeProvider extends React.Component {
  getChildContext() {
    return { theme: "dark" };
  }

  render() {
    return this.props.children;
  }
}

ThemeProvider.childContextTypes = {
  theme: PropTypes.string
};`,
          after: `// New context API
const ThemeContext = React.createContext("light");

function ThemeProvider(props) {
  return (
    <ThemeContext.Provider value="dark">
      {props.children}
    </ThemeContext.Provider>
  );
}`,
          language: "jsx",
        },
      ],
      configUpdates: [
        {
          title: "Update package.json dependencies",
          description: "Update React and ReactDOM to the latest version",
          code: `{
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  }
}`,
        },
        {
          title: "Update Babel configuration",
          description:
            "Ensure your Babel configuration supports the latest JSX transform",
          code: `{
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
          title: "React 18 Release Notes",
          url: "https://reactjs.org/blog/2022/03/29/react-v18.html",
          description: "Official release notes for React 18",
        },
        {
          title: "Upgrading to React 18",
          url: "https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html",
          description: "Step-by-step guide for upgrading to React 18",
        },
        {
          title: "New Features in React 18",
          url: "https://reactjs.org/docs/concurrent-mode-intro.html",
          description: "Learn about concurrent features in React 18",
        },
      ],
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="bg-primary text-primary-foreground py-6 px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="container mx-auto"
        >
          <h1 className="text-2xl md:text-3xl font-bold">StackMigrator</h1>
          <p className="text-sm md:text-base opacity-90">
            Technology Migration Assistant
          </p>
        </motion.div>
      </header>

      <main className="container mx-auto px-4 py-8 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <StackSelectionPanel onGenerateGuide={handleGenerateGuide} />
        </motion.div>

        {migrationGuide && (
          <>
            <Separator className="my-8" />
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <MigrationGuideDisplay guide={migrationGuide} />
            </motion.div>
          </>
        )}
      </main>

      <footer className="bg-muted py-6 px-4 md:px-8 mt-auto">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>
            StackMigrator &copy; {new Date().getFullYear()} - Technology
            Migration Assistant
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
