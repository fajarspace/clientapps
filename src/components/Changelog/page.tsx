import React, { useState, useEffect } from "react";
import { Timeline, Card, Typography, Spin } from "antd";

const { Title, Text } = Typography;

const GITLAB_REPO = "fajarspace/proposals-apps"; // Replace with your GitLab repo details
const CHANGELOG_FILE = "CHANGELOG.md";
const GITLAB_TOKEN = `${process.env.GITLAB_ACCESS_TOKEN}`; // Use an access token if your repo is private

interface ChangelogEntry {
  version: string;
  date: string;
  changes: string[];
}

const Changelog: React.FC = () => {
  const [changelog, setChangelog] = useState<ChangelogEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChangelog = async () => {
      try {
        const response = await fetch(
          `https://gitlab.com/api/v4/projects/${encodeURIComponent(
            GITLAB_REPO
          )}/repository/files/${encodeURIComponent(
            CHANGELOG_FILE
          )}/raw?ref=master`,
          {
            headers: {
              "PRIVATE-TOKEN": GITLAB_TOKEN,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.text();
        parseChangelog(data);
      } catch (error) {
        console.error("Error fetching changelog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChangelog();
  }, []);

  const parseChangelog = (content: string) => {
    const lines = content.split("\n");
    const parsedData: ChangelogEntry[] = [];
    let currentVersion: ChangelogEntry | null = null;

    lines.forEach((line) => {
      const versionMatch = line.match(
        /^## \[?([^\]]+)\]? - (\d{4}-\d{2}-\d{2})/
      );
      if (versionMatch) {
        if (currentVersion) {
          parsedData.push(currentVersion);
        }
        currentVersion = {
          version: versionMatch[1],
          date: versionMatch[2],
          changes: [],
        };
      } else if (currentVersion && line.startsWith("-")) {
        currentVersion.changes.push(line.slice(1).trim());
      }
    });

    if (currentVersion) {
      parsedData.push(currentVersion);
    }

    setChangelog(parsedData);
  };

  if (loading) return <Spin size="large" className="centered-spinner" />;

  return (
    <div className="container mx-auto py-10">
      <Title level={2} className="dark:text-white text-center mb-6">
        Changelog
      </Title>
      <Timeline
        items={changelog.map((release) => ({
          color: "blue",
          children: (
            <Card
              title={`Version ${release.version} - ${release.date}`}
              bordered={false}
            >
              <ul className="list-disc pl-5">
                {release.changes.map((change, idx) => (
                  <li key={idx}>
                    <Text>{change}</Text>
                  </li>
                ))}
              </ul>
            </Card>
          ),
        }))}
      />
    </div>
  );
};

export default Changelog;
